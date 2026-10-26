import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const sourceDir = path.resolve('c:/Users/Tigran/Desktop/vibe-coding-main/projects/Главная Вики');
const htmlPath = path.join(sourceDir, 'Статьи о ставках на спорт на Sports.ru.html');
const filesDir = path.join(sourceDir, 'Статьи о ставках на спорт на Sports.ru_files');
const html = fs.readFileSync(htmlPath, 'utf8');

const navStart = html.indexOf('class="navigation-betting"');
const descStart = html.indexOf('class="description-block"', navStart);
const mainSection = html.slice(navStart, descStart);

const categoryRegex = /categories-block__title">([^<]+)\s*<span[^>]*categories-block__amount[^>]*>(\d+)/g;
const categoryMeta = [...mainSection.matchAll(categoryRegex)].map(m => ({
  title: m[1].trim(),
  count: parseInt(m[2], 10)
}));

const categoryUrlRegex = /categories-block__extra--top[^>]*>[\s\S]*?href="(https:\/\/www\.sports\.ru\/betting\/stavochnaya-wiki\/[^"]+)"/g;
const categoryUrls = [...mainSection.matchAll(categoryUrlRegex)].map(m => m[1]);

const blocks = mainSection.split(/<div[^>]*class="categories-block"/).slice(1);

const categories = categoryMeta.map((meta, i) => {
  const block = blocks[i] || '';
  const url = categoryUrls[i] || '';
  const slug = url.split('/').filter(Boolean).pop() || '';

  const cardRegex = /href="(https:\/\/www\.sports\.ru\/betting\/stavochnaya-wiki\/[^"]+)"[^>]*class="article-card[^"]*"[^>]*id="(\d+)"[\s\S]*?article-card__image"[^>]*src="\.\/[^"]*\/([^"]+)"[\s\S]*?article-card__title">([^<]+)<[\s\S]*?article-card__rating[^>]*>([^<]*)<[\s\S]*?article-card__comments[^>]*>[\s\S]*?<\/svg>\s*(\d+)[\s\S]*?article-card__date">([^<]+)</g;

  const articles = [];
  let m;
  while ((m = cardRegex.exec(block)) !== null) {
    const ratingRaw = m[5].trim();
    articles.push({
      id: m[2],
      url: m[1],
      image: m[3],
      title: m[4].replace(/&nbsp;/g, ' ').trim(),
      rating: ratingRaw || '+0',
      comments: parseInt(m[6], 10) || 0,
      date: m[7].trim()
    });
  }

  return { ...meta, slug, url, articles };
});

console.log('categories:', categories.map(c => `${c.title} (${c.count}) - ${c.articles.length} cards`));

// Bonuses
const bonusBlock = html.slice(html.indexOf('bookmaker-bonus-block'), html.indexOf('bookmaker-ratings'));
const bonusCardRegex = /bookmaker-bonus-card__main-head-price[^>]*>([^<]+)<[\s\S]*?bookmaker-bonus-card__main-text[^>]*>([^<]+)</g;
const bonuses = [...bonusBlock.matchAll(bonusCardRegex)].map((m, i) => ({
  id: i + 1,
  price: m[1].trim(),
  text: m[2].trim()
}));
console.log('bonuses:', bonuses.length);

// Bookmaker ratings
const ratingsBlock = html.match(/bookmaker-ratings[\s\S]*?bookmaker-ratings__bookmakers[\s\S]*?(?=bookmaker-ratings--light|description-block)/);
const bookmakerRegex = /bookmaker-ratings__bookmaker-button-text[^>]*>([^<]+)</g;
const bookmakers = ratingsBlock ? [...ratingsBlock[0].matchAll(bookmakerRegex)].map(m => m[1].trim()) : [];
console.log('bookmakers:', bookmakers);

// All articles map with categories
const allArticles = new Map();
categories.forEach(cat => {
  cat.articles.forEach(a => {
    if (!allArticles.has(a.id)) {
      allArticles.set(a.id, { ...a, categories: [cat.slug] });
    } else {
      allArticles.get(a.id).categories.push(cat.slug);
    }
  });
});

// Tag data for key terms category (from web search results)
const audienceTags = [
  { id: 'beginner', title: 'Для новичков', count: 26 },
  { id: 'amateur', title: 'Для любителей', count: 18 },
  { id: 'advanced', title: 'Для продвинутых', count: 18 },
  { id: 'pro', title: 'Для профессионалов', count: 7 }
];

const categoryList = categories.map(({ title, count, slug, url }) => ({ title, count, slug, url }));

// Copy images
const assetsDir = path.join(projectRoot, 'assets', 'images');
fs.mkdirSync(assetsDir, { recursive: true });
const images = new Set();
categories.forEach(c => c.articles.forEach(a => images.add(a.image)));
for (const img of images) {
  const src = path.join(filesDir, img);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(assetsDir, img));
  }
}

// Copy CSS
const cssDir = path.join(projectRoot, 'assets', 'css');
fs.mkdirSync(cssDir, { recursive: true });
['index-4a2ea082.css', 'CategoryPage-694c7b62.css', 'CardsWithSlider-678f5531.css', 'CardsByRows-0b0debc7.css'].forEach(f => {
  const src = path.join(filesDir, f);
  if (fs.existsSync(src)) fs.copyFileSync(src, path.join(cssDir, f));
});

// Write JS data files
const dataDir = path.join(projectRoot, 'data');
fs.mkdirSync(dataDir, { recursive: true });

fs.writeFileSync(path.join(dataDir, 'categories.js'), `const WIKI_CATEGORIES = ${JSON.stringify(categoryList, null, 2)};\n`);

const previewData = categories.map(({ title, count, slug, url, articles }) => ({
  title, count, slug, url, articles
}));
fs.writeFileSync(path.join(dataDir, 'preview.js'), `const WIKI_PREVIEW = ${JSON.stringify(previewData, null, 2)};\n`);

fs.writeFileSync(path.join(dataDir, 'bonuses.js'), `const WIKI_BONUSES = ${JSON.stringify(bonuses, null, 2)};\n`);

fs.writeFileSync(path.join(dataDir, 'audience-tags.js'), `const WIKI_AUDIENCE_TAGS = ${JSON.stringify(audienceTags, null, 2)};\n`);

// Extract wiki content HTML snippet for reference
const wikiHtmlStart = html.indexOf('<div class="navigation-betting"');
const wikiHtmlEnd = html.indexOf('<div class="description-block"', wikiHtmlStart);
let wikiHtml = html.slice(wikiHtmlStart, wikiHtmlEnd);
wikiHtml = wikiHtml.replace(/\.\/Статьи о ставках на спорт на Sports\.ru_files\//g, './assets/images/');
wikiHtml = wikiHtml.replace(/https:\/\/www\.sports\.ru\/betting\/stavochnaya-wiki\//g, './category.html?slug=');
wikiHtml = wikiHtml.replace(/href="\.\/category\.html\?slug=([^"]+\.html)"/g, (match, slug) => {
  const articleUrl = slug;
  return `href="https://www.sports.ru/betting/stavochnaya-wiki/${articleUrl}"`;
});
fs.writeFileSync(path.join(projectRoot, 'wiki-section-raw.html'), wikiHtml);

console.log('Done. Categories:', categoryList.length);
