// Современная аналитическая панель букмекерского рынка
// Модернизированный JavaScript с Chart.js интеграцией

// Глобальные переменные
let selectedYears = new Set(['2024']);
let allCompanies = [];

// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Главная функция инициализации
function initializeApp() {
    allCompanies = Object.keys(companiesData);
    initializeYearSelector();
    initializeThemeToggle();
    renderCompaniesData();
}

// Инициализация переключателя темы
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (window.themeDetector) {
                window.themeDetector.toggleTheme();
            }
        });
    }
}

// Инициализация селектора годов
function initializeYearSelector() {
    const dropdownTrigger = document.getElementById('yearDropdownTrigger');
    const dropdownContent = document.getElementById('yearDropdownContent');
    const dropdownText = document.getElementById('dropdownText');
    const yearCheckboxes = document.querySelectorAll('.year-checkbox input[type="checkbox"]');
    
    // Обработчик клика по триггеру dropdown
    dropdownTrigger.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleDropdown();
    });
    
    // Закрытие dropdown при клике вне его
    document.addEventListener('click', function(e) {
        if (!dropdownContent.contains(e.target) && !dropdownTrigger.contains(e.target)) {
            closeDropdown();
        }
    });
    
    // Обработчики чекбоксов годов
    yearCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function(e) {
            e.stopPropagation();
            const year = this.value;
            if (this.checked) {
                selectedYears.add(year);
            } else {
                selectedYears.delete(year);
            }
            updateDropdownText();
            renderCompaniesData();
        });
    });
    
    // Инициализация текста dropdown
    updateDropdownText();
}

// Переключение состояния dropdown
function toggleDropdown() {
    const dropdownTrigger = document.getElementById('yearDropdownTrigger');
    const dropdownContent = document.getElementById('yearDropdownContent');
    
    if (dropdownContent.classList.contains('active')) {
        closeDropdown();
    } else {
        openDropdown();
    }
}

// Открытие dropdown
function openDropdown() {
    const dropdownTrigger = document.getElementById('yearDropdownTrigger');
    const dropdownContent = document.getElementById('yearDropdownContent');
    
    dropdownTrigger.classList.add('active');
    dropdownContent.classList.add('active');
}

// Закрытие dropdown
function closeDropdown() {
    const dropdownTrigger = document.getElementById('yearDropdownTrigger');
    const dropdownContent = document.getElementById('yearDropdownContent');
    
    dropdownTrigger.classList.remove('active');
    dropdownContent.classList.remove('active');
}

// Обновление текста в dropdown
function updateDropdownText() {
    const dropdownText = document.getElementById('dropdownText');
    const sortedYears = Array.from(selectedYears).sort((a, b) => parseInt(b) - parseInt(a));
    
    if (selectedYears.size === 0) {
        dropdownText.textContent = 'Выберите годы';
    } else if (selectedYears.size === 1) {
        dropdownText.textContent = sortedYears[0];
    } else {
        dropdownText.textContent = sortedYears.join(', ');
    }
}

// Основная функция отображения данных компаний
function renderCompaniesData() {
    const container = document.getElementById('companiesData');
    
    if (selectedYears.size === 0) {
        container.innerHTML = '<div style="text-align: center; padding: 40px; color: var(--text-secondary);">Выберите годы для анализа</div>';
        return;
    }
    
    let html = '';
    
    // Сортируем компании по выручке последнего выбранного года
    const sortedCompanies = allCompanies.sort((a, b) => {
        const latestYear = Math.max(...Array.from(selectedYears).map(y => parseInt(y)));
        const aRevenue = companiesData[a].financials[latestYear]?.revenue?.value || 0;
        const bRevenue = companiesData[b].financials[latestYear]?.revenue?.value || 0;
        return bRevenue - aRevenue;
    });
    
    sortedCompanies.forEach(companyId => {
        const company = companiesData[companyId];
        html += createCompanyDataCard(companyId, company);
    });
    
    container.innerHTML = html;
}

// Создание карточки компании
function createCompanyDataCard(companyId, company) {
    const sortedYears = Array.from(selectedYears).sort((a, b) => parseInt(b) - parseInt(a));
    
    if (sortedYears.length === 1) {
        // Для одного года - показываем как раньше
        const year = sortedYears[0];
        const yearData = company.financials[year];
        if (!yearData) return '';
        
        return `
            <div class="company-data-card">
                <div class="company-data-header">
                    <img src="${company.logo}" alt="${company.name}" class="company-data-logo" 
                         onerror="this.style.display='none'">
                    <div class="company-data-title">
                        <h3>${company.name}</h3>
                        <div class="company-data-info">
                            Основана: ${company.founded}, ${company.entity}
                        </div>
                    </div>
                </div>
                <div class="metrics-grid">
                    ${createMetricItem('', 'Выручка', yearData.revenue)}
                    ${createMetricItem('', 'Прибыль/Убыток', yearData.profit)}
                    ${createMetricItem('', 'GGR', yearData.ggr)}
                    ${createMetricItem('', 'Доля рынка', yearData.market_share)}
                    ${createMetricItem('', 'Целевые отчисления', yearData.target_contributions)}
                </div>
            </div>
        `;
    } else {
        // Для нескольких лет - группируем по метрикам
        const metrics = [
            { icon: '', key: 'revenue', label: 'Выручка' },
            { icon: '', key: 'profit', label: 'Прибыль/Убыток' },
            { icon: '', key: 'ggr', label: 'GGR' },
            { icon: '', key: 'market_share', label: 'Доля рынка' },
            { icon: '', key: 'target_contributions', label: 'Целевые отчисления' }
        ];
        
        let metricsHtml = '';
        
        metrics.forEach(metric => {
            // Собираем все значения для проверки, есть ли что показывать
            const hasValidData = sortedYears.some(year => {
                const yearData = company.financials[year];
                if (!yearData || !yearData[metric.key]) return false;
                return shouldShowMetric(yearData[metric.key], metric.label);
            });
            
            // Если нет валидных данных для показа, пропускаем всю группу
            if (!hasValidData) return;
            
            metricsHtml += `
                <div class="metric-group">
                    <div class="metric-group-title">
                        ${metric.label}
                    </div>
                    <div class="metric-years">
                        ${sortedYears.map(year => {
                            const yearData = company.financials[year];
                            if (!yearData || !yearData[metric.key]) return '';
                            
                            const data = yearData[metric.key];
                            
                            // Проверяем, нужно ли показывать эту метрику
                            if (!shouldShowMetric(data, metric.label)) {
                                return '';
                            }
                            
                            const previousYear = (parseInt(year) - 1).toString();
                            const previousData = company.financials[previousYear]?.[metric.key];
                            
                            let valueDisplay = data.value;
                            let displayUnit = data.unit || '';
                            
                            // Специальное форматирование для целевых отчислений
                            if (metric.label === 'Целевые отчисления') {
                                const formatted = formatContributions(data.value, data.unit);
                                valueDisplay = formatted.value;
                                displayUnit = formatted.unit;
                            } else {
                                // Применяем новое форматирование для финансовых значений
                                const formatted = formatFinancialValue(data.value, data.unit);
                                valueDisplay = formatted.value;
                                displayUnit = formatted.unit;
                            }
                            
                            if (typeof valueDisplay === 'number') {
                                valueDisplay = valueDisplay.toLocaleString('ru-RU');
                            }
                            
                            // Для доли рынка используем разность значений в процентах
                            let changeHtml = '';
                            let changeClass = '';
                            if (data.change !== undefined) {
                                changeClass = data.trend || 'neutral';
                                if (metric.label === 'Доля рынка') {
                                    changeHtml = `${data.change > 0 ? '+' : ''}${data.change}%`;
                                } else {
                                    changeHtml = `${data.change > 0 ? '+' : ''}${data.change}%`;
                                }
                            }
                            
                            return `
                                <div class="year-metric">
                                    <span class="year-label">${year}:</span>
                                    <span class="metric-value-multi">
                                        ${valueDisplay} ${displayUnit}
                                    </span>
                                    <span class="metric-change ${changeClass}">${changeHtml}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        });
        
        return `
            <div class="company-data-card">
                <div class="company-data-header">
                    <img src="${company.logo}" alt="${company.name}" class="company-data-logo" 
                         onerror="this.style.display='none'">
                    <div class="company-data-title">
                        <h3>${company.name}</h3>
                        <div class="company-data-info">
                            Основана: ${company.founded}, ${company.entity}
                        </div>
                    </div>
                </div>
                <div class="metrics-grouped">
                    ${metricsHtml}
                </div>
            </div>
        `;
    }
}

