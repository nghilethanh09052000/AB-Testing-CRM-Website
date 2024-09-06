from typing import Any
from django.http import JsonResponse
from django.conf import settings
from django.views import generic
from itertools import groupby
from datetime import datetime
from django.views.generic import ListView
from .models import CrmSipherGameUserInfo 
import json
import ast

class BaseBigQueryListView(generic.ListView):
    sql_query = ""
    query_timeout = None

    def get_queryset(self):
        sql = self.sql_query
        query_job = settings.CLIENT.query(
            sql, 
            project = settings.BIGQUERY_PROJECT,
            timeout = self.query_timeout
        )
        results = query_job.result()
        data = [dict(row.items()) for row in results]
        return data

    def render_to_response(self, context, **response_kwargs):
        return JsonResponse(data=context['object_list'], safe=False) 

class SipherGameUserInfo(ListView):
    model = CrmSipherGameUserInfo
    context_object_name = 'object_list'
    paginate_by = 1000

    def get_queryset(self):
        queryset = CrmSipherGameUserInfo.objects.all()
        return queryset

    def render_to_response(self, context, **response_kwargs):
        utc_data = self.convert_timestamps_to_utc(context['object_list'])
        return JsonResponse(utc_data, safe=False)

    def convert_timestamps_to_utc(self, object_list):
        utc_object_list = []
        for item in object_list:
            ather_created_timestamp = self.parse_timestamp(item.ather_created_timestamp)
            game_day0_datetime_tzutc = self.parse_timestamp(item.game_day0_datetime_tzutc)
            
            utc_item = {
                "ather_id": item.ather_id,
                "email": item.email,
                "ather_user_name": item.ather_user_name,
                "ather_created_timestamp": ather_created_timestamp.strftime('%Y-%m-%d %H:%M:%S') if ather_created_timestamp else None,
                "game_user_id": item.game_user_id,
                "game_day0_datetime_tzutc": game_day0_datetime_tzutc.strftime('%Y-%m-%d %H:%M:%S') if game_day0_datetime_tzutc else None,
                "game_user_name": item.game_user_name
            }
            utc_object_list.append(utc_item)
        return utc_object_list

    def parse_timestamp(self, timestamp_str):
        if timestamp_str:
            try:
                # Convert from microseconds to seconds
                timestamp = int(timestamp_str) / 1_000_000
                return datetime.utcfromtimestamp(timestamp)  # Return a datetime object
            except ValueError:
                return None
        return None
 
class SipherGameUserInventoryBalance(BaseBigQueryListView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.sql_query = """
                SELECT
                    a.user_id,
                    b.ather_id,
                    b.email,
                    b.ather_user_name,
                    a.instance_id,
                    a.updated_balance_date,
                    a.updated_balance,
                    a.previous_balance,
                    a.change_in_balance,
                    a.balance_change_type,
                    a.latest_timestamp
                FROM 
                    `{0}.sipher_odyssey_inventory.fct_user_inventory_balance_and_transaction_last_7_days` a
                JOIN
                    `{0}.sipher_odyssey_core.int_dim_crm_user_info` b
                ON 
                    a.user_id = b.game_user_id
                WHERE 
                    updated_balance_date BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY) AND CURRENT_DATE()
                    AND
                    user_id <> 'Agent'
                LIMIT 1000
            """.format(settings.BIGQUERY_PROJECT)
        self.query_timeout = 120
        
class SocialZendeskTickets(BaseBigQueryListView):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.sql_query = """
                SELECT
                    *
                FROM `{0}.raw_zendesk.zendesk_tickets`
            """.format(settings.BIGQUERY_PROJECT)
        self.query_timeout = 120