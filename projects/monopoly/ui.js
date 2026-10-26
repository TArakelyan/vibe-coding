const BOARD_LAYOUT = {
  0: { row: 11, col: 11, edge: 'corner-br' },
  1: { row: 11, col: 10, edge: 'bottom' },
  2: { row: 11, col: 9, edge: 'bottom' },
  3: { row: 11, col: 8, edge: 'bottom' },
  4: { row: 11, col: 7, edge: 'bottom' },
  5: { row: 11, col: 6, edge: 'bottom' },
  6: { row: 11, col: 5, edge: 'bottom' },
  7: { row: 11, col: 4, edge: 'bottom' },
  8: { row: 11, col: 3, edge: 'bottom' },
  9: { row: 11, col: 2, edge: 'bottom' },
  10: { row: 11, col: 1, edge: 'corner-bl' },
  11: { row: 10, col: 1, edge: 'left' },
  12: { row: 9, col: 1, edge: 'left' },
  13: { row: 8, col: 1, edge: 'left' },
  14: { row: 7, col: 1, edge: 'left' },
  15: { row: 6, col: 1, edge: 'left' },
  16: { row: 5, col: 1, edge: 'left' },
  17: { row: 4, col: 1, edge: 'left' },
  18: { row: 3, col: 1, edge: 'left' },
  19: { row: 2, col: 1, edge: 'left' },
  20: { row: 1, col: 1, edge: 'corner-tl' },
  21: { row: 1, col: 2, edge: 'top' },
  22: { row: 1, col: 3, edge: 'top' },
  23: { row: 1, col: 4, edge: 'top' },
  24: { row: 1, col: 5, edge: 'top' },
  25: { row: 1, col: 6, edge: 'top' },
  26: { row: 1, col: 7, edge: 'top' },
  27: { row: 1, col: 8, edge: 'top' },
  28: { row: 1, col: 9, edge: 'top' },
  29: { row: 1, col: 10, edge: 'top' },
  30: { row: 1, col: 11, edge: 'corner-tr' },
  31: { row: 2, col: 11, edge: 'right' },
  32: { row: 3, col: 11, edge: 'right' },
  33: { row: 4, col: 11, edge: 'right' },
  34: { row: 5, col: 11, edge: 'right' },
  35: { row: 6, col: 11, edge: 'right' },
  36: { row: 7, col: 11, edge: 'right' },
  37: { row: 8, col: 11, edge: 'right' },
  38: { row: 9, col: 11, edge: 'right' },
  39: { row: 10, col: 11, edge: 'right' },
};

