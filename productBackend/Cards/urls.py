from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic.base import TemplateView
from . import views

urlpatterns = [
    path("social_accounts/", include("twitter_auth_manager.urls")),
    path("Users/", include("Users.urls")),
    path("admin/", admin.site.urls),
    path("csrfToken/", views.GetCSRFToken.as_view(), name="csrf_token"),
]
