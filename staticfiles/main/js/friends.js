function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed"; // Избегаем скролла экрана
    textArea.style.opacity = "0"; // Делаем невидимым
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand("copy");
        var msg = successful ? "successful" : "unsuccessful";
        console.log("Fallback: Copying text command was " + msg);
    } catch (err) {
        console.error("Fallback: Oops, unable to copy", err);
    }

    document.body.removeChild(textArea);
}

function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function () {
        console.log("Async: Copying to clipboard was successful!");
    }, function (err) {
        console.error("Async: Could not copy text: ", err);
    });
}

function enableTextareaCopy() {
    const textareaToCopy = document.getElementById("textareaToCopy");
    
    // Показываем textarea
    textareaToCopy.style.display = "block";

    // Добавляем обработчик на событие клика
    textareaToCopy.addEventListener("click", function () {
        textareaToCopy.select(); // Выделяем текст

        // Пытаемся выполнить копирование
        try {
            const successful = document.execCommand("copy");
            const msg = successful ? "Текст скопирован в буфер обмена!" : "Не удалось скопировать текст.";
            console.log(msg);
            
            // Уведомляем пользователя
            $('.copy-link').html(msg).show();
            
            // Через 2 секунды скрываем уведомление
            setTimeout(() => {
                $('.copy-link').fadeOut();
            }, 2000);
        } catch (err) {
            console.error("Ошибка при копировании текста:", err);
        }
    });
}
  
  
  

function tg_ref() {
    let id = $('#telegram-id').text();
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText('https://t.me/hugo_balls_bot?start=ref_tg'+id).then(function() {
            $('.copy-link').html('Текст скопирован в буфер обмена!');
            $('.copy-link').show();

// Через 2 секунды скрываем элемент
setTimeout(function() {
    $('.copy-link').fadeOut();
}, 2000); // 2000 миллисекунд = 2 секунды
        }).catch(function(err) {
            $('.copy-link').html(`Нажмите на ссылку, чтобы она скопировалась
                <textarea id="textareaToCopy" style = 'display: none;'>https://t.me/hugo_balls_bot?start=ref_tg${id}</textarea>
                 `);
                 enableTextareaCopy();
            $('.copy-link').show();
            const textareaToCopy = document.getElementById("textareaToCopy");

    // Привязываем события для копирования текста
    textareaToCopy.onclick = function () {
        copyTextToClipboard(text);
        textareaToCopy.focus(); // Возвращаем фокус
    };

    textareaToCopy.onblur = function () {
        copyTextToClipboard(text);
    };

    // Автоматически копируем текст при отображении (если нужно)
    copyTextToClipboard(text);

// Через 2 секунды скрываем элемент
setTimeout(function() {
    $('.copy-link').fadeOut();
}, 7000); // 2000 миллисекунд = 2 секунды
        });
    }
    
};



function o_ref() {
    let id = $('#telegram-id').text();
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText('https://t.me/hugo_balls_bot?start=ref_o'+id).then(function() {
            $('.copy-link').html('Текст скопирован в буфер обмена!');
            $('.copy-link').show();

// Через 2 секунды скрываем элемент
setTimeout(function() {
    $('.copy-link').fadeOut();
}, 2000); // 2000 миллисекунд = 2 секунды
        }).catch(function(err) {
            $('.copy-link').html(`Нажмите на ссылку, чтобы она скопировалась
                <textarea id="textareaToCopy" style = 'display: none;'>https://t.me/hugo_balls_bot?start=ref_o${id}</textarea>
                 `);
                 enableTextareaCopy();
            $('.copy-link').show();
            const textareaToCopy = document.getElementById("textareaToCopy");

    // Привязываем события для копирования текста
    textareaToCopy.onclick = function () {
        copyTextToClipboard(text);
        textareaToCopy.focus(); // Возвращаем фокус
    };

    textareaToCopy.onblur = function () {
        copyTextToClipboard(text);
    };

    // Автоматически копируем текст при отображении (если нужно)
    copyTextToClipboard(text);

// Через 2 секунды скрываем элемент
setTimeout(function() {
    $('.copy-link').fadeOut();
}, 7000); // 2000 миллисекунд = 2 секунды
        });
    }
    
};
document.querySelector('#tg-ref').addEventListener('touchstart', tg_ref);
document.querySelector('#o-ref').addEventListener('touchstart', o_ref);

