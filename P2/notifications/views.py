from rest_framework.generics import CreateAPIView, ListAPIView, DestroyAPIView, RetrieveAPIView
from .models import Notifications
from .serializers import NotificationSerializer
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth.mixins import LoginRequiredMixin

class NotificationCreateView(CreateAPIView):
    serializer_class = NotificationSerializer

    def perform_create(self, serializer):
        current_user = self.request.user

        # Check if the user is authenticated
        if current_user.is_anonymous:
            raise PermissionDenied(detail='Please login')
        return super().perform_create(self, serializer)

    def get_queryset(self):
        return Notifications.objects.all()
    
class NotificationListView(ListAPIView):
    serializer_class = NotificationSerializer

    def get_queryset(self):
        current_user = self.request.user
        page = self.kwargs.get('page')
        read = self.kwargs.get('read')
        page_size = 10
        start = (page - 1) * page_size
        end = page * page_size

        # Check if the user is authenticated
        if current_user.is_anonymous:
            raise PermissionDenied(detail='Please login')

        print(read)

        if read == None or read == 0:
            is_read = False
        else:
            is_read = True

        return Notifications.objects.filter(read=is_read).filter(owner=current_user)[start:end]
        
    
class NotificationDeleteView(DestroyAPIView):
    serializer_class = NotificationSerializer
    
    def perform_destroy(self, instance):
        current_user = self.request.user

        # Check if the user is authenticated
        if current_user.is_anonymous:
            raise PermissionDenied(detail='Please login')
        
        # Check if current user has the target 
        
        return super().perform_destroy(instance)

class NotificationRetrieveView(RetrieveAPIView):
    serializer_class = NotificationSerializer