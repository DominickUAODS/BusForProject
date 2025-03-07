from django_filters import rest_framework as filters
from django.db.models import Q
from .models import City, Race, Passenger, Ticket, User


class CityFilter(filters.FilterSet):
    name = filters.CharFilter(method='filter_name')

    def filter_name(self, queryset, name, value):
        return queryset.filter(Q(name_en__icontains=value) | Q(name_ua__icontains=value))

    class Meta:
        model = City
        fields = []

class RaceFilter(filters.FilterSet):
    city_from = filters.NumberFilter(field_name='city_from', lookup_expr='exact', required=False)
    city_to = filters.NumberFilter(field_name='city_to', lookup_expr='exact', required=False)
    time_start_after = filters.DateTimeFilter(field_name='time_start', lookup_expr='gte', required=False)
    time_start_until = filters.DateTimeFilter(field_name='time_start', lookup_expr='lte', required=False)
    time_end_after = filters.DateTimeFilter(field_name='time_end', lookup_expr='gte', required=False)
    time_end_until = filters.DateTimeFilter(field_name='time_end', lookup_expr='lte', required=False)
    min_cost = filters.NumberFilter(field_name='cost', lookup_expr='gte', required=False)
    max_cost = filters.NumberFilter(field_name='cost', lookup_expr='lte', required=False)
    min_places = filters.NumberFilter(field_name='places', lookup_expr='gte', required=False)
    max_places = filters.NumberFilter(field_name='places', lookup_expr='lte', required=False)

    class Meta:
        model = Race
        fields = ['city_from', 'city_to']


class PassengerFilter(filters.FilterSet):
    user = filters.NumberFilter(field_name='user', lookup_expr='exact')
    first_name = filters.CharFilter(field_name='first_name', lookup_expr='icontains')
    last_name = filters.CharFilter(field_name='last_name', lookup_expr='icontains')

    class Meta:
        model = Passenger
        fields = ['user', 'first_name', 'last_name']

class TicketFilter(filters.FilterSet):
    passenger = filters.NumberFilter(field_name='passenger', lookup_expr='exact')
    race = filters.NumberFilter(field_name='race', lookup_expr='exact')
    is_used = filters.BooleanFilter(field_name='is_used')

    class Meta:
        model = Ticket
        fields = ['passenger', 'race', 'is_used']

class UserFilter(filters.FilterSet):
    username = filters.CharFilter(field_name='username', lookup_expr='icontains')
    first_name = filters.CharFilter(field_name='first_name', lookup_expr='icontains')
    last_name = filters.CharFilter(field_name='last_name', lookup_expr='icontains')

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name']