// Функция форматирования целевых отчислений
function formatContributions(value, unit) {
    if (unit === 'млн ₽' && value >= 1000) {
        return {
            value: (value / 1000).toFixed(2),
            unit: 'млрд'
        };
    }
    // Убираем знак рублей
    if (unit === 'млн ₽') {
        return { value, unit: 'млн' };
    }
    return { value, unit };
}

// Новая функция для форматирования финансовых значений с правильными единицами
function formatFinancialValue(value, unit) {
    if (!value || value === 0) return { value: 0, unit };
    
    // Если значение в млрд, но меньше 1
    if (unit === 'млрд ₽' && value < 1) {
        return {
            value: (value * 1000).toFixed(0),
            unit: 'млн'
        };
    }
    
    // Если значение в млн, но меньше 1
    if (unit === 'млн ₽' && value < 1) {
        return {
            value: (value * 1000).toFixed(0),
            unit: 'тыс'
        };
    }
    
    // Убираем знак рублей из основных единиц
    if (unit === 'млрд ₽') {
        return { value, unit: 'млрд' };
    }
    if (unit === 'млн ₽') {
        return { value, unit: 'млн' };
    }
    
    return { value, unit };
}

// Функция для вычисления абсолютного изменения доли рынка
function calculateMarketShareChange(currentValue, previousValue) {
    if (currentValue === undefined || previousValue === undefined) return null;
    return (currentValue - previousValue).toFixed(2);
}

// Функция проверки, нужно ли показывать метрику
function shouldShowMetric(data, metricLabel) {
    // Всегда показываем прибыль/убыток, даже если 0
    if (metricLabel === 'Прибыль/Убыток') return true;
    
    // Для целевых отчислений показываем только если >= 120 млн
    if (metricLabel === 'Целевые отчисления') {
        return data && data.value >= 120;
    }
    
    // Пропускаем другие метрики если значение 0
    return data && data.value !== 0;
}

// Упрощаем функцию createMetricItem для одного года
function createMetricItem(icon, label, currentData) {
    // Проверяем, нужно ли показывать эту метрику
    if (!shouldShowMetric(currentData, label)) {
        return '';
    }
    
    if (!currentData || currentData.value === undefined) {
        return `
            <div class="metric-item">
                <span class="metric-label">${label}</span>
                <span class="metric-value">—</span>
            </div>
        `;
    }
    
    let valueDisplay = currentData.value;
    let displayUnit = currentData.unit || '';
    
    // Специальное форматирование для целевых отчислений
    if (label === 'Целевые отчисления') {
        const formatted = formatContributions(currentData.value, currentData.unit);
        valueDisplay = formatted.value;
        displayUnit = formatted.unit;
    } else {
        // Применяем новое форматирование для финансовых значений
        const formatted = formatFinancialValue(currentData.value, currentData.unit);
        valueDisplay = formatted.value;
        displayUnit = formatted.unit;
    }
    
    if (typeof valueDisplay === 'number') {
        valueDisplay = valueDisplay.toLocaleString('ru-RU');
    }
    
    // Для доли рынка используем разность значений в процентах
    let changeHtml = '';
    if (currentData.change !== undefined) {
        if (label === 'Доля рынка') {
            changeHtml = `<span class="metric-change ${currentData.trend || 'neutral'}">${currentData.change > 0 ? '+' : ''}${currentData.change}%</span>`;
        } else {
            changeHtml = `<span class="metric-change ${currentData.trend || 'neutral'}">${currentData.change > 0 ? '+' : ''}${currentData.change}%</span>`;
        }
    }
    
    return `
        <div class="metric-item">
            <span class="metric-label">${icon} ${label}</span>
            <span class="metric-value">
                ${valueDisplay} ${displayUnit}
                ${changeHtml}
            </span>
        </div>
    `;
}

