function disable_All() {
    $('.container, .games_page, .friends_page, .cards_page, .tasks_page, .footer').hide();
}

function hamster_shot() {
    if (Number($('#hero_lvl').text()) < 2) {
        $('.blocked-game').text('Игра недоступна, повысьте уровень')
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
    let edges = $('#white-egg-url').data('url');
    let back = $('#back-game-url').data('url');
    
    disable_All();
    $('.game_show').html(`
        <canvas id="gameCanvas"></canvas>
        <div id="gameOverScreen">
            <h1>Game Over</h1>
            <p id="finalScore">  <img src=${edges} alt="Final Score Image" style="width: 50px; height: 50px;  vertical-align: -0px;"></p> 
           
            <button class="end_button">Ok</button>
        </div>
    `).show();

    $('<style>')
        .prop('type', 'text/css')
        .html(`
            canvas {
                display: block;
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
    font-size: 20px;
    padding-top: 80%;
    z-index: 2;
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
            margin-top: 20px;
            }
        `).appendTo('head');

    let final_score = 0;

    function game() {
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');

        const gameOverScreen = document.getElementById('gameOverScreen');
        const finalScoreElement = document.getElementById('finalScore');
        const restartButton = document.getElementById('restartButton');

        const planeImg = new Image();
        const planeUrl = document.querySelector('#white-egg-url').dataset.url;
        planeImg.src = planeUrl;

        const obstacleImg = new Image();
        const obstackleUrl = document.querySelector('#hamster-game-url').dataset.url;
        obstacleImg.src = obstackleUrl;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let planeY = canvas.height - 100;
        const planeWidth = 50;
        const planeHeight = 50;
        let planeX = (canvas.width / 2) - (planeWidth / 2);
        let bullets = [];
        let obstacles = [];
        let score = 0;
        let lives = 2;
        let gameInterval, bulletInterval, obstacleInterval;
        let timeLeft = 15;
        let isGameOver = false;

        function drawPlane() {
            ctx.drawImage(planeImg, planeX, planeY, planeWidth, planeHeight);
        }

        function createBullet() {
            if (!isGameOver) {
                bullets.push({ x: planeX + planeWidth / 2 - 5, y: planeY, width: 10, height: 20 });
            }
        }

        function drawBullets() {
            ctx.fillStyle = 'red';
            bullets.forEach((bullet, index) => {
                bullet.y -= 5;
                ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
                if (bullet.y < 0) {
                    bullets.splice(index, 1);
                }
            });
        }

        function createObstacles() {
            const numberOfObstacles = 9;
            for (let i = 0; i < numberOfObstacles; i++) {
                let obstacle = {
                    x: Math.random() * (canvas.width - 50 * 1.5), // Ограничиваем спавн, чтобы объект не выходил за правую границу
                    y: -Math.random() * canvas.height,
                    width: 50 * 1.5,
                    height: 50 * 1.5,
                };
                obstacles.push(obstacle);
            }
        }

        function drawObstacles() {
            obstacles.forEach((obstacle, index) => {
                obstacle.y += 4;
                ctx.drawImage(obstacleImg, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
                if (obstacle.y > canvas.height) {
                    obstacles.splice(index, 1);
                    loseLife();
                }
            });
        }

        function loseLife() {
            lives--;
            if (lives <= 0) {
                isGameOver = true;
            }
        }

        function checkCollisions() {
            bullets.forEach((bullet, bIndex) => {
                obstacles.forEach((obstacle, oIndex) => {
                    if (
                        bullet.x < obstacle.x + obstacle.width &&
                        bullet.x + bullet.width > obstacle.x &&
                        bullet.y < obstacle.y + obstacle.height &&
                        bullet.y + bullet.height > obstacle.y
                    ) {
                        bullets.splice(bIndex, 1);
                        obstacles.splice(oIndex, 1);
                        score++;
                    }
                });
            });
        }

        function drawScoreAndTime() {
            ctx.fillStyle = 'white';
            ctx.font = '20px Arial';
            ctx.fillText('Score: ' + score, 10, 20);
            ctx.fillText('❤️: ' + lives, 10, 50);
            ctx.fillText('Time: ' + timeLeft, canvas.width - 100, 20);
        }

        function showGameOverScreen() {
            gameOverScreen.style.display = 'block';
            finalScoreElement.innerHTML = `Your scored: ${score*100}  <img src=${edges} style="width: 40px; height: 40px; vertical-align: -8px;"></img>`;
            final_score = score*100;
        }

        function drawBackground() {
            let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#211B1B');
            gradient.addColorStop(0.48, '#493E3E');
            gradient.addColorStop(1, '#1D1127');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        function gameLoop() {
            if (isGameOver) {
                showGameOverScreen();
                clearInterval(gameInterval);
                clearInterval(bulletInterval);
                clearInterval(obstacleInterval);
                return;
            }
            drawBackground();
            drawPlane();
            drawBullets();
            drawObstacles();
            checkCollisions();
            drawScoreAndTime();
        }

        canvas.addEventListener('touchstart', (event) => {
            const touch = event.touches[0];
            const newX = touch.clientX - planeWidth / 2;
            if (newX > 0 && newX < canvas.width - planeWidth) {
                planeX = newX;
            }
        });

        canvas.addEventListener('touchmove', (event) => {
            const touch = event.touches[0];
            const newX = touch.clientX - planeWidth / 2;
            if (newX > 0 && newX < canvas.width - planeWidth) {
                planeX = newX;
            }
            event.preventDefault();
        });

        function startTimer() {
            const timerInterval = setInterval(() => {
                timeLeft--;
                if (timeLeft <= 0 || isGameOver) {
                    isGameOver = true;
                    clearInterval(timerInterval);
                }
            }, 1000);
        }

        function startGame() {
            gameInterval = setInterval(gameLoop, 1000 / 60);
            bulletInterval = setInterval(createBullet, 200);
            obstacleInterval = setInterval(createObstacles, 2000);
            startTimer();
        }
        startGame();
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
        $('<style>')
        .prop('type', 'text/css')
        .html(`
        `);
        $('.game_show').html('');
        $('.game_show').hide();
        $('.games_page, .footer').fadeIn(100);
    }
        
    

    document.querySelector(".end_button").addEventListener('touchstart', end);

}

document.querySelector(".hamster_shoot").addEventListener('touchstart', hamster_shot);
