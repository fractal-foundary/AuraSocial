from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth import get_user_model


# refer: https://docs.djangoproject.com/en/5.1/topics/auth/default/#django.contrib.auth.authenticate
class JWTAuthenticationBackend(JWTAuthentication):
    def authenticate(self, request):
        user_and_token = super().authenticate(request)
        if user_and_token is not None:
            user, token = user_and_token
            if not user.is_admin_user:
                return user, token
        return None
