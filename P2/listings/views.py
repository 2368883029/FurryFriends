from django.shortcuts import render
from rest_framework.generics import (
    CreateAPIView,
    RetrieveDestroyAPIView,
    RetrieveUpdateAPIView,
    ListAPIView,
    RetrieveAPIView,
)
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .serializers import PetSerializer
from .models import Pet


class PetRetrieveView(RetrieveAPIView):
    queryset = Pet.objects.all()    
    serializer_class = PetSerializer
    


class PetCreateView(CreateAPIView):
    serializer_class = PetSerializer
    queryset = Pet.objects.all()
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        user = self.request.user

        if user.isShelter:
            serializer.save(shelter=user)
        else:
            return Response(
                {'detail': 'You do not have permission to add a pet.'},
                status=status.HTTP_403_FORBIDDEN
            )


class PetDeleteView(RetrieveDestroyAPIView):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, *args, **kwargs):
        user = self.request.user
        if not user.isShleter:
            return Response(
                {'detail': 'You do not have permission to delete this pet.'},
                status=status.HTTP_403_FORBIDDEN
            )
        return super().delete(request, *args, **kwargs)


class PetUpdateView(RetrieveUpdateAPIView):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
    
    def put(self, request, *args, **kwargs):
        user = self.request.user
        if not user.isShleter:
            return Response(
                {'detail': 'You do not have permission to update this pet.'},
                status=status.HTTP_403_FORBIDDEN
            )
            
        return super().put(request, *args, **kwargs)


class PetListView(ListAPIView):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer


        
        
        
# class PetPagination(PageNumberPagination):
#     page_size = 10  
#     page_size_query_param = 'page_size'
#     max_page_size = 100
# pagination_class = PetPagination
