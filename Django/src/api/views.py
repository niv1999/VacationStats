from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import VacationModel, UserModel, LikesModel, RoleModel, UserSerializer
from datetime import datetime
from django.db.models import Count
from django.db.models.functions import Coalesce
from utils.cyber import Cyber

# Login view:
@api_view(["POST"])
def login(request):
    try:
        # Extract the users credentials from the request:
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response({ "error": "Required fields missing." }, status=status.HTTP_400_BAD_REQUEST)

        # Get the user by email and check if exists:
        user = UserModel.objects.get(email=email)
        if not user:
            return Response({ "error": "Incorrect Email or Password." }, status=status.HTTP_401_UNAUTHORIZED)

        # Hash the password and ensure it matches the users password:
        hashed_password = Cyber.hash(password)
        if hashed_password != user.password:
            return Response({ "error": "Incorrect Email or Password." }, status=status.HTTP_401_UNAUTHORIZED)

        # If the user does exist, make sure the user has an Admin role:
        if user.role.role_id != RoleModel.objects.get(role_name = "Admin").role_id:
            return Response({ "error": "You are not authorized." }, status=status.HTTP_403_FORBIDDEN)
        
        # Check if the user is already logged in to prevent from logging in again:
        if ("is_logged_in") in request.session:
            return Response({ "error": "You are already logged in!" }, status=status.HTTP_403_FORBIDDEN)
        
        # Create a key "is_logged_in" in the request.session to let the backend track whether the user is logged in:
        request.session["is_logged_in"] = True

        # Serialize the user (the serializer excludes the password field):
        serialized_user = UserSerializer(user)

        # Generate a JWT token to pass back to the user:
        jwt_token = Cyber.generate_jwt_token(serialized_user.data)
        return Response(jwt_token, status=status.HTTP_200_OK)
    
    except UserModel.DoesNotExist:
        return Response({ "error": "Incorrect Email or Password." }, status=status.HTTP_401_UNAUTHORIZED)
    
    except Exception as err:
        json = { "error": str(err) }
        return Response(json, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Logout view:
@api_view(["POST"])
def logout(request):
    try:
        # Empty the session dictionary:
        request.session.flush()
        return Response({ "message": "Logged out successfully!" }, status=status.HTTP_200_OK)
    
    except Exception as err:
        return Response({ "error": str(err) }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Get the status of all vacations (total of each past/ongoing/future vacations): 
@api_view(["GET"])
def get_vacations_status(request):
    try:
        # Check if the user is logged in to make sure he is allowed to view this stat:
        if ("is_logged_in") not in request.session:
            return Response({ "error": "You are not logged-in!" }, status=status.HTTP_401_UNAUTHORIZED)
        
        # Get all the vacations, the current day, and create 3 variables to track the number of past/ongoing/future vacations:
        vacations = VacationModel.objects.all()
        today = datetime.today().date()
        past_vacations = 0
        ongoing_vacations = 0
        future_vacations = 0
        
        # Iterate over the vacations array to check the status of each vacation and increase the appropriate variable:
        for vacation in vacations:
            if today < vacation.start_date: future_vacations += 1
            elif today > vacation.end_date: past_vacations += 1
            else: ongoing_vacations += 1
        
        # Create a JSON formatted variable to pass as a response:
        json = {
            "past_vacations": past_vacations,
            "ongoing_vacations": ongoing_vacations,
            "future_vacations": future_vacations
        }

        return Response(json, status=status.HTTP_200_OK)
    
    except Exception as err:
        json = { "error": str(err) }
        return Response(json, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Get the total number of users registered to the website:
@api_view(["GET"])
def get_users_count(request):
    try:
        # Check if the user is logged in to make sure he is allowed to view this stat:
        if ("is_logged_in") not in request.session:
            return Response({ "error": "You are not logged-in!" }, status=status.HTTP_401_UNAUTHORIZED)
        
        users_count = UserModel.objects.count()
        json = { "users_count": users_count }
        return Response(json, status=status.HTTP_200_OK)
    
    except Exception as err:
        json = { "error": str(err) }
        return Response(json, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Get the total number of registered likes in the website:
@api_view(["GET"])
def get_likes_count(request):
    try:
        # Check if the user is logged in to make sure he is allowed to view this stat:
        if ("is_logged_in") not in request.session:
            return Response({ "error": "You are not logged-in!" }, status=status.HTTP_401_UNAUTHORIZED)
        
        likes_count = LikesModel.objects.count()
        json = { "likes_count": likes_count }
        return Response(json, status=status.HTTP_200_OK)
    
    except Exception as err:
        json = { "error": str(err) }
        return Response(json, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Get the likes distribution per country:
@api_view(["GET"])
def get_likes_distribution(request):
    try:
        # Check if the user is logged in to make sure he is allowed to view this stat:
        if ("is_logged_in") not in request.session:
            return Response({ "error": "You are not logged-in!" }, status=status.HTTP_401_UNAUTHORIZED)

        # Query to calculate the total number of likes per country:
        
        # This queryset aggregates the likes for all vacations within each country.
        likes_per_country = (
            
            # Start with getting all vacations: 
            VacationModel.objects

            # Group the vacations by country name and get only that field:
            .values("country__country_name")

            # Annotate each country with the total number of likes it has
            # Coalesce is used to handle cases where there are no likes for a vacation in a country, ensuring that we always get a valid number.
            .annotate(total_likes=Coalesce(Count("likesmodel"), 0))
        )

        # Generate a json formatted array with the country name and the total likes:
        likes_distribution_json = [{"country_name": item["country__country_name"], "likes": item["total_likes"]} for item in likes_per_country]

        return Response(likes_distribution_json, status=status.HTTP_200_OK)
    
    except Exception as err:
        json = { "error": str(err) }
        return Response(json, status=status.HTTP_500_INTERNAL_SERVER_ERROR)