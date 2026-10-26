import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const pagesDir = path.join(projectRoot, 'pages');

const WIKI_TITLE = 'Спортивная вики';
const WIKI_DESCRIPTION =
  'Все главное о спорте. Чемпионы, правила, скандалы, ключевые события, лица и решения. От футбола, баскетбола до зимних видов спорта.';
const PAGE_TITLE = 'Спортивная вики — Sports.ru';
const UTM = 'special-sportivnaya-wiki';

const CATEGORIES = [
  { title: 'Футбол', slug: 'futbol', count: 98 },
  { title: 'Баскетбол', slug: 'basketbol', count: 55 },
  { title: 'Хоккей', slug: 'hokkej', count: 43 },
  { title: 'Теннис', slug: 'tennis', count: 68 },
  { title: 'Автоспорт', slug: 'avtosport', count: 32 },
  { title: 'Бокс/ММА', slug: 'boks-mma', count: 28 },
  { title: 'Кибер', slug: 'kiber', count: 24 },
  { title: 'Фигурка', slug: 'figurka', count: 19 },
  { title: 'Лыжи', slug: 'lyzhi', count: 22 },
  { title: 'Плавание', slug: 'plavanie', count: 18 },
  { title: 'Легкая атлетика', slug: 'legkaya-atletika', count: 21, inMore: true },
  { title: 'Гандбол', slug: 'gandbol', count: 14, inMore: true },
  { title: 'Волейбол', slug: 'volejbol', count: 16, inMore: true },
  { title: 'Шахматы', slug: 'shahmaty', count: 12, inMore: true },
  { title: 'Дартс', slug: 'darts', count: 9, inMore: true }
];

const VISIBLE = CATEGORIES.filter((c) => !c.inMore);

const OLD_BLOCKS = [
  { old: 'Виды ставок', slug: 'vidy-stavok', newCat: 0 },
  { old: 'Ключевые термины', slug: 'klyuchevye-terminy', newCat: 1 },
  { old: 'Виды спорта', slug: 'vidy-sporta', newCat: 2 },
  { old: 'Нужно знать', slug: 'nuzhno-znat', newCat: 3 },
  { old: 'Букмекеры', slug: 'bukmekery', newCat: 4 },
  { old: 'Стратегии ставок', slug: 'strategii-na-stavki', newCat: 5 },
  { old: 'Финансы', slug: 'finance', newCat: 6 }
];

const SECTION_MAP = [
  ['Для новичков', 'Факты'],
  ['Для любителей', 'Чемпионы'],
  ['Для продвинутых', 'События']
];

function sportDescription(title) {
  const about = {
    'Футбол': 'футболе',
    'Баскетбол': 'баскетболе',
    'Хоккей': 'хоккее',
    'Теннис': 'теннисе',
    'Автоспорт': 'автоспорте',
    'Бокс/ММА': 'боксе и ММА',
    'Кибер': 'киберспорте',
    'Фигурка': 'фигурном катании',
    'Лыжи': 'лыжах',
    'Плавание': 'плавании',
    'Легкая атлетика': 'лёгкой атлетике',
    'Гандбол': 'гандболе',
    'Волейбол': 'волейболе',
    'Шахматы': 'шахматах',
    'Дартс': 'дартсе'
  };
  const prep = about[title] || title.toLowerCase();
  return `Всё о ${prep}: факты, чемпионы, ключевые события и главные лица.`;
}

const SECTION_TABS_HTML = `<div data-v-284cf98d="" class="tabs__list"><div data-v-284cf98d="" class="tabs__item--active tabs__item wiki-section-tab" role="tab" data-section="all" aria-controls="all-sections" aria-selected="false" tabindex="0"><div data-v-284cf98d="" class="tabs__item-text">Все</div></div><div data-v-284cf98d="" class="tabs__item wiki-section-tab" role="tab" data-section="fakty" aria-selected="false" tabindex="0"><div data-v-284cf98d="" class="tabs__item-text">Факты</div></div><div data-v-284cf98d="" class="tabs__item wiki-section-tab" role="tab" data-section="chempiony" aria-selected="false" tabindex="0"><div data-v-284cf98d="" class="tabs__item-text">Чемпионы</div></div><div data-v-284cf98d="" class="tabs__item wiki-section-tab" role="tab" data-section="sobytiya" aria-selected="false" tabindex="0"><div data-v-284cf98d="" class="tabs__item-text">События</div></div></div>`;

