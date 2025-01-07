let data = $('.db-data').text()
console.log(data)
function loadHero(){
    let hero = $('#now_hero').text();
    switch(hero){
        case 'Hobo':
            set_hobo();
            break;
        case 'Hamster':
            set_hamster();
            break;
        case 'Tony':
            set_tony();
            break;
        case 'Capybar':
            set_capybar();
            break;
        case 'Botan':
            set_botan();
            break;
        case 'Hui':
            set_hui();
            break;
        case 'Mask':
            set_mask();
            break;
        case 'Pasha':
            set_pasha();
            break;
        case 'Tap':
            set_tap();
            break;
        case 'PNS':
            set_pns();
            break;
        default:
    }
    
}
loadHero()
function updateLockIcons() {
    document.querySelectorAll('.card-item').forEach(card => {
        const buyButton = card.querySelector('.buy-btn');
        const infoButton = card.querySelector('.info-btn');

        if (buyButton) {
            if (buyButton.textContent.trim() === "Купить") {
                infoButton.textContent = "🔒";
            } else if (buyButton.textContent.trim() === "Куплено") {
                infoButton.textContent = "!";
            }
        }
    });
}
function riseUpdate(){
    let egg = $('#white-egg-url').data('url');
    let heroUprise = Number($('#hero_uprise').text()); // Используйте .val(), если это input, или .text() для получения текста
    let noHeroUprise = Number($('#nohero_uprise').text()); // Аналогично для второго значения
    let totalUprise = heroUprise + noHeroUprise;
    if ($('#now_hero').text() == 'Hamster'){
        totalUprise += 3000;
    }
    if ($('#now_hero').text() == 'Capybar'){
        totalUprise += 5000;
    }
    if ($('#now_hero').text() == 'Tap'){
        totalUprise += 50000;
    }
    $('.resource').html(`<div class="resource">` + totalUprise + 
      ` <img src="${egg}" alt="Coins" class="coin-icon">/час</div>`);
}

