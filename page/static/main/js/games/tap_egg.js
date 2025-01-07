function disable_All() {
    $('.container, .games_page, .friends_page, .cards_page, .tasks_page, .footer').hide();
}

function taps() {
    if (Number($('#hero_lvl').text()) < 10) {
        $('.blocked-game').fadeIn(300, function() {
            $('.blocked-game').text('Игра недоступна, повысьте уровень');
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
            setTimeout(function() {
                $('.blocked-game').fadeOut(300);
            }, 2000);
        });
        return;
    }
    currentEnergy -= 3; // Уменьшаем энергию на 1
    let newEnergyText = `${currentEnergy}/${maxEnergy}`;
    energyElement.textContent = newEnergyText;
    let back = $('#back-game-url').data('url');
    let edges = $('#white-egg-url').data('url');
    disable_All();

    $('.game_show').html(`
        <div id="all-score">Clicks: 0</div>
        <div id="time">Time: 15s</div>
        <canvas id="gameCanvas" width="400" height="600"></canvas>
        <div id="finalScreen">
            <h1>Game Over!</h1>
            <p>Your Score: <span id="final-all-score"></span><img src=${edges} style="width: 40px; height: 40px; vertical-align: -8px;"></img>
            <br>
            <button id ='end'>Ok</button>
            </br>
        </div>
    `).show();

    $('<style>')
        .prop('type', 'text/css')
        .html(`
    body, html {
            height: 100%;
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: transparent;
            position: relative;
        }
        #gameCanvas {
            height: 100%;
            width: 100%;
            display: block;
            margin: auto;
            background-color: transparent;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        #all-score {
            font-size: 24px;
            position: absolute;
            top: 10px;
            left: 10px;
            color: white;
        }
        #time {
            font-size: 24px;
            position: absolute;
            top: 10px;
            right: 10px;
            color: white;
        }
        #finalScreen {
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
    font-weight: bold;
        }
        #finalScreen button {
            font-family: 'Jost', sans-serif; 
    padding: 10px 20px;
    font-size: 1rem;
    background-color: red;
    border: none;
    color: black;
    border-radius: 10px;
    cursor: pointer;
    height: 60px;
    margin-top: 20px; /* Отступ сверху для кнопки */
        }
        `).appendTo('head');
    let final_score = 0;
    function game() {
        let clickCount = 0;
        let timeLeft = 15;
        let gameActive = true;
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        let buttonWidth = 220;
        let buttonHeight = 220;
        let buttonX = canvas.width / 2 - buttonWidth / 2;
        let buttonY = canvas.height / 2 - buttonHeight / 2;

        // Загрузка изображения для кнопки
        const img = new Image();
        const btnUrl = $('#btn-game-url').data('url');
        img.src = btnUrl;

        img.onload = function() {
            drawButton(); // Рисуем кнопку после загрузки изображения
        };

        // Рисуем изображение кнопки
        function drawButton() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, buttonX, buttonY, buttonWidth, buttonHeight);
        }

        // Корректный расчет клика
        function getMousePos(canvas, event) {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;   // Соотношение ширины
            const scaleY = canvas.height / rect.height; // Соотношение высоты

            const x = (event.clientX - rect.left) * scaleX; // Преобразование координат X
            const y = (event.clientY - rect.top) * scaleY;  // Преобразование координат Y

            return { x, y };
        }

        // Функция для анимации уменьшения кнопки при клике
        function animateClick() {
            buttonWidth *= 0.95; // Уменьшаем кнопку на 5%
            buttonHeight *= 0.95;
            buttonX = canvas.width / 2 - buttonWidth / 2;
            buttonY = canvas.height / 2 - buttonHeight / 2;
            drawButton();

            setTimeout(() => {
                buttonWidth /= 0.95;
                buttonHeight /= 0.95;
                buttonX = canvas.width / 2 - buttonWidth / 2;
                buttonY = canvas.height / 2 - buttonHeight / 2;
                drawButton();
            }, 100);
        }

        // Обработчик кликов на Canvas
        canvas.addEventListener('click', function(event) {
            if (gameActive) {
                const { x, y } = getMousePos(canvas, event);

                // Проверяем, попал ли клик по кнопке (по изображению)
                if (x >= buttonX && x <= buttonX + buttonWidth && y >= buttonY && y <= buttonY + buttonHeight) {
                    clickCount++;
                    document.getElementById('all-score').textContent = 'Clicks: ' + clickCount;
                    animateClick(); // Запускаем анимацию уменьшения при клике
                }
            }
        });

        const allScoreDisplay = document.getElementById('all-score');
        const timeDisplay = document.getElementById('time');
        const finalScreen = document.getElementById('finalScreen');
        const finalAllScore = document.getElementById('final-all-score');

        function startGame() {
            gameActive = true;
            clickCount = 0;
            timeLeft = 15;
            allScoreDisplay.textContent = 'Clicks: 0';
            timeDisplay.textContent = 'Time: 15s';
            finalScreen.style.display = 'none';

            let timer = setInterval(() => {
                timeLeft--;
                timeDisplay.textContent = 'Time: ' + timeLeft + 's';
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    endGame();
                }
            }, 1000);
        }

        function endGame() {
            gameActive = false;
            finalScreen.style.display = 'flex';
            finalAllScore.textContent = clickCount*100000;
            final_score = clickCount*100000;
        }

        function restartGame() {
            finalScreen.style.display = 'none';
            startGame();
        }

        // Запуск игры
        startGame();
    }

    game();

    function end() {
        const newImageUrl = $('#egg-url').data('url');
        const updatedScore = Number($('.score-res').text()) + final_score;
        $('.score-res').html(`
            ${updatedScore} 
            <img src="${newImageUrl}" alt="Egg Image" class="coin-icon">
        `);
        $('#gameStyles').remove();
        $('.game_show').html('').hide();
        $('.games_page, .footer').fadeIn(100);
    }

    // Добавляем обработчик для кнопки "OK"
    document.querySelector("#end").addEventListener('touchstart', end);
}

document.querySelector(".tap_egg").addEventListener('touchstart', taps);
