(function () {
  'use strict';

  const state = {
    search: '',
    bookmakerId: '',
    activity: '',
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

  function splitFullName(fullName) {
    const parts = String(fullName).trim().split(/\s+/);
    if (parts.length <= 1) {
      return { line1: parts[0] || '', line2: '' };
    }
    const last = parts.pop();
    return { line1: parts.join(' '), line2: last };
  }

  function bookmakerName(id) {
    const m = BOOKMAKER_META[id];
    return m ? m.name : id;
  }

  function bookmakerLogo(id) {
    const m = BOOKMAKER_META[id];
    return m && m.logo ? m.logo : '';
  }

  function uniqueSorted(values) {
    return Array.from(new Set(values.filter(Boolean))).sort(function (a, b) {
      return a.localeCompare(b, 'ru');
    });
  }

  function buildFilterOptions() {
    const bmIds = Object.keys(BOOKMAKER_META).sort(function (a, b) {
      return bookmakerName(a).localeCompare(bookmakerName(b), 'ru');
    });
    const activities = uniqueSorted(AMBASSADORS.map(function (r) { return r.activity; }));

    const selBm = document.getElementById('filterBookmaker');
    const selAct = document.getElementById('filterActivity');

    selBm.innerHTML =
      '<option value="">Все букмекеры</option>' +
      bmIds
        .map(function (id) {
          return '<option value="' + escapeHtml(id) + '">' + escapeHtml(bookmakerName(id)) + '</option>';
        })
        .join('');

    selAct.innerHTML =
      '<option value="">Все виды деятельности</option>' +
      activities
        .map(function (a) {
          return '<option value="' + escapeHtml(a) + '">' + escapeHtml(a) + '</option>';
        })
        .join('');
  }

  function passesFilters(row) {
    if (state.bookmakerId && row.bookmakerId !== state.bookmakerId) return false;
    if (state.activity && row.activity !== state.activity) return false;
    if (state.search) {
      const q = state.search.toLowerCase();
      const hay = (row.fullName + ' ' + row.activity).toLowerCase();
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
      return a.fullName.localeCompare(b.fullName, 'ru');
    }
    if (key === 'name') {
      return a.fullName.localeCompare(b.fullName, 'ru') * dir;
    }
    if (key === 'activity') {
      const cmp = a.activity.localeCompare(b.activity, 'ru');
      if (cmp !== 0) return cmp * dir;
      return a.fullName.localeCompare(b.fullName, 'ru');
    }
    return 0;
  }

  function getFilteredSorted() {
    const list = AMBASSADORS.filter(passesFilters);
    list.sort(compareRows);
    return list;
  }

  function updateSortHeaders() {
    document.querySelectorAll('.th--sort').forEach(function (btn) {
      const key = btn.getAttribute('data-sort');
      const ind = btn.querySelector('.sort-ind');
      btn.classList.toggle('th--active', key === state.sortKey);
      if (ind) {
        ind.classList.remove('sort-ind--asc', 'sort-ind--desc');
        if (key === state.sortKey) {
          ind.classList.add(state.sortDir === 'asc' ? 'sort-ind--asc' : 'sort-ind--desc');
        }
      }
    });
  }

  function render() {
    const container = document.getElementById('rowsContainer');
    const countEl = document.getElementById('resultCount');
    const rows = getFilteredSorted();

    countEl.textContent = rows.length === AMBASSADORS.length
      ? 'Всего: ' + rows.length
      : 'Показано: ' + rows.length + ' из ' + AMBASSADORS.length;

    updateSortHeaders();

    if (!rows.length) {
      container.innerHTML = '<div class="empty-state">Никого не найдено. Измените фильтры или поиск.</div>';
      return;
    }

    container.innerHTML = rows
      .map(function (row) {
        const bm = bookmakerLogo(row.bookmakerId);
        const names = splitFullName(row.fullName);
        const logoHtml = bm
          ? '<div class="bm-logo-wrap"><img class="bm-logo" src="' +
            escapeHtml(bm) +
            '" alt="" width="27" height="27" loading="lazy" /></div>'
          : '<div class="bm-logo-wrap bm-logo-wrap--empty"></div>';

        return (
          '<div class="data-row" role="row">' +
          '<div class="cell cell--logo">' +
          logoHtml +
          '</div>' +
          '<div class="cell cell--person">' +
          '<img class="avatar" src="' +
          escapeHtml(row.photoUrl) +
          '" alt="" width="40" height="40" loading="lazy" />' +
          '<div class="name-lines">' +
          '<span class="name-line1">' +
          escapeHtml(names.line1) +
          '</span>' +
          (names.line2
            ? '<span class="name-line2">' + escapeHtml(names.line2) + '</span>'
            : '') +
          '</div></div>' +
          '<div class="cell cell--activity">' +
          escapeHtml(row.activity) +
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
      state.sortDir = 'asc';
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
    document.getElementById('filterActivity').addEventListener('change', function (e) {
      state.activity = e.target.value;
      render();
    });

    document.getElementById('resetFilters').addEventListener('click', function () {
      state.search = '';
      state.bookmakerId = '';
      state.activity = '';
      state.sortKey = 'bookmaker';
      state.sortDir = 'asc';
      document.getElementById('searchInput').value = '';
      document.getElementById('filterBookmaker').value = '';
      document.getElementById('filterActivity').value = '';
      render();
    });

    document.querySelectorAll('.th--sort').forEach(function (btn) {
      btn.addEventListener('click', function () {
        onSortClick(btn.getAttribute('data-sort'));
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (typeof AMBASSADORS === 'undefined' || typeof BOOKMAKER_META === 'undefined') {
      document.getElementById('rowsContainer').innerHTML =
        '<div class="empty-state">Не загружены данные.</div>';
      return;
    }
    buildFilterOptions();
    bind();
    render();
  });
})();
