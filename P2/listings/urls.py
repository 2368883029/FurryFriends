from django.urls import path
from . import views

app_name = "listings"
urlpatterns = [
    path("<int:pk>/", views.PetListView.as_view(), name="pet-view"),
    path("search/", views.PetListView.as_view(), name="pet-search"),
    path("create/", views.PetCreateView.as_view(), name="pet-create"),
    path("<int:pk>/delete/", views.PetDeleteView.as_view(), name="pet-delete"),
]
