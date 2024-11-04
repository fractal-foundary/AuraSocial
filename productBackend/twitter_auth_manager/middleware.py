from .models import Access_token
from .views import twitter_refresh_token


# i think this middleware should work.
class TwitterTokenRefreshMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.user.is_authenticated and not request.user.is_superuser:
            try:
                print("current user ---------> ", request.user)
                token = Access_token.objects.get(user=request.user)
                if not token.is_valid:
                    print(type(token.refresh_token))
                    twitter_refresh_token(token)
                else:
                    print(
                        f"Twitter AccessToken is valid for till: {token.get_expire_date()}"
                    )
            except Access_token.DoesNotExist:
                print(
                    " ------------- middleware to generate the accesstoken from refreshtoken but the no accesstoken exist with this user. ------------ "
                )
                pass

        response = self.get_response(request)
        return response
