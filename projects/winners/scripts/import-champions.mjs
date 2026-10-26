import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const tsvPath = path.join(root, 'data', 'champions-import.tsv');
const championsPath = path.join(root, 'data', 'champions.js');
const configPath = path.join(root, 'data', 'config.js');

const SPORT_MAP = {
  футбол: 'football',
  теннис: 'tennis',
  хоккей: 'hockey',
  баскетбол: 'basketball',
  автоспорт: 'motorsport',
  дартс: 'darts',
  амфут: 'amfut',
  бейсбол: 'baseball',
  киберспорт: 'esports',
  велоспорт: 'cycling',
};

const TOURNAMENT_MAP = {
  'ЧМ по футболу': 'football_wc',
  Евро: 'euro',
  'Лига чемпионов': 'ucl',
  РПЛ: 'rpl',
  АПЛ: 'epl',
  'Ла Лига': 'laliga',
  Бундеслига: 'bundesliga',
  'Серия А': 'seria_a',
  'Лига 1': 'ligue_1',
  'Кубок УЕФА': 'uefa_cup',
  'Лига Европы': 'europa_league',
  'Лига конференций': 'conference_league',
  'Копа Америка': 'copa_america',
  МЛС: 'mls',
  'Кубок России': 'russian_cup',
  'Кубок Англии': 'fa_cup',
  'Формула-1': 'formula1',
  Олимпиада: 'olympics',
  'Кубок Стэнли': 'stanley_cup',
  'Кубок Гагарина': 'gagarin_cup',
  'ЧМ по хоккею': 'hockey_wc',
  НБА: 'nba',
  'Кубок НБА': 'nba_cup',
  Евролига: 'euroleague',
  'Единая Лига ВТБ': 'vtb_league',
  'ЧМ по баскетболу': 'basketball_wc',
  Евробаскет: 'eurobasket',
  'Ролан Гаррос': 'roland_garros',
  Уимблдон: 'wimbledon',
  'Australian Open': 'australian_open',
  'US Open': 'us_open',
  'Итоговый WTA': 'wta_finals',
  'Итоговый ATP': 'atp_finals',
  'The International': 'the_international',
  НФЛ: 'nfl',
  МЛБ: 'mlb',
  'ЧМ по дартсу': 'darts_wc',
  'Tour de France': 'tour_de_france',
};

const TOURNAMENT_SPORT = {
  football_wc: 'football',
  euro: 'football',
  ucl: 'football',
  rpl: 'football',
  epl: 'football',
  laliga: 'football',
  bundesliga: 'football',
  seria_a: 'football',
  ligue_1: 'football',
  uefa_cup: 'football',
  europa_league: 'football',
  conference_league: 'football',
  copa_america: 'football',
  mls: 'football',
  russian_cup: 'football',
  fa_cup: 'football',
  formula1: 'motorsport',
  olympics: null,
  stanley_cup: 'hockey',
  gagarin_cup: 'hockey',
  hockey_wc: 'hockey',
  nba: 'basketball',
  nba_cup: 'basketball',
  euroleague: 'basketball',
  vtb_league: 'basketball',
  basketball_wc: 'basketball',
  eurobasket: 'basketball',
  roland_garros: 'tennis',
  wimbledon: 'tennis',
  australian_open: 'tennis',
  us_open: 'tennis',
  wta_finals: 'tennis',
  atp_finals: 'tennis',
  the_international: 'esports',
  nfl: 'amfut',
  mlb: 'baseball',
  darts_wc: 'darts',
  tour_de_france: 'cycling',
};

function transliterate(str) {
  const map = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z',
    и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r',
    с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sch',
    ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
    А: 'a', Б: 'b', В: 'v', Г: 'g', Д: 'd', Е: 'e', Ё: 'e', Ж: 'zh', З: 'z',
    И: 'i', Й: 'y', К: 'k', Л: 'l', М: 'm', Н: 'n', О: 'o', П: 'p', Р: 'r',
    С: 's', Т: 't', У: 'u', Ф: 'f', Х: 'h', Ц: 'ts', Ч: 'ch', Ш: 'sh', Щ: 'sch',
    Ъ: '', Ы: 'y', Ь: '', Э: 'e', Ю: 'yu', Я: 'ya',
  };
  return str
    .split('')
    .map((ch) => map[ch] ?? ch)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseProbability(raw) {
  const normalized = String(raw).trim().replace(',', '.');
  return parseFloat(normalized);
}

