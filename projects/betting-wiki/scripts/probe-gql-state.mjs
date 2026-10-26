import fs from 'fs';

const html = fs.readFileSync('../Главная Вики/Статьи о ставках на спорт на Sports.ru.html', 'utf8');

// Extract __queryClientState
const start = html.indexOf("'__queryClientState':");
if (start === -1) {
  console.log('no queryClientState');
  process.exit(1);
}

// Find JSON-like structure - it's a function call
const chunk = html.slice(start, start + 500000);

// Search for tag-related keys
const patterns = [
  /tag[A-Za-z]*["']?\s*[:=]\s*["']?([^"',}\]]+)/gi,
  /"slug"\s*:\s*"([^"]+)"/g,
  /"title"\s*:\s*"([^"]+)"/g,
  /"id"\s*:\s*"?(\d+)"?/g,
  /wiki/gi,
  /category/gi,
];

for (const key of ['tag', 'tags', 'wiki', 'category', 'fakty', 'chempiony', 'audience', 'section']) {
  const re = new RegExp(`.{0,40}${key}.{0,80}`, 'gi');
  const hits = [...chunk.matchAll(re)].slice(0, 8);
  if (hits.length) {
    console.log(`\n--- ${key} ---`);
    hits.forEach((h) => console.log(h[0].replace(/\s+/g, ' ').slice(0, 120)));
  }
}

// category blocks in SSR
const catTitles = [...html.matchAll(/categories-block__title">([^<]+)\s*<span/g)].map((m) => m[1].trim());
console.log('\ncategory titles:', catTitles);

// routefromserver ids
const routes = [...html.matchAll(/routefromserver="([^"]+)"/g)].map((m) => m[1]);
console.log('routes:', routes);
