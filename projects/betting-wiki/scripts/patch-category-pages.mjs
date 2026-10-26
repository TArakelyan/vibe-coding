import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const pagesDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'pages');

function removeProfessionalsBlock(html) {
  const marker = 'Для профессионалов';
  const idx = html.indexOf(marker);
  if (idx === -1) return html;
  const blockStart = html.lastIndexOf('<div class="categories-block"', idx);
  if (blockStart === -1) return html;
  let depth = 0;
  let blockEnd = blockStart;
  for (let i = blockStart; i < html.length; i++) {
    if (html.slice(i, i + 4) === '<div') depth++;
    if (html.slice(i, i + 6) === '</div>') {
      depth--;
      if (depth === 0) {
        blockEnd = i + 6;
        break;
      }
    }
  }
  return html.slice(0, blockStart) + html.slice(blockEnd);
}

const NAMES = {
  futbol: 'Футбол', basketbol: 'Баскетбол', hokkej: 'Хоккей', tennis: 'Теннис',
  avtosport: 'Автоспорт', 'boks-mma': 'Бокс/ММА', kiber: 'Кибер', figurka: 'Фигурка',
  lyzhi: 'Лыжи', plavanie: 'Плавание', 'legkaya-atletika': 'Легкая атлетика',
  gandbol: 'Гандбол', volejbol: 'Волейбол', shahmaty: 'Шахматы', darts: 'Дартс'
};

function updateDescription(html, title) {
  const block = `<div class="description-block" data-v-1644725d><p>В разделе «${title}» — факты, чемпионы и ключевые события. От правил и рекордов до громких скандалов и исторических моментов.</p></div>`;
  return html.replace(
    /<div class="description-block"[\s\S]*?<\/div>(?=\s*<!--\]--><\/div><div class="columns__alt-column">)/,
    block
  );
}

for (const f of fs.readdirSync(pagesDir)) {
  if (!f.endsWith('.html')) continue;
  const p = path.join(pagesDir, f);
  let html = fs.readFileSync(p, 'utf8');
  const before = html.length;
  html = removeProfessionalsBlock(html);
  const slug = f.replace('.html', '');
  html = updateDescription(html, NAMES[slug] || slug);
  if (!html.includes('../data/categories.js')) {
    html = html.replace(
      '<script src="../patch.js"></script>',
      '<script src="../data/config.js"></script>\n  <script src="../data/categories.js"></script>\n  <script src="../patch.js"></script>'
    );
  }
  fs.writeFileSync(p, html);
  console.log(f, before - html.length, 'bytes removed');
}
