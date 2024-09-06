from django.urls import path, include
from . import views


app_name = 'crm'

urlpatterns = [
    path(
        "sipher-game/user-info", 
        views.SipherGameUserInfo.as_view(), 
        name="sipher-game-user-info"
    ),
    
    path(
        "sipher-game/user-inventory", 
        views.SipherGameUserInventoryBalance.as_view(), 
        name="sipher-game-user-info"
    ),
    
    path(
        "social/zendesk_tickets/", 
        views.SocialZendeskTickets.as_view(), 
        name="social_zendesk_tickets"
    ),

]