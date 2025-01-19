from django.urls import path
from .views import ExploreView, TimelineListView

urlpatterns = [
    path("explore/", ExploreView.as_view(), name="explore"),
    path("timeline/", TimelineListView.as_view(), name="timeline"),
]
