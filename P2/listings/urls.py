from django.urls import path
from . import views

app_name = "listings"
urlpatterns = [
    path(
        "<int:pk>/",
        views.PetRetrieveUpdateDestroyAPIView.as_view(),
        name="pet-retrieve-update-destroy",
    ),
    path("search/", views.PetListView.as_view(), name="pet-search"),
    path("create/", views.PetCreateView.as_view(), name="pet-create"),
]
