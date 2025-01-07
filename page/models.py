from datetime import datetime

from django.db import models
import json


class Guests(models.Model):
    # Поле для хранения ID в Telegram
    tg_id = models.CharField(max_length=100, verbose_name="Telegram ID")
    # Поле для хранения текущего уровня увеличения героя
    hero_uprise = models.IntegerField(default=1000, verbose_name="Hero Uprise")
    # Поле для хранения уровня увеличения, когда героя нет
    nohero_uprise = models.IntegerField(default=0, verbose_name="No Hero Uprise")
    # Поле для хранения максимального уровня героя
    max_hero_lvl = models.IntegerField(default=1, verbose_name="Max Hero Level")
    # Поле для хранения текущего уровня героя
    hero_lvl = models.IntegerField(default=1, verbose_name="Hero Level")
    # Поле для хранения текущего героя
    now_hero = models.CharField(max_length=100, default="Hobo", verbose_name="Current Hero")
    # Поле для хранения количества яиц
    egg_amm = models.FloatField(default=0, verbose_name="Egg Amount")
    # Поле для хранения всех приобретённых героев
    all_heros = models.TextField(default="Hobo", verbose_name="All Heroes")
    # Поле для хранения друзей
    friends = models.TextField(blank=True, verbose_name="Friends")
    # Поле для хранения текущей энергии
    energy = models.IntegerField(default=5, verbose_name="Energy")
    # Поле для хранения последнего визита
    current_date = datetime.now()
    formatted_current_date = current_date.strftime('%d.%m.%Y, %H:%M:%S')
    last_visit = models.CharField(max_length=100, default=formatted_current_date, verbose_name="Last Visit")
    pns_amm = models.FloatField(default=0, verbose_name="PNS Amount")
    nickname = models.CharField(default='Введите имя', max_length=100, verbose_name="Nick")
    use_case = models.IntegerField(default=0, verbose_name="Use Case")
    user_urls = models.TextField(default=json.dumps({'TG':0, 'TT':0, 'INST':0, 'YouTube':0}), verbose_name="Urls")

    def __str__(self):
        return f"{self.nickname},{self.tg_id} - {self.now_hero}"



