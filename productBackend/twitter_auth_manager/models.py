from django.db import models
import time
from datetime import datetime
from django.utils import timezone
from django.utils.timezone import make_aware
from django.conf import settings


class Access_token(models.Model):
    # twitter_username cannot be longer than 15 characters, from official twitter site.
    # I should not create a username field instead a django user model which contains the username already.

    # settings.AUTH_USER_MODEL: contains the custom user model name. It is better approach than fetching the customuser model from it is created as specified in django docs.
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="new_access_token_user",
    )

    # TODO: we need to add unique=True in twitter_user_id once in production ( not in development )
    twitter_user_id = models.CharField(max_length=50, unique=False)
    twitter_username = models.CharField(max_length=15, unique=False, default="newUser")
    token_type = models.CharField(max_length=10)
    # will expire in 2hr
    expires_in = models.IntegerField()
    access_token = models.CharField(max_length=150)
    scope = models.CharField(max_length=150)
    refresh_token = models.CharField(max_length=150)

    # epoch time; will expire in 2hr
    expires_at = models.FloatField()

    # get_expire_date: convert this epoch time to human readable time, so that I can understand.
    def get_expire_date(self):
        return make_aware(
            datetime.fromtimestamp(time.mktime(time.localtime(self.expires_at))),
            timezone.get_current_timezone(),
        )

    get_expire_date.short_description = "Expire date"

    @property
    def is_valid(self):
        if self.get_expire_date() > timezone.now():
            return True
        return False

    class Meta:
        verbose_name = "Access Token"
        verbose_name_plural = "Access Tokens"
