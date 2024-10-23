from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Tweet, Follow
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from re import search

# getting the custom user model we made the right way.
User = get_user_model()


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # preserve this fields order.
        fields = [
            "username",
            "first_name",
            "last_name",
            "email",
        ]

    # lets validate the username here,I want twitter like username.
    # Twitter official username spec: https://help.x.com/en/managing-your-account/change-x-handle
    # Why can't I did this in the CustomUser or basemanager itself ?
    # Reason: because that means if i want to change this in future, i have to change the database table, that is a hard job compared to below.
    def validate(self, data):
        username = data.get("username")

        if search(r"^[A-Za-z_0-9]{4,15}$", username):
            return data
        else:
            raise serializers.ValidationError(
                "Please, type in the valid username.\n A valid username is as follows:\n a) Length: A username must be between 4 and 15 characters long.\n b) Characters: A username can only contain letters, numbers, and underscores. It cannot contain spaces, dashes, or other symbols."
            )

    # visit ---> https://www.django-rest-framework.org/api-guide/serializers/#saving-instances to understand the below .create() method.
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        instance.username = validated_data.get("username", instance.username)
        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.last_name = validated_data.get("last_name", instance.last_name)
        instance.email = validated_data.get("email", instance.email)
        instance.save()
        return instance


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "first_name", "last_name", "email"]


class ProfileSerializer(serializers.ModelSerializer):
    user = UserCreateSerializer(read_only=True)
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