let first_text =  `
    <p>Имя: Бездомный</p>
<p><strong>Возраст:</strong> 35 лет</p>
<p><strong>Происхождение:</strong> Городской район, где жизнь кипит, но не всегда радужна.</p>
<p><strong>Предыстория:</strong> В юности Бездомный мечтал стать известным, однако обстоятельства сложились так, что он оказался на улице. После серии неудачных отношений с девушками он потерял веру в себя и стал бродягой.</p>
`
let second_text = `
    <p>Имя: Хомяк</p>
<p><strong>Возраст:</strong> 14 лет</p>
<p><strong>Происхождение:</strong> Telegram</p>
<p><strong>Предыстория:</strong> Хомяк мечтал стать великим героем, которого все бы уважали и зарабатывали на его успехах. Но после выхода на биржу он прогорел, и все о нём забыли.</p>

`;
let third_text = `
    <p>Имя: BirdTony</p>
<p><strong>Возраст:</strong> 21 год</p>
<p><strong>Происхождение:</strong> BirdTony родился в небольшом, но живописном лесу, где для выживания нужно было собирать монеты.</p>
<p><strong>Предыстория:</strong> В детстве BirdTony мечтал о приключениях за пределами своего леса. Однажды он встретил старого мудрого сову, с которой подружился, но сова его обманула и забрала все его сбережения. С тех пор BirdTony ни с кем не общается и никому не доверяет.</p>

`;
let fourth_text = `
    <p>Имя: Капибарыга</p>
<p><strong>Возраст:</strong> 22 года</p>
<p><strong>Происхождение:</strong> Капибарыга родился в тропическом лесу, рядом с живописной поляной.</p>
<p><strong>Предыстория:</strong> Капибарыга часто проводил время, исследуя окрестности своей родины. Однажды во время одного из своих приключений он обнаружил таинственный артефакт — мухомор, который даровал ему уникальные способности. С того момента он распространяет таинственные артефакты среди друзей, чтобы сделать их жизнь веселее.</p>

`;
let fifth_text = `
    <p>Имя: Copygemz</p>
<p><strong>Возраст:</strong> 17 лет</p>
<p><strong>Происхождение:</strong> Copygemz родился в волшебном лесу Gemlandia, где каждое существо наделено особым даром.</p>
<p><strong>Предыстория:</strong> Однажды, во время одной из своих ленивых прогулок по виртуальным мирам, он наткнулся на древний камень Copy, который позволял ему копировать любые навыки и способности других существ. С этого момента Copygemz стал использовать свою силу, чтобы избегать работы, копируя достижения других.</p>

`;
let sixth_text = `
    <p>Имя: Meme</p>
<p><strong>Возраст:</strong> 23 года</p>
<p><strong>Происхождение:</strong> Meme вырос в Кейптауне, где информация распространяется со скоростью света.</p>
<p><strong>Предыстория:</strong> С раннего возраста он увлекался культурой мемов и стал известен в своих кругах благодаря созданию вирусных мемов. Его талант к юмору и креативности привел его к популярности, но также и к зависти со стороны местных жителей.</p>

`;
let seventh_text = `
    <p>Имя: Doge Musk</p>
<p><strong>Происхождение:</strong> Россия</p>
<p><strong>Предыстория:</strong> Его страсть к космосу и мемам привела его к созданию первых космических городов Empire, которые быстро завоевали популярность благодаря его уникальному подходу к делу и любви к dogecoin. Его dogecoin стал успешным благодаря креативности и нестандартному мышлению.</p>

`;
let eighth_text = `
    <p>Имя: Паша Pixel</p>
<p><strong>Возраст:</strong> 40 лет</p>
<p><strong>Происхождение:</strong> Паша Pixel родился в виртуальном мире, созданном для ретро-игр 80-х и 90-х годов. Он был одним из первых пиксельных персонажей, созданных разработчиками для тестирования новых игр.</p>
<p><strong>Предыстория:</strong> С самого начала Паша обладал уникальной способностью превращаться в пиксели, что позволяло ему адаптироваться к различным играм.</p>

`;
let ninth_text = `
    <p>Имя: T.A.P.S.W.A.P</p>
<p><strong>Возраст:</strong> 50⁷⁷⁷</p>
<p><strong>Происхождение:</strong> T.A.P.S.W.A.P был создан в результате совместного проекта нескольких ведущих научных организаций, стремящихся разработать идеального робота.</p>
<p><strong>Предыстория:</strong> В недалёком будущем, когда человечество столкнулось с глобальными экологическими и социальными проблемами, было создано новое поколение роботов, призванных помочь в восстановлении планеты и улучшении качества жизни. T.A.P.S.W.A.P — один из таких роботов, разработанный в рамках проекта "Эко-Ренессанс".</p>


`;
let tenth_text = `
    <p>Имя: PNS</p>
<p><strong>Возраст:</strong> 22 года</p>
<p><strong>Происхождение:</strong> PNS родился в волшебном королевстве, где все существа были наделены особыми способностями. Его создали как защитника яиц, и его основная задача заключалась в поддержании круговорота яиц между всеми живыми существами.</p>
<p><strong>Предыстория:</strong> Однажды мир оказался под угрозой: злобный колдун похитил все яйца из королевства, намереваясь использовать их силу для своих тёмных целей. PNS, полный решимости вернуть яйца и мир королевству, отправился сразиться с колдуном, что ему в итоге и удалось.</p>

`;
function level_update(){
    let current_hero = $('#now_hero').text();
    let level = 1;
    switch (current_hero) {
        case 'Hobo':
            level = 1;
            break;
        case 'Hamster':
            level = 2;
            break;
        case 'Tony':
            level = 3;
            break;
        case 'Capybar':
            level = 4;
            break;
        case 'Botan':
            level = 5;
            break;
        case 'Hui':
            level = 6;
            break;
        case 'Mask':
            level = 7;
            break;
        case 'Pasha':
            level = 8;
            break;
        case 'Tap':
            level = 9;
            break;
        case 'PNS':
            level = 10;
            break;
        default:
            level = 1; // Если герой не найден, оставить уровень 1
    }
    $('#hero_lvl').text(level);
    max_level = Number($('#max_hero_lvl').text());
    if (level> max_level){
        $('#max_hero_lvl').text(level);
    }

}
function set_hobo(){
    $('.level-info').text('Бездомный, уровень 1');
    $('#character-text').html(`
        <p>Имя: Бездомный</p>
<p><strong>Способность:</strong> нет</p>


                `);
    var newImageUrl = $('#hobo-url').data('url');
    $('#hobo-img').attr('src', newImageUrl);
    $('#energy_stat').text('5/5');
    $('#rise_stat').text('1к/час');
    $('#ability_stat').text('Без бонуса');
    $('#now_hero').text('Hobo');
    $('#hero_uprise').text('1000');
    level_update();
    riseUpdate();
}
function set_hamster(){
    $('.level-info').text('Хомяк, уровень 2');
    $('#character-text').html(`<p>Имя: Хомяк</p>
<p><strong>Способность:</strong> +3к/час к прибыли</p>
`);
    var newImageUrl = $('#hamster-url').data('url');
    $('#hobo-img').attr('src', newImageUrl);
    $('#energy_stat').text('8/8');
    $('#rise_stat').text('2500/час');
    $('#ability_stat').text('В колесе');
    $('#now_hero').text('Hamster');
    $('#hero_uprise').text('2500');
    level_update();
    riseUpdate();
}
function set_tony(){
    $('.level-info').text('BirdTony, уровень 3');
    $('#character-text').html(`<p>Имя: BirdTony</p>
<p><strong>Способность:</strong> +15к 🥚</p>
`);
    var newImageUrl = $('#tony-url').data('url');
    $('#hobo-img').attr('src', newImageUrl);
    $('#energy_stat').text('11/11');
    $('#rise_stat').text('5к/час');
    $('#ability_stat').text('Доп. яйца');
    $('#now_hero').text('Tony');
    $('#hero_uprise').text('5000');
    level_update();
    riseUpdate();
}
function set_capybar(){
    $('.level-info').text('Капибарыга, уровень 4');
    $('#character-text').html(`<p>Имя: Капибарыга</p>
<p><strong>Способность:</strong> +5к/час к прибыли</p>
`);
    var newImageUrl = $('#capybar-url').data('url');
    $('#hobo-img').attr('src', newImageUrl);
    $('#energy_stat').text('10/10');
    $('#rise_stat').text('6k/час');
    $('#ability_stat').text('Жила');
    $('#now_hero').text('Capybar');
    $('#hero_uprise').text('6000');
    level_update();
    riseUpdate();
}
function set_botan(){
    $('.level-info').text('Copygemz, уровень 5');
    $('#character-text').html(`<p>Имя: Copygemz</p>
<p><strong>Способность:</strong> +50к 🥚</p>
`);
    var newImageUrl = $('#botan-url').data('url');
    $('#hobo-img').attr('src', newImageUrl);
    $('#energy_stat').text('12/12');
    $('#rise_stat').text('7k/час ');
    $('#ability_stat').text('Куш');
    $('#now_hero').text('Botan');
    $('#hero_uprise').text('7000');
    level_update();
    riseUpdate();
}

