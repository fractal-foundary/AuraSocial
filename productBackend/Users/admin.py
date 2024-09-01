from django.contrib import admin
from .models import Follow, Profile,Tweet

# Register your models here.
admin.site.register(Profile)
admin.site.register(Follow)
admin.site.register(Tweet)
