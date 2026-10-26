const MonopolyGame = (function () {
  const TOTAL_HOUSES = 32;
  const TOTAL_HOTELS = 12;

  let state = null;

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function createPlayer(id, name) {
    return {
      id,
      name,
      money: GAME_CONFIG.startMoney,
      position: 0,
      properties: {},
      inJail: false,
      jailTurns: 0,
      jailCards: 0,
      bankrupt: false,
      skipTurn: false,
    };
  }

  function initGame(playerNames) {
    state = {
      players: playerNames.map((name, i) => createPlayer(i, name)),
      currentPlayer: 0,
      ownership: {},
      housesLeft: TOTAL_HOUSES,
      hotelsLeft: TOTAL_HOTELS,
      chanceDeck: shuffle(CHANCE_CARDS.map((c, i) => ({ ...c, deckId: i }))),
      treasuryDeck: shuffle(TREASURY_CARDS.map((c, i) => ({ ...c, deckId: i }))),
      dice: [1, 1],
      doublesCount: 0,
      phase: 'roll',
      log: ['Игра началась! Каждый игрок получает 1 500 000 ֏'],
      pending: null,
      winner: null,
    };
    return getState();
  }

  function getState() {
    return state;
  }

  function currentPlayer() {
    return state.players[state.currentPlayer];
  }

  function activePlayers() {
    return state.players.filter((p) => !p.bankrupt);
  }

  function log(msg) {
    state.log.unshift(msg);
    if (state.log.length > 80) state.log.pop();
  }

  function formatMoney(n) {
    return new Intl.NumberFormat('ru-RU').format(n) + ' ' + GAME_CONFIG.currency;
  }

  function getSpace(id) {
    return BOARD_SPACES[id];
  }

  function getOwner(spaceId) {
    const oid = state.ownership[spaceId];
    return oid !== undefined ? state.players[oid] : null;
  }

  function ownsMonopoly(player, group) {
    const groupSpaces = BOARD_SPACES.filter((s) => s.group === group);
    return groupSpaces.every((s) => state.ownership[s.id] === player.id);
  }

  function countRailroads(player) {
    return RAILROAD_IDS.filter((id) => state.ownership[id] === player.id).length;
  }

  function countUtilities(player) {
    return BOARD_SPACES.filter((s) => s.type === 'utility' && state.ownership[s.id] === player.id).length;
  }

  function getNearestRailroad(from) {
    for (let i = 1; i <= 40; i++) {
      const pos = (from + i) % 40;
      if (RAILROAD_IDS.includes(pos)) return pos;
    }
    return 5;
  }

  function transferMoney(from, to, amount) {
    from.money -= amount;
    to.money += amount;
  }

  function payBank(player, amount) {
    player.money -= amount;
  }

  function receiveFromBank(player, amount) {
    player.money += amount;
  }

  function checkBankrupt(player) {
    if (player.money < 0) {
      player.bankrupt = true;
      player.money = 0;
      Object.keys(state.ownership).forEach((sid) => {
        if (state.ownership[sid] === player.id) delete state.ownership[sid];
      });
      player.properties = {};
      log(player.name + ' обанкротился!');
      const remaining = activePlayers();
      if (remaining.length === 1) {
        state.winner = remaining[0];
        state.phase = 'gameover';
        log('Победитель: ' + state.winner.name + '!');
      }
      return true;
    }
    return false;
  }

  function moveTo(player, target, collectGo) {
    const oldPos = player.position;
    if (target < oldPos || (collectGo && target !== 0)) {
      receiveFromBank(player, GAME_CONFIG.passGoBonus);
      log(player.name + ' прошёл Старт и получил ' + formatMoney(GAME_CONFIG.passGoBonus));
    }
    player.position = target;
  }

  function moveSteps(player, steps) {
    const oldPos = player.position;
    const newPos = (oldPos + steps + 40) % 40;
    if (newPos < oldPos || (steps > 0 && oldPos + steps >= 40)) {
      receiveFromBank(player, GAME_CONFIG.passGoBonus);
      log(player.name + ' прошёл Старт и получил ' + formatMoney(GAME_CONFIG.passGoBonus));
    }
    player.position = newPos;
    return newPos;
  }

  function calcRent(space, owner, houses) {
    if (space.type === 'property') {
      const g = PROPERTY_GROUPS[space.group];
      let rentIdx = houses;
      if (houses === 5) rentIdx = 5;
      let rent = g.rents[rentIdx] || g.rents[0];
      if (houses === 0 && ownsMonopoly(owner, space.group)) rent *= 2;
      return rent;
    }
    if (space.type === 'railroad') {
      const count = countRailroads(owner);
      return RAILROAD_RENTS[count - 1] || RAILROAD_RENTS[0];
    }
    if (space.type === 'utility') {
      const count = countUtilities(owner);
      const mult = count >= 2 ? 10 : 4;
      return mult * (state.dice[0] + state.dice[1]) * 1000;
    }
    return 0;
  }

  function getHouses(spaceId) {
    const owner = getOwner(spaceId);
    if (!owner) return 0;
    return owner.properties[spaceId]?.houses || 0;
  }

  function isMortgaged(spaceId) {
    const owner = getOwner(spaceId);
    return owner?.properties[spaceId]?.mortgaged || false;
  }

  function handleLanding(player) {
    const space = getSpace(player.position);
    const owner = getOwner(space.id);

    if (space.type === 'property' || space.type === 'railroad' || space.type === 'utility') {
      if (!owner) {
        state.pending = { type: 'buy', spaceId: space.id, price: space.price };
        state.phase = 'action';
        log(player.name + ' может купить «' + space.name + '» за ' + formatMoney(space.price));
        return;
      }
      if (owner.id !== player.id && !isMortgaged(space.id)) {
        const rent = calcRent(space, owner, getHouses(space.id));
        transferMoney(player, owner, rent);
        log(player.name + ' платит аренду ' + formatMoney(rent) + ' → ' + owner.name);
        checkBankrupt(player);
        state.phase = 'endturn';
        return;
      }
      state.phase = 'endturn';
      return;
    }

    if (space.type === 'tax') {
      payBank(player, space.amount);
      log(player.name + ' платит налог ' + formatMoney(space.amount));
      checkBankrupt(player);
      state.phase = 'endturn';
      return;
    }

    if (space.type === 'chest') {
      drawTreasury(player);
      return;
    }

    if (space.type === 'chance') {
      drawChance(player);
      return;
    }

    if (space.type === 'gotojail') {
      sendToJail(player);
      return;
    }

    state.phase = 'endturn';
  }

  function sendToJail(player) {
    player.position = 10;
    player.inJail = true;
    player.jailTurns = 0;
    log(player.name + ' отправляется в тюрьму!');
    state.phase = 'endturn';
  }

  function drawCard(deckName) {
    const deck = state[deckName];
    const card = deck.shift();
    deck.push(card);
    return card;
  }

  function drawTreasury(player) {
    const card = drawCard('treasuryDeck');
    log('Казна: ' + card.text);
    applyMoneyCard(player, card);
  }

  function drawChance(player) {
    const card = drawCard('chanceDeck');
    log('Шанс: ' + card.text);
    applyChanceCard(player, card);
  }

  function applyMoneyCard(player, card) {
    if (card.type === 'receive') {
      receiveFromBank(player, card.amount);
    } else if (card.type === 'pay') {
      payBank(player, card.amount);
      checkBankrupt(player);
    }
    state.phase = state.winner ? 'gameover' : 'endturn';
  }

  function applyChanceCard(player, card) {
    if (card.type === 'jailfree') {
      player.jailCards++;
      state.phase = 'endturn';
      return;
    }
    if (card.type === 'skip') {
      player.skipTurn = true;
      state.phase = 'endturn';
      return;
    }
    if (card.type === 'receive') {
      receiveFromBank(player, card.amount);
      state.phase = 'endturn';
      return;
    }
    if (card.type === 'pay') {
      payBank(player, card.amount);
      checkBankrupt(player);
      state.phase = 'endturn';
      return;
    }
    if (card.type === 'collectFromAll') {
      state.players.forEach((p) => {
        if (p.id !== player.id && !p.bankrupt) {
          transferMoney(p, player, card.amount);
          checkBankrupt(p);
        }
      });
      state.phase = 'endturn';
      return;
    }
    if (card.type === 'payToAll') {
      state.players.forEach((p) => {
        if (p.id !== player.id && !p.bankrupt) {
          transferMoney(player, p, card.amount);
        }
      });
      checkBankrupt(player);
      state.phase = 'endturn';
      return;
    }
    if (card.type === 'payPerBuilding') {
      let total = 0;
      Object.keys(player.properties).forEach((sid) => {
        const h = player.properties[sid].houses || 0;
        if (h === 5) total += card.hotel;
        else total += h * card.house;
      });
      payBank(player, total);
      log(player.name + ' платит ' + formatMoney(total) + ' за дома/отели');
      checkBankrupt(player);
      state.phase = 'endturn';
      return;
    }
    if (card.type === 'goto') {
      let target = card.target;
      if (target === 'nearestRailroad') target = getNearestRailroad(player.position);
      moveTo(player, target, card.collectGo);
      if (target === 10) {
        player.inJail = true;
        player.jailTurns = 0;
        state.phase = 'endturn';
        return;
      }
      handleLanding(player);
      return;
    }
    if (card.type === 'move') {
      moveSteps(player, card.steps);
      handleLanding(player);
      return;
    }
    state.phase = 'endturn';
  }

  function rollDice() {
    if (state.phase !== 'roll' || state.winner) return null;

    const player = currentPlayer();
    if (player.bankrupt) {
      endTurn();
      return getState();
    }

    if (player.inJail) {
      return rollInJail(player);
    }

    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    state.dice = [d1, d2];
    const isDouble = d1 === d2;

    if (isDouble) {
      state.doublesCount++;
      if (state.doublesCount >= 3) {
        log(player.name + ' выбросил 3 дубля подряд — в тюрьму!');
        sendToJail(player);
        state.doublesCount = 0;
        return getState();
      }
    } else {
      state.doublesCount = 0;
    }

    log(player.name + ' бросает кубики: ' + d1 + ' + ' + d2 + ' = ' + (d1 + d2));
    const newPos = moveSteps(player, d1 + d2);
    log(player.name + ' перемещается на «' + getSpace(newPos).name + '»');

    handleLanding(player);

    if (isDouble && state.phase === 'endturn') {
      state.phase = 'roll';
      log(player.name + ' выбросил дубль — ходит ещё раз!');
    }

    return getState();
  }

  function rollInJail(player) {
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    state.dice = [d1, d2];
    player.jailTurns++;

    if (d1 === d2) {
      player.inJail = false;
      player.jailTurns = 0;
      log(player.name + ' выбросил дубль и выходит из тюрьмы!');
      moveSteps(player, d1 + d2);
      handleLanding(player);
      return getState();
    }

    if (player.jailTurns >= 3) {
      payBank(player, GAME_CONFIG.jailFine);
      player.inJail = false;
      player.jailTurns = 0;
      log(player.name + ' платит ' + formatMoney(GAME_CONFIG.jailFine) + ' и выходит из тюрьмы');
      checkBankrupt(player);
      moveSteps(player, d1 + d2);
      handleLanding(player);
      return getState();
    }

    log(player.name + ' в тюрьме: ' + d1 + ' + ' + d2 + ' (не дубль). Ход ' + player.jailTurns + '/3');
    state.phase = 'endturn';
    return getState();
  }

  function buyProperty() {
    if (state.phase !== 'action' || state.pending?.type !== 'buy') return getState();
    const player = currentPlayer();
    const { spaceId, price } = state.pending;
    if (player.money < price) {
      log('Недостаточно средств для покупки!');
      state.pending = null;
      state.phase = 'endturn';
      return getState();
    }
    payBank(player, price);
    state.ownership[spaceId] = player.id;
    player.properties[spaceId] = { houses: 0, mortgaged: false };
    log(player.name + ' покупает «' + getSpace(spaceId).name + '» за ' + formatMoney(price));
    state.pending = null;
    state.phase = state.doublesCount > 0 ? 'roll' : 'endturn';
    if (state.doublesCount > 0) log(player.name + ' выбросил дубль — ходит ещё раз!');
    return getState();
  }

  function declineProperty() {
    state.pending = null;
    state.phase = state.doublesCount > 0 ? 'roll' : 'endturn';
    if (state.doublesCount > 0) log(currentPlayer().name + ' выбросил дубль — ходит ещё раз!');
    log(currentPlayer().name + ' отказывается от покупки');
    return getState();
  }

  function payJailFine() {
    const player = currentPlayer();
    if (!player.inJail || player.money < GAME_CONFIG.jailFine) return getState();
    payBank(player, GAME_CONFIG.jailFine);
    player.inJail = false;
    player.jailTurns = 0;
    log(player.name + ' платит штраф ' + formatMoney(GAME_CONFIG.jailFine) + ' и выходит из тюрьмы');
    state.phase = 'roll';
    return getState();
  }

  function useJailCard() {
    const player = currentPlayer();
    if (!player.inJail || player.jailCards < 1) return getState();
    player.jailCards--;
    player.inJail = false;
    player.jailTurns = 0;
    log(player.name + ' использует карту «Выход из тюрьмы бесплатно»');
    state.phase = 'roll';
    return getState();
  }

  function buildHouse(spaceId) {
    const player = currentPlayer();
    const space = getSpace(spaceId);
    if (!space.group || state.ownership[spaceId] !== player.id) return getState();
    if (!ownsMonopoly(player, space.group)) {
      log('Нужно владеть всей группой для строительства!');
      return getState();
    }
    const prop = player.properties[spaceId];
    if (prop.mortgaged) return getState();

    const groupSpaces = BOARD_SPACES.filter((s) => s.group === space.group);
    const minHouses = Math.min(...groupSpaces.map((s) => player.properties[s.id]?.houses || 0));
    if ((prop.houses || 0) > minHouses) {
      log('Нужно строить равномерно!');
      return getState();
    }

    const cost = PROPERTY_GROUPS[space.group].houseCost;
    if (prop.houses >= 4) {
      if (state.hotelsLeft < 1 || state.housesLeft < 4) return getState();
      payBank(player, cost);
      state.housesLeft += 4;
      state.hotelsLeft--;
      prop.houses = 5;
    } else {
      if (state.housesLeft < 1) return getState();
      payBank(player, cost);
      state.housesLeft--;
      prop.houses = (prop.houses || 0) + 1;
    }
    log(player.name + ' строит на «' + space.name + '» (уровень ' + prop.houses + ')');
    return getState();
  }

  function mortgage(spaceId) {
    const player = currentPlayer();
    if (state.ownership[spaceId] !== player.id) return getState();
    const space = getSpace(spaceId);
    const prop = player.properties[spaceId];
    if (prop.mortgaged || (prop.houses && prop.houses > 0)) return getState();
    const amount = Math.floor(space.price * GAME_CONFIG.mortgageRate);
    prop.mortgaged = true;
    receiveFromBank(player, amount);
    log(player.name + ' закладывает «' + space.name + '» за ' + formatMoney(amount));
    return getState();
  }

  function unmortgage(spaceId) {
    const player = currentPlayer();
    if (state.ownership[spaceId] !== player.id) return getState();
    const space = getSpace(spaceId);
    const prop = player.properties[spaceId];
    if (!prop.mortgaged) return getState();
    const amount = Math.floor(space.price * GAME_CONFIG.mortgageRate * 1.1);
    if (player.money < amount) return getState();
    payBank(player, amount);
    prop.mortgaged = false;
    log(player.name + ' выкупает «' + space.name + '» за ' + formatMoney(amount));
    return getState();
  }

  function endTurn() {
    if (state.winner) return getState();

    if (state.phase === 'action') return getState();

    let next = (state.currentPlayer + 1) % state.players.length;
    let guard = 0;
    while (state.players[next].bankrupt && guard < state.players.length) {
      next = (next + 1) % state.players.length;
      guard++;
    }

    state.currentPlayer = next;
    const p = currentPlayer();

    if (p.skipTurn) {
      p.skipTurn = false;
      log(p.name + ' пропускает ход');
      return endTurn();
    }

    state.phase = 'roll';
    state.doublesCount = 0;
    log('Ход игрока: ' + p.name);
    return getState();
  }

  return {
    initGame,
    getState,
    rollDice,
    buyProperty,
    declineProperty,
    payJailFine,
    useJailCard,
    buildHouse,
    mortgage,
    unmortgage,
    endTurn,
    formatMoney,
    getSpace,
    getOwner,
    getHouses,
    isMortgaged,
    ownsMonopoly,
  };
})();
