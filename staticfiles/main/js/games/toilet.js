function disable_All() {
    $('.container, .games_page, .friends_page, .cards_page, .tasks_page, .footer').hide();
}

function toilet() {
    if (Number($('#hero_lvl').text()) < 2) {
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
    let edges = $('#white-egg-url').data('url');
    let back = $('#back-game-url').data('url');
    disable_All();
    $('.game_show').html(`
        <canvas id="gameCanvas"></canvas>
        <div id="game-over">
            <h1>Game Over</h1>
            <p id="final-score"></p>
            <button id="end">Ok</button>
        </div>
        <div id="score">Score: 0</div>
        <div id="time">Time: 15</div>
    `).show();

    $('<style>')
        .prop('type', 'text/css')
        .html(`
        canvas {
            display: block;
            background-color: #add8e6;
        }
        #game-over {
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
    display: none;
    font-weight: bold;
        }
        #end{
            font-size: 24px;
            background-color: red;
            color: black;
            border: none;
            padding: 15px 30px;
            border-radius: 8px;
            cursor: pointer;
            margin-top: 20px;
        }
        #score, #time {
            font-family: 'Jost', sans-serif; 
            border: 3px solid rgba(255, 255, 255, 0.289);
            background: linear-gradient(90deg, #150E1A 0%, #373737 50%, #000000 100%);
            padding: 10px 15px;
            border-radius: 15px;
            font-size: 0.9rem;
            position: fixed; /* Фиксированное позиционирование */
        }
        #score {
            top: 10px;
            left: 10px;
        }
        #time {
            top: 10px;
            right: 10px;
        }
        `).appendTo('head');

    let final_score = 0;

    function game() {
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const basketImg = new Image();
        var toiletUrl = $('#toilet-url').data('url');
        basketImg.src = toiletUrl;

        const eggImg = new Image();
        var hamsterUrl = $('#hamster-game-url').data('url');
        eggImg.src = hamsterUrl;

        let eggs = [];
        let basket = { x: canvas.width / 2 - 30, y: canvas.height - 100, width: 60, height: 50 };
        let score = 0;
        let gameDuration = 15000; // 15 seconds
        let gameOver = false;
        let timeLeft = 15; // In seconds
        let timeInterval;

        function startGame() {
            document.getElementById('game-over').style.display = 'none';
            document.getElementById('score').innerText = 'Score: 0';
            document.getElementById('time').innerText = 'Time: 15';
            eggs = [];
            score = 0;
            timeLeft = 15;
            gameOver = false;
            gameLoop();
            setTimeout(endGame, gameDuration);
            timeInterval = setInterval(updateTime, 1000);
        }

        function updateTime() {
            timeLeft--;
            document.getElementById('time').innerText = 'Time: ' + timeLeft;
        }

        function endGame() {
            clearInterval(timeInterval);
            gameOver = true;
            final_score = score*100;
            let edges = $('#white-egg-url').data('url');
            document.getElementById('final-score').innerHTML = `Your scored: ${score*100} <img src=${edges} style="width: 40px; height: 40px; vertical-align: -10px;"></img>`;
            $('#game-over').show();
        }

        function gameLoop() {
            if (gameOver) return;

            // Clear only the part where eggs are moving
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw basket without clearing the whole canvas
            ctx.drawImage(basketImg, basket.x, basket.y, basket.width, basket.height);

            // Handle egg falling
            eggs.forEach((egg, index) => {
                egg.y += egg.speed;
                ctx.drawImage(eggImg, egg.x, egg.y, 30, 40);

                // Check if egg is caught
                if (
                    egg.y + 40 > basket.y &&
                    egg.x > basket.x &&
                    egg.x < basket.x + basket.width
                ) {
                    score++;
                    document.getElementById('score').innerText = 'Score: ' + score;
                    // Уменьшение прозрачности для плавного исчезновения
                    eggs.splice(index, 1); // Удаление яйца
                }

                // Remove egg if it falls off the screen
                if (egg.y > canvas.height) {
                    eggs.splice(index, 1);
                }
            });

            // Generate new eggs
            if (Math.random() < 0.05) {
                eggs.push({ x: Math.random() * canvas.width, y: 0, speed: 2 + Math.random() * 3 });
            }

            // Move basket on touch
            canvas.addEventListener('touchmove', function (event) {
                event.preventDefault();
                let touch = event.touches[0];
                basket.x = touch.clientX - basket.width / 2;
            });

            requestAnimationFrame(gameLoop);
        }

        startGame();
    }

    game();

    // Use event delegation for dynamically added buttons
    $(document).on('touchstart', '#end', function() {
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
    });
}

document.querySelector(".toilet").addEventListener('touchstart', toilet);
