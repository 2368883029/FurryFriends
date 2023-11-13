from django.shortcuts import render
from django.forms import ValidationError
from django.shortcuts import get_object_or_404
from accounts.models import Account
from applications.models import Applications
from notifications.models import Notifications
from .models import Comment
from .serializers import CommentsSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import PermissionDenied
from django.contrib.contenttypes.models import ContentType

# Create your views here.
class CommentManageViewSet(ModelViewSet):
    serializer_class = CommentsSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        object_id = serializer.validated_data.get('object_id')
        content_type = serializer.validated_data.get('content_type')
        if content_type == 'applications':
            target_application = Applications.objects.get(id=object_id)
            if target_application.pet.shelter != self.request.user and target_application.applicant != self.request.user:
                raise PermissionDenied(detail="You don't have permission to leave comment under this applicaton")
            
        comment = serializer.save(from_user=self.request.user)
        
        create_notifications(
            target_type = content_type,
            target_id = object_id,
            content_object=comment, 
            message=f"New comment by {self.request.user.username}",
            type='new_comment',
            action_link=f'/comments/{comment.id}',
            current_user = self.request.user
        )

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
            target_application = Applications.objects.get(id=object_id)
            if target_application.pet.shelter != self.request.user and target_application.applicant != self.request.user:
                raise PermissionDenied(detail="You don't have permission to see comment under this applicaton")
            account_content_type = ContentType.objects.get_for_model(Applications)
        list_ordered = list_ordered.filter(content_type=account_content_type, object_id=object_id)
        list_info = list_ordered[start:end]
        serializer = self.get_serializer(list_info, many=True)

        return Response(serializer.data)

def create_notifications(target_id, target_type, content_object, message, type, action_link, current_user):
    content_type = ContentType.objects.get_for_model(Comment)
    object_id = content_object.id

    # If leave comment under Shelter
    if target_type == 'user':
        user_to_notify = Account.objects.get(id=target_id)
    else: # If the target_type is an application
        if current_user.isShelter:
            user_to_notify = Applications.objects.get(id=target_id).applicant
        else:
            user_to_notify = Applications.objects.get(id=target_id).pet.shelter

    Notifications.objects.create(
        owner=user_to_notify,
        message=message,
        type=type,
        action_link=action_link,
        content_type=content_type,
        object_id=object_id
    )