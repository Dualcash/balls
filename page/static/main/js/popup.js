function open_rise_info(){
    let img = $('#popup-rise-url').data('url');
    $('.popup').html(`
        <div class="popup-content">
              <button class="popup-close-btn" id = "popup-close-btn">&times;</button>
              <img src="${img}" alt="Coin bag" class="popup-coin-bag">
              <h2 class="popup-title">Увеличьте ваши яйца</h2>
              <p class="popup-text">Перейдите в раздел «Усиления» и купите увеличение прироста, чтобы было легче открывать новые карты и покупать токены PNS. Находясь оффлайн, прибыль можно забрать , только за последний 3 часа. Чтобы получать больше прибыли , заходите в игру каждые 3 часа.</p>
              <button class="popup-shop-btn" id = 'popup-boost'>Перейти в Усиления</button>
            </div>
        `)
    $('.popup').show();

}
document.querySelector('.resource-bet').addEventListener('touchstart', function(event) {
    if (event.target.id === 'rise-popup') {
        open_rise_info();
    }
});
function close(){
    $('.popup').hide();
}
document.querySelector('.popup').addEventListener('touchstart', function(event) {
    if (event.target.id === 'popup-close-btn') {
        close();
    }
});
document.querySelector('.popup').addEventListener('touchstart', function(event) {
    if (event.target.id === 'popup-boost') {
        close();
        $('#boost-btn').trigger('touchstart');
    }
});
document.querySelector('.popup').addEventListener('touchstart', function(event) {
    if (event.target.id === 'popup-energy') {
        close();
    }
});
function open_energy_info(){
    let img = $('#energy-url').data('url');
    $('.popup').html(`
        <div class="popup-content">
              <button class="popup-close-btn" id = "popup-close-btn">&times;</button>
              <img src="${img}" alt="Coin bag" class="popup-coin-bag">
              <h2 class="popup-title">Энергия</h2>
              <p class="popup-text"> Чтобы полностью восстановить энергию, перейдите в раздел «Усиления» и приобретите «Заполнение энергии». Одна энергия востанавливается 30 минут. Количество максимальной энергии увеличивается с каждым новым уровнем. Хорошей игры!</p>
              <button class="popup-shop-btn" id = 'popup-energy'>Ок</button>
            </div>
        `)
    $('.popup').show();
};
document.querySelector('.energy').addEventListener('touchstart', open_energy_info)
