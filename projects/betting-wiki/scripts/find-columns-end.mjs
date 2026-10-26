import fs from 'fs';

const html = fs.readFileSync('c:/Users/Tigran/Desktop/vibe-coding-main/projects/Главная Вики/Статьи о ставках на спорт на Sports.ru.html', 'utf8');
const start = html.indexOf('<div class="columns">');
let depth = 0;
let end = -1;
for (let i = start; i < html.length; i++) {
  if (html.slice(i, i + 5) === '<div ') depth++;
  if (html.slice(i, i + 6) === '</div>') {
    depth--;
    if (depth === 0) {
      end = i + 6;
      break;
    }
  }
}
console.log('start', start, 'end', end, 'len', end - start);
console.log('tail:', html.slice(end - 100, end + 200));
