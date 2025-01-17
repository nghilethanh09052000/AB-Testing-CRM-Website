from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin
)
# Create your models here.

class UserManager(BaseUserManager):
    """Manager for users"""
    def create_user(
        self,
        email,
        password=None,
        **extra_field
    ):
        if not email:
            raise ValueError('User must have an email address')
        
        user = self.model(
            email=self.normalize_email(email), 
            **extra_field
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password):
        """Create and return a new superuser."""
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user

class User(
        AbstractBaseUser, 
        PermissionsMixin
     ):
    """User in the system."""

    email     = models.EmailField(max_length=255, unique=True)
    name      = models.CharField(max_length=255)
    is_staff  = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'


class TestResult(models.Model):
    timestamp = models.DateTimeField()
    experiment_name = models.CharField(max_length=255)
    metric_name = models.CharField(max_length=255)
    result_data = models.JSONField()

    def __str__(self):
        return f"{self.timestamp} - {self.experiment_name} - {self.metric_name}"

    class Meta:
        db_table = 'test_results'