from notifications.models import Notifications
from .serializers import *
from django.shortcuts import render
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import AllowAny,IsAuthenticated
from .models import Applications 
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework import status
from django.contrib.contenttypes.models import ContentType
from django.db.models import Value
from django.db.models import CharField
from django.db.models.functions import Concat
from rest_framework.views import APIView
from django.http import JsonResponse
from .paginators import CustomPagination

# Create your views here.
class AppplicationListView(ListAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPagination

    def get_queryset(self):
        wanted_status = self.request.query_params.get('status')
        search_query = self.request.query_params.get('search', None)
        all_query = self.request.query_params.get('all', None)
        order = self.request.query_params.get('order', None)

        if all_query == '1':
            self.pagination_class = None
        else:
            self.pagination_class = CustomPagination

        if self.request.user.isShelter:
            apps = Applications.objects.filter(pet__shelter=self.request.user)
        else:  
            apps = Applications.objects.filter(applicant=self.request.user)

        if search_query:
            apps = apps.filter(pet__name__icontains=search_query)

        if wanted_status != '':
            return apps.filter(status=wanted_status)
        
        if order == '0':
            apps = apps.order_by('last_update_time')
        else:
            apps = apps.order_by('-last_update_time')

        return apps
    
    
    def get_paginated_response(self, data):
        response = super().get_paginated_response(data)
        response.data['max_pages'] = self.paginator.page.paginator.num_pages
        return response

class ApplicationExistsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request,*args, **kwargs):
        seeker_id = self.request.query_params.get('userId')
        listing_id = self.request.query_params.get('listingId')
        res = Applications.objects.filter(pet = listing_id).filter(applicant = seeker_id).first()
        if res:
            return JsonResponse({"exists": True})
        else:
            return JsonResponse({"exists": False})


class ApplicationCreateView(CreateAPIView):
    serializer_class = CreateApplicationSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        # check the pet listing status
        data = request.data 
        listing_id = data['pet']
        if request.user.isShelter:
            return Response("Shelters cannot create adoption applications.",status=status.HTTP_403_FORBIDDEN)
        
        if not listing_id:
            return Response("Request needs to provide a pet listing id",status=status.HTTP_400_BAD_REQUEST)
        
        pet_obj = Pet.objects.filter(pk=listing_id).first()

        if not pet_obj:
            return Response("invalid pet id",status=status.HTTP_400_BAD_REQUEST)
        
        if pet_obj.status != 'available':
            return Response("You cannot submit an application for this pet, it is unavailable.",status=status.HTTP_403_FORBIDDEN)
        
        # check for existing applications 
        if Applications.objects.filter(pet__pk=listing_id).filter(applicant=self.request.user).first():
            return Response("You have already submitted an application for this pet.",status=status.HTTP_403_FORBIDDEN)
        
        return super().create(request, *args, **kwargs)
    
    def perform_create(self, serializer):
        application = serializer.save(applicant = self.request.user)

        # Create a notification
        create_notifications(
            users = [serializer.validated_data.get('pet').shelter],
            content_object=application, 
            message=f"New applicaiton by {self.request.user.username}",
            type='new_application',
            action_link=f'/pet-seeker-adoption',
        )


class ApplicationRetrieveUpdateView(RetrieveUpdateAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated] 
    queryset = Applications.objects.all()

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.applicant.id != request.user.id:
            if instance.pet.shelter.id != request.user.id:
                return Response("You cannot access this application.",status=status.HTTP_403_FORBIDDEN)
        return super().retrieve(request, *args, **kwargs)
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.applicant.id != request.user.id:
            if instance.pet.shelter.id != request.user.id:
                return Response("You cannot access this application.",status=status.HTTP_403_FORBIDDEN)
        
        wanted_status = request.data['status']

        if request.user.isShelter:
            if instance.status != "pending":
                return Response("You can no longer update this application status.",status=status.HTTP_403_FORBIDDEN)
            
            if (wanted_status != "accepted" and wanted_status != 'denied'):
                return Response(f"You cannot update the status to {wanted_status}",status=status.HTTP_400_BAD_REQUEST)
        else:
            if (instance.status != "pending" and instance.status != "accepted"):
                return Response("You can no longer update this application status.",status=status.HTTP_403_FORBIDDEN)
            
            if (wanted_status != 'withdrawn'):
                return Response(f"You cannot update the status to {wanted_status}",status=status.HTTP_400_BAD_REQUEST)
            

        response = super().update(request, *args, **kwargs)

        # Create notifications
        if response.status_code == status.HTTP_200_OK:
            create_notifications(
                users=[instance.applicant],
                content_object=instance,
                message=f"Application status updated for pet {instance.pet.name}",
                type='status_update',
                action_link=f'/pet-seeker-adoption'
            )

        return response
    
    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.applicant.id != request.user.id:
            if instance.pet.shelter.id != request.user.id:
                return Response("You cannot access this application.",status=status.HTTP_403_FORBIDDEN)
        
        wanted_status = request.data['status']

        if request.user.isShelter:
            if instance.status != "pending":
                return Response("You can no longer update this application status.",status=status.HTTP_403_FORBIDDEN)
            
            if (wanted_status != "accepted" and wanted_status != 'denied'):
                return Response(f"You cannot update the status to {wanted_status}",status=status.HTTP_400_BAD_REQUEST)
        else:
            if (instance.status != "pending" and instance.status != "accepted"):
                return Response("You can no longer update this application status.",status=status.HTTP_403_FORBIDDEN)
            
            if (wanted_status != 'withdrawn'):
                return Response(f"You cannot update the status to {wanted_status}",status=status.HTTP_400_BAD_REQUEST)
        return super().partial_update(request, *args, **kwargs)
    
# Create the Notification to target_user
def create_notifications(users, content_object, message, type, action_link):
    content_type = ContentType.objects.get_for_model(Applications)

    for target_user in users:
        Notifications.objects.create(
            owner = target_user,
            message=message,
            type=type,
            action_link=action_link,
            content_type=content_type,
            object_id=content_object.id
        )