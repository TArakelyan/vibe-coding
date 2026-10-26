import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const SOURCE_CANDIDATES = [
  path.resolve(projectRoot, '../Главная Вики'),
  path.resolve(projectRoot, 'source/main'),
];

const sourceDir = SOURCE_CANDIDATES.find((dir) =>
  fs.existsSync(path.join(dir, 'Статьи о ставках на спорт на Sports.ru.html'))
);

if (!sourceDir) {
  console.log('build-from-source: исходник не найден, шаг пропущен.');
  console.log('Ожидается папка «Главная Вики» или source/main с сохранённой страницей sports.ru.');
  process.exit(0);
}

const htmlPath = path.join(sourceDir, 'Статьи о ставках на спорт на Sports.ru.html');
const filesDir = path.join(sourceDir, 'Статьи о ставках на спорт на Sports.ru_files');
const html = fs.readFileSync(htmlPath, 'utf8');

// Inline design tokens from saved page
const styleStart = html.indexOf('<style>/**\n * Do not edit directly');
const styleEnd = html.indexOf('</style>', styleStart);
const inlineTokens = html.slice(styleStart + 7, styleEnd);

fs.mkdirSync(path.join(projectRoot, 'assets/css'), { recursive: true });
fs.writeFileSync(path.join(projectRoot, 'assets/css/tokens.css'), inlineTokens);

// Copy all CSS from source
for (const f of fs.readdirSync(filesDir)) {
  if (f.endsWith('.css')) {
    fs.copyFileSync(path.join(filesDir, f), path.join(projectRoot, 'assets/css', f));
  }
}

// Extract wiki body: breadcrumbs + columns (main + sidebar)
const breadcrumbsStart = html.lastIndexOf('<ul', html.indexOf('class="columns"'));
const columnsStart = html.indexOf('<div class="columns">');
let depth = 0;
let columnsEnd = -1;
for (let i = columnsStart; i < html.length; i++) {
  if (html.slice(i, i + 5) === '<div ') depth++;
  if (html.slice(i, i + 6) === '</div>') {
    depth--;
    if (depth === 0) {
      columnsEnd = i + 6;
      break;
    }
  }
}
let wikiBody = html.slice(breadcrumbsStart, columnsEnd);

// Fix asset paths
wikiBody = wikiBody.replace(/\.\/Статьи о ставках на спорт на Sports\.ru_files\//g, './assets/images/');

// Category list pages -> local static pages
wikiBody = wikiBody.replace(
  /href="https:\/\/www\.sports\.ru\/betting\/stavochnaya-wiki\/(vidy-stavok|klyuchevye-terminy|vidy-sporta|nuzhno-znat|bukmekery|strategii-na-stavki|finance)\/?"/g,
  (match, slug) => {
    if (slug === 'strategii-na-stavki' || slug === 'finance') return 'href="./index.html"';
    return `href="./pages/${slug}.html"`;
  }
);

// "Посмотреть все" / all-articles-button category links
wikiBody = wikiBody.replace(
  /href="https:\/\/www\.sports\.ru\/betting\/stavochnaya-wiki\/([^"/]+)\/"/g,
  (match, slug) => {
    if (/^\d+/.test(slug)) return match; // article
    if (slug === 'strategii-na-stavki' || slug === 'finance') return 'href="./index.html"';
    return `href="./pages/${slug}.html"`;
  }
);

// Articles stay on sports.ru (already correct)

// Copy all images used in wiki body
const assetsDir = path.join(projectRoot, 'assets/images');
fs.mkdirSync(assetsDir, { recursive: true });
const imgRefs = [...wikiBody.matchAll(/assets\/images\/([^"')]+)/g)].map(m => m[1]);
const uniqueImgs = [...new Set(imgRefs)];
for (const img of uniqueImgs) {
  const src = path.join(filesDir, img);
  if (fs.existsSync(src)) fs.copyFileSync(src, path.join(assetsDir, img));
}

// Also copy any images from files dir that might be needed
for (const f of fs.readdirSync(filesDir)) {
  if (/\.(jpe?g|png|webp|svg)$/i.test(f)) {
    const dst = path.join(assetsDir, f);
    if (!fs.existsSync(dst)) {
      fs.copyFileSync(path.join(filesDir, f), dst);
    }
  }
}

fs.writeFileSync(path.join(projectRoot, 'wiki-body.html'), wikiBody);

const indexHtml = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <title>Спортивная вики — Sports.ru</title>
  <link rel="stylesheet" href="./assets/css/tokens.css">
  <link rel="stylesheet" href="./assets/css/index-4a2ea082.css">
  <link rel="stylesheet" href="./assets/css/CategoryPage-694c7b62.css">
  <link rel="stylesheet" href="./assets/css/CardsWithSlider-678f5531.css">
  <link rel="stylesheet" href="./assets/css/CardsByRows-0b0debc7.css">
  <link rel="stylesheet" href="./patch.css">
</head>
<body>
  <div id="betting-wiki-mount-point">
    <div class="layout betting-wiki-layout">
${wikiBody}
    </div>
  </div>
  <script src="./data/config.js"></script>
  <script src="./data/categories.js"></script>
  <script src="./patch.js"></script>
</body>
</html>`;

fs.writeFileSync(path.join(projectRoot, 'index.html'), indexHtml);
console.log('Built index.html, wiki-body length:', wikiBody.length, 'images:', uniqueImgs.length);
