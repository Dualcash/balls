import ast
import hashlib
import hmac
import re
from datetime import datetime
import urllib.parse
import pytz
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
import json
import requests

from .forms import UserForm
from .models import Guests

BOT_TOKEN = '7853310557:AAHXxzUiMEzpBd929lK0Jc7guZC6zfh3WqU'


def verify_init_data(init_data: str) -> bool:
    parsed_data = dict(urllib.parse.parse_qsl(init_data))
    hash_string = parsed_data.pop('hash', None)

    if not hash_string:
        return False

    # Сортируем параметры и формируем строку для проверки
    sorted_params = '\n'.join([f"{key}={value}" for key, value in sorted(parsed_data.items())])

    # Используем bot token для создания секретного ключа
    secret_key = hashlib.sha256(BOT_TOKEN.encode()).digest()

    # Вычисляем HMAC hash и сравниваем
    check_hash = hmac.new(secret_key, sorted_params.encode(), hashlib.sha256).hexdigest()

    return check_hash == hash_string


def web_app(request):
    return render(request, 'page/request.html')





def get_all_tg_ids():
    # Извлекаем все tg_id из таблицы Guests
    tg_ids = Guests.objects.values_list('tg_id', flat=True)
    return list(tg_ids)


def get_user_data(user_id):
    try:
        # Получаем пользователя по tg_id
        user = get_object_or_404(Guests, tg_id=user_id)

        # Формируем словарь с данными пользователя
        user_data = {
            'tg_id': user.tg_id,
            'hero_uprise': user.hero_uprise,
            'nohero_uprise': user.nohero_uprise,
            'max_hero_lvl': user.max_hero_lvl,
            'hero_lvl': user.hero_lvl,
            'now_hero': user.now_hero,
            'egg_amm': user.egg_amm,
            'all_heros': user.all_heros,
            'friends': user.friends,
            'energy': user.energy,
            'last_visit': user.last_visit,
            'pns_amm': user.pns_amm,
            'nickname': user.nickname,
            'use_case': user.use_case,
            'user_urls': user.user_urls
        }

        return user_data

    except Guests.DoesNotExist:
        # Если пользователь не найден, возвращаем пустой словарь
        return {}


def update_friend_names(tg_id):
    try:
        # Получаем гостя по tg_id
        guests = Guests.objects.filter(tg_id=tg_id)
        guest = guests.first()  # Возьмите первый объект
    except Guests.DoesNotExist:
        print(f"Гость с ID {tg_id} не найден.")
        return

    # Получаем список друзей гостя
    try:
        friends_list = ast.literal_eval(guest.friends)
    except:
        friends_list = []

    updated_friends_list = []

    for friend in friends_list:
        friend_id = friend[0]
        friend_name = friend[1]
        friend_platform = friend[2]

        # Находим друга по friend_id
        try:
            guests = Guests.objects.filter(tg_id=tg_id)
            actual_friend = guests.first()  # Возьмите первый объект
            actual_name = actual_friend.nickname

            # Если имя друга отличается от актуального, обновляем его
            if actual_name != friend_name:
                print(f"Обновление имени друга: {friend_name} -> {actual_name}")
                friend[1] = actual_name

        except Guests.DoesNotExist:
            print(f"Друг с ID {friend_id} не найден.")

        # Добавляем обновленные данные о друге в новый список
        updated_friends_list.append(friend)

    # Обновляем поле friends у гостя и сохраняем изменения в базе данных
    guest.friends = str(updated_friends_list)
    guest.save()


def index(request, user_id):
    # Проверка, существует ли пользователь
    guest = Guests.objects.filter(tg_id=user_id).first()
    data = ''

    if not guest:
        # Если пользователь не существует, создаем нового
        guest = Guests.objects.create(tg_id=user_id)
        guest.save()
        data = get_user_data(user_id)
        data['use_case'] = 5
    else:
        data = get_user_data(user_id)
        if request.method == 'GET':
            update_friend_names(user_id)
            data = get_user_data(user_id)
            utc_now = datetime.now(pytz.utc)
            last_date_str = data['last_visit']
            if '+' not in last_date_str and '-' not in last_date_str:
                last_date_str += ' +0300'
            last_date_str = re.sub(r'([+-])', r' \1', last_date_str)

            # Теперь строка должна выглядеть как '14.11.2024, 17:00:12 +0300'
            last_date = datetime.strptime(last_date_str, '%d.%m.%Y, %H:%M:%S %z')

            difference = utc_now - last_date
            hours_difference = difference.total_seconds() / 3600
            if hours_difference > 3:
                hours_difference = 3
            if hours_difference < 0:
                hours_difference = 0;
            energy_plus = int(hours_difference / (1 / 3))
            if energy_plus > 40:
                energy_plus = 40
            energy = int(data['energy'])
            data['energy'] = energy + energy_plus
            new_eggs = data['egg_amm'] + ((data['hero_uprise'] + data['nohero_uprise']) * hours_difference)
            new_eggs = round(new_eggs, 2)
            data['egg_amm'] = new_eggs

            print(utc_now, last_date, hours_difference, new_eggs)

    # Если это POST-запрос, обрабатываем данные формы
    if request.method == 'POST':
        form = UserForm(request.POST, instance=guest)
        if form.is_valid():
            print('Форма валидна')
            print(request.POST)
            form_friends = form.cleaned_data.get('friends')
            db_friends = guest.friends  # Получаем значение из базы данных

            # Проверяем, если длина значения из базы данных больше
            if len(db_friends) > len(form_friends):
                form.instance.friends = db_friends  # Устанавливаем значение из БД в форму

            print(request.POST)
            form.save()
        else:
            print('Форма не валидна')
            print(form.errors)  # Выводим ошибки в форме для диагностики
            print(request.POST)
    # Сохраняем обновлённые данные пользователя
    else:
        # Если это GET-запрос, создаем форму с существующими данными
        form = UserForm(instance=guest)

    context = {
        'data': data,
        'form': form
    }

    # Передача контекста в шаблон
    return render(request, 'page/index.html', context)


