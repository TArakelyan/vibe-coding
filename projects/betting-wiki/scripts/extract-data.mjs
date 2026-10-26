import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const htmlPath = path.resolve('c:/Users/Tigran/Desktop/vibe-coding-main/projects/Главная Вики/Статьи о ставках на спорт на Sports.ru.html');
const html = fs.readFileSync(htmlPath, 'utf8');

// Split by categories-block sections
const blockRegex = /<div[^>]*class="categories-block"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g;
const blocks = html.match(/<div[^>]*class="categories-block"[\s\S]*?(?=<div[^>]*class="categories-block"|<div[^>]*class="bookmaker-bonus-block|<div[^>]*class="description-block)/g) || [];

console.log('category blocks:', blocks.length);

const categories = [];

for (const block of blocks) {
  const titleMatch = block.match(/categories-block__title[^>]*>[\s\S]*?<h3[^>]*>([^<]+)<\/h3>/);
  const amountMatch = block.match(/categories-block__amount[^>]*>(\d+)/);
  const linkMatch = block.match(/href="(https:\/\/www\.sports\.ru\/betting\/stavochnaya-wiki\/[^"]+)"/);
  
  const cardRegex = /href="(https:\/\/www\.sports\.ru\/betting\/stavochnaya-wiki\/[^"]+)"[^>]*class="article-card[^"]*"[^>]*id="(\d+)"[\s\S]*?article-card__image"[^>]*src="([^"]+)"[\s\S]*?article-card__title">([^<]+)<[\s\S]*?article-card__rating[^>]*>([^<]*)<[\s\S]*?article-card__comments[^>]*>[\s\S]*?<\/svg>\s*(\d+)[\s\S]*?article-card__date">([^<]+)</g;
  
  const articles = [];
  let m;
  while ((m = cardRegex.exec(block)) !== null) {
    const rating = m[5].trim();
    articles.push({
      id: m[2],
      url: m[1],
      image: path.basename(m[3]),
      title: m[4].replace(/&nbsp;/g, ' ').trim(),
      rating: rating.startsWith('+') || rating.startsWith('-') ? rating : (rating ? `+${rating}` : '+0'),
      comments: parseInt(m[6], 10) || 0,
      date: m[7].trim()
    });
  }

  if (titleMatch) {
    categories.push({
      title: titleMatch[1].trim(),
      count: amountMatch ? parseInt(amountMatch[1], 10) : articles.length,
      categoryUrl: linkMatch ? linkMatch[1] : '',
      slug: linkMatch ? linkMatch[1].split('/').filter(Boolean).pop() : '',
      articles: articles.slice(0, 5) // preview articles on main page
    });
  }
}

console.log(JSON.stringify(categories.map(c => ({ title: c.title, count: c.count, articles: c.articles.length })), null, 2));

// Extract bonus cards
const bonusRegex = /class="bookmaker-bonus-card[\s\S]*?bookmaker-bonus-card__main-head-price[^>]*>([^<]+)<[\s\S]*?bookmaker-bonus-card__main-text[^>]*>([^<]+)</g;
const bonuses = [...html.matchAll(bonusRegex)].map(m => ({ price: m[1].trim(), text: m[2].trim() }));
console.log('bonuses:', bonuses.length, bonuses.slice(0, 2));

// Extract nav tabs
const tabRegex = /class="tabs__item[^"]*"[^>]*>[\s\S]*?tabs__item-text[^>]*>([^<]+)</g;
const tabs = [...html.matchAll(tabRegex)].map(m => m[1].trim());
console.log('tabs:', tabs);

// Write data files
const outDir = path.join(projectRoot, 'data');
fs.mkdirSync(outDir, { recursive: true });

// Collect all unique articles
const allArticlesMap = new Map();
const blockRegex2 = /href="(https:\/\/www\.sports\.ru\/betting\/stavochnaya-wiki\/[^"]+)"[^>]*class="article-card[^"]*"[^>]*id="(\d+)"[\s\S]*?article-card__image"[^>]*src="([^"]+)"[\s\S]*?article-card__title">([^<]+)</g;
let am;
while ((am = blockRegex2.exec(html)) !== null) {
  if (!allArticlesMap.has(am[2])) {
    allArticlesMap.set(am[2], {
      id: am[2],
      url: am[1],
      image: path.basename(am[3]),
      title: am[4].replace(/&nbsp;/g, ' ').trim()
    });
  }
}
console.log('unique articles in HTML:', allArticlesMap.size);

fs.writeFileSync(path.join(outDir, 'categories-preview.json'), JSON.stringify(categories, null, 2));
