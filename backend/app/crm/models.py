from django.db import models


class CrmSipherGameUserInfo(models.Model):
    ather_id = models.CharField(max_length=255, primary_key=True)
    email = models.EmailField()
    ather_user_name = models.CharField(max_length=255)
    ather_created_timestamp = models.CharField(max_length=255)  
    game_user_id = models.CharField(max_length=255)
    game_day0_datetime_tzutc = models.CharField(max_length=255)  
    game_user_name = models.CharField(max_length=255)

    class Meta:
        db_table = 'int_dim_crm_user_info'
        ordering = ['-ather_created_timestamp']
