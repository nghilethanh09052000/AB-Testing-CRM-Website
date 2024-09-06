from google.cloud import bigquery
from elasticsearch import Elasticsearch
from google.oauth2 import service_account

BIGQUERY_PROJECT = "sipher-data-platform"
CREDENTIALS = service_account.Credentials.from_service_account_file("backend-keys.json")

bq_client = bigquery.Client(project=BIGQUERY_PROJECT, credentials=CREDENTIALS)

# Initialize Elasticsearch client
es_client = Elasticsearch(
    "http://34.172.16.254:9200/",
    api_key='wLiTDoF2Q-6pPWP6n7DZcg'
)
es_client.info()
# Define your BigQuery query
# query = """
#     SELECT ather_id, email, ather_user_name, game_user_id
#     FROM `sipher-data-platform.sipher_odyssey_core.int_dim_crm_user_info`
# """

# # Execute the query
# query_job = bq_client.query(query)

# # Iterate over the results and index into Elasticsearch
# for row in query_job:
#     document = {
#         'ather_id': row['ather_id'],
#         'email': row['email'],
#         'ather_user_name': row['ather_user_name'],
#         'game_user_id': row['game_user_id']
#     }
    
#     # Index document into Elasticsearch
#     es_client.index(index='es-dataflow-bq', body=document)

#curl -X GET "http://34.172.16.254:9200/_cluster/health?wait_for_status=yellow&timeout=50s&pretty" --key certificates/elasticsearch-ca.pem  -k -u elastic
#curl -X GET "https://10.128.15.197:9200/_cluster/health?wait_for_status=yellow&timeout=50s&pretty" --key certificates/elasticsearch-ca.pem  -k -u elastic
