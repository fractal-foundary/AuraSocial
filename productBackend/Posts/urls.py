from django.urls import path
from .views import ExploreView

urlpatterns = [
    path("explore/", ExploreView.as_view(), name="explore"),
]
