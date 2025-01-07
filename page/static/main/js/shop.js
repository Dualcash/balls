$('#hundred-pns').on('touchstart', function() {
    let score = Number($('.score-res').text());
    if (score >= 100000) {
        var newImageUrl = $('#egg-url').data('url');
        $('.score-res').html(`
            ${score - 100000} 
            <img src="${newImageUrl}" alt="Egg Image" class="coin-icon">
        `);
        let pns = Number($('.pns-scores').text());
        pns += 100;
        $('.pns-scores').text(pns);
    } else {
        $('.tasks_page_hide').html('Не куплено, не хватает денег');
        $('.tasks_page_hide').fadeIn(300, function() {
            // Скрываем блок через 2 секунды
            setTimeout(function() {
                $('.tasks_page_hide').fadeOut(300);
            }, 2000);
        });
    }
    $('#pns_amm').text($('.pns-scores').text());
});
$('#k-pns').on('touchstart', function() {
    let score = Number($('.score-res').text());
    if (score >= 900000) {
        var newImageUrl = $('#egg-url').data('url');
        $('.score-res').html(`
            ${score - 900000} 
            <img src="${newImageUrl}" alt="Egg Image" class="coin-icon">
        `);
        let pns = Number($('.pns-scores').text());
        pns += 1000;
        $('.pns-scores').text(pns);
    } else {
        $('.tasks_page_hide').html('Не куплено, не хватает денег');
        $('.tasks_page_hide').fadeIn(300, function() {
            // Скрываем блок через 2 секунды
            setTimeout(function() {
                $('.tasks_page_hide').fadeOut(300);
            }, 2000);
        });
    }
    $('#pns_amm').text($('.pns-scores').text());
});
$('#ten-k-pns').on('touchstart', function() {
    let score = Number($('.score-res').text());
    if (score >= 8000000) {
        var newImageUrl = $('#egg-url').data('url');
        $('.score-res').html(`
            ${score - 8000000} 
            <img src="${newImageUrl}" alt="Egg Image" class="coin-icon">
        `);
        let pns = Number($('.pns-scores').text());
        pns += 10000;
        $('.pns-scores').text(pns);
    } else {
        $('.tasks_page_hide').html('Не куплено, не хватает денег');
        $('.tasks_page_hide').fadeIn(300, function() {
            // Скрываем блок через 2 секунды
            setTimeout(function() {
                $('.tasks_page_hide').fadeOut(300);
            }, 2000);
        });
    }
    $('#pns_amm').text($('.pns-scores').text());
});

