const GQL = 'https://www.sports.ru/gql/graphql/';
const HEADERS = {
  'Content-Type': 'application/json',
  'x-appname': 'frontend-betting-wiki',
  'x-appversion': 'v0.0.1',
};

async function gql(query) {
  const r = await fetch(GQL, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({ query }),
  });
  return r.json();
}

const parents = [
  ['161150421', 'MAIN Ставочная вики'],
  ['161150408', 'CATEGORY Виды ставок'],
  ['161150409', 'CATEGORY Ключевые термины'],
];

for (const [id, label] of parents) {
  const res = await gql(`{ tagQueries { bettingWikiTags(type: SUBCATEGORY, parentID: "${id}") { tags { id name } } } }`);
  const tags = res.data?.tagQueries?.bettingWikiTags?.tags;
  console.log(`\nSUB of ${label}:`, tags || res.errors?.[0]?.message);
  if (tags?.length) {
    const subId = tags[0].id;
    const arts = await gql(`{ postQueries { byTagIDs(IDs: ["${id}", "${subId}"], amount: 3, page: 1, minRate: 0) { totalCount posts { id title pageInfo { desktopURL } } } } }`);
    console.log('  articles:', arts.data?.postQueries?.byTagIDs || arts.errors?.[0]?.message);
  }
}

// 3 IDs like in original code: [main, category, sub]
const subs408 = await gql(`{ tagQueries { bettingWikiTags(type: SUBCATEGORY, parentID: "161150408") { tags { id name } } } }`);
const sub408 = subs408.data?.tagQueries?.bettingWikiTags?.tags?.[0];
if (sub408) {
  const arts3 = await gql(`{ postQueries { byTagIDs(IDs: ["161150421", "161150408", "${sub408.id}"], amount: 3, page: 1, minRate: 0) { totalCount posts { id title } } } }`);
  console.log('\n3-tag query:', arts3.data?.postQueries?.byTagIDs);
}
