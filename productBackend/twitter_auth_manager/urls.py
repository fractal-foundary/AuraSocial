from django.urls import re_path, path
from . import views


urlpatterns = [
    path(
        "api/twitter_auth_url", views.TwitterAuthView.as_view(), name="twitter_auth_api"
    ),
    re_path(r"^twitter_oauth2/login/callback/$", views.twitter_callback),
    path("api/token/refresh/", views.jwt_refresh_token, name="token_refresh"),
    path(
        "api/token/new",
        views.exchangeTokens,
        name="new_tokens",
    ),
]
