from django.db import models
from django.core import validators
from django.contrib.auth.models import User

class City(models.Model):
    name_ua = models.CharField(max_length=128)
    name_en = models.CharField(max_length=128)

    class Meta:
        db_table = 'cities'
        verbose_name_plural = 'Cities'

class Race(models.Model):
    city_from = models.ForeignKey(City, on_delete=models.CASCADE, related_name="races_from")
    city_to = models.ForeignKey(City, on_delete=models.CASCADE, related_name="races_to")
    time_start = models.DateTimeField()
    time_end = models.DateTimeField()
    cost = models.DecimalField(decimal_places=2, max_digits=8, validators=[validators.MinValueValidator(0)])
    places = models.IntegerField(validators=[validators.MinValueValidator(0)])

    class Meta:
        db_table = 'races'

class Passenger(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=128)
    last_name = models.CharField(max_length=128)

    class Meta:
        db_table = 'passengers'

class Ticket(models.Model):
    passenger = models.ForeignKey(Passenger, on_delete=models.CASCADE)
    race = models.ForeignKey(Race, on_delete=models.CASCADE)
    is_used = models.BooleanField(default=False)

    class Meta:
        db_table = 'tickets'
        constraints = [
            models.UniqueConstraint(fields=['passenger', 'race'], name='passenger_race_unique')
        ]

def seed_cities(apps, schema_editor):
    City = apps.get_model("ApiCore", "City")
    City.objects.bulk_create([
        City(name_ua='Черкаси', name_en='Tsjerkasy'),
        City(name_ua='Чернігів', name_en='Tsjernihiv'),
        City(name_ua='Чернівці', name_en='Tsjernivtsi'),
        City(name_ua='Автономна Республіка Крим', name_en='Autonome Republik Krim'),
        City(name_ua='Дніпропетровськ', name_en='Dnipropetrovsk'),
        City(name_ua='Донецьк', name_en='Donetsk'),
        City(name_ua='Івано-Франківськ', name_en='Ivano-Frankivsk'),
        City(name_ua='Харців', name_en='Kharkiv'),
        City(name_ua='Херсон', name_en='Kherson'),
        City(name_ua='Хмельницький', name_en='Khmelnytskyj'),
        City(name_ua='Кіровоград', name_en='Kirovohrad'),
        City(name_ua='Київ', name_en='Kyiv'),
        City(name_ua='Луганськ', name_en='Luhansk'),
        City(name_ua='Львів', name_en='Lviv'),
        City(name_ua='Миколаїв', name_en='Mykolajiv'),
        City(name_ua='Одеса', name_en='Odesa'),
        City(name_ua='Полтава', name_en='Poltava'),
        City(name_ua='Рівне', name_en='Rivne'),
        City(name_ua='Суми', name_en='Sumy'),
        City(name_ua='Тернопіль', name_en='Ternopil'),
        City(name_ua='Вінниця', name_en='Vinnytsia'),
        City(name_ua='Волинь', name_en='Volyn'),
        City(name_ua='Закарпаття', name_en='Zakarpattja'),
        City(name_ua='Запоріжжя', name_en='Zaporizjzjia'),
        City(name_ua='Житомир', name_en='Zjytomyr')
    ])
