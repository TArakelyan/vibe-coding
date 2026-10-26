// Данные проекта «Спортс»

const featuredContent = [
    {
        title: "Величайшие камбэки в спорте",
        category: "Избранная статья",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=60",
        description: "Исследуйте самые невероятные истории возвращений в спорте, которые бросили вызов всем шансам."
    },
    {
        title: "Чемпионские династии",
        category: "Популярная тема", 
        image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&auto=format&fit=crop&q=60",
        description: "Откройте для себя команды и спортсменов, которые доминировали в своих видах спорта годами."
    },
    {
        title: "Олимпийские легенды",
        category: "В тренде",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop&q=60", 
        description: "Познакомьтесь с олимпийскими героями, которые вдохновили поколения своими выступлениями."
    }
];

const wikipediaArticles = [
    {
        id: "miracle-on-ice",
        title: "Чудо на льду: Зимние Олимпийские игры 1980",
        wikiPillar: "Чемпионы",
        wikiSport: "Хоккей",
        wikiTaxonomy: "Термины и прочее",
        category: "Олимпиада",
        image: "https://images.unsplash.com/photo-1515703407324-5f753afd8be8?w=800&auto=format&fit=crop",
        description: "Величайшая сенсация в истории спорта - победа сборной США по хоккею над СССР на Олимпиаде в Лейк-Плэсиде.",
        date: "22 февраля 1980",
        readTime: "8 мин чтения",
        views: "15.2K",
        likes: "1.8K"
    },
    {
        id: "pele-career",
        title: "Пеле: Король футбола",
        wikiPillar: "Чемпионы",
        wikiSport: "Футбол",
        wikiTaxonomy: "Термины и прочее",
        category: "Легенды",
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop",
        description: "Биография величайшего футболиста всех времен и его влияние на мировой спорт.",
        date: "1940-2022",
        readTime: "12 мин чтения",
        views: "25.3K",
        likes: "3.4K"
    },
    {
        id: "muhammad-ali",
        title: "Мухаммед Али: Величайший",
        wikiPillar: "Чемпионы",
        wikiSport: "ММА",
        wikiTaxonomy: "Термины и прочее",
        category: "Легенды",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop",
        description: "История легендарного боксера, который стал символом борьбы за права человека.",
        date: "1942-2016",
        readTime: "10 мин чтения",
        views: "22.1K",
        likes: "3.1K"
    },
    {
        id: "dream-team-1992",
        title: "Команда мечты: Олимпиада 1992",
        wikiPillar: "Чемпионы",
        wikiSport: "Баскетбол",
        wikiTaxonomy: "Термины и прочее",
        category: "Олимпиада",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop",
        description: "Легендарная сборная США по баскетболу, которая изменила олимпийский спорт навсегда.",
        date: "Август 1992",
        readTime: "6 мин чтения",
        views: "12.7K",
        likes: "2.1K"
    }
];

