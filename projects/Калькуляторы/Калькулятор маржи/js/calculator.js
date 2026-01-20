/**
 * Калькулятор маржи букмекера
 * Рассчитывает маржу для 2 или 3 исходов с цветовой индикацией
 */

(function() {
    'use strict';

    let currentOutcomes = 2;

    // Элементы DOM
    const outcomeButtons = document.querySelectorAll('.outcome-btn');
    const coeff1Input = document.getElementById('coeff1');
    const coeff2Input = document.getElementById('coeff2');
    const coeff3Input = document.getElementById('coeff3');
    const coeff3Group = document.getElementById('coeff3-group');
    const marginValue = document.getElementById('margin-value');
    const marginDisplay = document.querySelector('.margin-display');

    // Преобразование строки с запятой в число
    function parseDecimalNumber(value) {
        if (!value) return 0;
        return parseFloat(value.replace(',', '.'));
    }

    // Форматирование числа для отображения
    function formatNumber(number) {
        return number.toFixed(2).replace('.', ',');
    }

    // Расчет маржи
    function calculateMargin() {
        try {
            const coeff1 = parseDecimalNumber(coeff1Input.value);
            const coeff2 = parseDecimalNumber(coeff2Input.value);
            const coeff3 = currentOutcomes === 3 ? parseDecimalNumber(coeff3Input.value) : 0;

            // Проверяем валидность коэффициентов
            if (coeff1 < 1.01 || coeff2 < 1.01) {
                resetMargin();
                return;
            }

            if (currentOutcomes === 3 && coeff3 < 1.01) {
                resetMargin();
                return;
            }

            // Рассчитываем маржу
            let margin;
            if (currentOutcomes === 2) {
                margin = calculateTwoOutcomeMargin(coeff1, coeff2);
            } else {
                margin = calculateThreeOutcomeMargin(coeff1, coeff2, coeff3);
            }

            // Обновляем отображение
            updateMarginDisplay(margin);

        } catch (error) {
            console.error('Error calculating margin:', error);
            resetMargin();
        }
    }

    // Расчет маржи для 2 исходов
    function calculateTwoOutcomeMargin(coeff1, coeff2) {
        const prob1 = 1 / coeff1;
        const prob2 = 1 / coeff2;
        const totalProb = prob1 + prob2;
        
        return (totalProb - 1) * 100;
    }

    // Расчет маржи для 3 исходов
    function calculateThreeOutcomeMargin(coeff1, coeff2, coeff3) {
        const prob1 = 1 / coeff1;
        const prob2 = 1 / coeff2;
        const prob3 = 1 / coeff3;
        const totalProb = prob1 + prob2 + prob3;
        
        return (totalProb - 1) * 100;
    }

    // Обновление отображения маржи
    function updateMarginDisplay(margin) {
        // Округляем до 2 знаков после запятой и форматируем с запятой
        const roundedMargin = Math.round(margin * 100) / 100;
        marginValue.textContent = formatNumber(roundedMargin);

        // Убираем все классы цветовой индикации
        marginDisplay.classList.remove('low-margin', 'medium-margin', 'high-margin');

        // Добавляем соответствующий класс в зависимости от уровня маржи
        if (margin <= 3) {
            marginDisplay.classList.add('low-margin');
        } else if (margin <= 7) {
            marginDisplay.classList.add('medium-margin');
        } else {
            marginDisplay.classList.add('high-margin');
        }
    }

    // Сброс отображения маржи
    function resetMargin() {
        marginValue.textContent = '0,00';
        marginDisplay.classList.remove('low-margin', 'medium-margin', 'high-margin');
    }

    // Форматирование ввода
    function formatInput(input) {
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

    // Инициализация
    function init() {
        // Кнопки выбора количества исходов
        outcomeButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const button = event.target;
                const outcomes = parseInt(button.dataset.outcomes);

                // Обновляем активную кнопку
                outcomeButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-pressed', 'false');
                });
                button.classList.add('active');
                button.setAttribute('aria-pressed', 'true');

                currentOutcomes = outcomes;
                if (currentOutcomes === 2) {
                    coeff3Group.style.display = 'none';
                    coeff3Input.value = '';
                } else {
                    coeff3Group.style.display = 'block';
                }
                calculateMargin();
            });
        });

        // Обработка ввода в поля
        [coeff1Input, coeff2Input, coeff3Input].forEach(input => {
            if (input) {
                input.addEventListener('input', (e) => {
                    formatInput(e.target);
                    calculateMargin();
                });

                input.addEventListener('blur', (e) => {
                    formatInput(e.target);
                    calculateMargin();
                });
            }
        });

        // Начальный расчет
        calculateMargin();
    }

    // Инициализация после загрузки DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})(); 