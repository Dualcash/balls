function disable_All() {
    $('.container, .games_page, .friends_page, .cards_page, .tasks_page, .footer').hide();
}
function game1_touch() { 
    function roundNumber(value, decimals) {
        return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    }
    if (Number($('#hero_lvl').text()) < 7) {
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
        <canvas id="gameCanvas"></canvas>
        <div id="gameOverScreen">
            <p id="resultText">You scored: 0 points</p>
            <button id="end">Ok</button>
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
            font-weight: bold;
        }
        #gameOverScreen button {
            font-size: 24px;
            background-color: red;
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 8px;
            cursor: pointer;
            margin-top: 20px;
        }
    `).appendTo('head');
    
    final_score = 0;

    function game() {
        const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");

        const gameOverScreen = document.getElementById("gameOverScreen");
        const resultText = document.getElementById("resultText");

        // Установка размеров холста
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Свойства персонажа и полос
        const unitSize = 50;
        const characterSize = 40;

        // Изображения персонажа и препятствий
        const characterImage = new Image();
        var dogeUrl = $('#doge-url').data('url');
        const obstacleImage = new Image();
        var elonUrl = $('#elon-url').data('url');
        characterImage.src = dogeUrl;
        obstacleImage.src = elonUrl;

        const chicken = {
            x: canvas.width / 2 - characterSize / 2,
            y: canvas.height - unitSize + (unitSize - characterSize) / 2,
            width: characterSize,
            height: characterSize,
            speed: unitSize
        };

        let lanes = [];
        const laneSpeed = 2;
        const numLanes = 18;
        let timeLeft = 15;
        let score = 0;
        let gameActive = true;

        function createLane(y, hasObstacles) {
            return {
                y: y,
                speed: hasObstacles ? Math.random() * 2 + laneSpeed : 0,
                direction: hasObstacles ? (Math.random() > 0.5 ? 1 : -1) : 0,
                cars: [],
                hasObstacles: hasObstacles
            };
        }

        function initializeLanes() {
            lanes = [];
            lanes.push(createLane(canvas.height - unitSize, false));
            for (let i = 1; i < numLanes; i++) {
                lanes.push(createLane(canvas.height - (i + 1) * unitSize, i % 2 === 0));
            }
        }

        function drawChicken() {
            ctx.drawImage(characterImage, chicken.x, chicken.y, chicken.width, chicken.height);
        }

        function drawLanes() {
            lanes.forEach(lane => {
                ctx.fillStyle = lane.hasObstacles ? "grey" : "green";
                ctx.fillRect(0, lane.y, canvas.width, unitSize);
            });
        }

        function drawCars() {
            lanes.forEach(lane => {
                if (lane.hasObstacles) {
                    lane.cars.forEach(car => {
                        ctx.drawImage(obstacleImage, car.x, lane.y, unitSize, unitSize);
                    });
                }
            });
        }

        function moveCars() {
            lanes.forEach(lane => {
                if (lane.hasObstacles) {
                    lane.cars.forEach(car => {
                        car.x += lane.speed * lane.direction;
                        if (car.x > canvas.width || car.x < -unitSize) {
                            car.x = lane.direction === 1 ? -unitSize : canvas.width;
                        }
                    });
                }
            });
        }

        function update() {
            if (!gameActive) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawLanes();
            drawChicken();
            drawCars();
            moveCars();
            checkCollisions();

            drawHUD();

            if (chicken.y < canvas.height / 15) {
                shiftLanes();
            }

            requestAnimationFrame(update);
        }

        function drawHUD() {
            ctx.fillStyle = "black";
            ctx.font = "20px Arial";
            ctx.fillText("Time left: " + timeLeft + "s", 10, 30);
            ctx.fillText("Score: " + score, 10, 60);
        }

        function checkCollisions() {
            lanes.forEach(lane => {
                if (lane.hasObstacles) {
                    lane.cars.forEach(car => {
                        if (
                            chicken.x < car.x + unitSize &&
                            chicken.x + chicken.width > car.x &&
                            chicken.y < lane.y + unitSize &&
                            chicken.y + chicken.height > lane.y
                        ) {
                            endGame();
                        }
                    });
                }
            });
        }

        function endGame() {
            gameActive = false;
            let edges = $('#white-egg-url').data('url');
            resultText.innerHTML = `<br> 
            Game Over!
            </br> You scored: ${(roundNumber(score*5000, 1))} <img src=${edges} style="width: 40px; height: 40px; vertical-align: -4px;"></img>`;
            gameOverScreen.style.display = "block";
            final_score = (roundNumber(score*5000, 1));
        }

        function shiftLanes() {
            lanes.forEach(lane => {
                lane.y += unitSize;
            });

            if (chicken.y >= lanes[lanes.length - 1].y) {
                resetMap();
            } else {
                chicken.y += unitSize;
            }
        }

        function resetMap() {
            chicken.x = canvas.width / 2 - characterSize / 2;
            chicken.y = canvas.height - unitSize + (unitSize - characterSize) / 2;
            initializeLanes();
            spawnCarsForAllLanes();
        }

        function startTimer() {
            const timerInterval = setInterval(function () {
                if (!gameActive) {
                    clearInterval(timerInterval);
                    return;
                }

                timeLeft--;
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    endGame();
                }
            }, 1000);
        }

        function initializeGame() {
            gameOverScreen.style.display = "none";
            chicken.x = canvas.width / 2 - characterSize / 2;
            chicken.y = canvas.height - unitSize + (unitSize - characterSize) / 2;
            score = 0;
            timeLeft = 15;
            gameActive = true;
            initializeLanes();
            spawnCarsForAllLanes();
            startTimer();
        }

        function handleTouchStart(event) {
            if (!gameActive) return;

            score++;
            if (chicken.y > 0) {
                chicken.y -= chicken.speed;
            }
        }

        function spawnCars(lane) {
            if (lane.hasObstacles) {
                for (let i = 0; i < 8; i++) {
                    const car = {
                        x: lane.direction === 1 ? -unitSize : canvas.width - Math.random() * 300
                    };
                    lane.cars.push(car);
                }
            }
        }

        function spawnCarsForAllLanes() {
            lanes.forEach(lane => {
                spawnCars(lane);
            });
        }

        canvas.addEventListener("touchstart", handleTouchStart);

        initializeGame();
        update();
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

document.querySelector(".chicken_run").addEventListener('touchstart', game1_touch);
