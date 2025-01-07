function disable_All() {
    $('.container, .games_page, .friends_page, .cards_page, .tasks_page, .footer').hide();
}

function crosses() { 
    if (Number($('#hero_lvl').text()) < 4) {
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
        <div class="game-container">
            <div class="image-container">
                <img src="https://via.placeholder.com/150" alt="Game Image">
            </div>
            <div class="game-board">
                <div class="cell" data-index="0"></div>
                <div class="cell" data-index="1"></div>
                <div class="cell" data-index="2"></div>
                <div class="cell" data-index="3"></div>
                <div class="cell" data-index="4"></div>
                <div class="cell" data-index="5"></div>
                <div class="cell" data-index="6"></div>
                <div class="cell" data-index="7"></div>
                <div class="cell" data-index="8"></div>
            </div>
        </div>

        <div class="final-screen" id="final-screen">
            <br>
                Game over!<br>
            <div id="final-message"></div>
            <div>
            <button id="end-btn">OK</button></div>
        </div>
    `).show();

    // Добавляем CSS для стилизации игры
    $('<style>')
    .prop('type', 'text/css')
    .html(`
        .game-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh; /* Центрируем по вертикали */
          margin-top: -100px; /* Двигаем весь контейнер вниз */
}


        .game-board {
            display: grid;
            grid-template-columns: repeat(3, 100px);
            grid-template-rows: repeat(3, 100px);
            gap: 10px;
            margin-top: 20px;
        }
            

        .cell {
            width: 100px;
            height: 100px;
            background-color: #fff;
            border: 2px solid #000;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 2.5rem;
            cursor: pointer;
            user-select: none;
            color: black;
        }

        .final-screen {
    font-family: 'Jost', sans-serif; 
    background: url(${back}) center/cover no-repeat, linear-gradient(90deg, #150E1A 0%, #373737 50%, #000000 100%);
    background-size: cover;
    padding: 10px 15px;
    display: none; /* Изначально скрываем */
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    color: black;
    text-align: center;
    font-size: 26px;
    z-index: 2;
    font-weight: bold;
}
    #final-message {
    margin-bottom: 40px; /* Увеличивает отступ снизу */
}


.final-screen button {
    font-size: 24px;
    background-color: red;
    color: black;
    border: none;
    padding: 15px 30px;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 20px;
}

        .image-container img {
            width: 150px;
            height: 150px;
            display: block;
            margin: 0 auto;
        }
    `).appendTo('head');

    // Инициализация игры после отрисовки DOM
    setTimeout(() => {
        game(); // Запуск игры после того, как DOM готов
    }, 100);

    function game() {
        const board = document.querySelectorAll('.cell');
        const finalScreen = document.getElementById('final-screen');
        const finalMessage = document.getElementById('final-message');
        var imageUrl = $('#capybar-url').data('url');
        $('.image-container img').attr('src', imageUrl);
    
        let gameBoard = ['', '', '', '', '', '', '', '', ''];
        let currentPlayer = 'X';
        let isGameOver = false;
    
        const winCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
    
        function checkWinner() {
            for (let combo of winCombinations) {
                const [a, b, c] = combo;
                if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                    isGameOver = true;
                    if (gameBoard[a] = 'X'){
                        setTimeout(() => showFinalScreen(`You scored: 10000`), 500);
                        return;
                    }
                    else {
                        setTimeout(() => showFinalScreen(`You scored: 0`), 500);
                        return;
                    }
                }
            }
            if (!gameBoard.includes('')) {
                isGameOver = true;
                setTimeout(() => showFinalScreen('It\'s a draw!'), 500);
            }
        }
    
        function aiMove() {
            if (isGameOver || currentPlayer !== 'O') return;
            
            let availableCells = gameBoard.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
            if (availableCells.length > 0) {
                let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
                gameBoard[randomIndex] = 'O';
                board[randomIndex].textContent = 'O';
                checkWinner();
                if (!isGameOver) {
                    currentPlayer = 'X'; // Смена хода к игроку
                }
            }
        }
    
        function handleMove(index) {
            if (gameBoard[index] === '' && !isGameOver && currentPlayer === 'X') {
                gameBoard[index] = 'X';
                board[index].textContent = 'X';
                checkWinner();
                if (!isGameOver) {
                    currentPlayer = 'O'; // Смена хода к компьютеру
                    setTimeout(aiMove, 500);
                }
            }
        }
    
        function showFinalScreen(message) {
            let edges = $('#white-egg-url').data('url');
            finalMessage.innerHTML = `${message}<img src=${edges} style="width: 40px; height: 40px; vertical-align: -10px;"></img>`;
            finalScreen.style.display = 'flex';
        }
    
        board.forEach((cell, index) => {
            cell.addEventListener('click', () => handleMove(index));
            cell.addEventListener('touchstart', () => handleMove(index));
        });
    }
    

    // Функция завершения игры
    function end() {
        // Проверяем, кто победил
        const finalMessage = $('#final-message').text();
    
        // Если побеждает X, начисляем очки
        if (finalMessage.includes('You scored: 10000')) {
            var newImageUrl = $('#egg-url').data('url');
            var updatedScore = Number($('.score-res').text()) + 10000;
            $('.score-res').html(`
                ${updatedScore} 
                <img src="${newImageUrl}" alt="Egg Image" class="coin-icon">
            `);
        }
    
        // Удаляем стили игры и скрываем игровое поле
        $('#gameStyles').remove();
        $('.game_show').html('');
        $('.game_show').hide();
        $('.games_page, .footer').fadeIn(100);
    }

    // Назначаем обработчики на кнопку перезапуска
    document.querySelector("#end-btn").addEventListener('click', end);
    document.querySelector("#end-btn").addEventListener('touchstart', end);
}

// Назначаем обработчик на кнопку начала игры
document.querySelector(".crosses").addEventListener('click', crosses);
document.querySelector(".crosses").addEventListener('touchstart', crosses);
