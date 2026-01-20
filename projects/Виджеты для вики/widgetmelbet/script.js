// MelBet Widget Script
document.addEventListener('DOMContentLoaded', function() {
    console.log('MelBet widget loaded');
    
    // Массив с текстами для ротации
    const rotationTexts = [
        '🎁 ПОДАРОК: бонус при регистрации',
        '💰 Приветственный бонус до 28 000 ₽',
        '💝 Фрибет новым и активным игрокам',
        '➡️ Забирай бонусы за депозит'
    ];
    
    // Функция для случайного выбора текста
    const getRandomText = () => {
        const randomIndex = Math.floor(Math.random() * rotationTexts.length);
        return rotationTexts[randomIndex];
    };
    
    // Обновляем текст при загрузке
    const contentText = document.querySelector('.content-text');
    if (contentText) {
        contentText.textContent = getRandomText();
    }
    
    // Обработка трёх точек для показа информации о рекламодателе
    const reklamaDots = document.getElementById('reklamaDots');
    const advertiserInfo = document.getElementById('advertiserInfo');
    
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
            advertiserInfo.classList.toggle('show');
            
            // Автоматически скрыть через 3 секунды
            if (advertiserInfo.classList.contains('show')) {
                setTimeout(() => {
                    advertiserInfo.classList.remove('show');
                }, 3000);
            }
        });
        
        // Скрыть при наведении на саму плашку с информацией
        advertiserInfo.addEventListener('mouseenter', function(e) {
            e.stopPropagation();
        });
    }
    
    const widget = document.querySelector('.melbet-widget');
    const actionButton = document.querySelector('.action-button');
    
    // Клик по всему виджету
    widget.addEventListener('click', function() {
        window.open('https://spnsrd.ru/wiki/posts/melbet', '_blank');
        console.log('MelBet widget clicked - redirecting to: https://spnsrd.ru/wiki/posts/melbet');
    });
    
    // Дополнительная анимация для кнопки при клике
    actionButton.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Создаем эффект ripple
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.marginLeft = '-10px';
        ripple.style.marginTop = '-10px';
        
        // Проверяем, если position уже не установлен
        if (!actionButton.style.position || actionButton.style.position === 'static') {
            actionButton.style.position = 'relative';
        }
        actionButton.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Переход по ссылке после анимации
        setTimeout(() => {
            window.open('https://spnsrd.ru/wiki/posts/melbet', '_blank');
        }, 100);
        
        console.log('Action button clicked - redirecting to: https://spnsrd.ru/wiki/posts/melbet');
    });
    
    // Добавляем CSS для анимации ripple
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});