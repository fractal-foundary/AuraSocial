from rest_framework import views, viewsets
from rest_framework.decorators import api_view
from rest_framework import permissions, authentication
from rest_framework.response import Response
from rest_framework import status
from .serializers import (
    ProfileSerializer,
    UserCUDSerializer,
    UserSerializer,
    ProfileCUDSerializer,
)
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Profile


class UserAPIView(views.APIView):

    # this "get request" is just to check wheather the user we are working with exits.
    def get(self, request):
        user = request.user
        user_details = UserSerializer(user)
        return Response(user_details.data, status=status.HTTP_200_OK)

    # update the existing user.
    def put(self, request):
        data = request.data

        # got the serializer instance for the fetched data, and passsed that data to constructor.
        # Doubt, than visit: https://www.django-rest-framework.org/api-guide/serializers/#saving-instances
        serializer = UserCUDSerializer(request.user, data=data)

        # check data validity.
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_404_BAD_REQUEST)

        # update the new user.
        print(request.user)
        user = serializer.update(request.user, serializer.validated_data)
        # get the new user details.
        new_user_details = UserSerializer(user)

        # return the new user details to flag that new user has been created and saved in the database.
        return Response(new_user_details.data, status=status.HTTP_201_CREATED)

    def delete(self, request):
        serializer = UserCUDSerializer(request.user)

        instance = serializer.delete()
        # i dont know right now,if "instance" can be sent with a respose.
        return Response(instance, status=status.HTTP_200_OK)


# i used get request here, cause i am sendind jwtTokens, not recieving them, because post request require authentication first. Unlike get request.
# TODO: improve it.
@api_view(["GET"])
def CustomTokenObtainPairView(request):
    print("request.user +========>", request.user, "request:", request)
    refresh = RefreshToken.for_user(request.user)

    return Response(
        {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        },
        status.HTTP_200_OK,
    )


class ProfileAPIView(views.APIView):

    def get(self, request):
        profile = Profile.objects.get(user=request.user)
        profile_details = ProfileSerializer(profile)
        return Response(profile_details.data, status=status.HTTP_200_OK)

    # update the existing profile.
    def put(self, request):
        data = request.data
        profile = Profile.objects.get(user=request.user)
        # got the serializer instance for the fetched data, and passsed that data to constructor.
        serializer = ProfileCUDSerializer(profile, data=data)

        # check data validity.
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_404_BAD_REQUEST)

        # update the profile.
        profile = serializer.update(profile, serializer.validated_data)
        # get the new profile details.
        new_profile_details = UserSerializer(profile)

        # return the new user details to flag that new user has been created and saved in the database.
        return Response(new_profile_details.data, status=status.HTTP_200_OK)

    def delete(self, request):
        profile = Profile.objects.get(user=request.user)
        serializer = ProfileCUDSerializer(profile)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_404_BAD_REQUEST)

        instance = serializer.delete()
        # i dont know right now,if "instance" can be sent with a respose.
        return Response(instance, status=status.HTTP_200_OK)
