from django.urls import path
from . import views

urlpatterns = [

    # POST http://localhost:8000/api/login
    path("login", views.login),

    # POST http://localhost:8000/api/logout
    path("logout", views.logout),

    # GET http://localhost:8000/api/vacations-status
    path("vacations-status", views.get_vacations_status),

    # GET http://localhost:8000/api/users-count
    path("users-count", views.get_users_count),

    # GET http://localhost:8000/api/likes-count
    path("likes-count", views.get_likes_count),

    # GET http://localhost:8000/api/likes-distribution
    path("likes-distribution", views.get_likes_distribution)

]