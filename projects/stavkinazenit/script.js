// Основной скрипт (адаптация под Зенит)
class TeamBettingAnalyzer {
    constructor() {
        this.currentStrategy = 'win';
        this.currentBetAmount = 1000;
        this.showAllOdds = false;
        this.init();
    }

    init() {
        this.loadTeamData();
        this.renderMatches();
        this.updateSummary();
        this.bindEvents();
    }

    loadTeamData() {
        const teamData = teamsData['zenit'];
        const teamLogo = document.getElementById('team-logo');
        if (teamLogo && teamData?.logo) {
            teamLogo.src = teamData.logo;
            teamLogo.alt = teamData.name;
        }
        const teamName = document.getElementById('team-name');
        if (teamName && teamData?.name) teamName.textContent = teamData.name;
    }

    renderMatches() {
        const tbody = document.getElementById('matches-tbody');
        const thead = document.getElementById('table-thead');
        const table = tbody?.closest('table');
        if (!tbody) return;

        if (this.showAllOdds) {
            // Режим всех кэфов
            table?.classList.add('all-odds-mode');
            thead.innerHTML = `
                <tr>
                    <th>Матч</th>
                    <th>Турнир</th>
                    <th class="odds-header-win">П1</th>
                    <th class="odds-header-draw">X</th>
                    <th class="odds-header-lose">П2</th>
                    <th class="odds-header-not-lose">НП</th>
                    <th class="odds-header-not-win">НВ</th>
                </tr>
            `;

            tbody.innerHTML = '';
            matchesData.forEach(match => {
                const row = document.createElement('tr');
                const wonOdd = this.getWonOddType(match);
                
                row.innerHTML = `
                    <td title="${match.homeTeam} - ${match.awayTeam} (${match.date})">
                        <a href="${match.link}" class="match-link">
                            <span class="desktop-match">${match.homeTeam} - ${match.awayTeam}</span>
                            <span class="mobile-match">${match.homeTeam}<br>${match.awayTeam}</span>
                        </a>
                        <div class="match-date">${match.date}</div>
                    </td>
                    <td title="${match.league}">${match.league}</td>
                    <td class="all-odds-cell ${wonOdd === 'win' ? 'won-odd' : ''}">${match.odds.win.toFixed(2)}</td>
                    <td class="all-odds-cell ${wonOdd === 'draw' ? 'won-odd' : ''}">${match.odds.draw.toFixed(2)}</td>
                    <td class="all-odds-cell ${wonOdd === 'lose' ? 'won-odd' : ''}">${match.odds.lose.toFixed(2)}</td>
                    <td class="all-odds-cell ${wonOdd === 'notLose' ? 'won-odd' : ''}">${match.odds.notLose.toFixed(2)}</td>
                    <td class="all-odds-cell ${wonOdd === 'notWin' ? 'won-odd' : ''}">${match.odds.notWin.toFixed(2)}</td>
                `;
                tbody.appendChild(row);
            });
        } else {
            // Обычный режим
            table?.classList.remove('all-odds-mode');
            const headerTexts = { 'win': 'Победа', 'lose': 'Поражение', 'draw': 'Ничья', 'not-lose': 'Не проиграет', 'not-win': 'Не выиграет' };
            thead.innerHTML = `
                <tr>
                    <th>Матч</th>
                    <th>Турнир</th>
                    <th class="odds-column">Счет</th>
                    <th class="odds-column" id="odds-header">${headerTexts[this.currentStrategy]}</th>
                    <th class="odds-column">Результат</th>
                </tr>
            `;

            tbody.innerHTML = '';
            matchesData.forEach(match => {
                const row = document.createElement('tr');
                const betResult = this.calculateBetResult(match, this.currentStrategy);
                const profit = betResult.won ? (this.currentBetAmount * betResult.odds - this.currentBetAmount) : -this.currentBetAmount;
                let currentOdds;
                switch (this.currentStrategy) {
                    case 'win': currentOdds = match.odds.win; break;
                    case 'lose': currentOdds = match.odds.lose; break;
                    case 'draw': currentOdds = match.odds.draw; break;
                    case 'not-lose': currentOdds = match.odds.notLose; break;
                    case 'not-win': currentOdds = match.odds.notWin; break;
                }

                row.innerHTML = `
                    <td title="${match.homeTeam} - ${match.awayTeam} (${match.date})">
                        <a href="${match.link}" class="match-link">
                            <span class="desktop-match">${match.homeTeam} - ${match.awayTeam}</span>
                            <span class="mobile-match">${match.homeTeam}<br>${match.awayTeam}</span>
                        </a>
                        <div class="match-date">${match.date}</div>
                    </td>
                    <td title="${match.league}">${match.league}</td>
                    <td title="${match.score}" class="odds-column">
                        <span class="score ${match.result}">${match.score}</span>
                    </td>
                    <td title="${currentOdds.toFixed(2)}" class="odds-column">${currentOdds.toFixed(2)}</td>
                    <td title="${profit > 0 ? '+' : ''}${profit.toLocaleString('ru-RU')} ₽" class="odds-column">
                        <button class="bet-result-btn ${profit > 0 ? 'positive' : 'negative'}">
                            ${profit > 0 ? '+' : ''}${profit.toLocaleString('ru-RU')} ₽
                        </button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        }
    }

    getWonOddType(match) {
        // Возвращает тип ставки, которая сыграла
        if (match.result === 'win') return 'win';
        if (match.result === 'draw') return 'draw';
        if (match.result === 'loss') return 'lose';
        return null;
    }

    calculateBetResult(match, strategy) {
        let won = false; let odds = 1;
        switch (strategy) {
            case 'win': won = match.result === 'win'; odds = match.odds.win; break;
            case 'lose': won = match.result === 'loss'; odds = match.odds.lose; break;
            case 'draw': won = match.result === 'draw'; odds = match.odds.draw; break;
            case 'not-lose': won = match.result === 'win' || match.result === 'draw'; odds = match.odds.notLose; break;
            case 'not-win': won = match.result === 'loss' || match.result === 'draw'; odds = match.odds.notWin; break;
        }
        return { won, odds };
    }

    updateSummary() {
        let totalProfit = 0;
        matchesData.forEach(match => {
            const betResult = this.calculateBetResult(match, this.currentStrategy);
            totalProfit += betResult.won ? (this.currentBetAmount * betResult.odds - this.currentBetAmount) : -this.currentBetAmount;
        });
        const netProfit = document.getElementById('net-profit');
        if (netProfit) {
            netProfit.textContent = `${totalProfit > 0 ? '+' : ''}${totalProfit.toLocaleString('ru-RU')} ₽`;
            netProfit.className = `summary-value ${totalProfit > 0 ? 'positive' : 'negative'}`;
        }
    }

    bindEvents() {
        const strategyButtons = document.querySelectorAll('.strategy-btn');
        strategyButtons.forEach(btn => btn.addEventListener('click', (e) => {
            strategyButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            this.currentStrategy = e.target.dataset.strategy;
            this.renderMatches();
            this.updateSummary();
        }));

        const amountButtons = document.querySelectorAll('.amount-btn');
        amountButtons.forEach(btn => btn.addEventListener('click', (e) => {
            amountButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            const customAmountContainer = document.querySelector('.custom-amount');
            const customAmountInput = document.getElementById('custom-amount-input');
            if (customAmountContainer) customAmountContainer.classList.remove('active');
            if (customAmountInput) customAmountInput.value = '';
            this.currentBetAmount = parseInt(e.target.dataset.amount);
            this.renderMatches();
            this.updateSummary();
        }));

        const customAmountInput = document.getElementById('custom-amount-input');
        const customAmountContainer = document.querySelector('.custom-amount');
        if (customAmountInput && customAmountContainer) {
            customAmountInput.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                if (value && value > 0) {
                    const amountButtons = document.querySelectorAll('.amount-btn');
                    amountButtons.forEach(b => b.classList.remove('active'));
                    customAmountContainer.classList.add('active');
                    this.currentBetAmount = value;
                    this.renderMatches();
                    this.updateSummary();
                }
            });
            customAmountInput.addEventListener('focus', () => {
                const amountButtons = document.querySelectorAll('.amount-btn');
                amountButtons.forEach(b => b.classList.remove('active'));
                customAmountContainer.classList.add('active');
            });
            customAmountInput.addEventListener('blur', () => {
                const value = parseInt(customAmountInput.value);
                if (!value || value <= 0) {
                    customAmountContainer.classList.remove('active');
                    const firstAmountBtn = document.querySelector('.amount-btn[data-amount="1000"]');
                    if (firstAmountBtn) {
                        firstAmountBtn.classList.add('active');
                        this.currentBetAmount = 1000;
                        this.renderMatches();
                        this.updateSummary();
                    }
                }
            });
        }

        // Обработчик кнопки "Посмотреть все кэфы"
        const viewAllOddsBtn = document.getElementById('viewAllOddsBtn');
        if (viewAllOddsBtn) {
            viewAllOddsBtn.addEventListener('click', () => {
                this.showAllOdds = !this.showAllOdds;
                viewAllOddsBtn.textContent = this.showAllOdds ? 'Вернуться к расчетам' : 'Посмотреть все кэфы';
                viewAllOddsBtn.classList.toggle('active');
                this.renderMatches();
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => { new TeamBettingAnalyzer(); });







