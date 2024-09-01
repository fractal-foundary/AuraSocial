from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r"profile", views.ProfileViewSet, basename="profile")
router.register(r"tweets", views.TweetViewSet, basename="tweet")
router.register(r"follow", views.FollowViewSet, basename="follow")

urlpatterns = [path("api/", include(router.urls))]
