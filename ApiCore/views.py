from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, BasePermission, AllowAny
from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import SearchFilter
from rest_framework.exceptions import PermissionDenied
from django.db.models import Q
from django_filters.rest_framework.backends import DjangoFilterBackend
from .models import City, Race, Passenger, Ticket
from .serializers import CitySerializer, RaceSerializer, PassengerSerializer, TicketSerializer
from .filters import CityFilter, RaceFilter, PassengerFilter, TicketFilter

class StaffPermission(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_staff

class CustomPagination(PageNumberPagination):
    page_size=10
    max_page_size=10

class CityViewSet(viewsets.ModelViewSet):
    queryset = City.objects.all()
    filter_backends = [DjangoFilterBackend, SearchFilter]
    serializer_class = CitySerializer
    filterset_class = CityFilter
    pagination_class = CustomPagination
    
    def get_permissions(self):
        if self.request.method in ['GET', 'HEAD', 'OPTION']:
            return [AllowAny()]
        else: 
            return [StaffPermission()]

class RaceViewSet(viewsets.ModelViewSet):
    queryset = Race.objects.all()
    filter_backends = [DjangoFilterBackend, SearchFilter]
    serializer_class = RaceSerializer
    filterset_class = RaceFilter
    pagination_class = CustomPagination

    def get_permissions(self):
        if self.request.method in ['GET', 'HEAD', 'OPTIONS']:
            return [AllowAny()]
        return [StaffPermission()]

class PassengerViewSet(viewsets.ModelViewSet):
    filter_backends = [DjangoFilterBackend, SearchFilter]
    serializer_class = PassengerSerializer
    filterset_class = PassengerFilter
    pagination_class = CustomPagination

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Passenger.objects.all()
        return Passenger.objects.filter(user=user)

    def get_permissions(self):
        if self.request.method in ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']:
            return [IsAuthenticated()]
        return super().get_permissions()

    def perform_update(self, serializer):
        if not self.request.user.is_staff and serializer.instance.user != self.request.user:
            raise PermissionDenied()
        serializer.save()

    def perform_destroy(self, instance):
        if not self.request.user.is_staff and instance.user != self.request.user:
            raise PermissionDenied()
        instance.delete()

class TicketViewSet(viewsets.ModelViewSet):
    filter_backends = [DjangoFilterBackend, SearchFilter]
    serializer_class = TicketSerializer
    filterset_class = TicketFilter
    pagination_class = CustomPagination

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Ticket.objects.all()
        return Ticket.objects.filter(Q(passenger__user=user))

    def get_permissions(self):
        if self.request.method in ['GET', 'HEAD', 'OPTIONS', 'POST']:
            return [IsAuthenticated()]
        elif self.request.method in ['PUT', 'PATCH']:  
            return [IsAuthenticated()]
        return [StaffPermission()]

    def perform_update(self, serializer):
        if not self.request.user.is_staff:
            if 'is_used' in serializer.validated_data and len(serializer.validated_data) == 1:
                serializer.save()
            else:
                raise PermissionDenied()
        else:
            serializer.save()

    def perform_destroy(self, instance):
        if not self.request.user.is_staff:
            raise PermissionDenied()
        instance.delete()