const libraryBooks = [
    {
        id: "twin-ambitions",
        title: "Двойные амбиции: моя автобиография",
        titleEn: "Twin ambitions - my autobiography",
        author: "Мо Фара, Кейс Грей",
        category: "Автобиография",
        image: "https://hachette.imgix.net/books/9781444779592.jpg?auto=compress&w=440",
        description: "Автобиография одного из величайших атлетов Великобритании, четырехкратного олимпийского чемпиона, легендарного стайера, чьи достижения на дистанциях 5000 и 10 000 метров стали золотым стандартом мировой легкой атлетики.",
        publishYear: "2013",
        rating: 4.8,
        reviewTime: "7 мин",
        pages: 400,
        genre: "Автобиография",
        language: "английский",
        tags: ["атлетика", "спортсмен"],
        previewParagraphs: [
            "Это история человека, который сумел защитить свои титулы на двух Олимпиадах подряд, проявив беспрецедентную волю к победе и феноменальную тактическую выносливость. Книга раскрывает путь Мо Фараха от первых шагов в спорте до статуса национального героя, чье имя навсегда вписано в историю мирового бега.",
            "Мо Фара приглашает читателя за кулисы своих триумфов, предлагая честный взгляд на цену золотых медалей. Это не просто хроника забегов, а глубокое исследование психологии победителя: как справляться с колоссальным давлением, когда весь стадион ждет от тебя только первого места, и как сохранять мотивацию, имея за плечами все возможные титулы. Автор детально описывает изнурительные тренировки в высокогорье, разлуку с семьей и ту невидимую работу, которая превращает талантливого бегуна в непобедимую машину для финишных спуртов."
        ],
        reviewText: "Большинство спортивных мемуаров грешат излишним пафосом, но «Двойные амбиции» — приятное исключение. Фара пишет так же, как бежит: четко, ритмично и с поразительным вниманием к деталям. Самое ценное здесь — деконструкция того самого «фирменного рывка». Читая, буквально кожей чувствуешь жжение в легких на последнем круге в Лондоне или Рио. Это книга о том, что «двойные амбиции» — это не только про две дистанции или две Олимпиады. Это про вечный конфликт между амбициями атлета и потребностями человека. Для тех, кто ищет не просто вдохновения, а понимания того, как устроена внутренняя кухня элитного спорта, эта автобиография станет отличным ориентиром. Мо доказывает: чтобы стать первым, нужно научиться бежать не только быстрее соперников, но и быстрее собственных сомнений."
    },
    {
        id: "totally-frank",
        title: "Тотальный Фрэнки. Автобиография Лэмпарда",
        titleEn: "Totally Frank the autobiography of Lampard",
        author: "Фрэнк Лэмпард",
        category: "Автобиография",
        image: "https://m.media-amazon.com/images/I/61GGfYlG+JL._AC_UF894,1000_QL80_.jpg",
        description: "Откровенная автобиография одной из легенд английского футбола и «Челси».",
        publishYear: "2006",
        rating: 4.7,
        reviewTime: "8 мин",
        pages: 384,
        genre: "Автобиография",
        language: "русский",
        tags: ["футбол", "спортсмен"]
    },
    {
        id: "this-is-me",
        title: "Это я: автобиография",
        titleEn: "This is me: the autobiography",
        author: "Иан Торп",
        category: "Автобиография",
        image: "https://m.media-amazon.com/images/I/71tyImKhyQL._AC_UF1000,1000_QL80_.jpg",
        description: "Откровенная история австралийского пловца, пятикратного олимпийского чемпиона.",
        publishYear: "2012",
        rating: 4.6,
        reviewTime: "6 мин",
        pages: 308,
        genre: "Автобиография",
        language: "английский",
        tags: ["плавание", "спортсмен"]
    },
    {
        id: "the-artist",
        title: "Артист: быть Иньестой",
        titleEn: "The artist: being Iniesta",
        author: "Андрес Иньеста",
        category: "Автобиография",
        image: "https://m.media-amazon.com/images/I/81Ds3diT4sL._AC_UF1000,1000_QL80_.jpg",
        description: "Автобиография легендарного полузащитника «Барселоны» и сборной Испании.",
        publishYear: "2018",
        rating: 4.8,
        reviewTime: "8 мин",
        pages: 352,
        genre: "Автобиография",
        language: "английский",
        tags: ["футбол", "спортсмен"]
    },
    {
        id: "conte-head-heart-legs",
        title: "Антонио Конте. Голова, сердце и ноги",
        titleEn: "Testa, cuore e gambe by Antonio Conte",
        author: "Антонио Конте, Антонио Ди Роза",
        category: "Автобиография",
        image: "https://m.media-amazon.com/images/I/71Zx8KC3+CL._AC_UF1000,1000_QL80_.jpg",
        description: "Философия и автобиография одного из самых харизматичных тренеров современности.",
        publishYear: "2013",
        rating: 4.5,
        reviewTime: "5 мин",
        pages: 230,
        genre: "Автобиография",
        language: "русский",
        tags: ["футбол", "тренер"]
    },
    {
        id: "stillness-and-speed",
        title: "Неподвижность и скорость: моя биография",
        titleEn: "Stillness and speed: my story",
        author: "Деннис Бергкамп",
        category: "Автобиография",
        image: "https://m.media-amazon.com/images/I/812M4g60m5L._AC_UF1000,1000_QL80_.jpg",
        description: "Автобиография одного из самых утонченных и техничных футболистов в истории, легенды лондонского «Арсенала» и сборной Нидерландов, чье мастерство владения мячом граничило с искусством. Книга раскрывает путь «Нелетучего голландца» — от академического воспитания в «Аяксе» до статуса иконы Премьер-лиги, чьи голы десятилетиями считаются эталонными произведениями футбольной классики.",
        publishYear: "2013",
        rating: 4.9,
        reviewTime: "7 мин",
        pages: 300,
        genre: "Автобиография",
        language: "русский",
        tags: ["футбол", "спортсмен"],
        previewParagraphs: [
            "Детальное погружение в философию игрока, который переосмыслил роль нападающего в современном футболе, превратив каждое свое касание в эстетическое совершенство. В центре повествования — уникальное видение игры, которое Деннис Бергкамп называет поиском идеального пространства.",
            "Книга построена как глубокий диалог о перфекционизме, где автор анализирует свои самые знаменитые моменты не через призму славы, а через механику движения и геометрию поля. Это откровенный рассказ о человеке, который панически боялся летать, но при этом чувствовал себя максимально свободным в хаосе штрафной площади, создавая порядок из хаоса одним выверенным движением голеностопа."
        ],
        reviewText: "Если вы ждете от этой книги типичных раздевалочных баек или скандалов, то Бергкамп — не тот автор. «Неподвижность и скорость» — это скорее архитектурный чертеж гениального ума, чем просто мемуары. Деннис препарирует футбол с хирургической точностью, объясняя, почему пауза в движении иногда важнее самого бега. Потрясает то, как автор передает свой контроль над реальностью: он описывает свои голы так, будто время для него замирало, позволяя просчитать траекторию на три шага вперед. Это чтение для тех, кто любит футбол за его шахматную составляющую и внутреннюю логику. После прочтения начинаешь смотреть на игру иначе — начинаешь искать ту самую «неподвижность» в эпицентре футбольного шторма. Пожалуй, это самая интеллектуальная спортивная биография последних десятилетий."
    },
    {
        id: "open-agassi",
        title: "Откровенно. Автобиография",
        titleEn: "Open: an autobiography",
        author: "Андре Агасси",
        category: "Автобиография",
        image: "https://zangakbookstore.am/uploads/images/products/36ae2b4472c8f307ea27d652d7b8a32a.jpg",
        description: "Жестоко честные мемуары Андре Агасси, раскрывающие его сложные отношения с теннисом.",
        publishYear: "2009",
        rating: 4.9,
        reviewTime: "9 мин",
        pages: 404,
        genre: "Автобиография",
        language: "русский",
        tags: ["теннис", "спортсмен"],
        breadcrumbTail: "Книги о спортсменах",
        ratingCount: 6,
        previewParagraphs: [
            "Агасси выстраивает повествование как матч с собственным прошлым: детство под давлением отца, ранняя слава, падения и возвращения. Автор не стесняется показывать цену побед и пустоту за кулисами тура ATP.",
            "Для читателя раздела «Библиотека» это образец спортивной автобиографии, где личное честнее табloidных заголовков: про физическую боль, про зависимость от одобрения трибун и про попытку отделить себя от образа «бунтаря с кортов»."
        ],
        reviewText: "Редкий случай, когда звезда такого масштаба пишет без лака: страницы про отца и тренерский прессинг звучат почти как исповедь. Если вы любите теннис как драму характера, а не только счет на табло — эту книгу стоит читать подряд, без пропусков глав.",
        reviewAuthor: "Кирилл Новокщенов",
        reviewAuthorRole: "Автор, издатель Кибера"
    },
    {
        id: "my-turn",
        title: "Йохан Кройф. Моя жизнь",
        titleEn: "My turn: a life of total football",
        author: "Йохан Кройфф",
        category: "Автобиография",
        image: "https://m.media-amazon.com/images/I/91mNmA7i+kL._AC_UF1000,1000_QL80_.jpg",
        description: "Автобиография революционера футбола, легенды «Аякса» и «Барселоны».",
        publishYear: "2016",
        rating: 4.8,
        reviewTime: "8 мин",
        pages: 336,
        genre: "Автобиография",
        language: "русский",
        tags: ["футбол", "спортсмен"]
    },
    {
        id: "my-life-red-white",
        title: "Моя жизнь в красно-белом",
        titleEn: "My life in red and white",
        author: "Арсен Венгер",
        category: "Автобиография",
        image: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1587397713i/53219097.jpg",
        description: "Мемуары легендарного тренера «Арсенала», изменившего английский футбол.",
        publishYear: "2020",
        rating: 4.7,
        reviewTime: "6 мин",
        pages: 224,
        genre: "Автобиография",
        language: "русский",
        tags: ["футбол", "тренер"]
    },
    {
        id: "i-think-i-play",
        title: "Думаю - следовательно, я играю",
        titleEn: "I think therefore I play",
        author: "Андреа Пирло, Алессандро Пальчато",
        category: "Автобиография",
        image: "https://m.media-amazon.com/images/I/61WcybNpt9L.jpg",
        description: "Философская автобиография маэстро итальянского футбола.",
        publishYear: "2015",
        rating: 4.8,
        reviewTime: "5 мин",
        pages: 200,
        genre: "Автобиография",
        language: "русский",
        tags: ["футбол", "спортсмен"]
    },
    {
        id: "i-may-be-wrong",
        title: "Может, я и ошибаюсь... но сомневаюсь",
        titleEn: "I may be wrong but I doubt It",
        author: "Чарльз Баркли, Майкл Уилбон",
        category: "Биография",
        image: "https://upload.wikimedia.org/wikipedia/en/d/d7/I_May_Be_Wrong_but_I_Doubt_It_book_cover.jpg",
        description: "Откровенные взгляды легенды НБА на спорт, жизнь и общество.",
        publishYear: "2002",
        rating: 4.6,
        reviewTime: "7 мин",
        pages: 272,
        genre: "Автобиография",
        language: "русский",
        tags: ["баскетбол", "спортсмен"]
    },
    {
        id: "carlo-ancelotti-auto",
        title: "Карло Анчелотти. Автобиография",
        titleEn: "Carlo Ancelotti: the beautiful games of an ordinary genius",
        author: "Карло Анчелотти, Алессандр Альчато",
        category: "Автобиография",
        image: "https://m.media-amazon.com/images/I/61uERV9yjvL._AC_UF1000,1000_QL80_.jpg",
        description: "История одного из самых титулованных тренеров современности.",
        publishYear: "2009",
        rating: 4.7,
        reviewTime: "7 мин",
        pages: 272,
        genre: "Автобиография",
        language: "русский",
        tags: ["футбол", "тренер"]
    },
    {
        id: "basta",
        title: "Баста. Моя жизнь. Моя правда",
        titleEn: "Basta: my life, my truth",
        author: "Марко Ван Бастен",
        category: "Автобиография",
        image: "https://m.media-amazon.com/images/I/71yLRGZGQFL._AC_UF1000,1000_QL80_.jpg",
        description: "Откровенная автобиография легенды голландского футбола.",
        publishYear: "2022",
        rating: 4.8,
        reviewTime: "8 мин",
        pages: 354,
        genre: "Автобиография",
        language: "русский",
        tags: ["футбол", "спортсмен"]
    },
    {
        id: "iniesta-mon-histoire",
        title: "Я это заслужил",
        titleEn: "Andrès Iniesta: mon histoire",
        author: "Андрес Иньеста, Маркос Лопес Гарсия",
        category: "Автобиография",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThEnbSGrOzXAlSvVdeCkq2DFoLKzaiSMg-zg&s",
        description: "Путь к успеху одного из величайших футболистов Испании.",
        publishYear: "2017",
        rating: 4.7,
        reviewTime: "8 мин",
        pages: 362,
        genre: "Автобиография",
        language: "русский",
        tags: ["футбол", "спортсмен"]
    },
    {
        id: "alex-ferguson-auto",
        title: "Алекс Фергюсон. Автобиография",
        titleEn: "Alex Ferguson: autobiography",
        author: "Алекс Фергюсон",
        category: "Автобиография",
        image: "https://m.media-amazon.com/images/I/61niPtwT0zL._AC_UF1000,1000_QL80_.jpg",
        description: "Мемуары величайшего тренера в истории «Манчестер Юнайтед».",
        publishYear: "2012",
        rating: 4.9,
        reviewTime: "10 мин",
        pages: 480,
        genre: "Автобиография",
        language: "русский",
        tags: ["футбол", "тренер"]
    },
    {
        id: "del-piero",
        title: "Автобиография Алессандро Дель Пьеро",
        titleEn: "Alessandro Del Piero: Italian elegance",
        author: "Алессандро Дель Пьеро",
        category: "Автобиография",
        image: "https://m.media-amazon.com/images/I/81wUMqo9e-L.jpg",
        description: "История легенды «Ювентуса» и итальянского футбола.",
        publishYear: "2013",
        rating: 4.8,
        reviewTime: "7 мин",
        pages: 320,
        genre: "Автобиография",
        language: "русский",
        tags: ["футбол", "спортсмен"]
    },
    {
        id: "bielsa-madness",
        title: "Качество безумия. Жизнь Марсело Бьелсы",
        titleEn: "The quality of madness. the life of Marcelo Bielsa",
        author: "Тим Рич",
        category: "Биография",
        image: "https://www.wsc.co.uk/wp-content/uploads/2020/08/bielsabook-382x600.jpg",
        description: "Биография одного из самых влиятельных и необычных тренеров современности.",
        publishYear: "2020",
        rating: 4.6,
        reviewTime: "8 мин",
        pages: 352,
        genre: "Биография",
        language: "русский",
        tags: ["футбол", "тренер"]
    },
    {
        id: "quiet-leadership",
        title: "Лидерство. Анчелотти",
        titleEn: "Quiet leadership: winning hearts, minds and matches",
        author: "Карло Анчелотти, Крис Брэйди, Майк Форде",
        category: "Биография",
        image: "https://m.media-amazon.com/images/I/71OqW3OlRDL._AC_UF1000,1000_QL80_.jpg",
        description: "Философия лидерства от одного из величайших тренеров футбола.",
        publishYear: "2016",
        rating: 4.7,
        reviewTime: "7 мин",
        pages: 312,
        genre: "Биография",
        language: "русский",
        tags: ["футбол", "тренер"]
    },
    {
        id: "schumacher-formula",
        title: "Михаэль Шумахер. Формула успеха",
        titleEn: "Michael Schumacher: formula for success",
        author: "Михаэль Шумахер, Дерик Оллсоп",
        category: "Биография",
        image: "https://m.media-amazon.com/images/I/51ZPBPPWZEL._AC_UF894,1000_QL80_.jpg",
        description: "История легенды «Формулы-1» и семикратного чемпиона мира.",
        publishYear: "1996",
        rating: 4.6,
        reviewTime: "5 мин",
        pages: 144,
        genre: "Биография",
        language: "русский",
        tags: ["формула-1", "спортсмен"]
    },
    {
        id: "messi-free",
        title: "Лионель Месси. В футбол я бы играл даже бесплатно",
        titleEn: "Lionel Messi: I'd play football even for free",
        author: "Лукас Дельгадо",
        category: "Биография",
        image: "https://kniga.lv/icache/233421b7/0697f0e3/708c9346.jpg",
        description: "Биография величайшего футболиста современности.",
        publishYear: "2023",
        rating: 4.8,
        reviewTime: "8 мин",
        pages: 352,
        genre: "Биография",
        language: "русский",
        tags: ["футбол", "спортсмен"]
    },
    {
        id: "mbappe-golden-boy",
        title: "Мбаппе. Золотой мальчик французского футбола",
        titleEn: "Kylian Mbappe, the «golden boy» of French football",
        author: "France Football",
        category: "Биография",
        image: "https://kniga.lv/icache/233421b7/b2083315/242ed7b6.jpg",
        description: "История восхождения молодой звезды мирового футбола.",
        publishYear: "2021",
        rating: 4.5,
        reviewTime: "4 мин",
        pages: 128,
        genre: "Биография",
        language: "русский",
        tags: ["футбол", "спортсмен"]
    },
    {
        id: "griezmann",
        title: "Антуан Гризманн. Становление французского маэстро",
        titleEn: "Griezmann: the making of France's mini maestro",
        author: "Лука Кайоли",
        category: "Биография",
        image: "https://m.media-amazon.com/images/I/91IwnRwQKxL._UF1000,1000_QL80_.jpg",
        description: "Путь Антуана Гризманна к вершинам футбола.",
        publishYear: "2022",
        rating: 4.6,
        reviewTime: "7 мин",
        pages: 304,
        genre: "Биография",
        language: "русский",
        tags: ["футбол", "спортсмен"]
    },
    {
        id: "god-save-pep",
        title: "Боже, храни Пепа",
        titleEn: "God save Pep",
        author: "Марти Перарнау",
        category: "Биография",
        image: "https://m.media-amazon.com/images/I/81WkjHdVNjL._AC_UF1000,1000_QL80_.jpg",
        description: "История величайшего тактика современного футбола.",
        publishYear: "2024",
        rating: 4.9,
        reviewTime: "10 мин",
        pages: 480,
        genre: "Биография",
        language: "русский",
        tags: ["футбол", "тренер"]
    },
    {
        id: "ronaldo-inspiring",
        title: "Криштиану Роналду: вдохновляющая история",
        titleEn: "Cristiano Ronaldo: the inspiring story of one of soccer's star forwards",
        author: "Клэйтон Жоффрей",
        category: "Биография",
        image: "https://m.media-amazon.com/images/I/61bcDQKkHKL.jpg",
        description: "Вдохновляющая история одного из величайших футболистов всех времен.",
        publishYear: "2024",
        rating: 4.7,
        reviewTime: "4 мин",
        pages: 110,
        genre: "Биография",
        language: "русский",
        tags: ["футбол", "спортсмен"]
    },
    {
        id: "barkley-bio",
        title: "Баркли. Биография",
        titleEn: "Barkley: a biography",
        author: "Тимоти Белла",
        category: "Биография",
        image: "https://m.media-amazon.com/images/I/818QQJkG2oL._AC_UF1000,1000_QL80_.jpg",
        description: "Биография одного из самых харизматичных игроков НБА.",
        publishYear: "2022",
        rating: 4.6,
        reviewTime: "10 мин",
        pages: 576,
        genre: "Биография",
        language: "русский",
        tags: ["баскетбол", "спортсмен"]
    },
    {
        id: "wenger-inside",
        title: "Арсен Венгер в «Арсенале». Инсайдерская история",
        titleEn: "Arsene Wenger: the inside story of Arsenal under Wenger",
        author: "Джон Кросс",
        category: "Биография",
        image: "https://m.media-amazon.com/images/I/71J06Y-h9hL._AC_UF894,1000_QL80_.jpg",
        description: "Внутренняя история эры Венгера в «Арсенале».",
        publishYear: "2020",
        rating: 4.7,
        reviewTime: "9 мин",
        pages: 384,
        genre: "Биография",
        language: "русский",
        tags: ["футбол", "тренер"]
    },
    {
        id: "alekhine",
        title: "Александр Алехин. Судьба чемпиона",
        titleEn: "-",
        author: "Александр Котов",
        category: "Биография",
        image: "https://cdn.litres.ru/pub/c/cover/67930446.jpg",
        description: "Биография легендарного русского шахматиста, четвертого чемпиона мира.",
        publishYear: "2022",
        rating: 4.7,
        reviewTime: "10 мин",
        pages: 560,
        genre: "Биография",
        language: "русский",
        tags: ["шахматы", "спортсмен"]
    },
    {
        id: "ovechkin",
        title: "Александр Овечкин. Портрет на фоне НХЛ",
        titleEn: "-",
        author: "Николай Яременко",
        category: "Биография",
        image: "https://cdn.litres.ru/pub/c/cover/71504650.jpg",
        description: "Биография великого русского хоккеиста, одного из лучших снайперов НХЛ.",
        publishYear: "2025",
        rating: 4.8,
        reviewTime: "5 мин",
        pages: 140,
        genre: "Биография",
        language: "русский",
        tags: ["хоккей", "спортсмен"]
    },
    {
        id: "everest-gene",
        title: "Ген высоты. Откровенная история 12-кратного восходителя на Эверест",
        titleEn: "-",
        author: "Александр Абрамов",
        category: "Биография",
        image: "https://cdn.eksmo.ru/v2/ITD000000001425051/COVER/cover1__w600.jpg",
        description: "История покорения высочайшей вершины мира.",
        publishYear: "2025",
        rating: 4.7,
        reviewTime: "6 мин",
        pages: 240,
        genre: "Биография",
        language: "русский",
        tags: ["альпинизм", "история"]
    },
    {
        id: "tutto-senna",
        title: "Весь Сенна. Все гонки Айртона в «Формуле-1»",
        titleEn: "Tutto Senna",
        author: "Энрико Мапелли",
        category: "История",
        image: "https://cdn.litres.ru/pub/c/cover/71306914.jpg",
        description: "Полная хроника всех гонок легенды «Формулы-1» Айртона Сенны.",
        publishYear: "2024",
        rating: 4.9,
        reviewTime: "8 мин",
        pages: 256,
        genre: "История",
        language: "русский",
        tags: ["формула-1", "спортсмен"]
    },
    {
        id: "real-madrid-handbook",
        title: "Справочник «Реал» Мадрид: краткая история",
        titleEn: "The Real Madrid handbook: a concise history of Real Madrid",
        author: "Рэб МакУильям",
        category: "История",
        image: "https://m.media-amazon.com/images/I/61rm-cXGutL._AC_UF1000,1000_QL80_.jpg",
        description: "Краткая история самого титулованного клуба Европы.",
        publishYear: "2022",
        rating: 4.6,
        reviewTime: "5 мин",
        pages: 210,
        genre: "История",
        language: "английский",
        tags: ["футбол", "клуб"]
    },
    {
        id: "the-dream-ucl",
        title: "Мечта: рекорды Лиги чемпионов. Карло Анчелотти",
        titleEn: "The Dream: breaking champions league records",
        author: "Карло Анчелотти, Крис Брэйди",
        category: "История",
        image: "https://m.media-amazon.com/images/I/81KViLFvvuL.jpg",
        description: "История рекордных побед в Лиге чемпионов.",
        publishYear: "2025",
        rating: 4.8,
        reviewTime: "7 мин",
        pages: 304,
        genre: "История",
        language: "английский",
        tags: ["футбол", "тренер"]
    },
    {
        id: "death-of-senna",
        title: "Смерть Айртона Сенны",
        titleEn: "The death of Ayrton Senna",
        author: "Ричард Уильямс",
        category: "История",
        image: "https://m.media-amazon.com/images/I/A1BnlVY8ilL._AC_UF1000,1000_QL80_.jpg",
        description: "Расследование трагической гибели легенды «Формулы-1».",
        publishYear: "1995",
        rating: 4.5,
        reviewTime: "6 мин",
        pages: 224,
        genre: "История",
        language: "русский",
        tags: ["формула-1", "спортсмен"]
    },
    {
        id: "boot-room-boys",
        title: "Парни Бутрума",
        titleEn: "The Boot Room Boys: The Unseen Story of Anfield's Conquering Heroes",
        author: "Питер Хутон",
        category: "История",
        image: "https://m.media-amazon.com/images/I/9127jX4z7HL._AC_UF1000,1000_QL80_.jpg",
        description: "Невидимая история легендарной школы тренеров «Ливерпуля».",
        publishYear: "2018",
        rating: 4.7,
        reviewTime: "7 мин",
        pages: 256,
        genre: "История",
        language: "русский",
        tags: ["биография", "футбол"]
    },
    {
        id: "hillsborough",
        title: "Хиллсборо: Правда",
        titleEn: "Hillsborough: The Truth",
        author: "Фил Скратон",
        category: "История",
        image: "https://m.media-amazon.com/images/I/817NB4g2xfL._AC_UF1000,1000_QL80_.jpg",
        description: "Правда о трагедии на стадионе Хиллсборо 1989 года.",
        publishYear: "2014",
        rating: 4.8,
        reviewTime: "6 мин",
        pages: 208,
        genre: "История",
        language: "русский",
        tags: ["футбол", "событие"]
    },
    {
        id: "believe-us",
        title: "Поверьте нам: Как Юрген Клопп превратил «Ливерпуль» в чемпионов",
        titleEn: "Believe Us: How Jurgen Klopp Turned Liverpool into Champions",
        author: "Мелисса Редди",
        category: "История",
        image: "https://m.media-amazon.com/images/I/615YUFAP9PL.jpg",
        description: "Подробная летопись возрождения одного из самых титулованных клубов мира под руководством самого харизматичного тренера современности, сумевшего вернуть «Ливерпулю» золото чемпионата Англии спустя тридцать лет ожидания. Книга раскрывает внутренние механизмы управления «красными», описывая путь от назначения Юргена Клоппа в 2015 году до триумфального завоевания титула Премьер-лиги, Лиги чемпионов и клубного чемпионата мира.",
        publishYear: "2020",
        rating: 4.7,
        reviewTime: "7 мин",
        pages: 276,
        genre: "История",
        language: "русский",
        tags: ["футбол", "тренер"],
        previewParagraphs: [
            "Глубокое исследование трансформации целой футбольной экосистемы — от тактических инноваций и системы трансферов до ментальной перестройки игроков, превратившихся из «сомневающихся в верящих».",
            "Книга анализирует феномен Heavy Metal Football не просто как игровую модель, а как философию единства тренера, команды и болельщиков. Автор Мелисса Редди получила эксклюзивный доступ к ключевым фигурам клуба, чтобы показать, как Клопп выстраивал культуру ответственности и семейности внутри «Энфилда». Это история о том, как стратегическое терпение руководства в сочетании с эмоциональным интеллектом лидера позволило создать команду-династию, способную доминировать в самую конкурентную эпоху английского футбола."
        ],
        reviewText: "«Поверьте нам» — это не стандартный пересказ матчей, а мастер-класс по кризис-менеджменту и лидерству, упакованный в футбольную обертку. Мелиссе Редди удалось поймать тот самый момент, когда надежда сменилась расчетом, а хаос — порядком. Самое увлекательное в книге — наблюдать за тем, как Клопп работает с человеческим материалом: как он находит нужные слова после болезненных поражений в финалах и как заставляет звезд калибра Салаха или Ван Дейка пахать на команду без остатка. Рецензируя этот труд, хочется отметить его документальную точность. Здесь нет мифологизации — автор честно пишет о трудностях адаптации и рискованных кадровых решениях. Это обязательное чтение для тех, кто хочет понять, что современный топ-клуб — это сложнейшая корпорация, где успех зависит не только от гениальности тренера, но и от синергии аналитиков, медиков и скаутов. После прочтения фраза «Doubters to Believers» перестает быть просто маркетинговым слоганом и обретает вполне осязаемый, чемпионский вес."
    },
    {
        id: "barca-rise-fall",
        title: "Барса: Взлет и падение клуба",
        titleEn: "Barça: The Rise and Fall of the Club that Built Modern Football",
        author: "Саймон Купер",
        category: "История",
        image: "https://m.media-amazon.com/images/I/615raBOG-4L.jpg",
        description: "История взлета и падения клуба, который создал современный футбол.",
        publishYear: "2021",
        rating: 4.6,
        reviewTime: "9 мин",
        pages: 384,
        genre: "История",
        language: "русский",
        tags: ["футбол", "клуб"]
    },
    {
        id: "senna-memories",
        title: "Айртон Сенна: воспоминания и моменты о жизни, полной скорости",
        titleEn: "Ayrton Senna: memories and momentoes from a life lived at full speed",
        author: "Кристофер Хилтон",
        category: "История",
        image: "https://m.media-amazon.com/images/S/compressed.photo.goodreads.com/books/1348552694i/6346419.jpg",
        description: "Воспоминания о жизни легенды гонок Айртона Сенны.",
        publishYear: "2009",
        rating: 4.8,
        reviewTime: "6 мин",
        pages: 192,
        genre: "История",
        language: "русский",
        tags: ["формула-1", "спортсмен"]
    },
    {
        id: "golazo",
        title: "¡Golazo! История латиноамериканского футбола",
        titleEn: "¡Golazo! a history of latin american football",
        author: "Андреас Кампомар",
        category: "История",
        image: "https://m.media-amazon.com/images/I/71Wc6TVYpjL._AC_UF350,350_QL50_.jpg",
        description: "Всесторонняя история футбола в Латинской Америке.",
        publishYear: "2015",
        rating: 4.7,
        reviewTime: "12 мин",
        pages: 544,
        genre: "История",
        language: "русский",
        tags: ["футбол"]
    },
    {
        id: "f1-chronicles",
        title: "Самые слики. Хроники «Формулы-1»",
        titleEn: "-",
        author: "Виталий Хрошин",
        category: "История",
        image: "https://cdn.litres.ru/pub/c/cover_h400/67823052.jpg",
        description: "Хроники самых захватывающих гонок «Формулы-1».",
        publishYear: "2023",
        rating: 4.6,
        reviewTime: "11 мин",
        pages: 538,
        genre: "История",
        language: "русский",
        tags: ["формула-1"]
    },
    {
        id: "zenit-100",
        title: "«Зенит». История 100 лет",
        titleEn: "-",
        author: "Алексей Андрианов",
        category: "История",
        image: "https://cdn.litres.ru/pub/c/cover_h400/71907172.jpg",
        description: "Столетняя история легендарного петербургского клуба.",
        publishYear: "2025",
        rating: 4.7,
        reviewTime: "7 мин",
        pages: 269,
        genre: "История",
        language: "русский",
        tags: ["футбол", "клуб"]
    },
    {
        id: "real-madrid-history",
        title: "«Реал» Мадрид",
        titleEn: "-",
        author: "Рамиро Санчес Мартинес",
        category: "История",
        image: "https://content.img-gorod.ru/pim/products/images/54/02/0195bc8b-7962-7748-b569-87f705715402.jpg",
        description: "История величайшего клуба в истории футбола.",
        publishYear: "2025",
        rating: 4.8,
        reviewTime: "7 мин",
        pages: 269,
        genre: "История",
        language: "русский",
        tags: ["футбол", "клуб"]
    },
    {
        id: "volleyball-handbook",
        title: "Руководство по волейболу",
        titleEn: "The volleyball handbook",
        author: "Роберт Миллер",
        category: "Учебник",
        image: "https://m.media-amazon.com/images/I/812IhHjEbkL._UF1000,1000_QL80_.jpg",
        description: "Полное руководство по технике и тактике волейбола.",
        publishYear: "2005",
        rating: 4.5,
        reviewTime: "6 мин",
        pages: 248,
        genre: "Учебник",
        language: "английский",
        tags: ["волейбол"]
    }
];

