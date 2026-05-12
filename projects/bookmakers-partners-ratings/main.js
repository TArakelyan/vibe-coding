(function () {
  'use strict';

  const SPORTS_UTM = 'https://www.sports.ru/?utm_source=special-bookmakers-partners-ratings';

  const state = {
    search: '',
    bookmakerId: '',
    sport: '',
    entity: '',
    sortKey: 'bookmaker',
    sortDir: 'asc',
  };

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function bookmakerName(id) {
    const m = BOOKMAKER_META[id];
    return m ? m.name : id;
  }

  function bookmakerLogo(id) {
    const m = BOOKMAKER_META[id];
    return m && m.logo ? m.logo : '';
  }

  function bmLogoCircleHtml(logoUrl) {
    const cls = 'bm-logo-wrap bm-logo-wrap--in-table';
    const inner = logoUrl
      ? '<img class="bm-logo" src="' + escapeHtml(logoUrl) + '" alt="" loading="lazy" />'
      : '';
    return (
      '<a class="cell-logo-link" href="' +
      escapeHtml(SPORTS_UTM) +
      '" target="_blank" rel="noopener noreferrer">' +
      '<div class="' +
      cls +
      (logoUrl ? '' : ' bm-logo-wrap--empty') +
      '">' +
      inner +
      '</div></a>'
    );
  }

  function partnerLogoHtml(logoUrl) {
    const cls = 'partner-logo-wrap';
    const inner = logoUrl
      ? '<img class="partner-logo" src="' + escapeHtml(logoUrl) + '" alt="" loading="lazy" />'
      : '';
    return (
      '<a class="cell-logo-link" href="' +
      escapeHtml(SPORTS_UTM) +
      '" target="_blank" rel="noopener noreferrer">' +
      '<div class="' +
      cls +
      (logoUrl ? '' : ' partner-logo-wrap--empty') +
      '">' +
      inner +
      '</div></a>'
    );
  }

  function uniqueSorted(values) {
    return Array.from(new Set(values.filter(Boolean))).sort(function (a, b) {
      return a.localeCompare(b, 'ru');
    });
  }

  function getSortedBookmakerIds() {
    return Object.keys(BOOKMAKER_META).sort(function (a, b) {
      return bookmakerName(a).localeCompare(bookmakerName(b), 'ru');
    });
  }

  function buildBookmakerOptions() {
    const sel = document.getElementById('filterBookmaker');
    if (!sel) return;
    const saved = state.bookmakerId;
    const bmIds = getSortedBookmakerIds();
    sel.innerHTML =
      '<option value="">Все букмекеры</option>' +
      bmIds
        .map(function (id) {
          return '<option value="' + escapeHtml(id) + '">' + escapeHtml(bookmakerName(id)) + '</option>';
        })
        .join('');
    sel.value = saved;
    if (sel.value !== saved) {
      sel.value = '';
      state.bookmakerId = '';
    }
  }

  function buildSportOptions() {
    const sel = document.getElementById('filterSport');
    if (!sel) return;
    const saved = state.sport;
    const sports = uniqueSorted(PARTNERS.map(function (r) { return r.sport; }));
    sel.innerHTML =
      '<option value="">Все виды спорта</option>' +
      sports
        .map(function (s) {
          return '<option value="' + escapeHtml(s) + '">' + escapeHtml(s) + '</option>';
        })
        .join('');
    sel.value = saved;
    if (sel.value !== saved) {
      sel.value = '';
      state.sport = '';
    }
  }

  function buildEntityOptions() {
    const sel = document.getElementById('filterEntity');
    if (!sel) return;
    const saved = state.entity;
    const names = uniqueSorted(PARTNERS.map(function (r) { return r.partnerName; }));
    sel.innerHTML =
      '<option value="">Все клубы и организации</option>' +
      names
        .map(function (n) {
          return '<option value="' + escapeHtml(n) + '">' + escapeHtml(n) + '</option>';
        })
        .join('');
    sel.value = saved;
    if (sel.value !== saved) {
      sel.value = '';
      state.entity = '';
    }
  }

  function formatYear(row) {
    if (row.endYear != null) return String(row.endYear);
    if (row.yearUnknown) return '?';
    return '—';
  }

  function yearSortValue(row) {
    if (row.endYear != null) return row.endYear;
    if (row.yearUnknown) return 8888;
    return 9999;
  }

  function passesFilters(row) {
    if (state.bookmakerId && row.bookmakerId !== state.bookmakerId) return false;
    if (state.sport && row.sport !== state.sport) return false;
    if (state.entity && row.partnerName !== state.entity) return false;
    if (state.search) {
      const q = state.search.toLowerCase();
      const hay = (
        row.partnerName +
        ' ' +
        row.sport +
        ' ' +
        bookmakerName(row.bookmakerId)
      ).toLowerCase();
      if (hay.indexOf(q) === -1) return false;
    }
    return true;
  }

  function compareRows(a, b) {
    const dir = state.sortDir === 'desc' ? -1 : 1;
    const key = state.sortKey;

    if (key === 'bookmaker') {
      const cmp = bookmakerName(a.bookmakerId).localeCompare(bookmakerName(b.bookmakerId), 'ru');
      if (cmp !== 0) return cmp * dir;
      return a.partnerName.localeCompare(b.partnerName, 'ru');
    }
    if (key === 'partner') {
      const cmp = a.partnerName.localeCompare(b.partnerName, 'ru');
      if (cmp !== 0) return cmp * dir;
      return bookmakerName(a.bookmakerId).localeCompare(bookmakerName(b.bookmakerId), 'ru');
    }
    if (key === 'sport') {
      const cmp = a.sport.localeCompare(b.sport, 'ru');
      if (cmp !== 0) return cmp * dir;
      return a.partnerName.localeCompare(b.partnerName, 'ru');
    }
    if (key === 'year') {
      const ya = yearSortValue(a);
      const yb = yearSortValue(b);
      if (ya !== yb) return (ya - yb) * dir;
      return a.partnerName.localeCompare(b.partnerName, 'ru');
    }
    return 0;
  }

  function getFilteredSorted() {
    const list = PARTNERS.filter(passesFilters);
    list.sort(compareRows);
    return list;
  }

  function updateSortHeaders() {
    document.querySelectorAll('.th--sort').forEach(function (btn) {
      const k = btn.getAttribute('data-sort');
      const ind = btn.querySelector('.sort-ind');
      btn.classList.toggle('th--active', k === state.sortKey);
      if (ind) {
        ind.classList.remove('sort-ind--asc', 'sort-ind--desc');
        if (k === state.sortKey) {
          ind.classList.add(state.sortDir === 'asc' ? 'sort-ind--asc' : 'sort-ind--desc');
        }
      }
    });
  }

  function render() {
    const container = document.getElementById('rowsContainer');
    const countEl = document.getElementById('resultCount');
    const rows = getFilteredSorted();

    countEl.textContent =
      rows.length === PARTNERS.length
        ? 'Всего: ' + rows.length
        : 'Показано: ' + rows.length + ' из ' + PARTNERS.length;

    updateSortHeaders();

    if (!rows.length) {
      container.innerHTML =
        '<div class="empty-state">Ничего не найдено. Измените фильтры или поиск.</div>';
      return;
    }

    container.innerHTML = rows
      .map(function (row) {
        const bm = bookmakerLogo(row.bookmakerId);
        const rowClass = 'data-row' + (row.isTitular ? ' data-row--titular' : '');
        const partnerCellClass = 'cell cell--partner' + (row.isTitular ? ' cell--partner-titular' : '');
        const titularBadge = row.isTitular
          ? '<span class="titular-badge" title="Титульное партнёрство">Титульный</span>'
          : '';

        return (
          '<div class="' +
          rowClass +
          '" role="row">' +
          '<div class="cell cell--bookmaker-logo">' +
          bmLogoCircleHtml(bm) +
          '</div>' +
          '<div class="' +
          partnerCellClass +
          '">' +
          partnerLogoHtml(row.partnerLogo) +
          '<div class="partner-name-block">' +
          '<span class="partner-name">' +
          escapeHtml(row.partnerName) +
          '</span>' +
          titularBadge +
          '</div></div>' +
          '<div class="cell cell--sport">' +
          escapeHtml(row.sport) +
          '</div>' +
          '<div class="cell cell--year">' +
          escapeHtml(formatYear(row)) +
          '</div>' +
          '</div>'
        );
      })
      .join('');
  }

  function onSortClick(key) {
    if (state.sortKey === key) {
      state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      state.sortKey = key;
      state.sortDir = key === 'year' ? 'desc' : 'asc';
    }
    render();
  }

  function bind() {
    document.getElementById('searchInput').addEventListener('input', function (e) {
      state.search = e.target.value.trim();
      render();
    });

    document.getElementById('filterBookmaker').addEventListener('change', function (e) {
      state.bookmakerId = e.target.value;
      render();
    });

    document.getElementById('filterSport').addEventListener('change', function (e) {
      state.sport = e.target.value;
      render();
    });

    document.getElementById('filterEntity').addEventListener('change', function (e) {
      state.entity = e.target.value;
      render();
    });

    document.getElementById('resetFilters').addEventListener('click', function () {
      state.search = '';
      state.bookmakerId = '';
      state.sport = '';
      state.entity = '';
      state.sortKey = 'bookmaker';
      state.sortDir = 'asc';
      document.getElementById('searchInput').value = '';
      document.getElementById('filterBookmaker').value = '';
      document.getElementById('filterSport').value = '';
      document.getElementById('filterEntity').value = '';
      render();
    });

    document.querySelectorAll('.th--sort').forEach(function (btn) {
      btn.addEventListener('click', function () {
        onSortClick(btn.getAttribute('data-sort'));
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (typeof PARTNERS === 'undefined' || typeof BOOKMAKER_META === 'undefined') {
      document.getElementById('rowsContainer').innerHTML =
        '<div class="empty-state">Не загружены данные.</div>';
      return;
    }
    buildBookmakerOptions();
    buildSportOptions();
    buildEntityOptions();
    bind();
    render();
  });
})();
