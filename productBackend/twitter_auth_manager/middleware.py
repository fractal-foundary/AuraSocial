from django.utils import timezone
from .models import Access_token
from .views import twitter_refresh_token


class TwitterTokenRefreshMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.user.is_authenticated and not request.user.is_admin_user:
            try:
                print("current user ---------> ", request.user)
                token = Access_token.objects.get(user=request.user)
                if token.expires_at <= timezone.now().timestamp():
                    twitter_refresh_token(token)
            except Access_token.DoesNotExist:
                print(
                    " ------------- middleware to generate the accesstoken from refreshtoken but the no accesstoken exist with this user. ------------ "
                )
                pass

        response = self.get_response(request)
        return response
