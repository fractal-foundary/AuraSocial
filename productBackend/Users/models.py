from django.db import models
from PIL import Image
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager,
)
from django.conf import settings
from django.utils import timezone
from django.utils.translation import gettext_lazy as _


# Custom user is created
class CustomUserManager(BaseUserManager):
    def create_user(self, username, first_name, last_name, email, password=None):
        if not email:
            raise ValueError("Users must have an email address")

        email = self.normalize_email(email)

        user = self.model(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email,
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, username, first_name, last_name, email, password=None):
        user = self.create_user(
            username,
            first_name,
            last_name,
            email,
            password=password,
        )

        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


# AbstractBaseUser and AbstractUser are 2 different types of classes.
# AbstractBaseUser: Provides basic fields like password, last_login, and is_active, bareBone class to create customUser. It needs a custom base manager as well.
# AbstractUser: it is a more feature-rich class that extends AbstractBaseUser.
class CustomUser(AbstractBaseUser, PermissionsMixin):
    # username with length 15 can give me "342.7 quintillion" possible unique username
    username = models.CharField(
        # username unique = False in development for testing purposes. but in production it will be true.
        max_length=15,
        unique=True,
        blank=False,
    )
    # email unique = False in development for testing purposes. but in production it will be true.
    email = models.EmailField(
        # email maximum length is 254 characters.
        max_length=255,
        # null needs to false in production.
        null=True,
        unique=False,
    )
    date_joined = models.DateTimeField(_("date joined"), default=timezone.now)
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = "username"
    EMAIL_FIELD = "email"
    # when we do createsuperuser than below fields are going to be prompted.
    REQUIRED_FIELDS = ["first_name", "last_name", "email"]

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
    # social_score = models.PositiveIntegerField()

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
