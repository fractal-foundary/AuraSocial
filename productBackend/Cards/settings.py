from pathlib import Path
from dotenv import load_dotenv

# timedelta: to be used with simple_jwt
from datetime import timedelta

load_dotenv()
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# SECURITY WARNING: keep the secret key used in production secret!
# Generate secret key using following program...
# from django.core.management.utils import get_random_secret_key
# print(get_random_secret_key())
SECRET_KEY = os.getenv("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv("DEBUG") == "True"

ALLOWED_HOSTS = ["0.0.0.0", "127.0.0.1", "localhost", "backend"]


# Application definition

INSTALLED_APPS = [
    "twitter_auth_manager.apps.TwitterAuthManagerConfig",
    "Users.apps.UsersConfig",
    "django.contrib.sites",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "corsheaders",
    "rest_framework",
    "rest_framework_simplejwt",
]

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=5),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "AUTH_HEADER_TYPES": ("Bearer",),
}

AUTH_USER_MODEL = "Users.CustomUser"


# basically we are using Django rest framework, that needs this setting, to understand more, go to the notes.
SITE_ID = 1

# using local-memory cache, just for developement...
# for production will decide...
# as Additionally, the local-memory cache backend is NOT multi-process safe, therefore probably not a good choice for production environments.
CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
        # "LOCATION": "twitter_authentication",
    }
}

# https://docs.djangoproject.com/en/5.1/topics/cache/#order-of-middleware
MIDDLEWARE = [
    # UpdateCacheMiddleware: needs to be first in list.
    "django.middleware.cache.UpdateCacheMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    # corsheaders middelware...
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "twitter_auth_manager.middleware.TwitterTokenRefreshMiddleware",
    # FetchFromCacheMiddleware: needs to be last in the list.
    "django.middleware.cache.FetchFromCacheMiddleware",
]

# required cache settings.
CACHE_MIDDLEWARE_ALIAS = "default"
CACHE_MIDDLEWARE_SECONDS = 600
# key_prefix needs to be filled if the cache is shared across multiple sites.
CACHE_MIDDLEWARE_KEY_PREFIX = ""


# for origin of front-end don't use '127.0.0.1'. Use "localhost".
CSRF_TRUSTED_ORIGINS = [
    "http://127.0.0.1:10000",
    "http://localhost:3000",
    "http://localhost:10000",
]


# "CORS_ORIGIN_WHITELIST" changed to "CORS_ALLOWED_ORIGINS"
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:10000",
    "http://127.0.0.1:10000",
]

CORS_ALLOW_CREDENTIALS = True

ROOT_URLCONF = "Cards.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "Cards.wsgi.application"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": os.getenv("MYSQL_DATABASE"),
        "USER": os.getenv("MYSQL_USER"),
        "PASSWORD": os.getenv("MYSQL_PASSWORD"),
        "HOST": "db",
        "PORT": "3306",
    }
}


AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "Asia/Kolkata"

USE_I18N = True

USE_TZ = True


STATIC_URL = "static/"


DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


AUTHENTICATION_BACKENDS = [
    "django.contrib.auth.backends.ModelBackend",
    "Users.backends.JWTAuthenticationBackend",
]