const cinemaMovies = [
    {
        id: "last-dance",
        title: "Последний танец",
        originalTitle: "The Last Dance",
        director: "Джейсон Хехир",
        cinemaAbout: "спортсмены",
        cinemaSport: "Баскетбол",
        category: "Документальный",
        image: "https://dumpster.cdn.sports.ru/1/a7/d883392f3cd890617b82ede7c2cbb.png",
        description: "Грандиозная документальная сага об одной из самых доминирующих династий в истории мирового спорта — «Чикаго Буллз» девяностых годов, и о человеке, ставшем глобальным культурным феноменом, — Майкле Джордане.",
        year: "2020",
        rating: 9.2,
        kinopoiskRating: 9.2,
        imdbRating: 9.1,
        reviewTime: "5 мин",
        duration: "~50 мин × 10 эпизодов",
        genre: "Документальный сериал",
        formatLabel: "Сериал",
        country: "США",
        ageRating: "16+",
        studio: "ESPN Films, Netflix",
        writers: "Джейсон Хехир (концепция), команда ESPN",
        producers: "Майкл Толлин, Эндрю Толлин, Джейсон Хехир",
        cast: "Майкл Джордан, Скотти Пиппен, Деннис Родман, Фил Джексон и др. (архивные интервью)",
        tags: ["баскетбол", "НБА", "документалистика"],
        breadcrumbTail: "Документальный сериал",
        ratingCount: 12400,
        previewParagraphs: [
            "Беспрецедентное по масштабу исследование золотой эпохи баскетбола, охватывающее путь команды от статуса аутсайдеров до шестикратных чемпионов НБА. Проект объединяет в себе уникальные архивные кадры сезона-1997/98, которые десятилетиями хранились под замком, и современные интервью с ключевыми участниками событий, создавая монументальный портрет коллектива, изменившего облик профессионального спорта навсегда.",
            "В центре сюжета — финальный аккорд великой команды, когда игроки и тренеры уже знали, что их союз будет разорван руководством клуба, несмотря на статус действующих чемпионов. Сериал мастерски переплетает хронику последнего похода за титулом с биографическими очерками Майкла Джордана, Скотти Пиппена, Денниса Родмана и Фила Джексона. Это история не столько о бросках и передачах, сколько о запредельном уровне конкуренции, внутренней кухне больших побед и о том, какую колоссальную психологическую цену приходится платить за право называться величайшим в своем деле."
        ],
        reviewText: "«Последний танец» — это редкий случай, когда спортивная документалистика превращается в шекспировскую драму. Фильм разрушает глянцевый образ Майкла Джордана, показывая его не только как бога атлетизма, но и как жесткого, порой деспотичного лидера, чей менталитет «победа любой ценой» одновременно восхищает и пугает. Режиссеру удалось невозможное: даже зная исход каждого матча тридцатилетней давности, зритель сидит в напряжении, будто смотрит прямой эфир. Это не просто ностальгическое путешествие для фанатов «быков» — это глубокое размышление о природе лидерства и о том, как изнурительно долго длится путь к вершине и как стремительно наступает финал. Сериал доказывает, что магия той команды заключалась в единстве противоположностей: дзен-буддизма Джексона, ярости Джордана и хаоса Родмана. Настоящий шедевр, который заставляет поверить, что в спорте, как и в искусстве, бывают моменты абсолютного совершенства.",
        trailerYoutubeId: "JQk2hJs2ToA"
    },
    {
        id: "rocky",
        title: "Рокки",
        originalTitle: "Rocky",
        director: "Джон Эвилдсен",
        cinemaAbout: "спортсмены",
        cinemaSport: "ММА",
        category: "Драма",
        image: "https://dumpster.cdn.sports.ru/b/21/270270bf9924de5ddd5c84074c50a.png",
        description: "Культовая спортивная драма, ставшая символом триумфа человеческого духа и заложившая фундамент для одной из самых успешных кинофраншиз в истории мирового кинематографа. Это история о «маленьком человеке», простом боксере из Филадельфии, который вопреки всем обстоятельствам получил шанс всей жизни — выйти на ринг против чемпиона мира в тяжелом весе.",
        year: "1976",
        rating: 8.5,
        kinopoiskRating: 8.1,
        imdbRating: 8.1,
        reviewTime: "8 мин",
        duration: "120 мин",
        genre: "Спортивная драма",
        formatLabel: "Фильм",
        country: "США",
        ageRating: "16+",
        studio: "Chartoff-Winkler Productions",
        writers: "Сильвестр Сталлоне",
        producers: "Роберт Чартофф, Ирвин Уинклер",
        cast: "Сильвестр Сталлоне, Талия Шайр, Берджесс Мередит, Карл Уэзерс",
        tags: ["бокс", "драма"],
        breadcrumbTail: "Спортивная драма",
        ratingCount: 8200,
        previewParagraphs: [
            "Фильм фокусируется не столько на технике бокса, сколько на внутренней трансформации героя, живущего на обочине жизни. Рокки Бальбоа — не профессиональный атлет с неограниченными ресурсами, а вышибала в долгах, чья единственная опора — это вера в то, что он может «продержаться все пятнадцать раундов». Это глубоко личная драма о поиске достоинства, о любви к застенчивой девушке и о том, что настоящая победа заключается не в судейских записках, а в способности выстоять под градом ударов судьбы и остаться человеком.",
            "Картина не только удостоилась трех премий «Оскар», включая награду за лучший фильм года, но и превратила Сильвестра Сталлоне в суперзвезду первой величины, доказав, что искренность и упорство способны сокрушить любые преграды как в кино, так и в реальности."
        ],
        reviewText: "«Рокки» — это редчайший пример кино, которое за пятьдесят лет не растеряло ни грамма своей магии. Парадокс в том, что это фильм о боксе, где сам бой занимает лишь малую часть экранного времени. Вся сила ленты кроется в серых улицах Филадельфии, в разбитых костяшках и в стакане сырых яиц на завтрак. Сталлоне написал сценарий о самом себе, и эта предельная честность чувствуется в каждом кадре. Рецензируя «Рокки», невозможно игнорировать его мощнейший гуманистический посыл. Фильм не обещает золотых гор или легкой славы; он воспевает сам процесс борьбы. Финальный крик «Эдриан!» звучит громче любого объявления победителя, потому что это гимн человеку, который нашел смысл жизни вне ринга. Это кино о том, что каждый из нас имеет право на свой «двенадцатый раунд», даже если весь мир поставил против нас. Классика, которая напоминает: главное — не то, как сильно ты бьешь, а то, какой удар ты можешь выдержать.",
        trailerYoutubeId: "3VUblDwa648"
    },
    {
        id: "moneyball-movie",
        title: "Человек, который изменил все",
        originalTitle: "Moneyball",
        director: "Беннетт Миллер",
        cinemaAbout: "тренеры",
        cinemaSport: "Другие",
        category: "Биография",
        image: "https://dumpster.cdn.sports.ru/5/3a/cb71b164d97e9ec5dd2ce33080d50.png",
        description: "Интеллектуальная спортивная драма, основанная на реальной истории Билли Бина, менеджера бейсбольной команды «Окленд Атлетикс», который совершил настоящую революцию в управлении профессиональным спортом. Это захватывающий рассказ о том, как математический анализ и статистические методы бросили вызов вековым традициям, интуиции скаутов и огромным бюджетам богатых клубов.",
        year: "2011",
        rating: 8.0,
        kinopoiskRating: 7.7,
        imdbRating: 7.6,
        reviewTime: "7 мин",
        duration: "133 мин",
        genre: "Спортивная драма",
        formatLabel: "Фильм",
        country: "США",
        ageRating: "12+",
        studio: "Columbia Pictures, Scott Rudin Productions",
        writers: "Стив Зейлиан, Аарон Соркин (сценарий по книге Майкла Льюиса)",
        producers: "Майкл де Лука, Рэйчел Хоровиц, Скотт Рудин",
        cast: "Брэд Питт, Джона Хилл, Филип Сеймур Хоффман, Робин Райт",
        tags: ["бейсбол", "аналитика", "МЛБ"],
        breadcrumbTail: "Биография / спорт",
        ratingCount: 5600,
        previewParagraphs: [
            "Картина демонстрирует, как в условиях жесткого финансового дефицита можно построить конкурентоспособную команду, используя инновационный подход к оценке игроков, что навсегда изменило ландшафт не только бейсбола, но и всей индустрии глобального спорта.",
            "Сюжет разворачивается вокруг попытки главного героя найти системную ошибку в спортивной экономике. Вместо того чтобы искать дорогостоящих суперзвезд, Бин и его помощник-экономист начинают искать полезные качества в игроках, которых все остальные списали со счетов. Это кино о столкновении старого и нового мира, о поиске истины в цифрах и о том, как один человек, обладающий смелостью пойти против течения, заставляет всю систему работать по его правилам, доказывая, что интеллект и расчет могут быть эффективнее сырой силы и денег."
        ],
        reviewText: "«Человек, который изменил все» — это, пожалуй, лучший фильм о спорте, в котором самого спорта на экране почти нет. Брэд Питт создает образ героя нового времени: он не машет кулаками и не произносит пафосных речей в раздевалке, его главное оружие — электронная таблица и телефон. Режиссеру Беннетту Миллеру удалось превратить сухую статистику в увлекательный триллер, где каждое кадровое решение ощущается как рискованная ставка в казино. Самое сильное в этой картине — ее честность перед зрителем. Она не предлагает дешевого хеппи-энда, но дает нечто большее: понимание того, что прогресс невозможен без боли и тотального неприятия со стороны консервативного большинства. Это фильм не про бейсбол, а про одержимость идеей и готовность поставить на кон свою репутацию ради правды, которую видишь только ты. В мире, где все играют по правилам, побеждает тот, кто эти правила переписывает. Классика «умного» кино, которую стоит пересматривать каждый раз, когда вам говорят, что «так делать не принято».",
        trailerYoutubeId: "LorQ3rSKIVQ"
    }
];

