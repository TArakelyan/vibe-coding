(function () {
  var state = {
    displayMode: (CONFIG && CONFIG.display && CONFIG.display.defaultMode) || 'odds',
    sortType: 'date',
    sortDirection: 'desc',
    selectedSports: [],
    selectedTournaments: [],
    search: '',
    expandAll: false,
    expandedIds: {},
  };

  var sportTournamentMap = {};
  var logoPrefetchCache = Object.create(null);
  var logoPrefetchQueue = [];
  var logoPrefetchInflight = 0;
  var LOGO_PREFETCH_LIMIT = 6;
  var VISIBLE_LOGO_EAGER_COUNT = 24;
  var HIGH_PRIORITY_LOGO_COUNT = 8;

  function scheduleLogoPrefetch(url, priority) {
    if (!url) return;
    if (logoPrefetchCache[url] === 'loaded' || logoPrefetchCache[url] === 'loading') {
      return;
    }

    logoPrefetchQueue.push({ url: url, priority: priority || 'auto' });
    logoPrefetchQueue.sort(function (a, b) {
      var rank = { high: 0, auto: 1, low: 2 };
      return (rank[a.priority] || 1) - (rank[b.priority] || 1);
    });
    drainLogoPrefetchQueue();
  }

  function drainLogoPrefetchQueue() {
    while (logoPrefetchInflight < LOGO_PREFETCH_LIMIT && logoPrefetchQueue.length) {
      var item = logoPrefetchQueue.shift();
      if (logoPrefetchCache[item.url] === 'loaded' || logoPrefetchCache[item.url] === 'loading') {
        continue;
      }

      logoPrefetchCache[item.url] = 'loading';
      logoPrefetchInflight++;
      var img = new Image();
      if (item.priority && 'fetchPriority' in img) {
        img.fetchPriority = item.priority;
      }

      var done = function (url) {
        return function () {
          logoPrefetchCache[url] = 'loaded';
          logoPrefetchInflight--;
          drainLogoPrefetchQueue();
        };
      };

      img.onload = done(item.url);
      img.onerror = done(item.url);
      img.src = item.url;
    }
  }

  function prefetchVisibleRowLogos(list) {
    for (var i = 0; i < list.length && i < VISIBLE_LOGO_EAGER_COUNT; i++) {
      var url = list[i].image;
      if (url) {
        scheduleLogoPrefetch(url, i < HIGH_PRIORITY_LOGO_COUNT ? 'high' : 'auto');
      }
    }
  }

  function getAvatarLoadingAttrs(index, hasImage) {
    if (!hasImage) return '';
    if (index < HIGH_PRIORITY_LOGO_COUNT) {
      return ' loading="eager" decoding="async" fetchpriority="high"';
    }
    if (index < VISIBLE_LOGO_EAGER_COUNT) {
      return ' loading="eager" decoding="async"';
    }
    return ' loading="lazy" decoding="async"';
  }

  function $(id) {
    return document.getElementById(id);
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function formatDate(dateString) {
    var months = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
    ];
    var parts = dateString.split('.');
    var day = parseInt(parts[0], 10);
    var monthIndex = parseInt(parts[1], 10) - 1;
    var year = parts[2];
    return day + ' ' + months[monthIndex] + ' ' + year;
  }

  function formatProbability(odds) {
    var probabilityNum = (1 / odds) * 100;
    var probability;

    if (probabilityNum % 1 === 0) {
      probability = probabilityNum.toString();
    } else if ((probabilityNum * 10) % 1 === 0) {
      probability = probabilityNum.toFixed(1);
    } else {
      probability = probabilityNum.toFixed(2);
    }

    return probability.replace('.', ',');
  }

  function parseDate(dateString) {
    return new Date(dateString.split('.').reverse().join('-'));
  }

  function getSportsInData() {
    var sports = {};
    allChampionsData.forEach(function (c) {
      sports[c.sport] = true;
    });
    return Object.keys(sports);
  }

  function getTournamentsInData() {
    var tournaments = {};
    allChampionsData.forEach(function (c) {
      tournaments[c.tournament] = true;
    });
    return Object.keys(tournaments);
  }

  function buildSportTournamentMap() {
    allChampionsData.forEach(function (c) {
      if (!sportTournamentMap[c.sport]) sportTournamentMap[c.sport] = {};
      sportTournamentMap[c.sport][c.tournament] = true;
    });
  }

  function getSportLabel(key) {
    return CONFIG.sports[key] ? CONFIG.sports[key].name : key;
  }

  function getTournamentLabel(key) {
    return CONFIG.tournaments[key] ? CONFIG.tournaments[key].name : key;
  }

  function renderTournamentCell(champion) {
    return escapeHtml(getTournamentDisplayName(champion));
  }

  function getCalendarYear(dateString) {
    return parseInt(dateString.split('.')[2], 10);
  }

  function getSeasonShort(dateString) {
    var parts = dateString.split('.');
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[2], 10);

    if (month >= 7) {
      var endShort = (year + 1) % 100;
      return year + '/' + (endShort < 10 ? '0' + endShort : endShort);
    }

    var start = year - 1;
    var endShort = year % 100;
    return start + '/' + (endShort < 10 ? '0' + endShort : endShort);
  }

  function getSeasonFull(dateString) {
    var parts = dateString.split('.');
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[2], 10);

    if (month >= 7) {
      return year + '/' + (year + 1);
    }

    return (year - 1) + '/' + year;
  }

  function getEventYear(dateString, tournament) {
    var year = getCalendarYear(dateString);

    if ((tournament === 'euro' || tournament === 'olympics') && year === 2021) {
      return 2020;
    }

    return year;
  }

  var SEASON_TOURNAMENTS = {
    epl: 'АПЛ',
    bundesliga: 'Бундеслига',
    seria_a: 'Серия А',
    ligue_1: 'Лига 1',
    laliga: 'Ла Лига',
    ucl: 'Лига чемпионов',
    conference_league: 'Лига конференций',
    europa_league: 'Лига Европы',
    euroleague: 'Евролига',
    vtb_league: 'Единая Лига ВТБ',
    fa_cup: 'Кубок Англии',
    russian_cup: 'Кубок России',
    uefa_cup: 'Кубок УЕФА',
  };

  var YEAR_TOURNAMENTS = {
    australian_open: 'Australian Open',
    wimbledon: 'Уимблдон',
    roland_garros: 'Ролан Гаррос',
    us_open: 'US Open',
    copa_america: 'Копа Америка',
    the_international: 'The International',
    stanley_cup: 'Кубок Стэнли',
    gagarin_cup: 'Кубок Гагарина',
    basketball_wc: 'ЧМ по баскетболу',
    hockey_wc: 'ЧМ по хоккею',
    eurobasket: 'Евробаскет',
    mls: 'МЛС',
    mlb: 'МЛБ',
    nba_cup: 'Кубок НБА',
    darts_wc: 'ЧМ по дартсу',
    formula1: 'Формула-1',
  };

  function getTournamentDisplayName(champion) {
    var tournament = champion.tournament;
    var date = champion.date;
    var year = getEventYear(date, tournament);
    var seasonShort = getSeasonShort(date);
    var seasonFull = getSeasonFull(date);

    if (tournament === 'nfl') {
      return 'Супербоул ' + year;
    }

    if (tournament === 'football_wc') {
      return 'ЧМ ' + year + ' по футболу';
    }

    if (tournament === 'euro') {
      return 'Евро ' + year;
    }

    if (tournament === 'olympics') {
      return 'Олимпиада ' + year;
    }

    if (tournament === 'nba') {
      return 'НБА ' + seasonShort;
    }

    if (tournament === 'atp_finals') {
      return 'Итоговый ATP ' + year;
    }

    if (tournament === 'wta_finals') {
      return 'Итоговый WTA ' + year;
    }

    if (tournament === 'rpl') {
      if (year <= 2010) {
        return 'РПЛ ' + year;
      }
      return 'РПЛ ' + seasonFull;
    }

    if (SEASON_TOURNAMENTS[tournament]) {
      return SEASON_TOURNAMENTS[tournament] + ' ' + seasonShort;
    }

    if (YEAR_TOURNAMENTS[tournament]) {
      return YEAR_TOURNAMENTS[tournament] + ' ' + year;
    }

    return getTournamentLabel(tournament) + ' ' + year;
  }

  function getDisplayValue(champion) {
    if (state.displayMode === 'odds') {
      return champion.odds.toFixed(2);
    }
    return formatProbability(champion.odds) + '%';
  }

  function getValueColumnTitle() {
    return state.displayMode === 'odds' ? 'Коэффициент' : 'Вероятность';
  }

  function getAvailableTournaments() {
    var available = {};
    if (state.selectedSports.length === 0) {
      getTournamentsInData().forEach(function (key) {
        available[key] = true;
      });
    } else {
      state.selectedSports.forEach(function (sport) {
        if (sportTournamentMap[sport]) {
          Object.keys(sportTournamentMap[sport]).forEach(function (t) {
            available[t] = true;
          });
        }
      });
    }
    return available;
  }

  function getAvailableSports() {
    var available = {};
    if (state.selectedTournaments.length === 0) {
      getSportsInData().forEach(function (key) {
        available[key] = true;
      });
    } else {
      state.selectedTournaments.forEach(function (tournament) {
        allChampionsData.forEach(function (c) {
          if (c.tournament === tournament) {
            available[c.sport] = true;
          }
        });
      });
    }
    return available;
  }

  function pruneIncompatibleFilters() {
    if (state.selectedSports.length > 0 && state.selectedTournaments.length > 0) {
      var availableTournaments = getAvailableTournaments();
      state.selectedTournaments = state.selectedTournaments.filter(function (t) {
        return availableTournaments[t];
      });

      var availableSports = getAvailableSports();
      state.selectedSports = state.selectedSports.filter(function (s) {
        return availableSports[s];
      });
    }
  }

  function sortChampions(list) {
    return list.slice().sort(function (a, b) {
      var valueA;
      var valueB;

      if (state.sortType === 'odds') {
        valueA = a.odds;
        valueB = b.odds;
      } else {
        valueA = parseDate(a.date);
        valueB = parseDate(b.date);
      }

      if (state.sortDirection === 'asc') {
        return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
      }
      return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
    });
  }

  function filterChampions() {
    var query = state.search.toLowerCase().trim();

    return sortChampions(
      allChampionsData.filter(function (c) {
        var searchMatch = !query || matchesChampionSearch(c.name, query);
        var sportMatch = state.selectedSports.length === 0 || state.selectedSports.indexOf(c.sport) !== -1;
        var tournamentMatch =
          state.selectedTournaments.length === 0 || state.selectedTournaments.indexOf(c.tournament) !== -1;
        return searchMatch && sportMatch && tournamentMatch;
      })
    );
  }

  function getDropdownLabel(type) {
    var selected = type === 'sport' ? state.selectedSports : state.selectedTournaments;
    if (selected.length === 0) {
      return type === 'sport' ? 'Вид спорта' : 'Турнир';
    }

    if (selected.length === 1) {
      return type === 'sport' ? getSportLabel(selected[0]) : getTournamentLabel(selected[0]);
    }
    return 'Выбрано: ' + selected.length;
  }

  function updateExpandAllButton() {
    var btn = $('expandAllBtn');
    if (!btn) return;

    btn.setAttribute('aria-expanded', state.expandAll ? 'true' : 'false');
    btn.textContent = state.expandAll ? '−' : '+';
    btn.setAttribute('aria-label', state.expandAll ? 'Скрыть все описания' : 'Показать все описания');
  }

  function isExpanded(id) {
    return state.expandAll || !!state.expandedIds[id];
  }

  function toggleExpanded(id) {
    if (state.expandAll) {
      state.expandAll = false;
      state.expandedIds = {};
      filterChampions().forEach(function (champion) {
        if (champion.id !== id) {
          state.expandedIds[champion.id] = true;
        }
      });
      return 'all';
    }

    if (state.expandedIds[id]) {
      delete state.expandedIds[id];
    } else {
      state.expandedIds[id] = true;
    }

    return 'one';
  }

  function triggerResize() {
    if (typeof resize === 'function') {
      resize({ force: true });
    }
  }

  function applyLogoScale(img, scale) {
    if (scale < 0.98 || scale > 1.02) {
      img.style.transform = 'scale(' + scale.toFixed(2) + ')';
    } else {
      img.style.transform = '';
    }
  }

  function getLogoScale(url) {
    if (!url || typeof LOGO_SCALES === 'undefined') return 1;
    return LOGO_SCALES[url] || 1;
  }

  function normalizeLogoImage(img) {
    if (!img || !img.classList.contains('winners-row__avatar--logo')) return;
    applyLogoScale(img, getLogoScale(img.getAttribute('src') || img.src));
  }

  function normalizeLogosIn(root) {
    if (!root) return;
    root.querySelectorAll('.winners-row__avatar--logo').forEach(normalizeLogoImage);
  }

  function buildDetailRowHtml(champion) {
    return (
      '<tr class="winners-detail-row is-visible" data-detail-for="' + escapeHtml(champion.id) + '">' +
        '<td colspan="3">' +
          '<div class="winners-detail">' +
            '<p class="winners-detail__text">' + escapeHtml(champion.description) + '</p>' +
          '</div>' +
        '</td>' +
      '</tr>'
    );
  }

  function findChampionById(id) {
    if (typeof allChampionsData === 'undefined') return null;
    for (var i = 0; i < allChampionsData.length; i++) {
      if (allChampionsData[i].id === id) return allChampionsData[i];
    }
    return null;
  }

  function ensureDetailRow(tbody, row, id, expanded) {
    var detailRow = tbody.querySelector('.winners-detail-row[data-detail-for="' + id + '"]');
    if (!expanded) {
      if (detailRow) detailRow.classList.remove('is-visible');
      return;
    }

    if (detailRow) {
      detailRow.classList.add('is-visible');
      return;
    }

    var champion = findChampionById(id);
    if (!champion) return;
    row.insertAdjacentHTML('afterend', buildDetailRowHtml(champion));
  }

  function renderTable() {
    var tbody = $('winnersTableBody');
    var valueHead = $('valueColumnHead');
    if (!tbody) return;

    if (valueHead) {
      var longEl = valueHead.querySelector('.head-long');
      var shortEl = valueHead.querySelector('.head-short');
      if (longEl) longEl.textContent = getValueColumnTitle();
      if (shortEl) shortEl.textContent = state.displayMode === 'odds' ? 'Кэф' : '%';
    }

    var list = filterChampions();
    prefetchVisibleRowLogos(list);

    if (list.length === 0) {
      tbody.innerHTML =
        '<tr><td colspan="3" class="winners-empty">Ничего не найдено</td></tr>';
      updateExpandAllButton();
      return;
    }

    var html = '';

    list.forEach(function (champion, index) {
      var expanded = isExpanded(champion.id);
      var stripeClass = index % 2 === 0 ? ' winners-row--even' : ' winners-row--odd';
      var tournamentHtml = renderTournamentCell(champion);
      var displayValue = getDisplayValue(champion);
      var avatarClass = 'winners-row__avatar';
      if (champion.imageShape === 'logo') {
        avatarClass += ' winners-row__avatar--logo';
      }
      var avatarHtml = champion.image
        ? (function () {
            var logoScale = champion.imageShape === 'logo' ? getLogoScale(champion.image) : 1;
            var logoStyle = logoScale < 0.98 || logoScale > 1.02
              ? ' style="transform:scale(' + logoScale.toFixed(2) + ')"'
              : '';
            var loadingAttrs = getAvatarLoadingAttrs(index, true);
            return champion.imageShape === 'logo'
              ? '<span class="winners-row__logo-wrap"><img class="' + avatarClass + '" src="' + escapeHtml(champion.image) + '" alt=""' + loadingAttrs + logoStyle + ' /></span>'
              : '<img class="' + avatarClass + '" src="' + escapeHtml(champion.image) + '" alt=""' + loadingAttrs + ' />';
          })()
        : '<span class="winners-row__avatar winners-row__avatar--empty" aria-hidden="true"></span>';

      html +=
        '<tr class="winners-row' + (expanded ? ' is-expanded' : '') + stripeClass + '" data-id="' + escapeHtml(champion.id) + '">' +
          '<td class="winners-row__name">' +
            '<div class="winners-row__name-cell">' +
              avatarHtml +
              '<span class="winners-row__name-text">' + escapeHtml(champion.name) + '</span>' +
            '</div>' +
          '</td>' +
          '<td class="winners-row__tournament">' + tournamentHtml + '</td>' +
          '<td class="winners-row__value">' + displayValue + '</td>' +
        '</tr>';

      if (expanded) {
        html += buildDetailRowHtml(champion);
      }
    });

    tbody.innerHTML = html;
    normalizeLogosIn(tbody);
    updateExpandAllButton();
  }

  function getDropdownPanelIds(type) {
    return type === 'sport'
      ? ['sportDropdownPanel', 'sportDropdownPanelMobile']
      : ['tournamentDropdownPanel', 'tournamentDropdownPanelMobile'];
  }

  function buildDropdownOptionsHtml(type) {
    var keys = type === 'sport' ? getSportsInData() : getTournamentsInData();
    var selected = type === 'sport' ? state.selectedSports : state.selectedTournaments;
    var available = type === 'sport' ? getAvailableSports() : getAvailableTournaments();

    keys.sort(function (a, b) {
      var labelA = type === 'sport' ? getSportLabel(a) : getTournamentLabel(a);
      var labelB = type === 'sport' ? getSportLabel(b) : getTournamentLabel(b);
      return labelA.localeCompare(labelB, 'ru');
    });

    var html = '<button type="button" class="winners-dropdown__option' + (selected.length === 0 ? ' is-selected' : '') + '" data-value="">Все</button>';

    keys.forEach(function (key) {
      if (available && !available[key]) return;
      var label = type === 'sport' ? getSportLabel(key) : getTournamentLabel(key);
      var isSelected = selected.indexOf(key) !== -1;
      html +=
        '<button type="button" class="winners-dropdown__option' + (isSelected ? ' is-selected' : '') + '" data-value="' + escapeHtml(key) + '">' +
          escapeHtml(label) +
        '</button>';
    });

    return html;
  }

  function handleDropdownOptionClick(type, value) {
    if (type === 'sport') {
      if (!value) {
        state.selectedSports = [];
      } else {
        var sportIdx = state.selectedSports.indexOf(value);
        if (sportIdx === -1) state.selectedSports.push(value);
        else state.selectedSports.splice(sportIdx, 1);
      }
    } else if (!value) {
      state.selectedTournaments = [];
    } else {
      var tournamentIdx = state.selectedTournaments.indexOf(value);
      if (tournamentIdx === -1) state.selectedTournaments.push(value);
      else state.selectedTournaments.splice(tournamentIdx, 1);
    }

    pruneIncompatibleFilters();

    updateDropdownLabels();
    renderDropdownOptions('sport');
    renderDropdownOptions('tournament');
    renderTable();
  }

  function bindDropdownPanel(panel, type, html) {
    panel.innerHTML = html;

    panel.querySelectorAll('.winners-dropdown__option').forEach(function (btn) {
      btn.addEventListener('click', function (event) {
        event.stopPropagation();
        handleDropdownOptionClick(type, btn.getAttribute('data-value'));
      });
    });
  }

  function renderDropdownOptions(type) {
    var html = buildDropdownOptionsHtml(type);

    getDropdownPanelIds(type).forEach(function (panelId) {
      var panel = $(panelId);
      if (!panel) return;
      bindDropdownPanel(panel, type, html);
    });
  }

  function updateDropdownLabels() {
    var sportText = getDropdownLabel('sport');
    var tournamentText = getDropdownLabel('tournament');
    var sportLabels = [$('sportDropdownLabel'), $('sportDropdownLabelMobile')];
    var tournamentLabels = [$('tournamentDropdownLabel'), $('tournamentDropdownLabelMobile')];

    sportLabels.forEach(function (el) {
      if (el) el.textContent = sportText;
    });

    tournamentLabels.forEach(function (el) {
      if (el) el.textContent = tournamentText;
    });
  }

  function closeAllDropdowns() {
    document.querySelectorAll('.winners-dropdown.is-open').forEach(function (el) {
      el.classList.remove('is-open');
    });
  }

  function closeMobileFiltersPanel() {
    var btn = $('mobileFiltersBtn');
    var panel = $('mobileFiltersPanel');
    if (!panel || !panel.classList.contains('is-open')) return;

    panel.classList.remove('is-open');
    if (btn) {
      btn.classList.remove('is-active');
      btn.setAttribute('aria-expanded', 'false');
    }
  }

  function initFiltersScrollClose() {
    window.addEventListener('scroll', closeAllDropdowns, { passive: true });
  }

  function initDropdowns() {
    document.querySelectorAll('.winners-dropdown__trigger').forEach(function (trigger) {
      trigger.addEventListener('click', function (event) {
        event.stopPropagation();
        var dropdown = trigger.closest('.winners-dropdown');
        var wasOpen = dropdown.classList.contains('is-open');
        closeAllDropdowns();
        if (!wasOpen) dropdown.classList.add('is-open');
      });
    });

    document.addEventListener('click', closeAllDropdowns);
    renderDropdownOptions('sport');
    renderDropdownOptions('tournament');
    updateDropdownLabels();
  }

  function setDisplayMode(mode) {
    state.displayMode = mode;
    document.querySelectorAll('.winners-segment__btn').forEach(function (b) {
      b.classList.toggle('is-active', b.getAttribute('data-mode') === mode);
    });
    renderTable();
  }

  function initSegment() {
    document.querySelectorAll('.winners-segment__btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setDisplayMode(btn.getAttribute('data-mode'));
      });
    });
  }

  function setSort(sort, direction) {
    state.sortType = sort;
    state.sortDirection = direction;
    document.querySelectorAll('.winners-sort-btn').forEach(function (b) {
      var isActive = b.getAttribute('data-sort') === sort;
      b.classList.toggle('is-active', isActive);
      b.classList.toggle('is-asc', isActive && direction === 'asc');
      b.classList.toggle('is-desc', isActive && direction === 'desc');
    });
    renderTable();
  }

  function initSort() {
    document.querySelectorAll('.winners-sort-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var sort = btn.getAttribute('data-sort');
        var isSame = state.sortType === sort;
        var direction;

        if (isSame) {
          direction = state.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
          direction = sort === 'date' ? 'desc' : 'asc';
        }

        setSort(sort, direction);
      });
    });

    setSort(state.sortType, state.sortDirection);
  }

  function initSearch() {
    var inputs = [ $('championSearch'), $('championSearchMobile') ];
    inputs.forEach(function (input) {
      if (!input) return;
      input.addEventListener('input', function () {
        state.search = input.value;
        var other = input.id === 'championSearch' ? $('championSearchMobile') : $('championSearch');
        if (other && other.value !== input.value) other.value = input.value;
        renderTable();
      });
    });
  }

  function initExpandAll() {
    var btn = $('expandAllBtn');
    if (!btn || btn.dataset.bound === '1') return;

    btn.dataset.bound = '1';
    btn.addEventListener('click', function (event) {
      event.stopPropagation();
      state.expandAll = !state.expandAll;
      if (!state.expandAll) {
        state.expandedIds = {};
      }
      renderTable();
      triggerResize();
    });
  }

  function initRowToggles() {
    var tbody = $('winnersTableBody');
    if (!tbody || tbody.dataset.toggleBound === '1') return;

    tbody.dataset.toggleBound = '1';
    tbody.addEventListener('click', function (event) {
      if (event.target.closest('a')) return;

      var row = event.target.closest('.winners-row');
      if (!row) return;

      var id = row.getAttribute('data-id');
      if (!id) return;

      var mode = toggleExpanded(id);

      if (mode === 'all') {
        renderTable();
      } else {
        var expanded = isExpanded(id);
        row.classList.toggle('is-expanded', expanded);
        ensureDetailRow(tbody, row, id, expanded);
      }

      updateExpandAllButton();
      triggerResize();
    });
  }

  function initMobileFilters() {
    var btn = $('mobileFiltersBtn');
    var panel = $('mobileFiltersPanel');
    if (!btn || !panel) return;

    btn.addEventListener('click', function () {
      var open = panel.classList.toggle('is-open');
      btn.classList.toggle('is-active', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  function renderIntro() {
    var grid = $('winnersIntroGrid');
    if (!grid || typeof winnersIntroSteps === 'undefined') {
      return;
    }

    var html = '';
    winnersIntroSteps.forEach(function (step) {
      var iconSize = step.number === 3 ? 28 : 37;
      html +=
        '<li class="winners-intro__card">' +
          '<img class="winners-intro__icon" src="' + escapeHtml(step.icon) + '" alt="" width="' + iconSize + '" height="' + iconSize + '" loading="lazy" decoding="async" aria-hidden="true" />' +
          '<p class="winners-intro__text">' + escapeHtml(step.text) + '</p>' +
        '</li>';
    });
    grid.innerHTML = html;
  }

  function initToolbarUnderlay() {
    var intro = document.querySelector('.winners-intro');
    var toolbars = document.querySelectorAll('.winners-toolbar');
    if (!intro || !toolbars.length) {
      return;
    }

    var setFloating = function (floating) {
      toolbars.forEach(function (toolbar) {
        toolbar.classList.toggle('is-floating', floating);
      });
    };

    if (typeof IntersectionObserver === 'undefined') {
      var onScroll = function () {
        var rect = intro.getBoundingClientRect();
        setFloating(rect.bottom <= 0);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          setFloating(!entry.isIntersecting);
        });
      },
      { threshold: 0 }
    );

    observer.observe(intro);
  }

  function init() {
    renderIntro();

    if (typeof allChampionsData === 'undefined' || typeof CONFIG === 'undefined') {
      var tbody = $('winnersTableBody');
      if (tbody) {
        tbody.innerHTML = '<tr><td colspan="3" class="winners-empty">Не удалось загрузить данные.</td></tr>';
      }
      return;
    }

    buildSportTournamentMap();
    initSegment();
    initSort();
    initDropdowns();
    initSearch();
    initMobileFilters();
    initToolbarUnderlay();
    initFiltersScrollClose();
    initExpandAll();
    initRowToggles();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