function check_links(){
    let link_data = $('#user_urls').text();
    let str = link_data.replace(/'/g, '"');
    let dictionary = JSON.parse(str);
    if (dictionary.TT == 1){
        $('#tt-prize').show();
    }
    if (dictionary.TG == 1){
        $('#tg-prize').show();
    }
    if (dictionary.INST == 1){
        $('#inst-prize').show();
    }
    if (dictionary.YouTube == 1){
        $('#yt-prize').show();
    }
    if (dictionary.TG == 2){
        let img =  $('#tg-img-url').data('url');
        $('#telegram-url').html(`
            <div class="item-get-prize" id = 'tg-prize' style = 'display: none;'>  Получено</div>
            <div class="shop-item-info">
                <h3>Получено</h3>
                <img src="${img}" alt="100 PNS coins">
                <div class="currency-icon">Telegram</div>
            </div>
            `)
        }
    if (dictionary.TT == 2){
        let img =  $('#tt-img-url').data('url');
        $('#tt-url').html(`
        <div class="item-get-prize" id = 'tt-prize' style = 'display: none;'>Получено</div>
            <div class="shop-item-info">
                <h3>Получено</h3>
                <img src="${img}" alt="1000 PNS coins">
                <div class="currency-icon">Tik Tok</div>
            </div>
            `);
    }
    if (dictionary.INST == 2){
        let img =  $('#inst-img-url').data('url');
        $('#inst-url').html(`
        <div class="item-get-prize" id = 'inst-prize' style = 'display: none;'>Получено</div>
            <div class="shop-item-info">
                <h3>Получено</h3>
                <img src="${img}" alt="1000 PNS coins">
                <div class="currency-icon">Tik Tok</div>
            </div>
            `)
    }
    if (dictionary.YouTube == 2){
        $('#yt-prize').show();
        let img =  $('#YT-img-url').data('url');
        $('#youtube-url').html(`
        <div class="item-get-prize" id = 'tt-prize' style = 'display: none;'>Получено</div>
            <div class="shop-item-info">
                <h3>Получено</h3>
                <img src="${img}" alt="1000 PNS coins">
                <div class="currency-icon">Instagram</div>
            </div>
            `);
    }

}

check_links();

$('#telegram-url').on('touchstart', function() {
    let link_data = $('#user_urls').text();
    console.log(link_data); // Проверьте, что это корректный JSON
    let str = link_data.replace(/'/g, '"');
    let dictionary = JSON.parse(str);
    if (dictionary.TG == 2) {
        window.open("https://t.me/hugo_balls_channel", "_blank");
        window.location.href = "https://t.me/hugo_balls_channel";
    }   
    if (dictionary.TG == 1) {
        let img =  $('#tg-img-url').data('url');
        $('#telegram-url').html(`
            <div class="item-get-prize" id = 'tg-prize' style = 'display: none;'>  50 PNS</div>
            <div class="shop-item-info">
                <h3>Получено</h3>
                <img src="${img}" alt="100 PNS coins">
                <div class="currency-icon">Telegram</div>
            </div>
            `);
            let pns = Number($('.pns-scores').text());
            pns += 50;
            $('.pns-scores').text(pns);
            $('#pns_amm').text(pns);
            dictionary.TG = 2;
            $('#user_urls').text(JSON.stringify(dictionary));
    }
     

    if (dictionary.TG == 0) {
        dictionary.TG = 1;
        console.log(dictionary);

        let tasksElement = document.querySelector('.tasks');
        if (tasksElement) {
            tasksElement.dispatchEvent(new Event('touchstart'));
        }

        $('#user_urls').text(JSON.stringify(dictionary));

        setTimeout(function() {
            window.open("https://t.me/hugo_balls_channel", "_blank");
            window.location.href = "https://t.me/hugo_balls_channel";
        }, 1000);
    }
    
    

});
$('#tt-url').on('touchstart', function() {
    let link_data = $('#user_urls').text();
    console.log(link_data); // Проверьте, что это корректный JSON
    let str = link_data.replace(/'/g, '"');
    let dictionary = JSON.parse(str);
    if (dictionary.TT == 2) {
        window.open("https://www.tiktok.com/@hugo_balls_bot?_t=8rCLtxb10bP&_r=1", "_blank");
        window.location.href = "https://www.tiktok.com/@hugo_balls_bot?_t=8rCLtxb10bP&_r=1";
    }   
    if (dictionary.TT == 1) {
        let img =  $('#tt-img-url').data('url');
        $('#tt-url').html(`
        <div class="item-get-prize" id = 'tt-prize' style = 'display: none;'>Получено</div>
            <div class="shop-item-info">
                <h3>Получено</h3>
                <img src="${img}" alt="1000 PNS coins">
                <div class="currency-icon">Tik Tok</div>
            </div>
            `)
            let pns = Number($('.pns-scores').text());
            pns += 75;
            $('.pns-scores').text(pns);
            $('#pns_amm').text(pns);
            dictionary.TT = 2;
            $('#user_urls').text(JSON.stringify(dictionary));
    }

    if (dictionary.TT == 0) {
        dictionary.TT = 1;
        console.log(dictionary);

        

        $('#user_urls').text(JSON.stringify(dictionary));

        let tasksElement = document.querySelector('.tasks');
        if (tasksElement) {
            tasksElement.dispatchEvent(new Event('touchstart'));
        }


        setTimeout(function() {
            window.open("https://www.tiktok.com/@hugo_balls_bot?_t=8rCLtxb10bP&_r=1", "_blank");
            window.location.href = "https://www.tiktok.com/@hugo_balls_bot?_t=8rCLtxb10bP&_r=1";
        }, 2000);
    }
    ы

    
});
$('#inst-url').on('touchstart', function() {
    let link_data = $('#user_urls').text();
    console.log(link_data); // Проверьте, что это корректный JSON
    let str = link_data.replace(/'/g, '"');
    let dictionary = JSON.parse(str);
    if (dictionary.INST == 2) {
        window.open("https://www.instagram.com/hugo_balls_bot/profilecard/?igsh=ZGkydWhjMmszbHZ6", "_blank");
        window.location.href = "https://www.instagram.com/hugo_balls_bot/profilecard/?igsh=ZGkydWhjMmszbHZ6";
    }
    if (dictionary.INST == 1) {
        
        let img =  $('#inst-img-url').data('url');
        $('#inst-url').html(`
        <div class="item-get-prize" id = 'tt-prize' style = 'display: none;'>Получено</div>
            <div class="shop-item-info">
                <h3>Получено</h3>
                <img src="${img}" alt="1000 PNS coins">
                <div class="currency-icon">Instagram</div>
            </div>
            `);
            let pns = Number($('.pns-scores').text());
            pns += 100;
            $('.pns-scores').text(pns);
            $('#pns_amm').text(pns);
            dictionary.INST = 2;
            $('#user_urls').text(JSON.stringify(dictionary));
            

    }

    if (dictionary.INST == 0) {
        dictionary.INST = 1;
        console.log(dictionary);

        let tasksElement = document.querySelector('.tasks');
        if (tasksElement) {
            tasksElement.dispatchEvent(new Event('touchstart'));
        }

        $('#user_urls').text(JSON.stringify(dictionary));

        setTimeout(function() {
            window.open("https://www.instagram.com/hugo_balls_bot/profilecard/?igsh=ZGkydWhjMmszbHZ6", "_blank");
            window.location.href = "https://www.instagram.com/hugo_balls_bot/profilecard/?igsh=ZGkydWhjMmszbHZ6";
        }, 1000);
    }
    let tasksElement = document.querySelector('.tasks');
        if (tasksElement) {
            tasksElement.dispatchEvent(new Event('touchstart'));
        }
    
});

$('#youtube-url').on('touchstart', function() {
    let link_data = $('#user_urls').text();
    console.log(link_data); // Проверьте, что это корректный JSON
    let str = link_data.replace(/'/g, '"');
    let dictionary = JSON.parse(str);
    if (dictionary.YouTube == 2) {
        window.open("https://www.youtube.com/@HUGOBALLSBOT", "_blank");
        window.location.href = "https://www.youtube.com/@HUGOBALLSBOT";
    }
    if (dictionary.YouTube == 1) {
        
        let img =  $('#YT-img-url').data('url');
        $('#youtube-url').html(`
        <div class="item-get-prize" id = 'tt-prize' style = 'display: none;'>Получено</div>
            <div class="shop-item-info">
                <h3>Получено</h3>
                <img src="${img}" alt="1000 PNS coins">
                <div class="currency-icon">Instagram</div>
            </div>
            `);
            let pns = Number($('.pns-scores').text());
            pns += 125;
            $('.pns-scores').text(pns);
            $('#pns_amm').text(pns);
            dictionary.YouTube = 2;
            $('#user_urls').text(JSON.stringify(dictionary));
            

    }

    if (dictionary.YouTube == 0) {
        dictionary.YouTube = 1;
        console.log(dictionary);

        let tasksElement = document.querySelector('.tasks');
        if (tasksElement) {
            tasksElement.dispatchEvent(new Event('touchstart'));
        }

        $('#user_urls').text(JSON.stringify(dictionary));

        setTimeout(function() {
            window.open("https://www.youtube.com/@HUGOBALLSBOT", "_blank");
            window.location.href = "https://www.youtube.com/@HUGOBALLSBOT";
        }, 1000);
    }
    let tasksElement = document.querySelector('.tasks');
        if (tasksElement) {
            tasksElement.dispatchEvent(new Event('touchstart'));
        }
    
});
$('.balance-info-button').on('touchstart', function() {
    $('.tasks_page_hide').html('Токен PNS - это монета , которая в дальнейшем будет листиться на биржу. Приобретайте монеты путем покупки в магазине или прохождение активностей. Удачи большие яица!');
    $('.tasks_page_hide').toggle();
    
    });






