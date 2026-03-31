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
    const withEr = selectedCategory === 'telegram' || selectedCategory === 'max';
    list.classList.toggle('bookmakers-list--with-er', withEr);

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

    const headHtml = withEr
        ? '<li class="bookmaker-item bookmaker-item--head"><span class="bookmaker-head-title">Букмекер</span><span class="bookmaker-value bookmaker-value--head">Подписчики</span><span class="bookmaker-value bookmaker-value--head">ER</span></li>'
        : '<li class="bookmaker-item bookmaker-item--head"><span class="bookmaker-head-title">Букмекер</span><span class="bookmaker-value bookmaker-value--head">Подписчики</span></li>';

    list.innerHTML = headHtml + sorted.map(function (bookmaker) {
        const followersValue = bookmaker[selectedCategory];
        const erValue = withEr ? getErValue(bookmaker) : null;
        return `
            <li class="bookmaker-item">
                <div class="bookmaker-main">
                    ${bookmakerLogoMarkup(bookmaker)}
                    <span class="bookmaker-name">${escapeHtml(bookmaker.name)}</span>
                </div>
                <span class="bookmaker-value">${formatFollowers(followersValue)}</span>
                ${withEr ? `<span class="bookmaker-value bookmaker-value--er">${formatEr(erValue)}</span>` : ''}
            </li>
        `;
    }).join('');
}

function bookmakerLogoMarkup(bookmaker) {
    const logoZoomByName = {
        'PARI': 110,
        'Балтбет': 110,
        'Zenit': 110,
    };
    const logoZoom = logoZoomByName[bookmaker.name] || 115;

    if (!bookmaker.logo) {
        return '<div class="bookmaker-logo-wrap bookmaker-logo-wrap--empty" aria-hidden="true"></div>';
    }
    return (
        '<div class="bookmaker-logo-wrap" style="--bookmaker-logo-zoom:' + logoZoom + '%;">' +
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

function formatFollowers(value) {
    if (value === null || value === undefined) return '—';
    return value.toLocaleString('ru-RU', {
        minimumFractionDigits: Number.isInteger(value) ? 0 : 1,
        maximumFractionDigits: 1
    });
}

function getErValue(bookmaker) {
    if (selectedCategory === 'telegram') return bookmaker.telegramEr;
    if (selectedCategory === 'max') return bookmaker.maxEr;
    return null;
}

function formatEr(value) {
    if (value === null || value === undefined) return '—';
    return value.toLocaleString('ru-RU', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }) + '%';
}
