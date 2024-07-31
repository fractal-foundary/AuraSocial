from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .views import ProfileView

router = routers.DefaultRouter()
router.register(r"profile", ProfileView)

urlpatterns = [path("api/", include(router.urls))]