function set_hui(){
    $('.level-info').text('Meme, уровень 6');
    $('#character-text').html(`<p>Имя: Meme</p>
<p><strong>Способность:</strong> +100к 🥚 и 500 PNS</p>
`);
    var newImageUrl = $('#hui-url').data('url');
    $('#hobo-img').attr('src', newImageUrl);
    $('#energy_stat').text('13/13');
    $('#rise_stat').text('9к/час');
    $('#ability_stat').text('Бонусиньё');
    $('#now_hero').text('Hui');
    $('#hero_uprise').text('9000');
    level_update();
    riseUpdate();
}
function set_mask(){
    $('.level-info').text('Doge Mask, уровень 7');
    $('#character-text').html(`<p>Имя: Doge Musk</p>
<p><strong>Способность:</strong> 1500 PNS</p>
`);
    var newImageUrl = $('#mask-url').data('url');
    $('#hobo-img').attr('src', newImageUrl);
    $('#energy_stat').text('15/15');
    $('#rise_stat').text('10к/час');
    $('#ability_stat').text('Престиж');
    $('#now_hero').text('Mask');
    $('#hero_uprise').text('10000');
    level_update();
    riseUpdate();
}
function set_pasha(){
    $('.level-info').text('Паша Pixel, уровень 8');
    $('#character-text').html(`<p>Имя: Паша Pixel</p>
<p><strong>Способность:</strong> 2500 PNS</p>
`);
    var newImageUrl = $('#pasha-url').data('url');
    $('#hobo-img').attr('src', newImageUrl);
    $('#energy_stat').text('20/20');
    $('#rise_stat').text('15к/час');
    $('#ability_stat').text('Эксперт');
    $('#now_hero').text('Pasha');
    $('#hero_uprise').text('15000');
    level_update();
    riseUpdate();
}
function set_tap(){
    $('.level-info').text('T.A.P.S.W.A.P, уровень 9');
    $('#character-text').html(`<p>Имя: T.A.P.S.W.A.P</p>
<p><strong>Способность:</strong> +50к/час к прибыли</p>
`);
    var newImageUrl = $('#tapswap-url').data('url');
    $('#hobo-img').attr('src', newImageUrl);
    $('#energy_stat').text('25/25');
    $('#rise_stat').text('20к/час');
    $('#ability_stat').text('Стабильный');
    $('#now_hero').text('Tap');
    $('#hero_uprise').text('20000');
    level_update();
    riseUpdate();
}

