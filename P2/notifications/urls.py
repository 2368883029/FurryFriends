from django.urls import path
from . import views


urlpatterns = [ 
    path('', views.NotificationCreateView.as_view(), name='create-notifications'),
    path('<int:page>/status/<int:read>', views.NotificationListView.as_view(), name='list-notifications'),
    path('delete/', views.NotificationDeleteView.as_view(), name='delete-notifications'),
    path('<int:pk>/', views.NotificationRetrieveView.as_view(), name='retrieve-notifications'),
]
