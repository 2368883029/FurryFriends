from django.urls import path, include
from . import views

app_name = "applications"
urlpatterns = [
    path("",views.ApplicationCreateView.as_view(),name='create-application'),
]