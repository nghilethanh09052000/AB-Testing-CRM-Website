from typing import Any
from django.http import JsonResponse
from django.conf import settings
from django.views import generic
import json
import ast
from itertools import groupby

class BaseBigQueryListView(generic.ListView):
    sql_query = ""
    query_timeout = None

    def get_queryset(self):
        sql = self.sql_query
        query_job = settings.CLIENT.query(
            sql, 
            project = settings.BIGQUERY_BILLING_PROJECT,
            timeout = self.query_timeout
        )
        results = query_job.result()
        data = [dict(row.items()) for row in results]
        return data

    def render_to_response(self, context, **response_kwargs):
        return JsonResponse(data=context['object_list'], safe=False) 
class GetExps(BaseBigQueryListView):

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.sql_query = """
                SELECT
                    exp_id,
                    json_extract_scalar( replace(config, 'False', '"False"'),'$.experiment_name') AS experiment_name
                FROM `{0}.abtest.create_experiment`
            """.format(settings.BIGQUERY_PROJECT)
        self.query_timeout = 120
class GetListExps(BaseBigQueryListView):
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.sql_query = """
            WITH create_experiment AS
            (
                SELECT  *
                    ,json_extract_scalar(config,'$.kpi') AS kpi
                    ,json_extract_scalar( replace(config, 'False', '"False"'),'$.experiment_name') AS experiment_name
                FROM `{0}.abtest.create_experiment`
            )
            , test_results AS
            (
                SELECT  *
                    FROM
                    (
                        SELECT  *
                            ,ROW_NUMBER() OVER (PARTITION BY exp_id,metric_id ORDER BY timestamp desc) AS row_num
                        FROM `{0}.abtest.test_results`
                    )
                WHERE row_num = 1 
            )
            
            SELECT  distinct
                DATETIME(t.timestamp , "Asia/Bangkok") AS time_run_test
                ,c.timestamp AS time_create_test
                ,c.config
                ,c.exp_id
                ,experiment_name

                ,t.result
                ,t.metric_id
                ,replace(m.config,'"',"")as metric_cfg
            FROM create_experiment c
            LEFT JOIN test_results t using
            (exp_id
            )
            LEFT JOIN `{0}.abtest.metrics` m on t.metric_id = m.metric_id

            WHERE result is not null
            AND kpi = t.metric_id
            ORDER BY time_run_test desc, time_create_test desc
        """.format(settings.BIGQUERY_PROJECT)
    
    def format_json_key(self, json_fields = ''):
        
        json_fields = (
            json_fields
            .replace("'", '"')
            .replace("-inf", '"-inf"')
            .replace("-inf", '"-inf"')
            .replace(" inf", '"inf"')
            .replace("False", '"False"')
            .replace("True", '"True"')
            .replace("nan", 'None')
        )
        return ast.literal_eval(json_fields)
       
    def format_response_results(self, results):
        return [
            {
                **result,
                'config'    : self.format_json_key(result['config']),
                'result'    : self.format_json_key(result['result']),
                'metric_cfg': self.format_json_key(result['metric_cfg'])
            } for result in results
        ]

    def get_queryset(self):
            data = super().get_queryset()
            results = self.format_response_results(data)
            return results 
