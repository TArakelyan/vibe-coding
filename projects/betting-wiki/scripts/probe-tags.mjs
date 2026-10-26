/**
 * Поиск эндпоинтов sports.ru для статей по тегам.
 * node scripts/probe-tags.mjs
 */
const UA = { 'User-Agent': 'Mozilla/5.0' };

async function fetchText(url) {
  const r = await fetch(url, { headers: UA });
  return { status: r.status, text: r.ok ? await r.text() : '' };
}

const pages = [
  'https://www.sports.ru/betting/stavochnaya-wiki/',
  'https://www.sports.ru/betting/stavochnaya-wiki/vidy-stavok/',
  'https://www.sports.ru/tag/stavki/',
];

for (const url of pages) {
  const { status, text } = await fetchText(url);
  console.log('\n===', url, status, 'len', text.length);

  const apiUrls = [...new Set([...text.matchAll(/https?:\/\/[^\s"'<>]+/g)].map((m) => m[0]))]
    .filter((u) => /api|graphql|tag|wiki|feed|posts|materials|articles/i.test(u))
    .slice(0, 25);
  console.log('urls:', apiUrls.join('\n  '));

  const tagLinks = [...new Set([...text.matchAll(/href="(\/tag\/[^"]+)"/g)].map((m) => m[1]))].slice(0, 15);
  console.log('tag links:', tagLinks.join(', '));
}

// Популярные API-шаблоны sports.ru
const candidates = [
  'https://www.sports.ru/api/materials/?tag=stavochnaya-wiki',
  'https://www.sports.ru/api/materials/?tags=stavochnaya-wiki',
  'https://www.sports.ru/ajax/materials/?tag=stavochnaya-wiki',
  'https://www.sports.ru/dynamic/api/materials/?tag=stavochnaya-wiki',
  'https://www.sports.ru/tag/stavochnaya-wiki/',
  'https://www.sports.ru/tag/stavki/',
];

console.log('\n=== API candidates ===');
for (const url of candidates) {
  try {
    const r = await fetch(url, { headers: { ...UA, Accept: 'application/json' } });
    const ct = r.headers.get('content-type') || '';
    const body = await r.text();
    console.log(url, '->', r.status, ct.slice(0, 40), body.slice(0, 120).replace(/\s+/g, ' '));
  } catch (e) {
    console.log(url, '-> ERR', e.message);
  }
}
