"""
Tests for models
"""

from django.test import TestCase
from django.contrib.auth import get_user_model
from core import models


class ModelTests(TestCase):
    """Test models"""

    def test_create_user_with_email_successfully(self):
        email='nghi@atherlabs.com'
        password = '123456'
        user = get_user_model().objects.create_user(
            email = email,
            password = password
        )
        self.assertEquals(user.email, email)
        self.assertTrue(user.check_password(password))

    def test_new_user_email_normalize(self):
        """Test email is normalize for new users"""

        sample_emails = [
            ['test1@ATHERLABS.com', 'test1@atherlabs.com'],
            ['Test2@Atherlabs.com', 'Test2@atherlabs.com'],
            ['TEST3@ATHERLABS.com', 'TEST3@atherlabs.com'],
            ['test4@atherlabs.COM', 'test4@atherlabs.com'],
        ]

        for email, expected in sample_emails:
            user = get_user_model().objects.create_user(email, '123456')
            self.assertEqual(user, email, expected)

    def test_new_user_without_email_raises_error(self):
        """Test that creating a user without an email raises a Value Error"""
        with self.assertRaises(ValueError):
            get_user_model().objects.create_user('', '123456')

    def test_create_superuser(self):
        """Test creating a superuser."""
        user = get_user_model().objects.create_superuser(
            'test@example.com',
            'test123',
        )

        self.assertTrue(user.is_superuser)
        self.assertTrue(user.is_staff)