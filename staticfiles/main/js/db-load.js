function infoLoad() {
    function riseUpdate(){
        let egg = $('#white-egg-url').data('url');
        let heroUprise = Number($('#hero_uprise').text()); // Используйте .val(), если это input, или .text() для получения текста
        let noHeroUprise = Number($('#nohero_uprise').text()); // Аналогично для второго значения
        let totalUprise = heroUprise + noHeroUprise;
        if ($('#now_hero').text() == 'Hamster'){
            totalUprise += 3000;
        }
        if ($('#now_hero').text() == 'Capybar'){
            totalUprise += 5000;
        }
        if ($('#now_hero').text() == 'Tap'){
            totalUprise += 50000;
        }
        let info = $('#info-url').data('url');
    
        $('.resource').html(`<div class="resource">` + totalUprise + 
          ` <img src="${egg}" alt="Coins" class="coin-icon">/час
          <img src="${info}" alt="Coins" class="info-icon"  id = 'rise-popup'></div>`);
    }
    var score = $('#egg-amm').text();
    var newImageUrl = $('#egg-url').data('url');
            $('.score-res').html(`
                ${score} 
                <img src="${newImageUrl}" alt="Egg Image" class="coin-icon">
            `);
    var energy =  $('#energy').text();
    let energyElement = document.querySelector('.energy');
    let energyText = energyElement.textContent;
    let [currentEnergy, maxEnergy] = energyText.split('/');
    if (energy > maxEnergy){
        energy = maxEnergy;
    }
    let info = $('#info-url').data('url');
    let newEnergyText = `${energy}/${maxEnergy}⚡`;
    energyElement.textContent = newEnergyText;
    var pns =  $('#pns_amm').text();
    $('.pns-scores').text(pns);
    var name = $('#nickname').text();
    var user_photo = $('#users-url').data('url');
    var edit = $('#edit-url').data('url');
    $('.username').html(`<img src="${user_photo}" class="user-icon">${name} <img src="${edit}" class="coin-icon" id = 'edit-btn'>`)


    riseUpdate();

}
infoLoad()


function loadHeroes(){
    heros = $('#all-heros').text().split(',');
    console.log(heros);
    if (heros.includes('Tony')){
        $('#tony-buy').text('Куплено');
    }
    if (heros.includes('Hamster')){
        $('#hamster-buy').text('Куплено');
    }
    if (heros.includes('Capybar')){
        $('#capybar-buy').text('Куплено');
    }
    if (heros.includes('Botan')){
        $('#botan-buy').text('Куплено');
    }
    if (heros.includes('Hui')){
        $('#hui-buy').text('Куплено');
    }
    if (heros.includes('Mask')){
        $('#mask-buy').text('Куплено');
    }
    if (heros.includes('Pasha')){
        $('#pasha-buy').text('Куплено');
    }
    if (heros.includes('Tap')){
        $('#tapswap-buy').text('Куплено');
    }
    if (heros.includes('PNS')){
        $('#pns-buy').text('Куплено');
    }
}
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('myForm');

    loadHeroes();

    // Добавляем обработчик события submit
    form.addEventListener('submit', function(event) {
        event.preventDefault();  // Предотвращаем стандартное поведение формы (перезагрузку страницы)

        // Собираем данные формы
        const formData = new FormData(form);

        // Отправляем данные формы с помощью fetch()
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'X-CSRFToken': getCookie('csrftoken')  // Добавляем CSRF-токен
            }
        })
        .then(response => response.json())
        .then(data => {
            // Обрабатываем ответ от сервера
            document.getElementById('form-response').innerText = data.message;
        })
        .catch(error => console.error('Ошибка:', error));
    });
});

function fillFormAutomatically() {
    $('#id_tg_id').val($('#telegram-id').text());
    $('#id_hero_uprise').val($('#hero_uprise').text());
    $('#id_nohero_uprise').val($('#nohero_uprise').text());
    $('#id_max_hero_lvl').val($('#max_hero_lvl').text());
    $('#id_hero_lvl').val($('#hero_lvl').text());
    $('#id_now_hero').val($('#now_hero').text());
    $('#id_egg_amm').val(Number($('.score-res').text()));
    $('#id_all_heros').val($('#all-heros').text());
    $('#id_friends').val($('#friends').text());
    $('#id_pns_amm').val($('#pns_amm').text());
    $('#id_nickname').val($('.username').text());
    $('#id_use_case').val('0');
    console.log($('#user_urls').text());
    $('#id_user_urls').val($('#user_urls').text());
    
    let energyElement = document.querySelector('.energy');
    let energyText = energyElement.textContent;
    let [currentEnergy, maxEnergy] = energyText.split('/');
    $('#id_energy').val(currentEnergy);
    const currentDate = new Date();

    const day = String(currentDate.getDate()).padStart(2, "0");
const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // месяцы начинаются с 0
const year = currentDate.getFullYear();

const hours = String(currentDate.getHours()).padStart(2, "0");
const minutes = String(currentDate.getMinutes()).padStart(2, "0");
const seconds = String(currentDate.getSeconds()).padStart(2, "0");

// Получаем смещение в часах и минутах
const timezoneOffset = currentDate.getTimezoneOffset();
const timezoneHours = String(Math.floor(Math.abs(timezoneOffset) / 60)).padStart(2, "0");
const timezoneMinutes = String(Math.abs(timezoneOffset) % 60).padStart(2, "0");
const timezoneSign = timezoneOffset > 0 ? "-" : "+";

// Формируем строку с датой и временем
const dateTimeString = `${day}.${month}.${year}, ${hours}:${minutes}:${seconds} ${timezoneSign}${timezoneHours}${timezoneMinutes}`;
$('#id_last_visit').val(dateTimeString);
console.log(dateTimeString);

    // Создаем объект FormData вручную и отправляем данные
    const form = document.getElementById('myForm');
    const formData = new FormData(form);

    // Отправляем данные с помощью fetch()
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'X-CSRFToken': getCookie('csrftoken')  // Добавляем CSRF-токен
        }
    })
    .then(response => response.json())
    .then(data => {
        // Обрабатываем ответ от сервера
        document.getElementById('form-response').innerText = data.message;
    })
    .catch(error => console.log('Ошибка:', error));
}

// Пример вызова функции при закрытии страницы (beforeunload)

document.querySelector('.home').addEventListener('touchstart', fillFormAutomatically);
document.querySelector('.tasks').addEventListener('touchstart', fillFormAutomatically);
document.querySelector('.games').addEventListener('touchstart', fillFormAutomatically);
document.querySelector('.cards').addEventListener('touchstart', fillFormAutomatically);
document.querySelector('.friends').addEventListener('touchstart', fillFormAutomatically);
document.addEventListener('DOMContentLoaded', function() {
    fillFormAutomatically();
});

function startAutoFill() {
    setInterval(function() {
        fillFormAutomatically();
    }, 30000); // 1000 миллисекунд = 1 секунда
}
$('#close-panel').on('touchstart', function() {
    fillFormAutomatically();
});

startAutoFill();




