from rest_framework import viewsets, permissions, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth.models import User

from .models import NGO, Animal, Adoption, Review
from .serializers import UserSerializer, NGOSerializer, AnimalSerializer, AdoptionSerializer, ReviewSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ['username', 'email', 'first_name', 'last_name']
    
    @action(detail=True, methods=['get'])
    def adoptions(self, request, pk=None):
        user = self.get_object()
        adoptions = Adoption.objects.filter(user=user)
        serializer = AdoptionSerializer(adoptions, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def reviews(self, request, pk=None):
        user = self.get_object()
        reviews = Review.objects.filter(user=user)
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)

class NGOViewSet(viewsets.ModelViewSet):
    queryset = NGO.objects.all()
    serializer_class = NGOSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['name', 'city', 'email']
    filterset_fields = ['city']
    
    @action(detail=True, methods=['get'])
    def animals(self, request, pk=None):
        ngo = self.get_object()
        animals = Animal.objects.filter(ngo=ngo)
        serializer = AnimalSerializer(animals, many=True)
        return Response(serializer.data)

class AnimalViewSet(viewsets.ModelViewSet):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.SearchFilter, DjangoFilterBackend, filters.OrderingFilter]
    search_fields = ['name', 'breed', 'description']
    filterset_fields = ['type', 'size', 'gender', 'ngo', 'is_available']
    ordering_fields = ['name', 'age', 'created_at']
    
    @action(detail=True, methods=['get'])
    def adoptions(self, request, pk=None):
        animal = self.get_object()
        adoptions = Adoption.objects.filter(animal=animal)
        serializer = AdoptionSerializer(adoptions, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def reviews(self, request, pk=None):
        animal = self.get_object()
        reviews = Review.objects.filter(animal=animal)
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)

class AdoptionViewSet(viewsets.ModelViewSet):
    queryset = Adoption.objects.all()
    serializer_class = AdoptionSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['status', 'user', 'animal']
    
    @action(detail=True, methods=['post'])
    def update_status(self, request, pk=None):
        adoption = self.get_object()
        status = request.data.get('status')
        
        if status not in dict(Adoption.STATUS_CHOICES).keys():
            return Response({"error": "Invalid status"}, status=status.HTTP_400_BAD_REQUEST)
            
        adoption.status = status
        adoption.save()
        
        serializer = AdoptionSerializer(adoption)
        return Response(serializer.data)

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['user', 'animal', 'rating']
    ordering_fields = ['rating', 'created_at']

