from django.shortcuts import render
from django.forms import ValidationError
from django.shortcuts import get_object_or_404
from accounts.models import Account
from .models import Comment
from .serializers import CommentsSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from django.contrib.contenttypes.models import ContentType

# Create your views here.
class NotificationManageViewSet(ModelViewSet):
    serializer_class = CommentsSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(from_user=self.request.user)

    def get_queryset(self):
        return Comment.objects.all() 

    def list(self, request, *args, **kwargs):
        try:
            sort = int(request.query_params.get('sort', 0))
            page = int(request.query_params.get('page', 1))
            object_id = int(request.query_params.get('object_id', -1))
            for_shelter = int(request.query_params.get('for_shelter', 1))

        except ValueError:
            raise ValidationError("Invalid input. All inputs must be integers")

        if sort not in [0, 1]:
            raise ValidationError("Invalid value for 'sort'.")

        if page < 1:
            raise ValidationError("Page number must be a positive integer.")
        
        if object_id < 0:
            raise ValidationError("Invalid value for 'object_id'.")
        
        if for_shelter not in [0, 1]:
            raise ValidationError("Invalid value for 'for_shelter'.")
        
        page_size = 10
        start = (page - 1) * page_size
        end = page * page_size

        list_ordered = Comment.objects
        if sort:
            list_ordered = list_ordered.order_by('-creation_time')
        else:
            list_ordered = list_ordered.order_by('creation_time')

        if for_shelter:
            # check if the user is a shelter:
            if Account.objects.get(id=object_id).isShelter == False:
                raise ValidationError("Target Account is not a Shelter")
            account_content_type = ContentType.objects.get_for_model(Account)
        else:
            account_content_type = ContentType.objects.get_for_model(Account)
        #     account_content_type = ContentType.objects.get_for_model(Application)
        list_ordered = list_ordered.filter(content_type=account_content_type, object_id=object_id)
        list_info = list_ordered[start:end]
        serializer = self.get_serializer(list_info, many=True)

        return Response(serializer.data)