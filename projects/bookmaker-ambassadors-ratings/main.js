(function () {
  'use strict';

  const state = {
    search: '',
    bookmakerId: '',
    activity: '',
    networkId: '',
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

  function formatFollowers(n) {
    if (n === null || n === undefined || Number.isNaN(n)) {
      return '—';
    }
    return Number(n).toLocaleString('ru-RU');
  }

  function networkIconHtml(networkId) {
    const meta = SOCIAL_NETWORK_META[networkId];
    if (!meta) {
      return '<span class="net-icon" title=""></span>';
    }
    if (meta.kind === 'img') {
      return (
        '<span class="net-icon" title="' +
        escapeHtml(meta.label) +
        '"><img src="' +
        escapeHtml(meta.src) +
        '" alt="" width="20" height="20" loading="lazy" /></span>'
      );
    }
    return (
      '<span class="net-icon" title="' + escapeHtml(meta.label) + '">' + meta.svg + '</span>'
    );
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
    const nets = uniqueSorted(AMBASSADORS.map(function (r) { return r.primaryNetwork; }));

    const selBm = document.getElementById('filterBookmaker');
    const selAct = document.getElementById('filterActivity');
    const selNet = document.getElementById('filterNetwork');

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

    selNet.innerHTML =
      '<option value="">Все соцсети</option>' +
      nets
        .map(function (nid) {
          const label = SOCIAL_NETWORK_META[nid] ? SOCIAL_NETWORK_META[nid].label : nid;
          return '<option value="' + escapeHtml(nid) + '">' + escapeHtml(label) + '</option>';
        })
        .join('');
  }

  function passesFilters(row) {
    if (state.bookmakerId && row.bookmakerId !== state.bookmakerId) return false;
    if (state.activity && row.activity !== state.activity) return false;
    if (state.networkId && row.primaryNetwork !== state.networkId) return false;
    if (state.search) {
      const q = state.search.toLowerCase();
      const hay = (row.fullName + ' ' + row.activity).toLowerCase();
      if (hay.indexOf(q) === -1) return false;
    }
    return true;
  }

  function followerSortValue(row) {
    if (row.followers === null || row.followers === undefined) return null;
    return Number(row.followers);
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
    if (key === 'social') {
      const cmp = String(a.primaryNetwork).localeCompare(String(b.primaryNetwork), 'ru');
      if (cmp !== 0) return cmp * dir;
      return a.fullName.localeCompare(b.fullName, 'ru');
    }
    if (key === 'followers') {
      const va = followerSortValue(a);
      const vb = followerSortValue(b);
      if (va === null && vb === null) return a.fullName.localeCompare(b.fullName, 'ru');
      if (va === null) return 1;
      if (vb === null) return -1;
      if (va !== vb) return (va - vb) * dir;
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
            '" alt="" width="40" height="40" loading="lazy" /></div>'
          : '<div class="bm-logo-wrap"></div>';

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
          '<div class="cell cell--net-icon">' +
          networkIconHtml(row.primaryNetwork) +
          '</div>' +
          '<div class="cell cell--followers">' +
          '<span class="followers-pill">' +
          formatFollowers(row.followers) +
          '</span></div>' +
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
      state.sortDir = key === 'followers' ? 'desc' : 'asc';
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
    document.getElementById('filterNetwork').addEventListener('change', function (e) {
      state.networkId = e.target.value;
      render();
    });

    document.getElementById('resetFilters').addEventListener('click', function () {
      state.search = '';
      state.bookmakerId = '';
      state.activity = '';
      state.networkId = '';
      state.sortKey = 'bookmaker';
      state.sortDir = 'asc';
      document.getElementById('searchInput').value = '';
      document.getElementById('filterBookmaker').value = '';
      document.getElementById('filterActivity').value = '';
      document.getElementById('filterNetwork').value = '';
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
