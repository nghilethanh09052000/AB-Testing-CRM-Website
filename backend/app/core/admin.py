"""
Django admin customization
"""
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _

# Register your models here.

from core import models




class UserAdmin(BaseUserAdmin):
    """Define the admin pages for users"""
    ordering = ['id']
    list_display = ['email', 'name', 'display_groups', 'is_superuser']
    list_filter = ('is_staff', 'is_superuser') 
    fieldsets = (
            (None, {'fields': ('email', 'password')}),
            (_('Personal Info'), {'fields': ('name',)}),
            (
                _('Permissions'),
                {
                    'fields': (
                        'is_staff',
                        'is_superuser',
                        'groups'
                    )
                }
            ),
            (_('Important dates'), {'fields': ('last_login',)}),
        )
    readonly_fields = ['last_login']
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'email',
                'password1',
                'password2',
                'name',
                'is_staff',
                'is_superuser',
                'groups'
            ),
        }),
    )

    def display_groups(self, obj):
        return ", ".join([group.name for group in obj.groups.all()])


admin.site.register(models.User, UserAdmin)
