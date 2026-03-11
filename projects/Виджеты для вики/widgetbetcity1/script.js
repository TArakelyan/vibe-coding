// BETCITY Widget Script
document.addEventListener('DOMContentLoaded', function() {
    console.log('BETCITY widget loaded');
    
    const reklamaDots = document.getElementById('reklamaDots');
    const advertiserInfo = document.getElementById('advertiserInfo');
    
    // Показ информации о рекламодателе при наведении и клике на три точки
    if (reklamaDots && advertiserInfo) {
        // Наведение мыши
        reklamaDots.addEventListener('mouseenter', function(e) {
            e.stopPropagation();
            advertiserInfo.classList.add('show');
        });
        
        reklamaDots.addEventListener('mouseleave', function(e) {
            e.stopPropagation();
            advertiserInfo.classList.remove('show');
        });
        
        // Клик (для мобильных устройств)
        reklamaDots.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            advertiserInfo.classList.toggle('show');
            
            // Автоматически скрыть через 3 секунды
            if (advertiserInfo.classList.contains('show')) {
                setTimeout(() => {
                    advertiserInfo.classList.remove('show');
                }, 3000);
            }
        });
    }
    
    console.log('All links point to: https://s.betcity.ru/a9x');
});