function set_pns(){
    $('.level-info').text('PNS, уровень 10');
    $('#character-text').html(`<p>Имя: PNS</p>
<p><strong>Способность:</strong> +10к PNS</p>
`);
    var newImageUrl = $('#pns-url').data('url');
    $('#hobo-img').attr('src', newImageUrl);
    $('#energy_stat').text('35/35');
    $('#rise_stat').text('100к/ час');
    $('#ability_stat').text('Гений');
    $('#now_hero').text('PNS');
    $('#hero_uprise').text('100000');
    level_update();
    riseUpdate();
}




$(document).ready(function() {
    // Получаем все кнопки с классом info-btn
    $('.info-btn').on('touchstart', function() {
        if ($(this).text() == '🔒'){
            $('.info-popup').html('Приобретите персонажа, чтобы посмотреть информацию о нем');
            $('.info-popup').show();
            return
        }
        if ($(this).attr('id') === 'first_card') {
            // Изменяем текст всплывающего блока
            $('.info-popup').html(first_text);
        }
        if ($(this).attr('id') === 'second_card') {
            // Изменяем текст всплывающего блока
            $('.info-popup').html(second_text);
        }
        if ($(this).attr('id') === 'third_card') {
            // Изменяем текст всплывающего блока
            $('.info-popup').html(third_text);
        }
        if ($(this).attr('id') === 'fourth_card') {
            // Изменяем текст всплывающего блока
            $('.info-popup').html(fourth_text);
        }
        if ($(this).attr('id') === 'fifth_card') {
            // Изменяем текст всплывающего блока
            $('.info-popup').html(fifth_text);
        }
        if ($(this).attr('id') === 'sixth_card') {
            // Изменяем текст всплывающего блока
            $('.info-popup').html(sixth_text);
        }
        if ($(this).attr('id') === 'seventh_card') {
            // Изменяем текст всплывающего блока
            $('.info-popup').html(seventh_text);
        }
        if ($(this).attr('id') === 'eighth_card') {
            // Изменяем текст всплывающего блока
            $('.info-popup').html(eighth_text);
        }
        if ($(this).attr('id') === 'ninth_card') {
            // Изменяем текст всплывающего блока
            $('.info-popup').html(ninth_text);
        }
        if ($(this).attr('id') === 'tenth_card') {
            // Изменяем текст всплывающего блока
            $('.info-popup').html(tenth_text);
        }
        // Показать всплывающий блок с анимацией
        $('.info-popup').show(); // Используем fadeIn для плавного появления
    });
//-------------------------------------------------
function addHero (name){
    let now = $('#all-heros').text();
    $('#all-heros').text(now + name);
    console.log(now + name);
}
$('.buy-btn').on('touchstart', function() {
    if ($(this).attr('id') === 'hobo-buy') {
        $('.info-popup').html('Поставлено');
        set_hobo();
    }
    
    if ($(this).attr('id') === 'hamster-buy') {
        // Преобразование текста в число
        let score = Number($('.score-res').text());
        if($(this).text() == 'Куплено'){
            $('.info-popup').html('Поставлено');
            set_hamster();
        }
        else if (score >= 10000) {
            $('.info-popup').html('Куплено');
            var newImageUrl = $('#egg-url').data('url');
            $('.score-res').html(`
                ${score-10000} 
                <img src="${newImageUrl}" alt="Egg Image" class="coin-icon">
            `);
            addHero(',Hamster');
            set_hamster();
            $(this).text('Куплено');
        } else {
            $('.info-popup').text('Не куплено, не хватает ' + (10000 - score) + ' яиц');
        }
    }
    
    if ($(this).attr('id') === 'tony-buy') {
        // Преобразование текста в число
        let score = Number($('.score-res').text());
        if($(this).text() == 'Куплено'){
            $('.info-popup').html('Поставлено');
            set_tony();
        }
        else if (score >= 30000) {
            $('.info-popup').html('Куплено');
            var newImageUrl = $('#egg-url').data('url');
            $('.score-res').html(`
                ${score- 15000} 
                <img src="${newImageUrl}" alt="Egg Image" class="coin-icon">
            `);
            addHero(',Tony');
            set_tony();
            $(this).text('Куплено');
        } else {
            console.log('das');
            $('.info-popup').text('Не куплено, не хватает ' + (30000 - score) + ' яиц');
        }
    }
    
    
    if ($(this).attr('id') === 'capybar-buy') {
        // Преобразование текста в число
        let score = Number($('.score-res').text());
        if($(this).text() == 'Куплено'){
            $('.info-popup').html('Поставлено');
            set_capybar();
        }
        else if (score >= 120000) {
            $('.info-popup').html('Куплено');
            var newImageUrl = $('#egg-url').data('url');
            $('.score-res').html(`
                ${score-120000} 
                <img src="${newImageUrl}" alt="Egg Image" class="coin-icon">
            `);
            addHero(',Capybar');
            set_capybar();
            $(this).text('Куплено');
        } else {
            console.log('das');
            $('.info-popup').text('Не куплено, не хватает ' + (120000 - score) + ' яиц');
        }
    }
    
    if ($(this).attr('id') === 'botan-buy') {
        // Преобразование текста в число
        let score = Number($('.score-res').text());
        if($(this).text() == 'Куплено'){
            $('.info-popup').html('Поставлено');
            set_botan();
        }
        else if (score >= 500000) {
            $('.info-popup').html('Куплено');
            var newImageUrl = $('#egg-url').data('url');
            $('.score-res').html(`
                ${score-450000} 
                <img src="${newImageUrl}" alt="Egg Image" class="coin-icon">
            `);
            set_botan();
            addHero(',Botan');
            $(this).text('Куплено');
        } else {
            console.log('das');
            $('.info-popup').text('Не куплено, не хватает ' + (500000 - score) + ' яиц');
        }
    }
    if ($(this).attr('id') === 'hui-buy') {
        // Преобразование текста в число
        let score = Number($('.score-res').text());
        if($(this).text() == 'Куплено'){
            $('.info-popup').html('Поставлено');
            set_hui();
        }
        else if (score >= 3000000) {
            $('.info-popup').html('Куплено');
            var newImageUrl = $('#egg-url').data('url');
            $('.score-res').html(`
                ${score-2900000} 
                <img src="${newImageUrl}" alt="Egg Image" class="coin-icon">
            `);
            let pns = Number($('#pns_amm').text());
            pns += 500;
            $('#pns_amm').text(pns);
            set_hui();
            addHero(',Hui');
            $(this).text('Куплено');
        } else {
            console.log('das');
            $('.info-popup').text('Не куплено, не хватает ' + (3000000 - score) + ' яиц');
        }
    }
    if ($(this).attr('id') === 'mask-buy') {
        // Преобразование текста в число
        let score = Number($('.score-res').text());
        if($(this).text() == 'Куплено'){
            $('.info-popup').html('Поставлено');
            set_mask();
        }
        else if (score >= 20000000) {
            $('.info-popup').html('Куплено');
            var newImageUrl = $('#egg-url').data('url');
            $('.score-res').html(`
                ${score-20000000} 
                <img src="${newImageUrl}" alt="Egg Image" class="coin-icon">
            `);
            let pns = Number($('#pns_amm').text());
            pns += 1500;
            $('#pns_amm').text(pns);
            addHero(',Mask');
            set_mask();
            $(this).text('Куплено');
        } else {
            console.log('das');
            $('.info-popup').text('Не куплено, не хватает ' + (20000000 - score) + ' яиц');
        }
    }
    if ($(this).attr('id') === 'tapswap-buy') {
        // Преобразование текста в число
        let score = Number($('.score-res').text());
        if($(this).text() == 'Куплено'){
            $('.info-popup').html('Поставлено');
            set_tap();
        }
        else if (score >= 500000000) {
            $('.info-popup').html('Куплено');
            var newImageUrl = $('#egg-url').data('url');
            $('.score-res').html(`
                ${score-500000000} 
                <img src="${newImageUrl}" alt="Egg Image" class="coin-icon">
            `);
            set_tap();
            addHero(',Tap');
            $(this).text('Куплено');
        } else {
            console.log('das');
            $('.info-popup').text('Не куплено, не хватает ' + (500000000 - score) + ' яиц');
        }
    }
    if ($(this).attr('id') === 'pasha-buy') {
        // Преобразование текста в число
        let score = Number($('.score-res').text());
        if($(this).text() == 'Куплено'){
            $('.info-popup').html('Поставлено');
            set_pasha();
        }
        else if (score >= 100000000) {
            $('.info-popup').html('Куплено');
            var newImageUrl = $('#egg-url').data('url');
            $('.score-res').html(`
                ${score-100000000} 
                <img src="${newImageUrl}" alt="Egg Image" class="coin-icon">
            `);
            let pns = Number($('#pns_amm').text());
            pns += 2500;
            $('#pns_amm').text(pns);
            addHero(',Pasha');
            set_pasha();
            $(this).text('Куплено');
        } else {
            console.log('das');
            $('.info-popup').text('Не куплено, не хватает ' + (100000000 - score) + ' яиц');
        }
    }
    if ($(this).attr('id') === 'pns-buy') {
        // Преобразование текста в число
        let score = Number($('.score-res').text());
        if($(this).text() == 'Куплено'){
            $('.info-popup').html('Поставлено');
            set_pns();
        }
        else if (score >= 1000000000) {
            $('.info-popup').html('Куплено');
            var newImageUrl = $('#egg-url').data('url');
            $('.score-res').html(`
                ${score-1000000000} 
                <img src="${newImageUrl}" alt="Egg Image" class="coin-icon">
            `);
            let pns = Number($('#pns_amm').text());
            pns += 10000;
            $('#pns_amm').text(pns);
            addHero(',PNS');
            set_pns();
            $(this).text('Куплено');
        } else {
            console.log('das');
            $('.info-popup').text('Не куплено, не хватает ' + (1000000000 - score) + ' яиц');
        }
    }
    updateLockIcons()

    // Показываем всплывающее сообщение
    $('.info-popup').show();
});


//------------------------------------------------------
    $(document).on('click touchstart', function(e) {
        if (!$(e.target).closest('.info-popup, .info-btn, .buy-btn').length) {
            $('.info-popup').hide(); 
        }
    });

});
