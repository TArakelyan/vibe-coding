// Данные о последних 10 матчах Манчестер Юнайтед (хронологический порядок - от новых к старым)
const matchesData = [
    {
        id: 1,
        homeTeam: 'Астон Вилла',
        awayTeam: 'Манчестер Юнайтед',
        date: '22 декабря',
        league: 'АПЛ',
        score: '2:1',
        result: 'loss',
        odds: {
            win: 4.02,
            draw: 3.78,
            lose: 1.93,
            notLose: 1.91,
            notWin: 1.26
        },
        link: 'https://www.sports.ru/football/match/aston-villa-vs-mu/'
    },
    {
        id: 2,
        homeTeam: 'Манчестер Юнайтед',
        awayTeam: 'Борнмут',
        date: '15 декабря',
        league: 'АПЛ',
        score: '4:4',
        result: 'draw',
        odds: {
            win: 1.74,
            draw: 4.29,
            lose: 4.46,
            notLose: 1.23,
            notWin: 2.14
        },
        link: 'https://www.sports.ru/football/match/1856804/'
    },
    {
        id: 3,
        homeTeam: 'Вулверхэмптон',
        awayTeam: 'Манчестер Юнайтед',
        date: '8 декабря',
        league: 'АПЛ',
        score: '1:4',
        result: 'win',
        odds: {
            win: 1.63,
            draw: 4.23,
            lose: 5.48,
            notLose: 1.17,
            notWin: 2.34
        },
        link: 'https://www.sports.ru/football/match/1856797/'
    },
    {
        id: 4,
        homeTeam: 'Манчестер Юнайтед',
        awayTeam: 'Вест Хэм',
        date: '4 декабря',
        league: 'АПЛ',
        score: '1:1',
        result: 'draw',
        odds: {
            win: 1.43,
            draw: 5.39,
            lose: 7.03,
            notLose: 1.12,
            notWin: 2.98
        },
        link: 'https://www.sports.ru/football/match/1856785/'
    },
    {
        id: 5,
        homeTeam: 'Кристал Пэлас',
        awayTeam: 'Манчестер Юнайтед',
        date: '30 ноября',
        league: 'АПЛ',
        score: '1:2',
        result: 'win',
        odds: {
            win: 3.28,
            draw: 3.78,
            lose: 2.17,
            notLose: 1.73,
            notWin: 1.36
        },
        link: 'https://www.sports.ru/football/match/1856771/'
    },
    {
        id: 6,
        homeTeam: 'Манчестер Юнайтед',
        awayTeam: 'Эвертон',
        date: '24 ноября',
        league: 'АПЛ',
        score: '0:1',
        result: 'loss',
        odds: {
            win: 1.86,
            draw: 3.71,
            lose: 4.49,
            notLose: 1.23,
            notWin: 1.99
        },
        link: 'https://www.sports.ru/football/match/everton-vs-mu/'
    },
    {
        id: 7,
        homeTeam: 'Тоттенхэм',
        awayTeam: 'Манчестер Юнайтед',
        date: '9 ноября',
        league: 'АПЛ',
        score: '2:2',
        result: 'draw',
        odds: {
            win: 2.52,
            draw: 3.59,
            lose: 2.54,
            notLose: 1.46,
            notWin: 1.59
        },
        link: 'https://www.sports.ru/football/match/1856756/'
    },
    {
        id: 8,
        homeTeam: 'Ноттингем Форест',
        awayTeam: 'Манчестер Юнайтед',
        date: '1 ноября',
        league: 'АПЛ',
        score: '2:2',
        result: 'draw',
        odds: {
            win: 2.20,
            draw: 3.83,
            lose: 3.17,
            notLose: 1.38,
            notWin: 1.70
        },
        link: 'https://www.sports.ru/football/match/1856744/'
    },
    {
        id: 9,
        homeTeam: 'Манчестер Юнайтед',
        awayTeam: 'Брайтон',
        date: '25 октября',
        league: 'АПЛ',
        score: '4:2',
        result: 'win',
        odds: {
            win: 2.00,
            draw: 3.87,
            lose: 3.50,
            notLose: 1.35,
            notWin: 1.80
        },
        link: 'https://www.sports.ru/football/match/1856735/'
    },
    {
        id: 10,
        homeTeam: 'Вест Хэм',
        awayTeam: 'Манчестер Юнайтед',
        date: '18 октября',
        league: 'АПЛ',
        score: '2:1',
        result: 'loss',
        odds: {
            win: 2.35,
            draw: 3.65,
            lose: 2.90,
            notLose: 1.42,
            notWin: 1.65
        },
        link: 'https://www.sports.ru/football/match/1856722/'
    }
];

// Блок "Следующий матч" удален по запросу пользователя
// const upcomingMatch = null;

