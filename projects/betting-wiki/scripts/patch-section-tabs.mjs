import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const pagesDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'pages');

export const SECTION_TABS_HTML = `<div data-v-284cf98d="" class="tabs__list"><div data-v-284cf98d="" class="tabs__item--active tabs__item wiki-section-tab" role="tab" data-section="all" aria-controls="all-sections" aria-selected="false" tabindex="0"><div data-v-284cf98d="" class="tabs__item-text">Все</div></div><div data-v-284cf98d="" class="tabs__item wiki-section-tab" role="tab" data-section="fakty" aria-selected="false" tabindex="0"><div data-v-284cf98d="" class="tabs__item-text">Факты</div></div><div data-v-284cf98d="" class="tabs__item wiki-section-tab" role="tab" data-section="chempiony" aria-selected="false" tabindex="0"><div data-v-284cf98d="" class="tabs__item-text">Чемпионы</div></div><div data-v-284cf98d="" class="tabs__item wiki-section-tab" role="tab" data-section="sobytiya" aria-selected="false" tabindex="0"><div data-v-284cf98d="" class="tabs__item-text">События</div></div></div>`;

const TABS_LIST_RE = /<div(?: data-v-284cf98d="")? class="tabs__list"[^>]*>[\s\S]*?<\/div>(?=\s*<!----><\/div>)/;

const ABOUT = {
  futbol: 'футболе',
  basketbol: 'баскетболе',
  hokkej: 'хоккее',
  tennis: 'теннисе',
  avtosport: 'автоспорте',
  'boks-mma': 'боксе и ММА',
  kiber: 'киберспорте',
  figurka: 'фигурном катании',
  lyzhi: 'лыжах',
  plavanie: 'плавании',
  'legkaya-atletika': 'лёгкой атлетике',
  gandbol: 'гандболе',
  volejbol: 'волейболе',
  shahmaty: 'шахматах',
  darts: 'дартсе'
};

const DESC = (prep) =>
  `Всё о ${prep}: факты, чемпионы, ключевые события и главные лица.`;

for (const f of fs.readdirSync(pagesDir)) {
  if (!f.endsWith('.html')) continue;
  const p = path.join(pagesDir, f);
  let html = fs.readFileSync(p, 'utf8');
  if (!html.includes('columns category-page')) continue;

  html = html.replace(TABS_LIST_RE, SECTION_TABS_HTML);

  const slug = f.replace('.html', '');
  if (ABOUT[slug]) {
    html = html.replace(
      /<p class="navigation-betting__text"[^>]*>[^<]*<\/p>/,
      `<p class="navigation-betting__text" data-v-11a47e8a>${DESC(ABOUT[slug])}</p>`
    );
  }

  fs.writeFileSync(p, html);
  console.log('Patched tabs:', f);
}
