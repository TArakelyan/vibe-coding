// Основной скрипт крутилки букмекеров
document.addEventListener('DOMContentLoaded', function() {
    const itemsContainer = document.getElementById('itemsContainer');
    const spinButton = document.getElementById('spinButton');
    const winOverlay = document.getElementById('winOverlay');
    const winSubtitle = document.getElementById('winSubtitle');
    const claimButton = document.getElementById('claimButton');
    
    let currentIndex = 0;
    let isAnimating = false;
    const itemHeight = 42;
    let selectedItem = null;
    
    // Создаем много копий для бесконечной прокрутки (20 копий)
    const displayItems = [];
    for (let i = 0; i < 20; i++) {
        displayItems.push(...bonusItems);
    }
    
    // Инициализация элементов
    function initItems() {
        displayItems.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'bonus-item';
            itemDiv.dataset.index = index;
            
            itemDiv.innerHTML = `
                <div class="logo-box">
                    <img src="${item.logo}" alt="${item.text}">
                </div>
                <p class="bonus-text">${item.text}</p>
                <p class="bonus-amount">${item.bonus}</p>
            `;
            
            itemsContainer.appendChild(itemDiv);
        });
        
        // Устанавливаем начальную позицию (центрируем на середине списка)
        currentIndex = bonusItems.length * 10; // Начинаем с середины
        updatePosition(false);
        // НЕ вызываем updateCenterItem() - элемент не выделяется до первой прокрутки
    }
    
    // Обновление позиции контейнера
    function updatePosition(animate = true) {
        if (animate) {
            itemsContainer.classList.add('animating');
        } else {
            itemsContainer.classList.remove('animating');
        }
        
        const offset = currentIndex * itemHeight;
        itemsContainer.style.transform = `translateY(-${offset}px)`;
        
        // Проверяем границы и незаметно сбрасываем позицию
        if (currentIndex >= bonusItems.length * 17) {
            // Слишком далеко вперед - телепортируемся назад
            setTimeout(() => {
                itemsContainer.style.transition = 'none';
                currentIndex = currentIndex - (bonusItems.length * 10);
                const newOffset = currentIndex * itemHeight;
                itemsContainer.style.transform = `translateY(-${newOffset}px)`;
            }, 20);
        } else if (currentIndex <= bonusItems.length * 3) {
            // Слишком далеко назад - телепортируемся вперед
            setTimeout(() => {
                itemsContainer.style.transition = 'none';
                currentIndex = currentIndex + (bonusItems.length * 10);
                const newOffset = currentIndex * itemHeight;
                itemsContainer.style.transform = `translateY(-${newOffset}px)`;
            }, 20);
        }
    }
    
    // Обновление центрального элемента
    function updateCenterItem() {
        const allItems = document.querySelectorAll('.bonus-item');
        
        allItems.forEach((item, index) => {
            if (index === currentIndex && !isAnimating) {
                item.classList.add('center');
            } else {
                item.classList.remove('center');
            }
        });
    }
    
    // Обработчик нажатия на кнопку - запуск крутилки
    function handleSpin() {
        if (isAnimating) return;
        
        isAnimating = true;
        spinButton.disabled = true;
        
        // Выбираем случайное количество прокруток (от 25 до 45)
        const minSteps = 25;
        const maxSteps = 45;
        const steps = Math.floor(Math.random() * (maxSteps - minSteps + 1)) + minSteps;
        
        // Финальная позиция
        const finalIndex = currentIndex + steps;
        
        // Запускаем непрерывную анимацию
        const totalDuration = 4000; // 4 секунды
        const startTime = Date.now();
        const startIndex = currentIndex;
        
        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / totalDuration, 1);
            
            // Easing функция - быстро вначале, медленно в конце
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            // Вычисляем текущую позицию
            const currentPosition = startIndex + (easeOut * steps);
            currentIndex = Math.floor(currentPosition);
            
            // Плавно перемещаем контейнер
            const offset = currentPosition * itemHeight;
            itemsContainer.style.transform = `translateY(-${offset}px)`;
            itemsContainer.style.transition = 'none';
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Анимация завершена
                currentIndex = finalIndex;
                
                // Финальная позиция с плавной остановкой
                itemsContainer.style.transition = 'transform 300ms ease-out';
                const finalOffset = finalIndex * itemHeight;
                itemsContainer.style.transform = `translateY(-${finalOffset}px)`;
                
                setTimeout(() => {
                    isAnimating = false;
                    spinButton.disabled = false;
                    updateCenterItem();
                    
                    // Показываем экран победы
                    showWinScreen();
                }, 300);
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // Показать экран победы
    function showWinScreen() {
        const itemIndex = currentIndex % bonusItems.length;
        selectedItem = bonusItems[itemIndex];
        
        winSubtitle.textContent = `+ ${selectedItem.bonus} от ${selectedItem.text}`;
        
        setTimeout(() => {
            winOverlay.classList.add('show');
        }, 300);
    }
    
    // Обработчик кнопки "Забрать бонус"
    claimButton.addEventListener('click', function() {
        if (selectedItem) {
            window.open(selectedItem.link, '_blank');
            
            // Скрываем overlay
            setTimeout(() => {
                winOverlay.classList.remove('show');
                selectedItem = null;
            }, 300);
        }
    });
    
    // Обработчик кнопки прокрутки
    spinButton.addEventListener('click', handleSpin);
    
    // Инициализация
    initItems();
    
    console.log('Крутилка букмекеров загружена!');
});
