(function () {
  'use strict';

  const state = {
    search: '',
    bookmakerId: '',
    activity: '',
    sortKey: 'bookmaker',
    sortDir: 'asc',
    bookmakerPanelOpen: false,
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

  function bmLogoCircleHtml(logoUrl, sizeClass) {
    const cls = 'bm-logo-wrap' + (sizeClass ? ' ' + sizeClass : '');
    if (!logoUrl) {
      return '<div class="' + cls + ' bm-logo-wrap--empty"></div>';
    }
    return (
      '<div class="' +
      cls +
      '"><img class="bm-logo" src="' +
      escapeHtml(logoUrl) +
      '" alt="" loading="lazy" /></div>'
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

  function buildBookmakerDropdown() {
    const panel = document.getElementById('bookmakerSelectPanel');
    const bmIds = getSortedBookmakerIds();

    const allRow =
      '<button type="button" class="bm-select-option bm-select-option--all" role="option" data-bookmaker-id="" aria-selected="' +
      (state.bookmakerId === '' ? 'true' : 'false') +
      '">Все букмекеры</button>';

    const rows = bmIds
      .map(function (id) {
        const logo = bookmakerLogo(id);
        const sel = state.bookmakerId === id ? 'true' : 'false';
        return (
          '<button type="button" class="bm-select-option" role="option" data-bookmaker-id="' +
          escapeHtml(id) +
          '" aria-selected="' +
          sel +
          '">' +
          bmLogoCircleHtml(logo, 'bm-logo-wrap--in-dropdown') +
          '<span class="bm-select-option-text">' +
          escapeHtml(bookmakerName(id)) +
          '</span></button>'
        );
      })
      .join('');

    panel.innerHTML = allRow + rows;
  }

  function syncBookmakerTrigger() {
    const hidden = document.getElementById('filterBookmaker');
    const labelEl = document.getElementById('bookmakerTriggerLabel');
    const logoSlot = document.getElementById('bookmakerTriggerLogo');
    hidden.value = state.bookmakerId;

    if (!state.bookmakerId) {
      labelEl.textContent = 'Все букмекеры';
      logoSlot.innerHTML = '';
      logoSlot.classList.add('bm-select-trigger-logo--empty');
      return;
    }
    labelEl.textContent = bookmakerName(state.bookmakerId);
    logoSlot.classList.remove('bm-select-trigger-logo--empty');
    logoSlot.innerHTML = bmLogoCircleHtml(bookmakerLogo(state.bookmakerId), 'bm-logo-wrap--in-trigger');
  }

  function setBookmakerPanelOpen(open) {
    state.bookmakerPanelOpen = open;
    const panel = document.getElementById('bookmakerSelectPanel');
    const trigger = document.getElementById('bookmakerSelectTrigger');
    const wrap = document.querySelector('.filter-field--bookmaker');
    trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    panel.hidden = !open;
    if (wrap) {
      wrap.classList.toggle('is-open', open);
    }
    if (open) {
      buildBookmakerDropdown();
    }
  }

  function getEventTargetElement(e) {
    let t = e.target;
    while (t && t.nodeType !== 1) {
      t = t.parentElement;
    }
    return t;
  }

  function closeBookmakerPanelIfClickOutside(e) {
    if (!state.bookmakerPanelOpen) return;
    const root = document.getElementById('bookmakerSelectRoot');
    if (!root) return;
    const t = getEventTargetElement(e);
    if (!t || root.contains(t)) return;
    setBookmakerPanelOpen(false);
  }

  function buildActivityOptions() {
    const activities = uniqueSorted(AMBASSADORS.map(function (r) { return r.activity; }));
    const selAct = document.getElementById('filterActivity');
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
        const logoHtml = bmLogoCircleHtml(bm, 'bm-logo-wrap--in-table');
        const bmLabel = escapeHtml(bookmakerName(row.bookmakerId));

        const nameLinesClass = 'name-lines' + (names.line2 ? '' : ' name-lines--single');

        return (
          '<div class="data-row" role="row">' +
          '<div class="cell cell--bookmaker">' +
          logoHtml +
          '<span class="bookmaker-cell-name">' +
          bmLabel +
          '</span></div>' +
          '<div class="cell cell--person">' +
          '<img class="avatar" src="' +
          escapeHtml(row.photoUrl) +
          '" alt="" width="40" height="40" loading="lazy" />' +
          '<div class="' +
          nameLinesClass +
          '">' +
          '<span class="name-line name-line--given">' +
          escapeHtml(names.line1) +
          '</span>' +
          (names.line2
            ? '<span class="name-line name-line--family">' + escapeHtml(names.line2) + '</span>'
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

  function bindBookmakerSelect() {
    const trigger = document.getElementById('bookmakerSelectTrigger');
    const panel = document.getElementById('bookmakerSelectPanel');

    trigger.addEventListener('click', function () {
      setBookmakerPanelOpen(!state.bookmakerPanelOpen);
    });

    panel.addEventListener('click', function (e) {
      const btn = e.target.closest('.bm-select-option');
      if (!btn) return;
      const id = btn.getAttribute('data-bookmaker-id') || '';
      state.bookmakerId = id;
      syncBookmakerTrigger();
      setBookmakerPanelOpen(false);
      render();
    });

    const roots = [document, window];
    const types = ['pointerdown', 'mousedown', 'touchstart', 'click'];
    roots.forEach(function (rootEl) {
      types.forEach(function (type) {
        const opts = type === 'touchstart' ? { capture: true, passive: true } : true;
        rootEl.addEventListener(type, closeBookmakerPanelIfClickOutside, opts);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && state.bookmakerPanelOpen) {
        setBookmakerPanelOpen(false);
      }
    });
  }

  function bind() {
    document.getElementById('searchInput').addEventListener('input', function (e) {
      state.search = e.target.value.trim();
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
      document.getElementById('filterActivity').value = '';
      syncBookmakerTrigger();
      setBookmakerPanelOpen(false);
      render();
    });

    document.querySelectorAll('.th--sort').forEach(function (btn) {
      btn.addEventListener('click', function () {
        onSortClick(btn.getAttribute('data-sort'));
      });
    });

    bindBookmakerSelect();
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (typeof AMBASSADORS === 'undefined' || typeof BOOKMAKER_META === 'undefined') {
      document.getElementById('rowsContainer').innerHTML =
        '<div class="empty-state">Не загружены данные.</div>';
      return;
    }
    buildActivityOptions();
    syncBookmakerTrigger();
    bind();
    render();
  });
})();
