# rest apis to manage posts, reposts, bookmark.
from rest_framework.views import APIView
from rest_framework import viewsets, generics
from rest_framework.response import Response
from rest_framework import authentication, permissions
from .models import Post, RePost, Bookmark
from .serializers import PostSerializer, PostCUSerializer
from Users.models import Follow

# explore : list of posts for the timeline, no need to set queryset for the currently authenticated user.

# users timeline: only show the post this user follows.
# profile page : list the posts of currently logged in user.


# explore: list every new post, no matter the user follows or not.
class ExploreView(generics.ListAPIView):
    # authentication_classes and permission_classes are already taken care of in settings.
    # queryset vs get_queryset(): https://stackoverflow.com/a/19707855
    queryset = Post.objects.all().order_by("-created_at")
    serializer_class = PostSerializer


class TimelineView(generics.ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        user = self.request.user
        followed_user = Follow.objects.filter(user=user)
