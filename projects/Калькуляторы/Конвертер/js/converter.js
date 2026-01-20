/**
 * Конвертер коэффициентов между форматами
 * Поддерживает: десятичный, американский, дробный, вероятность
 */

document.addEventListener('DOMContentLoaded', () => {
    const decimalInput = document.getElementById('decimal');
    const americanInput = document.getElementById('american');
    const fractionalInput = document.getElementById('fractional');
    const probabilityInput = document.getElementById('probability');

    let isUpdating = false; // Флаг для предотвращения циклических обновлений

    // Функции конвертации из десятичного формата
    function decimalToAmerican(decimal) {
        if (!decimal || decimal < 1.01) return '';
        
        if (decimal >= 2.0) {
            return '+' + Math.round((decimal - 1) * 100);
        } else {
            return Math.round(-100 / (decimal - 1));
        }
    }

    function decimalToFractional(decimal) {
        if (!decimal || decimal < 1.01) return '';
        
        const numerator = decimal - 1;
        
        // Простые дроби
        const commonFractions = {
            0.5: '1/2', 0.33: '1/3', 0.25: '1/4', 0.2: '1/5',
            1.5: '3/2', 2: '2/1', 2.5: '5/2', 3: '3/1'
        };

        for (const [frac, display] of Object.entries(commonFractions)) {
            if (Math.abs(numerator - parseFloat(frac)) < 0.01) {
                return display;
            }
        }

        // Поиск ближайшей дроби
        for (let denominator = 2; denominator <= 20; denominator++) {
            const closestNumerator = Math.round(numerator * denominator);
            const calculatedFraction = closestNumerator / denominator;
            
            if (Math.abs(calculatedFraction - numerator) < 0.05) {
                return `${closestNumerator}/${denominator}`;
            }
        }

        const denominator = 100;
        const numeratorInt = Math.round(numerator * denominator);
        return `${numeratorInt}/${denominator}`;
    }

    function decimalToProbability(decimal) {
        if (!decimal || decimal < 1.01) return '';
        return ((1 / decimal) * 100).toFixed(2);
    }

    // Функции конвертации в десятичный формат
    function americanToDecimal(american) {
        if (!american) return null;
        
        const num = parseInt(american.replace(/[^-+\d]/g, ''));
        if (isNaN(num)) return null;

        if (num > 0) {
            return 1 + (num / 100);
        } else if (num < 0) {
            return 1 + (100 / Math.abs(num));
        }
        return null;
    }

    function fractionalToDecimal(fractional) {
        if (!fractional) return null;
        
        const parts = fractional.split('/');
        if (parts.length !== 2) return null;

        const numerator = parseFloat(parts[0]);
        const denominator = parseFloat(parts[1]);

        if (isNaN(numerator) || isNaN(denominator) || denominator === 0) return null;
        
        return 1 + (numerator / denominator);
    }

    function probabilityToDecimal(probability) {
        if (!probability || probability <= 0 || probability >= 100) return null;
        return 100 / probability;
    }

    // Функция обновления всех полей на основе десятичного коэффициента
    function updateAllFields(sourceField, decimal) {
        if (isUpdating) return;
        isUpdating = true;

        try {
            // Удаляем активные классы
            document.querySelectorAll('.input-group').forEach(group => {
                group.classList.remove('active');
            });

            // Добавляем активный класс к источнику
            sourceField.closest('.input-group').classList.add('active');

            if (decimal && decimal >= 1.01) {
                if (sourceField !== decimalInput) {
                    decimalInput.value = decimal.toFixed(2);
                }
                if (sourceField !== americanInput) {
                    americanInput.value = decimalToAmerican(decimal);
                }
                if (sourceField !== fractionalInput) {
                    fractionalInput.value = decimalToFractional(decimal);
                }
                if (sourceField !== probabilityInput) {
                    probabilityInput.value = decimalToProbability(decimal);
                }
            } else {
                // Очищаем все поля кроме источника
                if (sourceField !== decimalInput) decimalInput.value = '';
                if (sourceField !== americanInput) americanInput.value = '';
                if (sourceField !== fractionalInput) fractionalInput.value = '';
                if (sourceField !== probabilityInput) probabilityInput.value = '';
            }
        } finally {
            isUpdating = false;
        }
    }

    // Обработчики событий для каждого поля
    decimalInput.addEventListener('input', (e) => {
        // Заменяем запятую на точку
        if (e.target.value.includes(',')) {
            e.target.value = e.target.value.replace(/,/g, '.');
        }
        const decimal = parseFloat(e.target.value);
        updateAllFields(e.target, decimal);
    });

    // Дополнительная обработка для десятичного поля
    decimalInput.addEventListener('keypress', (e) => {
        if (e.key === ',') {
            e.preventDefault();
            const input = e.target;
            const start = input.selectionStart;
            const end = input.selectionEnd;
            const value = input.value;
            input.value = value.substring(0, start) + '.' + value.substring(end);
            input.setSelectionRange(start + 1, start + 1);
            input.dispatchEvent(new Event('input'));
        }
    });

    decimalInput.addEventListener('paste', (e) => {
        setTimeout(() => {
            if (e.target.value.includes(',')) {
                e.target.value = e.target.value.replace(/,/g, '.');
                e.target.dispatchEvent(new Event('input'));
            }
        }, 0);
    });

    americanInput.addEventListener('input', (e) => {
        const decimal = americanToDecimal(e.target.value);
        updateAllFields(e.target, decimal);
    });

    fractionalInput.addEventListener('input', (e) => {
        const decimal = fractionalToDecimal(e.target.value);
        updateAllFields(e.target, decimal);
    });

    probabilityInput.addEventListener('input', (e) => {
        let value = e.target.value;
        
        // Удаляем все символы кроме цифр, точки и запятой
        value = value.replace(/[^\d.,]/g, '');
        
        // Заменяем запятую на точку
        value = value.replace(/,/g, '.');
        
        // Оставляем только первую точку
        const parts = value.split('.');
        if (parts.length > 2) {
            value = parts[0] + '.' + parts.slice(1).join('');
        }
        
        // Обновляем значение поля
        e.target.value = value;
        
        // Конвертируем в десятичный формат
        const decimal = probabilityToDecimal(parseFloat(value));
        updateAllFields(e.target, decimal);
    });

    // Дополнительная обработка для поля вероятности
    probabilityInput.addEventListener('keypress', (e) => {
        if (e.key === ',') {
            e.preventDefault();
            const input = e.target;
            const start = input.selectionStart;
            const end = input.selectionEnd;
            const value = input.value;
            input.value = value.substring(0, start) + '.' + value.substring(end);
            input.setSelectionRange(start + 1, start + 1);
            input.dispatchEvent(new Event('input'));
        }
    });

    probabilityInput.addEventListener('paste', (e) => {
        setTimeout(() => {
            if (e.target.value.includes(',')) {
                e.target.value = e.target.value.replace(/,/g, '.');
                e.target.dispatchEvent(new Event('input'));
            }
        }, 0);
    });

    // Обработчики фокуса для подсветки активного поля
    [decimalInput, americanInput, fractionalInput, probabilityInput].forEach(input => {
        input.addEventListener('focus', (e) => {
            if (!isUpdating) {
                document.querySelectorAll('.input-group').forEach(group => {
                    group.classList.remove('active');
                });
                e.target.closest('.input-group').classList.add('active');
            }
        });

        input.addEventListener('blur', (e) => {
            setTimeout(() => {
                if (!document.activeElement.closest('.calculator')) {
                    document.querySelectorAll('.input-group').forEach(group => {
                        group.classList.remove('active');
                    });
                }
            }, 100);
        });
    });

    // Валидация ввода
    decimalInput.addEventListener('blur', () => {
        let value = parseFloat(decimalInput.value);
        if (value && value < 1.01) {
            decimalInput.value = '1.01';
            updateAllFields(decimalInput, 1.01);
        }
    });

    // Форматирование американских коэффициентов
    americanInput.addEventListener('blur', () => {
        const value = americanInput.value.trim();
        if (value && !value.match(/^[+-]/)) {
            const num = parseInt(value);
            if (!isNaN(num) && num > 0) {
                americanInput.value = '+' + num;
                updateAllFields(americanInput, americanToDecimal(americanInput.value));
            }
        }
    });

    // Инициализация без значений по умолчанию
}); 