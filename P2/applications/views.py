from .serializers import *
from django.shortcuts import render
from rest_framework.generics import CreateAPIView, ListAPIView, DestroyAPIView, RetrieveAPIView,RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny,IsAuthenticated
from .models import Applications
from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework import status


# Create your views here.
# class AppplicationListView(ListAPIView):
#     serializer_class = ApplicationSerializer
#     permission_classes = [IsAuthenticated]
#     pagination_class = PageNumberPagination
#     def get_queryset(self):
#         page = int(self.request.query_params.get('page', 1))
#         print(page)
#         return Applications.objects.all()


class ApplicationCreateView(CreateAPIView):
    serializer_class = CreateApplicationSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        # check the pet listing status
        data = request.data 
        listing_id = data['pet']
        if not listing_id:
            return Response("Request needs to provide a pet listing id",status=status.HTTP_400_BAD_REQUEST)
        
        pet_obj = Pet.objects.filter(id=listing_id).first()
        if not pet_obj:
            return Response("invalid pet id",status=status.HTTP_400_BAD_REQUEST)
        
        if pet_obj.status != 'available':
            return Response("You cannot submit an application for this pet, it is unavailable.",status=status.HTTP_400_BAD_REQUEST)
        
        request.data['applicant'] = request.user.id
        return super().create(request, *args, **kwargs)

