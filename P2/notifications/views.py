from django.shortcuts import get_object_or_404
from rest_framework.generics import CreateAPIView, ListAPIView, DestroyAPIView, RetrieveAPIView
from .models import Notifications
from .serializers import NotificationSerializer
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework import status


class NotificationCreateView(CreateAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Notifications.objects.all()
    
class NotificationListView(ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        current_user = self.request.user
        page = self.kwargs.get('page')
        read = self.kwargs.get('read')
        page_size = 10
        start = (page - 1) * page_size
        end = page * page_size


        if read == None or read == 0:
            is_read = False
        else:
            is_read = True

        return Notifications.objects.filter(read=is_read).filter(owner=current_user)[start:end]
        

class NotificationManageViewSet(ModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
    
        if instance.owner != request.user:
            return PermissionDenied('No permission')
        
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance.owner != request.user:
            return PermissionDenied('No permission')
        
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get_queryset(self):
        return Notifications.objects.all() 