document.addEventListener('DOMContentLoaded', () => {
    const stakeInput = document.getElementById('stake');
    const oddsInput = document.getElementById('odds');
    const totalWinElement = document.getElementById('total-win');
    const netProfitElement = document.getElementById('net-profit');

    // Функция форматирования чисел
    const formatNumber = (number) => {
        return new Intl.NumberFormat('ru-RU', {
            maximumFractionDigits: 2,
            minimumFractionDigits: 0
        }).format(number);
    };

    // Функция расчета
    const calculate = () => {
        const stake = parseFloat(stakeInput.value) || 0;
        const odds = parseFloat(oddsInput.value) || 0;

        if (stake && odds) {
            const totalWin = stake * odds;
            const netProfit = totalWin - stake;

            totalWinElement.textContent = formatNumber(totalWin);
            netProfitElement.textContent = formatNumber(netProfit);

            // Добавляем цветовую индикацию для прибыли/убытка
            if (netProfit > 0) {
                netProfitElement.parentElement.classList.add('profit');
                netProfitElement.parentElement.classList.remove('loss');
            } else if (netProfit < 0) {
                netProfitElement.parentElement.classList.add('loss');
                netProfitElement.parentElement.classList.remove('profit');
            } else {
                netProfitElement.parentElement.classList.remove('profit', 'loss');
            }
        } else {
            totalWinElement.textContent = '0';
            netProfitElement.textContent = '0';
            netProfitElement.parentElement.classList.remove('profit', 'loss');
        }
    };

    // Обработчики событий для мгновенного расчета
    stakeInput.addEventListener('input', calculate);
    oddsInput.addEventListener('input', calculate);

    // Валидация ввода
    const validateInput = (input, min = 0) => {
        let value = parseFloat(input.value);
        if (value < min) {
            input.value = min;
        }
    };

    stakeInput.addEventListener('blur', () => validateInput(stakeInput));
    oddsInput.addEventListener('blur', () => validateInput(oddsInput, 1));
}); 