def update_user_friends_and_use_case(tg_id, new_friends, new_use_case):
    try:
        # Ищем пользователя по Telegram ID
        user = Guests.objects.get(tg_id=tg_id)

        # Обновляем значения полей friends и use_case
        user.friends = new_friends
        user.use_case = new_use_case
        eggs = float(user.egg_amm)
        user.egg_amm = eggs + 20000

        # Сохраняем изменения в базе данных
        user.save()
        print('Прошло')
    except Guests.DoesNotExist:
        return f"No user found with tg_id {tg_id}"


def update_user_friends_and_use_case_o(tg_id, new_friends, new_use_case):
    try:
        # Ищем пользователя по Telegram ID
        user = Guests.objects.get(tg_id=tg_id)

        # Обновляем значения полей friends и use_case
        user.friends = new_friends
        user.use_case = new_use_case
        pns = int(user.pns_amm)
        user.pns_amm = pns + 15

        # Сохраняем изменения в базе данных
        user.save()
        print('Прошло')
    except Guests.DoesNotExist:
        return f"No user found with tg_id {tg_id}"


def tg_friend(request, user_id, friend):
    # Проверка, существует ли пользователь
    guest = Guests.objects.filter(tg_id=user_id).first()
    data = ''

    if not guest:
        # Если пользователь не существует, создаем нового
        guest = Guests.objects.create(tg_id=user_id)
        guest.save()
        data = get_user_data(user_id)
        try:
            friend_data = get_user_data(friend)
            data_friends = list(data['friends'])
            try:
                friend_friends = ast.literal_eval(friend_data['friends'])
            except:
                friend_friends = []
            data_friends.append([friend_data['tg_id'], friend_data['nickname'], 'tg'])
            friend_friends.append([data['tg_id'], data['nickname'], 'tg'])
            data['friends'] = data_friends
            update_user_friends_and_use_case(friend, friend_friends, 2)
            data['use_case'] = 5
            data['egg_amm'] = 20000
        except Exception as e:
            print('Друга нет:', e)
    else:
        data = get_user_data(user_id)
        if request.method == 'GET':
            data = get_user_data(user_id)
            utc_now = datetime.now(pytz.utc)
            last_date_str = data['last_visit']
            if '+' not in last_date_str and '-' not in last_date_str:
                last_date_str += ' +0300'
            last_date_str = re.sub(r',(\S)', r', \1', last_date_str)

            # Теперь строка должна выглядеть как '14.11.2024, 17:00:12 +0300'
            last_date = datetime.strptime(last_date_str, '%d.%m.%Y, %H:%M:%S %z')

            difference = utc_now - last_date
            hours_difference = difference.total_seconds() / 3600
            if hours_difference > 3:
                hours_difference = 3
            if hours_difference < 0:
                hours_difference = 0;
            energy_plus = abs(int(hours_difference / (1 / 6)))
            if energy_plus > 40:
                energy_plus = 40
            energy = int(data['energy'])
            data['energy'] = energy + energy_plus
            new_eggs = data['egg_amm'] + ((data['hero_uprise'] + data['nohero_uprise']) * hours_difference)
            new_eggs = round(new_eggs, 2)
            data['egg_amm'] = new_eggs

            print(utc_now, last_date, hours_difference, new_eggs)
    update_friend_names(user_id)

    # Если это POST-запрос, обрабатываем данные формы
    if request.method == 'POST':
        form = UserForm(request.POST, instance=guest)
        if form.is_valid():
            print('Форма валидна')
            print(request.POST)
            form_friends = form.cleaned_data.get('friends')
            db_friends = guest.friends  # Получаем значение из базы данных

            # Проверяем, если длина значения из базы данных больше
            if len(db_friends) > len(form_friends):
                form.instance.friends = db_friends  # Устанавливаем значение из БД в форму

            print(request.POST)
            form.save()
        else:
            print('Форма не валидна')
            print(form.errors)  # Выводим ошибки в форме для диагностики
            print(request.POST)
    # Сохраняем обновлённые данные пользователя
    else:
        # Если это GET-запрос, создаем форму с существующими данными
        form = UserForm(instance=guest)

    context = {
        'data': data,
        'form': form
    }

    # Передача контекста в шаблон
    return render(request, 'page/index.html', context)