function addFriendItem(name, eggsAmount) {
    // Находим контейнер списка друзей
    const friendsList = document.querySelector('.friends_list');
    
    // Создаем новый div с классом friend_item
    const friendItem = document.createElement('div');
    friendItem.classList.add('friend_item');
    
    // Создаем span для имени друга
    const nameSpan = document.createElement('span');
    nameSpan.textContent = `${name}`;
    
    // Создаем span для количества яиц
    const eggsSpan = document.createElement('span');
    eggsSpan.textContent = `${eggsAmount}`;
    
    // Добавляем оба span в friend_item
    friendItem.appendChild(nameSpan);
    friendItem.appendChild(eggsSpan);
    
    // Добавляем новый friend_item в friends_list
    friendsList.appendChild(friendItem);
}

function load_friends() {
    const friend_data = $('#friends').text(); // Используем const, так как friend_data не изменяется
    const jsonString = friend_data.replace(/'/g, '"');
    const dataArray = JSON.parse(jsonString);
    console.log(dataArray);
    let total = 0;

    dataArray.forEach(item => {
        const [id, name, platform] = item; // Оставляем const для item
        let gain = ''; // Используем let, так как значение gain изменяется

        if (platform === 'tg') {
            gain = '20k🥚';
        } else {
            gain = '15PNS';
        }

        addFriendItem(name, gain);
        total ++;
    });
    $('#friends_count').text('👤 ' + total )
}

load_friends()

function load_case(){
    const use_case = $('#use_case').text();
    gase = Number(use_case)
    let img = $('#bonus-url').data('url');

    switch (gase) {
    case 0:
        break;
    case 1:
        $('.popup').html(`
            <div class="popup-content">
                <button class="popup-close-btn" id="popup-close-btn">&times;</button>
                <img src="${img}" alt="Coin bag" class="popup-coin-bag">
                <h2 class="popup-title">Вы получили бонус</h2>
                <p class="popup-text">Поздравляю с получением бонуса, 20K</p>
                <button class="popup-shop-btn" id="popup-energy">OK</button>
            </div>
        `);
        $('.popup').show();
        break;
    case 2:
        $('.popup').html(`
            <div class="popup-content">
                <button class="popup-close-btn" id="popup-close-btn">&times;</button>
                <img src="${img}" alt="Coin bag" class="popup-coin-bag">
                <h2 class="popup-title">Вы получили бонус</h2>
                <p class="popup-text">Поздравляю с получением бонуса, 20K</p>
                <button class="popup-shop-btn" id="popup-energy">OK</button>
            </div>
        `);
        $('.popup').show();
        break;
    case 3:
        $('.popup').html(`
            <div class="popup-content">
                <button class="popup-close-btn" id="popup-close-btn">&times;</button>
                <img src="${img}" alt="Coin bag" class="popup-coin-bag">
                <h2 class="popup-title">Вы получили бонус</h2>
                <p class="popup-text">Поздравляю с получением бонуса, 15 PNS</p>
                <button class="popup-shop-btn" id="popup-energy">OK</button>
            </div>
        `);
        $('.popup').show();
        break;
    case 4:
        $('.popup').html(`
            <div class="popup-content">
                <button class="popup-close-btn" id="popup-close-btn">&times;</button>
                <img src="${img}" alt="Coin bag" class="popup-coin-bag">
                <h2 class="popup-title">Вы получили бонус</h2>
                <p class="popup-text">Поздравляю с получением бонуса, 15 PNS</p>
                <button class="popup-shop-btn" id="popup-energy">OK</button>
            </div>
        `);
        $('.popup').show();
        break;
}
}
    

load_case()