function injectSectionTabs(html) {
  return html.replace(
    /<div(?: data-v-284cf98d="")? class="tabs__list"[^>]*>[\s\S]*?<\/div>(?=\s*<!----><\/div>)/,
    SECTION_TABS_HTML
  );
}

function buildTabsList() {
  const items = VISIBLE.map(
    (cat) =>
      `<div data-v-284cf98d="" class="tabs__item" role="tab" aria-selected="false" tabindex="0"><div data-v-284cf98d="" class="tabs__item-text">${cat.title}</div></div>`
  ).join('');

  return `<div data-v-284cf98d="" class="tabs__list"><div data-v-284cf98d="" class="tabs__item--active tabs__item" role="tab" aria-controls="all-categories" aria-selected="false" tabindex="0"><div data-v-284cf98d="" class="tabs__item-text">Все</div></div>${items}</div>`;
}

function buildSeoLinks(prefix = './pages') {
  return CATEGORIES.map(
    (cat) => `<a data-v-24ba86b9="" href="${prefix}/${cat.slug}.html">${cat.title}</a>`
  ).join('');
}

function sectionSeoLinksHtml() {
  return '<a data-v-24ba86b9="" href="#fakty">Факты</a><a data-v-24ba86b9="" href="#chempiony">Чемпионы</a><a data-v-24ba86b9="" href="#sobytiya">События</a>';
}

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

function updateDescriptionBlock(html, sportTitle) {
  const replacement = `<div class="description-block" data-v-1644725d><p>В разделе «${sportTitle}» собраны материалы о правилах, рекордах, чемпионах и ключевых событиях. Факты помогут быстро разобраться в основах, блок «Чемпионы» — узнать о главных фигурах и победителях, «События» — вспомнить самые громкие моменты и скандалы.</p>
<p>Материалы охватывают историю, статистику, правила и яркие эпизоды. Удобная навигация по разделам позволяет найти нужную информацию за пару кликов.</p></div>`;
  return html.replace(/<div class="description-block"[\s\S]*?<\/div>(?=\s*<!--\]--><\/div><div class="columns__alt-column">)/, replacement);
}

function patchPageScripts(html) {
  if (html.includes('../data/categories.js')) return html;
  return html.replace(
    '<script src="../patch.js"></script>',
    '<script src="../data/config.js"></script>\n  <script src="../data/categories.js"></script>\n  <script src="../patch.js"></script>'
  );
}

function addSectionIds(html) {
  const ids = ['fakty', 'chempiony', 'sobytiya'];
  let n = 0;
  return html.replace(/<div class="categories-block"(?![^>]*id=)/g, (m) => {
    if (n < ids.length) return `<div class="categories-block" id="${ids[n++]}"`;
    return m;
  });
}

function applyGlobalText(html) {
  let result = html;
  result = result.replace(/Ставочная вики/g, WIKI_TITLE);
  result = result.replace(
    /Обширный источник знаний о ставках на спорт\. Все, что нужно знать для более осознанных и успешных ставок\./g,
    WIKI_DESCRIPTION
  );
  result = result.replace(
    /<title>[^<]*<\/title>/,
    `<title>${PAGE_TITLE}</title>`
  );
  result = result.replace(/special-betting-wiki/g, UTM);
  result = result.replace(/Статьи о ставках на спорт на Sports\.ru/g, PAGE_TITLE);

  for (const [old, neu] of SECTION_MAP) {
    result = result.replace(new RegExp(`>${old} <span`, 'g'), `>${neu} <span`);
    result = result.replace(new RegExp(`>${old}<`, 'g'), `>${neu}<`);
  }

  result = removeProfessionalsBlock(result);

  result = result.replace(
    /<div class="seo-links"[^>]*><!--\[-->([\s\S]*?)<!--\]--><\/div>/g,
    (match) => {
      if (match.includes('Для новичков') || match.includes('dlya-novichkov')) {
        return `<div class="seo-links" data-v-24ba86b9 data-v-11a47e8a><!--[-->${sectionSeoLinksHtml()}<!--]--></div>`;
      }
      if (match.includes('Ставки на футбол') || match.includes('/betting/football')) {
        return match;
      }
      const prefix = match.includes('../pages') ? '../pages' : './pages';
      return `<div data-v-24ba86b9="" data-v-11a47e8a="" class="seo-links">${buildSeoLinks(prefix)}</div>`;
    }
  );

  return result;
}

