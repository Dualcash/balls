from django.urls import path

from . import views

urlpatterns = [
    path('us/<int:user_id>/', views.index),
    path('us/<int:user_id>/tg_friend/<int:friend>/', views.tg_friend),
    path('us/<int:user_id>/o_friend/<int:friend>/', views.o_friend),
    path('auto/', views.web_app, name='web_app'),
    path('proxy-to-bot/', views.proxy_to_bot, name='proxy_to_bot'),
    path('', views.test)]
