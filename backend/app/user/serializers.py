"""
Serializers for the user API View.
"""
from django.contrib.auth import (
    get_user_model,
)
from django.utils.translation import gettext as _

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import Group, User

class UserSerializer(serializers.ModelSerializer):
    """Serializer for the user object."""

    class Meta:
        model = get_user_model()
        fields = ['email', 'password', 'name']
        extra_kwargs = {'password': {'write_only': True, 'min_length': 5}}

    def create(self, validated_data):
        """Create and return a user with encrypted password."""
        return get_user_model().objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        """Update and return user."""
        password = validated_data.pop('password', None)
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()

        return user
    

class AuthTokenSerializer(TokenObtainPairSerializer):
    """Serializer for the user auth token."""
    def validate(self, attrs):
        data = super().validate(attrs)
        
        user = self.user
        groups = Group.objects.filter(user=user)
        data['user'] = {
            'email': user.email,
            'user_id': user.id,
            'name': user.name or 'No Name',
            'group': [group.name for group in groups][0] or 'No Group',
        }

        return data
       