class GetExpsDetails(GetListExps):
    format_metric_result = ['config', 'metric_name', 'result', 'metric_cfg']
    def get_queryset(self):
        exp_id = self.kwargs['exp_id']
        self.sql_query =  """
            WITH create_experiment AS
            (
                SELECT  
                    *
                    ,json_extract_scalar( replace(config, 'False', '"False"'),'$.experiment_name') AS experiment_name
                FROM `{0}.abtest.create_experiment`
                WHERE exp_id = '{1}'
            ) 
            , test_results AS
            (
                SELECT  *
                    FROM
                    (
                        SELECT  *
                        ,ROW_NUMBER() OVER (PARTITION BY exp_id,metric_id ORDER BY timestamp desc) AS row_num
                        FROM `{0}.abtest.test_results`
                        WHERE exp_id = '{1}'
                    )
                    WHERE row_num = 1 
            )
            SELECT  distinct
                DATETIME(t.timestamp , "Asia/Bangkok") AS time_run_test
                ,c.timestamp AS time_create_test
                ,c.config
                ,c.exp_id
                ,experiment_name
                ,t.result
                ,t.metric_id
                ,replace(m.config,'"',"") as metric_cfg
            FROM create_experiment c
            LEFT JOIN test_results t using (exp_id)
            LEFT JOIN `{0}.abtest.metrics` m on t.metric_id = json_extract_scalar(m.config,'$.metric_id') 
            WHERE result is not null
            ORDER BY time_run_test desc, time_create_test desc
        """.format(settings.BIGQUERY_PROJECT, exp_id)

        data = super().get_queryset()
        results = self.format_json_result(data, exp_id)
        return results

    def format_json_result(self, results, exp_id):

        exp_name           = self.get_filter_duplicated_value([item.get('experiment_name') for item in results])
        start_date         = self.get_filter_duplicated_value([item.get('config').get('date_range').get('start').get('start_date') for item in results])
        end_date           = self.get_filter_duplicated_value([item.get('config').get('date_range').get('end').get('end_date') for item in results])
        expected_precision = self.get_filter_duplicated_value([item.get('config').get('precision') for item in results])
        alpha              = self.get_filter_duplicated_value([item.get('config').get('alpha') for item in results])
        beta               = self.get_filter_duplicated_value([item.get('config').get('beta') for item in results])
        time_run_test      = [ item.get('time_run_test') for item in results ]
        primary_metric     = self.get_primary_metric(results)
        secondary_metric   = self.get_secondary_metric(results)

        return {
            'exp_id'             : exp_id,
            'exp_name'           : exp_name,
            'start_date'         : start_date,
            'end_date'           : end_date,
            'expected_precision' : expected_precision,
            'alpha'              : alpha,
            'beta'               : beta,
            'time_run_test'      : time_run_test,
            'primary_metric'     : primary_metric,
            'secondary_metric'   : secondary_metric
        } 
    
    def filter_metrics_key(self, data):
        return { key: data[key] for key in self.format_metric_result if key in data }

    def get_filter_duplicated_value(self, data):
        return next((key for key, _ in groupby(data)), None) 
    
    def get_primary_metric(self, results):

        filterd_primary_metric = next(
            (
                item for item in results 
                if 'config' in item and item['config'].get('kpi') == item.get('metric_id')
            ),
            None
        )

        return {
            "metric_cfg"         : filterd_primary_metric.get("metric_cfg"),
            "result"             : filterd_primary_metric.get('result')
        } if filterd_primary_metric else {}
        
    def get_secondary_metric(self, results):
        filterd_secondary_metric = [ item for item in results if 'config' in item and item['config'].get('kpi') != item.get('metric_id')]
        return [
            {
                "metric_cfg" : item.get("metric_cfg"),
                "result"     : item.get('result'),
            } for item in filterd_secondary_metric
        ] if filterd_secondary_metric else []    
