from rest_framework import serializers
from .models import Follow, Profile

# try to find a way to use dataclasses they seem pretty coool....


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = (
            "user",
            "Name",
            "image",
            "bio",
            "location",
            "joined",
            "followers",
            "following",
        )
