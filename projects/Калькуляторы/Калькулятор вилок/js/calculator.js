/**
 * Калькулятор вилок (арбитражных ставок)
 * Рассчитывает прибыль от вилок и распределение ставок
 */

// Основная функция расчета вилки
function calc() {
    console.log('calc() вызвана');
    
    var k1 = parseFloat(document.getElementById('k1').value);
    var k2 = parseFloat(document.getElementById('k2').value);  
    var k3 = parseFloat(document.getElementById('k3').value);
    var totalStake = parseFloat(document.getElementById('total-stake').value);
    
    var profitEl = document.getElementById('profit');
    var profitResult = document.querySelector('.profit-result');
    var stakesSection = document.getElementById('stakes-section');
    
    console.log('Коэффициенты:', {k1: k1, k2: k2, k3: k3, totalStake: totalStake});
    
    // Проверяем минимальные требования
    if (!k1 || !k2 || k1 < 1 || k2 < 1) {
        profitEl.textContent = '0.00';
        profitResult.classList.remove('profit', 'no-arbitrage');
        stakesSection.classList.remove('visible');
        return;
    }
    
    var profit;
    var hasK3 = k3 && k3 >= 1;
    var totalProb;
    
    // Расчет арбитража
    if (hasK3) {
        totalProb = 1/k1 + 1/k2 + 1/k3;
    } else {
        totalProb = 1/k1 + 1/k2;
    }
    
    profit = (1 - totalProb) * 100;
    
    profitEl.textContent = profit.toFixed(2);
    
    // Обновляем цвет в зависимости от наличия вилки
    profitResult.classList.remove('profit', 'no-arbitrage');
    if (profit > 0) {
        profitResult.classList.add('profit');
        console.log('Найдена вилка! Прибыль:', profit.toFixed(2) + '%');
        
        // Показываем распределение ставок
        if (totalStake && totalStake > 0) {
            calculateStakes(k1, k2, k3, totalStake, hasK3);
            stakesSection.classList.add('visible');
        } else {
            stakesSection.classList.remove('visible');
        }
    } else {
        profitResult.classList.add('no-arbitrage');
        stakesSection.classList.remove('visible');
        console.log('Вилки нет. Убыток:', Math.abs(profit).toFixed(2) + '%');
    }
}

// Расчет распределения ставок для получения равной прибыли
function calculateStakes(k1, k2, k3, totalStake, hasK3) {
    var totalProb = hasK3 ? (1/k1 + 1/k2 + 1/k3) : (1/k1 + 1/k2);
    
    var stake1 = (totalStake / k1) / totalProb;
    var stake2 = (totalStake / k2) / totalProb;
    var stake3 = hasK3 ? (totalStake / k3) / totalProb : 0;
    
    document.getElementById('stake1').textContent = Math.round(stake1) + ' ₽';
    document.getElementById('stake2').textContent = Math.round(stake2) + ' ₽';
    
    var stake3Row = document.getElementById('stake3-row');
    if (hasK3) {
        document.getElementById('stake3').textContent = Math.round(stake3) + ' ₽';
        stake3Row.style.display = 'flex';
    } else {
        stake3Row.style.display = 'none';
    }
    
    // Гарантированная прибыль
    var guaranteedProfit = totalStake - (Math.round(stake1) + Math.round(stake2) + (hasK3 ? Math.round(stake3) : 0));
    var profitPercent = (1 - (hasK3 ? (1/k1 + 1/k2 + 1/k3) : (1/k1 + 1/k2))) * 100;
    var actualProfit = totalStake * (profitPercent / 100);
    
    document.getElementById('guaranteed-profit').textContent = Math.round(actualProfit) + ' ₽';
}

// Переключение между 2 и 3 исходами
function toggleOutcomes() {
    var activeButton = document.querySelector('.outcome-btn.active');
    var outcomes = activeButton ? activeButton.dataset.outcomes : '2';
    var k3Group = document.getElementById('k3-group');
    var k3Input = document.getElementById('k3');
    
    if (outcomes === '3') {
        k3Group.style.display = 'flex';
    } else {
        k3Group.style.display = 'none';
        k3Input.value = '';
    }
    
    calc();
}

// Обработка смены количества исходов
function handleOutcomeChange(event) {
    var button = event.target;
    var outcomes = button.dataset.outcomes;

    // Обновляем активную кнопку
    var outcomeButtons = document.querySelectorAll('.outcome-btn');
    outcomeButtons.forEach(function(btn) {
        btn.classList.remove('active');
    });
    button.classList.add('active');

    // Обновляем отображение
    toggleOutcomes();
}

// Инициализация обработчиков событий
window.onload = function() {
    document.getElementById('k1').addEventListener('input', calc);
    document.getElementById('k2').addEventListener('input', calc);
    document.getElementById('k3').addEventListener('input', calc);
    document.getElementById('total-stake').addEventListener('input', calc);
    
    // Обработчики для кнопок выбора исходов
    var outcomeButtons = document.querySelectorAll('.outcome-btn');
    outcomeButtons.forEach(function(button) {
        button.addEventListener('click', handleOutcomeChange);
    });
    
    // Первоначальный расчет
    toggleOutcomes();
    calc();
}; 