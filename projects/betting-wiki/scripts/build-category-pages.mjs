import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const pagesDir = path.join(projectRoot, 'pages');
const tempDir = path.join(projectRoot, 'source-pages');

const CATEGORIES = [
  {
    slug: 'vidy-stavok',
    url: 'https://www.sports.ru/betting/stavochnaya-wiki/vidy-stavok/',
    title: 'Виды ставок',
  },
  {
    slug: 'klyuchevye-terminy',
    url: 'https://www.sports.ru/betting/stavochnaya-wiki/klyuchevye-terminy/',
    title: 'Ключевые термины',
  },
  {
    slug: 'vidy-sporta',
    url: 'https://www.sports.ru/betting/stavochnaya-wiki/vidy-sporta/',
    title: 'Виды спорта',
  },
  {
    slug: 'nuzhno-znat',
    url: 'https://www.sports.ru/betting/stavochnaya-wiki/nuzhno-znat/',
    title: 'Нужно знать',
  },
  {
    slug: 'bukmekery',
    url: 'https://www.sports.ru/betting/stavochnaya-wiki/bukmekery/',
    title: 'Букмекеры',
  },
];

const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug).join('|');

function download(url, dest) {
  execSync(`curl.exe -sL -A "Mozilla/5.0" "${url}" -o "${dest}"`, { stdio: 'pipe' });
}

function extractCategoryBody(html) {
  const colsStart = html.indexOf('<div class="columns category-page">');
  if (colsStart === -1) throw new Error('columns category-page not found');

  let depth = 0;
  let colsEnd = -1;
  for (let i = colsStart; i < html.length; i++) {
    if (html.slice(i, i + 5) === '<div ') depth++;
    if (html.slice(i, i + 6) === '</div>') {
      depth--;
      if (depth === 0) {
        colsEnd = i + 6;
        break;
      }
    }
  }

  const bcStart = html.lastIndexOf('<ul class="ui-breadcrumbs', colsStart);
  if (bcStart === -1) throw new Error('breadcrumbs not found');

  return html.slice(bcStart, colsEnd);
}

function fixLinks(body, currentSlug) {
  let result = body;

  // Back link and wiki home
  result = result.replace(/href="\/betting\/stavochnaya-wiki\/?"/g, 'href="../index.html"');
  result = result.replace(/href="https:\/\/www\.sports\.ru\/betting\/stavochnaya-wiki\/?"/g, 'href="../index.html"');

  // Category pages between each other
  result = result.replace(
    new RegExp(`href="/betting/stavochnaya-wiki/(${CATEGORY_SLUGS})/"`, 'g'),
    'href="./$1.html"'
  );
  result = result.replace(
    new RegExp(`href="https://www\\.sports\\.ru/betting/stavochnaya-wiki/(${CATEGORY_SLUGS})/"`, 'g'),
    'href="./$1.html"'
  );

  // Article links -> full sports.ru URLs
  result = result.replace(
    /href="\/betting\/stavochnaya-wiki\/(\d+[^"]*\.html)"/g,
    'href="https://www.sports.ru/betting/stavochnaya-wiki/$1"'
  );

  // Breadcrumbs
  result = result.replace(/href="\/"/g, 'href="https://www.sports.ru/?utm_source=special-betting-wiki"');
  result = result.replace(/href="\/betting\/"/g, 'href="https://www.sports.ru/betting/?utm_source=special-betting-wiki"');

  // External betting links stay on sports.ru
  result = result.replace(/href="\/betting\//g, 'href="https://www.sports.ru/betting/');

  // Mark active category in seo-links if present on main-style nav
  result = result.replace(
    new RegExp(`(<a[^>]*href="\\./${currentSlug}\\.html"[^>]*)`, 'g'),
    '$1 aria-current="page"'
  );

  return result;
}

function buildPageHtml({ title, body }) {
  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <title>${title} — Ставочная вики — Sports.ru</title>
  <link rel="stylesheet" href="../assets/css/tokens.css">
  <link rel="stylesheet" href="../assets/css/index-4a2ea082.css">
  <link rel="stylesheet" href="../assets/css/CategoryPage-694c7b62.css">
  <link rel="stylesheet" href="../assets/css/CardsWithSlider-678f5531.css">
  <link rel="stylesheet" href="../assets/css/CardsByRows-0b0debc7.css">
  <link rel="stylesheet" href="../patch.css">
</head>
<body>
  <div id="betting-wiki-mount-point">
    <div class="layout betting-wiki-layout">
${body}
    </div>
  </div>
  <script src="../patch.js"></script>
</body>
</html>`;
}

fs.mkdirSync(pagesDir, { recursive: true });
fs.mkdirSync(tempDir, { recursive: true });

for (const cat of CATEGORIES) {
  const tempFile = path.join(tempDir, `${cat.slug}.html`);
  console.log(`Downloading ${cat.slug}...`);
  download(cat.url, tempFile);

  const html = fs.readFileSync(tempFile, 'utf8');
  let body = extractCategoryBody(html);
  body = fixLinks(body, cat.slug);

  const pagePath = path.join(pagesDir, `${cat.slug}.html`);
  fs.writeFileSync(pagePath, buildPageHtml({ title: cat.title, body }));
  console.log(`  -> ${pagePath} (${body.length} chars)`);
}

// Redirect old category.html query URLs
const redirectHtml = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <script>
    (function () {
      var slug = new URLSearchParams(location.search).get('slug') || 'vidy-stavok';
      var known = ['vidy-stavok','klyuchevye-terminy','vidy-sporta','nuzhno-znat','bukmekery','strategii-na-stavki','finance'];
      if (known.indexOf(slug) === -1) slug = 'vidy-stavok';
      if (slug === 'strategii-na-stavki' || slug === 'finance') {
        location.replace('./index.html');
        return;
      }
      location.replace('./pages/' + slug + '.html');
    })();
  </script>
  <title>Переход…</title>
</head>
<body></body>
</html>`;

fs.writeFileSync(path.join(projectRoot, 'category.html'), redirectHtml);
console.log('Done. Built', CATEGORIES.length, 'category pages.');
