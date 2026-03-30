let selectedCategory = 'telegram';

document.addEventListener('DOMContentLoaded', function () {
    initCategoryTabs();
    renderBookmakers();
});

function initCategoryTabs() {
    const tabsContainer = document.getElementById('networkTabs');
    if (!tabsContainer) return;

    tabsContainer.innerHTML = SOCIAL_CATEGORIES.map(function (category) {
        const isActive = category.id === selectedCategory;
        return `
            <button class="year-tab social-tab ${isActive ? 'active' : ''}" data-category="${category.id}" role="tab" aria-selected="${isActive}">
                <img src="${category.logo}" alt="${category.name}" class="social-tab-logo" />
            </button>
        `;
    }).join('');

    const tabs = tabsContainer.querySelectorAll('.social-tab');
    tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
            tabs.forEach(function (item) {
                item.classList.remove('active');
                item.setAttribute('aria-selected', 'false');
            });

            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            selectedCategory = tab.dataset.category;
            renderBookmakers();
        });
    });
}

function renderBookmakers() {
    const list = document.getElementById('bookmakersList');
    if (!list) return;

    const sorted = [...BOOKMAKERS_SOCIAL].sort(function (a, b) {
        const aValue = a[selectedCategory];
        const bValue = b[selectedCategory];
        const aMissing = aValue === null || aValue === undefined;
        const bMissing = bValue === null || bValue === undefined;

        if (aMissing && bMissing) return 0;
        if (aMissing) return 1;
        if (bMissing) return -1;
        return bValue - aValue;
    });

    list.innerHTML = sorted.map(function (bookmaker) {
        const value = bookmaker[selectedCategory];
        return `
            <li class="bookmaker-item">
                <div class="bookmaker-main">
                    ${bookmakerLogoMarkup(bookmaker)}
                    <span class="bookmaker-name">${escapeHtml(bookmaker.name)}</span>
                </div>
                <span class="bookmaker-value">${formatValue(value)}</span>
            </li>
        `;
    }).join('');
}

function bookmakerLogoMarkup(bookmaker) {
    if (!bookmaker.logo) {
        return '<div class="bookmaker-logo-wrap bookmaker-logo-wrap--empty" aria-hidden="true"></div>';
    }
    return (
        '<div class="bookmaker-logo-wrap">' +
        '<img class="bookmaker-logo" src="' +
        escapeHtml(bookmaker.logo) +
        '" alt="" width="56" height="56" loading="lazy" onerror="this.parentElement.classList.add(\'bookmaker-logo-wrap--empty\');this.remove();">' +
        '</div>'
    );
}

function escapeHtml(text) {
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

function formatValue(value) {
    if (value === null || value === undefined) return '—';
    return value.toLocaleString('ru-RU', {
        minimumFractionDigits: Number.isInteger(value) ? 0 : 1,
        maximumFractionDigits: 1
    });
}
