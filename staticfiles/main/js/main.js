
window.onload = function() {
    function isMobileDevice() {
        console.log(/Mobi|Android|iPhone|iPod/i.test(navigator.userAgent));
        return /Mobi|Android|iPhone|iPod/i.test(navigator.userAgent);
        
    }
    isMobileDevice();
    if (!isMobileDevice()) {
        $('#placeholder').show(); // Показываем заглушку
    }


        
    
    console.log('Все изображения и ресурсы загружены');
    setTimeout(function() {
        $('.loading-screen').fadeOut(1000);
        $('.container').show();
        $('.footer').show();
    }, 1000); // 1000 мс = 1 секунда
  };
document.addEventListener('DOMContentLoaded', function() {
    function energy_load(){
        let maxik = Number($('#max_hero_lvl').text());
        let energyElement = document.querySelector('.energy');
        let energyText = energyElement.textContent;
        let [currentEnergy, maxEnergy] = energyText.split('/');
        switch (maxik) {
            case 1:
                maxEnergy = 5;
                break;
            case 2:
                maxEnergy = 8;
                break;
            case 3:
                maxEnergy = 10;
                break;
            case 4:
                maxEnergy = 11;
                break;
            case 5:
                maxEnergy = 12;
                break;
            case 6:
                maxEnergy = 13;
                break;
            case 7:
                maxEnergy = 15;
                break;
            case 8:
                maxEnergy = 20;
                break;
            case 9:
                maxEnergy = 25;
                break;
            case 10:
                maxEnergy = 35;
                break;
        }
        if (maxEnergy < currentEnergy){
            currentEnergy = maxEnergy;
        }
        if (String(currentEnergy).includes("⚡")) {
            currentEnergy = currentEnergy.replace("⚡", "");
        }
        if (isNaN(currentEnergy)) {
            currentEnergy = maxEnergy;
        }
    

        currentEnergy = currentEnergy;
        let newEnergyText = `${currentEnergy}/${maxEnergy}⚡`;
        energyElement.textContent = newEnergyText;
    }
    energy_load();
    //----------------------------------
    function current_image(){
        var imgMassive = document.getElementsByClassName('character-img');
        for (var i = 0; i < imgMassive.length; i++) {
            if (imgMassive[i].style = 'block'){
                cur_id = imgMassive[i].id;
                return imgMassive[i]
                
            }; 
        }
    }
    var imgElement = current_image();
    var textElement = document.getElementById('character-text'); 
    function character_touch() {
        var imgWidth = $('.character-img').width();
        var imgHeight = $('.character-img').height();

        $('#character-text').css({
            'width': imgWidth + 'px',
            'height': imgHeight + 'px'
        });
        $('.character-img').hide();
        setTimeout(function() {
            $('#character-text').fadeIn(200);
        },100); 
    }
    function text_touch() {
        $('#character-text').hide();
        setTimeout(function() {
            $('.character-img').fadeIn(200);
        }, 10); 
    }
    imgElement.addEventListener('touchstart', character_touch);
    textElement.addEventListener('touchstart', text_touch);
    //-------------------------------------------------

    function open_levels(){
        let current_hero = $('#now_hero').text();
        let level = 1;
        switch (current_hero) {
            case 'Hobo':
                level = 1;
                break;
            case 'Hamster':
                level = 2;
                break;
            case 'Tony':
                level = 3;
                break;
            case 'Capybar':
                level = 4;
                break;
            case 'Botan':
                level = 5;
                break;
            case 'Hui':
                level = 6;
                break;
            case 'Mask':
                level = 7;
                break;
            case 'Pasha':
                level = 8;
                break;
            case 'Tap':
                level = 9;
                break;
            case 'PNS':
                level = 10;
                break;
            default:
                level = 1; // Если герой не найден, оставить уровень 1
        }
        $('#hero_lvl').text(level);
        max_level = Number($('#max_hero_lvl').text());
        if (level> max_level){
            $('#max_hero_lvl').text(level);
        }
        for (let i = 2; i <= 10; i++) {
            const levelElement = document.querySelector('#level-' + i);
            if (levelElement) {  // Проверяем, существует ли элемент
                levelElement.textContent = 'Уровень ' + i;
                const gameCard = levelElement.nextElementSibling; // следующий элемент за заголовком уровня
                const lockOverlay = gameCard?.querySelector('.lock-overlay');
                if (i ==2){
                    k = i + 1;
                        const levelElement = document.querySelector('#level-' + k);
                        const gameCard = levelElement.previousElementSibling; // следующий элемент за заголовком уровня
                        const lockOverlay = gameCard?.querySelector('.lock-overlay');
                        lockOverlay.style.display = 'none';

                }
                lockOverlay.style.display = 'none';
                if (level < i) {
                    
                    levelElement.textContent = 'Уровень ' + i + ' 🔒';
                    lockOverlay.style.display = 'flex';
                    if (i == 2){
                        k = i + 1;
                        const levelElement = document.querySelector('#level-' + k);
                        const gameCard = levelElement.previousElementSibling; // следующий элемент за заголовком уровня
                        const lockOverlay = gameCard?.querySelector('.lock-overlay');
                        lockOverlay.style.display = 'flex';

                    }
                } 
        
            }
        }
        
    }

    //панель--------------------------
    function update_locks(){
        document.querySelectorAll('.card-item').forEach(card => {
            const buyButton = card.querySelector('.buy-btn');
            const infoButton = card.querySelector('.info-btn');
        
            if (buyButton && buyButton.textContent.trim() === "Купить") {
                infoButton.textContent = "🔒";
            }
        });
    }
    
    function disable_All (){
        $('.container, .games_page, .friends_page, .cards_page, .tasks_page').hide();
    }

    function home_touch(){
        open_levels();
        disable_All();
        $('.container').fadeIn(200);
    }
    function games_touch(){
        open_levels();
        disable_All();
        $('.games_page').fadeIn(200);
    }
    function friends_touch(){
        disable_All();
        $('.friends_page').fadeIn(200);
    }
    function cards_touch(){
        disable_All();
        update_locks();
        $('.cards_page').fadeIn(200);
    }
    function tasks_touch(){
        var pns =  $('#pns_amm').text();
        $('.pns-scores').text(pns);
        disable_All();
        $('.tasks_page').fadeIn(200);
    }
    document.querySelector('.home').addEventListener('touchstart', home_touch);
    document.querySelector('.games').addEventListener('touchstart', games_touch);
    document.querySelector('.friends').addEventListener('touchstart', friends_touch);
    document.querySelector('.cards').addEventListener('touchstart', cards_touch);
    document.querySelector('.tasks').addEventListener('touchstart', tasks_touch);

//прирост------------------------------------------------------------------------------------------------  
function formatNumber(number) {
    if (number < 1000) {
        // Показывать число с двумя знаками после запятой
        return number.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    } else {
        // Числа >= 1000 без десятичных знаков
        return Math.floor(number).toLocaleString("en-US");
    }
}
    function better_score(){
        let score = $('.score-res').text();
        
        const newImageUrl = document.querySelector('#egg-url').dataset.url;
        $('.score-res-better').html(`${formatNumber(score)} <img src="${newImageUrl}" alt="Egg Image" class="coin-icon">`)
    }
    function better_rise(){
        let rise = $('.resource:first').text().trim().match(/\d+/)[0];
        function formatLargeNumber(number) {
            if (number < 1000) {
                return number.toString();
            } else if (number < 1_000_000) {
                let thousands = Math.floor(number / 1000);
                let remainder = Math.floor((number % 1000) / 100);
                return `${thousands}${remainder > 0 ? ',' + remainder : ''}k`;
            } else {
                let millions = Math.floor(number / 1_000_000);
                let remainder = Math.floor((number % 1_000_000) / 100_000);
                return `${millions}${remainder > 0 ? ',' + remainder : ''}mln`;
            }
        }
        let egg = $('#white-egg-url').data('url');
        let info = $('#info-url').data('url');
        $('.resource-bet').html(`${formatLargeNumber(rise)} 
             <img src="${egg}" alt="Coins" class="coin-icon">/час
            <img src="${info}" alt="Coins" class="info-icon" id = 'rise-popup'></div>`);
    }

    function better_pns(){
        let real = Number($('.pns-scores').text());
        console.log(real);
        $('.pns-scores-bet').html(`${formatNumber(real)}`)

    }
    
    let energy_up = 0;

    function updateScoreEverySecond() {
        // Функция обновления счета каждую секунду
        setInterval(() => {
            energy_load();
            energy_up ++;
            if (energy_up > 599){
                let energyElement = document.querySelector('.energy');
                let energyText = energyElement.textContent;
                let [currentEnergy, maxEnergy] = energyText.split('/');
                if (currentEnergy + '⚡' == maxEnergy){
                    energy_up = 0;
                }
                else{
                    currentEnergy++; 
                    let newEnergyText = `${currentEnergy}/${maxEnergy}`;
                    energyElement.textContent = newEnergyText;
                }
                energy_up = 0;
            }
            // Получаем текущее количество ресурсов в каждой итерации
            const resourceElement = document.querySelector('.resource');
            const scoreResElement = document.querySelector('.score-res');
            
            
            // Извлекаем число ресурсов из строки
            let resourceValue = parseFloat(resourceElement.textContent.match(/\d+/)[0]);
    
            // Рассчитываем прирост за секунду (ресурсы в час делим на 3600) каждую итерацию
            const incrementPerSecond = resourceValue / 3600;
    
            // Получаем текущее значение очков как число с плавающей точкой каждую итерацию
            let currentScore = parseFloat(scoreResElement.textContent.match(/\d+(\.\d+)?/)[0]);
    
            // Добавляем прирост за секунду к текущему счёту
            currentScore += incrementPerSecond;
    
            // Получаем новое изображение из data-url
            const newImageUrl = document.querySelector('#egg-url').dataset.url;
    
            // Обновляем текст в элементе с новым значением и картинкой, форматируем результат до 2 знаков после запятой
            scoreResElement.innerHTML = `${currentScore.toFixed(2)} <img src="${newImageUrl}" alt="Egg Image" class="coin-icon">`;
            better_score();
            better_rise();
            better_pns()
        }, 1000);
    }
    
    // Запуск функции обновления счета
    updateScoreEverySecond();
    //буст------------------------------------------------------------------------------------------------
    $('#boost-btn').on('touchstart', function() {
        open_levels();
        let lvl = Number($('#max_hero_lvl').text());
        let egg = $('#white-egg-url').data('url');
        let htmlContent = '';

        switch (lvl) {
            case 1:
                htmlContent = `
                    <p><strong>Увеличение прироста 1 lvl</strong></p>
                    <p>Увеличение прироста на 100/ч</p>
                    <p>Цена: 1000 <img src="${egg}" alt="Цена" class="coin-icon-boost"></p>`;
                $('#rise-description').html(htmlContent);
                energyHtmlContent = `
                    <p><strong>Заполнение энергии 1 lvl</strong></p>
                    <p>Заполнение энергии полностью</p>
                    <p>Цена: 1000 <img src="${egg}" alt="Цена" class="coin-icon"></p>`;
                $('#energy-description').html(energyHtmlContent);
                $('#rise-description').html(htmlContent);
                break;
            case 2:
                htmlContent = `
                    <p><strong>Увеличение прироста 2 lvl</strong></p>
                    <p>Увеличение прироста на 500/ч</p>
                    <p>Цена: 10000 <img src="${egg}" alt="Цена" class="coin-icon-boost"></p>`;
                energyHtmlContent = `
                    <p><strong>Заполнение энергии 2 lvl</strong></p>
                    <p>Заполнение энергии полностью</p>
                    <p>Цена: 10000 <img src="${egg}" alt="Цена" class="coin-icon"></p>`;
                $('#energy-description').html(energyHtmlContent);
                $('#rise-description').html(htmlContent);
                break;
            case 3:
                htmlContent = `
                    <p><strong>Увеличение прироста 3 lvl</strong></p>
                    <p>Увеличение прироста на 1k/ч</p>
                    <p>Цена: 30000 <img src="${egg}" alt="Цена" class="coin-icon-boost"></p>`;
                energyHtmlContent = `
                    <p><strong>Заполнение энергии 3 lvl</strong></p>
                    <p>Заполнение энергии полностью</p>
                    <p>Цена: 30000 <img src="${egg}" alt="Цена" class="coin-icon"></p>`;
                $('#energy-description').html(energyHtmlContent);
                $('#rise-description').html(htmlContent);
                break;
            case 4:
                htmlContent = `
                    <p><strong>Увеличение прироста 4 lvl</strong></p>
                    <p>Увеличение прироста на 1.5k/ч</p>
                    <p>Цена: 30000 <img src="${egg}" alt="Цена" class="coin-icon-boost"></p>`;
                energyHtmlContent = `
                    <p><strong>Заполнение энергии 4 lvl</strong></p>
                    <p>Заполнение энергии полностью</p>
                    <p>Цена: 30000 <img src="${egg}" alt="Цена" class="coin-icon"></p>`;
                $('#energy-description').html(energyHtmlContent);
                $('#rise-description').html(htmlContent);
                break;
            case 5:
                htmlContent = `
                    <p><strong>Увеличение прироста 5 lvl</strong></p>
                    <p>Увеличение прироста на 5k/ч</p>
                    <p>Цена: 50000 <img src="${egg}" alt="Цена" class="coin-icon-boost"></p>`;
                energyHtmlContent = `
                    <p><strong>Заполнение энергии 5 lvl</strong></p>
                    <p>Заполнение энергии полностью</p>
                    <p>Цена: 50000 <img src="${egg}" alt="Цена" class="coin-icon"></p>`;
                $('#energy-description').html(energyHtmlContent);
                $('#rise-description').html(htmlContent);
                break;
            case 6:
                htmlContent = `
                    <p><strong>Увеличение прироста 6 lvl</strong></p>
                    <p>Увеличение прироста на 5k/ч</p>
                    <p>Цена: 50000 <img src="${egg}" alt="Цена" class="coin-icon-boost"></p>`;
                energyHtmlContent = `
                    <p><strong>Заполнение энергии 6 lvl</strong></p>
                    <p>Заполнение энергии полностью</p>
                    <p>Цена: 50000 <img src="${egg}" alt="Цена" class="coin-icon"></p>`;
                $('#energy-description').html(energyHtmlContent);
                $('#rise-description').html(htmlContent);
                break;
            case 7:
                htmlContent = `
                    <p><strong>Увеличение прироста 7 lvl</strong></p>
                    <p>Увеличение прироста на 7k/ч</p>
                    <p>Цена: 70000 <img src="${egg}" alt="Цена" class="coin-icon-boost"></p>`;
                energyHtmlContent = `
                    <p><strong>Заполнение энергии 7 lvl</strong></p>
                    <p>Заполнение энергии полностью</p>
                    <p>Цена: 70000 <img src="${egg}" alt="Цена" class="coin-icon"></p>`;
                $('#energy-description').html(energyHtmlContent);
                $('#rise-description').html(htmlContent);
                break;
            case 8:
                htmlContent = `
                    <p><strong>Увеличение прироста 8 lvl</strong></p>
                    <p>Увеличение прироста на 30k/ч</p>
                    <p>Цена: 350000 <img src="${egg}" alt="Цена" class="coin-icon-boost"></p>`;
                energyHtmlContent = `
                    <p><strong>Заполнение энергии 8 lvl</strong></p>
                    <p>Заполнение энергии полностью</p>
                    <p>Цена: 350000 <img src="${egg}" alt="Цена" class="coin-icon"></p>`;
                $('#energy-description').html(energyHtmlContent);
                $('#rise-description').html(htmlContent);
                break;
            case 9:
                htmlContent = `
                    <p><strong>Увеличение прироста 9 lvl</strong></p>
                    <p>Увеличение прироста на 50k/ч</p>
                    <p>Цена: 450000 <img src="${egg}" alt="Цена" class="coin-icon-boost"></p>`;
                energyHtmlContent = `
                    <p><strong>Заполнение энергии 9 lvl</strong></p>
                    <p>Заполнение энергии полностью</p>
                    <p>Цена: 450000 <img src="${egg}" alt="Цена" class="coin-icon"></p>`;
                $('#energy-description').html(energyHtmlContent);
                $('#rise-description').html(htmlContent);
                break;
            case 10:
                htmlContent = `
                    <p><strong>Увеличение прироста 10 lvl</strong></p>
                    <p>Увеличение прироста на 100k/ч</p>
                    <p>Цена: 600000 <img src="${egg}" alt="Цена" class="coin-icon-boost"></p>`;
                energyHtmlContent = `
                    <p><strong>Заполнение энергии 10 lvl</strong></p>
                    <p>Заполнение энергии полностью</p>
                    <p>Цена: 600000 <img src="${egg}" alt="Цена" class="coin-icon"></p>`;
                $('#energy-description').html(energyHtmlContent);
                $('#rise-description').html(htmlContent);
                break;
        }
        
        $('.boost-panel').slideToggle();
    });
    
    $('#close-panel').on('touchstart', function() {
        console.log('das');
        $('.boost-panel').slideToggle();
    });
    $(document).on('touchstart', '#edit-btn', function() {
        // Получаем текущее имя пользователя и отображаем модальное окно
        const usernameElement = $('.username').contents().filter(function() {
            return this.nodeType === Node.TEXT_NODE;
          }).get(0);
          
        const currentUsername = usernameElement ? usernameElement.nodeValue.trim() : '';
        $('#username-input').val(currentUsername); // Заполняем поле текущим значением
        $('#edit-modal').show();
    });
    
    // Сохранение нового имени пользователя
    function saveUsername() {
        const usernameInput = $('#username-input').val();
        const editUrl = $('#edit-url').data('url'); // Получаем URL для изображения
    
        if (usernameInput) {
            // Обновляем содержимое блока с новым именем и иконкой
            var user_photo = $('#users-url').data('url');
            $('.username').html(`<img src="${user_photo}" class="user-icon">${usernameInput} <img src="${editUrl}" class="coin-icon" id="edit-btn">`);
            $('#edit-modal').hide(); // Скрыть модальное окно после сохранения
        }
    }
    
    // Закрытие модального окна при клике вне его области
   
    document.querySelector('#add-username').addEventListener('touchstart',saveUsername)

    // Закрытие модального окна при клике вне его области
    
});

  