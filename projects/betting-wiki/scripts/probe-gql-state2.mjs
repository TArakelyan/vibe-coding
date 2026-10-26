import fs from 'fs';

const html = fs.readFileSync('../Главная Вики/Статьи о ставках на спорт на Sports.ru.html', 'utf8');
const chunk = html.slice(html.indexOf("'__queryClientState':"), html.indexOf("'__extProps':"));

// Extract tag objects with id and name
const tagBlocks = [...chunk.matchAll(/\{id:"(\d+)",name:"([^"]+)",typeName:[^}]+\}/g)];
const unique = new Map();
for (const m of tagBlocks) {
  if (!unique.has(m[1])) unique.set(m[1], m[2]);
}
console.log('Tags found:', unique.size);
[...unique.entries()].slice(0, 40).forEach(([id, name]) => console.log(id, name));

// audience tags
const audience = [...chunk.matchAll(/name:"(Для [^"]+)"/g)].map((m) => m[1]);
console.log('\naudience:', [...new Set(audience)]);

// tag urls /tags/
const tagUrls = [...chunk.matchAll(/\\u002Ftags\\u002F(\d+)\\u002F/g)].map((m) => m[1]);
console.log('\n/tags/ ids:', [...new Set(tagUrls)].slice(0, 30));
