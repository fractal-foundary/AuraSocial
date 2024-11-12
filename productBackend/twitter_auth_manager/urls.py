from django.urls import path
from . import views


urlpatterns = [
    path("twitter_auth/", views.TwitterAuthView.as_view(), name="twitter_auth_api"),
    path("twitter_oauth2/login/callback/", views.twitter_callback),
]
