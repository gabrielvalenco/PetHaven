from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, NGOViewSet, AnimalViewSet, AdoptionViewSet, ReviewViewSet

# Create a router and register our viewsets with it
router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'ngos', NGOViewSet)
router.register(r'animals', AnimalViewSet)
router.register(r'adoptions', AdoptionViewSet)
router.register(r'reviews', ReviewViewSet)

# The API URLs are now determined automatically by the router
urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('rest_framework.urls')),  # Adds login/logout for browsable API
]
