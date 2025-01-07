function disable_All() {
    $('.container, .games_page, .friends_page, .cards_page, .tasks_page, .footer').hide();
}

function dot_touch() {
    if (Number($('#hero_lvl').text()) < 5) {
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
    if (currentEnergy <= 1) {
        $('.blocked-game').text('Недостаточно энергии⚡')
        $('.blocked-game').fadeIn(300, function() {
            // Скрываем блок через 2 секунды
            setTimeout(function() {
                $('.blocked-game').fadeOut(300);
            }, 2000);
        });
        return; // Выход из функции, если энергия 0
    }
    currentEnergy -= 2; // Уменьшаем на 1
    let newEnergyText = `${currentEnergy}/${maxEnergy}`;
    energyElement.textContent = newEnergyText;
    let back = $('#back-game-url').data('url');
    let edges = $('#white-egg-url').data('url');
    
    disable_All();
    
    // Вставляем HTML содержимое
    $('.game_show').html(`
        <canvas id="gameCanvas"></canvas>

        <div id="endScreen" style='display: none;'>
            <h1>Game Over!</h1>
            <p>Your scored: <span id="finalScore">0</span><img src=${edges} style="width: 40px; height: 40px; vertical-align: -10px;"></img></p>
            <button id="end_button">OK</button>
        </div>

        <div id="minusOne">-1</div>
    `).show();

    // Вставляем стили через jQuery
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            #gameCanvas {
                background: linear-gradient(0deg, #211B1B 0%, #493E3E 48%, #1D1127 100%);
            }

            #endScreen {
                font-family: 'Jost', sans-serif;
                background: url(${back}) center/cover no-repeat, linear-gradient(90deg, #150E1A 0%, #373737 50%, #000000 100%);
                padding: 10px 15px;
                position: absolute;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: center; /* Центрирование по вертикали */
                align-items: center; /* Центрирование по горизонтали */
                color: black;
                text-align: center;
                font-size: 26px;
                z-index: 2;
                font-weight: bold;
            }

            #endScreen h1 {
                font-size: 48px; /* Увеличение заголовка */
                margin-bottom: 20px; /* Отступ между заголовком и счетом */
            }

            #endScreen p {
                font-size: 24px;
                margin-bottom: 20px; /* Отступ между счетом и кнопкой */
            }

            #endScreen button {
                padding: 10px 20px;
                font-size: 18px;
                background-color: red;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }

            #minusOne {
                position: absolute;
                font-size: 48px;
                color: red;
                display: none;
            }
        `).appendTo('head');

    let final_score = 0;

    function game() {
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const endScreen = document.getElementById('endScreen');
        const finalScore = document.getElementById('finalScore');
        const minusOne = document.getElementById('minusOne');

        let score = 0;
        let timeLeft = 15000; // 15 секунд в миллисекундах
        let greenDot = {};
        let dots = [];
        const dotCount = 20;
        const dotRadius = 25;
        let startTime;
        let elapsedTime = 0;
        let greenImage, redImage;
        const borderOffset = 50; // Отступ от границ

        // Подгружаем изображения для точек
        function loadImages() {
            greenImage = new Image();
            var slothImageUrl = $('#game-sloth-url').data('url');
            greenImage.src = slothImageUrl; // Путь к изображению для зелёной точки

            redImage = new Image();
            var bananaImageUrl = $('#banana-url').data('url');
            redImage.src = bananaImageUrl; // Путь к изображению для красной точки
        }

        // Установка размеров canvas на весь экран
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        // Создание точек
        function createDots() {
            dots = [];
            for (let i = 0; i < dotCount; i++) {
                dots.push({
                    x: Math.random() * (canvas.width - 2 * dotRadius - borderOffset * 2) + dotRadius + borderOffset,
                    y: Math.random() * (canvas.height - 2 * dotRadius - borderOffset * 2) + dotRadius + borderOffset,
                    color: 'red'
                });
            }
            randomizeDotPositions();
        }

        // Расставляем точки случайным образом и делаем только одну зеленой
        function randomizeDotPositions() {
            dots.forEach(dot => {
                dot.x = Math.random() * (canvas.width - 2 * dotRadius - borderOffset * 2) + dotRadius + borderOffset;
                dot.y = Math.random() * (canvas.height - 2 * dotRadius - borderOffset * 2) + dotRadius + borderOffset;
                dot.color = 'red'; // Все точки становятся красными
            });
            greenDot = {
                x: Math.random() * (canvas.width - 2 * dotRadius - borderOffset * 2) + dotRadius + borderOffset,
                y: Math.random() * (canvas.height - 2 * dotRadius - borderOffset * 2) + dotRadius + borderOffset,
                color: 'green'
            }; // Зеленая точка с отступом от границ
        }

        // Обновление таймера
        function updateTimer(timestamp) {
            if (!startTime) startTime = timestamp;
            elapsedTime = timestamp - startTime;

            if (elapsedTime >= timeLeft) {
                endGame();
            } else {
                requestAnimationFrame(updateTimer);
            }

            draw();
        }

        // Конец игры
        function endGame() {
            $('#gameCanvas').hide();
            canvas.removeEventListener('touchstart', handleTouch);
            endScreen.style.display = 'flex';
            finalScore.textContent = score*1000;
            final_score = score*1000;
        }

        // Обработка прикосновений
        function handleTouch(e) {
            const touch = e.touches[0];
            const touchX = touch.clientX;
            const touchY = touch.clientY;

            // Проверка попадания на зелёную точку
            const distanceToGreen = Math.sqrt((touchX - greenDot.x) ** 2 + (touchY - greenDot.y) ** 2);
            if (distanceToGreen <= dotRadius) {
                score++;
                randomizeDotPositions();
            } else {
                // Проверка попадания на красную точку
                dots.forEach(dot => {
                    const distanceToRed = Math.sqrt((touchX - dot.x) ** 2 + (touchY - dot.y) ** 2);
                    if (distanceToRed <= dotRadius && dot.color === 'red') {
                        score--;
                        showMinusOne(touchX, touchY);
                    }
                });
            }
        }

        // Показать -1 при нажатии на красную точку
        function showMinusOne(x, y) {
            minusOne.style.left = `${x - 20}px`; // Корректируем позицию
            minusOne.style.top = `${y - 40}px`;
            minusOne.style.display = 'block';

            setTimeout(() => {
                minusOne.style.display = 'none';
            }, 1000); // Скрываем через 1 секунду
        }

        // Рисование точек и элементов
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Рисуем счет
            ctx.font = '24px Jost, sans-serif';
            ctx.fillStyle = 'white';
            ctx.fillText(`Score: ${score}`, 10, 30);
            ctx.fillText(`    Time: ${Math.max(Math.floor((timeLeft - elapsedTime) / 1000), 0)}`, canvas.width - 120, 30); // Округляем до целого

            // Рисуем красные точки
            dots.forEach(dot => {
                ctx.drawImage(redImage, dot.x - dotRadius, dot.y - dotRadius, dotRadius * 2, dotRadius * 2);
            });

            // Рисуем зеленую точку поверх всех остальных
            ctx.drawImage(greenImage, greenDot.x - dotRadius, greenDot.y - dotRadius, dotRadius * 2, dotRadius * 2);
        }

        // Запуск игры
        loadImages();
        resizeCanvas();
        createDots();
        canvas.addEventListener('touchstart', handleTouch);
        window.addEventListener('resize', resizeCanvas); // Меняем размер canvas при изменении окна
        requestAnimationFrame(updateTimer);
    }

    game();

    // Завершение игры
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

    document.querySelector("#end_button").addEventListener('touchstart', end);
}

// Запуск игры при нажатии на .dot_touch
document.querySelector(".dot_touch").addEventListener('touchstart', dot_touch);
