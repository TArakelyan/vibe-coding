(function () {
  'use strict';

  const YEARS = ['2025', '2024', '2023', '2022', '2021', '2020', '2019'];

  const METRICS = [
    { key: 'revenue', label: 'Выручка' },
    { key: 'profit', label: 'Прибыль' },
    { key: 'winnings', label: 'Выигрыши' },
    { key: 'ggr', label: 'GGR' },
    { key: 'target_contributions', label: 'Целевые отчисления' },
    { key: 'salaries', label: 'Зарплаты' },
    { key: 'commercial', label: 'Коммерческие расходы', altKey: 'advertising' },
  ];

  const state = {
    year: '2025',
    view: 'bookmakers',
    bookmakerId: 'fonbet',
  };

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getCompanyEntries() {
    if (typeof companiesData === 'undefined') return [];
    return Object.entries(companiesData);
  }

  function getYearData(company, year) {
    return company.financials && company.financials[year];
  }

  function getMetricRaw(yearData, key, altKey) {
    if (!yearData) return null;
    if (yearData[key]) return yearData[key];
    if (altKey && yearData[altKey]) return yearData[altKey];
    return null;
  }

  function isNumericMetric(data) {
    return data && typeof data.value === 'number' && !Number.isNaN(data.value);
  }

  function isMissingMetric(data) {
    return !data || data.value === '—';
  }

  /** Приводит денежное значение к млрд руб. */
  function toBln(value, unit) {
    const u = unit || 'млрд';
    if (u === 'млрд') return value;
    if (u === 'млн') return value / 1000;
    if (u === 'тыс') return value / 1e6;
    return value;
  }

  function revenueForSort(revenue) {
    if (!isNumericMetric(revenue)) return 0;
    return toBln(revenue.value, revenue.unit);
  }

  function formatMlnOrBlnMoney(data, cfg) {
    let valueInMln = data.value;
    const u = data.unit || 'млн';
    if (u === 'млрд') valueInMln = data.value * 1000;
    if (u === 'тыс') valueInMln = data.value / 1000;

    const sign = data.value < 0 ? '−' : '';
    const absInMln = Math.abs(valueInMln);

    if (absInMln >= 1000) {
      return {
        value:
          sign +
          (absInMln / 1000).toLocaleString('ru-RU', {
            minimumFractionDigits: cfg.minBln,
            maximumFractionDigits: cfg.maxBln,
          }),
        unit: 'млрд',
      };
    }

    return {
      value:
        sign +
        absInMln.toLocaleString('ru-RU', {
          minimumFractionDigits: cfg.minMln,
          maximumFractionDigits: cfg.maxMln,
        }),
      unit: 'млн',
    };
  }

  function formatMetricValue(label, data) {
    if (!data || data.value === '—') {
      return { value: '—', unit: '' };
    }

    if (
      typeof data.value === 'number' &&
      (label === 'Целевые отчисления' ||
        label === 'Прибыль' ||
        label === 'Зарплаты' ||
        label === 'Коммерческие расходы')
    ) {
      if (label === 'Целевые отчисления') {
        return formatMlnOrBlnMoney(data, { minBln: 1, maxBln: 2, minMln: 0, maxMln: 2 });
      }
      return formatMlnOrBlnMoney(data, { minBln: 0, maxBln: 2, minMln: 0, maxMln: 2 });
    }

    if (
      typeof data.value === 'number' &&
      (label === 'Выручка' ||
        label === 'Прибыль' ||
        label === 'Выигрыши' ||
        label === 'GGR' ||
        label === 'Зарплаты' ||
        label === 'Коммерческие расходы')
    ) {
      const sign = data.value < 0 ? '−' : '';
      const abs = Math.abs(data.value);
      const u = data.unit || 'млрд';
      return {
        value:
          sign +
          abs.toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 2 }),
        unit: u === 'млрд' || u === 'млн' ? u : '',
      };
    }

    return {
      value:
        typeof data.value === 'number'
          ? data.value.toLocaleString('ru-RU')
          : String(data.value),
      unit: data.unit || '',
    };
  }

  function formatChangeHtml(data) {
    const change = data.change;
    const changeKind = data.changeKind;
    if (change === null || change === undefined) return '';

    const changeClass = change > 0 ? 'positive' : change < 0 ? 'negative' : 'neutral';
    const sign = change > 0 ? '+' : change < 0 ? '−' : '';
    const changeAbs = Math.abs(change).toLocaleString('ru-RU', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
    const suffix = changeKind === 'pp' ? '' : '%';
    let badgeText = `${sign}${changeAbs}${suffix}`;
    let compact = '';
    let tiny = '';

    if (badgeText.length > 5) {
      const roundedAbs = Math.round(Math.abs(change)).toLocaleString('ru-RU', {
        useGrouping: false,
      });
      badgeText = `${sign}${roundedAbs}${suffix}`;
      compact = ' compact';
    }
    if (badgeText.length > 6) tiny = ' tiny';

    return `<span class="metric-change ${changeClass}${compact}${tiny}">${badgeText}</span>`;
  }

  function formatMetricLine(metric, yearData) {
    const raw = getMetricRaw(yearData, metric.key, metric.altKey);
    if (isMissingMetric(raw)) {
      return (
        '<div class="metric-item metric-item--empty">' +
        '<span class="metric-item-label">' +
        escapeHtml(metric.label) +
        '</span>' +
        '<span class="metric-item-value">—</span></div>'
      );
    }

    const formatted = formatMetricValue(metric.label, raw);
    const unitSuffix = formatted.unit ? ' ' + escapeHtml(formatted.unit) : '';
    const changeHtml = formatChangeHtml(raw);

    return (
      '<div class="metric-item">' +
      '<span class="metric-item-label">' +
      escapeHtml(metric.label) +
      '</span>' +
      '<span class="metric-item-value-row">' +
      '<span class="metric-item-value">' +
      escapeHtml(formatted.value) +
      unitSuffix +
      '</span>' +
      changeHtml +
      '</span></div>'
    );
  }

  function sumMetricForYear(year, metric) {
    let sum = 0;
    let count = 0;

    getCompanyEntries().forEach(function ([id, company]) {
      if (id === 'betm' && year !== '2025') return;
      const yearData = getYearData(company, year);
      const raw = getMetricRaw(yearData, metric.key, metric.altKey);
      if (!isNumericMetric(raw)) return;
      sum += toBln(raw.value, raw.unit);
      count += 1;
    });

    return { sum, count };
  }

  /** Изменение суммы по рынку к прошлому году, %. */
  function getTotalYoYChange(year, metric) {
    const current = sumMetricForYear(year, metric);
    const prevYear = String(Number(year) - 1);
    const previous = sumMetricForYear(prevYear, metric);

    if (current.count === 0 || previous.count === 0 || previous.sum === 0) {
      return null;
    }

    return ((current.sum - previous.sum) / Math.abs(previous.sum)) * 100;
  }

  function formatTotalValue(bln) {
    if (bln >= 1) {
      return {
        value: bln.toLocaleString('ru-RU', { minimumFractionDigits: 1, maximumFractionDigits: 2 }),
        unit: 'млрд',
      };
    }
    return {
      value: (bln * 1000).toLocaleString('ru-RU', { minimumFractionDigits: 0, maximumFractionDigits: 1 }),
      unit: 'млн',
    };
  }

  function formatTotalMetricLine(metric) {
    const { sum, count } = sumMetricForYear(state.year, metric);
    const formatted = count > 0 ? formatTotalValue(sum) : { value: '—', unit: '' };
    const unitSuffix = formatted.unit ? ' ' + escapeHtml(formatted.unit) : '';
    const yoy = getTotalYoYChange(state.year, metric);
    const changeHtml =
      yoy !== null && count > 0 ? formatChangeHtml({ change: yoy, changeKind: null }) : '';

    return (
      '<div class="metric-item">' +
      '<span class="metric-item-label">' +
      escapeHtml(metric.label) +
      '</span>' +
      '<span class="metric-item-value-row">' +
      '<span class="metric-item-value">' +
      escapeHtml(formatted.value) +
      unitSuffix +
      '</span>' +
      changeHtml +
      '</span></div>'
    );
  }

  function renderTotals() {
    const container = document.getElementById('totalsRow');
    const bkCount = getCompanyEntries().filter(function ([id, company]) {
      if (id === 'betm' && state.year !== '2025') return false;
      return Boolean(getYearData(company, state.year));
    }).length;

    const metricsHtml = METRICS.map(formatTotalMetricLine).join('');
    const primaryLabel =
      bkCount > 0
        ? state.year + ' · ' + bkCount + ' ' + pluralBk(bkCount)
        : 'Нет данных за ' + state.year;

    container.innerHTML =
      '<div class="data-row data-row--summary">' +
      '<span class="cell cell--logo cell--summary-badge" aria-hidden="true">' +
      '<span class="summary-badge">Σ</span></span>' +
      '<div class="cell cell--primary">' +
      '<span class="primary-name">' +
      escapeHtml(primaryLabel) +
      '</span></div>' +
      '<div class="cell cell--metrics"><div class="metrics-grid">' +
      metricsHtml +
      '</div></div></div>';
  }

  function pluralBk(n) {
    const mod10 = n % 10;
    const mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return 'БК';
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'БК';
    return 'БК';
  }

  function sortedBookmakersForYear(year) {
    return getCompanyEntries()
      .filter(function ([id, company]) {
        if (id === 'betm' && year !== '2025') return false;
        return Boolean(getYearData(company, year));
      })
      .sort(function (a, b) {
        const aRev = revenueForSort(getYearData(a[1], year)?.revenue);
        const bRev = revenueForSort(getYearData(b[1], year)?.revenue);
        return bRev - aRev;
      });
  }

  function yearsForBookmaker(company) {
    return YEARS.filter(function (year) {
      return Boolean(getYearData(company, year));
    });
  }

  function companyLogoHtml(logoUrl, name) {
    if (!logoUrl) {
      return '<span class="cell cell--logo" aria-hidden="true"></span>';
    }
    return (
      '<span class="cell cell--logo">' +
      '<span class="company-logo-wrap">' +
      '<img class="company-logo" src="' +
      escapeHtml(logoUrl) +
      '" alt="" loading="lazy" />' +
      '</span></span>'
    );
  }

  function renderBookmakerRow(id, company, yearData, year) {
    const metricsHtml = METRICS.map(function (m) {
      return formatMetricLine(m, yearData);
    }).join('');

    return (
      '<div class="data-row" data-id="' +
      escapeHtml(id) +
      '">' +
      companyLogoHtml(company.logo, company.name) +
      '<div class="cell cell--primary">' +
      '<span class="primary-name">' +
      escapeHtml(company.name) +
      '</span>' +
      '<span class="primary-sub">' +
      escapeHtml(company.entity) +
      '</span></div>' +
      '<div class="cell cell--metrics"><div class="metrics-grid">' +
      metricsHtml +
      '</div></div></div>'
    );
  }

  function renderYearRow(year, company) {
    const yearData = getYearData(company, year);
    const metricsHtml = METRICS.map(function (m) {
      return formatMetricLine(m, yearData);
    }).join('');

    return (
      '<div class="data-row" data-year="' +
      escapeHtml(year) +
      '">' +
      '<span class="cell cell--logo cell--year-badge" aria-hidden="true">' +
      '<span class="year-badge">' +
      escapeHtml(year) +
      '</span></span>' +
      '<div class="cell cell--primary">' +
      '<span class="primary-name">' +
      escapeHtml(year) +
      '</span>' +
      '<span class="primary-sub">Финансовый год</span></div>' +
      '<div class="cell cell--metrics"><div class="metrics-grid">' +
      metricsHtml +
      '</div></div></div>'
    );
  }

  function renderTable() {
    const container = document.getElementById('rowsContainer');
    const headPrimary = document.getElementById('headPrimary');
    const bookmakerField = document.getElementById('bookmakerField');
    const controlsRow = document.querySelector('.controls-row');
    let html = '';
    let count = 0;

    if (state.view === 'bookmakers') {
      headPrimary.textContent = 'Букмекер';
      bookmakerField.hidden = true;
      controlsRow.classList.add('controls-row--two');

      const list = sortedBookmakersForYear(state.year);
      count = list.length;
      html = list
        .map(function ([id, company]) {
          return renderBookmakerRow(id, company, getYearData(company, state.year), state.year);
        })
        .join('');
    } else {
      headPrimary.textContent = 'Год';
      bookmakerField.hidden = false;
      controlsRow.classList.remove('controls-row--two');

      const company = companiesData[state.bookmakerId];
      if (!company) {
        html = '<div class="empty-state">Букмекер не найден</div>';
      } else {
        const years = yearsForBookmaker(company);
        count = years.length;
        html = years
          .map(function (year) {
            return renderYearRow(year, company);
          })
          .join('');
      }
    }

    if (!html) {
      html = '<div class="empty-state">Нет данных для выбранных параметров</div>';
      count = 0;
    }

    container.innerHTML = html;
    document.getElementById('resultCount').textContent =
      count > 0 ? count + ' ' + (state.view === 'bookmakers' ? 'букмекеров' : 'лет') : '';
  }

  function fillYearSelect() {
    const sel = document.getElementById('yearSelect');
    sel.innerHTML = YEARS.map(function (y) {
      return '<option value="' + y + '">' + y + '</option>';
    }).join('');
    sel.value = state.year;
  }

  function fillBookmakerSelect() {
    const sel = document.getElementById('bookmakerSelect');
    const entries = getCompanyEntries().sort(function (a, b) {
      return a[1].name.localeCompare(b[1].name, 'ru');
    });

    sel.innerHTML = entries
      .map(function ([id, company]) {
        return (
          '<option value="' + escapeHtml(id) + '">' + escapeHtml(company.name) + '</option>'
        );
      })
      .join('');

    if (!companiesData[state.bookmakerId]) {
      state.bookmakerId = entries[0] ? entries[0][0] : '';
    }
    sel.value = state.bookmakerId;
  }

  function render() {
    renderTotals();
    renderTable();
  }

  function bindEvents() {
    document.getElementById('yearSelect').addEventListener('change', function (e) {
      state.year = e.target.value;
      render();
    });

    document.getElementById('viewSelect').addEventListener('change', function (e) {
      state.view = e.target.value;
      render();
    });

    document.getElementById('bookmakerSelect').addEventListener('change', function (e) {
      state.bookmakerId = e.target.value;
      render();
    });

    document.getElementById('resetView').addEventListener('click', function () {
      state.year = '2025';
      state.view = 'bookmakers';
      state.bookmakerId = 'fonbet';
      document.getElementById('yearSelect').value = state.year;
      document.getElementById('viewSelect').value = state.view;
      document.getElementById('bookmakerSelect').value = state.bookmakerId;
      render();
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (typeof companiesData === 'undefined') {
      document.getElementById('rowsContainer').innerHTML =
        '<div class="empty-state">Не загружены данные.</div>';
      return;
    }
    fillYearSelect();
    fillBookmakerSelect();
    bindEvents();
    render();
  });
})();