function parseOdds(raw) {
  return parseFloat(String(raw).trim().replace(',', '.'));
}

function parseDate(dateStr) {
  const [d, m, y] = dateStr.trim().split('.');
  return { date: `${d.padStart(2, '0')}.${m.padStart(2, '0')}.${y}`, year: parseInt(y, 10) };
}

function parseLine(line) {
  const parts = line.split('\t');
  if (parts.length < 7) return null;

  const dateStr = parts[0].trim();
  const odds = parseOdds(parts[1]);
  const probability = parseProbability(parts[2]);
  const sportRaw = parts[parts.length - 1].trim().toLowerCase();
  const tournamentRaw = parts[parts.length - 2].trim();
  const name = parts[3].trim();
  const description = parts.slice(4, parts.length - 2).join('\t').trim();

  if (!dateStr.match(/^\d{2}\.\d{2}\.\d{4}$/)) return null;

  const sport = SPORT_MAP[sportRaw];
  const tournament = TOURNAMENT_MAP[tournamentRaw];
  if (!sport || !tournament) {
    console.warn('Unmapped:', tournamentRaw, sportRaw, name, dateStr);
    return null;
  }

  const expectedSport = TOURNAMENT_SPORT[tournament];
  if (expectedSport && expectedSport !== sport) {
    console.warn('Sport mismatch:', name, tournamentRaw, sportRaw, 'expected', expectedSport);
  }

  const { date, year } = parseDate(dateStr);
  const baseId = `${transliterate(name)}-${tournament}-${year}`;

  return {
    id: baseId,
    name,
    year,
    date,
    sport,
    tournament,
    description,
    odds,
    probability,
    image: '',
  };
}

function loadExistingImages() {
  const content = fs.readFileSync(championsPath, 'utf8');
  const images = new Map();
  const idRe = /id:\s*'([^']+)'[\s\S]*?image:\s*"([^"]+)"/g;
  let m;
  while ((m = idRe.exec(content)) !== null) {
    if (m[2]) images.set(m[1], m[2]);
  }
  const keyRe = /name:\s*"([^"]+)"[\s\S]*?date:\s*'([^']+)'[\s\S]*?tournament:\s*'([^']+)'[\s\S]*?image:\s*"([^"]+)"/g;
  while ((m = keyRe.exec(content)) !== null) {
    if (m[4]) images.set(`${m[1]}|${m[2]}|${m[3]}`, m[4]);
  }
  return images;
}

function assignUniqueIds(entries) {
  const used = new Map();
  return entries.map((entry) => {
    let id = entry.id;
    const count = used.get(id) || 0;
    if (count > 0) id = `${entry.id}-${count + 1}`;
    used.set(entry.id, count + 1);
    return { ...entry, id };
  });
}

function escapeJs(str) {
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\r?\n/g, ' ');
}

function formatEntry(e) {
  const imageLine = e.image ? `        image: "${e.image}"` : `        image: ""`;
  return `    {
        id: '${e.id}',
        name: "${escapeJs(e.name)}",
        year: ${e.year},
        date: '${e.date}',
        sport: '${e.sport}',
        tournament: '${e.tournament}',
        description: "${escapeJs(e.description)}",
        odds: ${e.odds},
        probability: ${e.probability},
${imageLine}
    }`;
}

