from rest_framework import (
    generics,
    authentication,
    permissions,
    status
)
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.exceptions import TokenError
from user.serializers import (
    UserSerializer, 
    AuthTokenSerializer
)


class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
            user = serializer.save()
            return Response({
                'code': status.HTTP_201_CREATED,
                'title': 'Success',
                'data': {'user_id': user.id, 'message': 'User created successfully'}
            })
        except Exception as e:
            return Response({
                'code': status.HTTP_400_BAD_REQUEST,
                'title': 'Bad Request',
                'message': str(e)
            })

class CreateTokenView(TokenObtainPairView):
    serializer_class = AuthTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            user = serializer.validated_data['user']
            token_pair = serializer.validated_data
            return Response({
                    'access_token' : token_pair['access'],
                    'refresh_token': token_pair['refresh'],
                    'user_id'      : user['user_id'],
                    'email'        : user['email'],
                    'name'         : user['name'],
                    'group'        : user['group']
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'code': status.HTTP_401_UNAUTHORIZED,
                'title': 'Unauthorized',
                'message': str(e)
            }, status=status.HTTP_401_UNAUTHORIZED)

class ManageUserView(generics.RetrieveUpdateAPIView):
    """Manage the authenticated user."""
    serializer_class = UserSerializer
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        """Retrieve and return the authenticated user."""
        return self.request.user
    
    def handle_exception(self, exc):
        # Handle TokenError separately to customize the response
        if isinstance(exc, TokenError):
            return Response({
                'code': status.HTTP_401_UNAUTHORIZED,
                'title': 'Unauthorized',
                'message': 'Token is invalid or has expired.'
            }, status=status.HTTP_401_UNAUTHORIZED)

        # For other exceptions, delegate to the parent handler
        return super().handle_exception(exc)
