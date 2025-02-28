import hashlib
import json
import os
import random
import string
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, BasePermission, AllowAny
from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import SearchFilter
from rest_framework.exceptions import PermissionDenied
from django.db.models import Q
from django_filters.rest_framework.backends import DjangoFilterBackend
from django.shortcuts import render
from django.conf import settings
from django.http import HttpResponse, JsonResponse
from .models import City, Race, Passenger, Ticket, VerificationCode
from .serializers import CitySerializer, RaceSerializer, PassengerSerializer, TicketSerializer
from .filters import CityFilter, RaceFilter, PassengerFilter, TicketFilter
from django.contrib.auth.models import User
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt

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


#code post get
@csrf_exempt
def send_verification_code(request):
    if request.method != "POST":
        return JsonResponse({"error": "Метод не разрешен"}, status=405)  # Если не POST -> 405

    try:
        data = json.loads(request.body)
        email = data.get("email")

        if not email:
            return JsonResponse({"error": "E-mail обов'язковий"}, status=400)

        user, created = User.objects.get_or_create(username=email, email=email)

        # Проверяем, есть ли уже код
        code_entry, created = VerificationCode.objects.get_or_create(user=user)

        # Генерируем новый код и получаем его
        code = code_entry.generate_code()  

        send_mail(
            "Код подтверждения",
            f"Ваш код: {code}",  # Используем сам код, а не code_entry.code
            "taya13taya@gmail.com",
            [email],
            fail_silently=False,
        )

        return JsonResponse({"message": "Код відправлено на пошту"})
    
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@csrf_exempt
def verify_code(request):
    if request.method == "POST":
        data = json.loads(request.body)
        email = data.get("email")
        code = data.get("code")

        if not email or not code:
            return JsonResponse({"error": "E-mail і код обов'язкові"}, status=400)

        try:
            user = User.objects.get(email=email)
            code_entry = VerificationCode.objects.get(user=user)
        except (User.DoesNotExist, VerificationCode.DoesNotExist):
            return JsonResponse({"error": "Користувача не знайдено"}, status=400)

        # Проверяем хэш кода
        if hashlib.sha256(code.encode()).hexdigest() == code_entry.code_hash:
            return JsonResponse({"message": "Код підтверджено"})
        else:
            return JsonResponse({"error": "Невірний код"}, status=400)

#main components
def index(request):
    index_path = os.path.join(settings.STATICFILES_DIRS[0], 'index.html')
    with open(index_path, encoding='utf-8') as f:
        return HttpResponse(f.read())