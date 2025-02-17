from django import forms
from .models import City

class RaceForm(forms.Form):
    city_from = forms.ModelChoiceField(label='Звідки', queryset=City.objects.all())
    city_to = forms.ModelChoiceField(label='Куди', queryset=City.objects.all())
    date = forms.DateTimeField(label='Дата поїздки', widget=forms.DateInput(attrs={'name': 'time_start'}))
    passengers = forms.IntegerField(label='Пасажири', min_value=1, widgets=forms.NumberInput(attrs={'name': 'min_places'}))
