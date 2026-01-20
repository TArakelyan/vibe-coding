// Данные о матчах следующего тура АПЛ
// Эти данные можно обновить через GraphQL API или вручную

const aplMatches = [
  {
    id: 'match-1',
    homeTeam: 'Челси',
    awayTeam: 'Эвертон',
    homeLogo: 'https://dumpster.cdn.sports.ru/6/83/16f3e7b4f659206cb60af7ddc8768.png',
    awayLogo: 'https://dumpster.cdn.sports.ru/9/f0/57725a378f20e7fb796bc10c94696.jpeg',
    date: '13 декабря',
    time: '18:00',
    scheduledAt: '2025-12-13T15:00:00Z',
    matchUrl: 'https://www.sports.ru/football/match/chelsea-vs-everton/',
    odds: {
      home: 1.65,
      draw: 4.10,
      away: 5.40
    },
    oddsUrl: 'https://betcity.ru/ru/line/soccer/445/20010507',
    homeForm: ['win', 'win', 'draw', 'loss', 'draw'],
    awayForm: ['win', 'win', 'loss', 'win', 'win'],
    homeFormDetails: [
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '06.12.2025', home: 'Борнмут', away: 'Челси', homeScore: 0, awayScore: 0 },
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '04.12.2025', home: 'Лидс', away: 'Челси', homeScore: 3, awayScore: 1 },
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '30.11.2025', home: 'Челси', away: 'Арсенал', homeScore: 1, awayScore: 1 },
      { tournament: 'Лига чемпионов', date: '26.11.2025', home: 'Челси', away: 'Барселона', homeScore: 3, awayScore: 0 },
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '22.11.2025', home: 'Бернли', away: 'Челси', homeScore: 0, awayScore: 2 }
    ],
    awayFormDetails: [
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '06.12.2025', home: 'Эвертон', away: 'Ноттингем Форест', homeScore: 3, awayScore: 0 },
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '03.12.2025', home: 'Борнмут', away: 'Эвертон', homeScore: 0, awayScore: 1 },
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '30.11.2025', home: 'Эвертон', away: 'Ньюкасл', homeScore: 1, awayScore: 4 },
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '25.11.2025', home: 'Манчестер Юнайтед', away: 'Эвертон', homeScore: 0, awayScore: 1 },
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '08.11.2025', home: 'Эвертон', away: 'Фулхэм', homeScore: 2, awayScore: 0 }
    ]
  },
  {
    id: 'match-2',
    homeTeam: 'Ливерпуль',
    awayTeam: 'Брайтон',
    homeLogo: 'https://dumpster.cdn.sports.ru/a/89/b878790f0468fbb323fbba42e8659.png',
    awayLogo: 'https://dumpster.cdn.sports.ru/7/1f/536a42c51410820608be9083d06e6.png',
    date: '13 декабря',
    time: '18:00',
    scheduledAt: '2025-12-13T15:00:00Z',
    matchUrl: 'https://www.sports.ru/football/match/brighton-vs-liverpool/',
    odds: {
      home: 1.72,
      draw: 4.30,
      away: 4.60
    },
    oddsUrl: 'https://promote.betcity.ru/8bitdark/?widget_id=freebet3x500_apl_25&refcode=forecast_contest&icm=1612&utm_source=1612&utm_medium=cpm&utm_campaign=freebet3x500_forecast_contest&utm_content=forecast_contest_apl_25',
    homeForm: ['loss', 'win', 'draw', 'draw', 'win'],
    awayForm: ['draw', 'win', 'win', 'loss', 'draw'],
    homeFormDetails: [
      { tournament: 'Лига чемпионов', date: '10.12.2025', home: 'Интер', away: 'Ливерпуль', homeScore: 0, awayScore: 1 },
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '07.12.2025', home: 'Лидс', away: 'Ливерпуль', homeScore: 3, awayScore: 3 },
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '04.12.2025', home: 'Ливерпуль', away: 'Сандерленд', homeScore: 1, awayScore: 1 },
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '30.11.2025', home: 'Вест Хэм', away: 'Ливерпуль', homeScore: 0, awayScore: 2 },
      { tournament: 'Лига чемпионов', date: '27.11.2025', home: 'Ливерпуль', away: 'ПСВ', homeScore: 1, awayScore: 4 }
    ],
    awayFormDetails: [
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '07.12.2025', home: 'Брайтон', away: 'Вест Хэм', homeScore: 1, awayScore: 1 },
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '04.12.2025', home: 'Брайтон', away: 'Астон Вилла', homeScore: 3, awayScore: 4 },
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '30.11.2025', home: 'Ноттингем Форест', away: 'Брайтон', homeScore: 0, awayScore: 2 },
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '22.11.2025', home: 'Брайтон', away: 'Брентфорд', homeScore: 2, awayScore: 1 },
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '09.11.2025', home: 'Кристал Пэлас', away: 'Брайтон', homeScore: 0, awayScore: 0 }
    ]
  },
  {
    id: 'match-3',
    homeTeam: 'Арсенал',
    awayTeam: 'Вулверхэмптон',
    homeLogo: 'https://dumpster.cdn.sports.ru/4/94/116e88eb730c1847a1967ac9f1830.png',
    awayLogo: 'https://dumpster.cdn.sports.ru/c/d3/7b6f552be34472692b14042391c60.png',
    date: '13 декабря',
    time: '23:00',
    scheduledAt: '2025-12-13T20:00:00Z',
    matchUrl: 'https://www.sports.ru/football/match/arsenal-vs-wolves/',
    odds: {
      home: 1.17,
      draw: 8.10,
      away: 19.00
    },
    oddsUrl: 'https://promote.betcity.ru/8bitdark/?widget_id=freebet3x500_apl_25&refcode=forecast_contest&icm=1612&utm_source=1612&utm_medium=cpm&utm_campaign=freebet3x500_forecast_contest&utm_content=forecast_contest_apl_25',
    homeForm: ['loss', 'win', 'draw', 'win', 'win'],
    awayForm: ['loss', 'loss', 'loss', 'loss', 'loss'],
    homeFormDetails: [
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '06.12.2025', home: 'Астон Вилла', away: 'Арсенал', homeScore: 2, awayScore: 1 },
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '04.12.2025', home: 'Арсенал', away: 'Брентфорд', homeScore: 2, awayScore: 0 },
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '30.11.2025', home: 'Челси', away: 'Арсенал', homeScore: 1, awayScore: 1 },
      { tournament: 'Лига чемпионов', date: '27.11.2025', home: 'Арсенал', away: 'Бавария', homeScore: 3, awayScore: 1 },
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '23.11.2025', home: 'Арсенал', away: 'Тоттенхэм', homeScore: 4, awayScore: 1 }
    ],
    awayFormDetails: [
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '09.12.2025', home: 'Вулверхэмптон', away: 'Манчестер Юнайтед', homeScore: 1, awayScore: 4 },
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '04.12.2025', home: 'Вулверхэмптон', away: 'Ноттингем Форест', homeScore: 0, awayScore: 1 },
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '30.11.2025', home: 'Астон Вилла', away: 'Вулверхэмптон', homeScore: 1, awayScore: 0 },
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '22.11.2025', home: 'Вулверхэмптон', away: 'Кристал Пэлас', homeScore: 0, awayScore: 2 },
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '09.11.2025', home: 'Челси', away: 'Вулверхэмптон', homeScore: 3, awayScore: 0 }
    ]
  },
  {
    id: 'match-4',
    homeTeam: 'Кристал Пэлас',
    awayTeam: 'Манчестер Сити',
    homeLogo: 'https://dumpster.cdn.sports.ru/f/f1/b9405a2b4033a07925cbcf23dcb3d.png',
    awayLogo: 'https://dumpster.cdn.sports.ru/3/f0/730139fa238af1af0dbd70dcb6c79.png',
    date: '14 декабря',
    time: '17:00',
    scheduledAt: '2025-12-14T14:00:00Z',
    matchUrl: 'https://www.sports.ru/football/match/crystal-palace-vs-manchester-city/',
    odds: {
      home: 3.90,
      draw: 3.80,
      away: 1.96
    },
    oddsUrl: 'https://promote.betcity.ru/8bitdark/?widget_id=freebet3x500_apl_25&refcode=forecast_contest&icm=1612&utm_source=1612&utm_medium=cpm&utm_campaign=freebet3x500_forecast_contest&utm_content=forecast_contest_apl_25',
    homeForm: ['win', 'win', 'loss', 'loss', 'win'],
    awayForm: ['win', 'win', 'win', 'loss', 'loss'],
    homeFormDetails: [
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '07.12.2025', home: 'Фулхэм', away: 'Кристал Пэлас', homeScore: 1, awayScore: 2 },
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '04.12.2025', home: 'Бернли', away: 'Кристал Пэлас', homeScore: 0, awayScore: 1 },
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '30.11.2025', home: 'Кристал Пэлас', away: 'Манчестер Юнайтед', homeScore: 1, awayScore: 2 },
      { tournament: 'Лига Конференций', date: '28.11.2025', home: 'Страсбур', away: 'Кристал Пэлас', homeScore: 2, awayScore: 1 },
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '22.11.2025', home: 'Вулверхэмптон', away: 'Кристал Пэлас', homeScore: 0, awayScore: 2 }
    ],
    awayFormDetails: [
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '06.12.2025', home: 'Манчестер Сити', away: 'Сандерленд', homeScore: 3, awayScore: 0 },
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '03.12.2025', home: 'Фулхэм', away: 'Манчестер Сити', homeScore: 4, awayScore: 5 },
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '29.11.2025', home: 'Манчестер Сити', away: 'Лидс', homeScore: 3, awayScore: 2 },
      { tournament: 'Лига чемпионов', date: '26.11.2025', home: 'Манчестер Сити', away: 'Байер', homeScore: 0, awayScore: 2 },
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '23.11.2025', home: 'Ньюкасл', away: 'Манчестер Сити', homeScore: 2, awayScore: 1 }
    ]
  },
  {
    id: 'match-5',
    homeTeam: 'Манчестер Юнайтед',
    awayTeam: 'Борнмут',
    homeLogo: 'https://dumpster.cdn.sports.ru/1/68/c8fd0de1d86f670fd26bed835b3d4.png',
    awayLogo: 'https://dumpster.cdn.sports.ru/2/ad/cf1589ef1197927d465b417fcaff3.png',
    date: '15 декабря',
    time: '23:00',
    scheduledAt: '2025-12-15T20:00:00Z',
    matchUrl: 'https://www.sports.ru/football/match/bournemouth-vs-mu/',
    odds: {
      home: 1.88,
      draw: 4.10,
      away: 3.90
    },
    oddsUrl: 'https://promote.betcity.ru/8bitdark/?widget_id=freebet3x500_apl_25&refcode=forecast_contest&icm=1612&utm_source=1612&utm_medium=cpm&utm_campaign=freebet3x500_forecast_contest&utm_content=forecast_contest_apl_25',
    homeForm: ['win', 'draw', 'win', 'loss', 'draw'],
    awayForm: ['draw', 'loss', 'loss', 'draw', 'loss'],
    homeFormDetails: [
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '09.12.2025', home: 'Вулверхэмптон', away: 'Манчестер Юнайтед', homeScore: 1, awayScore: 4 },
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '05.12.2025', home: 'Манчестер Юнайтед', away: 'Вест Хэм', homeScore: 1, awayScore: 1 },
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '30.11.2025', home: 'Кристал Пэлас', away: 'Манчестер Юнайтед', homeScore: 1, awayScore: 2 },
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '25.11.2025', home: 'Манчестер Юнайтед', away: 'Эвертон', homeScore: 0, awayScore: 1 },
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '08.11.2025', home: 'Тоттенхэм', away: 'Манчестер Юнайтед', homeScore: 2, awayScore: 2 }
    ],
    awayFormDetails: [
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '06.12.2025', home: 'Борнмут', away: 'Челси', homeScore: 0, awayScore: 0 },
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '03.12.2025', home: 'Борнмут', away: 'Эвертон', homeScore: 0, awayScore: 1 },
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '29.11.2025', home: 'Сандерленд', away: 'Борнмут', homeScore: 3, awayScore: 2 },
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '22.11.2025', home: 'Борнмут', away: 'Вест Хэм', homeScore: 2, awayScore: 2 },
      { tournament: 'Премьер-лига Англия (АПЛ)', date: '09.11.2025', home: 'Астон Вилла', away: 'Борнмут', homeScore: 4, awayScore: 0 }
    ]
  }
];

