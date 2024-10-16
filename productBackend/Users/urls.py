from django.urls import path
from . import views

urlpatterns = [
    path("profile/update/", views.ProfileUpdateView.as_view(), name="update-profile"),
    path("register/", views.UserUpdateView.as_view(), name="create-new-user"),
]
