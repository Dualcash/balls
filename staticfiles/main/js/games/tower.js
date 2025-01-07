function disable_All() {
    $('.container, .games_page, .friends_page, .cards_page, .tasks_page, .footer').hide();
}

function tower() {
    if (Number($('#hero_lvl').text()) < 6) {
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
    disable_All();
    $('.game_show').html(`
        <div id="score-all">Score: 0</div>
        <canvas id="gameCanvas"></canvas>
        <div id="game-over">
            <div id="final-score"> Score: 0</div>
            <button id="end-game-button">Ok</button>
        </div>
    `).show();

    $('<style>')
        .prop('type', 'text/css')
        .html(`
        canvas {
            display: block;
            width: 100vw;
            height: 100vh;
            background-color: #f0f0f0;
        }

        #score-all {
            font-family: 'Jost', sans-serif;
            border: 3px solid rgba(255, 255, 255, 0.289);
            background: linear-gradient(90deg, #150E1A 0%, #373737 50%, #000000 100%);
            padding: 10px 15px;
            border-radius: 15px;
            font-size: 0.9rem;
            color: white;
            position: fixed;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
        }

        #game-over {
            text-align: center;
            display: none;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: url(${back}) center/cover no-repeat, linear-gradient(90deg, #150E1A 0%, #373737 50%, #000000 100%);
            z-index: 10;
            font-weight: bold;
        }

        #final-score {
            font-size: 24px;
            font-family: 'Jost', sans-serif;
            margin-bottom: 20px;
            color: black;
        }

        #end-game-button {
            font-size: 24px;
            background-color: red;
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        #end-game-button:hover {
            background-color: darkred;
        }
        `).appendTo('head');
        function game() {
            const canvas = document.getElementById("gameCanvas");
            const ctx = canvas.getContext("2d");
            const scoreElement = document.getElementById("score-all");
            const gameOverElement = document.getElementById("game-over");
            const finalScoreElement = document.getElementById("final-score");
        
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        
            let stack = [];
            let speed = 2;
            let blockSize = canvas.width * 0.5;
            let direction = 1;
            let gameRunning = true;
            let blockHeight = 20;
            let tilesPlaced = 0;
        
            // Загружаем фоновое изображение
            let backgroundImage = new Image();
            var fonImageUrl = $('#impery-url').data('url');
            backgroundImage.src = fonImageUrl; // Укажите ссылку на ваше изображение
        
            // Add initial platform
            stack.push({ x: canvas.width / 2 - blockSize / 2, y: canvas.height - blockHeight, width: blockSize });
        
            // Add first moving block
            stack.push({ x: 0, y: canvas.height - blockHeight * 2, width: blockSize });
        
            // Game loop
            function gameLoop() {
                if (gameRunning) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
        
                    // Рисуем фон
                    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        
                    // Draw the stack
                    stack.forEach(block => {
                        ctx.fillStyle = "#3498db";
                        ctx.fillRect(block.x, block.y, block.width, blockHeight);
                    });
        
                    // Move the current block
                    let currentBlock = stack[stack.length - 1];
                    currentBlock.x += direction * speed;
                    if (currentBlock.x + currentBlock.width > canvas.width || currentBlock.x < 0) {
                        direction *= -1; // Change direction when block hits the edge
                    }
        
                    requestAnimationFrame(gameLoop);
                }
            }
        
            // Handle the block stacking
            canvas.addEventListener("touchstart", handleStacking); // Only for mobile devices
        
            function handleStacking() {
                if (gameRunning) {
                    let previousBlock = stack[stack.length - 2];
                    let currentBlock = stack[stack.length - 1];
        
                    // Check how much of the current block aligns with the previous block
                    let difference = currentBlock.x - previousBlock.x;
                    if (Math.abs(difference) < currentBlock.width) {
                        let newWidth = currentBlock.width - Math.abs(difference);
                        if (newWidth > 0) {
                            currentBlock.width = newWidth;
                            currentBlock.x = difference > 0 ? currentBlock.x : previousBlock.x;
        
                            // Add a new block
                            let newBlock = {
                                x: 0,
                                y: currentBlock.y - blockHeight,
                                width: currentBlock.width
                            };
                            stack.push(newBlock);
        
                            // Update the score and speed
                            tilesPlaced++;
                            speed *= 1.02; // Increase speed by 2%
                            scoreElement.textContent = `Score: ${tilesPlaced}`;
        
                            // Check if the tower has reached the top of the screen
                            if (newBlock.y < 0) {
                                endGame();
                            }
                        } else {
                            endGame();
                        }
                    } else {
                        endGame();
                    }
                }
            }
        
            function endGame() {
                gameRunning = false; // Останавливаем игру
                let edges = $('#white-egg-url').data('url');
                finalScoreElement.innerHTML = `<br> 
            Game Over!
            </br> You scored: ${tilesPlaced*2000} <img src=${edges} style="width: 40px; height: 40px; vertical-align: -10px;"></img>`;
                gameOverElement.style.display = 'flex'; // Показываем финальный экран с выравниванием
                addEndButtonHandler(tilesPlaced); // Добавляем обработчик на кнопку "Ок"
            }
        
            // Start the game loop
            backgroundImage.onload = gameLoop; // Ждём загрузки изображения перед стартом игры
        }
        
        // Обработчик кнопки "Ок" на финальном экране
        function addEndButtonHandler(final_score) {
            $('#end-game-button').on('touchstart', function () {
                var newImageUrl = $('#egg-url').data('url');
                var updatedScore = Number($('.score-res').text()) + final_score*2000;
                $('.score-res').html(`
                    ${updatedScore} 
                    <img src="${newImageUrl}" alt="Egg Image" class="coin-icon">
                `);
                $('#gameStyles').remove(); // Удаляем стили игры
                $('.game_show').html(''); // Очищаем игровое поле
                $('.game_show').hide(); // Прячем игровое поле
                $('.games_page, .footer').fadeIn(100); // Показываем другие страницы
            });
        }

    // Запуск самой игры
    game();
}



// Привязка обработчика события к кнопке
document.querySelector(".tower-built").addEventListener('touchstart', tower);