def o_friend(request, user_id, friend):
    # Проверка, существует ли пользователь
    guest = Guests.objects.filter(tg_id=user_id).first()
    data = ''

    if not guest:
        # Если пользователь не существует, создаем нового
        guest = Guests.objects.create(tg_id=user_id)
        guest.save()
        data = get_user_data(user_id)
        try:
            friend_data = get_user_data(friend)
            data_friends = list(data['friends'])
            friend_friends = ast.literal_eval(friend_data['friends'])
            print(friend_data['friends'])
            data_friends.append([friend_data['tg_id'], friend_data['nickname'], 'o'])
            friend_friends.append([data['tg_id'], data['nickname'], 'o'])
            data['friends'] = data_friends
            update_user_friends_and_use_case_o(friend, friend_friends, 4)
            data['use_case'] = 5
            data['pns_amm'] = 15
        except:
            print('Друга нет')
    else:
        data = get_user_data(user_id)
        if request.method == 'GET':
            data = get_user_data(user_id)
            utc_now = datetime.now(pytz.utc)
            last_date_str = data['last_visit']
            if '+' not in last_date_str and '-' not in last_date_str:
                last_date_str += ' +0300'
            last_date_str = re.sub(r',(\S)', r', \1', last_date_str)

            # Теперь строка должна выглядеть как '14.11.2024, 17:00:12 +0300'
            last_date = datetime.strptime(last_date_str, '%d.%m.%Y, %H:%M:%S %z')

            difference = utc_now - last_date
            hours_difference = difference.total_seconds() / 3600
            if hours_difference > 3:
                hours_difference = 3
            if hours_difference < 0:
                hours_difference = 0;
            energy_plus = abs(int(hours_difference / (1 / 6)))
            if energy_plus > 40:
                energy_plus = 40
            energy = int(data['energy'])
            data['energy'] = energy + energy_plus
            new_eggs = data['egg_amm'] + ((data['hero_uprise'] + data['nohero_uprise']) * hours_difference)
            new_eggs = round(new_eggs, 2)
            data['egg_amm'] = new_eggs

            print(utc_now, last_date, hours_difference, new_eggs)

    update_friend_names(user_id)

    # Если это POST-запрос, обрабатываем данные формы
    if request.method == 'POST':
        form = UserForm(request.POST, instance=guest)
        if form.is_valid():
            print('Форма валидна')
            print(request.POST)
            form_friends = form.cleaned_data.get('friends')
            db_friends = guest.friends  # Получаем значение из базы данных

            # Проверяем, если длина значения из базы данных больше
            if len(db_friends) > len(form_friends):
                form.instance.friends = db_friends  # Устанавливаем значение из БД в форму

            print(request.POST)
            form.save()
        else:
            print('Форма не валидна')
            print(form.errors)  # Выводим ошибки в форме для диагностики
            print(request.POST)
    # Сохраняем обновлённые данные пользователя
    else:
        # Если это GET-запрос, создаем форму с существующими данными
        form = UserForm(instance=guest)

    context = {
        'data': data,
        'form': form
    }

    # Передача контекста в шаблон
    return render(request, 'page/index.html', context)

@csrf_exempt
def proxy_to_bot(request):
    if request.method == "POST":
        try:
            # Получаем данные из запроса
            data = json.loads(request.body)
            user_id = data.get('user_id')
            text = data.get('text')
            name = data.get('name')

            # URL вашего бота
            bot_url = 'http://188.225.44.248:8000/send-message'

            # Отправляем данные на сервер с ботом
            response = requests.post(bot_url, json={
                "user_id": user_id,
                "text": text,
                "name": name
            })

            # Проверяем успешность запроса
            if response.status_code == 200:
                return JsonResponse({"status": "success", "message": "Сообщение успешно отправлено на сервер с ботом"})
            else:
                return JsonResponse({"status": "error", "message": "Ошибка при отправке на сервер с ботом"}, status=500)

        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=500)

    return JsonResponse({"status": "error", "message": "Только POST-запросы поддерживаются"}, status=400)


def test(request):
    return render(request, 'page/index.html')
