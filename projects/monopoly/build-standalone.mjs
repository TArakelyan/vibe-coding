import fs from 'fs';
import path from 'path';

const dir = path.resolve('.');
const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(dir, 'styles.css'), 'utf8');
const config = fs.readFileSync(path.join(dir, 'data/config.js'), 'utf8');
const board = fs.readFileSync(path.join(dir, 'data/board.js'), 'utf8');
const treasury = fs.readFileSync(path.join(dir, 'data/treasury-cards.js'), 'utf8');
const chance = fs.readFileSync(path.join(dir, 'data/chance-cards.js'), 'utf8');
const game = fs.readFileSync(path.join(dir, 'game.js'), 'utf8');
const ui = fs.readFileSync(path.join(dir, 'ui.js'), 'utf8');
const resize = fs.readFileSync(path.join(dir, 'resize.js'), 'utf8');

const standalone = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Монополия — Armenia Edition</title>
  <style>
${css}
  </style>
</head>
<body>
  <div class="app">
    <section class="setup screen" id="setup-screen">
      <h1 class="setup__title">MONOPOLY</h1>
      <p class="setup__subtitle">Armenia Edition · 1 500 000 ֏ на старте</p>
      <div class="setup__field">
        <label for="player-count">Количество игроков</label>
        <select id="player-count">
          <option value="2">2 игрока</option>
          <option value="3">3 игрока</option>
          <option value="4" selected>4 игрока</option>
          <option value="5">5 игроков</option>
          <option value="6">6 игроков</option>
        </select>
      </div>
      <div id="player-names"></div>
      <button id="start-btn">Начать игру</button>
    </section>
    <section class="game screen is-hidden" id="game-screen">
      <div class="board-wrap">
        <div class="board" id="board"></div>
      </div>
      <aside class="game__sidebar">
        <div class="panel">
          <p class="status" id="status-text">—</p>
          <div class="controls">
            <button class="btn btn--primary" id="roll-btn">Бросить кубики</button>
            <button class="btn btn--secondary" id="end-btn">Завершить ход</button>
          </div>
          <div id="action-panel"></div>
        </div>
        <div class="panel">
          <h3 class="panel__title">Игроки</h3>
          <div id="players-panel"></div>
        </div>
        <div class="panel">
          <h3 class="panel__title">Журнал</h3>
          <div class="log" id="game-log"></div>
        </div>
      </aside>
    </section>
  </div>
  <script>
${config}
${board}
${treasury}
${chance}
${game}
${ui}
${resize}
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(dir, 'index.standalone.html'), standalone);
console.log('OK: index.standalone.html (' + Math.round(standalone.length / 1024) + ' KB)');