(function () {
  const els = {
    setup: document.getElementById('setup-screen'),
    game: document.getElementById('game-screen'),
    board: document.getElementById('board'),
    playersPanel: document.getElementById('players-panel'),
    log: document.getElementById('game-log'),
    dice: document.getElementById('dice-display'),
    actions: document.getElementById('action-panel'),
    status: document.getElementById('status-text'),
    playerCount: document.getElementById('player-count'),
    playerNames: document.getElementById('player-names'),
    startBtn: document.getElementById('start-btn'),
    rollBtn: document.getElementById('roll-btn'),
    endBtn: document.getElementById('end-btn'),
  };

  function formatMoney(n) {
    return MonopolyGame.formatMoney(n);
  }

  function buildBoard() {
    els.board.innerHTML = '<div class="board__center" id="board-center"></div>';

    BOARD_SPACES.forEach((space) => {
      const layout = BOARD_LAYOUT[space.id];
      const cell = document.createElement('div');
      cell.className = 'board__cell board__cell--' + layout.edge;
      cell.style.gridRow = layout.row;
      cell.style.gridColumn = layout.col;
      cell.dataset.spaceId = space.id;

      let colorBar = '';
      if (space.group) {
        colorBar = '<div class="cell__color" style="background:' + PROPERTY_GROUPS[space.group].color + '"></div>';
      } else if (space.type === 'railroad') {
        colorBar = '<div class="cell__color cell__color--rail"></div>';
      } else if (space.type === 'utility') {
        colorBar = '<div class="cell__color cell__color--util"></div>';
      }

      const priceHtml = space.price
        ? '<div class="cell__price">' + new Intl.NumberFormat('ru-RU').format(space.price) + ' ֏</div>'
        : '';

      cell.innerHTML =
        colorBar +
        '<div class="cell__name">' + space.name + '</div>' +
        priceHtml +
        '<div class="cell__houses" data-houses></div>' +
        '<div class="cell__tokens" data-tokens></div>';

      els.board.appendChild(cell);
    });
  }

  function renderPlayerInputs(count) {
    els.playerNames.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const label = document.createElement('label');
      label.className = 'setup__label';
      label.innerHTML =
        'Игрок ' + (i + 1) + ' ' + GAME_CONFIG.playerTokens[i] +
        '<input type="text" class="setup__input" value="Игрок ' + (i + 1) + '" data-player-name />';
      els.playerNames.appendChild(label);
    }
  }

  function render() {
    const state = MonopolyGame.getState();
    if (!state) return;

    renderBoard(state);
    renderPlayers(state);
    renderLog(state);
    renderActions(state);
    renderCenter(state);
  }

  function renderBoard(state) {
    BOARD_SPACES.forEach((space) => {
      const cell = els.board.querySelector('[data-space-id="' + space.id + '"]');
      if (!cell) return;

      const owner = MonopolyGame.getOwner(space.id);
      const houses = MonopolyGame.getHouses(space.id);
      const mortgaged = MonopolyGame.isMortgaged(space.id);

      cell.classList.toggle('is-owned', Boolean(owner));
      if (owner) {
        cell.style.setProperty('--owner-color', GAME_CONFIG.playerColors[owner.id]);
      }

      const housesEl = cell.querySelector('[data-houses]');
      if (houses > 0 && houses < 5) {
        housesEl.innerHTML = '▪'.repeat(houses);
        housesEl.className = 'cell__houses cell__houses--built';
      } else if (houses === 5) {
        housesEl.innerHTML = '▣';
        housesEl.className = 'cell__houses cell__houses--hotel';
      } else {
        housesEl.innerHTML = '';
        housesEl.className = 'cell__houses';
      }

      cell.classList.toggle('is-mortgaged', mortgaged);

      const tokensEl = cell.querySelector('[data-tokens]');
      tokensEl.innerHTML = state.players
        .filter((p) => !p.bankrupt && p.position === space.id)
        .map((p) => '<span class="cell__token" style="background:' + GAME_CONFIG.playerColors[p.id] + '">' + GAME_CONFIG.playerTokens[p.id] + '</span>')
        .join('');
    });
  }

  function renderPlayers(state) {
    const current = state.players[state.currentPlayer];
    els.playersPanel.innerHTML = state.players.map((p) => {
      const isActive = p.id === state.currentPlayer && !state.winner;
      const props = Object.keys(p.properties).length;
      return (
        '<div class="player-card' + (isActive ? ' player-card--active' : '') + (p.bankrupt ? ' player-card--out' : '') + '">' +
          '<div class="player-card__head">' +
            '<span class="player-card__token" style="background:' + GAME_CONFIG.playerColors[p.id] + '">' + GAME_CONFIG.playerTokens[p.id] + '</span>' +
            '<span class="player-card__name">' + p.name + '</span>' +
          '</div>' +
          '<div class="player-card__money">' + formatMoney(p.money) + '</div>' +
          '<div class="player-card__meta">Участков: ' + props +
            (p.inJail ? ' · В тюрьме' : '') +
            (p.jailCards ? ' · Карта выхода: ' + p.jailCards : '') +
          '</div>' +
        '</div>'
      );
    }).join('');

    if (state.winner) {
      els.status.textContent = 'Победитель: ' + state.winner.name + '!';
    } else if (current) {
      els.status.textContent = 'Ход: ' + current.name;
    }
  }

  function renderLog(state) {
    els.log.innerHTML = state.log.map((m) => '<div class="log__item">' + m + '</div>').join('');
  }

  function renderCenter(state) {
    const center = document.getElementById('board-center');
    if (!center) return;
    center.innerHTML =
      '<div class="center__title">MONOPOLY</div>' +
      '<div class="center__subtitle">Armenia Edition</div>' +
      '<div class="center__dice" id="center-dice">' +
        '<span class="die">' + state.dice[0] + '</span>' +
        '<span class="die">' + state.dice[1] + '</span>' +
      '</div>' +
      '<div class="center__bank">Банк: ' + formatMoney(
        state.players.reduce((s, p) => s + p.money, 0) +
        BOARD_SPACES.reduce((s, sp) => {
          const o = MonopolyGame.getOwner(sp.id);
          return o ? s + sp.price : s;
        }, 0)
      ) + '</div>';
  }

  function renderActions(state) {
    if (state.winner) {
      els.actions.innerHTML = '<button class="btn btn--primary" id="restart-btn">Новая игра</button>';
      document.getElementById('restart-btn').addEventListener('click', showSetup);
      els.rollBtn.disabled = true;
      els.endBtn.disabled = true;
      return;
    }

    const player = state.players[state.currentPlayer];
    let html = '';

    if (state.phase === 'action' && state.pending?.type === 'buy') {
      const space = MonopolyGame.getSpace(state.pending.spaceId);
      html +=
        '<p class="action__text">Купить «' + space.name + '» за ' + formatMoney(state.pending.price) + '?</p>' +
        '<button class="btn btn--buy" id="btn-buy">Купить</button>' +
        '<button class="btn btn--secondary" id="btn-decline">Отказаться</button>';
    }

    if (player.inJail && state.phase === 'roll') {
      html +=
        '<button class="btn btn--secondary" id="btn-jail-pay">Заплатить ' + formatMoney(GAME_CONFIG.jailFine) + '</button>';
      if (player.jailCards > 0) {
        html += '<button class="btn btn--secondary" id="btn-jail-card">Карта выхода</button>';
      }
    }

    const ownedProps = Object.keys(player.properties).filter((sid) => state.ownership[sid] === player.id);
    if (ownedProps.length && state.phase === 'endturn') {
      html += '<div class="action__build"><p class="action__text">Управление:</p>';
      ownedProps.forEach((sid) => {
        const sp = MonopolyGame.getSpace(Number(sid));
        const prop = player.properties[sid];
        if (sp.group && MonopolyGame.ownsMonopoly(player, sp.group) && !prop.mortgaged) {
          html += '<button class="btn btn--small" data-build="' + sid + '">+дом ' + sp.name + '</button>';
        }
        if (!prop.houses && !prop.mortgaged) {
          html += '<button class="btn btn--small" data-mortgage="' + sid + '">Залог ' + sp.name + '</button>';
        }
        if (prop.mortgaged) {
          html += '<button class="btn btn--small" data-unmortgage="' + sid + '">Выкуп ' + sp.name + '</button>';
        }
      });
      html += '</div>';
    }

    els.actions.innerHTML = html;

    const buyBtn = document.getElementById('btn-buy');
    if (buyBtn) buyBtn.onclick = () => { MonopolyGame.buyProperty(); render(); };

    const declineBtn = document.getElementById('btn-decline');
    if (declineBtn) declineBtn.onclick = () => { MonopolyGame.declineProperty(); render(); };

    const jailPay = document.getElementById('btn-jail-pay');
    if (jailPay) jailPay.onclick = () => { MonopolyGame.payJailFine(); render(); };

    const jailCard = document.getElementById('btn-jail-card');
    if (jailCard) jailCard.onclick = () => { MonopolyGame.useJailCard(); render(); };

    els.actions.querySelectorAll('[data-build]').forEach((btn) => {
      btn.onclick = () => { MonopolyGame.buildHouse(Number(btn.dataset.build)); render(); };
    });
    els.actions.querySelectorAll('[data-mortgage]').forEach((btn) => {
      btn.onclick = () => { MonopolyGame.mortgage(Number(btn.dataset.mortgage)); render(); };
    });
    els.actions.querySelectorAll('[data-unmortgage]').forEach((btn) => {
      btn.onclick = () => { MonopolyGame.unmortgage(Number(btn.dataset.unmortgage)); render(); };
    });

    els.rollBtn.disabled = state.phase !== 'roll' || player.bankrupt;
    els.endBtn.disabled = state.phase !== 'endturn';
  }

  function showSetup() {
    els.setup.classList.remove('is-hidden');
    els.game.classList.add('is-hidden');
  }

  function showGame() {
    els.setup.classList.add('is-hidden');
    els.game.classList.remove('is-hidden');
  }

  function startGame() {
    const count = Number(els.playerCount.value);
    const inputs = els.playerNames.querySelectorAll('[data-player-name]');
    const names = Array.from(inputs).map((inp, i) => inp.value.trim() || 'Игрок ' + (i + 1));
    MonopolyGame.initGame(names.slice(0, count));
    showGame();
    render();
  }

  els.playerCount.addEventListener('change', () => {
    renderPlayerInputs(Number(els.playerCount.value));
  });

  els.startBtn.addEventListener('click', startGame);
  els.rollBtn.addEventListener('click', () => { MonopolyGame.rollDice(); render(); });
  els.endBtn.addEventListener('click', () => { MonopolyGame.endTurn(); render(); });

  buildBoard();
  renderPlayerInputs(GAME_CONFIG.defaultPlayers);
})();
