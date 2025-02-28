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
from django.conf.urls.static import static

router = DefaultRouter()
router.register('cities', CityViewSet, 'city')
router.register('races', RaceViewSet, 'race')
router.register('passengers', PassengerViewSet, 'passenger')
router.register('tickets', TicketViewSet, 'ticket')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),  # API роутинг
    path('', index),  #React
     path("send-code/", send_verification_code, name="send_code"),
    path("verify-code/", verify_code, name="verify_code"),
] + static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])
