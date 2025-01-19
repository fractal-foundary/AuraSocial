# rest apis to manage posts, reposts, bookmark.
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets, generics, status
from rest_framework import authentication, permissions
from .models import Post, RePost, Bookmark
from .serializers import PostSerializer, PostCUSerializer, PostLikeSerializer
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
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


class TimelineListView(generics.ListAPIView):
    serializer_class = PostSerializer

    def get_queryset(self):
        user = self.request.user
        # what is values_list: https://docs.djangoproject.com/en/5.1/ref/models/querysets/#django.db.models.query.QuerySet.values_list
        # user.following: is the reverse relationship used here.
        return Post.objects.filter(
            author__in=user.following.values_list("followed_user", flat=True)
        )


@api_view(["POST"])
def like_post(request, post_id):
    post = get_object_or_404(Post, id=post_id)
    user = request.user

    if user not in post.likes.all():
        # Like the post
        post.likes.add(user)
        message = "Post liked successfully"
    else:
        message = "Post not liked successfully"

    serializer = PostLikeSerializer(post, context={"request": request})
    return Response(
        {"message": message, "data": serializer.data}, status=status.HTTP_200_OK
    )


# only create and update the post
class PostAPIView(APIView): ...
