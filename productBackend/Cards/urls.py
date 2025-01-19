from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # with "api/social_accounts/" i cannot create twitter_auth_callback url due to "api" keyword.
    path("social_accounts/", include("twitter_auth_manager.urls")),
    path("api/user/", include("Users.urls")),
    path("api/posts/", include("Posts.urls")),
    path("admin/", admin.site.urls),
]
