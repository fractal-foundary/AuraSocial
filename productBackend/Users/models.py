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


class Profile(models.Model):
    # settings.AUTH_USER_MODEL: contains the custom user model name you explicitely specified.
    # "user": consist of username so, profile doesn't need to have that.
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    # "Name": consist of first name and last name provided by user after creating the account.
    name = models.CharField(max_length=50, blank=True)
    image = models.ImageField(upload_to="profile_pics", blank=True, null=True)
    bio = models.TextField(max_length=200, blank=True)
    location = models.CharField(max_length=50, blank=True)
    website = models.URLField(blank=True)
    birth_date = models.DateField(blank=True, null=True)
    # I used "auto_now_add=True" to automatically set the date when the user is created.And I didnt not used "auto_now=True" because it Automatically set the field to "now" every time the object is saved.
    joined = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    social_score = models.PositiveIntegerField(default=0)
    # For now, Ethereum wallet addresses
    # Crypto wallet addresses can be 40 alphanumeric characters, Suitable for Ethereum addresses
    wallet_address = models.CharField(max_length=42, blank=True, default="0x00")

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


class Follow(models.Model):
    """
    user ========> followed_user (instance/row of model/database)
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
