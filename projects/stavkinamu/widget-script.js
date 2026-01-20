// Скрипт для виджет-версии анализатора ставок
class TeamBettingWidget {
    constructor() {
        this.init();
    }

    init() {
        this.calculateWidgetStats();
        this.bindEvents();
    }

    calculateWidgetStats() {
        // Анализируем последние 5 матчей для стратегии "поражение Факела"
        const strategy = 'lose';
        const betAmount = 1000;
        let totalProfit = 0;
        let successfulBets = 0;

        matchesData.forEach(match => {
            const betResult = this.calculateBetResult(match, strategy);
            if (betResult.won) {
                totalProfit += (betAmount * betResult.odds - betAmount);
                successfulBets++;
            } else {
                totalProfit -= betAmount;
            }
        });

        // Обновляем статистику в виджете
        this.updateWidgetStats(totalProfit, successfulBets, matchesData.length);
        
        // Обновляем коэффициент
        this.updateOdds();
    }

    calculateBetResult(match, strategy) {
        let won = false;
        let odds = 1;

        switch (strategy) {
            case 'win':
                won = match.result === 'win';
                odds = match.odds.win;
                break;
            case 'lose':
                won = match.result === 'loss';
                odds = match.odds.lose;
                break;
            case 'draw':
                won = match.result === 'draw';
                odds = match.odds.draw;
                break;
        }

        return { won, odds };
    }

    updateWidgetStats(totalProfit, successfulBets, totalMatches) {
        // Обновляем прибыль
        const profitElement = document.querySelector('.widget-stats .stat-value.positive');
        if (profitElement) {
            profitElement.textContent = `${totalProfit > 0 ? '+' : ''}${totalProfit.toLocaleString('ru-RU')} ₽`;
            profitElement.className = `stat-value ${totalProfit > 0 ? 'positive' : 'negative'}`;
        }

        // Обновляем успешность
        const successRateElement = document.querySelectorAll('.widget-stats .stat-value')[1];
        if (successRateElement) {
            const successRate = Math.round((successfulBets / totalMatches) * 100);
            successRateElement.textContent = `${successRate}% (${successfulBets} из ${totalMatches})`;
        }
    }

    updateOdds() {
        // Берем средний коэффициент на поражение из последних матчей
        const avgOdds = matchesData.reduce((sum, match) => sum + match.odds.lose, 0) / matchesData.length;
        
        const oddsElement = document.querySelector('.odds-value');
        if (oddsElement) {
            oddsElement.textContent = avgOdds.toFixed(1);
        }
    }

    bindEvents() {
        // Обработчик для кнопки "Повторить ставку"
        const repeatBetBtn = document.querySelector('.repeat-bet-btn');
        if (repeatBetBtn) {
            repeatBetBtn.addEventListener('click', () => {
                // Здесь можно добавить логику перехода к букмекеру
                alert('Переход к букмекеру для размещения ставки на поражение Факела');
            });
        }

        // Обработчик для ссылки на полный анализ
        const fullAnalysisLink = document.querySelector('.full-analysis-link');
        if (fullAnalysisLink) {
            fullAnalysisLink.addEventListener('click', (e) => {
                // Если виджет находится в iframe, открываем в новом окне
                if (window.parent !== window) {
                    e.preventDefault();
                    window.open('./index.html', '_blank');
                }
            });
        }
    }
}

// Инициализация виджета после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
    new TeamBettingWidget();
});