/** Разводящие страницы из выпадающего списка «Другие» у фильтров разделов */
const othersDropdownLandings = {
    wikipedia: [
        {
            slug: 'wiki-olympic-hub',
            title: 'Олимпийское движение',
            paragraphs: [
                'Подборка материалов об Играх, символике олимпийского движения и знаковых турнирах — удобная точка входа, если вы начинаете с олимпийской темы.',
                'После перехода к материалам включится фильтр «Чемпионы».'
            ],
            filterPillar: 'Чемпионы'
        },
        {
            slug: 'wiki-legends-hub',
            title: 'Зал легенд',
            paragraphs: [
                'Персоны и эпохи, которые задали образ большого спорта в массовой культуре и на поле.',
                'Откройте ленту с фильтром «Чемпионы», чтобы сузить выдачу до турнирных и персональных сюжетов.'
            ],
            filterPillar: 'Чемпионы'
        },
        {
            slug: 'wiki-sport-wide-hub',
            title: 'Широкий контекст спорта',
            paragraphs: [
                'Разводящая страница для читателя, который хочет пройтись по разным типам статей без узкой категории.',
                'Дальше показываются все статьи раздела «Википедия» без фильтра по столпам.'
            ],
            filterPillar: null
        }
    ],
    library: [
        {
            slug: 'lib-shelf-bio',
            title: 'Полка биографий',
            paragraphs: [
                'Книги о судьбах спортсменов и тренеров: от автобиографий до исследовательских биографий.',
                'В библиотеке отобразятся издания категории «Биография».'
            ],
            libraryCategory: 'Биография'
        },
        {
            slug: 'lib-shelf-history',
            title: 'История и эпохи',
            paragraphs: [
                'Хроники, клубы, турниры и поворотные сезоны — когда важен контекст, а не только одна личность.',
                'Фильтр: категория «История».'
            ],
            libraryCategory: 'История'
        },
        {
            slug: 'lib-shelf-practice',
            title: 'Практика и методики',
            paragraphs: [
                'Учебные и прикладные тексты: разбор дисциплин, подготовки и тактики.',
                'Фильтр: категория «Учебник».'
            ],
            libraryCategory: 'Учебник'
        }
    ],
    cinema: [
        {
            slug: 'cin-hub-docs',
            title: 'Документальное кино',
            paragraphs: [
                'Архивные кадры, интервью и хроника — когда история спорта рассказана через камеру.',
                'В кинотеатре останутся фильмы с категорией «Документальный».'
            ],
            cinemaCategory: 'Документальный'
        },
        {
            slug: 'cin-hub-drama',
            title: 'Спортивная драма',
            paragraphs: [
                'Истории андердогов, конфликтов и финалов, собранные в художественном повествовании.',
                'Фильтр по категории «Драма».'
            ],
            cinemaCategory: 'Драма'
        },
        {
            slug: 'cin-hub-bio-screen',
            title: 'Биографии на экране',
            paragraphs: [
                'Экранизации судеб атлетов и менеджеров, где документальная основа встречается с драматургией.',
                'Фильтр по категории «Биография».'
            ],
            cinemaCategory: 'Биография'
        }
    ],
    today: [
        {
            slug: 'today-nba-spotlight',
            title: 'Дайджест NBA в этот день',
            paragraphs: [
                'Сюжеты плей-офф, форы и сенсации серий — в одном разделе.',
                'После перехода включатся фильтры «Матчи» и вид спорта «Баскетбол».'
            ],
            todayKind: 'Матчи',
            todaySport: 'Баскетбол'
        },
        {
            slug: 'today-racing-notes',
            title: 'Большие старты и котировки',
            paragraphs: [
                'Derby, классические дистанции и значимые победы в календаре.',
                'Откроется фильтр «Матчи» и вид спорта «Другие».'
            ],
            todayKind: 'Матчи',
            todaySport: 'Другие'
        }
    ]
};

