"""
URL configuration for RestApiServer project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from ApiCore.views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf.urls.static import static

router = DefaultRouter()
router.register('cities', CityViewSet, 'city')
router.register('races', RaceViewSet, 'race')
router.register('passengers', PassengerViewSet, 'passenger')
router.register('tickets', TicketViewSet, 'ticket')
router.register('users', UserViewSet, 'users')

urlpatterns = [
    path('', include(router.urls)),
    path('token-access/', CustomTokenObtainPairView.as_view(),name="token-access"),
    path('token-refresh/', TokenRefreshView.as_view(),name="token-refresh"),
    path("send-code/", send_verification_code, name="send_code"),
    path("verify-code/", verify_code, name="verify_code"),
    path("send-ticket/", send_ticket, name="send_ticket")
] + static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])
