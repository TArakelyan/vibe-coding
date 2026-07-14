/**
 * Проставляет клубные логотипы в data/champions.js.
 * Запуск: node scripts/apply-club-logos.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const championsPath = path.join(__dirname, '..', 'data', 'champions.js');

const L = {
  liverpoolOld: 'https://dumpster.cdn.sports.ru/7/02/9f4ac4e2e0aab6811303eeb5d58ae.png',
  liverpoolNew: 'https://dumpster.cdn.sports.ru/0/f7/787c06022028f889673deb915e7c5.png',
  chelsea2005: 'https://dumpster.cdn.sports.ru/b/e7/ea80f62d86950187e208d4bd89131.png',
  chelseaNew: 'https://dumpster.cdn.sports.ru/6/20/cc42ac20efd727f4930a802ce7092.png',
  manUtd: 'https://dumpster.cdn.sports.ru/a/b9/4066cf5bde837a5ed4ff97200e06f.png',
  tottenham: 'https://dumpster.cdn.sports.ru/8/45/38e822740455294c174e10e82f92d.png',
  realMadrid: 'https://dumpster.cdn.sports.ru/e/c4/e0d25955d28b179b010bd852d8471.png',
  manCityOld: 'https://dumpster.cdn.sports.ru/0/1b/ae2cb3d0f1e52dfce0feaa27d8a32.png',
  manCityNew: 'https://dumpster.cdn.sports.ru/3/d4/bbbe79122a43c18ee165583612527.png',
  montpellier: 'https://dumpster.cdn.sports.ru/6/44/fcfb9b88339942afbdb51162328bf.png',
  leicester: 'https://dumpster.cdn.sports.ru/c/fd/de41826d5d562996b8ea62e278373.png',
  interOld: 'https://dumpster.cdn.sports.ru/f/e3/aa0eed13d98336a2273397af5a8fd.png',
  interNew: 'https://dumpster.cdn.sports.ru/5/ff/c7ee1acb0e621ae016fa4cb6741e1.png',
  laGalaxy: 'https://dumpster.cdn.sports.ru/6/10/1f9b81c540f75d9b542a3b07c5a06.png',
  interMiami: 'https://dumpster.cdn.sports.ru/c/d2/e866a7fb7646269cc7cfe3673b5dd.png',
  columbusCrew: 'https://dumpster.cdn.sports.ru/f/64/e8c5aae4d70d6a9c35740b59c3ce3.png',
  laFc: 'https://dumpster.cdn.sports.ru/4/c5/01da99f6f099cbc7d3dbab5349af3.png',
  nycFc: 'https://dumpster.cdn.sports.ru/d/f2/951e3172cde14a0ec1fde3cfacdd2.png',
  mlsSeattle: 'https://dumpster.cdn.sports.ru/3/6d/176662dd62f3942a2d0029459f5e6.png',
  mlsAtlanta: 'https://dumpster.cdn.sports.ru/3/45/0c99015b8cb0dc98aca275a125305.png',
  mlsToronto: 'https://dumpster.cdn.sports.ru/6/49/8f8d0d432bab2e70a8a1b6962bba5.png',
  mlsKansasCity: 'https://dumpster.cdn.sports.ru/3/48/2079628eaf27b6dedb5413d3cd9ba.png',
  mlsColorado: 'https://dumpster.cdn.sports.ru/7/9f/3122148b38b6fdf486b92656a4720.png',
  mlsSaltLake: 'https://dumpster.cdn.sports.ru/9/7a/ac8296191e2205013c747db3b45e8.png',
  falcons: 'https://dumpster.cdn.sports.ru/f/30/99e581131bb10a50381b9c8913d2f.png',
  navi: 'https://dumpster.cdn.sports.ru/b/b1/13fdab65982d479f8306f16bc24ec.png',
  invictusGaming: 'https://dumpster.cdn.sports.ru/2/3b/e51cbf99ad12301f807852638af86.png',
  alliance: 'https://dumpster.cdn.sports.ru/0/d1/f8f31f68b0ed14c426d345d79a2f4.png',
  newbee: 'https://dumpster.cdn.sports.ru/7/c9/f659c32880d28694c6ac0e7445612.png',
  evilGeniuses: 'https://dumpster.cdn.sports.ru/c/53/bc7263883af3274df099a26336d4f.png',
  wingsGaming: 'https://dumpster.cdn.sports.ru/c/de/ea79dc5fbccc419e6bf4392fb3b4f.png',
  teamLiquid: 'https://dumpster.cdn.sports.ru/2/35/a9a991a17c022c9282aadcd898e09.png',
  og: 'https://dumpster.cdn.sports.ru/5/7c/3d78b40e5b427fd7e107e91aa429d.png',
  teamSpirit: 'https://dumpster.cdn.sports.ru/3/1c/ec510a52f1061ed6374220c5e8df1.png',
  tundraEsports: 'https://dumpster.cdn.sports.ru/c/3f/c54c9c31ebf7739afb5d70b6c590d.png',
  bayern: 'https://dumpster.cdn.sports.ru/d/a1/779138b4afaa471b587117cda47d4.png',
  bayer: 'https://dumpster.cdn.sports.ru/8/c0/3ab356307778d7ebc2595e3cbeff8.png',
  dortmund: 'https://dumpster.cdn.sports.ru/1/40/42b17954c89ca4c4572050f427a9b.png',
  wolfsburg: 'https://dumpster.cdn.sports.ru/6/6d/71cf9fd45deb41f6966e2553bd134.png',
  werder: 'https://dumpster.cdn.sports.ru/8/e4/8252e8c12b94972c7fa3988f7fa8b.png',
  stuttgart: 'https://dumpster.cdn.sports.ru/7/90/93e73bef545ceeb743da45c2b08e5.png',
  tosno: 'https://dumpster.cdn.sports.ru/e/0b/62c0f4e55e2da0ab4f89916339a93.png',
  deportivo: 'https://dumpster.cdn.sports.ru/e/ae/01ebefc3f2ef6c915400309720f9e.png',
  valencia: 'https://dumpster.cdn.sports.ru/5/ac/8141b69b74c6c91ca724e6ffbc7af.png',
  atletico2017: 'https://dumpster.cdn.sports.ru/f/92/ad5c35356993bf4b1040a538a697d.png',
  atletico2008: 'https://dumpster.cdn.sports.ru/0/62/a7ed92ca265deab0cf7ece19d9dbc.png',
  lille2014: 'https://dumpster.cdn.sports.ru/a/5c/b522eed0a841be2fd970bc5a1c954.png',
  lilleBefore2015: 'https://dumpster.cdn.sports.ru/f/5e/0f7556bbb0d3569606546731b670e.png',
  monaco2010: 'https://dumpster.cdn.sports.ru/3/5f/363fbeb1f8d5923cb2a8c3e7fd1f9.png',
  monaco2000: 'https://dumpster.cdn.sports.ru/6/f1/711e2ba53a3e1e7601bff7738e4d3.png',
  marseille: 'https://dumpster.cdn.sports.ru/3/36/c355148ba86d49092d290f66774a7.png',
  bordeaux: 'https://dumpster.cdn.sports.ru/e/2d/c95ba120a542e80c4f8db9cb785b6.png',
  lyon: 'https://dumpster.cdn.sports.ru/c/09/3a57fdb7aa5c257839ad95ac22cc1.png',
  nantes: 'https://dumpster.cdn.sports.ru/c/39/1ea054a569d9e273dd2ad3122a546.png',
  napoli: 'https://dumpster.cdn.sports.ru/5/57/bdd7750ba92a7eaa40564e10a02ce.png',
  milan: 'https://dumpster.cdn.sports.ru/4/a4/60bbe9614eae1fd6747368bab365c.png',
  juventus2017: 'https://dumpster.cdn.sports.ru/c/47/c7c449de9520aa5839e37a64f8170.png',
  juventusOld: 'https://dumpster.cdn.sports.ru/4/7b/604c9f39fd473d27d08fe5afd86dd.png',
  romaOld: 'https://dumpster.cdn.sports.ru/2/09/04b591965f5aeb1adba76fada197a.png',
  roma2001: 'https://dumpster.cdn.sports.ru/2/e5/d608401aca3e43b91061a5e0b58b7.png',
  roma2011: 'https://dumpster.cdn.sports.ru/6/2e/643848769dc9cb569a7db38416205.png',
  lazio: 'https://dumpster.cdn.sports.ru/f/23/c3a4af03388795c12014166cfd869.png',
  olympiacosFootball: 'https://dumpster.cdn.sports.ru/9/ec/70323e3036e986353423d2a614f83.png',
  atalanta: 'https://dumpster.cdn.sports.ru/7/c0/0cc46b7b50be693adc28c4e785994.png',
  westHam: 'https://dumpster.cdn.sports.ru/2/a0/017c2b89d6bcb83c93937e49e4bd5.png',
  sevilla: 'https://dumpster.cdn.sports.ru/e/2f/1a723beba1664d9addb7c80f2804c.png',
  eintracht: 'https://dumpster.cdn.sports.ru/b/58/3da5d9a2110fc2c119c326231fb66.png',
  villarreal: 'https://dumpster.cdn.sports.ru/0/cd/51e2dde2348fb6cd334b9f1a6bc03.png',
  porto: 'https://dumpster.cdn.sports.ru/c/f2/5d369469cb2a0c27feda56712ac4e.png',
  shakhtar: 'https://dumpster.cdn.sports.ru/6/73/11884df2139c608d79efe890adbb9.png',
  feyenoord: 'https://dumpster.cdn.sports.ru/0/e6/1715b07c00b7d851c6ecc0b6a242f.png',
  galatasaray: 'https://dumpster.cdn.sports.ru/2/de/2312c45335160b4dd5fc9148aa5fe.png',
  virtusBologna: 'https://dumpster.cdn.sports.ru/3/df/b72189e5b8a1224a3f1a87c0e17aa.png',
  anadoluEfes: 'https://dumpster.cdn.sports.ru/1/e6/87f06d013b99673d57bddf484fb8b.png',
  panathinaikosBasketballNew: 'https://dumpster.cdn.sports.ru/e/a2/b4dc2fba25f98a19d03691265b60c.png',
  panathinaikosBasketballOld: 'https://dumpster.cdn.sports.ru/7/e4/898611a80900b16a236501de489d8.png',
  maccabi: 'https://dumpster.cdn.sports.ru/4/6e/03ec1e0d0b92ced65a4a3135274e0.png',
  realMadridBasketball: 'https://dumpster.cdn.sports.ru/8/d3/964167da96dc0fa6d9f3f1f7af58f.png',
  zenitBasketball: 'https://dumpster.cdn.sports.ru/9/3c/df5bf5ed0f7a1212c9907cfecf297.png',
  unics: 'https://dumpster.cdn.sports.ru/5/32/72a5452e4743cca1295a5f815c835.png',
  lakers: 'https://dumpster.cdn.sports.ru/7/b1/c63ae16ecb1313b88dd9151a98591.png',
  spurs: 'https://dumpster.cdn.sports.ru/5/d6/f181d95181937edbd01b9675a2652.png',
  celtics: 'https://dumpster.cdn.sports.ru/5/52/19c1e176fa9a3931dd70edf33f4f5.png',
  pistons: 'https://dumpster.cdn.sports.ru/c/6d/0c4055a4841ca8316b9cc9ed5fcf1.png',
  heat: 'https://dumpster.cdn.sports.ru/0/f1/8b4a6bae7c8b9cdf43e2ea1cd373d.png',
  mavericks: 'https://dumpster.cdn.sports.ru/9/74/5472bd98bc7356fddee32e7c2fce9.png',
  raptors: 'https://dumpster.cdn.sports.ru/d/22/8409dce52fe771c77b5e68fe7a72d.png',
  cavaliers: 'https://dumpster.cdn.sports.ru/5/2d/ed158a098beba408215d72d1d42b6.png',
  warriors: 'https://dumpster.cdn.sports.ru/a/dd/a5a863526dca71a4182f3ffcb5764.png',
  thunder: 'https://dumpster.cdn.sports.ru/5/63/3986d0a595c0b253ca7bdba4b9469.png',
  bucks: 'https://dumpster.cdn.sports.ru/6/64/f9306912d0f12a14d685ba127a7a0.png',
  nuggets: 'https://dumpster.cdn.sports.ru/f/b1/0307b2371830226a9afb0b8364e32.png',
  knicks: 'https://dumpster.cdn.sports.ru/3/6b/fc743fc9ed01cca237ab4522f37e8.png',
  fenerbahce: 'https://dumpster.cdn.sports.ru/b/5d/f0a549a8075ac8b2ce68f93f86132.png',
  akBars: 'https://dumpster.cdn.sports.ru/8/24/c24f5838ce87a35ef3290f1bca5e5.png',
  salavatYulaev: 'https://dumpster.cdn.sports.ru/2/fd/855e558399627ee1608e1d7512dac.png',
  dynamoHockey: 'https://dumpster.cdn.sports.ru/2/9a/52660f81398c5b5c4f7a70096625e.png',
  cskaHockey: 'https://dumpster.cdn.sports.ru/8/8d/ca697a905f71a07fab7177a43bc21.png',
  ska: 'https://dumpster.cdn.sports.ru/9/b5/1c938e9f76f175919d10f3cb2496c.png',
  avangard: 'https://dumpster.cdn.sports.ru/d/d7/67e65f9990e2e191a93816999bb9b.png',
  metallurg2024: 'https://dumpster.cdn.sports.ru/1/bc/62be8a9a676d70b4c491b50ae5b81.png',
  metallurgOld: 'https://dumpster.cdn.sports.ru/0/4c/81dd90241d353b6d58f0739745c15.png',
  newJerseyDevils: 'https://dumpster.cdn.sports.ru/f/ed/9ab77274eef568e3af43622f6e706.png',
  anaheimDucks: 'https://dumpster.cdn.sports.ru/8/f8/2e5ece1e2248a55da45d5fb0fdf4c.png',
  detroitRedWings: 'https://dumpster.cdn.sports.ru/c/5d/24795ace0f6f4094ab879e3cb15ca.png',
  bostonBruins: 'https://dumpster.cdn.sports.ru/c/38/e2950a991d9c3744c39c019333ffa.png',
  chicagoBlackhawks: 'https://dumpster.cdn.sports.ru/7/28/42a16a11a76cc713e745167a88430.png',
  laKings: 'https://dumpster.cdn.sports.ru/6/33/59dadd9a124fdef0cce58e4c0f7d1.png',
  pittsburghPenguins: 'https://dumpster.cdn.sports.ru/5/6f/50b320855c7211665c2baf886a475.png',
  washingtonCapitals: 'https://dumpster.cdn.sports.ru/5/6c/d186b12ee56e0763efb270151ff93.png',
  tampaBay2004: 'https://dumpster.cdn.sports.ru/b/91/23cbea1b830342c21f389ddbe7324.png',
  tampaBay2020: 'https://dumpster.cdn.sports.ru/9/4a/8481597771a5438dff2c92cf2c571.png',
  stLouisBlues: 'https://dumpster.cdn.sports.ru/0/6b/25d4b571ca68abb0623378ae3a36b.png',
  coloradoAvalanche: 'https://dumpster.cdn.sports.ru/8/61/210d366cf37ce0bc49d1ed71b8905.png',
  vegasGoldenKnights: 'https://dumpster.cdn.sports.ru/e/c4/f353310617617c02df5a5506383da.png',
  floridaPanthers: 'https://dumpster.cdn.sports.ru/f/b5/ce28722ea18466ea9872c5775d50a.png',
  seattleSeahawks: 'https://dumpster.cdn.sports.ru/0/03/7c3e15732be846c057631e0321e6f.png',
  kansasCityChiefs: 'https://dumpster.cdn.sports.ru/9/29/e46d7ed8cbfa3e89317176b8e5f2c.png',
  newEnglandPatriots: 'https://dumpster.cdn.sports.ru/9/2a/d7a240673bc3a3b6a44c9cdfbc2f0.png',
  philadelphiaEagles: 'https://dumpster.cdn.sports.ru/4/d8/35304566794d1baed4923f9ebceda.png',
  tampaBayBuccaneers: 'https://dumpster.cdn.sports.ru/3/cc/27eb1c224464580d9705c77c418e6.png',
  greenBayPackers: 'https://dumpster.cdn.sports.ru/b/ce/70acf931dac13059ac7187d055859.png',
  newYorkGiants: 'https://dumpster.cdn.sports.ru/4/20/d7879c3a7e45163ca8b60b0a0d0d3.png',
  baltimoreRavens: 'https://dumpster.cdn.sports.ru/5/c6/55688d85424d3e374397cee92b5ef.png',
  denverBroncos: 'https://dumpster.cdn.sports.ru/d/4b/a6ad1dbf9426ec859ba7deb429042.png',
  losAngelesRams: 'https://dumpster.cdn.sports.ru/3/79/e9c0450ba3d8336db24900a8b2230.png',
  stLouisRams: 'https://dumpster.cdn.sports.ru/a/85/fbde3cf75da2a64a0a4276dbc0f0b.png',
  pittsburghSteelers: 'https://dumpster.cdn.sports.ru/7/e2/66bba448566ea026b287fa101745b.png',
  indianapolisColts: 'https://dumpster.cdn.sports.ru/4/06/c5194f7944c35e087c72de307acbe.png',
  newOrleansSaints: 'https://dumpster.cdn.sports.ru/7/d3/2dfb5b24a253735b98b969197435a.png',
  f1Norris: 'https://dumpster.cdn.sports.ru/6/66/758086fd19b7434f7a623987fdc4d.png',
  f1Verstappen: 'https://dumpster.cdn.sports.ru/f/97/11c401a7789bd9e076acdf9bc0e3f.png',
  f1Hamilton2010: 'https://dumpster.cdn.sports.ru/5/38/b2c24dfd4e3e56fbccbfd723ed90b.png',
  f1HamiltonBefore2010: 'https://dumpster.cdn.sports.ru/f/62/3e471c71f43dc3a4947feb857f9d0.png',
  f1Rosberg: 'https://dumpster.cdn.sports.ru/6/99/25ff17baa4b442d98f19eafe8e799.png',
  f1Vettel: 'https://dumpster.cdn.sports.ru/7/12/07c3c15b5eb6f8bcab8f043c783fb.png',
  f1Button: 'https://dumpster.cdn.sports.ru/d/7b/37983dc0944d451d3a6f92aefa42b.png',
  f1Raikkonen: 'https://dumpster.cdn.sports.ru/4/ae/b0164674641e3e56a91615d2e6488.png',
  f1Alonso: 'https://dumpster.cdn.sports.ru/4/66/d5e15e38c635994b81a9eb98d810c.png',
  f1Schumacher: 'https://dumpster.cdn.sports.ru/6/7f/c220ce5accd3356653a0c51a7462b.png',
};

function seasonStartYear(dateString) {
  const parts = dateString.split('.');
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  return month >= 7 ? year : year - 1;
}

function getEsportsLogo(champion) {
  if (champion.tournament !== 'the_international') {
    return null;
  }

  switch (champion.name) {
    case 'Falcons':
      return L.falcons;
    case 'NaVi':
      return L.navi;
    case 'Invictus Gaming':
      return L.invictusGaming;
    case 'Alliance':
      return L.alliance;
    case 'Newbee':
      return L.newbee;
    case 'Evil Geniuses':
      return L.evilGeniuses;
    case 'Wings Gaming':
      return L.wingsGaming;
    case 'Team Liquid':
      return L.teamLiquid;
    case 'OG':
      return L.og;
    case 'Team Spirit':
      return L.teamSpirit;
    case 'Tundra Esports':
      return L.tundraEsports;
    default:
      return null;
  }
}

function getMlsLogo(champion) {
  if (champion.tournament !== 'mls') {
    return null;
  }

  switch (champion.name) {
    case 'ЛА Гэлакси':
      return L.laGalaxy;
    case 'Интер Майами':
      return L.interMiami;
    case 'Коламбус Крю':
      return L.columbusCrew;
    case 'ФК Лос Анджелес':
      return L.laFc;
    case 'Нью-Йорк Сити':
      return L.nycFc;
    case 'Сиэтл':
      return L.mlsSeattle;
    case 'Атланта':
      return L.mlsAtlanta;
    case 'Торонто':
      return L.mlsToronto;
    case 'Канзас-Сити':
      return L.mlsKansasCity;
    case 'Колорадо':
      return L.mlsColorado;
    case 'Солт-Лейк':
      return L.mlsSaltLake;
    default:
      return null;
  }
}

function getNbaLogo(champion) {
  if (champion.tournament !== 'nba' && champion.tournament !== 'nba_cup') {
    return null;
  }

  switch (champion.name) {
    case 'Лос-Анджелес Лейкерс':
      return L.lakers;
    case 'Сан-Антонио Сперс':
      return L.spurs;
    case 'Бостон Селтикс':
      return L.celtics;
    case 'Детройт Пистонс':
      return L.pistons;
    case 'Майами Хит':
      return L.heat;
    case 'Даллас Маверикс':
      return L.mavericks;
    case 'Торонто Рэпторс':
      return L.raptors;
    case 'Кливленд Кавальерс':
      return L.cavaliers;
    case 'Голден Стейт Уорриорс':
      return L.warriors;
    case 'Оклахома-Сити Тандер':
      return L.thunder;
    case 'Милуоки Бакс':
      return L.bucks;
    case 'Денвер Наггетс':
      return L.nuggets;
    case 'Нью-Йорк Никс':
      return L.knicks;
    default:
      return null;
  }
}

function getEuroBasketballLogo(champion) {
  const tournament = champion.tournament;
  if (tournament !== 'euroleague' && tournament !== 'vtb_league') {
    return null;
  }

  const name = champion.name;
  const year = champion.year;

  switch (name) {
    case 'Виртус Болонья':
      return L.virtusBologna;
    case 'Анадолу Эфес':
      return L.anadoluEfes;
    case 'Панатинаикос':
      return year >= 2020 ? L.panathinaikosBasketballNew : L.panathinaikosBasketballOld;
    case 'Маккаби':
      return L.maccabi;
    case 'Реал Мадрид':
      return L.realMadridBasketball;
    case 'Зенит':
      return L.zenitBasketball;
    case 'УНИКС':
      return L.unics;
    case 'Фенербахче':
      return L.fenerbahce;
    default:
      return null;
  }
}

function getNhlLogo(champion) {
  if (champion.tournament !== 'stanley_cup') {
    return null;
  }

  const name = champion.name;
  const year = champion.year;

  switch (name) {
    case 'Нью-Джерси Девилз':
      return L.newJerseyDevils;
    case 'Анахайм Дакс':
      return L.anaheimDucks;
    case 'Детройт Ред Уингз':
      return L.detroitRedWings;
    case 'Бостон Брюинс':
      return L.bostonBruins;
    case 'Чикаго Блэкхокс':
      return L.chicagoBlackhawks;
    case 'Лос-Анджелес Кингз':
      return L.laKings;
    case 'Питтсбург Пингвинс':
      return L.pittsburghPenguins;
    case 'Вашингтон Кэпиталс':
      return L.washingtonCapitals;
    case 'Тампа-Бэй Лайтнинг':
      if (year === 2004) {
        return L.tampaBay2004;
      }
      if (year >= 2020) {
        return L.tampaBay2020;
      }
      return null;
    case 'Сент-Луис Блюз':
      return L.stLouisBlues;
    case 'Колорадо Эвеланш':
      return L.coloradoAvalanche;
    case 'Вегас Голден Найтс':
      return L.vegasGoldenKnights;
    case 'Флорида Пэнтерс':
      return L.floridaPanthers;
    default:
      return null;
  }
}

function getHockeyLogo(champion) {
  if (champion.sport !== 'hockey') {
    return null;
  }

  const nhlLogo = getNhlLogo(champion);
  if (nhlLogo) {
    return nhlLogo;
  }

  const name = champion.name;
  const year = champion.year;

  switch (name) {
    case 'Ак Барс':
      return L.akBars;
    case 'Салават Юлаев':
      return L.salavatYulaev;
    case 'Динамо Москва':
      return L.dynamoHockey;
    case 'ЦСКА':
      return L.cskaHockey;
    case 'СКА':
      return L.ska;
    case 'Авангард':
      return L.avangard;
    case 'Металлург МГ':
      if (year === 2014 || year === 2016) {
        return L.metallurgOld;
      }
      if (year >= 2024) {
        return L.metallurg2024;
      }
      return null;
    default:
      return null;
  }
}

function getF1DriverPhoto(champion) {
  if (champion.tournament !== 'formula1') {
    return null;
  }

  switch (champion.name) {
    case 'Михаэль Шумахер':
      return L.f1Schumacher;
    case 'Фернандо Алонсо':
      return L.f1Alonso;
    case 'Кими Райконен':
    case 'Кими Райкконен':
      return L.f1Raikkonen;
    case 'Льюис Хэмилтон':
      return champion.year >= 2010 ? L.f1Hamilton2010 : L.f1HamiltonBefore2010;
    case 'Дженсон Баттон':
      return L.f1Button;
    case 'Себастьян Феттель':
      return L.f1Vettel;
    case 'Нико Росберг':
      return L.f1Rosberg;
    case 'Макс Ферстаппен':
      return L.f1Verstappen;
    case 'Ландо Норрис':
      return L.f1Norris;
    default:
      return null;
  }
}

function getNflLogo(champion) {
  if (champion.tournament !== 'nfl') {
    return null;
  }

  switch (champion.name) {
    case 'Сиэтл Сихокс':
      return L.seattleSeahawks;
    case 'Канзас-Сити Чифс':
      return L.kansasCityChiefs;
    case 'Нью-Ингленд Пэтриотс':
      return L.newEnglandPatriots;
    case 'Филадельфия Иглз':
      return L.philadelphiaEagles;
    case 'Тампа-Бэй Бакканирс':
      return L.tampaBayBuccaneers;
    case 'Грин-Бей Пэкерс':
      return L.greenBayPackers;
    case 'Нью-Йорк Джайентс':
      return L.newYorkGiants;
    case 'Балтимор Рэйвенс':
      return L.baltimoreRavens;
    case 'Денвер Бронкос':
      return L.denverBroncos;
    case 'Лос-Анджелес Рэмс':
      return L.losAngelesRams;
    case 'Сент-Луис Рэмс':
      return L.stLouisRams;
    case 'Питтсбург Стилерз':
      return L.pittsburghSteelers;
    case 'Индианаполис Колтс':
      return L.indianapolisColts;
    case 'Нью-Орлеан Сэйнтс':
      return L.newOrleansSaints;
    default:
      return null;
  }
}

function getClubLogo(champion) {
  const name = champion.name;
  const sport = champion.sport;
  const year = champion.year;
  const season = seasonStartYear(champion.date);

  const esportsLogo = getEsportsLogo(champion);
  if (esportsLogo) {
    return esportsLogo;
  }

  if (sport === 'amfut') {
    return getNflLogo(champion);
  }

  if (sport === 'basketball') {
    const nbaLogo = getNbaLogo(champion);
    if (nbaLogo) {
      return nbaLogo;
    }
    return getEuroBasketballLogo(champion);
  }

  if (sport === 'hockey') {
    return getHockeyLogo(champion);
  }

  if (sport !== 'football') {
    return null;
  }

  const mlsLogo = getMlsLogo(champion);
  if (mlsLogo) {
    return mlsLogo;
  }

  switch (name) {
    case 'Реал Мадрид':
      return L.realMadrid;
    case 'Ливерпуль':
      return year >= 2017 ? L.liverpoolNew : L.liverpoolOld;
    case 'Челси':
      if (year === 2005 && season === 2004) {
        return L.chelsea2005;
      }
      return L.chelseaNew;
    case 'Манчестер Юнайтед':
      return L.manUtd;
    case 'Манчестер Сити':
      return year < 2015 ? L.manCityOld : L.manCityNew;
    case 'Монпелье':
      return L.montpellier;
    case 'Лестер':
      return L.leicester;
    case 'Интер':
      if (year <= 2010 || season <= 2009) {
        return L.interOld;
      }
      return L.interNew;
    case 'Тоттенхэм':
      return L.tottenham;
    case 'Бавария':
      return L.bayern;
    case 'Байер':
      return L.bayer;
    case 'Боруссия Д':
      return L.dortmund;
    case 'Вольфсбург':
      return L.wolfsburg;
    case 'Вердер':
      return L.werder;
    case 'Штутгарт':
      return L.stuttgart;
    case 'Тосно':
      return L.tosno;
    case 'Депортиво':
      return L.deportivo;
    case 'Валенсия':
      return L.valencia;
    case 'Атлетико':
      if (year >= 2017) {
        return L.atletico2017;
      }
      if (year >= 2008) {
        return L.atletico2008;
      }
      return null;
    case 'Лилль':
      if (year >= 2015 || season >= 2014) {
        return L.lille2014;
      }
      return L.lilleBefore2015;
    case 'Монако':
      return year >= 2010 || season >= 2009 ? L.monaco2010 : L.monaco2000;
    case 'Марсель':
      return L.marseille;
    case 'Бордо':
      return L.bordeaux;
    case 'Лион':
      return L.lyon;
    case 'Нант':
      return L.nantes;
    case 'Наполи':
      return L.napoli;
    case 'Милан':
      return L.milan;
    case 'Ювентус':
      return season >= 2017 ? L.juventus2017 : L.juventusOld;
    case 'Рома':
      if (year === 2001 && season === 2000) {
        return L.roma2001;
      }
      if (year >= 2011 || season >= 2010) {
        return L.roma2011;
      }
      return L.romaOld;
    case 'Лацио':
      return L.lazio;
    case 'Олимпиакос':
      return L.olympiacosFootball;
    case 'Аталанта':
      return L.atalanta;
    case 'Вест Хэм':
      return L.westHam;
    case 'Севилья':
      return L.sevilla;
    case 'Айнтрахт':
      return L.eintracht;
    case 'Вильяреал':
      return L.villarreal;
    case 'Порту':
      return L.porto;
    case 'Шахтер':
      return L.shakhtar;
    case 'Фейеноорд':
      return L.feyenoord;
    case 'Галатасарай':
      return L.galatasaray;
    default:
      return null;
  }
}


const src = fs.readFileSync(championsPath, 'utf8').replace(/^\uFEFF/, '');
const match = src.match(/const allChampionsData = (\[[\s\S]*\]);?\s*$/);
if (!match) {
  throw new Error('Не удалось прочитать allChampionsData');
}

const data = Function('return ' + match[1])();
let updated = 0;

data.forEach(function (champion) {
  const f1Photo = getF1DriverPhoto(champion);
  if (f1Photo) {
    let changed = false;

    if (champion.name === 'Кими Райконен') {
      champion.name = 'Кими Райкконен';
      changed = true;
    }

    if (champion.image !== f1Photo) {
      champion.image = f1Photo;
      changed = true;
    }

    if (changed) {
      updated += 1;
    }
    return;
  }

  const url = getClubLogo(champion);
  if (!url) {
    return;
  }

  if (champion.image !== url || champion.imageShape !== 'logo') {
    champion.imageShape = 'logo';
    champion.image = url;
    updated += 1;
  }
});

function escapeString(value) {
  return JSON.stringify(String(value));
}

function formatChampion(champion) {
  const keys = [
    'id',
    'name',
    'year',
    'date',
    'sport',
    'tournament',
    'description',
    'odds',
    'probability',
    'imageShape',
    'image',
  ];

  const lines = ['    {'];

  keys.forEach(function (key) {
    if (!(key in champion)) {
      return;
    }

    const value = champion[key];
    if (key === 'id' || key === 'date' || key === 'sport' || key === 'tournament' || key === 'imageShape') {
      lines.push('        ' + key + ": '" + String(value).replace(/'/g, "\\'") + "',");
      return;
    }

    if (typeof value === 'number') {
      lines.push('        ' + key + ': ' + value + ',');
      return;
    }

    lines.push('        ' + key + ': ' + escapeString(value) + ',');
  });

  lines.push('    }');
  return lines.join('\n');
}

const body = data.map(formatChampion).join(',\n');
const output = '// База данных чемпионов\nconst allChampionsData = [\n' + body + '\n];\n';

fs.writeFileSync(championsPath, output, 'utf8');
console.log('Updated logos:', updated, 'entries touched');
