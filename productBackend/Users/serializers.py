from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Tweet, Follow
from django.contrib.auth import get_user_model
from re import search

# getting the custom_user_model i created.
User = get_user_model()

# ---------------------- User CRUD -----------------------


# User READ
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "first_name", "last_name", "email"]


# UserCUDSerializer: User (CREATE,UPDATE,Delete)
class UserCUDSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # preserve this fields order.
        fields = [
            "username",
            "first_name",
            "last_name",
            "email",
        ]

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
    # not really creating the user instance using this as of right now, 2nov2024
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

    def delete(self, instance):
        """
        Issues an SQL DELETE for the object. This only deletes the object in the database; the Python instance will still exist and will still have data in its fields, except for the primary key set to None. This method returns the number of objects deleted and a dictionary with the number of deletions per object type.
        """
        instance.delete()
        return instance


# ---------------------- Profile CRUD -----------------------


# Read the profile using this serializer.
class ProfileSerializer(serializers.ModelSerializer):
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
            "social_score",
            "wallet_address",
            "followers_count",
            "following_count",
        ]


# profile -----> creation, updation, deletion.
class ProfileCUDSerializer(serializers.ModelSerializer):
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
            "social_score",
            "wallet_address",
            "followers_count",
            "following_count",
        ]

    # TODO: write more validation logic for more attributes in profile, spec is unknown to me rigt now, 2nd nov.
    def validate(self, data):
        wallet_address = data.get("wallet_address")
        social_score = data.get("social_score")

        # check validity of ethereum based wallet, only them for now.
        if not search(r"^0x[a-fA-F0-9]{40}$", wallet_address):
            raise serializers.ValidationError("Your Wallet Address is not valid")
        elif not (social_score >= 0 and social_score <= 100):
            raise serializers.ValidationError(
                "Social score is not in between 0 and 100 ( both included )"
            )
        else:
            return data

    def create(self, validated_data):
        profile = Profile.objects.create(**validated_data)
        return profile

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.image = validated_data.get("image", instance.image)
        instance.bio = validated_data.get("bio", instance.bio)
        instance.location = validated_data.get("location", instance.location)
        instance.website = validated_data.get("website", instance.website)
        instance.birth_date = validated_data.get("birth_date", instance.birth_date)
        # social_score needs its own serializer to be updated, as it is going to updated very often.
        instance.wallet_address = validated_data.get("wallet_address", instance.email)
        instance.save()
        return instance

    def delete(self, instance):
        instance.delete()
        return instance


# we will calculate social_score with "Celery Beat" or "cron jobs", as serializers typically more relevant for handling data input/output in response to HTTP requests rather than for scheduled or automated background tasks.
