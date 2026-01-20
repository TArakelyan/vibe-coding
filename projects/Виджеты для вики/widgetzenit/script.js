// Зенит Widget Script
document.addEventListener('DOMContentLoaded', function() {
    console.log('Зенит widget loaded');
    
    // Массив с текстами для ротации
    const rotationTexts = [
        '💰 Повышенный бонус для старта',
        '📲 Забрать бонус при регистрации',
        '💰 БОНУС: до 31000₽ при регистрации!'
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
    
    const widget = document.querySelector('.zenit-widget');
    const actionButton = document.querySelector('.action-button');
    
    // Клик по всему виджету
    widget.addEventListener('click', function() {
        window.open('https://spnsrd.ru/wiki/posts/zenit', '_blank');
        console.log('Зенит widget clicked - redirecting to: https://spnsrd.ru/wiki/posts/zenit');
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
            window.open('https://spnsrd.ru/wiki/posts/zenit', '_blank');
        }, 100);
        
        console.log('Action button clicked - redirecting to: https://spnsrd.ru/wiki/posts/zenit');
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