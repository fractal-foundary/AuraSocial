from django.db import models
from django.conf import settings


# TODO
# 1. Video ----> right now, only storing the url of the videos( not the videos ), and will just embed it on the frontend side.
# 2. keep in mind that, ImageField instances are created in your database as varchar columns with a default max length of 100 characters, thus if something breaks while storing image, come here.
# 3. views on post is not yet calculated but in future for sure.
class Post(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.TextField(max_length=252)
    # auto_now_add: only updated once when new instance created.
    created_at = models.DateTimeField(auto_now_add=True)
    # auto_now: updated when new instance updated.
    updated_at = models.DateTimeField(auto_now=True)
    image = models.ImageField(upload_to="posts")
    video_url = models.URLField(max_length=200)
    likes = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="liked_tweets", blank=True
    )

    def __str__(self):
        return f"Post of {self.user.username}: {self.content[:20]}"

    @property
    def likes_count(self):
        return self.likes.count()


# Used inheritence to make the repost model as it is similar to post model only difference is that, repost contains an foreignkey relation with post model.
class RePost(Post):
    original_post = models.ForeignKey(
        Post, related_name="RePost", on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.user.username} reposted {self.original_post}"


class Bookmark(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    post = models.ForeignKey(
        Post, on_delete=models.CASCADE, related_name="bookmarked_post"
    )

    def __str__(self):
        return f"{self.user.username} bookmarked the {self.post}"