class GetListMetrics(BaseBigQueryListView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.sql_query = """
                WITH exptb AS
                (
                    SELECT  
                        timestamp
                        ,exp_id
                        ,replace(config,'"',"")as exp_config ,json_extract_scalar(config,'$.kpi') AS kpi ,replace(secondary_metrics,'"',"")as secondary_metrics
                    FROM `{0}.abtest.create_experiment`
                    LEFT JOIN UNNEST
                    ( JSON_EXTRACT_ARRAY(config, '$.secondary_metrics')
                    ) secondary_metrics
                ) , metricstb AS
                (
                    SELECT  create_time
                        ,replace(config,'"',"")as config 
                        , metric_id
                    FROM `{0}.abtest.metrics`
                ) , kpi AS
                (
                    SELECT  distinct create_time AS metric_create_time
                        ,exp_id
                        ,exp_config
                        ,m.config             AS metric_config
                        ,metric_id
                    FROM metricstb m
                    LEFT JOIN exptb e
                    ON e.kpi = m.metric_id
                    WHERE m.metric_id is not null 
                ) , second_metric AS
                (
                    SELECT distinct 
                        create_time AS metric_create_time
                        ,exp_id
                        ,exp_config
                        ,m.config AS metric_config
                        ,metric_id
                    FROM metricstb m
                    LEFT JOIN exptb e
                    ON e.secondary_metrics = m.metric_id
                    WHERE m.metric_id is not null 
                ) , raw AS
                (
                    SELECT  *
                    FROM kpi
                    UNION ALL
                    SELECT  *
                    FROM second_metric
                )
                SELECT  FORMAT_TIMESTAMP('%Y-%m-%d %H:%M:%S',metric_create_time) AS metric_create_time
                    ,metric_id
                    ,json_extract_scalar(metric_config,'$.metric_name') AS metric_name
                    ,COUNT(distinct exp_id) AS exp_count
                FROM raw
                WHERE true
                GROUP BY 1,2,3
            """.format(settings.BIGQUERY_PROJECT)
        self.query_timeout = 120
class GetAllMetric(BaseBigQueryListView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.sql_query = """
            SELECT DISTINCT 
                create_time,
                metric_id,
                json_extract(config,'$.metric_name') AS metric_name,
                json_extract(replace(config, 'None', '"None"'),'$.dimensions') AS dimensions
            FROM `{0}.abtest.metrics` 
            LIMIT 1000
        """.format(settings.BIGQUERY_PROJECT)
        self.query_timeout = 120

    def format_dimensions(self, dimensions):
        return None if dimensions == 'None' else dimensions
    
    def format_json_string_field(self, results):
        return [
            {
                **result,
                'metric_name': json.loads(result.get('metric_name')),
                'dimensions' : self.format_dimensions(json.loads(result.get('dimensions'))),
            } for result in results
        ]
    
    def get_queryset(self):
        data = super().get_queryset()
        results = self.format_json_string_field(data)
        return results
class GetListFeatureLag(BaseBigQueryListView):

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.sql_query = """
            SELECT DISTINCT experiment
            FROM `{0}.abtest.assignment`         
            LIMIT 1000
        """.format(settings.BIGQUERY_PROJECT)
        self.query_timeout = 120
    
    def render_to_response(self, context, **response_kwargs):
        data = [item.get('experiment') for item in context['object_list']]
        return JsonResponse(data, safe=False)
class GetListEventType(BaseBigQueryListView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.sql_query = """
            SELECT DISTINCT event_type
            FROM `{0}.abtest.fact` 
            LIMIT 1000
        """.format(settings.BIGQUERY_PROJECT)
        self.query_timeout = 120

    def render_to_response(self, context, **response_kwargs):
        data = [item.get('event_type') for item in context['object_list']]
        return JsonResponse(data, safe=False)
class GetAllDimentions(BaseBigQueryListView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.sql_query = """
                SELECT
                    dimension,
                    metric,
                    PARSE_DATE('%Y%m%d', CAST(effective_date AS STRING)) AS effective_date,
                    source
                FROM `{0}.abtest.metric_dimension_metadata`
            """.format(settings.BIGQUERY_PROJECT)
        self.query_timeout = 120
class GetDim(BaseBigQueryListView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.sql_query = """
                WITH dim AS (
                    SELECT *
                    FROM `{1}`
                ),
                fact AS (
                    SELECT *
                    FROM `{0}.abtest.fact`
                ),
                data AS (
                    SELECT
                        fact.* EXCEPT(date),
                        dim.* EXCEPT(entity_id, timestamp, date)
                    FROM fact LEFT JOIN dim
                        ON fact.entity_id = dim.entity_id AND fact.timestamp = dim.timestamp
                    -- WHERE fact.event_type = {2}
                )
                SELECT *
                FROM data
            """.format(settings.BIGQUERY_PROJECT)
        self.query_timeout = 120
class CreateABTesting(BaseBigQueryListView):
    pass


