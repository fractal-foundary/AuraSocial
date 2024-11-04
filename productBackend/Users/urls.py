from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView,
)

urlpatterns = [
    path("token/", views.CustomTokenObtainPairView, name="get-jwt-tokens"),
    path("token/refresh/", TokenRefreshView.as_view(), name="refresh-jwt-tokens"),
    path("token/verify/", TokenVerifyView.as_view(), name="verify-jwt-tokens"),
    path("register/", views.UserAPIView.as_view(), name="create-new-user"),
    path("profile/", views.ProfileAPIView.as_view(), name="update-profile"),
]
