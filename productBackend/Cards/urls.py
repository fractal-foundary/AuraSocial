"""
URL configuration for Cards project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic.base import TemplateView
from . import views

urlpatterns = [
    path("Users/", include("Users.urls")),
    path("admin/", admin.site.urls),
    path("csrfToken/", views.GetCSRFToken.as_view(), name="csrf_token"),
    # below is just there, right I dont know why...but soon.
    # re_path(
    #     r"^.*/", TemplateView.as_view(template_name="base_react.html"), name="base"
    # ),
    path("accounts/", include("allauth.urls")),
    path("_allauth/", include("allauth.headless.urls")),
]
