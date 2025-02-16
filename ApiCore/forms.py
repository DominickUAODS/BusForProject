from django import forms
from .models import City

class RaceForm(forms.Form):
    city_from = forms.ModelChoiceField(queryset=City.objects.all())
    city_to = forms.ModelChoiceField(queryset=City.objects.all())
    date = forms.DateTimeField(widget=forms.DateInput(attrs={'name': 'time_start'}))
    passengers = forms.IntegerField(min_value=1, widgets=forms.NumberInput(attrs={'name': 'min_places'}))
