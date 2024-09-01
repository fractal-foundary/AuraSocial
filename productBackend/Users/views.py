from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from django.contrib.auth.models import User
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Profile, Tweet, Follow
from .serializers import ProfileSerializer, TweetSerializer, FollowSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Profile.objects.filter(user=self.request.user)

    def get_object(self):
        return self.request.user.profile


class TweetViewSet(viewsets.ModelViewSet):
    serializer_class = TweetSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Tweet.objects.filter(user=self.request.user).order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=["post"])
    def like(self, request, pk=None):
        tweet = self.get_object()
        if request.user in tweet.likes.all():
            tweet.likes.remove(request.user)
        else:
            tweet.likes.add(request.user)
        return Response(status=status.HTTP_200_OK)


class FollowViewSet(viewsets.ModelViewSet):
    serializer_class = FollowSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Follow.objects.filter(user=self.request.user)

    @action(detail=False, methods=["post"])
    def toggle(self, request):
        user_to_follow_id = request.data.get("user_id")
        user_to_follow = get_object_or_404(User, id=user_to_follow_id)
        if request.user != user_to_follow:
            follow, created = Follow.objects.get_or_create(
                user=request.user, followed_user=user_to_follow
            )
            if not created:
                follow.delete()
                return Response({"status": "unfollowed"}, status=status.HTTP_200_OK)
            return Response({"status": "followed"}, status=status.HTTP_201_CREATED)
        return Response(
            {"error": "You cannot follow yourself"}, status=status.HTTP_400_BAD_REQUEST
        )
