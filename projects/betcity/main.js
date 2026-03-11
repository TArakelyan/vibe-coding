class BundesPredictor {
    constructor() {
        this.currentContendersOrder = [...bundesTeamsData.contenders];
        this.init();
    }

    init() {
        localStorage.removeItem('bundes-table-predictor');
        this.renderContenders();
    }

    renderContenders() {
        const contendersList = document.getElementById('contenders-list');
        contendersList.innerHTML = '';

        this.currentContendersOrder.forEach((team, index) => {
            const teamElement = this.createTeamElement(team, index + 1);
            contendersList.appendChild(teamElement);
        });
    }

    createTeamElement(team, position) {
        const teamDiv = document.createElement('div');
        teamDiv.className = `team-item top-team`;
        teamDiv.draggable = false;
        teamDiv.dataset.teamId = team.id;
        teamDiv.dataset.position = position;

        teamDiv.innerHTML = `
            <img src="${team.logo}" alt="${team.name}" class="team-logo" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0yNSAzN0MxOS40NzcxIDM3IDE1IDMyLjUyMjkgMTUgMjdDMTUgMjEuNDc3MSAxOS40NzcxIDE3IDI1IDE3QzMwLjUyMjkgMTcgMzUgMjEuNDc3MSAzNSAyN0MzNSAzMi41MjI5IDMwLjUyMjkgMzcgMjUgMzdaIiBmaWxsPSIjQ0NDIi8+Cjwvc3ZnPgo='">
            <div class="team-name">${team.name}</div>
            <div class="odds-container">
                <div class="odds-wrapper">
                    <div class="odds-button" data-type="yes">${team.oddsYes}</div>
                </div>
            </div>
        `;

        // Добавляем обработчики для кнопок коэффициентов
        const oddsButtons = teamDiv.querySelectorAll('.odds-button');
        oddsButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openBetcity();
            });
        });

        return teamDiv;
    }

    openBetcity() {
        // Открываем ссылку на БЕТСИТИ в новом окне
        window.open('https://s.betcity.ru/a9x', '_blank');
    }

    saveToLocalStorage() {
        const data = {
            contenders: this.currentContendersOrder.map(team => team.id)
        };
        localStorage.setItem('bundes-table-predictor', JSON.stringify(data));
    }

    loadFromLocalStorage() {
        const saved = localStorage.getItem('bundes-table-predictor');
        if (!saved) return;
        
        try {
            const data = JSON.parse(saved);
            if (data.contenders) {
                this.currentContendersOrder = data.contenders.map(id => 
                    bundesTeamsData.contenders.find(team => team.id === id)
                ).filter(Boolean);
            }
            this.renderContenders();
        } catch (e) {
            console.error('Ошибка загрузки данных:', e);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new BundesPredictor();
});
