from django.urls import path
import views

urlpatterns = [
    path("explore/", views.ExploreView.as_view(), name="explore"),
    path("timeline/", views.TimelineListView.as_view(), name="timeline"),
]
