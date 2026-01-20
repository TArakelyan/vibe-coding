const playersData = [
    {
        rank: 1,
        nickname: "Notail",
        realName: "Йохан Сундштейн",
        image: "https://via.placeholder.com/300x400/323232/00c78b?text=Notail",
        team: "OG",
        achievements: ["The International 2018", "The International 2019"],
        country: "Дания"
    },
    {
        rank: 2,
        nickname: "Miposhka",
        realName: "Ярослав Найденов",
        image: "https://via.placeholder.com/300x400/323232/00c78b?text=Miposhka",
        team: "Team Spirit",
        achievements: ["The International 2021"],
        country: "Россия"
    },
    {
        rank: 3,
        nickname: "Yatoro",
        realName: "Иллья Мулярчук",
        image: "https://via.placeholder.com/300x400/323232/00c78b?text=Yatoro",
        team: "Team Spirit",
        achievements: ["The International 2021"],
        country: "Украина"
    },
    {
        rank: 4,
        nickname: "33",
        realName: "Нета Шапира",
        image: "https://via.placeholder.com/300x400/323232/00c78b?text=33",
        team: "Tundra Esports",
        achievements: ["The International 2022"],
        country: "Израиль"
    },
    {
        rank: 5,
        nickname: "Topson",
        realName: "Топиас Тайпалус",
        image: "https://via.placeholder.com/300x400/323232/00c78b?text=Topson",
        team: "OG",
        achievements: ["The International 2018", "The International 2019"],
        country: "Финляндия"
    },
    {
        rank: 6,
        nickname: "JerAx",
        realName: "Йессе Вайникка",
        image: "https://via.placeholder.com/300x400/323232/00c78b?text=JerAx",
        team: "OG",
        achievements: ["The International 2018", "The International 2019"],
        country: "Финляндия"
    },
    {
        rank: 7,
        nickname: "ana",
        realName: "Анатан Фам",
        image: "https://via.placeholder.com/300x400/323232/00c78b?text=ana",
        team: "OG",
        achievements: ["The International 2018", "The International 2019"],
        country: "Австралия"
    },
    {
        rank: 8,
        nickname: "Ceb",
        realName: "Себастьян Деб",
        image: "https://via.placeholder.com/300x400/323232/00c78b?text=Ceb",
        team: "OG",
        achievements: ["The International 2018", "The International 2019"],
        country: "Франция"
    },
    {
        rank: 9,
        nickname: "Collapse",
        realName: "Магомед Халилов",
        image: "https://via.placeholder.com/300x400/323232/00c78b?text=Collapse",
        team: "Team Spirit",
        achievements: ["The International 2021"],
        country: "Россия"
    },
    {
        rank: 10,
        nickname: "Mira",
        realName: "Мирослав Колпаков",
        image: "https://via.placeholder.com/300x400/323232/00c78b?text=Mira",
        team: "Team Spirit",
        achievements: ["The International 2021"],
        country: "Россия"
    },
    {
        rank: 11,
        nickname: "Puppey",
        realName: "Клемент Иванов",
        image: "https://via.placeholder.com/300x400/323232/00c78b?text=Puppey",
        team: "Team Secret",
        achievements: ["The International 2011"],
        country: "Эстония"
    },
    {
        rank: 12,
        nickname: "KuroKy",
        realName: "Куро Салехи Тахасоми",
        image: "https://via.placeholder.com/300x400/323232/00c78b?text=KuroKy",
        team: "Team Liquid",
        achievements: ["The International 2017"],
        country: "Германия"
    },
    {
        rank: 13,
        nickname: "Miracle-",
        realName: "Аммер Аль-Баркави",
        image: "https://via.placeholder.com/300x400/323232/00c78b?text=Miracle",
        team: "Team Liquid",
        achievements: ["The International 2017"],
        country: "Иордания"
    },
    {
        rank: 14,
        nickname: "Saksa",
        realName: "Мартин Сакса",
        image: "https://via.placeholder.com/300x400/323232/00c78b?text=Saksa",
        team: "Tundra Esports",
        achievements: ["The International 2022"],
        country: "Эстония"
    },
    {
        rank: 15,
        nickname: "Dendi",
        realName: "Даниил Ишутин",
        image: "https://via.placeholder.com/300x400/323232/00c78b?text=Dendi",
        team: "Natus Vincere",
        achievements: ["The International 2011 (2 место)"],
        country: "Украина"
    },
    {
        rank: 16,
        nickname: "Solo",
        realName: "Алексей Березин",
        image: "https://via.placeholder.com/300x400/323232/00c78b?text=Solo",
        team: "Virtus.pro",
        achievements: ["Множество мейджоров"],
        country: "Россия"
    },
    {
        rank: 17,
        nickname: "Nine",
        realName: "Леон Киригиряну",
        image: "https://via.placeholder.com/300x400/323232/00c78b?text=Nine",
        team: "Tundra Esports",
        achievements: ["The International 2022"],
        country: "Румыния"
    },
    {
        rank: 18,
        nickname: "Burning",
        realName: "Сy Жилей",
        image: "https://via.placeholder.com/300x400/323232/00c78b?text=Burning",
        team: "DK",
        achievements: ["Легенда китайской Dota"],
        country: "Китай"
    },
    {
        rank: 19,
        nickname: "RAMZES666",
        realName: "Роман Кушнарев",
        image: "https://via.placeholder.com/300x400/323232/00c78b?text=RAMZES",
        team: "Virtus.pro",
        achievements: ["Множество мейджоров"],
        country: "Россия"
    },
    {
        rank: 20,
        nickname: "Universe",
        realName: "Саахил Арора",
        image: "https://via.placeholder.com/300x400/323232/00c78b?text=Universe",
        team: "Evil Geniuses",
        achievements: ["The International 2015"],
        country: "США"
    },
    {
        rank: 21,
        nickname: "Sneyking",
        realName: "Джинжи Нг",
        image: "https://via.placeholder.com/300x400/323232/00c78b?text=Sneyking",
        team: "Tundra Esports",
        achievements: ["The International 2022"],
        country: "Малайзия"
    },
    {
        rank: 22,
        nickname: "Cr1t-",
        realName: "Андреас Нильсен",
        image: "https://via.placeholder.com/300x400/323232/00c78b?text=Cr1t",
        team: "Evil Geniuses",
        achievements: ["Множество турниров"],
        country: "Дания"
    },
    {
        rank: 23,
        nickname: "Sumail",
        realName: "Сумаил Хассан",
        image: "https://via.placeholder.com/300x400/323232/00c78b?text=Sumail",
        team: "Evil Geniuses",
        achievements: ["The International 2015"],
        country: "Пакистан"
    },
    {
        rank: 24,
        nickname: "Toronto",
        realName: "Александр Херовски",
        image: "https://via.placeholder.com/300x400/323232/00c78b?text=Toronto",
        team: "Team Spirit",
        achievements: ["The International 2021"],
        country: "Россия"
    },
    {
        rank: 25,
        nickname: "Fear",
        realName: "Клинтон Лумис",
        image: "https://via.placeholder.com/300x400/323232/00c78b?text=Fear",
        team: "Evil Geniuses",
        achievements: ["The International 2015"],
        country: "США"
    },
    {
        rank: 26,
        nickname: "Skiter",
        realName: "Оливер Лепко",
        image: "https://via.placeholder.com/300x400/323232/00c78b?text=Skiter",
        team: "Tundra Esports",
        achievements: ["The International 2022"],
        country: "Швеция"
    },
    {
        rank: 27,
        nickname: "MinD_ContRoL",
        realName: "Иван Боришев",
        image: "https://via.placeholder.com/300x400/323232/00c78b?text=MC",
        team: "Team Liquid",
        achievements: ["The International 2017"],
        country: "Болгария"
    },
    {
        rank: 28,
        nickname: "GH",
        realName: "Мараван Рахеб",
        image: "https://via.placeholder.com/300x400/323232/00c78b?text=GH",
        team: "Team Liquid",
        achievements: ["The International 2017"],
        country: "Ливан"
    },
    {
        rank: 29,
        nickname: "Arteezy",
        realName: "Арту Бабаев",
        image: "https://via.placeholder.com/300x400/323232/00c78b?text=RTZ",
        team: "Evil Geniuses",
        achievements: ["Легенда без TI"],
        country: "Узбекистан"
    },
    {
        rank: 30,
        nickname: "s4",
        realName: "Густав Магнуссон",
        image: "https://via.placeholder.com/300x400/323232/00c78b?text=s4",
        team: "Alliance",
        achievements: ["The International 2013"],
        country: "Швеция"
    }
];















