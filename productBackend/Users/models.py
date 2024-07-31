from django.db import models
from django.contrib.auth.models import User
from PIL import Image


# Create your models here.
class Profile(models.Model):
    # "User": consist of username
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # "Name": consist of first name and last name provided by user after creating the account.
    Name = models.CharField(max_length=50, blank=True)
    image = models.ImageField(default="./default.png", upload_to="profile_pics")
    bio = models.TextField(max_length=200, blank=True)
    location = models.CharField(max_length=50, blank=True)
    website = models.URLField(blank=True)
    DOB = models.DateField(blank=True, null=True)
    # I used auto_now_add=True to automatically set the date when the user is created.And not auto_now=True because Automatically set the field to now every time the object is saved.
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

    user = models.ForeignKey(User, related_name="user", on_delete=models.CASCADE)
    followed_user = models.ForeignKey(
        User, related_name="followed_user", on_delete=models.CASCADE
    )
    date = models.DateTimeField(auto_now_add=True)