// Данные компаний
const companiesData = {
    'fonbet': {
        name: 'FONBET',
        logo: 'Фонбет.png',
        founded: '1994',
        entity: 'ООО «Фонкор»',
        financials: {
            '2019': {
                revenue: { value: 38.06, unit: 'млрд ₽' },
                profit: { value: 19.40, unit: 'млрд ₽' },
                ggr: { value: 0, unit: 'млрд ₽' },
                market_share: { value: 27.68, unit: '%' },
                target_contributions: { value: 0, unit: 'млн ₽' }
            },
            '2020': {
                revenue: { value: 52.19, unit: 'млрд ₽', change: 37.1, trend: 'positive' },
                profit: { value: 23.30, unit: 'млрд ₽', change: 20.1, trend: 'positive' },
                ggr: { value: 0, unit: 'млрд ₽' },
                market_share: { value: 21.93, unit: '%', change: -20.8, trend: 'negative' },
                target_contributions: { value: 818, unit: 'млн ₽' }
            },
            '2021': {
                revenue: { value: 264.40, unit: 'млрд ₽', change: 406.5, trend: 'positive' },
                profit: { value: 29.71, unit: 'млрд ₽', change: 27.5, trend: 'positive' },
                ggr: { value: 68.40, unit: 'млрд ₽' },
                market_share: { value: 35.81, unit: '%', change: 63.3, trend: 'positive' },
                target_contributions: { value: 3536, unit: 'млн ₽', change: 332.3, trend: 'negative' }
            },
            '2022': {
                revenue: { value: 220.78, unit: 'млрд ₽', change: -16.5, trend: 'negative' },
                profit: { value: 26.36, unit: 'млрд ₽', change: -11.3, trend: 'negative' },
                ggr: { value: 53.87, unit: 'млрд ₽', change: -21.2, trend: 'negative' },
                market_share: { value: 25.11, unit: '%', change: -29.9, trend: 'negative' },
                target_contributions: { value: 3233, unit: 'млн ₽', change: -8.6, trend: 'positive' }
            },
            '2023': {
                revenue: { value: 435.64, unit: 'млрд ₽', change: 97.3, trend: 'positive' },
                profit: { value: 59.20, unit: 'млрд ₽', change: 124.6, trend: 'positive' },
                ggr: { value: 107.81, unit: 'млрд ₽', change: 100.1, trend: 'positive' },
                market_share: { value: 35.71, unit: '%', change: 42.2, trend: 'positive' },
                target_contributions: { value: 6509, unit: 'млн ₽', change: 101.3, trend: 'negative' }
            },
            '2024': {
                revenue: { value: 608.81, unit: 'млрд ₽', change: 39.7, trend: 'positive' },
                profit: { value: 37.44, unit: 'млрд ₽', change: -36.8, trend: 'negative' },
                ggr: { value: 140.83, unit: 'млрд ₽', change: 30.6, trend: 'positive' },
                market_share: { value: 35.19, unit: '%', change: -1.5, trend: 'negative' },
                target_contributions: { value: 12122, unit: 'млн ₽', change: 86.3, trend: 'negative' }
            }
        }
    },
    'winline': {
        name: 'WINLINE',
        logo: 'https://dumpster.cdn.sports.ru/2/74/85b227fc2b52787014acc7f4f14dc.png',
        founded: '2009',
        entity: 'ООО «Управляющая компания НКС»',
        financials: {
            '2019': {
                revenue: { value: 29.58, unit: 'млрд ₽' },
                profit: { value: 2.61, unit: 'млрд ₽' },
                ggr: { value: 6.06, unit: 'млрд ₽' },
                market_share: { value: 21.51, unit: '%' },
                target_contributions: { value: 0, unit: 'млн ₽' }
            },
            '2020': {
                revenue: { value: 47.95, unit: 'млрд ₽', change: 62.1, trend: 'positive' },
                profit: { value: 3.99, unit: 'млрд ₽', change: 52.9, trend: 'positive' },
                ggr: { value: 10.24, unit: 'млрд ₽', change: 68.9, trend: 'positive' },
                market_share: { value: 20.15, unit: '%', change: -6.3, trend: 'negative' },
                target_contributions: { value: 0, unit: 'млн ₽' }
            },
            '2021': {
                revenue: { value: 111.16, unit: 'млрд ₽', change: 131.9, trend: 'positive' },
                profit: { value: 9.91, unit: 'млрд ₽', change: 148.4, trend: 'positive' },
                ggr: { value: 22.07, unit: 'млрд ₽', change: 115.5, trend: 'positive' },
                market_share: { value: 15.05, unit: '%', change: -25.3, trend: 'negative' },
                target_contributions: { value: 0, unit: 'млн ₽' }
            },
            '2022': {
                revenue: { value: 166.10, unit: 'млрд ₽', change: 49.4, trend: 'positive' },
                profit: { value: 13.14, unit: 'млрд ₽', change: 32.6, trend: 'positive' },
                ggr: { value: 33.67, unit: 'млрд ₽', change: 52.6, trend: 'positive' },
                market_share: { value: 18.89, unit: '%', change: 25.5, trend: 'positive' },
                target_contributions: { value: 2491, unit: 'млн ₽' }
            },
            '2023': {
                revenue: { value: 277.27, unit: 'млрд ₽', change: 66.9, trend: 'positive' },
                profit: { value: 26.86, unit: 'млрд ₽', change: 104.4, trend: 'positive' },
                ggr: { value: 71.15, unit: 'млрд ₽', change: 111.3, trend: 'positive' },
                market_share: { value: 22.73, unit: '%', change: 20.3, trend: 'positive' },
                target_contributions: { value: 4163, unit: 'млн ₽', change: 67.1, trend: 'negative' }
            },
            '2024': {
                revenue: { value: 414.99, unit: 'млрд ₽', change: 49.7, trend: 'positive' },
                profit: { value: 27.75, unit: 'млрд ₽', change: 3.3, trend: 'positive' },
                ggr: { value: 99.92, unit: 'млрд ₽', change: 40.5, trend: 'positive' },
                market_share: { value: 23.99, unit: '%', change: 5.5, trend: 'positive' },
                target_contributions: { value: 9113, unit: 'млн ₽', change: 118.9, trend: 'negative' }
            }
        }
    },
    'melbet': {
        name: 'Мелбет',
        logo: 'Мелбет.jpg',
        founded: '2012',
        entity: 'ООО «Мелофон»',
        financials: {
            '2020': {
                revenue: { value: 1.73, unit: 'млрд ₽' },
                profit: { value: 0.05, unit: 'млрд ₽' },
                ggr: { value: 0.40, unit: 'млрд ₽' },
                market_share: { value: 0.73, unit: '%' },
                target_contributions: { value: 0, unit: 'млн ₽' }
            },
            '2021': {
                revenue: { value: 20.34, unit: 'млрд ₽', change: 1074.0, trend: 'positive' },
                profit: { value: 2.42, unit: 'млрд ₽', change: 4740.0, trend: 'positive' },
                ggr: { value: 4.52, unit: 'млрд ₽', change: 1030.0, trend: 'positive' },
                market_share: { value: 2.75, unit: '%', change: 276.7, trend: 'positive' },
                target_contributions: { value: 60, unit: 'млн ₽' }
            },
            '2022': {
                revenue: { value: 24.04, unit: 'млрд ₽', change: 18.2, trend: 'positive' },
                profit: { value: 4.10, unit: 'млрд ₽', change: 69.6, trend: 'positive' },
                ggr: { value: 3.93, unit: 'млрд ₽', change: -13.1, trend: 'negative' },
                market_share: { value: 2.73, unit: '%', change: -0.7, trend: 'negative' },
                target_contributions: { value: 361, unit: 'млн ₽', change: 501.7, trend: 'negative' }
            },
            '2023': {
                revenue: { value: 24.39, unit: 'млрд ₽', change: 1.5, trend: 'positive' },
                profit: { value: 3.99, unit: 'млрд ₽', change: -2.7, trend: 'negative' },
                ggr: { value: 5.10, unit: 'млрд ₽', change: 29.8, trend: 'positive' },
                market_share: { value: 2.00, unit: '%', change: -26.7, trend: 'negative' },
                target_contributions: { value: 366, unit: 'млн ₽', change: 1.4, trend: 'negative' }
            },
            '2024': {
                revenue: { value: 34.69, unit: 'млрд ₽', change: 42.2, trend: 'positive' },
                profit: { value: 5.42, unit: 'млрд ₽', change: 35.8, trend: 'positive' },
                ggr: { value: 9.75, unit: 'млрд ₽', change: 91.2, trend: 'positive' },
                market_share: { value: 2.00, unit: '%' },
                target_contributions: { value: 694, unit: 'млн ₽', change: 89.6, trend: 'negative' }
            }
        }
    },
    'betboom': {
        name: 'BetBoom',
        logo: 'BetBoom.jpg',
        founded: '2011',
        entity: 'ООО Фирма «СТОМ»',
        financials: {
            '2019': {
                revenue: { value: 20.15, unit: 'млрд ₽' },
                profit: { value: 0.48, unit: 'млрд ₽' },
                ggr: { value: 5.36, unit: 'млрд ₽' },
                market_share: { value: 14.66, unit: '%' },
                target_contributions: { value: 0, unit: 'млн ₽' }
            },
            '2020': {
                revenue: { value: 19.33, unit: 'млрд ₽', change: -4.1, trend: 'negative' },
                profit: { value: 1.19, unit: 'млрд ₽', change: 147.9, trend: 'positive' },
                ggr: { value: 5.64, unit: 'млрд ₽', change: 5.2, trend: 'positive' },
                market_share: { value: 8.12, unit: '%', change: -44.6, trend: 'negative' },
                target_contributions: { value: 0, unit: 'млн ₽' }
            },
            '2021': {
                revenue: { value: 36.06, unit: 'млрд ₽', change: 86.5, trend: 'positive' },
                profit: { value: -0.55, unit: 'млрд ₽', change: -146.1, trend: 'negative' },
                ggr: { value: 5.85, unit: 'млрд ₽', change: 3.7, trend: 'positive' },
                market_share: { value: 4.88, unit: '%', change: -39.9, trend: 'negative' },
                target_contributions: { value: 0, unit: 'млн ₽' }
            },
            '2022': {
                revenue: { value: 58.67, unit: 'млрд ₽', change: 62.7, trend: 'positive' },
                profit: { value: 0.95, unit: 'млрд ₽', change: 272.7, trend: 'positive' },
                ggr: { value: 10.83, unit: 'млрд ₽', change: 85.1, trend: 'positive' },
                market_share: { value: 6.67, unit: '%', change: 36.7, trend: 'positive' },
                target_contributions: { value: 880, unit: 'млн ₽' }
            },
            '2023': {
                revenue: { value: 135.21, unit: 'млрд ₽', change: 130.4, trend: 'positive' },
                profit: { value: 2.97, unit: 'млрд ₽', change: 212.6, trend: 'positive' },
                ggr: { value: 27.70, unit: 'млрд ₽', change: 155.8, trend: 'positive' },
                market_share: { value: 11.08, unit: '%', change: 66.1, trend: 'positive' },
                target_contributions: { value: 2009, unit: 'млн ₽', change: 128.3, trend: 'negative' }
            },
            '2024': {
                revenue: { value: 227.18, unit: 'млрд ₽', change: 68.0, trend: 'positive' },
                profit: { value: 2.54, unit: 'млрд ₽', change: -14.5, trend: 'negative' },
                ggr: { value: 56.64, unit: 'млрд ₽', change: 104.5, trend: 'positive' },
                market_share: { value: 13.13, unit: '%', change: 18.5, trend: 'positive' },
                target_contributions: { value: 4393, unit: 'млн ₽', change: 118.7, trend: 'negative' }
            }
        }
    },
    'betcity': {
        name: 'БЕТСИТИ',
        logo: 'БЕТСИТИ.jpg',
        founded: '2003',
        entity: 'ООО «Фортуна»',
        financials: {
            '2019': {
                revenue: { value: 15.81, unit: 'млрд ₽' },
                profit: { value: 0.86, unit: 'млрд ₽' },
                ggr: { value: 15.81, unit: 'млрд ₽' },
                market_share: { value: 11.50, unit: '%' },
                target_contributions: { value: 0, unit: 'млн ₽' }
            },
            '2020': {
                revenue: { value: 14.60, unit: 'млрд ₽', change: -7.7, trend: 'negative' },
                profit: { value: 0.12, unit: 'млрд ₽', change: -86.0, trend: 'negative' },
                ggr: { value: 14.60, unit: 'млрд ₽', change: -7.7, trend: 'negative' },
                market_share: { value: 6.14, unit: '%', change: -46.6, trend: 'negative' },
                target_contributions: { value: 0, unit: 'млн ₽' }
            },
            '2021': {
                revenue: { value: 29.48, unit: 'млрд ₽', change: 101.9, trend: 'positive' },
                profit: { value: 1.15, unit: 'млрд ₽', change: 831.8, trend: 'positive' },
                ggr: { value: 29.48, unit: 'млрд ₽', change: 101.9, trend: 'positive' },
                market_share: { value: 3.99, unit: '%', change: -35.0, trend: 'negative' },
                target_contributions: { value: 265, unit: 'млн ₽', change: 341.7, trend: 'negative' }
            },
            '2022': {
                revenue: { value: 36.90, unit: 'млрд ₽', change: 25.2, trend: 'positive' },
                profit: { value: 0.65, unit: 'млрд ₽', change: -43.5, trend: 'negative' },
                ggr: { value: 36.90, unit: 'млрд ₽', change: 25.2, trend: 'positive' },
                market_share: { value: 4.20, unit: '%', change: 5.3, trend: 'positive' },
                target_contributions: { value: 555, unit: 'млн ₽', change: 109.4, trend: 'negative' }
            },
            '2023': {
                revenue: { value: 49.29, unit: 'млрд ₽', change: 33.6, trend: 'positive' },
                profit: { value: 6.06, unit: 'млрд ₽', change: 835.4, trend: 'positive' },
                ggr: { value: 8.54, unit: 'млрд ₽', change: -76.9, trend: 'negative' },
                market_share: { value: 4.04, unit: '%', change: -3.8, trend: 'negative' },
                target_contributions: { value: 775, unit: 'млн ₽', change: 39.6, trend: 'negative' }
            },
            '2024': {
                revenue: { value: 67.18, unit: 'млрд ₽', change: 36.3, trend: 'positive' },
                profit: { value: 5.07, unit: 'млрд ₽', change: -16.3, trend: 'negative' },
                ggr: { value: 11.55, unit: 'млрд ₽', change: 35.3, trend: 'positive' },
                market_share: { value: 3.88, unit: '%', change: -4.0, trend: 'negative' },
                target_contributions: { value: 1330, unit: 'млн ₽', change: 71.6, trend: 'negative' }
            }
        }
    },
    'pari': { 
        name: 'PARI', 
        logo: 'Пари.png', 
        founded: '2022', 
        entity: 'ООО «БК «Пари»', 
        financials: { 
            '2022': { 
                revenue: { value: 38.78, unit: 'млрд ₽' }, 
                profit: { value: 2.05, unit: 'млрд ₽' },
                ggr: { value: 5.79, unit: 'млрд ₽' },
                market_share: { value: 4.41, unit: '%' },
                target_contributions: { value: 582, unit: 'млн ₽' }
            }, 
            '2023': { 
                revenue: { value: 93.76, unit: 'млрд ₽', change: 141.7, trend: 'positive' }, 
                profit: { value: 10.60, unit: 'млрд ₽', change: 417.1, trend: 'positive' },
                ggr: { value: 15.64, unit: 'млрд ₽', change: 170.1, trend: 'positive' },
                market_share: { value: 7.69, unit: '%', change: 74.4, trend: 'positive' },
                target_contributions: { value: 1406, unit: 'млн ₽', change: 141.6, trend: 'negative' }
            }, 
            '2024': { 
                revenue: { value: 133.24, unit: 'млрд ₽', change: 42.1, trend: 'positive' }, 
                profit: { value: 8.31, unit: 'млрд ₽', change: -21.6, trend: 'negative' },
                ggr: { value: 22.59, unit: 'млрд ₽', change: 44.4, trend: 'positive' },
                market_share: { value: 7.70, unit: '%', change: 0.1, trend: 'positive' },
                target_contributions: { value: 2665, unit: 'млн ₽', change: 89.6, trend: 'negative' }
            } 
        } 
    },
    'ligastavok': { 
        name: 'Лига Ставок', 
        logo: 'Лига Ставок.jpeg', 
        founded: '2008', 
        entity: 'ООО «ПМБК»', 
        financials: { 
            '2019': { 
                revenue: { value: 49.46, unit: 'млрд ₽' }, 
                profit: { value: 1.33, unit: 'млрд ₽' },
                ggr: { value: 9.72, unit: 'млрд ₽' },
                market_share: { value: 0, unit: '%' },
                target_contributions: { value: 0, unit: 'млн ₽' }
            },
            '2020': { 
                revenue: { value: 41.82, unit: 'млрд ₽', change: -15.4, trend: 'negative' }, 
                profit: { value: 1.10, unit: 'млрд ₽', change: -17.3, trend: 'negative' },
                ggr: { value: 10.07, unit: 'млрд ₽', change: 3.6, trend: 'positive' },
                market_share: { value: 0, unit: '%' },
                target_contributions: { value: 0, unit: 'млн ₽' }
            },
            '2021': { 
                revenue: { value: 69.17, unit: 'млрд ₽', change: 65.4, trend: 'positive' }, 
                profit: { value: 1.17, unit: 'млрд ₽', change: 6.4, trend: 'positive' },
                ggr: { value: 16.19, unit: 'млрд ₽', change: 60.8, trend: 'positive' },
                market_share: { value: 9.37, unit: '%', change: -46.7, trend: 'negative' },
                target_contributions: { value: 0, unit: 'млн ₽' }
            },
            '2022': { 
                revenue: { value: 71.53, unit: 'млрд ₽', change: 3.4, trend: 'positive' }, 
                profit: { value: -0.50, unit: 'млрд ₽', change: -142.7, trend: 'negative' },
                ggr: { value: 18.61, unit: 'млрд ₽', change: 14.9, trend: 'positive' },
                market_share: { value: 8.14, unit: '%', change: -13.1, trend: 'negative' },
                target_contributions: { value: 1073, unit: 'млн ₽' }
            }, 
            '2023': { 
                revenue: { value: 96.16, unit: 'млрд ₽', change: 34.4, trend: 'positive' }, 
                profit: { value: -0.02, unit: 'млрд ₽', change: -96.0, trend: 'negative' },
                ggr: { value: 24.51, unit: 'млрд ₽', change: 31.7, trend: 'positive' },
                market_share: { value: 7.88, unit: '%', change: -3.2, trend: 'negative' },
                target_contributions: { value: 1442, unit: 'млн ₽', change: 34.4, trend: 'negative' }
            }, 
            '2024': { 
                revenue: { value: 117.73, unit: 'млрд ₽', change: 22.4, trend: 'positive' }, 
                profit: { value: 2.32, unit: 'млрд ₽', change: 11700.0, trend: 'positive' },
                ggr: { value: 29.93, unit: 'млрд ₽', change: 22.1, trend: 'positive' },
                market_share: { value: 6.81, unit: '%', change: -13.6, trend: 'negative' },
                target_contributions: { value: 2355, unit: 'млн ₽', change: 63.3, trend: 'negative' }
            } 
        } 
    },
    'leon': { 
        name: 'Leon', 
        logo: 'leon.png', 
        founded: '2011', 
        entity: 'ООО «Леон»', 
        financials: { 
            '2019': { 
                revenue: { value: 4.07, unit: 'млрд ₽' }, 
                profit: { value: 0.04, unit: 'млрд ₽' },
                ggr: { value: 0.68, unit: 'млрд ₽' },
                market_share: { value: 2.96, unit: '%' },
                target_contributions: { value: 0, unit: 'млн ₽' }
            },
            '2020': { 
                revenue: { value: 3.87, unit: 'млрд ₽', change: -4.9, trend: 'negative' }, 
                profit: { value: 0.00, unit: 'млрд ₽', change: -100.0, trend: 'negative' },
                ggr: { value: 0.77, unit: 'млрд ₽', change: 13.2, trend: 'positive' },
                market_share: { value: 1.63, unit: '%', change: -44.9, trend: 'negative' },
                target_contributions: { value: 0, unit: 'млн ₽' }
            },
            '2021': { 
                revenue: { value: 7.46, unit: 'млрд ₽', change: 92.8, trend: 'positive' }, 
                profit: { value: 0.46, unit: 'млрд ₽' },
                ggr: { value: 1.56, unit: 'млрд ₽', change: 102.6, trend: 'positive' },
                market_share: { value: 1.01, unit: '%', change: -38.0, trend: 'negative' },
                target_contributions: { value: 76, unit: 'млн ₽', change: 26.7, trend: 'negative' }
            },
            '2022': { 
                revenue: { value: 8.21, unit: 'млрд ₽', change: 10.1, trend: 'positive' }, 
                profit: { value: 0.001, unit: 'млрд ₽', change: -99.8, trend: 'negative' },
                ggr: { value: 2.14, unit: 'млрд ₽', change: 37.2, trend: 'positive' },
                market_share: { value: 0.93, unit: '%', change: -7.9, trend: 'negative' },
                target_contributions: { value: 129, unit: 'млн ₽', change: 69.7, trend: 'negative' }
            }, 
            '2023': { 
                revenue: { value: 11.61, unit: 'млрд ₽', change: 41.4, trend: 'positive' }, 
                profit: { value: 0.05, unit: 'млрд ₽', change: 4400.0, trend: 'positive' },
                ggr: { value: 3.12, unit: 'млрд ₽', change: 45.8, trend: 'positive' },
                market_share: { value: 0.95, unit: '%', change: 2.2, trend: 'positive' },
                target_contributions: { value: 175, unit: 'млн ₽', change: 35.7, trend: 'negative' }
            }, 
            '2024': { 
                revenue: { value: 16.27, unit: 'млрд ₽', change: 40.1, trend: 'positive' }, 
                profit: { value: 0.14, unit: 'млрд ₽', change: 180.8, trend: 'positive' },
                ggr: { value: 3.85, unit: 'млрд ₽', change: 23.4, trend: 'positive' },
                market_share: { value: 0.94, unit: '%', change: -1.1, trend: 'negative' },
                target_contributions: { value: 326, unit: 'млн ₽', change: 86.3, trend: 'negative' }
            } 
        } 
    },
    'marathon': { 
        name: 'Марафон', 
        logo: 'марафон.png', 
        founded: '1997', 
        entity: 'ООО «БК «Марафон»', 
        financials: { 
            '2020': { 
                revenue: { value: 4.06, unit: 'млрд ₽' }, 
                profit: { value: 0.18, unit: 'млрд ₽' },
                ggr: { value: 0.56, unit: 'млрд ₽' },
                market_share: { value: 1.71, unit: '%' },
                target_contributions: { value: 0, unit: 'млн ₽' }
            },
            '2021': { 
                revenue: { value: 12.26, unit: 'млрд ₽', change: 201.7, trend: 'positive' }, 
                profit: { value: 1.39, unit: 'млрд ₽', change: 672.2, trend: 'positive' },
                ggr: { value: 2.59, unit: 'млрд ₽', change: 360.7, trend: 'positive' },
                market_share: { value: 1.66, unit: '%', change: -2.9, trend: 'negative' },
                target_contributions: { value: 0, unit: 'млн ₽' }
            },
            '2022': { 
                revenue: { value: 13.64, unit: 'млрд ₽', change: 11.3, trend: 'positive' }, 
                profit: { value: 0.51, unit: 'млрд ₽', change: -63.3, trend: 'negative' },
                ggr: { value: 3.34, unit: 'млрд ₽', change: 29.0, trend: 'positive' },
                market_share: { value: 1.55, unit: '%', change: -6.6, trend: 'negative' },
                target_contributions: { value: 204, unit: 'млн ₽', change: 85.5, trend: 'negative' }
            }, 
            '2023': { 
                revenue: { value: 18.20, unit: 'млрд ₽', change: 33.4, trend: 'positive' }, 
                profit: { value: 0.24, unit: 'млрд ₽', change: -53.1, trend: 'negative' },
                ggr: { value: 4.28, unit: 'млрд ₽', change: 28.1, trend: 'positive' },
                market_share: { value: 1.49, unit: '%', change: -3.9, trend: 'negative' },
                target_contributions: { value: 274, unit: 'млн ₽', change: 34.3, trend: 'negative' }
            }, 
            '2024': { 
                revenue: { value: 18.73, unit: 'млрд ₽', change: 2.9, trend: 'positive' }, 
                profit: { value: 0.79, unit: 'млрд ₽', change: 229.2, trend: 'positive' },
                ggr: { value: 5.02, unit: 'млрд ₽', change: 17.3, trend: 'positive' },
                market_share: { value: 1.08, unit: '%', change: -27.5, trend: 'negative' },
                target_contributions: { value: 374, unit: 'млн ₽', change: 36.5, trend: 'negative' }
            } 
        } 
    },
    'tennisi': {
        name: 'Tennisi',
        logo: 'https://dumpster.cdn.sports.ru/6/8d/1c20bc46f29382ee61248a9554585.png',
        founded: '1999',
        entity: 'ООО «Рус-Телетот»',
        financials: {
            '2019': {
                revenue: { value: 0.47, unit: 'млрд ₽' },
                profit: { value: 0.009, unit: 'млрд ₽' },
                ggr: { value: 0.16, unit: 'млрд ₽' },
                market_share: { value: 0.34, unit: '%' },
                target_contributions: { value: 0, unit: 'млн ₽' }
            },
            '2020': {
                revenue: { value: 0.46, unit: 'млрд ₽', change: -2.1, trend: 'negative' },
                profit: { value: 0.07, unit: 'млрд ₽', change: 677.8, trend: 'positive' },
                ggr: { value: 0.19, unit: 'млрд ₽', change: 18.8, trend: 'positive' },
                market_share: { value: 0.19, unit: '%', change: -44.1, trend: 'negative' },
                target_contributions: { value: 0, unit: 'млн ₽' }
            },
            '2021': {
                revenue: { value: 2.49, unit: 'млрд ₽', change: 442.4, trend: 'positive' },
                profit: { value: 0.14, unit: 'млрд ₽', change: 109.1, trend: 'positive' },
                ggr: { value: 0.66, unit: 'млрд ₽', change: 253.8, trend: 'positive' },
                market_share: { value: 0.34, unit: '%', change: 78.9, trend: 'positive' },
                target_contributions: { value: 0, unit: 'млн ₽', change: -100.0, trend: 'positive' }
            },
            '2022': {
                revenue: { value: 2.98, unit: 'млрд ₽', change: 19.7, trend: 'positive' },
                profit: { value: 0.07, unit: 'млрд ₽', change: -50.9, trend: 'negative' },
                ggr: { value: 0.70, unit: 'млрд ₽', change: 6.1, trend: 'positive' },
                market_share: { value: 0.34, unit: '%', change: 0.0, trend: 'neutral' },
                target_contributions: { value: 120, unit: 'млн ₽' }
            },
            '2023': {
                revenue: { value: 4.21, unit: 'млрд ₽', change: 41.3, trend: 'positive' },
                profit: { value: 0.28, unit: 'млрд ₽', change: 315.3, trend: 'positive' },
                ggr: { value: 0.93, unit: 'млрд ₽', change: 32.6, trend: 'positive' },
                market_share: { value: 0.35, unit: '%', change: 2.9, trend: 'positive' },
                target_contributions: { value: 120, unit: 'млн ₽' }
            },
            '2024': {
                revenue: { value: 4.59, unit: 'млрд ₽', change: 9.0, trend: 'positive' },
                profit: { value: 0.28, unit: 'млрд ₽', change: -1.1, trend: 'negative' },
                ggr: { value: 1.08, unit: 'млрд ₽', change: 16.1, trend: 'positive' },
                market_share: { value: 0.27, unit: '%', change: -22.9, trend: 'negative' },
                target_contributions: { value: 120, unit: 'млн ₽' }
            }
        }
    },
    'baltbet': { 
        name: 'Балтбет', 
        logo: 'https://dumpster.cdn.sports.ru/e/96/b63ff9722adba81d7e973657274fe.png', 
        founded: '2003', 
        entity: 'ООО «Санторин»', 
        financials: { 
            '2019': { 
                revenue: { value: 11.31, unit: 'млрд ₽' }, 
                profit: { value: -0.03, unit: 'млрд ₽' },
                ggr: { value: 3.85, unit: 'млрд ₽' },
                market_share: { value: 8.23, unit: '%' },
                target_contributions: { value: 0, unit: 'млн ₽' }
            },
            '2020': { 
                revenue: { value: 7.26, unit: 'млрд ₽', change: -35.8, trend: 'negative' }, 
                profit: { value: -0.13, unit: 'млрд ₽', change: 324.7, trend: 'negative' },
                ggr: { value: 2.54, unit: 'млрд ₽', change: -34.0, trend: 'negative' },
                market_share: { value: 3.05, unit: '%', change: -62.9, trend: 'negative' },
                target_contributions: { value: 0, unit: 'млн ₽' }
            },
            '2021': { 
                revenue: { value: 10.12, unit: 'млрд ₽', change: 39.4, trend: 'positive' }, 
                profit: { value: 0.05, unit: 'млрд ₽', change: 141.4, trend: 'positive' },
                ggr: { value: 3.41, unit: 'млрд ₽', change: 34.3, trend: 'positive' },
                market_share: { value: 1.37, unit: '%', change: -55.1, trend: 'negative' },
                target_contributions: { value: 0, unit: 'млн ₽', change: -100.0, trend: 'positive' }
            },
            '2022': { 
                revenue: { value: 11.83, unit: 'млрд ₽', change: 16.9, trend: 'positive' }, 
                profit: { value: 0.03, unit: 'млрд ₽', change: -43.4, trend: 'negative' },
                ggr: { value: 4.55, unit: 'млрд ₽', change: 33.4, trend: 'positive' },
                market_share: { value: 1.35, unit: '%', change: -1.5, trend: 'negative' },
                target_contributions: { value: 177, unit: 'млн ₽' }
            }, 
            '2023': { 
                revenue: { value: 13.98, unit: 'млрд ₽', change: 18.2, trend: 'positive' }, 
                profit: { value: 0.11, unit: 'млрд ₽', change: 263.2, trend: 'positive' },
                ggr: { value: 5.97, unit: 'млрд ₽', change: 31.2, trend: 'positive' },
                market_share: { value: 1.15, unit: '%', change: -14.8, trend: 'negative' },
                target_contributions: { value: 210, unit: 'млн ₽', change: 18.6, trend: 'negative' }
            }, 
            '2024': { 
                revenue: { value: 17.33, unit: 'млрд ₽', change: 24.0, trend: 'positive' }, 
                profit: { value: 0.44, unit: 'млрд ₽', change: 285.0, trend: 'positive' },
                ggr: { value: 7.68, unit: 'млрд ₽', change: 28.6, trend: 'positive' },
                market_share: { value: 1.00, unit: '%', change: -13.0, trend: 'negative' },
                target_contributions: { value: 347, unit: 'млн ₽', change: 65.2, trend: 'negative' }
            } 
        } 
    },
    'zenit': { 
        name: 'Zenit', 
        logo: 'Зенит.png', 
        founded: '1998', 
        entity: 'ООО «Инвест-Гарант»', 
        financials: { 
            '2019': { 
                revenue: { value: 0.34, unit: 'млрд ₽' }, 
                profit: { value: 0.01, unit: 'млрд ₽' },
                ggr: { value: 0, unit: 'млрд ₽' },
                market_share: { value: 0.25, unit: '%' },
                target_contributions: { value: 0, unit: 'млн ₽' }
            },
            '2020': { 
                revenue: { value: 0.39, unit: 'млрд ₽', change: 14.7, trend: 'positive' }, 
                profit: { value: 0.004, unit: 'млрд ₽', change: -66.7, trend: 'negative' },
                ggr: { value: 0, unit: 'млрд ₽' },
                market_share: { value: 0.17, unit: '%', change: -32.0, trend: 'negative' },
                target_contributions: { value: 0, unit: 'млн ₽' }
            },
            '2021': { 
                revenue: { value: 7.38, unit: 'млрд ₽', change: 1770.9, trend: 'positive' }, 
                profit: { value: 0.0006, unit: 'млрд ₽', change: -84.5, trend: 'negative' },
                ggr: { value: 0, unit: 'млрд ₽' },
                market_share: { value: 1.00, unit: '%', change: 488.2, trend: 'positive' },
                target_contributions: { value: 84, unit: 'млн ₽', change: 40.0, trend: 'negative' }
            },
            '2022': { 
                revenue: { value: 8.59, unit: 'млрд ₽', change: 16.4, trend: 'positive' }, 
                profit: { value: 0.0004, unit: 'млрд ₽', change: -33.3, trend: 'negative' },
                ggr: { value: 0, unit: 'млрд ₽' },
                market_share: { value: 0.98, unit: '%', change: -2.0, trend: 'negative' },
                target_contributions: { value: 129, unit: 'млн ₽', change: 53.6, trend: 'negative' }
            }, 
            '2023': { 
                revenue: { value: 10.60, unit: 'млрд ₽', change: 23.4, trend: 'positive' }, 
                profit: { value: 0.05, unit: 'млрд ₽', change: 11150.0, trend: 'positive' },
                ggr: { value: 0, unit: 'млрд ₽' },
                market_share: { value: 0.87, unit: '%', change: -11.2, trend: 'negative' },
                target_contributions: { value: 159, unit: 'млн ₽', change: 23.3, trend: 'negative' }
            }, 
            '2024': { 
                revenue: { value: 11.90, unit: 'млрд ₽', change: 12.3, trend: 'positive' }, 
                profit: { value: 0.01, unit: 'млрд ₽', change: -66.8, trend: 'negative' },
                ggr: { value: 0, unit: 'млрд ₽' },
                market_share: { value: 0.69, unit: '%', change: -20.7, trend: 'negative' },
                target_contributions: { value: 238, unit: 'млн ₽', change: 49.7, trend: 'negative' }
            } 
        } 
    },
    'olimpbet': { 
        name: 'Olimpbet', 
        logo: 'https://dumpster.cdn.sports.ru/8/d1/15b2fa87cc1e51cc2c1c2e2319937.png', 
        founded: '2012', 
        entity: 'ООО «БК «Олимп»', 
        financials: { 
            '2019': { 
                revenue: { value: 10.50, unit: 'млрд ₽' }, 
                profit: { value: 0.43, unit: 'млрд ₽' },
                ggr: { value: 1.94, unit: 'млрд ₽' },
                market_share: { value: 7.64, unit: '%' },
                target_contributions: { value: 0, unit: 'млн ₽' }
            },
            '2020': { 
                revenue: { value: 13.59, unit: 'млрд ₽', change: 29.4, trend: 'positive' }, 
                profit: { value: 0.23, unit: 'млрд ₽', change: -46.9, trend: 'negative' },
                ggr: { value: 3.27, unit: 'млрд ₽', change: 68.6, trend: 'positive' },
                market_share: { value: 5.71, unit: '%', change: -25.3, trend: 'negative' },
                target_contributions: { value: 0, unit: 'млн ₽' }
            },
            '2021': { 
                revenue: { value: 25.23, unit: 'млрд ₽', change: 85.6, trend: 'positive' }, 
                profit: { value: 0.01, unit: 'млрд ₽', change: -94.0, trend: 'negative' },
                ggr: { value: 5.97, unit: 'млрд ₽', change: 82.6, trend: 'positive' },
                market_share: { value: 3.42, unit: '%', change: -40.1, trend: 'negative' },
                target_contributions: { value: 258, unit: 'млн ₽', change: 330.0, trend: 'negative' }
            },
            '2022': { 
                revenue: { value: 32.73, unit: 'млрд ₽', change: 29.7, trend: 'positive' }, 
                profit: { value: 0.01, unit: 'млрд ₽', change: -44.5, trend: 'negative' },
                ggr: { value: 7.63, unit: 'млрд ₽', change: 27.8, trend: 'positive' },
                market_share: { value: 3.72, unit: '%', change: 8.8, trend: 'positive' },
                target_contributions: { value: 489, unit: 'млн ₽', change: 89.5, trend: 'negative' }
            }, 
            '2023': { 
                revenue: { value: 51.97, unit: 'млрд ₽', change: 58.8, trend: 'positive' }, 
                profit: { value: 1.85, unit: 'млрд ₽', change: 24350.0, trend: 'positive' },
                ggr: { value: 12.00, unit: 'млрд ₽', change: 57.2, trend: 'positive' },
                market_share: { value: 4.26, unit: '%', change: 14.5, trend: 'positive' },
                target_contributions: { value: 782, unit: 'млн ₽', change: 59.9, trend: 'negative' }
            }, 
            '2024': { 
                revenue: { value: 69.23, unit: 'млрд ₽', change: 33.2, trend: 'positive' }, 
                profit: { value: 2.35, unit: 'млрд ₽', change: 27.0, trend: 'positive' },
                ggr: { value: 15.56, unit: 'млрд ₽', change: 29.7, trend: 'positive' },
                market_share: { value: 4.00, unit: '%', change: -6.1, trend: 'negative' },
                target_contributions: { value: 1386, unit: 'млн ₽', change: 77.2, trend: 'negative' }
            } 
        } 
    },
    'bettery': {
        name: 'Bettery',
        logo: 'Беттери.jpg',
        founded: '2020',
        entity: 'ООО «Атлантис»',
        financials: {
            '2020': {
                revenue: { value: 0.09, unit: 'млрд ₽' },
                profit: { value: -0.03, unit: 'млрд ₽' },
                ggr: { value: 0, unit: 'млрд ₽' },
                market_share: { value: 0.04, unit: '%' },
                target_contributions: { value: 60, unit: 'млн ₽' }
            },
            '2021': {
                revenue: { value: 0.55, unit: 'млрд ₽', change: 547.1, trend: 'positive' },
                profit: { value: 0.03, unit: 'млрд ₽', change: 198.2, trend: 'positive' },
                ggr: { value: 0, unit: 'млрд ₽' },
                market_share: { value: 0.08, unit: '%', change: 100.0, trend: 'positive' },
                target_contributions: { value: 0, unit: 'млн ₽', change: -100.0, trend: 'positive' }
            },
            '2022': {
                revenue: { value: 0.16, unit: 'млрд ₽', change: -70.3, trend: 'negative' },
                profit: { value: -0.19, unit: 'млрд ₽', change: -787.5, trend: 'negative' },
                ggr: { value: 0, unit: 'млрд ₽' },
                market_share: { value: 0.02, unit: '%', change: -75.0, trend: 'negative' },
                target_contributions: { value: 99, unit: 'млн ₽' }
            },
            '2023': {
                revenue: { value: 0.003, unit: 'млрд ₽', change: -98.3, trend: 'negative' },
                profit: { value: -0.12, unit: 'млрд ₽', change: -37.7, trend: 'positive' },
                ggr: { value: 0, unit: 'млрд ₽' },
                market_share: { value: 0.00, unit: '%', change: -100.0, trend: 'negative' },
                target_contributions: { value: 150, unit: 'млн ₽', change: 51.5, trend: 'negative' }
            },
            '2024': {
                revenue: { value: 1.22, unit: 'млрд ₽', change: 40566.7, trend: 'positive' },
                profit: { value: -0.08, unit: 'млрд ₽', change: -33.2, trend: 'positive' },
                ggr: { value: 0, unit: 'млрд ₽' },
                market_share: { value: 0.07, unit: '%' },
                target_contributions: { value: 103, unit: 'млн ₽', change: -31.3, trend: 'positive' }
            }
        }
    }
};