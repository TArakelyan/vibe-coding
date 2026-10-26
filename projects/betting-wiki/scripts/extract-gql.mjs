import fs from 'fs';
const js = fs.readFileSync('_catpage-lang.js', 'utf8');

// Extract byTagIDs query template
const idx = js.indexOf('byTagIDs');
console.log('context around byTagIDs:\n', js.slice(Math.max(0, idx - 200), idx + 1500));

// Extract bettingWikiTags queries
for (const name of ['so', 'no', 'ro', 'io', 'oo']) {
  const re = new RegExp(`const ${name}=`, 'g');
  const m = re.exec(js);
  if (m) console.log(`\n=== const ${name} at ${m.index} ===\n`, js.slice(m.index, m.index + 800));
}
