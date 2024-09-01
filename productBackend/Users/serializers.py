from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Tweet, Follow


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    followers_count = serializers.ReadOnlyField()
    following_count = serializers.ReadOnlyField()

    class Meta:
        model = Profile
        fields = [
            "user",
            "name",
            "image",
            "bio",
            "location",
            "website",
            "birth_date",
            "joined",
            "followers_count",
            "following_count",
        ]


class TweetSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    likes_count = serializers.ReadOnlyField()
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = Tweet
        fields = ["id", "user", "content", "created_at", "likes_count", "is_liked"]

    def get_is_liked(self, obj):
        user = self.context["request"].user
        return user in obj.likes.all()


class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = ["id", "user", "followed_user", "date"]
