from django.contrib import admin
from .models import Follow, Profile, Tweet, CustomUser
from django.contrib.auth.admin import UserAdmin

# Register your models here.
admin.site.register(Profile)
admin.site.register(Follow)
admin.site.register(Tweet)
admin.site.register(CustomUser, UserAdmin)
