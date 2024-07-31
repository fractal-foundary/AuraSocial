from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ProfileSerializer
from .models import Profile, Follow


class ProfileView(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
