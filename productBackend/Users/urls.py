from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView,
)

urlpatterns = [
    path("token/", views.CustomTokenObtainPairView),
    path("token/refresh/", TokenRefreshView.as_view()),
    path("token/verify/", TokenVerifyView.as_view()),
    path("profile/update/", views.ProfileUpdateView.as_view(), name="update-profile"),
    path("register/", views.UserUpdateView.as_view(), name="create-new-user"),
]
