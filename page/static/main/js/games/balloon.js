function disable_All() {
    $('.container, .games_page, .friends_page, .cards_page, .tasks_page, .footer').hide();
}

function balloon() { 
    function roundNumber(value, decimals) {
        return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    }
    
    if (Number($('#hero_lvl').text()) < 8) {
        $('.blocked-game').text('Игра недоступна, повысьте уровень');
        // Показываем блок .blocked-game
        $('.blocked-game').fadeIn(300, function() {
            // Скрываем блок через 2 секунды
            setTimeout(function() {
                $('.blocked-game').fadeOut(300);
            }, 2000);
        });
        return;
    }
    const energyElement = document.querySelector('.energy');
    let energyText = energyElement.textContent;
    let [currentEnergy, maxEnergy] = energyText.split('/');
    if (currentEnergy <= 2) {
        $('.blocked-game').text('Недостаточно энергии⚡')
        $('.blocked-game').fadeIn(300, function() {
            // Скрываем блок через 2 секунды
            setTimeout(function() {
                $('.blocked-game').fadeOut(300);
            }, 2000);
        });
        return; // Выход из функции, если энергия 0
    }
    currentEnergy -= 3; // Уменьшаем на 1
    let newEnergyText = `${currentEnergy}/${maxEnergy}`;
    energyElement.textContent = newEnergyText;
    let back = $('#back-game-url').data('url');

    disable_All();

    // Заполняем HTML-контейнер для игры
    $('.game_show').html(`
        <div class="containerr" id="game-containerr">
            <div id="counterr" style="font-family: 'Jost', sans-serif; border: 3px solid rgba(255, 255, 255, 0.289); background: linear-gradient(90deg, #150E1A 0%, #373737 50%, #000000 100%); padding: 10px 15px; color: white; border-radius: 15px; font-size: 0.9rem; text-align: center;">Total: 0</div>
            <div id="balloon"></div>
            <button id="collect-prize" style="position: fixed; bottom: 20px; width: 90%; left: 5%;">Take the prize</button>
        </div>
        <div id="result-screen" style="display: none;">
            <div id="result">Game Over<br><span id="score-text">You scored: 0 points</span></div>
            <button id="end-button">Ok</button>
        </div>
    `).show();

    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .containerr {
                position: relative;
                text-align: center;
                height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
            #counterr {
                font-family: 'Jost', sans-serif; 
                border: 3px solid rgba(255, 255, 255, 0.289);
                background: linear-gradient(90deg, #150E1A 0%, #373737 50%, #000000 100%);
                padding: 10px 15px;
                color: white;
                border-radius: 15px;
                font-size: 0.9rem;
                position: fixed; /* Зафиксировано наверху */
                top: 10px; /* Устанавливаем отступ от верха */
                left: 50%;
                transform: translateX(-50%);
                z-index: 10;
                text-align: center;
            }
            #balloon {
                width: 150px;
                height: 150px;
                background-color: transparent; /* Убираем красный фон */
                border-radius: 50%;
                background-size: cover;
                background-position: center;
                margin: 0 auto; /* Центрируем шар */
            }
            #collect-prize {
                font-family: 'Jost', sans-serif; 
                border: 3px solid rgba(255, 255, 255, 0.289);
                background: linear-gradient(90deg, #150E1A 0%, #373737 50%, #000000 100%);
                padding: 10px 15px;
                color: white;
                border-radius: 15px;
                font-size: 0.9rem;
                margin-bottom: 10px;
                position: fixed;
                bottom: 20px;
                width: 90%;
                left: 5%;
                z-index: 10;
            }
            #result-screen {
    font-family: 'Jost', sans-serif; 
    background: url(${back}) center/cover no-repeat, linear-gradient(90deg, #150E1A 0%, #373737 50%, #000000 100%);
    display: flex;
    flex-direction: column;
    align-items: center; /* Центрирует элементы по горизонтали */
    justify-content: center; /* Центрирует элементы по вертикали */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100%;
    width: 100%;
    color: black;
    text-align: center;
    font-size: 28px;
    z-index: 2;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

#result {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 20px; /* Добавляем отступ снизу, чтобы кнопка не примыкала к тексту */
}

#end-button {
    font-family: 'Jost', sans-serif; 
    padding: 10px 20px;
    font-size: 1rem;
    background-color: red;
    border: none;
    color: white;
    border-radius: 10px;
    cursor: pointer;
    height: 60px;
    margin-top: 20px; /* Отступ сверху для кнопки */
}
        `).appendTo('head');
    
    let all_score = 0;

    // Основная логика игры
    function game() {
        let clickCount = 0;
        let clicksToPop = Math.floor(Math.random() * 23)+ 1; // Рандомное число от 3 до 12 кликов
        let balloonSize = 150; // Начальный размер шара
        const balloonImageUrl = $('#bitcoin-url').data('url'); // Используем URL из данных

        const balloon = document.getElementById('balloon');
        const counter = document.getElementById('counterr');
        const collectPrizeButton = document.getElementById('collect-prize');
        const resultScreen = document.getElementById('result-screen');
        const resultText = document.getElementById('result');
        const gameContainer = document.getElementById('game-containerr');

        if (!balloon || !counter || !collectPrizeButton || !resultScreen || !gameContainer) {
            console.error('Не удалось найти все элементы игры.');
            return;
        }

        // Устанавливаем изображение шара
        balloon.style.backgroundImage = `url(${balloonImageUrl})`;

        balloon.addEventListener('touchstart', function() {
            clickCount++;
            balloonSize += 10; // Увеличение шара при каждом нажатии
            balloon.style.width = balloonSize + 'px';
            balloon.style.height = balloonSize + 'px';
            counter.textContent = `Total: ${clickCount}`; // Обновляем текст счётчика
            collectPrizeButton.style.display = 'block'; // Показываем кнопку забрать выигрыш

            if (clickCount >= clicksToPop) {
                final_score = 0; // Выигрыш равен нулю, если шар лопнул
                setTimeout(showResultScreen, 200); // Показываем экран с результатом через 200 мс
            }
        });

        collectPrizeButton.addEventListener('click', function() {
            final_score = clickCount*50000; // Если пользователь забрал выигрыш, то начисляем клики
            showResultScreen();
        });

        function showResultScreen() {
            let edges = $('#white-egg-url').data('url');
            document.getElementById('score-text').innerHTML = `You scored: ${final_score} <img src=${edges} style="width: 40px; height: 40px; vertical-align: -8px;"></img>`;
            all_score = final_score;
            $('.containerr').hide(); // Скрываем основной экран
            resultScreen.style.display = 'flex';  // Показываем конечный экран
        }

    }

    game(); // Запуск игры

    // Функция завершения игры
    function end() {
        var newImageUrl = $('#egg-url').data('url');
        var updatedScore = Number($('.score-res').text()) + all_score;
        $('.score-res').html(`
            ${updatedScore} 
            <img src="${newImageUrl}" alt="Egg Image" class="coin-icon">
        `);
        $('#gameStyles').remove(); 
        $('.game_show').html('');
        $('.game_show').hide();
        $('.games_page, .footer').fadeIn(100);
    }

    document.querySelector("#end-button").addEventListener('touchstart', end);
}

document.querySelector(".balloon_pop").addEventListener('touchstart', balloon);
