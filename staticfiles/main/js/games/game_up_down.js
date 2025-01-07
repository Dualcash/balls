function disable_All() {
    $('.container, .games_page, .friends_page, .cards_page, .tasks_page, .footer').hide();
}

function game1_touch() { 
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
    let edges = $('#white-egg-url').data('url');
    let back = $('#back-game-url').data('url');
    currentEnergy--; // Уменьшаем на 1
    let newEnergyText = `${currentEnergy}/${maxEnergy}`;
    energyElement.textContent = newEnergyText;
    disable_All();
    $('.game_show').html(`
        <div></div>
        <canvas id="gameCanvas"></canvas>
        <div id="score" style = 'block'>
            Score: 0
        </div>
        <div id="timeLeft">Time left: 15</div>
        <div id="gameOverScreen">
    <br>
    Game over!<br>
    You scored: <span id="finalScore">0</span><img src=${edges} alt="Final Score Image" style="width: 50px; height: 50px;">
    <br>
    <button class="end">Ок</button>
    <br>
    
        </div>
    `).show();

    $('<style>')
    .prop('type', 'text/css')
    .html(`
        #gameCanvas {
            display: block;
            background: linear-gradient(0deg, #211B1B 0%, #493E3E 48%, #1D1127 100%);
            width: 100vw; /* Полная ширина экрана */
            height: 100vh; /* Полная высота экрана */
        }
        #score, #timeLeft {
            font-family: 'Jost', sans-serif; 
            position: absolute;
            top: 10px;
            font-size: 24px;
            color: #fff;
            font-family: Arial, sans-serif;
            z-index: 1;
        }
        #score {
            font-family: 'Jost', sans-serif; 
            border: 3px solid rgba(255, 255, 255, 0.289);
            background: linear-gradient(90deg, #150E1A 0%, #373737 50%, #000000 100%);
            padding: 10px 15px;
            border-radius: 15px;
            font-size: 0.9rem;
}
        #timeLeft {
            font-family: 'Jost', sans-serif; 
            border: 3px solid rgba(255, 255, 255, 0.289);
            background: linear-gradient(90deg, #150E1A 0%, #373737 50%, #000000 100%);
            padding: 10px 15px;
            border-radius: 15px;
            font-size: 0.9rem;
            position: fixed; /* Фиксированное позиционирование */
            top: 10px; /* Отступ от верхней части экрана */
            right: 0px; /* Отступ от правой части экрана */
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
    font-size: 36px;
    padding-top: 70%;
    z-index: 2;
    font-weight: bold;
}
            #gameOverScreen img {
            position: relative;
            top:10px;
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
        #gameOverScreen button:hover {
            background-color: darkred;
        }
    `).appendTo('head');
    final_score = 0;

    function game() {
        const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");

        // Устанавливаем размеры canvas относительно экрана устройства
        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        let score = 0;
        let timeLeft = 15;
        document.getElementById("score").textContent = "Score: " + score;
        document.getElementById("timeLeft").textContent = "Time left: " + timeLeft;

        const objects = [];
        const objectSize = 50;
        let gravity = 9; // Увеличена скорость падения объектов в 1.5 раза
        let objectInterval = 133; // Увеличиваем количество объектов в 2 раза (быстрее появляются объекты)
        let lastObjectTime = Date.now();
        let gameDuration = 15000; // 15 секунд
        let gameEndTime = Date.now() + gameDuration;
        let gameActive = true;

        // Загружаем единственное изображение
        const img = new Image();
        let egg = $('#white-egg-url').data('url');
        img.src = egg; // Изображение объекта

        function randomX() {
            return Math.random() * (width - objectSize);
        }

        function createObject() {
            objects.push({
                x: randomX(),
                y: -objectSize,
                image: img // Используем одно изображение
            });
        }

        function drawObject(object) {
            ctx.drawImage(object.image, object.x, object.y, objectSize, objectSize);
        }

        function updateObjects() {
            const currentTime = Date.now();
            if (currentTime - lastObjectTime > objectInterval) {
                createObject();
                lastObjectTime = currentTime;
            }

            for (let i = 0; i < objects.length; i++) {
                objects[i].y += gravity;
                if (objects[i].y > height) {
                    objects.splice(i, 1); // Удаляем объект, если он вышел за экран
                }
            }
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);

            for (const object of objects) {
                drawObject(object);
            }

            updateObjects();

            if (Date.now() >= gameEndTime) {
                endGame();
            } else {
                if (gameActive) {
                    requestAnimationFrame(draw);
                }
            }
        }

        canvas.addEventListener("touchstart", function (event) {
            event.preventDefault(); // Предотвращаем скроллинг

            const touchX = event.touches[0].clientX;
            const touchY = event.touches[0].clientY;
            const hitboxPadding = 50;

            for (let i = 0; i < objects.length; i++) {
                const object = objects[i];
                if (
                    touchX >= object.x - hitboxPadding &&
                    touchX <= object.x + objectSize + hitboxPadding &&
                    touchY >= object.y - hitboxPadding &&
                    touchY <= object.y + objectSize + hitboxPadding
                ) {
                    objects.splice(i, 1); // Удаляем объект после клика
                    score++;
                    document.getElementById("score").textContent = "Score: " + score;
                    break;
                }
            }
        }, { passive: false });

        window.addEventListener("resize", function () {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        });

        function updateTimeLeft() {
            if (gameActive) {
                timeLeft--;
                document.getElementById("timeLeft").textContent = "Time left: " + timeLeft;
                if (timeLeft > 0) {
                    setTimeout(updateTimeLeft, 1000);
                }
            }
        }
        function roundNumber(value, decimals) {
            return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
        }

        function endGame() {
            gameActive = false;
            document.getElementById("finalScore").textContent = (roundNumber(score*20, 1));
            document.getElementById("gameOverScreen").style.display = "block";
            canvas.style.display = "none";
            final_score = (roundNumber(score*20, 2));
        }
        


        draw();
        updateTimeLeft();
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

    document.querySelector(".end").addEventListener('touchstart', end);
}

document.querySelector(".play_eggs_down").addEventListener('touchstart', game1_touch);
