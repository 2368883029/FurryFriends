from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('', views.NotificationManageViewSet, basename='notifications')

urlpatterns = [
    # path('page/<int:page>/status/<int:read>/', views.NotificationListView.as_view(), name='list-notifications'),
    path('', include(router.urls)),
]
