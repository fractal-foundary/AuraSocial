import tweepy
from django.conf import settings
from .models import Access_token
from django.core.cache import cache
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import redirect
from django.contrib.auth import get_user_model
from django.contrib.auth import login

USER = get_user_model()

import os

# If dont set this evironment variable to `1` than we will get the exception
# (insecure_transport) OAuth 2 MUST utilize https.
os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"


TWITTER_CLIENT_ID = getattr(
    settings, "TWITTER_CLIENT_ID", "UUNIVl9IQUJrSDNZTFY1ZWRzZVg6MTpjaQ"
)
TWITTER_CLIENT_SECRET = getattr(
    settings,
    "TWITTER_CLIENT_SECRET",
    "tuuig7ARSpiZFgmgR5UuHfiDTH8G9zTRL27DXEy6ZnTNIcvazK",
)
TWITTER_CALLBACK_URI = getattr(
    settings,
    "TWITTER_CALLBACK_URI",
    "http://127.0.0.1:8000/social_accounts/twitter_oauth2/login/callback/",
)
TWITTER_SCOPE = getattr(
    settings,
    "TWITTER_SCOPE",
    ["tweet.write", "users.read", "tweet.read", "offline.access"],
)
# FRONTEND_REGISTER_USER: is mainly to update the newly registered user with real data from user.
FRONTEND_REGISTER_USER = getattr(
    settings,
    "FRONTEND_PROFILE_URL",
    "http://127.0.0.1:10000/register",
)


def get_handler():
    return tweepy.OAuth2UserHandler(
        client_id=TWITTER_CLIENT_ID,
        redirect_uri=TWITTER_CALLBACK_URI,
        scope=TWITTER_SCOPE,
        client_secret=TWITTER_CLIENT_SECRET,
    )


# this function is here, because i need the get_handler()
def twitter_refresh_token(access_token):
    oauth2_user_handler = get_handler()
    old_access_token = access_token
    new_access_token = oauth2_user_handler.refresh_token(
        "https://api.twitter.com/2/oauth2/token",
        refresh_token=old_access_token.refresh_token,
    )

    token_obj = Access_token.objects.update_or_create(
        defaults={
            "user": old_access_token.user,
            "twitter_user_id": old_access_token.twitter_user_id,
            "twitter_username": old_access_token.twitter_username,
            "token_type": new_access_token["token_type"],
            "expires_in": new_access_token["expires_in"],
            "access_token": new_access_token["access_token"],
            "scope": new_access_token["scope"],
            "refresh_token": new_access_token["refresh_token"],
            "expires_at": new_access_token["expires_at"],
        }
    )
    return token_obj


# twitter_callback
# 1) Fetch and save AccessToken in the database.
# 2) Redirect to profile page.
def twitter_callback(request):

    if request.user.is_authenticated and not request.user.is_superuser:
        try:
            Access_token.objects.get(user=request.user)
            redirect_url = f"{FRONTEND_REGISTER_USER}?status=AccessTokenExist"
            return redirect(redirect_url)
        except Access_token.DoesNotExist:
            pass

    _client = cache.get("_client")
    # _client = {'client_id': 'UUNIVl9IQUJrSDNZTFY1ZWRzZVg6MTpjaQ', 'default_token_placement': 'auth_header', 'token_type': 'Bearer', 'access_token': None, 'refresh_token': None, 'mac_key': None, 'mac_algorithm': None, 'token': {}, 'scope': None, 'state_generator': <function generate_token at 0x7674f0978360>, 'state': None, 'redirect_url': None, 'code_verifier': '3x7LGd6A2Js8EjC583dmnBiZcxigh8wPXaavqAUOfD-vQoXuJOwaoApMoNnPRnGr1lY9wvhJeVy_U0mz-fWyntF3gcUwDrmk9tFIVmCUTAuQxgg7G0vDPnZTX-mF_JfRJC2fskEuRQ9WEzTZKp9DSlVBKo9XdgNgrh4KYDPeztA', 'code_challenge': 'TxStsIzeZgd0QhVJfJSO1lgFzcO-yPgsh97S7FKJLrU', 'code_challenge_method': None, 'code': None, 'expires_in': None, '_expires_at': None}

    if _client:
        oauth2_user_handler = get_handler()
        oauth2_user_handler._client.__dict__ = _client
        try:
            access_token = oauth2_user_handler.fetch_token(request.build_absolute_uri())
            # access_token = {'token_type': 'bearer', 'expires_in': 7200, 'access_token': 'VDN1dGtfYmY2b0ctRjF0TkJhYnl0NFg2aFBHOTJqMW1YbkkzR2tXeHFTUzhtOjE3MjcwNDk3NTYzMzM6MTowOmF0OjE', 'scope': ['tweet.write', 'users.read', 'tweet.read', 'offline.access'], 'refresh_token': 'c1NweVZFamZZdW14aXZkcFJQMW9iaW9SMEhKYmpkRFFYUE9ZNmlkbTA4OGJaOjE3MjcwNDk3NTYzMzM6MToxOnJ0OjE', 'expires_at': 1727056956.5167751}

            # I need to create a client here.
            client = tweepy.Client(access_token["access_token"])
            response = client.get_me(user_auth=False)
            name = response.data.name.split(" ")
            # creating/register a new user after twitter_auth, because i need it for access_token model.
            # user cannot be present without an access_token other than superuser/admin.
            new_user = USER.objects.create_user(
                username=response.data.username,
                # dummy email address created from twitter username, cause username is unique which in
                # turn give me a unique email.
                email=f"{response.data.username}@gmail.com",
                first_name=name[0],
                last_name=name[1],
            )
            access_token["user"] = new_user
            access_token["twitter_user_id"] = response.data.id
            access_token["twitter_username"] = response.data.username
            Access_token(**access_token).save()

            # I have to log the user in, cause i dont know how else to get the request.user, and i need it desperately.
            # this will put the newly created user in the session.
            login(request, new_user)

            redirect_url = f"{FRONTEND_REGISTER_USER}?status=success"
        except Exception as e:
            redirect_url = f"{FRONTEND_REGISTER_USER}?status=exception------>{e}"
    else:
        redirect_url = f"{FRONTEND_REGISTER_USER}?status=NoTweepyClientFoundTwitterAccessTokenNotFetched"

    # redirecting to the frontend authentication page, where jwt tokens are going to be stored.
    return redirect(redirect_url)


# creating rest api to transfer "authentication_url", recieve "response_url" and than save "access_token".
class TwitterAuthView(APIView):

    # logically this view can be accessed without any user being authenticated in current session.
    # as we will login the user in twitter_callback view.
    permission_classes = [permissions.AllowAny]

    def twitter_auth_url(self):
        self.oauth2_user_handler = get_handler()
        self.auth_url = self.oauth2_user_handler.get_authorization_url()
        # below cache is set for 300sec = 5min by default, you can change it also by changing the "timeout" argument.
        cache.set("_client", self.oauth2_user_handler._client.__dict__)
        print()
        print(cache.get("_client"))
        print()
        return self.auth_url

    def get(self, request):
        auth_url = self.twitter_auth_url()
        user_username = request.user.username
        return Response(
            {"auth_url": auth_url, "user": str(user_username)},
            status=status.HTTP_200_OK,
        )
