// US Open 2025 - Tournament Data

const tournamentData = {
    tournament: {
        name: "US Open 2025",
        category: "Men's Singles",
        surface: "Hard Court",
        location: "New York, USA",
        dates: "August 24 - September 7, 2025",
        prize_fund: "$75,000,000"
    },

    rounds: [
        {
            id: "r1",
            name: "Первый раунд",
            prize_money: "$110,000",
            matches: 64,
            players: 128
        },
        {
            id: "r2", 
            name: "Второй раунд",
            prize_money: "$154,000",
            matches: 32,
            players: 64
        },
        {
            id: "r3",
            name: "Третий раунд", 
            prize_money: "$237,000",
            matches: 16,
            players: 32
        },
        {
            id: "r4",
            name: "Четвертый раунд",
            prize_money: "$375,000",
            matches: 8,
            players: 16
        },
        {
            id: "qf",
            name: "1/4 финала",
            prize_money: "$650,000", 
            matches: 4,
            players: 8
        },
        {
            id: "sf",
            name: "Полуфиналы",
            prize_money: "$1,100,000",
            matches: 2,
            players: 4
        },
        {
            id: "f",
            name: "Финал",
            prize_money: "$3,600,000",
            matches: 1,
            players: 2
        }
    ],

    // First round matches
    firstRoundMatches: [
        { id: "r1-1", players: [
            { name: "Синнер", fullName: "Янник Синнер", countryFlag: "🇮🇹", seed: 1, photo: "https://photobooth.cdn.sports.ru/preset/tc_person/c/fd/3628b46c645bfa4160c53fd1fa2fe.png" },
            { name: "Коприва", fullName: "Вит Коприва", countryFlag: "🇨🇿", seed: null, photo: "" }
        ]},
        { id: "r1-2", players: [
            { name: "Попырин", fullName: "Алексей Попырин", countryFlag: "🇦🇺", seed: null, photo: "https://www.sports.ru/tennis/person/alexei-popyrin/photo/" },
            { name: "Руусувори", fullName: "Эмиль Руусувори", countryFlag: "🇫🇮", seed: null, photo: "https://www.sports.ru/tennis/person/emil-ruusuvuori/photo/" }
        ]},
        { id: "r1-3", players: [
            { name: "Руайе", fullName: "Валентин Руайе", countryFlag: "🇫🇷", seed: null, photo: "https://ss.sport-express.ru/userfiles/materials/sharing/170/1706234.jpg" },
            { name: "Юнчаокете", fullName: "Бу Юнчаокете", countryFlag: "🇨🇳", seed: null, photo: "https://ss.sport-express.ru/userfiles/materials/sharing/171/1718943.jpg" }
        ]},
        { id: "r1-4", players: [
            { name: "Фучович", fullName: "Мартон Фучович", countryFlag: "🇭🇺", seed: null, photo: "https://www.sports.ru/tennis/person/marton-fucsovics/photo/" },
            { name: "Шаповалов", fullName: "Денис Шаповалов", countryFlag: "🇨🇦", seed: 27, photo: "https://www.sports.ru/tennis/person/denis-shapovalov/photo/" }
        ]},
        { id: "r1-5", players: [
            { name: "Бублик", fullName: "Александр Бублик", countryFlag: "🇰🇿", seed: null, photo: "https://ss.sport-express.ru/userfiles/materials/sharing/173/1738123.jpg" },
            { name: "Чилич", fullName: "Марин Чилич", countryFlag: "🇭🇷", seed: null, photo: "https://ss.sport-express.ru/userfiles/materials/sharing/172/1723456.jpg" }
        ]},
        { id: "r1-6", players: [
            { name: "Сонего", fullName: "Лоренцо Сонего", countryFlag: "🇮🇹", seed: null },
            { name: "Шулкэйт", fullName: "Tristan Школькэйт", countryFlag: "🇦🇺", seed: null }
        ]},
        { id: "r1-7", players: [
            { name: "Боржес", fullName: "Нуно Боржес", countryFlag: "🇵🇹", seed: null },
            { name: "Холт", fullName: "Брэндон Холт", countryFlag: "🇺🇸", seed: null }
        ]},
        { id: "r1-8", players: [
            { name: "Моллер", fullName: "Хольгер Моллер", countryFlag: "🇩🇰", seed: null },
            { name: "Пол", fullName: "Томми Пол", countryFlag: "🇺🇸", seed: 14 }
        ]},
        { id: "r1-9", players: [
            { name: "Музетти", fullName: "Лоренцо Музетти", countryFlag: "🇮🇹", seed: 18 },
            { name: "Мпетши Перрикар", fullName: "Тэрэнс Мпетши Перрикар", countryFlag: "🇫🇷", seed: null }
        ]},
        { id: "r1-10", players: [
            { name: "Алис", fullName: "Артур Алис", countryFlag: "🇫🇷", seed: null },
            { name: "Гоффен", fullName: "Давид Гоффен", countryFlag: "🇧🇪", seed: null }
        ]},
        { id: "r1-11", players: [
            { name: "Бруксби", fullName: "Дженсон Бруксби", countryFlag: "🇺🇸", seed: null },
            { name: "Вукич", fullName: "Алекс Вукич", countryFlag: "🇦🇺", seed: null }
        ]},
        { id: "r1-12", players: [
            { name: "Пассаро", fullName: "Франческо Пассаро", countryFlag: "🇮🇹", seed: null },
            { name: "Коболли", fullName: "Флавио Коболли", countryFlag: "🇮🇹", seed: 31 }
        ]},
        { id: "r1-13", players: [
            { name: "Диалло", fullName: "Элиас Имер Диалло", countryFlag: "🇸🇳", seed: null },
            { name: "Джумхур", fullName: "Дамир Джумхур", countryFlag: "🇧🇦", seed: null }
        ]},
        { id: "r1-14", players: [
            { name: "Муньяр", fullName: "Захари Муньяр", countryFlag: "🇺🇸", seed: null },
            { name: "Фариа", fullName: "Жайме Фариа", countryFlag: "🇵🇹", seed: null }
        ]},
        { id: "r1-15", players: [
            { name: "Бергс", fullName: "Зизу Бергс", countryFlag: "🇧🇪", seed: null },
            { name: "Цзэн", fullName: "Фанран Цзэн", countryFlag: "🇨🇳", seed: null }
        ]},
        { id: "r1-16", players: [
            { name: "Агустин Гомес", fullName: "Эмилио Нава Агустин Гомес", countryFlag: "🇦🇷", seed: null },
            { name: "Дрэйпер", fullName: "Джек Дрэйпер", countryFlag: "🇬🇧", seed: 15 }
        ]},
        { id: "r1-17", players: [
            { name: "Зверев", fullName: "Александр Зверев", countryFlag: "🇩🇪", seed: 2, photo: "https://www.sports.ru/tennis/person/alexander-zverev/photo/" },
            { name: "Табило", fullName: "Алехандро Табило", countryFlag: "🇨🇱", seed: null, photo: "https://www.sports.ru/tennis/person/alejandro-tabilo/photo/" }
        ]},
        { id: "r1-18", players: [
            { name: "Баутиста-Агут", fullName: "Роберто Баутиста-Агут", countryFlag: "🇪🇸", seed: null },
            { name: "Фернли", fullName: "Джейкоб Фернли", countryFlag: "🇬🇧", seed: null }
        ]},
        { id: "r1-19", players: [
            { name: "Монфис", fullName: "Гаэль Монфис", countryFlag: "🇫🇷", seed: null },
            { name: "Сафиуллин", fullName: "Роман Сафиуллин", countryFlag: "🇷🇺", seed: null }
        ]},
        { id: "r1-20", players: [
            { name: "Харрис", fullName: "Ллойд Харрис", countryFlag: "🇿🇦", seed: null },
            { name: "Оже-Альяссим", fullName: "Феликс Оже-Альяссим", countryFlag: "🇨🇦", seed: 19 }
        ]},
        { id: "r1-21", players: [
            { name: "Эмбер", fullName: "Кристофер Эмбер", countryFlag: "🇺🇸", seed: null },
            { name: "Уолтон", fullName: "Адам Уолтон", countryFlag: "🇦🇺", seed: null }
        ]},
        { id: "r1-22", players: [
            { name: "Ковачевич", fullName: "Алекса Ковачевич", countryFlag: "🇺🇸", seed: null },
            { name: "Вонг", fullName: "Колман Вонг", countryFlag: "🇭🇰", seed: null }
        ]},
        { id: "r1-23", players: [
            { name: "Дакворт", fullName: "Джеймс Дакворт", countryFlag: "🇦🇺", seed: null },
            { name: "Буайе", fullName: "Tristan-Самюэль Буайе", countryFlag: "🇫🇷", seed: null }
        ]},
        { id: "r1-24", players: [
            { name: "Прижмич", fullName: "Виктор Прижмич", countryFlag: "🇭🇷", seed: null },
            { name: "Рублев", fullName: "Андрей Рублев", countryFlag: "🇷🇺", seed: 9 }
        ]},
        { id: "r1-25", players: [
            { name: "Хачанов", fullName: "Карен Хачанов", countryFlag: "🇷🇺", seed: 23 },
            { name: "Басаваредди", fullName: "Нишеш Басаваредди", countryFlag: "🇺🇸", seed: null }
        ]},
        { id: "r1-26", players: [
            { name: "Делльен", fullName: "Уго Делльен", countryFlag: "🇧🇴", seed: null },
            { name: "Майхржак", fullName: "Далибор Майхржак", countryFlag: "🇸🇰", seed: null }
        ]},
        { id: "r1-27", players: [
            { name: "Риеди", fullName: "Леандро Риеди", countryFlag: "🇨🇭", seed: null },
            { name: "Мартинес Портеро", fullName: "Педро Мартинес Портеро", countryFlag: "🇪🇸", seed: null }
        ]},
        { id: "r1-28", players: [
            { name: "Арнальди", fullName: "Маттео Арнальди", countryFlag: "🇮🇹", seed: 30 },
            { name: "Серундоло", fullName: "Франсиско Серундоло", countryFlag: "🇦🇷", seed: null }
        ]},
        { id: "r1-29", players: [
            { name: "Циципас", fullName: "Стефанос Циципас", countryFlag: "🇬🇷", seed: 11 },
            { name: "A. Мюллер", fullName: "Александр Мюллер", countryFlag: "🇫🇷", seed: null }
        ]},
        { id: "r1-30", players: [
            { name: "Альтмайер", fullName: "Даниэл Альтмайер", countryFlag: "🇩🇪", seed: null },
            { name: "Медьедович", fullName: "Хамад Медьедович", countryFlag: "🇷🇸", seed: null }
        ]},
        { id: "r1-31", players: [
            { name: "Гастон", fullName: "Уго Гастон", countryFlag: "🇫🇷", seed: null },
            { name: "Мотидзуки", fullName: "Рео Мотидзуки", countryFlag: "🇯🇵", seed: null }
        ]},
        { id: "r1-32", players: [
            { name: "О'Коннелл", fullName: "Кристофер О'Коннелл", countryFlag: "🇦🇺", seed: null },
            { name: "де Минаур", fullName: "Алекс де Минаур", countryFlag: "🇦🇺", seed: 8 }
        ]},
        { id: "r1-33", players: [
            { name: "Джокович", fullName: "Новак Джокович", countryFlag: "🇷🇸", seed: 7, photo: "https://www.sports.ru/tennis/person/novak-djokovic/photo/" },
            { name: "Тьен", fullName: "Леарнер Тьен", countryFlag: "🇺🇸", seed: null, photo: "https://www.sports.ru/tennis/person/learner-tien/photo/" }
        ]},
        { id: "r1-34", players: [
            { name: "Свайда", fullName: "Доминик Свайда", countryFlag: "🇵🇱", seed: null },
            { name: "Пирош", fullName: "Жолт Пирош", countryFlag: "🇭🇺", seed: null }
        ]},
        { id: "r1-35", players: [
            { name: "Норри", fullName: "Кэмерон Норри", countryFlag: "🇬🇧", seed: null },
            { name: "Корда", fullName: "Себастьян Корда", countryFlag: "🇺🇸", seed: 22 }
        ]},
        { id: "r1-36", players: [
            { name: "Комесанья", fullName: "Франсиско Комесанья", countryFlag: "🇦🇷", seed: null },
            { name: "Микельсен", fullName: "Стивен Микельсен", countryFlag: "🇨🇦", seed: null }
        ]},
        { id: "r1-37", players: [
            { name: "Тиафу", fullName: "Фрэнсис Тиафу", countryFlag: "🇺🇸", seed: 20 },
            { name: "Нишиока", fullName: "Ёшихито Нишиока", countryFlag: "🇯🇵", seed: null }
        ]},
        { id: "r1-38", players: [
            { name: "Дамм", fullName: "Мартин Дамм", countryFlag: "🇨🇿", seed: null },
            { name: "Бланч", fullName: "Ульс Бланч", countryFlag: "🇪🇸", seed: null }
        ]},
        { id: "r1-39", players: [
            { name: "Штруфф", fullName: "Ян-Леннард Штруфф", countryFlag: "🇩🇪", seed: null },
            { name: "Макдональд", fullName: "Маккензи Макдональд", countryFlag: "🇺🇸", seed: null }
        ]},
        { id: "r1-40", players: [
            { name: "ван де Зандшульп", fullName: "Ботик ван де Зандшульп", countryFlag: "🇳🇱", seed: null },
            { name: "Руне", fullName: "Хольгер Руне", countryFlag: "🇩🇰", seed: 13 }
        ]},
        { id: "r1-41", players: [
            { name: "Меньшик", fullName: "Якуб Меньшик", countryFlag: "🇨🇿", seed: null },
            { name: "Харри", fullName: "Ллойд Харри", countryFlag: "🇬🇧", seed: null }
        ]},
        { id: "r1-42", players: [
            { name: "Бланше", fullName: "Ллюк Пуй Бланше", countryFlag: "🇧🇪", seed: null },
            { name: "Марожан", fullName: "Фабиан Марожан", countryFlag: "🇭🇺", seed: null }
        ]},
        { id: "r1-43", players: [
            { name: "Фонсека", fullName: "Жуан Фонсека", countryFlag: "🇧🇷", seed: null },
            { name: "Кецманович", fullName: "Миомир Кецманович", countryFlag: "🇷🇸", seed: 25 }
        ]},
        { id: "r1-44", players: [
            { name: "Нарди", fullName: "Лука Нарди", countryFlag: "🇮🇹", seed: null },
            { name: "Махач", fullName: "Томаш Махач", countryFlag: "🇨🇿", seed: 26 }
        ]},
        { id: "r1-45", players: [
            { name: "Накашима", fullName: "Брэндон Накашима", countryFlag: "🇺🇸", seed: null },
            { name: "де Йонг", fullName: "Йессе де Йонг", countryFlag: "🇳🇱", seed: null }
        ]},
        { id: "r1-46", players: [
            { name: "Ким", fullName: "Сунву Ким", countryFlag: "🇰🇷", seed: null },
            { name: "Куинн", fullName: "Этан Куинн", countryFlag: "🇺🇸", seed: null }
        ]},
        { id: "r1-47", players: [
            { name: "Баес", fullName: "Себастьян Баес", countryFlag: "🇦🇷", seed: 21 },
            { name: "Харрис", fullName: "Билли Харрис", countryFlag: "🇬🇧", seed: null }
        ]},
        { id: "r1-48", players: [
            { name: "Нава", fullName: "Эмилио Нава", countryFlag: "🇺🇸", seed: null, photo: "https://www.sports.ru/tennis/person/emilio-nava/photo/" },
            { name: "Фриц", fullName: "Тейлор Фриц", countryFlag: "🇺🇸", seed: 4, photo: "https://www.sports.ru/tennis/person/taylor-fritz/photo/" }
        ]},
        { id: "r1-49", players: [
            { name: "Шелтон", fullName: "Бен Шелтон", countryFlag: "🇺🇸", seed: 16 },
            { name: "Бусе", fullName: "Тьяго Сейбот Бусе", countryFlag: "🇧🇷", seed: null }
        ]},
        { id: "r1-50", players: [
            { name: "Каррено-Буста", fullName: "Пабло Каррено-Буста", countryFlag: "🇪🇸", seed: null },
            { name: "Ямас-Руис", fullName: "Марио Ямас-Руис", countryFlag: "🇪🇸", seed: null }
        ]},
        { id: "r1-51", players: [
            { name: "Томпсон", fullName: "Джордан Томпсон", countryFlag: "🇦🇺", seed: 27 },
            { name: "Муте", fullName: "Адриан Муте", countryFlag: "🇫🇷", seed: null }
        ]},
        { id: "r1-52", players: [
            { name: "Маннарино", fullName: "Адриан Маннарино", countryFlag: "🇫🇷", seed: null },
            { name: "Грикспор", fullName: "Талон Грикспор", countryFlag: "🇳🇱", seed: null }
        ]},
        { id: "r1-53", players: [
            { name: "Лехечка", fullName: "Ирши Лехечка", countryFlag: "🇨🇿", seed: 24 },
            { name: "Чорич", fullName: "Борна Чорич", countryFlag: "🇭🇷", seed: null }
        ]},
        { id: "r1-54", players: [
            { name: "Уго Карабелли", fullName: "Камило Уго Карабелли", countryFlag: "🇦🇷", seed: null },
            { name: "Этчеверри", fullName: "Томас Мартин Этчеверри", countryFlag: "🇦🇷", seed: 32 }
        ]},
        { id: "r1-55", players: [
            { name: "Галан", fullName: "Даниэль Элахи Галан", countryFlag: "🇨🇴", seed: null },
            { name: "Коллиньон", fullName: "Рафаэль Коллиньон", countryFlag: "🇧🇪", seed: null }
        ]},
        { id: "r1-56", players: [
            { name: "Офнер", fullName: "Себастьян Офнер", countryFlag: "🇦🇹", seed: null },
            { name: "Рууд", fullName: "Каспер Рууд", countryFlag: "🇳🇴", seed: 6 }
        ]},
        { id: "r1-57", players: [
            { name: "Медведев", fullName: "Даниил Медведев", countryFlag: "🇷🇺", seed: 5, photo: "https://www.sports.ru/tennis/person/daniil-medvedev/photo/" },
            { name: "Бонзи", fullName: "Бенжамин Бонзи", countryFlag: "🇫🇷", seed: null, photo: "https://www.sports.ru/tennis/person/benjamin-bonzi/photo/" }
        ]},
        { id: "r1-58", players: [
            { name: "Навоне", fullName: "Маттиа Навоне", countryFlag: "🇮🇹", seed: null },
            { name: "Гирон", fullName: "Маркос Гирон", countryFlag: "🇺🇸", seed: null }
        ]},
        { id: "r1-59", players: [
            { name: "Карбаллес Базна", fullName: "Роберто Карбаллес Базна", countryFlag: "🇪🇸", seed: null },
            { name: "Риндеркнеш", fullName: "Бенти ван де Риндеркнеш", countryFlag: "🇳🇱", seed: null }
        ]},
        { id: "r1-60", players: [
            { name: "Шевченко", fullName: "Олександр Шевченко", countryFlag: "🇰🇿", seed: null },
            { name: "Давидович-Фокина", fullName: "Алехандро Давидович-Фокина", countryFlag: "🇪🇸", seed: 28 }
        ]},
        { id: "r1-61", players: [
            { name: "Дардери", fullName: "Лучано Дардери", countryFlag: "🇮🇹", seed: null },
            { name: "Хиджиката", fullName: "Ринки Хиджиката", countryFlag: "🇦🇺", seed: null }
        ]},
        { id: "r1-62", players: [
            { name: "Достаник", fullName: "Стефан Достаник", countryFlag: "🇸🇮", seed: null },
            { name: "Спиццирри", fullName: "Николо Спиццирри", countryFlag: "🇮🇹", seed: null }
        ]},
        { id: "r1-63", players: [
            { name: "Беллуччи", fullName: "Маттео Беллуччи", countryFlag: "🇮🇹", seed: null },
            { name: "Цзюньчэн", fullName: "Шан Цзюньчэн", countryFlag: "🇨🇳", seed: 29 }
        ]},
        { id: "r1-64", players: [
            { name: "Опелка", fullName: "Райли Опелка", countryFlag: "🇺🇸", seed: null, photo: "https://www.sports.ru/tennis/person/reilly-opelka/photo/" },
            { name: "Алькарас", fullName: "Карлос Алькарас", countryFlag: "🇪🇸", seed: 3, photo: "https://www.sports.ru/tennis/person/carlos-alcaraz/photo/" }
        ]}
    ]
};

