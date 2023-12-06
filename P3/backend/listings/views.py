from django.shortcuts import render
from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    RetrieveUpdateDestroyAPIView,
)
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .serializers import PetSerializer
from .models import Pet


class PetCreateView(CreateAPIView):
    serializer_class = PetSerializer
    queryset = Pet.objects.all()
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = super().get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if not self.request.user.isShelter:
            return Response(
                {"detail": "The user is not a shelter."},
                status=status.HTTP_403_FORBIDDEN)

        self.perform_create(serializer)
        headers = super().get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


    def perform_create(self, serializer):
        user = self.request.user
        if user.isShelter:
            serializer.save(shelter=user)
            


class PetListView(ListAPIView):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ["name", "breed", "color", "sex"]
    ordering_fields = ["name", "age"]
    ordering = "name"

    class PetPagination(PageNumberPagination):
        page_size = 10
        page_size_query_param = "page_size"
        max_page_size = 100

    pagination_class = PetPagination

    def get_queryset(self):
        queryset = Pet.objects.all()

        #filters
        shelter_id = self.request.query_params.get("shelter_id", None)
        status = self.request.query_params.get("status", "available")
        sex = self.request.query_params.get("sex", None)
        age = self.request.query_params.get("age", None)

        #search bar
        name =  self.request.query_params.get("name", "")

        # sort option, name or age
        sort = self.request.query_params.get("sort", "name")


        if shelter_id:
            queryset = queryset.filter(shelter__id=shelter_id)    
        queryset = queryset.filter(status=status)
        if sex:
            queryset = queryset.filter(sex=sex) 
        if age:
            queryset = queryset.filter(age__gt=age) 
        if name:
            queryset = queryset.filter(name__startswith=name) 

        if sort == 'name':
            queryset.order_by('name')
        else:
            queryset.order_by('age')
        return queryset


class PetRetrieveUpdateDestroyAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
        user = self.request.user
        if not user.isShelter:
            return Response(
                {"detail": "The user is not a shelter."},
                status=status.HTTP_403_FORBIDDEN,
            )

        pet = self.get_object()
        if pet.shelter != user:
            return Response(
                {"detail": "The pet does not belong to the shelter."},
                status=status.HTTP_403_FORBIDDEN,
            )

        return super().put(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        user = self.request.user
        if not user.isShelter:
            return Response(
                {"detail": "The user is not a shelter."},
                status=status.HTTP_403_FORBIDDEN,
            )

        pet = self.get_object()
        if pet.shelter != user:
            return Response(
                {"detail": "The pet does not belong to the shelter."},
                status=status.HTTP_403_FORBIDDEN,
            )

        return super().delete(request, *args, **kwargs)
