from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from django.contrib.auth import authenticate
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect, csrf_exempt
from django.http import JsonResponse
from django.utils.decorators import method_decorator

from .serializers import UserSerializer

# Ensure we use a more forceful CSRF exemption approach
@method_decorator(csrf_exempt, name='dispatch')
class CustomAuthToken(ObtainAuthToken):
    permission_classes = [AllowAny]
    authentication_classes = []  # This ensures no authentication is required for this view
    
    def post(self, request, *args, **kwargs):
        # Print debug information
        print(f"Login attempt for: {request.data.get('username', 'unknown')}") 
        
        serializer = self.serializer_class(data=request.data,
                                          context={'request': request})
        try:
            serializer.is_valid(raise_exception=True)
            user = serializer.validated_data['user']
            token, created = Token.objects.get_or_create(user=user)
            
            print(f"Login successful for: {user.username}")
            
            return Response({
                'token': token.key,
                'user_id': user.pk,
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
            })
        except Exception as e:
            print(f"Login error: {str(e)}")
            return Response(
                {'non_field_errors': ['Credenciais inválidas. Por favor, verifique seu nome de usuário e senha.']},
                status=status.HTTP_400_BAD_REQUEST
            )

@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
def register_user(request):
    """
    Registra um novo usuário
    """
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        if user:
            # Definir a senha do usuário
            user.set_password(request.data.get('password'))
            user.save()
            
            # Criar token para o usuário
            token, created = Token.objects.get_or_create(user=user)
            
            return Response({
                'token': token.key,
                'user_id': user.id,
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
            }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny])
@ensure_csrf_cookie
def get_csrf_token(request):
    """
    Endpoint for getting CSRF token
    This view doesn't do anything, but forces Django to send the CSRF cookie
    """
    return JsonResponse({'detail': 'CSRF cookie set'})
