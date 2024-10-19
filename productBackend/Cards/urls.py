from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

urlpatterns = [
    path("api/token/", TokenObtainPairView.as_view()),
    path("api/token/refresh/", TokenRefreshView.as_view()),
    path("api/token/verify/", TokenVerifyView.as_view()),
    # with "api/social_accounts/" i cannot create twitter_auth_callback url due to "api" keyword.
    path("social_accounts/", include("twitter_auth_manager.urls")),
    path("api/user/", include("Users.urls")),
    path("admin/", admin.site.urls),
]
