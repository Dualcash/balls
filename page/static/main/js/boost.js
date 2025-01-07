function roundNumber(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}
function energyRise(){
    let energyElement = document.querySelector('.energy');
    let energyText = energyElement.textContent;
    let [currentEnergy, maxEnergy] = energyText.split('/');
    currentEnergy = maxEnergy.split('⚡')[0];
    let newEnergyText = `${currentEnergy}/${maxEnergy}`;
    energyElement.textContent = newEnergyText;
    $('.not-pass').text('Энергия ⚡ востановлена');
    $('.not-pass').fadeIn(300, function() {
        // Скрываем блок через 2 секунды
        setTimeout(function() {
            $('.not-pass').fadeOut(300);
        }, 2000);
    });
    
}
function riseUpdate(){
    let egg = $('#white-egg-url').data('url');
    let heroUprise = Number($('#hero_uprise').text()); // Используйте .val(), если это input, или .text() для получения текста
    let noHeroUprise = Number($('#nohero_uprise').text()); // Аналогично для второго значения
    let totalUprise = heroUprise + noHeroUprise;
    let info = $('#info-url').data('url');
    if ($('#now_hero').text() == 'Hamster'){
        totalUprise += 3000;
    }
    if ($('#now_hero').text() == 'Capybar'){
        totalUprise += 5000;
    }
    if ($('#now_hero').text() == 'Tap'){
        totalUprise += 50000;
    }

    $('.resource').html(`<div class="resource">` + totalUprise + 
      ` <img src="${egg}" alt="Coins" class="coin-icon">/час
      <img src="${info}" alt="Coins" class="info-icon" id = 'rise-popup'></div>`);
}
riseUpdate()
$('#buy-energy').on('touchstart', function() {
    let maxik = Number($('#max_hero_lvl').text());
    var newImageUrl = $('#egg-url').data('url');
    $('.not-pass').text('У вас не хватает ресурсов на эту покупку');
    let score = Number($('.score-res').text());
    switch (maxik) {
        case 1:
            if (score >= 1000){
                let score = Number($('.score-res').text());
                $('.score-res').html(`
                    ${roundNumber(score-1000,2)} 
                    <img src="${newImageUrl}" alt="Egg Image" class="coin-icon">
                `);
                energyRise();
            }
            else{
                $('.not-pass').fadeIn(300, function() {
                    // Скрываем блок через 2 секунды
                    setTimeout(function() {
                        $('.not-pass').fadeOut(300);
                    }, 2000);
                });
                break;
            }
            break;
        case 2:
            if (score >= 10000){
                let score = Number($('.score-res').text());
                $('.score-res').html(`
                    ${roundNumber(score-10000,2)} 
                    <img src="${newImageUrl}" alt="Egg Image" class="coin-icon">
                `);
                energyRise();
                }
            else{
                $('.not-pass').fadeIn(300, function() {
                    // Скрываем блок через 2 секунды
                    setTimeout(function() {
                        $('.not-pass').fadeOut(300);
                    }, 2000);
                });
                break;

            }
            break;
        case 3:
            if (score >= 30000){
                let score = Number($('.score-res').text());
                $('.score-res').html(`
                    ${roundNumber(score-30000,2)} 
                    <img src="${newImageUrl}" alt="Egg Image" class="coin-icon">
                `);
                energyRise();
                }
            else{
                $('.not-pass').fadeIn(300, function() {
                    // Скрываем блок через 2 секунды
                    setTimeout(function() {
                        $('.not-pass').fadeOut(300);
                    }, 2000);
                });
                break;

            }
            break;
        case 4:
            if (score >= 30000){
                let score = Number($('.score-res').text());
                $('.score-res').html(`
                    ${roundNumber(score-30000,2)} 
                    <img src="${newImageUrl}" alt="Egg Image" class="coin-icon">
                `);
                energyRise();
                }
            else{
                $('.not-pass').fadeIn(300, function() {
                    // Скрываем блок через 2 секунды
                    setTimeout(function() {
                        $('.not-pass').fadeOut(300);
                    }, 2000);
                });
                break;

            }
            break;
        case 5:
            if (score >= 50000){
                let score = Number($('.score-res').text());
                $('.score-res').html(`
                    ${roundNumber(score-50000,2)} 
                    <img src="${newImageUrl}" alt="Egg Image" class="coin-icon">
                `);
                energyRise();
                }
            else{
                $('.not-pass').fadeIn(300, function() {
                    // Скрываем блок через 2 секунды
                    setTimeout(function() {
                        $('.not-pass').fadeOut(300);
                    }, 2000);
                });
                break;

            }
            break;
        case 6:
            if (score >= 50000){
                let score = Number($('.score-res').text());
                $('.score-res').html(`
                    ${roundNumber(score-50000,2)} 
                    <img src="${newImageUrl}" alt="Egg Image" class="coin-icon">
                `);
                energyRise();
                }
            else{
                $('.not-pass').fadeIn(300, function() {
                    // Скрываем блок через 2 секунды
                    setTimeout(function() {
                        $('.not-pass').fadeOut(300);
                    }, 2000);
                });
                break;

            }
            break;
        case 7:
            if (score >= 70000){
                let score = Number($('.score-res').text());
                $('.score-res').html(`
                    ${roundNumber(score-70000,2)} 
                    <img src="${newImageUrl}" alt="Egg Image" class="coin-icon">
                `);
                energyRise();
                }
            else{
                $('.not-pass').fadeIn(300, function() {
                    // Скрываем блок через 2 секунды
                    setTimeout(function() {
                        $('.not-pass').fadeOut(300);
                    }, 2000);
                });
                break;

            }
        case 8:
            if (score >= 350000){
                let score = Number($('.score-res').text());
                $('.score-res').html(`
                    ${roundNumber(score-350000,2)} 
                    <img src="${newImageUrl}" alt="Egg Image" class="coin-icon">
                `);
                energyRise();
                }
            else{
                $('.not-pass').fadeIn(300, function() {
                    // Скрываем блок через 2 секунды
                    setTimeout(function() {
                        $('.not-pass').fadeOut(300);
                    }, 2000);
                });

            }
            break;
        case 9:
            if (score >= 450000){
                let score = Number($('.score-res').text());
                $('.score-res').html(`
                    ${roundNumber(score-450000,2)} 
                    <img src="${newImageUrl}" alt="Egg Image" class="coin-icon">
                `);
                energyRise();
                }
            else{
                $('.not-pass').fadeIn(300, function() {
                    // Скрываем блок через 2 секунды
                    setTimeout(function() {
                        $('.not-pass').fadeOut(300);
                    }, 2000);
                });

            }
            break;
        case 10:
            if (score >= 600000){
                let score = Number($('.score-res').text());
                $('.score-res').html(`
                    ${roundNumber(score-600000,2)} 
                    <img src="${newImageUrl}" alt="Egg Image" class="coin-icon">
                `);
                energyRise();
                }
            else{
                $('.not-pass').fadeIn(300, function() {
                    // Скрываем блок через 2 секунды
                    setTimeout(function() {
                        $('.not-pass').fadeOut(300);
                    }, 2000);
                });

            }
            break;

    }

});
//buy-rise---------------------------------------------
let noheroUprise = document.getElementById('nohero_uprise');

    // Функция для увеличения значения на переданное число
