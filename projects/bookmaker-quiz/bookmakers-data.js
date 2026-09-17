// Данные о букмекерах с оценками по критериям (от 1 до 10)
const BOOKMAKERS_DATA = {
  fonbet: {
    name: 'FONBET',
    logo: 'https://dumpster.cdn.sports.ru/8/23/31836b8ae127c677c83aa5c2dcc3c.png',
    scores: {
      popularity: 9,        // Популярность
      reliability: 10,      // Надежность
      coefficients: 7,      // Коэффициенты
      withdrawSpeed: 8,     // Скорость вывода
      appConvenience: 9,    // Удобство приложения
      bonusSize: 8,         // Размер бонуса
      longTermBets: 9,      // Долгосроки
      expressBets: 8,       // Экспрессы
      editorialRating: 9,   // Оценка редакции
      userRating: 8         // Мнение пользователей
    },
    description: 'Один из самых надежных и популярных букмекеров в России'
  },
  betboom: {
    name: 'BETBOOM',
    logo: 'https://dumpster.cdn.sports.ru/e/63/6a84d1664140550c0c754205a94e2.webp',
    scores: {
      popularity: 8,
      reliability: 9,
      coefficients: 8,
      withdrawSpeed: 9,
      appConvenience: 9,
      bonusSize: 10,        // Большие бонусы
      longTermBets: 7,
      expressBets: 9,
      editorialRating: 8,
      userRating: 9
    },
    description: 'Современный букмекер с щедрыми бонусами и удобным приложением'
  },
  winline: {
    name: 'WINLINE',
    logo: 'https://dumpster.cdn.sports.ru/b/fc/6d2147368a7165750355955619ca6.png',
    scores: {
      popularity: 7,
      reliability: 9,
      coefficients: 8,
      withdrawSpeed: 8,
      appConvenience: 8,
      bonusSize: 7,
      longTermBets: 8,
      expressBets: 8,
      editorialRating: 8,
      userRating: 7
    },
    description: 'Надежный букмекер с хорошими условиями для игры'
  },
  pari: {
    name: 'PARI',
    logo: 'https://dumpster.cdn.sports.ru/d/ba/d2462eaba730d24c1b99b66b08c99.png',
    scores: {
      popularity: 9,
      reliability: 8,
      coefficients: 9,      // Высокие коэффициенты
      withdrawSpeed: 8,
      appConvenience: 10,   // Отличное приложение
      bonusSize: 9,
      longTermBets: 8,
      expressBets: 9,
      editorialRating: 8,
      userRating: 9
    },
    description: 'Популярный букмекер с высокими коэффициентами и отличным приложением'
  },
  'liga-stavok': {
    name: 'Лига Ставок',
    logo: 'https://dumpster.cdn.sports.ru/9/0e/8461bf68298af754aca1e11ca053b.png',
    scores: {
      popularity: 8,
      reliability: 10,      // Максимальная надежность
      coefficients: 7,
      withdrawSpeed: 9,
      appConvenience: 8,
      bonusSize: 7,
      longTermBets: 9,
      expressBets: 7,
      editorialRating: 9,
      userRating: 8
    },
    description: 'Один из старейших и надежнейших букмекеров'
  },
  olimpbet: {
    name: 'OLIMPBET',
    logo: 'https://dumpster.cdn.sports.ru/b/4b/09a1ae66b9dfe5d3b89b3e19a2483.png',
    scores: {
      popularity: 7,
      reliability: 9,
      coefficients: 8,
      withdrawSpeed: 9,
      appConvenience: 8,
      bonusSize: 8,
      longTermBets: 8,
      expressBets: 8,
      editorialRating: 8,
      userRating: 8
    },
    description: 'Стабильный букмекер с быстрыми выплатами'
  },
  betcity: {
    name: 'БЕТСИТИ',
    logo: 'https://dumpster.cdn.sports.ru/6/5d/3e1621d0edebd2abb1ac8b059d867.jpg',
    scores: {
      popularity: 7,
      reliability: 9,
      coefficients: 7,
      withdrawSpeed: 8,
      appConvenience: 7,
      bonusSize: 7,
      longTermBets: 8,
      expressBets: 7,
      editorialRating: 8,
      userRating: 7
    },
    description: 'Классический букмекер с проверенной репутацией'
  },
  leon: {
    name: 'LEON',
    logo: 'https://dumpster.cdn.sports.ru/5/48/ea6b6533bf8c30bcdf8a9479111e4.png',
    scores: {
      popularity: 6,
      reliability: 8,
      coefficients: 9,      // Высокие коэффициенты
      withdrawSpeed: 7,
      appConvenience: 8,
      bonusSize: 8,
      longTermBets: 7,
      expressBets: 9,       // Отлично для экспрессов
      editorialRating: 7,
      userRating: 8
    },
    description: 'Букмекер с конкурентными коэффициентами и хорошими условиями для экспрессов'
  },
  melbet: {
    name: 'Мелбет',
    logo: 'https://dumpster.cdn.sports.ru/3/95/b803d3289aae7797635a551d71575.jpg',
    scores: {
      popularity: 6,
      reliability: 7,
      coefficients: 9,
      withdrawSpeed: 7,
      appConvenience: 7,
      bonusSize: 9,
      longTermBets: 10,     // Лучший для долгосроков
      expressBets: 9,
      editorialRating: 7,
      userRating: 7
    },
    description: 'Широкая линия с большим выбором долгосрочных ставок'
  }
};