function patchIndex(html) {
  let result = applyGlobalText(html);

  const tabsList = buildTabsList();
  result = result.replace(/<div data-v-284cf98d="" class="tabs__list">[\s\S]*?<\/div>(?=\s*<div data-v-284cf98d="" class="tabs__item tabs__item--last">)/, tabsList);

  const seoLinks = `<div data-v-24ba86b9="" data-v-11a47e8a="" class="seo-links">${buildSeoLinks('./pages')}</div>`;
  result = result.replace(/<div data-v-24ba86b9="" data-v-11a47e8a="" class="seo-links">[\s\S]*?<\/div>/, seoLinks);

  for (const block of OLD_BLOCKS) {
    const cat = CATEGORIES[block.newCat];
    result = result.replace(
      new RegExp(`categories-block__title">${block.old} <span`, 'g'),
      `categories-block__title">${cat.title} <span`
    );
    result = result.replace(
      new RegExp(`href="\\./pages/${block.slug}\\.html"`, 'g'),
      `href="./pages/${cat.slug}.html"`
    );
    result = result.replace(
      new RegExp(`title="${block.old}"`, 'g'),
      `title="${cat.title}"`
    );
  }

  result = result.replace(/href="\.\/index\.html"/g, (m, offset) => {
    const before = result.slice(Math.max(0, offset - 200), offset);
    if (before.includes('Стратегии') || before.includes('Финансы')) return m;
    return m;
  });

  return result;
}

function patchCategoryPage(html, cat) {
  let result = applyGlobalText(html);

  result = result.replace(
    /<title>[^<]*<\/title>/,
    `<title>${cat.title} — ${WIKI_TITLE} — Sports.ru</title>`
  );

  result = result.replace(
    /<h1 class="navigation-betting__title"[^>]*>[^<]*<\/h1>/,
    `<h1 class="navigation-betting__title" data-v-11a47e8a>${cat.title}</h1>`
  );

  result = result.replace(
    /<p class="navigation-betting__text"[^>]*>[^<]*<\/p>/,
    `<p class="navigation-betting__text" data-v-11a47e8a>${sportDescription(cat.title)}</p>`
  );

  result = result.replace(
    /title="Виды ставок"|title="[^"]*" class="ui-breadcrumbs-item__link ui-breadcrumbs-item__link--disabled"/,
    `title="${cat.title}" class="ui-breadcrumbs-item__link ui-breadcrumbs-item__link--disabled"`
  );

  result = result.replace(
    /<span class="ui-breadcrumbs-item__link ui-breadcrumbs-item__link--disabled" title="[^"]*">[^<]*<\/span>(?=[^<]*<\/li><!--\]--><\/ul>)/,
    `<span class="ui-breadcrumbs-item__link ui-breadcrumbs-item__link--disabled" title="${cat.title}">${cat.title}</span>`
  );

  const sectionSeo = `<div class="seo-links" data-v-24ba86b9 data-v-11a47e8a><!--[-->${sectionSeoLinksHtml()}<!--]--></div>`;
  result = result.replace(/<div class="seo-links"[^>]*><!--\[-->[\s\S]*?<!--\]--><\/div>/, sectionSeo);

  result = addSectionIds(result);
  result = injectSectionTabs(result);
  result = updateDescriptionBlock(result, cat.title);
  result = patchPageScripts(result);

  return result;
}

function writeCategoriesJs() {
  const content = `const WIKI_CATEGORIES = ${JSON.stringify(CATEGORIES, null, 2)};

const WIKI_CATEGORIES_VISIBLE = WIKI_CATEGORIES.filter((c) => !c.inMore);
const WIKI_CATEGORIES_MORE = WIKI_CATEGORIES.filter((c) => c.inMore);
`;
  fs.writeFileSync(path.join(projectRoot, 'data/categories.js'), content);
}

