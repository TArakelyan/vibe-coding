const WIKI_CATEGORIES = [
  {
    "title": "Футбол",
    "slug": "futbol",
    "count": 98
  },
  {
    "title": "Баскетбол",
    "slug": "basketbol",
    "count": 55
  },
  {
    "title": "Хоккей",
    "slug": "hokkej",
    "count": 43
  },
  {
    "title": "Теннис",
    "slug": "tennis",
    "count": 68
  },
  {
    "title": "Автоспорт",
    "slug": "avtosport",
    "count": 32
  },
  {
    "title": "Бокс/ММА",
    "slug": "boks-mma",
    "count": 28
  },
  {
    "title": "Кибер",
    "slug": "kiber",
    "count": 24
  },
  {
    "title": "Фигурка",
    "slug": "figurka",
    "count": 19
  },
  {
    "title": "Лыжи",
    "slug": "lyzhi",
    "count": 22
  },
  {
    "title": "Плавание",
    "slug": "plavanie",
    "count": 18
  },
  {
    "title": "Легкая атлетика",
    "slug": "legkaya-atletika",
    "count": 21,
    "inMore": true
  },
  {
    "title": "Гандбол",
    "slug": "gandbol",
    "count": 14,
    "inMore": true
  },
  {
    "title": "Волейбол",
    "slug": "volejbol",
    "count": 16,
    "inMore": true
  },
  {
    "title": "Шахматы",
    "slug": "shahmaty",
    "count": 12,
    "inMore": true
  },
  {
    "title": "Дартс",
    "slug": "darts",
    "count": 9,
    "inMore": true
  }
];

const WIKI_CATEGORIES_VISIBLE = WIKI_CATEGORIES.filter((c) => !c.inMore);
const WIKI_CATEGORIES_MORE = WIKI_CATEGORIES.filter((c) => c.inMore);