function increaseByNumber(number) {
        // Получаем текущее значение элемента и преобразуем его в число
    let currentValue = parseInt(noheroUprise.textContent);
    
        // Увеличиваем значение на переданное число
    let newValue = currentValue + number;
    
        // Обновляем содержимое элемента
    noheroUprise.textContent = newValue;
    }
$('#buy-rise').on('touchstart', function() {
    let maxik = Number($('#max_hero_lvl').text());
    var newImageUrl = $('#egg-url').data('url');
    var imageUrl = $('#white-egg-url').data('url');
    let score = Number($('.score-res').text());
    $('.not-pass').text('У вас не хватает ресурсов на эту покупку');
    switch (maxik) {
        case 1:
            if (score >= 1000){
                let score = Number($('.score-res').text());
                $('.score-res').html(`
                    ${roundNumber(score-1000,2)} 
                    <img src="${newImageUrl}" alt="Egg Image" class="coin-icon">
                `);
                increaseByNumber(100);
                riseUpdate();
            }
            else{
                $('.not-pass').fadeIn(300, function() {
                    // Скрываем блок через 2 секунды
                    setTimeout(function() {
                        $('.not-pass').fadeOut(300);
                    }, 2000);
                });

            }
            break;
        case 2:
            if (score >= 10000){
                let score = Number($('.score-res').text());
                $('.score-res').html(`
                    ${roundNumber(score-10000,2)} 
                    <img src="${newImageUrl}" alt="Egg Image" class="coin-icon">
                `);
                increaseByNumber(500);
                riseUpdate();
                                    break;
                }
            else{
                $('.not-pass').fadeIn(300, function() {
                    // Скрываем блок через 2 секунды
                    setTimeout(function() {
                        $('.not-pass').fadeOut(300);
                    }, 2000);
                });

            }
            break;
        case 3:
            if (score >= 30000){
                let score = Number($('.score-res').text());
                $('.score-res').html(`
                    ${roundNumber(score-30000,2)} 
                    <img src="${newImageUrl}" alt="Egg Image" class="coin-icon">
                `);
                increaseByNumber(1000);
                riseUpdate();
                                    break;
                }
            else{
                $('.not-pass').fadeIn(300, function() {
                    // Скрываем блок через 2 секунды
                    setTimeout(function() {
                        $('.not-pass').fadeOut(300);
                    }, 2000);
                });

            }
            break;
        case 4:
            if (score >= 30000){
                let score = Number($('.score-res').text());
                $('.score-res').html(`
                    ${roundNumber(score-30000,2)} 
                    <img src="${newImageUrl}" alt="Egg Image" class="coin-icon">
                `);
                increaseByNumber(1500);
                riseUpdate();
                break;
                }
            else{
                $('.not-pass').fadeIn(300, function() {
                    // Скрываем блок через 2 секунды
                    setTimeout(function() {
                        $('.not-pass').fadeOut(300);
                    }, 2000);
                });

            }
            break;
        case 5:
            if (score >= 50000){
                let score = Number($('.score-res').text());
                $('.score-res').html(`
                    ${roundNumber(score-50000,2)} 
                    <img src="${newImageUrl}" alt="Egg Image" class="coin-icon">
                `);
                increaseByNumber(5000);
                riseUpdate();
                                    break;
                }
            else{
                $('.not-pass').fadeIn(300, function() {
                    // Скрываем блок через 2 секунды
                    setTimeout(function() {
                        $('.not-pass').fadeOut(300);
                    }, 2000);
                });

            }
            break;
        case 6:
            if (score >= 50000){
                let score = Number($('.score-res').text());
                $('.score-res').html(`
                    ${roundNumber(score-50000,2)} 
                    <img src="${newImageUrl}" alt="Egg Image" class="coin-icon">
                `);
                increaseByNumber(5000);
                riseUpdate();
                                    break;
                }
            else{
                $('.not-pass').fadeIn(300, function() {
                    // Скрываем блок через 2 секунды
                    setTimeout(function() {
                        $('.not-pass').fadeOut(300);
                    }, 2000);
                });

            }
        case 7:
            if (score >= 70000){
                let score = Number($('.score-res').text());
                $('.score-res').html(`
                    ${roundNumber(score-70000,2)} 
                    <img src="${newImageUrl}" alt="Egg Image" class="coin-icon">
                `);
                increaseByNumber(7000);
                riseUpdate();
                                    break;
                }
            else{
                $('.not-pass').fadeIn(300, function() {
                    // Скрываем блок через 2 секунды
                    setTimeout(function() {
                        $('.not-pass').fadeOut(300);
                    }, 2000);
                });

            }
            break;
        case 8:
            if (score >= 350000){
                let score = Number($('.score-res').text());
                $('.score-res').html(`
                    ${roundNumber(score-350000,2)} 
                    <img src="${newImageUrl}" alt="Egg Image" class="coin-icon">
                `);
                increaseByNumber(30000);
                riseUpdate();
                                    break;
                }
            else{
                $('.not-pass').fadeIn(300, function() {
                    // Скрываем блок через 2 секунды
                    setTimeout(function() {
                        $('.not-pass').fadeOut(300);
                    }, 2000);
                });

            }
            break;
        case 9:
            if (score >= 450000){
                let score = Number($('.score-res').text());
                $('.score-res').html(`
                    ${roundNumber(score-450000,2)} 
                    <img src="${newImageUrl}" alt="Egg Image" class="coin-icon">
                `);
                increaseByNumber(50000);
                riseUpdate();
                                    break;
                }
            else{
                $('.not-pass').fadeIn(300, function() {
                    // Скрываем блок через 2 секунды
                    setTimeout(function() {
                        $('.not-pass').fadeOut(300);
                    }, 2000);
                });

            }
            break;
        case 10:
            if (score >= 600000){
                let score = Number($('.score-res').text());
                $('.score-res').html(`
                    ${roundNumber(score-600000,2)} 
                    <img src="${newImageUrl}" alt="Egg Image" class="coin-icon">
                `);
                increaseByNumber(1000000);
                riseUpdate();
                                    break;
                }
            else{
                $('.not-pass').fadeIn(300, function() {
                    // Скрываем блок через 2 секунды
                    setTimeout(function() {
                        $('.not-pass').fadeOut(300);
                    }, 2000);
                });

            }
            break;

    }
        
});
