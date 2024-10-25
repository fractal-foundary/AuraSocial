from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.core.cache import cache
from rest_framework import status
from .serializers import (
    ProfileSerializer,
    UserCreateSerializer,
    UserSerializer,
)
from rest_framework_simplejwt.tokens import RefreshToken

# from .SocialScore.social_score import (
#     SocialScoreCalculator,
#     EngagementMetrics,
#     ContentQuality,
#     Trustworthiness,
#     SocialImpact,
#     MonetizationPotential,
#     GovernanceParticipation,
# )
from .models import Profile


class UserUpdateView(APIView):

    # this "get request" is just to check wheather the user we are working with exits.
    def get(self, request):
        user = request.user
        user_details = UserSerializer(user)
        return Response(user_details.data, status=status.HTTP_200_OK)

    def put(self, request):
        data = request.data

        # got the serializer instance for the fetched data, and passsed that data to constructor.
        # Doubt, than visit: https://www.django-rest-framework.org/api-guide/serializers/#saving-instances
        serializer = UserCreateSerializer(request.user, data=data)

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


@api_view(["POST"])
def CustomTokenObtainPairView(request):
    user = cache.get("new_user")
    refresh = RefreshToken.for_user(user)

    return Response(
        {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        },
        status.HTTP_200_OK,
    )


class ProfileUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        profile = Profile.objects.get(user=request.user)

        serializer = ProfileSerializer(
            instance=profile, data=request.data, partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(["GET"])
# def calculate_social_score(request):

#     calculator = SocialScoreCalculator()

#     result = calculator.calculate_social_score(
#         engagement=EngagementMetrics(
#             engagement_rate=float(request.data["engagement_rate"]),
#             interaction_quality=float(request.data["interaction_quality"]),
#             growth_rate=float(request.data["growth_rate"]),
#         ),
#         content=ContentQuality(
#             frequency=float(request.data["content_frequency"]),
#             originality=float(request.data["content_originality"]),
#             diversity=float(request.data["content_diversity"]),
#         ),
#         trust=Trustworthiness(
#             trust_score=float(request.data["trust_score"]),
#             verified_followers=float(request.data["verified_followers"]),
#             reputation_index=float(request.data["reputation_index"]),
#         ),
#         impact=SocialImpact(
#             network_influence=float(request.data["network_influence"]),
#             trend_setting=float(request.data["trend_setting"]),
#             mentions_reposts=float(request.data["mentions_reposts"]),
#         ),
#         monetization=MonetizationPotential(
#             token_transactions=float(request.data["token_transactions"]),
#             crowdfunding=float(request.data["crowdfunding"]),
#             endorsement_success=float(request.data["endorsement_success"]),
#         ),
#         governance=GovernanceParticipation(
#             voting_activity=float(request.data["voting_activity"]),
#             proposal_contribution=float(request.data["proposal_contribution"]),
#         ),
#     )

#     return Response(result, status.HTTP_200_OK)