function updateConfig(entries) {
  let config = fs.readFileSync(configPath, 'utf8');

  const sportTournaments = {};
  for (const e of entries) {
    if (!sportTournaments[e.sport]) sportTournaments[e.sport] = new Set();
    sportTournaments[e.sport].add(e.tournament);
  }

  const tournamentDefs = {};
  for (const [key, def] of Object.entries(TOURNAMENT_MAP)) {
    tournamentDefs[def] = { name: key, sport: TOURNAMENT_SPORT[def] || 'multi' };
  }
  tournamentDefs.olympics = { name: 'Олимпиада', sport: 'multi' };

  for (const sport of Object.keys(sportTournaments)) {
    const list = [...sportTournaments[sport]].sort();
    const re = new RegExp(`(${sport}:\\s*\\{[\\s\\S]*?tournaments:\\s*\\[)([^\\]]*)(\\])`);
    const match = config.match(re);
    if (match) {
      const formatted = list.map((t) => `'${t}'`).join(', ');
      config = config.replace(re, `$1${formatted}$3`);
    }
  }

  const maxYear = Math.max(...entries.map((e) => e.year));
  config = config.replace(/max:\s*\d+(\s*\}\s*\}\s*;)/, `max: ${maxYear}$1`);

  const newTournaments = [
    "        'hockey_wc': { name: 'ЧМ по хоккею', sport: 'hockey' },",
    "        'russian_cup': { name: 'Кубок России', sport: 'football' },",
    "        'fa_cup': { name: 'Кубок Англии', sport: 'football' },",
  ];

  for (const line of newTournaments) {
    const key = line.match(/'([^']+)'/)[1];
    if (!config.includes(`'${key}':`)) {
      config = config.replace(
        /('darts_wc':[^}]+\},)\s*/,
        `$1\n${line}\n`
      );
    }
  }

  if (!config.includes("'hockey_wc'")) {
    config = config.replace(
      /('gagarin_cup':[^}]+\},)/,
      `$1\n        'hockey_wc': { name: 'ЧМ по хоккею', sport: 'hockey' },`
    );
  }
  if (!config.includes("'russian_cup'")) {
    config = config.replace(
      /('mls':[^}]+\},)/,
      `$1\n        'russian_cup': { name: 'Кубок России', sport: 'football' },`
    );
  }
  if (!config.includes("'fa_cup'")) {
    config = config.replace(
      /('russian_cup':[^}]+\},)/,
      `$1\n        'fa_cup': { name: 'Кубок Англии', sport: 'football' },`
    );
  }

  const footballTournaments = [...sportTournaments.football || []].sort();
  config = config.replace(
    /football:\s*\{[\s\S]*?tournaments:\s*\[[^\]]*\]/,
    (block) => block.replace(
      /tournaments:\s*\[[^\]]*\]/,
      `tournaments: [${footballTournaments.map((t) => `'${t}'`).join(', ')}]`
    )
  );

  const hockeyTournaments = [...(sportTournaments.hockey || [])].sort();
  config = config.replace(
    /hockey:\s*\{[\s\S]*?tournaments:\s*\[[^\]]*\]/,
    (block) => block.replace(
      /tournaments:\s*\[[^\]]*\]/,
      `tournaments: [${hockeyTournaments.map((t) => `'${t}'`).join(', ')}]`
    )
  );

  fs.writeFileSync(configPath, config, 'utf8');

  const rootConfig = path.join(root, 'config.js');
  if (fs.existsSync(rootConfig)) {
    fs.writeFileSync(rootConfig, config, 'utf8');
  }
}

function main() {
  const tsv = fs.readFileSync(tsvPath, 'utf8');
  const lines = tsv.split(/\r?\n/).filter((l) => l.trim());
  const images = loadExistingImages();

  let entries = [];
  for (const line of lines) {
    const entry = parseLine(line);
    if (entry) entries.push(entry);
  }

  entries = assignUniqueIds(entries);

  const manualImages = {
    'Falcons|14.09.2025|the_international':
      'https://dumpster.cdn.sports.ru/5/f6/717f1d6883cf831d47ebfb24f5c73.png',
    'Люк Литтлер|03.01.2025|darts_wc':
      'https://dumpster.cdn.sports.ru/4/dc/4a0cb8437cea77765b436dcbc8345.png',
  };

  for (const entry of entries) {
    const key = `${entry.name}|${entry.date}|${entry.tournament}`;
    const img = manualImages[key] || images.get(key) || images.get(entry.id);
    if (img) entry.image = img;
  }

  entries.sort((a, b) => {
    const [da, ma, ya] = a.date.split('.').map(Number);
    const [db, mb, yb] = b.date.split('.').map(Number);
    return new Date(ya, ma - 1, da) - new Date(yb, mb - 1, db);
  });

  const body = entries.map(formatEntry).join(',\n');
  const output = `// База данных чемпионов\nconst allChampionsData = [\n${body}\n];\n`;
  fs.writeFileSync(championsPath, output, 'utf8');

  updateConfig(entries);

  console.log(`Imported ${entries.length} champions`);
  console.log(`With images: ${entries.filter((e) => e.image).length}`);
}

main();