const allowedLibraryTitles = [
    "Двойные амбиции",
    "Неподвижность и скорость",
    "Поверьте нам: Как Юрген Клопп превратил «Ливерпуль» в чемпионов"
];
const filteredLibraryBooks = libraryBooks.filter(book => {
    const title = String(book.title || '');
    return allowedLibraryTitles.some(name => title.includes(name));
});
libraryBooks.length = 0;
libraryBooks.push(...filteredLibraryBooks);

const customWikipediaArticles = [
    {
        id: "wiki-england-champions-football",
        title: "Все чемпионы Англии по годам",
        image: "./data/wiki-england-champions.png",
        likes: "12.4K",
        category: "История",
        wikiPillar: "Чемпионы",
        wikiSport: "Футбол",
        wikiTaxonomy: "Термины и прочее"
    },
    {
        id: "wiki-biathlon-rules",
        title: "Правила биатлона",
        image: "./data/wiki-biathlon-rules.png",
        likes: "8.1K",
        category: "Правила",
        wikiPillar: "Правила",
        wikiSport: "Другие",
        wikiTaxonomy: "Правила"
    },
    {
        id: "wiki-nba-draft-explained",
        title: "Что такое драфт НБА",
        image: "./data/wiki-nba-draft.png",
        likes: "10.2K",
        category: "Финансы",
        wikiPillar: "Финансы",
        wikiSport: "Баскетбол",
        wikiTaxonomy: "Термины и прочее"
    }
];
wikipediaArticles.length = 0;
wikipediaArticles.push(...customWikipediaArticles);

const allowedCinemaTitles = ["Последний танец", "Рокки", "Человек, который изменил все"];
const filteredCinemaMovies = cinemaMovies.filter(movie => allowedCinemaTitles.includes(movie.title));
cinemaMovies.length = 0;
cinemaMovies.push(...filteredCinemaMovies);

const stats = [
    { value: "10,000+", label: "Статей" },
    { value: "5,000+", label: "Рецензий на книги" },
    { value: "2,500+", label: "Фильмов и сериалов" },
    { value: "100+ лет", label: "Исторического охвата" }
];

const navigationItems = [
    { name: "Главная", href: "/", active: true },
    { name: "Википедия", href: "/wikipedia", icon: "file-text" },
    { name: "Библиотека", href: "/library", icon: "book-open" },
    { name: "Кинотеатр", href: "/cinema", icon: "film" },
    { name: "Сегодня", href: "/today", icon: "calendar" }
];

// Делаем переменные глобально доступными
window.featuredContent = featuredContent;
window.wikipediaArticles = wikipediaArticles;
window.libraryBooks = libraryBooks;
window.cinemaMovies = cinemaMovies;
window.stats = stats;
window.navigationItems = navigationItems;
window.othersDropdownLandings = othersDropdownLandings;


