function disable_All() {
    $('.container, .games_page, .friends_page, .cards_page, .tasks_page, .footer').hide();
}

function avoid() {
    if (Number($('#hero_lvl').text()) < 9) {
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
    $('.game_show').html(`
        <div id="score">Score: 0</div>
        <div id="gameOverScreen" style="display: none;">
          <div class = 'ovvr'>Game Over!</div>
          <button id='end'>OK</button>
        </div>  

        <canvas id="gameCanvas"></canvas>
    `).show();

    $('<style>')
        .prop('type', 'text/css')
        .html(`
    canvas {
      display: block;
      width: 100vw;
      height: 100vh;
    }
    #score {
    font-family: 'Jost', sans-serif; 
            border: 3px solid rgba(255, 255, 255, 0.289);
            background: linear-gradient(90deg, #150E1A 0%, #373737 50%, #000000 100%);
            padding: 10px 15px;
            border-radius: 15px;
      position: absolute;
      top: 10px;
      left: 10px;
      font-size: 24px;
      font-family: Arial, sans-serif;
      color: white;
      
    }
    #gameOverScreen {
    font-family: 'Jost', sans-serif; 
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: url(${back}) center/cover no-repeat, linear-gradient(90deg, #150E1A 0%, #373737 50%, #000000 100%);
      color: black;
      font-size: 24px;
      text-align: center;
      padding-top: 42vh;
      font-weight: bold;
    }
    #gameOverScreen button {
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
        function game() {
            const canvas = document.getElementById('gameCanvas');
            const ctx = canvas.getContext('2d');
            const scoreElement = document.getElementById('score');
            const gameOverScreen = document.getElementById('gameOverScreen');
        
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            let final_score = 0;
        
            let player = {
                x: canvas.width / 2 - 25,
                y: canvas.height / 2 - 25,
                width: 50,
                height: 50,
                // color: 'blue' // Убираем цвет, так как будем использовать изображение
            };
        
            let obstacles = [];
            let obstacleSpeed = 4;
            let spawnInterval = 1000;
            let lastSpawnTime = Date.now();
            let score = 0;
            let gameOver = false;
        
            // Загрузка изображений
            const playerImg = new Image();
            var playetrUrl = $('#egg-url').data('url');
            playerImg.src = playetrUrl; // Замените на путь к вашему изображению персонажа
        
            const obstacleImg = new Image();
            var obsUrl = $('#eagle-url').data('url');
            obstacleImg.src = obsUrl; // Замените на путь к вашему изображению препятствия
        
            // Убедимся, что изображения загружены перед запуском игры
            let imagesLoaded = 0;
            playerImg.onload = obstacleImg.onload = () => {
                imagesLoaded++;
                if (imagesLoaded === 2) {
                    // Запуск игры после загрузки изображений
                    gameLoop();
                }
            };
        
            // Увеличение скорости препятствий на 5% каждую секунду
            setInterval(() => {
                if (!gameOver) {
                    obstacleSpeed *= 1.05;
                    spawnInterval = Math.max(200, spawnInterval * 0.95);
                }
            }, 1000);
        
            // Функция для создания препятствий
            function spawnObstacle() {
                const size = Math.random() * 30 + 20;
                const randomSide = Math.floor(Math.random() * 4);
                let x, y;
        
                if (randomSide === 0) { // сверху
                    x = Math.random() * canvas.width;
                    y = -size;
                } else if (randomSide === 1) { // снизу
                    x = Math.random() * canvas.width;
                    y = canvas.height + size;
                } else if (randomSide === 2) { // слева
                    x = -size;
                    y = Math.random() * canvas.height;
                } else { // справа
                    x = canvas.width + size;
                    y = Math.random() * canvas.height;
                }
        
                const angle = Math.atan2(player.y - y, player.x - x);
                const velocity = {
                    x: Math.cos(angle) * obstacleSpeed,
                    y: Math.sin(angle) * obstacleSpeed
                };
        
                obstacles.push({ x, y, size, velocity });
            }
        
            // Движение игрока
            function movePlayer(event) {
                const touch = event.touches[0];
                player.x = touch.clientX - player.width / 2;
                player.y = touch.clientY - player.height / 2;
            }
        
            // Обновление состояния игры
            function update() {
                const currentTime = Date.now();
        
                // Спавн препятствий
                if (currentTime - lastSpawnTime > spawnInterval) {
                    spawnObstacle();
                    lastSpawnTime = currentTime;
                }
        
                // Обновление препятствий
                obstacles.forEach((obstacle, index) => {
                    obstacle.x += obstacle.velocity.x;
                    obstacle.y += obstacle.velocity.y;
        
                    // Удаление препятствий за границами экрана
                    if (
                        obstacle.x < -obstacle.size ||
                        obstacle.x > canvas.width + obstacle.size ||
                        obstacle.y < -obstacle.size ||
                        obstacle.y > canvas.height + obstacle.size
                    ) {
                        obstacles.splice(index, 1);
                        score++;
                        scoreElement.textContent = `Score: ${score}`;
                    }
        
                    // Проверка на столкновение
                    if (
                        obstacle.x < player.x + player.width &&
                        obstacle.x + obstacle.size > player.x &&
                        obstacle.y < player.y + player.height &&
                        obstacle.y + obstacle.size > player.y
                    ) {
                        endGame();
                    }
                });
            }
        
            // Отрисовка объектов
            function draw() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
        
                // Рисование игрока с использованием изображения
                ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
        
                // Рисование препятствий с использованием изображений
                obstacles.forEach(obstacle => {
                    ctx.drawImage(obstacleImg, obstacle.x - obstacle.size, obstacle.y - obstacle.size, obstacle.size * 2, obstacle.size * 2);
                    // Размер препятствия умножен на 2 для симметрии, если нужно другое масштабирование, измените по необходимости
                });
            }
        
            // Завершение игры
            function endGame() {
                gameOver = true;
                final_score = score*75000;
                let edges = $('#white-egg-url').data('url');
                $('.ovvr').html(`<br> 
            Game Over!
            </br>You scored: ${score*75000} <img src=${edges} style="width: 40px; height: 40px; vertical-align: -8px;"></img>`)
                gameOverScreen.style.display = 'block';
                canvas.removeEventListener('touchmove', movePlayer);
            }
        
        
            // Обработчик кнопки "OK" на экране Game Over
            function end() {
                const newImageUrl = $('#egg-url').data('url'); // Убедитесь, что у вас есть элемент с id 'egg-url' и data-url
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
        
            // Основной цикл игры
            function gameLoop() {
                if (!gameOver) {
                    update();
                    draw();
                    requestAnimationFrame(gameLoop);
                }
            }
        
            // Добавляем обработчик для касания
            canvas.addEventListener('touchmove', movePlayer);
        
        
            // Если изображения уже загружены, запускаем игру
            if (imagesLoaded === 2) {
                gameLoop();
            }
        }

    game();
}



document.querySelector(".avoid").addEventListener('touchstart', avoid);
