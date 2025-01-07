from django import forms
from .models import *

class UserForm(forms.ModelForm):
    class Meta:
        model = Guests
        fields = ['tg_id', 'hero_uprise', 'nohero_uprise', 'max_hero_lvl', 'hero_lvl',
                  'now_hero', 'egg_amm', 'all_heros', 'friends', 'energy', 'last_visit', 'pns_amm','nickname',
                  'use_case','user_urls']