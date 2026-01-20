/**
 * Калькулятор ROI
 * Рассчитывает возврат инвестиций с индикацией уровня
 */

(function() {
    'use strict';

    // Элементы DOM
    const totalStakeInput = document.getElementById('totalStake');
    const betsCountInput = document.getElementById('betsCount');
    const profitInput = document.getElementById('profit');
    const roiValue = document.getElementById('roi-value');
    const roiLevel = document.getElementById('roi-level');
    const averageStake = document.getElementById('average-stake');
    const roiLevelContainer = document.querySelector('.roi-level');

    // Преобразование строки с запятой в число
    function parseDecimalNumber(value) {
        if (!value) return 0;
        return parseFloat(value.replace(',', '.'));
    }

    // Форматирование числа для отображения
    function formatNumber(number) {
        return number.toFixed(2).replace('.', ',');
    }

    // Расчет ROI и средней ставки
    function calculateResults() {
        try {
            const totalStake = parseDecimalNumber(totalStakeInput.value);
            const betsCount = parseInt(betsCountInput.value) || 0;
            const profit = parseDecimalNumber(profitInput.value);

            // Проверяем валидность входных данных
            if (totalStake <= 0 || betsCount <= 0) {
                resetResults();
                return;
            }

            // Рассчитываем ROI
            const roi = (profit / totalStake) * 100;
            
            // Рассчитываем среднюю ставку
            const avgStake = totalStake / betsCount;

            updateResults(roi, avgStake);

        } catch (error) {
            console.error('Error calculating results:', error);
            resetResults();
        }
    }

    // Обновление результатов
    function updateResults(roi, avgStake) {
        // Обновляем ROI
        const roundedROI = Math.round(roi * 100) / 100;
        roiValue.textContent = formatNumber(roundedROI);

        // Обновляем среднюю ставку
        const roundedAvgStake = Math.round(avgStake * 100) / 100;
        averageStake.textContent = formatNumber(roundedAvgStake);

        // Убираем все классы уровней
        roiLevelContainer.classList.remove('very-low', 'low', 'reliable', 'successful');

        // Определяем уровень ROI
        let levelText;
        let levelClass;

        if (roi > 5) {
            levelText = 'Успешный';
            levelClass = 'successful';
        } else if (roi >= 3) {
            levelText = 'Надежный';
            levelClass = 'reliable';
        } else if (roi >= 1) {
            levelText = 'Низкий';
            levelClass = 'low';
        } else {
            levelText = 'Очень низкий';
            levelClass = 'very-low';
        }

        roiLevel.textContent = levelText;
        roiLevelContainer.classList.add(levelClass);
    }

    // Сброс результатов
    function resetResults() {
        roiValue.textContent = '0,00';
        roiLevel.textContent = '-';
        averageStake.textContent = '0,00';
        roiLevelContainer.classList.remove('very-low', 'low', 'reliable', 'successful');
    }

    // Форматирование ввода для десятичных чисел
    function formatDecimalInput(input) {
        let value = input.value.trim();
        
        // Если пустое значение, не форматируем
        if (!value) return;
        
        // Удаляем все символы кроме цифр, точки и запятой
        value = value.replace(/[^\d.,]/g, '');
        
        // Заменяем точку на запятую
        value = value.replace(/\./g, ',');
        
        // Оставляем только первую запятую
        const parts = value.split(',');
        if (parts.length > 2) {
            value = parts[0] + ',' + parts.slice(1).join('');
        }
        
        // Добавляем 0 перед запятой, если начинается с запятой
        if (value.startsWith(',')) {
            value = '0' + value;
        }
        
        input.value = value;
    }

    // Форматирование ввода для целых чисел
    function formatIntegerInput(input) {
        let value = input.value.trim();
        
        // Если пустое значение, не форматируем
        if (!value) return;
        
        // Оставляем только цифры
        value = value.replace(/\D/g, '');
        
        // Убираем ведущие нули
        value = value.replace(/^0+/, '') || '0';
        
        input.value = value;
    }

    // Инициализация
    function init() {
        // Обработка ввода в поля с десятичными числами
        [totalStakeInput, profitInput].forEach(input => {
            if (input) {
                input.addEventListener('input', (e) => {
                    formatDecimalInput(e.target);
                    calculateResults();
                });

                input.addEventListener('blur', (e) => {
                    formatDecimalInput(e.target);
                    calculateResults();
                });
            }
        });

        // Обработка ввода в поле с целыми числами
        if (betsCountInput) {
            betsCountInput.addEventListener('input', (e) => {
                formatIntegerInput(e.target);
                calculateResults();
            });

            betsCountInput.addEventListener('blur', (e) => {
                formatIntegerInput(e.target);
                calculateResults();
            });
        }

        // Начальный расчет
        calculateResults();
    }

    // Инициализация после загрузки DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})(); 