function writeConfigJs() {
  const content = `const WIKI_CONFIG = {
  title: '${WIKI_TITLE}',
  description: '${WIKI_DESCRIPTION}',
  pageTitle: '${PAGE_TITLE}',
  utm: '${UTM}'
};

const WIKI_SECTIONS = [
  { title: 'Факты', slug: 'fakty' },
  { title: 'Чемпионы', slug: 'chempiony' },
  { title: 'События', slug: 'sobytiya' }
];
`;
  fs.writeFileSync(path.join(projectRoot, 'data/config.js'), content);
}

// --- run ---
writeCategoriesJs();
writeConfigJs();

const indexPath = path.join(projectRoot, 'index.html');
const wikiBodyPath = path.join(projectRoot, 'wiki-body.html');

let indexHtml = fs.readFileSync(indexPath, 'utf8');
indexHtml = patchIndex(indexHtml);
fs.writeFileSync(indexPath, indexHtml);
if (fs.existsSync(wikiBodyPath)) {
  const bodyStart = indexHtml.indexOf('<ul class="ui-breadcrumbs');
  const bodyEnd = indexHtml.lastIndexOf('</div></div>') + 14;
  const mountEnd = indexHtml.indexOf('</div>\n  </div>\n  <script');
  const wikiBody = indexHtml.slice(indexHtml.indexOf('<ul class="ui-breadcrumbs'), mountEnd > 0 ? mountEnd : bodyEnd);
  fs.writeFileSync(wikiBodyPath, wikiBody.trim());
}

const templatePath = path.join(pagesDir, 'futbol.html');
if (!fs.existsSync(templatePath)) {
  const alt = fs.readdirSync(pagesDir).find((f) => f.endsWith('.html'));
  if (!alt) throw new Error('No category template found');
}
const template = fs.readFileSync(
  fs.existsSync(templatePath) ? templatePath : path.join(pagesDir, fs.readdirSync(pagesDir).find((f) => f.endsWith('.html'))),
  'utf8'
);

const oldSlugs = [
  'vidy-stavok',
  'klyuchevye-terminy',
  'vidy-sporta',
  'nuzhno-znat',
  'bukmekery'
];

for (const cat of CATEGORIES) {
  let page = patchCategoryPage(template, cat);
  page = page.replace(/pages\/[a-z0-9-]+\.html/g, `${cat.slug}.html`);
  page = page.replace(/title="Виды ставок"/g, `title="${cat.title}"`);
  page = page.replace(/>Виды ставок</g, `>${cat.title}<`);
  fs.writeFileSync(path.join(pagesDir, `${cat.slug}.html`), page);
  console.log('Created', cat.slug + '.html');
}

for (const old of oldSlugs) {
  const oldPath = path.join(pagesDir, `${old}.html`);
  if (fs.existsSync(oldPath) && !CATEGORIES.some((c) => c.slug === old)) {
    fs.unlinkSync(oldPath);
    console.log('Removed', old + '.html');
  }
}

for (const cat of CATEGORIES) {
  const pagePath = path.join(pagesDir, `${cat.slug}.html`);
  if (!fs.existsSync(pagePath)) continue;
  let page = fs.readFileSync(pagePath, 'utf8');
  page = removeProfessionalsBlock(page);
  page = updateDescriptionBlock(page, cat.title);
  page = patchPageScripts(page);
  fs.writeFileSync(pagePath, page);
}

const redirectHtml = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <script>
    (function () {
      var slug = new URLSearchParams(location.search).get('slug') || 'futbol';
      var known = ${JSON.stringify(CATEGORIES.map((c) => c.slug))};
      if (known.indexOf(slug) === -1) slug = 'futbol';
      location.replace('./pages/' + slug + '.html');
    })();
  </script>
  <title>Переход…</title>
</head>
<body></body>
</html>`;
fs.writeFileSync(path.join(projectRoot, 'category.html'), redirectHtml);

console.log('Rebrand complete.');
