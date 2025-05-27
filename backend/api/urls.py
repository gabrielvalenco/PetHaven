from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from .views import UserViewSet, NGOViewSet, AnimalViewSet, AdoptionViewSet, ReviewViewSet
from .auth import register_user, CustomAuthToken

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
    
    # Autenticação customizada
    path('auth/register/', register_user, name='register'),
    path('auth/login/', CustomAuthToken.as_view(), name='login'),
]
