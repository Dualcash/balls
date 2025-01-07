function disable_All() {
    $('.container, .games_page, .friends_page, .cards_page, .tasks_page, .footer').hide();
}

function disable_All() {
    $('.container, .games_page, .friends_page, .cards_page, .tasks_page, .footer').hide();
}

function flappy() { 
    function roundNumber(value, decimals) {
        return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    }
    if (Number($('#hero_lvl').text()) < 3) {
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
    if (currentEnergy == 0) {
        $('.blocked-game').text('Недостаточно энергии⚡')
        $('.blocked-game').fadeIn(300, function() {
            // Скрываем блок через 2 секунды
            setTimeout(function() {
                $('.blocked-game').fadeOut(300);
            }, 2000);
        });
        return; // Выход из функции, если энергия 0
    }
    currentEnergy--; // Уменьшаем на 1
    let newEnergyText = `${currentEnergy}/${maxEnergy}`;
    energyElement.textContent = newEnergyText;
    let back = $('#back-game-url').data('url');
    disable_All();

    $('.game_show').html(`
        <canvas id="gameCanvas"></canvas>
        <div id="gameOverScreen">
            <p>Game Over!</p>
            <p id="scoreDisplay"></p>
            <button id="end">ОК</button>
        </div>
    `).show();

    $('<style>')
        .prop('type', 'text/css')
        .html(`
            canvas {
                display: block;
                background: linear-gradient(0deg, #211B1B 0%, #493E3E 48%, #1D1127 100%);
            }
            #gameOverScreen {
                font-family: 'Jost', sans-serif; 
                background: url(${back}) center/cover no-repeat, linear-gradient(90deg, #150E1A 0%, #373737 50%, #000000 100%);
                background-size: cover;
                padding: 10px 15px;
                display: none;
                position: absolute;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                color: black;
                text-align: center;
                font-size: 26px;
                padding-top: 85%;
                z-index: 2;
                display: none;
                font-weight: bold;
            }
            #gameOverScreen button {
                font-size: 24px;
            background-color: red;
            color: black;
            border: none;
            padding: 15px 30px;
            border-radius: 8px;
            cursor: pointer;
            margin-top: 24px;
            }
        `).appendTo('head');

    let final_score = 0;

    // Основная логика игры
    function game() {
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Загружаем свою картинку для птицы
        const birdImg = new Image();
        var birdUrl = $('#bird-url').data('url');
        birdImg.src = birdUrl; // Укажите путь к вашей картинке

        let bird = {
            x: 50,
            y: canvas.height / 2,
            width: 40, // Ширина картинки
            height: 30, // Высота картинки
            gravity: 0.6,
            lift: -10,
            velocity: 0,
            draw: function() {
                ctx.drawImage(birdImg, this.x, this.y, this.width, this.height);
            },
            update: function() {
                this.velocity += this.gravity;
                this.y += this.velocity;

                if (this.y + this.height > canvas.height) {
                    this.y = canvas.height - this.height;
                    this.velocity = 0;
                    showGameOver();
                }

                if (this.y < 0) {
                    this.y = 0;
                    this.velocity = 0;
                    showGameOver();
                }
            },
            flap: function() {
                this.velocity += this.lift;
            }
        };

        let pipes = [];
        let frame = 0;
        let pipeWidth = 50;
        let pipeGap = 300; // Увеличенный зазор

        let score = 0;
        let gameOver = false;

        function createPipe() {
            let minPipeHeight = 100;  // Минимальная высота верхней трубы
            let maxPipeHeight = canvas.height - 400; // Максимальная высота верхней трубы, чтобы оставить место для зазора и нижней трубы
            let pipeGap = 300; // Фиксированный зазор между трубами

            // Генерация высоты верхней трубы
            let topHeight = Math.random() * (maxPipeHeight - minPipeHeight) + minPipeHeight;

            // Высота нижней трубы
            let bottomHeight = canvas.height - topHeight - pipeGap;

            if (bottomHeight < minPipeHeight) {
                bottomHeight = minPipeHeight; // Убедимся, что нижняя труба имеет достаточную высоту
            }

            pipes.push({
                x: canvas.width,
                topHeight: topHeight,
                bottomHeight: bottomHeight,
                width: pipeWidth,
                passed: false
            });
        }

        function drawPipes() {
            pipes.forEach(pipe => {
                ctx.fillStyle = "green";
                // Верхняя труба
                ctx.fillRect(pipe.x, 0, pipe.width, pipe.topHeight);
                // Нижняя труба
                ctx.fillRect(pipe.x, canvas.height - pipe.bottomHeight, pipe.width, pipe.bottomHeight);
            });
        }

        function updatePipes() {
            pipes.forEach(pipe => {
                pipe.x -= 2; // Двигаем трубы влево

                // Подсчёт очков: если правая граница трубы прошла птицу и труба ещё не засчитана
                if (pipe.x + pipe.width < bird.x && !pipe.passed) {
                    score++; // Увеличиваем счёт
                    pipe.passed = true; // Отмечаем, что труба была пройдена
                }

                // Удаление труб, которые вышли за экран
                if (pipe.x + pipe.width < 0) {
                    pipes.shift();
                }
            });

            // Создание трубы каждые 120 кадров, начиная с первого цикла
            if (frame % 120 === 0 && frame > 0) {  // Начинаем создание труб только после первых 120 кадров
                createPipe();
            }
        }

        function checkCollision() {
            pipes.forEach(pipe => {
                if (bird.x + bird.width > pipe.x && bird.x < pipe.x + pipe.width) {
                    if (bird.y < pipe.topHeight || bird.y + bird.height > canvas.height - pipe.bottomHeight) {
                        showGameOver();
                    }
                }
            });
        }

        function showGameOver() {
            gameOver = true;
            document.getElementById('gameOverScreen').style.display = 'block';
            let edges = $('#white-egg-url').data('url');
            document.getElementById('scoreDisplay').innerHTML = `Your Scored: ${score*500} <img src=${edges} style="width: 40px; height: 40px; vertical-align: -10px;"></img>`;
            final_score = score*500;
        }

        function hideGameOver() {
            document.getElementById('gameOverScreen').style.display = 'none';
        }

        function resetGame() {
            pipes = [];
            bird.y = canvas.height / 2;
            bird.velocity = 0;
            score = 0;
            frame = 0;
            gameOver = false;
        }

        function restartGame() {
            hideGameOver();
            resetGame();
            gameLoop();
        }

        function gameLoop() {
            if (!gameOver) {
                ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем экран

                bird.update();
                bird.draw();

                updatePipes();
                drawPipes();

                checkCollision();

                // Отображение счёта
                ctx.fillStyle = "white";
                ctx.font = "30px Arial";
                ctx.fillText("Score: " + score, 10, 30); // Отображаем текущий счёт

                frame++;
                requestAnimationFrame(gameLoop); // Повторный вызов gameLoop
            }
        }

        // Управление касанием для мобильных устройств
        window.addEventListener('touchstart', function() {
            bird.flap();
        });

        createPipe(); // Создание первой трубы вручную
        gameLoop();
    }

    game();

    function end() {
        var newImageUrl = $('#egg-url').data('url');
        var updatedScore = Number($('.score-res').text()) + final_score;
        $('.score-res').html(`
            ${updatedScore} 
            <img src="${newImageUrl}" alt="Egg Image" class="coin-icon">
        `);
        $('#gameStyles').remove(); 
        $('.game_show').html('');
        $('.game_show').hide();
        $('.games_page, .footer').fadeIn(100);
    }

    document.querySelector("#end").addEventListener('touchstart', end);
}

document.querySelector(".flappy-tony").addEventListener('touchstart', flappy);


document.querySelector(".flappy-tony").addEventListener('touchstart', flappy);
