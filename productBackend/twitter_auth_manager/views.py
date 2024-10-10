import tweepy
from django.conf import settings
from .models import Access_token
from django.core.cache import cache
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import redirect
from Users.models import CustomUser
from django.contrib.auth import login
from Users.models import Profile
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.signing import TimestampSigner, BadSignature, SignatureExpired

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
    "qk2hWk_qL0cb7Li58bjdZGN7Ooqy91GMRNW_irLX349YDmikvn",
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
FRONTEND_AUTHCALLBACK = getattr(
    settings,
    "FRONTEND_PROFILE_URL",
    "http://127.0.0.1:10000/account/authcallback",
)


def get_handler():
    return tweepy.OAuth2UserHandler(
        client_id=TWITTER_CLIENT_ID,
        redirect_uri=TWITTER_CALLBACK_URI,
        scope=TWITTER_SCOPE,
        client_secret=TWITTER_CLIENT_SECRET,
    )


def twitter_refresh_token(access_token):
    oauth2_user_handler = get_handler()
    access_token = access_token
    new_access_token = oauth2_user_handler.refresh_token(
        "https://api.twitter.com/2/oauth2/token",
        refresh_token=access_token.refresh_token,
    )

    # token_obj = Access_token(**new_access_token)
    token_obj = Access_token.objects.update_or_create(
        defaults={
            "user": access_token.user,
            "twitter_user_id": access_token.twitter_user_id,
            "token_type": new_access_token["token_type"],
            "expires_in": new_access_token["expires_in"],
            "access_token": new_access_token["access_token"],
            "scope": new_access_token["scope"],
            "refresh_token": new_access_token["refresh_token"],
            "expires_at": new_access_token["expires_at"],
        }
    )
    token_obj.save()
    return token_obj


# create profile for user.
def create_profile():
    new_user = cache.get("new_user")

    Profile.objects.update_or_create(
        user=new_user,
    )


@api_view(["POST"])
def exchangeTokens(request):
    exchange_code = request.data.get("code")
    if exchange_code:
        signer = TimestampSigner()
        try:
            # these tokens are available for 5mins = 300sec.
            tokens = signer.unsign_object(exchange_code, max_age=300)
            return Response(
                tokens,
                status.HTTP_200_OK,
            )
        except Exception as e:
            return Response({"exception": str(e)}, status.HTTP_400_BAD_REQUEST)


# twitter_callback
# 1) Fetch AccessToken
# 2) Redirect to profile page.
def twitter_callback(request):
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
            user_name = response.data.name.split(" ")
            # user: user object and created: boolean value representing weather new object created or not.
            new_user, created = CustomUser.objects.get_or_create(
                # "username" needs to be unique for each user, thus if used once cannot be used again.
                # so, for now, I am changing it manually, but not in future.
                # username=response.data.username,
                username="gyan",
                defaults={"is_admin_user": False},
            )
            if created:
                # using cache to create a profile for the same user we fetched the access_token for
                cache.set("new_user", new_user)
                access_token["user"] = new_user
                access_token["twitter_user_id"] = response.data.id
                Access_token(**access_token).save()

                # jwt authentication
                # Generate JWT tokens
                refresh = RefreshToken.for_user(new_user)
                access_token = str(refresh.access_token)
                refresh_token = str(refresh)

                # TODO: this cryptographic timestampsigner is temporary, we need to use more robust library like PyJWT, which are specifically made for this purpose.
                # Create a signed token that expires in 5 minutes
                signer = TimestampSigner()
                token_data = {
                    "access_token": access_token,
                    "refresh_token": refresh_token,
                }
                signed_token = signer.sign_object(token_data)

            # login the user
            # login(request, user)
            # nope not going to login the user in current session, instead using jwt authentication for new user while keeping the admin user in current session.

            # profile is created for new_user
            create_profile()

            # pass this signed_token here in success url, then on the frontend will fetch it to access jwt tokens.
            redirect_url = f"{FRONTEND_AUTHCALLBACK}?status=success&code={signed_token}"
        except Exception as e:
            redirect_url = f"{FRONTEND_AUTHCALLBACK}?status=exception------>{e}"
    else:
        redirect_url = f"{FRONTEND_AUTHCALLBACK}?status=TwitterAccessTokenNotFetched"
        # refresh_token()

    # redirecting to the react profile page.
    return redirect(redirect_url)


# when client send a post request to refresh the jwt access token
@api_view(["POST"])
def jwt_refresh_token(request):
    # recieve refresh_token and then move forward...
    refresh_token = request.data.get("refresh_token")
    try:
        new_refresh_token = RefreshToken(refresh_token)
        access_token = new_refresh_token.access_token
        return Response(
            {
                "refresh_token": str(new_refresh_token),
                "access_token": str(access_token),
            },
            status.HTTP_200_OK,
        )
    except Exception as e:
        return Response({"error:invalid refresh token"}, status.HTTP_400_BAD_REQUEST)


class UserAuthentication:
    def __init__(self, new_user, twitter_user_id):
        new_user, created = CustomUser.objects.get_or_create(
            # "username" needs to be unique for each user, thus if used once cannot be used again.
            # so, for now, I am changing it manually, but not in future.
            # username=response.data.username,
            username="gyan",
            defaults={"is_admin_user": False},
        )
        # double underscore before the name of the variable of a class makes it not traceble easily.
        self.__new_user = new_user
        self.__created = created
        self.__twitter_user_id = twitter_user_id

    def signup_or_login(self):

        # Signup
        # if created = True
        # I need to sign new user in.
        # meaning, need to generate jwt tokens for that user.
        # create profile for new user.
        if self.__created:
            access_token["user"] = self.__new_user
            access_token["twitter_user_id"] = self.__twitter_user_id
            Access_token(**access_token).save()

            # jwt authentication
            # Generate JWT tokens
            refresh = RefreshToken.for_user(self.__new_user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)
            # TODO: this cryptographic timestampsigner is temporary, we need to use more robust library like PyJWT, which are specifically made for this purpose.
            # Create a signed token that expires in 5 minutes
            signer = TimestampSigner()
            token_data = {
                "access_token": access_token,
                "refresh_token": refresh_token,
            }
            signed_token = signer.sign_object(token_data)

            # create profile for new user, meaning new object for the profile model is being created.
            Profile.objects.update_or_create(
                user=self.__new_user,
                name = 
            )

            return signed_token

    def logout(self, user): ...


# creating rest api to transfer "authentication_url", recieve "response_url" and than tranfer "access_token".
class TwitterAuthView(APIView):

    def twitter_auth_url(self):
        self.oauth2_user_handler = get_handler()
        self.auth_url = self.oauth2_user_handler.get_authorization_url()
        # below cache is set for 300sec = 5min by default, you can change it also by changing the "timeout" argument.
        cache.set("_client", self.oauth2_user_handler._client.__dict__)
        return self.auth_url

    def get(self, request):
        auth_url = self.twitter_auth_url()
        return Response({"auth_url": auth_url}, status=status.HTTP_200_OK)
