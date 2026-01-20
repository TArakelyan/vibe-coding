/**
 * Калькулятор экспресса
 * Рассчитывает общий коэффициент, выигрыш и прибыль для экспресс-ставки
 */

document.addEventListener('DOMContentLoaded', () => {
    const stakeInput = document.getElementById('stake');
    const oddsInput = document.getElementById('odds');
    const eventsCountInput = document.getElementById('events-count');
    const totalOddsElement = document.getElementById('total-odds');
    const totalWinElement = document.getElementById('total-win');
    const netProfitElement = document.getElementById('net-profit');

    // Функция форматирования чисел
    const formatNumber = (number) => {
        return new Intl.NumberFormat('ru-RU', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 0
        }).format(number);
    };

    // Функция парсинга коэффициентов из строки
    const parseOdds = (oddsString) => {
        if (!oddsString || oddsString.trim() === '') return [];
        
        return oddsString
            .trim()
            .split(/\s+/) // Разделяем по пробелам
            .map(odds => parseFloat(odds.replace(',', '.'))) // Поддержка запятой и точки
            .filter(odds => !isNaN(odds) && odds > 0); // Только валидные положительные числа
    };

    // Функция расчета
    const calculate = () => {
        const stake = parseFloat(stakeInput.value.replace(',', '.')) || 0;
        const eventsCount = parseInt(eventsCountInput.value) || 0;
        const oddsString = oddsInput.value;
        const oddsArray = parseOdds(oddsString);

        // Сброс результатов по умолчанию
        totalOddsElement.textContent = '0';
        totalWinElement.textContent = '0';
        netProfitElement.textContent = '0';
        netProfitElement.parentElement.classList.remove('profit', 'loss');

        // Валидация входных данных
        if (!stake || stake <= 0) {
            return;
        }

        if (!eventsCount || eventsCount < 2) {
            return;
        }

        if (oddsArray.length === 0) {
            return;
        }

        // Проверка соответствия количества коэффициентов количеству событий
        if (oddsArray.length !== eventsCount) {
            // Показываем предупреждение
            totalOddsElement.textContent = `Ошибка: введено ${oddsArray.length} коэф., а должно быть ${eventsCount}`;
            return;
        }

        // Вычисляем общий коэффициент (произведение всех коэффициентов)
        const totalOdds = oddsArray.reduce((product, odds) => product * odds, 1);
        
        // Вычисляем выигрыш и прибыль
        const totalWin = stake * totalOdds;
        const netProfit = totalWin - stake;

        // Отображаем результаты
        totalOddsElement.textContent = formatNumber(totalOdds);
        totalWinElement.textContent = formatNumber(totalWin);
        netProfitElement.textContent = formatNumber(netProfit);

        // Добавляем цветовую индикацию для прибыли/убытка
        if (netProfit > 0) {
            netProfitElement.classList.add('profit');
            netProfitElement.classList.remove('loss');
        } else if (netProfit < 0) {
            netProfitElement.classList.add('loss');
            netProfitElement.classList.remove('profit');
        } else {
            netProfitElement.classList.remove('profit', 'loss');
        }
    };

    // Автоматическое обновление количества событий при вводе коэффициентов
    const updateEventsCount = () => {
        const oddsArray = parseOdds(oddsInput.value);
        if (oddsArray.length > 0) {
            eventsCountInput.value = oddsArray.length;
        }
        calculate();
    };

    // Валидация ввода
    const validateInput = (input, min = 0) => {
        let value = parseFloat(input.value.replace(',', '.'));
        if (isNaN(value) || value < min) {
            input.value = '';
        }
    };

    // Валидация количества событий (минимум 2)
    const validateEventsCount = () => {
        let value = parseInt(eventsCountInput.value);
        if (isNaN(value) || value < 2) {
            eventsCountInput.value = 2;
        }
        calculate();
    };

    // Обработчики событий
    stakeInput.addEventListener('input', calculate);
    stakeInput.addEventListener('blur', () => validateInput(stakeInput, 0));

    oddsInput.addEventListener('input', updateEventsCount);

    eventsCountInput.addEventListener('input', calculate);
    eventsCountInput.addEventListener('blur', validateEventsCount);

    // Первоначальный расчет
    calculate();
}); 