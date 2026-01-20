// Основной скрипт галереи выведенных джерси
class RetiredJerseyGallery {
    constructor() {
        this.jerseys = retiredJerseys;
        this.init();
    }

    init() {
        this.renderJerseys();
    }

    renderJerseys() {
        const grid = document.getElementById('jerseyGrid');
        
        // Берем только первые 14 джерси для нужного количества (6+6+2)
        const displayJerseys = this.jerseys.slice(0, 14);
        
        grid.innerHTML = displayJerseys.map(jersey => this.createJerseyCard(jersey)).join('');
    }

    createJerseyCard(jersey) {
        return `
            <div class="jersey-card" data-jersey-id="${jersey.id}">
                <div class="jersey-visual ${jersey.color}">
                    <div class="jersey-number">${jersey.number}</div>
                    <div class="jersey-name">${jersey.playerEn.toUpperCase()}</div>
                </div>
            </div>
        `;
    }


    // Метод для фильтрации джерси (для будущих улучшений)
    filterJerseys(criteria) {
        // Можно добавить фильтрацию по позиции, годам и т.д.
        console.log('Filtering jerseys:', criteria);
    }

    // Метод для поиска джерси
    searchJerseys(query) {
        const filtered = this.jerseys.filter(jersey => 
            jersey.player.toLowerCase().includes(query.toLowerCase()) ||
            jersey.number.includes(query)
        );
        
        const grid = document.getElementById('jerseyGrid');
        grid.innerHTML = filtered.map(jersey => this.createJerseyCard(jersey)).join('');
    }
}

// Инициализация галереи
let gallery;

document.addEventListener('DOMContentLoaded', () => {
    gallery = new RetiredJerseyGallery();
    
    // Добавляем плавное появление элементов
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    // Наблюдаем за элементами для анимации
    document.querySelectorAll('.jersey-card, .team-info').forEach(el => {
        observer.observe(el);
    });
});

// Утилиты для работы с данными
const JerseyUtils = {
    // Получить джерси по номеру
    getByNumber(number) {
        return retiredJerseys.find(jersey => jersey.number === number.toString());
    },

    // Получить джерси по игроку
    getByPlayer(playerName) {
        return retiredJerseys.filter(jersey => 
            jersey.player.toLowerCase().includes(playerName.toLowerCase())
        );
    },

    // Получить статистику
    getStats() {
        return {
            total: retiredJerseys.length,
            byColor: {
                purple: retiredJerseys.filter(j => j.color === 'purple').length,
                gold: retiredJerseys.filter(j => j.color === 'gold').length
            },
            byDecade: this.groupByDecade()
        };
    },

    // Группировка по десятилетиям
    groupByDecade() {
        const decades = {};
        retiredJerseys.forEach(jersey => {
            const startYear = parseInt(jersey.years.split('-')[0]);
            const decade = Math.floor(startYear / 10) * 10;
            const decadeKey = `${decade}s`;
            
            if (!decades[decadeKey]) {
                decades[decadeKey] = [];
            }
            decades[decadeKey].push(jersey);
        });
        return decades;
    }
};

// Экспорт для использования в других скриптах
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { RetiredJerseyGallery, JerseyUtils };
}
