/**
 * Выводит дерево тегов «Ставочной/Спортивной вики» из GraphQL sports.ru.
 * node scripts/fetch-tag-ids.mjs
 */
const GQL = 'https://www.sports.ru/gql/graphql/';
const HEADERS = {
  'Content-Type': 'application/json',
  'x-appname': 'frontend-betting-wiki',
  'x-appversion': 'v0.0.1',
};

async function gql(query) {
  const r = await fetch(GQL, { method: 'POST', headers: HEADERS, body: JSON.stringify({ query }) });
  const json = await r.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data;
}

const TAG = 'id name type urls { relativeURL }';

const main = await gql(`{ tagQueries { bettingWikiTags(type: MAIN) { tags { ${TAG} } } } }`);
const categories = await gql(`{ tagQueries { bettingWikiTags(type: CATEGORY) { tags { ${TAG} } } } }`);

console.log('=== MAIN (корень вики) ===');
for (const t of main.tagQueries.bettingWikiTags.tags) {
  console.log(`${t.id}\t${t.name}\t${t.urls?.relativeURL || ''}`);
}

console.log('\n=== CATEGORY (виды спорта / разделы) ===');
for (const t of categories.tagQueries.bettingWikiTags.tags) {
  console.log(`${t.id}\t${t.name}\t${t.urls?.relativeURL || ''}`);

  const subs = await gql(`{ tagQueries { bettingWikiTags(type: SUBCATEGORY, parentID: "${t.id}") { tags { id name } } } }`);
  const subTags = subs.tagQueries.bettingWikiTags.tags || [];
  for (const s of subTags) {
    console.log(`  └ ${s.id}\t${s.name}`);
  }
}

console.log('\nСкопируйте ID в data/tags.js → sports.*.tagId и sections.*.tagId');
