from django.db import models
from django.contrib.auth.models import User
from PIL import Image
from django.contrib.auth.models import AbstractUser
from django.conf import settings


# creating the custom user: https://docs.djangoproject.com/en/5.1/topics/auth/customizing/#substituting-a-custom-user-model
class CustomUser(AbstractUser):
    username = models.CharField(
        max_length=15,
        unique=True,
        blank=False,
    )
    is_admin_user = models.BooleanField(default=False)
    # this model is inehriting the built-in user model fields as well.

    # when we do createsuperuser than below fields are going to be prompted.
    # refer: https://docs.djangoproject.com/en/5.1/topics/auth/customizing/#django.contrib.auth.models.CustomUser.REQUIRED_FIELDS
    REQUIRED_FIELDS = ["is_admin_user"]

    def __str__(self) -> str:
        return self.username


# Create your models here.
class Profile(models.Model):
    # "User": consist of username
    # settings.AUTH_USER_MODEL: contains the custom user model name. It is better approach than fetching the customuser model from it is created as specified in django docs.
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    # "Name": consist of first name and last name provided by user after creating the account.
    name = models.CharField(max_length=50, blank=True)
    image = models.ImageField(default="./Users/default.png", upload_to="profile_pics")
    bio = models.TextField(max_length=200, blank=True)
    location = models.CharField(max_length=50, blank=True)
    website = models.URLField(blank=True)
    birth_date = models.DateField(blank=True, null=True)
    # I used "auto_now_add=True" to automatically set the date when the user is created.And I didnt not used "auto_now=True" because it Automatically set the field to "now" every time the object is saved.
    joined = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} Profile"

    # '@property' decorator allows a function to be accessed like an attribute.
    @property
    def followers(self):
        # we are looking for user whose profile is this in the followed_user column of the Follow table.
        # That will provide us the details of whom this user follows.
        # So, this function "followers" will return the number of users who follow this user.
        return Follow.objects.filter(followed_user=self.user).count()

    @property
    def following(self):
        # so, this function "following" will return the number of users who this user follows.
        return Follow.objects.filter(user=self.user).count()

    def save(
        self, force_insert=False, force_update=False, using=None, update_fields=None
    ):
        super().save()
        img = Image.open(self.image.path)
        if img.height > 300 or img.width > 300:
            output_size = (300, 300)
            img.thumbnail(output_size)
            img.save(self.image.path)


# I don't think so that we need to create a followview cause we dont want to transfer this data through api.
# The follow data as needed is already being transfered with profile view
# Thats why no need to create a serializer and views for this model.
class Follow(models.Model):
    """
    "Follow": consist of user and followed_user. So, an object of this class will consist of all the
    users ( user ) and whom they follow ( followed_user ). An object of a model in django is a row of data.
    That means one object of this model consist of a "user" and whom "this user" follows.
    """

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="user", on_delete=models.CASCADE
    )
    followed_user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="followed_user", on_delete=models.CASCADE
    )
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "followed_user")

    def __str__(self):
        return f"{self.user.username} follows {self.followed_user.username}"


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
