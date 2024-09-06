from django.urls import path, include
from . import views


app_name = 'ab_testing'
urlpatterns = [
    path(
        "get_exps/", 
        views.GetExps.as_view(), 
        name="get_exps"
    ),
    path(
        "get_list_exps/", 
        views.GetListExps.as_view(), 
        name="get_list_exps"
    ),
    path(
        "get_exp_details/<str:exp_id>/", 
        views.GetExpsDetails.as_view(), 
        name="get_exp_details"
    ),
    path(
        "get_list_metrics/", 
        views.GetListMetrics.as_view(), 
        name="get_list_metrics"
    ),
    path(
        "get_all_metrics/", 
        views.GetAllMetric.as_view(), 
        name="get_all_metrics"
    ),
    path(
        "get_list_feature_lag/", 
        views.GetListFeatureLag.as_view(), 
        name="get_list_feature_lag"
    ),
    path(
        "get_list_event_type/", 
        views.GetListEventType.as_view(), 
        name="get_list_event_type"
    ),
    path(
        "get_all_dimensions/", 
        views.GetAllDimentions.as_view(), 
        name="get_all_dimensions"
    ),
    path(
        "get_dim/", 
        views.GetAllDimentions.as_view(), 
        name="get_dim"
    ),
    path(
        "create_ab_testing/", 
        views.CreateABTesting.as_view(), 
        name="create_ab_testing"
    )
]