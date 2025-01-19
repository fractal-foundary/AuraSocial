from rest_framework import serializers
from .models import Post
from django.contrib.auth import get_user_model
from re import search

# getting the custom_user_model i created.
User = get_user_model()

# ---------------------- Post CRUD -----------------------


# Post READ
class PostSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.username")
    likes = serializers.ReadOnlyField()
    # write_only: meaning you can send data for this field in a request and but is not included in Response.
    is_liked = serializers.BooleanField(write_only=True, required=True)

    class Meta:
        model = Post
        fields = [
            "id",
            "author",
            "content",
            "created_at",
            "updated_at",
            "image",
            "video_url",
            "likes",
            "likes_count",
            "is_liked",
        ]
        read_only_fields = [
            "id",
            "author",
            "created_at",
            "updated_at",
            "likes_count",
            "likes",
        ]


# PostCUDSerializer: Post (CREATE,UPDATE)
class PostCUSerializer(PostSerializer):

    def create(self, validated_data):
        validated_data["user"] = self.context.get("request").user
        return super().create(validated_data)

    def update(self, instance, validated_data):
        instance.content = validated_data.get("content", instance.content)
        instance.image = validated_data.get("image", instance.image)
        instance.video_url = validated_data.get("video_url", instance.video_url)

        # how can someone likes a post, below is the code for that.
        """ request = self.context.get("request")
        if request and request.user:
            if "is_liked" in validated_data and validated_data["is_liked"]:
                if not instance.likes.filter(id=request.user.id).exists():
                    instance.likes.add(request.user)
                    # request.user ----> currently logged in user, vo hi "like" karega post, cause bina loggedin user koi like nahi kar sakta koi.
        """
        instance.save()
        return instance

    # deletion of instance logic taken care by apiviews, so you dont need to do anything for that here.
    # serializers typically handle data validation and transformation rather than managing deletion logic


class PostLikeSerializer(serializers.ModelSerializer):
    is_liked = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ["id", "likes_count", "is_liked"]

    def get_is_liked(self, obj):
        user = self.context.get("request").user
        return user in obj.likes.all()

    def get_likes_count(self, obj):
        return obj.likes.count()
