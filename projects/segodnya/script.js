let currentDate = new Date();
let activeFilters = new Set();

const monthNames = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

function init() {
    setupDateNavigation();
    setupFilters();
    updateDisplay();
    setupModal();
}

function setupDateNavigation() {
    const dateInput = document.getElementById('dateInput');
    const prevDayBtn = document.getElementById('prevDay');
    const nextDayBtn = document.getElementById('nextDay');

    dateInput.valueAsDate = currentDate;

    dateInput.addEventListener('change', (e) => {
        currentDate = new Date(e.target.value);
        updateDisplay();
    });

    prevDayBtn.addEventListener('click', () => {
        currentDate.setDate(currentDate.getDate() - 1);
        dateInput.valueAsDate = currentDate;
        updateDisplay();
    });

    nextDayBtn.addEventListener('click', () => {
        currentDate.setDate(currentDate.getDate() + 1);
        dateInput.valueAsDate = currentDate;
        updateDisplay();
    });
}

function setupFilters() {
    const filtersContainer = document.getElementById('sportFilters');
    
    const allButton = document.createElement('button');
    allButton.className = 'filter-btn active';
    allButton.textContent = 'Все';
    allButton.onclick = () => {
        activeFilters.clear();
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        allButton.classList.add('active');
        updateDisplay();
    };
    filtersContainer.appendChild(allButton);

    Object.entries(SPORTS_CATEGORIES).forEach(([key, label]) => {
        const button = document.createElement('button');
        button.className = 'filter-btn';
        button.textContent = label;
        button.dataset.sport = key;
        button.onclick = () => toggleFilter(key, button, allButton);
        filtersContainer.appendChild(button);
    });
}

function toggleFilter(sport, button, allButton) {
    if (activeFilters.has(sport)) {
        activeFilters.delete(sport);
        button.classList.remove('active');
        
        if (activeFilters.size === 0) {
            allButton.classList.add('active');
        }
    } else {
        activeFilters.add(sport);
        button.classList.add('active');
        allButton.classList.remove('active');
    }
    
    updateDisplay();
}

function updateDisplay() {
    updateDateDisplay();
    updateEvents();
}

function updateDateDisplay() {
    const day = currentDate.getDate();
    const month = monthNames[currentDate.getMonth()];
    
    document.getElementById('currentDay').textContent = day;
    document.getElementById('currentMonth').textContent = month;
}

function updateEvents() {
    const eventsContainer = document.getElementById('eventsContainer');
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    
    let events = getEventsForDate(month, day);
    
    if (activeFilters.size > 0) {
        events = events.filter(event => activeFilters.has(event.category));
    }
    
    if (events.length === 0) {
        eventsContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📅</div>
                <h3 class="empty-state-title">События не найдены</h3>
                <p class="empty-state-description">На этот день нет событий в выбранных категориях</p>
            </div>
        `;
        return;
    }
    
    events.sort((a, b) => b.year - a.year);
    
    eventsContainer.innerHTML = events.map(event => createEventCard(event)).join('');
    
    document.querySelectorAll('.event-card').forEach((card, index) => {
        card.addEventListener('click', () => openModal(events[index]));
    });
}

function createEventCard(event) {
    const categoryLabel = SPORTS_CATEGORIES[event.category];
    const tagsHtml = event.tags.map(tag => `<span class="event-tag">${tag}</span>`).join('');
    
    return `
        <div class="event-card">
            <div class="event-header">
                <div class="event-year">${event.year}</div>
                <div class="event-category">${categoryLabel}</div>
            </div>
            <h3 class="event-title">${event.title}</h3>
            <p class="event-description">${event.description}</p>
            <div class="event-tags">${tagsHtml}</div>
        </div>
    `;
}

function setupModal() {
    const modal = document.getElementById('eventModal');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');
    
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
}

function openModal(event) {
    const modal = document.getElementById('eventModal');
    const modalBody = document.getElementById('modalBody');
    
    const categoryLabel = SPORTS_CATEGORIES[event.category];
    const tagsHtml = event.tags.map(tag => `<span class="event-tag">${tag}</span>`).join('');
    
    const recommendations = getRecommendations(event);
    const recommendationsHtml = recommendations.length > 0 ? `
        <div class="modal-section">
            <h4 class="modal-section-title">Похожие события</h4>
            <div class="recommendations">
                ${recommendations.map(rec => `
                    <div class="recommendation-card" onclick="showRecommendation('${rec.dateKey}')">
                        <div class="recommendation-year">${rec.year}</div>
                        <div class="recommendation-title">${rec.title}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    ` : '';
    
    modalBody.innerHTML = `
        <div class="modal-year">${event.year}</div>
        <div class="modal-category">${categoryLabel}</div>
        <h2 class="modal-title">${event.title}</h2>
        <div class="modal-description">${event.description}</div>
        <div class="event-tags">${tagsHtml}</div>
        ${recommendationsHtml}
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('eventModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function getRecommendations(event) {
    const recommendations = [];
    
    if (!event.relatedEvents || event.relatedEvents.length === 0) {
        return recommendations;
    }
    
    event.relatedEvents.forEach(dateKey => {
        const events = EVENTS_DATA[dateKey];
        if (events && events.length > 0) {
            const relatedEvent = events.find(e => 
                e.category === event.category || 
                e.tags.some(tag => event.tags.includes(tag))
            ) || events[0];
            
            recommendations.push({
                ...relatedEvent,
                dateKey
            });
        }
    });
    
    return recommendations.slice(0, 3);
}

function showRecommendation(dateKey) {
    const [month, day] = dateKey.split('-').map(Number);
    currentDate = new Date(currentDate.getFullYear(), month - 1, day);
    document.getElementById('dateInput').valueAsDate = currentDate;
    closeModal();
    updateDisplay();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', init);