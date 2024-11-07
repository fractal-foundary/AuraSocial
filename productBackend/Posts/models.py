from django.db import models
from django.conf import settings


class Tweet(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.TextField(max_length=280)
    created_at = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="liked_tweets", blank=True
    )

    def __str__(self):
        return f"{self.user.username}: {self.content[:50]}"

    @property
    def likes_count(self):
        return self.likes.count()
