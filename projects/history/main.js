// Спортс — навигация по разделам

/** При показе #section-landing подсвечиваем пункт меню родительского раздела */
let landingNavParentSection = null;

/** Раздел «Сегодня»: выбранный календарный день и фильтры */
let todaySelectedDate = new Date();
/** @type {{ kind: string, sport: string | null }} */
let todayFilterState = { kind: 'Все', sport: null };

/** Состояние фильтров разделов */
let wikiFilterState = { pillar: null, sport: null, taxonomy: null };
let libraryFilterState = { shelf: 'Все', sport: null };
let cinemaFilterState = { row: 'Все', sport: null };

const FILTER_MAIN_SPORTS = ['Футбол', 'Хоккей', 'Баскетбол', 'Теннис', 'ММА', 'Автоспорт', 'Бокс', 'Фигурка'];

function sportMatchesFilter(articleSport, filterSport) {
    const s = articleSport || 'Другие';
    if (!filterSport) return true;
    if (filterSport === 'Другие') return !FILTER_MAIN_SPORTS.includes(s);
    return s === filterSport;
}

function deriveLibrarySport(book) {
    if (book.librarySport) return book.librarySport;
    const tags = (book.tags || []).map(t => String(t).toLowerCase());
    if (tags.some(t => t.includes('футбол'))) return 'Футбол';
    if (tags.some(t => t.includes('хоккей'))) return 'Хоккей';
    if (tags.some(t => t.includes('баскетбол') || t.includes('нба'))) return 'Баскетбол';
    if (tags.some(t => t.includes('теннис'))) return 'Теннис';
    if (tags.some(t => t.includes('автоспорт') || t.includes('формула-1') || t.includes('формула 1') || t.includes('f1'))) return 'Автоспорт';
    if (tags.some(t => t.includes('бокс'))) return 'Бокс';
    if (tags.some(t => t.includes('mma') || t.includes('ufc') || t.includes('мма'))) return 'ММА';
    if (tags.some(t => t.includes('фигур') || t.includes('фигурка') || t.includes('фигурное'))) return 'Фигурка';
    return 'Другие';
}

function deriveCinemaSport(movie) {
    if (movie.cinemaSport) return movie.cinemaSport;
    const tags = (movie.tags || []).map(t => String(t).toLowerCase());
    if (tags.some(t => t.includes('футбол'))) return 'Футбол';
    if (tags.some(t => t.includes('хоккей'))) return 'Хоккей';
    if (tags.some(t => t.includes('баскетбол') || t.includes('нба'))) return 'Баскетбол';
    if (tags.some(t => t.includes('теннис'))) return 'Теннис';
    if (tags.some(t => t.includes('автоспорт') || t.includes('формула-1') || t.includes('формула 1') || t.includes('f1') || t.includes('гонк'))) return 'Автоспорт';
    if (tags.some(t => t.includes('бокс'))) return 'Бокс';
    if (tags.some(t => t.includes('mma') || t.includes('мма') || t.includes('ufc'))) return 'ММА';
    if (tags.some(t => t.includes('фигур') || t.includes('фигурка') || t.includes('фигурное'))) return 'Фигурка';
    return 'Другие';
}

function bookMatchesLibraryShelf(book, shelf) {
    if (shelf === 'Все') return true;
    const tags = (book.tags || []).map(t => String(t).toLowerCase());
    const hasAthlete = tags.includes('спортсмен');
    const hasCoach = tags.includes('тренер');
    if (shelf === 'Спортсмены') return hasAthlete;
    if (shelf === 'Тренеры') return hasCoach;
    const mapSingular = {
        Автобиографии: 'Автобиография',
        Биографии: 'Биография',
        Учебники: 'Учебник',
        История: 'История'
    };
    const cat = mapSingular[shelf];
    return cat && book.category === cat;
}

function movieMatchesCinemaRow(movie, row) {
    if (!row || row === 'Все') return true;
    if (row === 'Фильмы') return movie.formatLabel === 'Фильм';
    if (row === 'Сериалы') return movie.formatLabel === 'Сериал';
    if (row === 'Документальное') return movie.category === 'Документальный';
    if (row === 'О тренерах') return movie.cinemaAbout === 'тренеры';
    if (row === 'О спортсменах') return movie.cinemaAbout === 'спортсмены';
    return true;
}

function applyWikipediaFilters() {
    const grid = document.getElementById('wikipedia-articles-grid');
    if (!grid || !window.wikipediaArticles) return;

    const filtered = window.wikipediaArticles.filter(a => {
        if (wikiFilterState.pillar && (a.wikiPillar || '') !== wikiFilterState.pillar) return false;
        if (!sportMatchesFilter(a.wikiSport || 'Другие', wikiFilterState.sport)) return false;
        if (wikiFilterState.taxonomy && (a.wikiTaxonomy || '') !== wikiFilterState.taxonomy) return false;
        return true;
    });

    grid.innerHTML = '';
    filtered.forEach(article => grid.appendChild(createArticleCard(article)));
    if (!filtered.length) {
        grid.innerHTML = '<div class="col-span-full text-center text-muted-foreground py-12">Статей по выбранным фильтрам не найдено</div>';
    }

    const wikiSection = document.getElementById('section-wikipedia');
    if (wikiSection) {
        const sportLabel = wikiFilterState.sport == null ? 'Все' : wikiFilterState.sport;
        wikiSection.querySelectorAll('.filter-pills .btn.rounded-full').forEach(btn => {
            const active = btn.textContent.trim() === sportLabel;
            btn.className = active ? 'btn btn-primary rounded-full px-4 py-2' : 'btn btn-secondary rounded-full px-4 py-2';
        });
    }
}

function applyLibraryFilters() {
    const grid = document.getElementById('library-books-grid');
    if (!grid || !window.libraryBooks) return;

    const filtered = window.libraryBooks.filter(book => {
        if (!sportMatchesFilter(deriveLibrarySport(book), libraryFilterState.sport)) return false;
        return true;
    });

    grid.innerHTML = '';
    filtered.forEach(book => grid.appendChild(createBookCard(book)));
    if (!filtered.length) {
        grid.innerHTML = '<div class="col-span-full text-center text-muted-foreground py-12">Книг по выбранным фильтрам не найдено</div>';
    }

    const librarySection = document.getElementById('section-library');
    if (librarySection) {
        librarySection.querySelectorAll('.filter-pills .btn.rounded-full').forEach(btn => {
            const active = btn.textContent.trim() === (libraryFilterState.sport || 'Все');
            btn.className = active ? 'btn btn-primary rounded-full px-4 py-2' : 'btn btn-secondary rounded-full px-4 py-2';
        });
    }
}

function applyCinemaFilters() {
    const grid = document.getElementById('cinema-movies-grid');
    if (!grid || !window.cinemaMovies) return;

    const filtered = window.cinemaMovies.filter(m => {
        if (!sportMatchesFilter(deriveCinemaSport(m), cinemaFilterState.sport)) return false;
        return true;
    });

    grid.innerHTML = '';
    filtered.forEach(movie => grid.appendChild(createMovieCard(movie)));
    if (!filtered.length) {
        grid.innerHTML = '<div class="col-span-full text-center text-muted-foreground py-12">В этой подборке пока нет карточек</div>';
    }

    const cinemaSection = document.getElementById('section-cinema');
    if (cinemaSection) {
        cinemaSection.querySelectorAll('.filter-pills .btn.rounded-full').forEach(btn => {
            const active = btn.textContent.trim() === (cinemaFilterState.sport || 'Все');
            btn.className = active ? 'btn btn-primary rounded-full px-4 py-2' : 'btn btn-secondary rounded-full px-4 py-2';
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    // Show home section by default
    showSection('home');
    
    // Initialize search functionality
    initializeSearch();
    
    // Initialize animations
    initializeAnimations();
    
    // Load dynamic content
    loadDynamicContent();

    populateOthersDropdownPanels();
    initFilterDropdowns();
    initTodaySection();
}

// Section navigation functionality - make it global
window.showSection = function(sectionName) {
    if (sectionName !== 'landing') {
        landingNavParentSection = null;
    }

    closeGlobalSearchPanel();
    const gin = document.getElementById('global-search-input');
    if (gin) gin.value = '';

    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    const targetSection = document.getElementById(`section-${sectionName}`);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    const navKey = sectionName === 'landing' && landingNavParentSection
        ? landingNavParentSection
        : sectionName;
    updateNavigation(navKey);

    if (sectionName === 'today') {
        renderTodaySection();
    }
};

// Article detail functionality
window.showArticle = function(articleId) {
    landingNavParentSection = null;
    closeGlobalSearchPanel();
    const gin = document.getElementById('global-search-input');
    if (gin) gin.value = '';

    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show article detail section
    const articleSection = document.getElementById('article-detail');
    if (articleSection) {
        articleSection.classList.add('active');
    }
    
    // Load article content based on articleId
    loadArticleContent(articleId);
}

function loadArticleContent(articleId) {
    const article = (window.wikipediaArticles || []).find(a => a.id === articleId);
    const section = document.getElementById('article-detail');
    if (!section) return;

    if (!article) {
        section.innerHTML = `
        <article class="container px-4 py-8 article-shell">
            <button type="button" class="btn btn-secondary mb-6 gap-2 article-back" onclick="showSection('wikipedia')">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
                    <path d="m12 19-7-7 7-7"></path>
                    <path d="M19 12H5"></path>
                </svg>
                Назад к Википедии
            </button>
            <h1 class="article-title mt-4 mb-4">Статья не найдена</h1>
            <p class="text-muted-foreground">Похоже, материал был удален или временно недоступен.</p>
        </article>`;
        return;
    }

    const title = escapeHtml(article.title || 'Материал Википедии');
    const image = escapeHtml(historyResolveMediaUrl(article.image || 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&auto=format&fit=crop'));
    const bodyHtml = buildWikipediaArticleBodyHtml(article);

    section.innerHTML = `
    <article class="container px-4 py-8 article-shell">
        <nav class="book-breadcrumbs mb-6" aria-label="Хлебные крошки">
            <a href="#" onclick="showSection('home'); return false;">Главная</a>
            <span class="book-bc-sep">/</span>
            <a href="#" onclick="showSection('wikipedia'); return false;">Википедия</a>
            <span class="book-bc-sep">/</span>
            <span>${title}</span>
        </nav>

        <div class="mb-8">
            <h1 class="article-title mb-4">${title}</h1>
        </div>

        <div class="aspect-video rounded-lg overflow-hidden mb-8 bg-muted">
            <img src="${image}" alt="${title}" class="w-full h-full object-cover">
        </div>

        <div class="prose prose-lg max-w-none text-foreground" style="line-height: 1.8;">
            ${bodyHtml}
        </div>
        ${buildHistoryRecBlocksWikipedia(articleId)}
    </article>`;
    wireHistoryRecommendationBlocks(section);
}

function buildWikipediaArticleBodyHtml(article) {
    const title = String(article?.title || '');
    const map = {
        'Все чемпионы Англии по годам': `
            <p>Представляем список всех победителей высшего футбольного дивизиона Англии с 1992 года, с момента образования Английской Премьер-лиги.</p>
            <h2>1992–2004: рождение АПЛ и доминирование «Манчестер Юнайтед»</h2>
            <p><strong>Сезон 1992–1993, чемпион – «Манчестер Юнайтед».</strong> Первый сезон в истории образованной Премьер-лиги. Команда Алекса Фергюсона завоевала титул спустя 26 лет после последнего чемпионства. Ключевым моментом стал переход Эрика Кантона из «Лидса» в середине сезона.</p>
            <p><strong>Сезон 1993–1994, чемпион – «Манчестер Юнайтед».</strong> Манкунианцы доминировали на протяжении всего чемпионата и сделали «золотой дубль», выиграв также Кубок Англии.</p>
            <p><strong>Сезон 1994–1995, чемпион – «Блэкберн Роверс».</strong> Единственный триумф команды Кенни Далглиша. Судьба титула решилась в последнем туре, когда «Манчестер Юнайтед» не обыграл «Вест Хэм».</p>
            <p><strong>Сезон 1995–1996, чемпион – «Манчестер Юнайтед».</strong> Сезон запомнился фразой Алана Хансена: «Вы никогда ничего не выиграете с детьми». Фергюсон сделал ставку на выпускников академии, и они взяли титул.</p>
            <p><strong>Сезон 1996–1997, чемпион – «Манчестер Юнайтед».</strong> Очередная победа «красных дьяволов», которые на финише обошли «Ньюкасл», «Арсенал» и «Ливерпуль».</p>
            <p><strong>Сезон 1997–1998, чемпион – «Арсенал».</strong> Арсен Венгер в первый полный сезон в Англии привел «канониров» к чемпионству, отыграв большое отставание от «Юнайтед».</p>
            <p><strong>Сезон 1998–1999, чемпион – «Манчестер Юнайтед».</strong> Легендарный сезон «требла». В АПЛ борьба с «Арсеналом» шла до последней минуты последнего тура.</p>
            <p><strong>Сезон 1999–2000, чемпион – «Манчестер Юнайтед».</strong> Убедительная победа с большим отрывом от ближайшего преследователя.</p>
            <p><strong>Сезон 2000–2001, чемпион – «Манчестер Юнайтед».</strong> Третий титул подряд. Фергюсон стал первым тренером в истории Англии с тремя чемпионствами кряду.</p>
            <p><strong>Сезон 2001–2002, чемпион – «Арсенал».</strong> «Арсенал» оформил чемпионство на «Олд Траффорд», не проиграв ни одного выездного матча за сезон.</p>
            <p><strong>Сезон 2002–2003, чемпион – «Манчестер Юнайтед».</strong> Титул вернулся в Манчестер после мощной серии во второй половине чемпионата.</p>
            <p><strong>Сезон 2003–2004, чемпион – «Арсенал».</strong> Уникальное достижение «непобедимых» – 38 матчей без единого поражения.</p>
            <h2>2004–2016: эра «Челси», второй пик «Юнайтед» и чудо «Лестера»</h2>
            <p><strong>Сезон 2004–2005, чемпион – «Челси».</strong> Начало эры Жозе Моуринью: 95 очков и рекордно надежная оборона.</p>
            <p><strong>Сезон 2005–2006, чемпион – «Челси».</strong> Лондонцы защитили титул и подтвердили превосходство над конкурентами.</p>
            <p><strong>Сезон 2006–2007, чемпион – «Манчестер Юнайтед».</strong> После паузы «Юнайтед» вернул золото благодаря яркой игре лидеров атаки.</p>
            <p><strong>Сезон 2007–2008, чемпион – «Манчестер Юнайтед».</strong> Команда Фергюсона опередила «Челси» всего на два очка.</p>
            <p><strong>Сезон 2008–2009, чемпион – «Манчестер Юнайтед».</strong> Вторая серия из трех титулов подряд и закрепление статуса топ-клуба эпохи.</p>
            <p><strong>Сезон 2009–2010, чемпион – «Челси».</strong> Карло Анчелотти в первый сезон взял титул и поставил рекорд результативности.</p>
            <p><strong>Сезон 2010–2011, чемпион – «Манчестер Юнайтед».</strong> Рекордный 19-й титул чемпиона Англии.</p>
            <p><strong>Сезон 2011–2012, чемпион – «Манчестер Сити».</strong> Самая драматичная развязка: легендарный гол Агуэро на последних секундах.</p>
            <p><strong>Сезон 2012–2013, чемпион – «Манчестер Юнайтед».</strong> Последний сезон сэра Алекса Фергюсона и 20-й титул клуба.</p>
            <p><strong>Сезон 2013–2014, чемпион – «Манчестер Сити».</strong> Команда Пеллегрини воспользовалась осечкой «Ливерпуля» на финише.</p>
            <p><strong>Сезон 2014–2015, чемпион – «Челси».</strong> Второе пришествие Моуринью ознаменовалось уверенной победой.</p>
            <p><strong>Сезон 2015–2016, чемпион – «Лестер Сити».</strong> Главная сенсация современного футбола: команда, которой прогнозировали вылет, выиграла АПЛ.</p>
            <h2>2016–2024: эра «Манчестер Сити» и чемпионство «Ливерпуля»</h2>
            <p><strong>Сезон 2016–2017, чемпион – «Челси».</strong> Антонио Конте и переход на схему с тремя защитниками принесли титул.</p>
            <p><strong>Сезон 2017–2018, чемпион – «Манчестер Сити».</strong> Команда Пепа Гвардиолы первой в истории набрала 100 очков.</p>
            <p><strong>Сезон 2018–2019, чемпион – «Манчестер Сити».</strong> В невероятной гонке «Сити» опередил «Ливерпуль» всего на одно очко.</p>
            <p><strong>Сезон 2019–2020, чемпион – «Ливерпуль».</strong> Долгожданное золото спустя 30 лет.</p>
            <p><strong>Сезон 2020–2021, чемпион – «Манчестер Сити».</strong> После сложного старта команда перестроилась и уверенно вернула трофей.</p>
            <p><strong>Сезон 2021–2022, чемпион – «Манчестер Сити».</strong> Чемпионство добыто в камбэке против «Астон Виллы» в последнем туре.</p>
            <p><strong>Сезон 2022–2023, чемпион – «Манчестер Сити».</strong> Часть исторического требла и очередной титул в эпохе Гвардиолы.</p>
            <p><strong>Сезон 2023–2024, чемпион – «Манчестер Сити».</strong> Первая команда в истории английского футбола, выигравшая четыре титула подряд.</p>
        `,
        'Правила биатлона': `
            <h2>Биатлон: правила, виды гонок, история и экипировка</h2>
            <p>Биатлон – это уникальное сочетание двух сложных дисциплин: скоростной лыжной гонки и точной стрельбы из винтовки. Главная сложность спорта в том, что после максимальной физической нагрузки спортсмену нужно мгновенно успокоить пульс и поразить мишени с дистанции 50 метров. Именно поэтому биатлон так непредсказуем: один промах на стрельбище может легко перечеркнуть преимущество, наработанное на трассе.</p>
            <p>Телевизионные трансляции всегда собирают множество зрителей у экранов. Но чтобы по-настоящему понимать происходящее, стоит углубиться в детали. Биатлон – это не просто лыжи и стрельба, это сложная тактическая игра с ветром, рельефом трассы и собственной психологией.</p>
            <h2>История биатлона</h2>
            <p>Корни этого занятия уходят в глубокую древность, когда лыжи и лук были единственным способом добыть пропитание зимой. Наскальные рисунки, найденные в Норвегии, подтверждают, что люди охотились на лыжах еще тысячи лет назад. Как спортивная дисциплина биатлон начал формироваться в военной среде: в XVIII веке пограничные отряды скандинавских стран проводили состязания, напоминающие современные гонки.</p>
            <p>Долгое время этот спорт назывался «гонки военных патрулей» и даже входил в программу первых зимних Олимпиад как демонстрационный вид. Официальное рождение современного биатлона произошло в 1950-х, когда утвердили единые правила, а крупнокалиберные карабины заменили легкими малокалиберными винтовками. В программу Олимпийских игр биатлон окончательно вошел в 1960 году.</p>
            <h2>Основные правила биатлона</h2>
            <p>Биатлон регулируется строгим сводом правил Международного союза биатлонистов (IBU). Каждый шаг спортсмена – от старта до поведения на огневом рубеже – подчинен четкому регламенту.</p>
            <h2>Лыжная гонка</h2>
            <p>Разрешен свободный стиль (коньковый ход). Спортсмены используют малокалиберные винтовки калибра 5,6 мм (.22 LR) с ручной перезарядкой. Минимально допустимый вес оружия – 3,5 кг (без обойм и патронов), усилие спуска – не менее 500 грамм. На дистанции винтовка находится за спиной стволом вверх, снимать ее можно только на коврике огневого рубежа.</p>
            <h2>Стрельба</h2>
            <p>Все действия выполняются с дистанции 50 метров. В положении лежа диаметр цели – 45 мм, в положении стоя – 115 мм. В стрельбе стоя запрещено использовать упор и касаться локтями корпуса или бедер.</p>
            <h2>Штрафы</h2>
            <p>В спринте, пасьюте, масс-старте и эстафете за каждый промах спортсмен проходит штрафной круг 150 метров (примерно 25 секунд). В индивидуальной гонке применяется штрафная минута – 60 секунд к итоговому времени за промах. В эстафетах предусмотрены три дополнительных патрона на каждый рубеж.</p>
            <h2>Виды гонок</h2>
            <p><strong>Спринт:</strong> мужчины – 10 км, женщины – 7,5 км, два рубежа, раздельный старт.</p>
            <p><strong>Гонка преследования (пасьют):</strong> 12,5 км у мужчин и 10 км у женщин, четыре рубежа.</p>
            <p><strong>Индивидуальная гонка:</strong> 20 км у мужчин и 15 км у женщин, четыре рубежа, штрафная минута за промах.</p>
            <p><strong>Масс-старт:</strong> одновременный старт 30 лучших спортсменов, четыре рубежа.</p>
            <p><strong>Эстафета:</strong> командный формат 4×7,5 км у мужчин или 4×6 км у женщин, с дополнительными патронами.</p>
            <h2>Экипировка биатлонистов</h2>
            <p>Винтовка – малокалиберная, с диоптрическим прицелом (оптика запрещена). Лыжи и палки подбираются под особенности конькового хода и баланс с винтовкой за спиной. Одежда – аэродинамичный комбинезон, термобелье и защитные очки.</p>
            <h2>Трасса и стрельбище</h2>
            <p>Лыжная трасса сочетает подъемы, спуски и равнины, а перепад высот регламентируется IBU. Огневой рубеж обычно включает 30 коридоров и ветровые флажки, по которым спортсмены корректируют стрельбу.</p>
            <h2>Главные турниры</h2>
            <p>Ключевые соревнования – Олимпийские игры, чемпионат мира, Кубок мира, Кубок IBU и чемпионат Европы. Именно на этих стартах формируется элита биатлона и раскрываются новые имена.</p>
        `,
        'Что такое драфт НБА': `
            <h2>Как устроен драфт НБА: от лотереи до выбора будущих звезд</h2>
            <p>Драфт НБА – это ежегодное событие, в ходе которого команды лиги выбирают новых игроков. Чаще всего это выпускники американских колледжей, но в последние десятилетия на драфт выходит все больше баскетболистов из Европы, Латинской Америки и Азии. Главная цель драфта – поддержание паритета в лиге: худшие команды прошлого сезона получают возможность выбрать самых талантливых новичков первыми.</p>
            <h2>История возникновения</h2>
            <p>Первый драфт прошел в 1947 году. В те времена существовало правило территориального выбора, которое позволяло клубам забирать игроков из местных колледжей еще до начала основной процедуры, чтобы привлечь больше зрителей. Это правило отменили в 1966 году.</p>
            <h2>Лотерея драфта</h2>
            <p>Чтобы команды не проигрывали матчи специально ради первого номера («танкинг»), лига ввела систему лотереи. В ней участвуют 14 команд, не попавших в плей-офф. Худшие три команды сезона имеют равные и самые высокие шансы на первый пик – по 14%.</p>
            <p>Лотерея определяет только первые четыре номера выбора, остальные распределяются в обратном порядке по итогам регулярного чемпионата.</p>
            <h2>Структура и раунды</h2>
            <p>Современный драфт состоит из двух раундов. В каждом раунде выбирается по 30 игроков – по одному выбору на каждую команду, если пики не были обменяны заранее.</p>
            <p><strong>Первый раунд:</strong> выбранные игроки получают гарантированные контракты.</p>
            <p><strong>Второй раунд:</strong> контракты не гарантированы, клубы чаще отправляют игроков в G-лигу или договариваются индивидуально.</p>
            <h2>Знаменитые кражи и провалы</h2>
            <p>История драфта полна примеров, когда будущие звезды выбирались низко: Никола Йокич ушел под 41-м номером, Ману Джинобили – под 57-м. И наоборот, статус первого номера не гарантирует успешную карьеру.</p>
            <h2>Эволюция процесса</h2>
            <p>С 2024 года НБА проводит драфт в два дня: первый раунд в один день, второй – на следующий. Это дает клубам больше времени на анализ и сделки и подчеркивает значимость драфта как ключевого инструмента строительства команд-династий.</p>
        `
    };
    return map[title] || `<p>Статья временно обновляется. Скоро здесь появится полноценный материал по теме «${escapeHtml(title)}».</p>`;
}

function escapeHtml(text) {
    if (text == null) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/** Абсолютный URL для локальных `./data/...` — корректно на деплое и в подпапках. */
function historyResolveMediaUrl(url) {
    if (url == null || url === '') return '';
    const s = String(url).trim();
    if (/^https?:\/\//i.test(s) || s.startsWith('data:') || s.startsWith('blob:')) return s;
    try {
        const rel = s.replace(/^\.\//, '');
        return new URL(rel, window.location.href).href;
    } catch {
        return s;
    }
}

/** Ключ «месяц-день» для календаря «Сегодня» (реальная дата пользователя). */
function historyTodayMonthDayKey(d = new Date()) {
    return `${d.getMonth() + 1}-${d.getDate()}`;
}

function historySimpleHash(str) {
    let h = 0;
    const s = String(str);
    for (let i = 0; i < s.length; i++) {
        h = ((h << 5) - h) + s.charCodeAt(i);
        h |= 0;
    }
    return Math.abs(h);
}

/** До 3 элементов, стабильный «перемешанный» порядок; исключение по id. */
function historyPickThree(items, excludeId, idField = 'id') {
    const list = (items || []).filter(x => x && x[idField] !== excludeId);
    const scored = list.map(x => ({
        item: x,
        score: historySimpleHash(String(x[idField]) + '|' + String(excludeId || ''))
    }));
    scored.sort((a, b) => a.score - b.score);
    return scored.slice(0, 3).map(s => s.item);
}

function historyRecMeta(seedStr) {
    const h = historySimpleHash(seedStr);
    const plus = 12 + (h % 78);
    const showFlame = (h % 4) !== 0;
    const flame = 1 + ((h >> 3) % 12);
    return { plus, showFlame, flame };
}

function buildHistoryRecCardBook(b) {
    const meta = historyRecMeta(`b-${b.id}`);
    const flame = meta.showFlame
        ? `<span class="history-rec-flame" aria-hidden="true">🔥 ${meta.flame}</span>`
        : '<span class="history-rec-flame history-rec-flame--empty" aria-hidden="true"></span>';
    const safeId = escapeHtml(b.id).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    const imgU = historyResolveMediaUrl(b.image || '');
    return `
<button type="button" class="history-rec-card" onclick="showBook('${safeId}')">
    <div class="history-rec-card-img"><img src="${escapeHtml(imgU)}" alt="" loading="lazy" decoding="async" /></div>
    <div class="history-rec-card-body">
        <div class="history-rec-card-title">${escapeHtml(b.title || '')}</div>
        <div class="history-rec-card-meta">
            <span class="history-rec-plus">+${meta.plus}</span>
            ${flame}
        </div>
    </div>
</button>`;
}

function buildHistoryRecCardMovie(m) {
    const meta = historyRecMeta(`m-${m.id}`);
    const flame = meta.showFlame
        ? `<span class="history-rec-flame" aria-hidden="true">🔥 ${meta.flame}</span>`
        : '<span class="history-rec-flame history-rec-flame--empty" aria-hidden="true"></span>';
    const safeId = escapeHtml(m.id).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    const imgU = historyResolveMediaUrl(m.image || '');
    return `
<button type="button" class="history-rec-card" onclick="showMovie('${safeId}')">
    <div class="history-rec-card-img"><img src="${escapeHtml(imgU)}" alt="" loading="lazy" decoding="async" /></div>
    <div class="history-rec-card-body">
        <div class="history-rec-card-title">${escapeHtml(m.title || '')}</div>
        <div class="history-rec-card-meta">
            <span class="history-rec-plus">+${meta.plus}</span>
            ${flame}
        </div>
    </div>
</button>`;
}

/** Карточка книги как в сетке «Библиотека» (обложка 2:3 + блок текста). */
function buildHistoryRecCardBookGrid(b) {
    const safeId = escapeHtml(b.id).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    const imgU = historyResolveMediaUrl(b.image || '');
    const year = escapeHtml(String(b.publishYear ?? ''));
    const pages = escapeHtml(String(b.pages ?? ''));
    return `
<button type="button" class="history-rec-card history-rec-card--book-grid group cursor-pointer library-grid-card card library-card-inner h-full transition-all duration-300 hover:shadow-hover border border-border flex flex-col text-left" onclick="showBook('${safeId}')">
    <div class="book-cover-wrapper overflow-hidden shrink-0" style="aspect-ratio: 2/3;">
        <img src="${escapeHtml(imgU)}" alt="" class="w-full h-full transition-transform duration-300 group-hover:scale-105 object-cover" loading="lazy" decoding="async" />
    </div>
    <div class="library-card-body">
        <div class="library-card-stack">
            <h3 class="library-card-title group-hover:text-primary transition-colors line-clamp-3">${escapeHtml(b.title || '')}</h3>
            <div class="library-card-meta" aria-label="Год и объем">
                <span>
                    <svg class="library-card-meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    ${year}
                </span>
                <span class="library-card-meta-dot" aria-hidden="true"></span>
                <span>
                    <svg class="library-card-meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                    ${pages} стр.
                </span>
            </div>
        </div>
    </div>
</button>`;
}

/** Карточка фильма как в сетке «Кинотеатр». */
function buildHistoryRecCardMovieGrid(m) {
    const safeId = escapeHtml(m.id).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    const imgU = historyResolveMediaUrl(m.image || '');
    const rating = escapeHtml(String(m.rating ?? ''));
    const director = escapeHtml(m.director || '');
    return `
<button type="button" class="history-rec-card history-rec-card--movie-grid group cursor-pointer cinema-grid-card card cinema-card-inner h-full transition-all duration-300 hover:shadow-hover border border-border flex flex-col text-left" onclick="showMovie('${safeId}')">
    <div class="book-cover-wrapper overflow-hidden shrink-0" style="aspect-ratio: 2/3;">
        <img src="${escapeHtml(imgU)}" alt="" class="w-full h-full transition-transform duration-300 group-hover:scale-105 object-cover" loading="lazy" decoding="async" />
    </div>
    <div class="cinema-card-body">
        <div class="cinema-card-stack">
            <h3 class="cinema-card-title group-hover:text-primary transition-colors line-clamp-3">${escapeHtml(m.title || '')}</h3>
            <div class="cinema-card-rating-row" role="img" aria-label="Оценка ${rating} из 10">
                <span class="cinema-card-star" aria-hidden="true">★</span>
                <span class="cinema-card-rating-num">${rating}</span>
            </div>
            <p class="cinema-card-director">${director}</p>
        </div>
    </div>
</button>`;
}

function buildHistoryRecCardToday(ev) {
    const meta = historyRecMeta(`e-${ev.id}`);
    const flame = meta.showFlame
        ? `<span class="history-rec-flame" aria-hidden="true">🔥 ${meta.flame}</span>`
        : '<span class="history-rec-flame history-rec-flame--empty" aria-hidden="true"></span>';
    const href = ev.materialHref && /^https:\/\//i.test(String(ev.materialHref))
        ? String(ev.materialHref).trim()
        : 'https://www.sports.ru/?utm_source=special-history';
    const imgU = historyResolveMediaUrl(ev.image || '');
    return `
<a class="history-rec-card history-rec-card--link" href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">
    <div class="history-rec-card-img"><img src="${escapeHtml(imgU)}" alt="" loading="lazy" decoding="async" /></div>
    <div class="history-rec-card-body">
        <div class="history-rec-card-title">${escapeHtml(ev.title || '')}</div>
        <div class="history-rec-card-meta">
            <span class="history-rec-plus">+${meta.plus}</span>
            ${flame}
        </div>
    </div>
</a>`;
}

function buildHistoryRecCarousel(title, cardsHtml, scrollModifierClass) {
    if (!cardsHtml || !String(cardsHtml).trim()) return '';
    const scrollMod = scrollModifierClass ? ` ${scrollModifierClass}` : '';
    return `
<section class="history-rec-section" aria-label="${escapeHtml(title)}">
    <h2 class="history-rec-heading">${escapeHtml(title)}</h2>
    <div class="history-rec-strip-wrap">
        <div class="history-rec-scroll${scrollMod}" data-rec-scroll tabindex="0">
            ${cardsHtml}
        </div>
        <button type="button" class="history-rec-next" data-rec-next aria-label="Показать ещё">
            <span class="history-rec-next-arw" aria-hidden="true">›</span>
        </button>
    </div>
</section>`;
}

function wireHistoryRecommendationBlocks(root) {
    if (!root) return;
    root.querySelectorAll('.history-rec-strip-wrap').forEach(wrap => {
        const track = wrap.querySelector('[data-rec-scroll]');
        const nextBtn = wrap.querySelector('[data-rec-next]');
        if (!track || !nextBtn || nextBtn.dataset.bound) return;
        nextBtn.dataset.bound = '1';
        nextBtn.addEventListener('click', () => {
            const step = Math.min(280, Math.floor(track.clientWidth * 0.75));
            track.scrollBy({ left: step, behavior: 'smooth' });
        });
    });
}

/** Википедия: кино, книги, события сегодня. */
function buildHistoryRecBlocksWikipedia(currentArticleId) {
    const movies = historyPickThree(window.cinemaMovies || [], null);
    const books = historyPickThree(window.libraryBooks || [], null);
    const dayKey = historyTodayMonthDayKey();
    const dayEvents = (window.todayEventsByMonthDay && window.todayEventsByMonthDay[dayKey]) || [];
    const events = historyPickThree(dayEvents, null);

    const h1 = buildHistoryRecCarousel('Что посмотреть', movies.map(buildHistoryRecCardMovieGrid).join(''), 'history-rec-scroll--matches-section-grid');
    const h2 = buildHistoryRecCarousel('Что почитать', books.map(buildHistoryRecCardBookGrid).join(''), 'history-rec-scroll--matches-section-grid');
    const h3 = buildHistoryRecCarousel('Что было сегодня', events.map(buildHistoryRecCardToday).join(''));
    const inner = [h1, h2, h3].filter(Boolean).join('');
    if (!inner) return '';
    return `<div class="history-rec-blocks">${inner}</div>`;
}

/** Библиотека: статьи, кино, события сегодня. */
function buildHistoryRecBlocksLibrary(currentBookId) {
    const articles = historyPickThree(window.wikipediaArticles || [], null);
    const movies = historyPickThree(window.cinemaMovies || [], null);
    const dayKey = historyTodayMonthDayKey();
    const dayEvents = (window.todayEventsByMonthDay && window.todayEventsByMonthDay[dayKey]) || [];
    const events = historyPickThree(dayEvents, null);

    const h1 = buildHistoryRecCarousel('Что узнать', articles.map(a => {
        const meta = historyRecMeta(`w-${a.id}`);
        const flame = meta.showFlame
            ? `<span class="history-rec-flame" aria-hidden="true">🔥 ${meta.flame}</span>`
            : '<span class="history-rec-flame history-rec-flame--empty" aria-hidden="true"></span>';
        const safeId = escapeHtml(a.id).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
        const imgU = historyResolveMediaUrl(a.image || '');
        return `
<button type="button" class="history-rec-card" onclick="showArticle('${safeId}')">
    <div class="history-rec-card-img"><img src="${escapeHtml(imgU)}" alt="" loading="lazy" decoding="async" /></div>
    <div class="history-rec-card-body">
        <div class="history-rec-card-title">${escapeHtml(a.title || '')}</div>
        <div class="history-rec-card-meta">
            <span class="history-rec-plus">+${meta.plus}</span>
            ${flame}
        </div>
    </div>
</button>`;
    }).join(''));
    const h2 = buildHistoryRecCarousel('Что посмотреть', movies.map(buildHistoryRecCardMovieGrid).join(''), 'history-rec-scroll--matches-section-grid');
    const h3 = buildHistoryRecCarousel('Что было сегодня', events.map(buildHistoryRecCardToday).join(''));
    const inner = [h1, h2, h3].filter(Boolean).join('');
    if (!inner) return '';
    return `<div class="history-rec-blocks">${inner}</div>`;
}

/** Кинотеатр: статьи, книги, события сегодня. */
function buildHistoryRecBlocksCinema(currentMovieId) {
    const articles = historyPickThree(window.wikipediaArticles || [], null);
    const books = historyPickThree(window.libraryBooks || [], null);
    const dayKey = historyTodayMonthDayKey();
    const dayEvents = (window.todayEventsByMonthDay && window.todayEventsByMonthDay[dayKey]) || [];
    const events = historyPickThree(dayEvents, null);

    const h1 = buildHistoryRecCarousel('Что узнать', articles.map(a => {
        const meta = historyRecMeta(`w-${a.id}`);
        const flame = meta.showFlame
            ? `<span class="history-rec-flame" aria-hidden="true">🔥 ${meta.flame}</span>`
            : '<span class="history-rec-flame history-rec-flame--empty" aria-hidden="true"></span>';
        const safeId = escapeHtml(a.id).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
        const imgU = historyResolveMediaUrl(a.image || '');
        return `
<button type="button" class="history-rec-card" onclick="showArticle('${safeId}')">
    <div class="history-rec-card-img"><img src="${escapeHtml(imgU)}" alt="" loading="lazy" decoding="async" /></div>
    <div class="history-rec-card-body">
        <div class="history-rec-card-title">${escapeHtml(a.title || '')}</div>
        <div class="history-rec-card-meta">
            <span class="history-rec-plus">+${meta.plus}</span>
            ${flame}
        </div>
    </div>
</button>`;
    }).join(''));
    const h2 = buildHistoryRecCarousel('Что почитать', books.map(buildHistoryRecCardBookGrid).join(''), 'history-rec-scroll--matches-section-grid');
    const h3 = buildHistoryRecCarousel('Что было сегодня', events.map(buildHistoryRecCardToday).join(''));
    const inner = [h1, h2, h3].filter(Boolean).join('');
    if (!inner) return '';
    return `<div class="history-rec-blocks">${inner}</div>`;
}

/** Раздел «Сегодня»: статьи, книги, кино. */
function buildHistoryRecBlocksTodayPage() {
    const articles = historyPickThree(window.wikipediaArticles || [], null);
    const books = historyPickThree(window.libraryBooks || [], null);
    const movies = historyPickThree(window.cinemaMovies || [], null);

    const h1 = buildHistoryRecCarousel('Что узнать', articles.map(a => {
        const meta = historyRecMeta(`w-${a.id}`);
        const flame = meta.showFlame
            ? `<span class="history-rec-flame" aria-hidden="true">🔥 ${meta.flame}</span>`
            : '<span class="history-rec-flame history-rec-flame--empty" aria-hidden="true"></span>';
        const safeId = escapeHtml(a.id).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
        const imgU = historyResolveMediaUrl(a.image || '');
        return `
<button type="button" class="history-rec-card" onclick="showArticle('${safeId}')">
    <div class="history-rec-card-img"><img src="${escapeHtml(imgU)}" alt="" loading="lazy" decoding="async" /></div>
    <div class="history-rec-card-body">
        <div class="history-rec-card-title">${escapeHtml(a.title || '')}</div>
        <div class="history-rec-card-meta">
            <span class="history-rec-plus">+${meta.plus}</span>
            ${flame}
        </div>
    </div>
</button>`;
    }).join(''));
    const h2 = buildHistoryRecCarousel('Что почитать', books.map(buildHistoryRecCardBookGrid).join(''), 'history-rec-scroll--matches-section-grid');
    const h3 = buildHistoryRecCarousel('Что посмотреть', movies.map(buildHistoryRecCardMovieGrid).join(''), 'history-rec-scroll--matches-section-grid');
    const inner = [h1, h2, h3].filter(Boolean).join('');
    if (!inner) return '';
    return `<div class="history-rec-blocks history-rec-blocks--today">${inner}</div>`;
}

function renderTodayRecommendationsMount() {
    const mount = document.getElementById('today-rec-mount');
    if (!mount) return;
    const html = buildHistoryRecBlocksTodayPage();
    mount.innerHTML = html || '';
    wireHistoryRecommendationBlocks(mount);
}

/** Поиск книги на Читай-городе / Литрес (можно задать свои URL в данных книги). */
function buildChitaiGorodUrl(book) {
    const u = book.chitaiGorodUrl;
    if (u && /^https:\/\//i.test(String(u))) return String(u).trim();
    return `https://www.chitai-gorod.ru/search?phrase=${encodeURIComponent(book.title || '')}`;
}

function buildLitresUrl(book) {
    const u = book.litresUrl;
    if (u && /^https:\/\//i.test(String(u))) return String(u).trim();
    return `https://www.litres.ru/search/?q=${encodeURIComponent(book.title || '')}`;
}

function historyStorePillLogoSrc(kind) {
    const logos = window.historyPillLogos || {};
    return kind === 'chitai' ? (logos.chitai || '') : (logos.litres || '');
}

function historyStreamPillLogoSrc(kind) {
    const logos = window.historyPillLogos || {};
    return kind === 'kp' ? (logos.kinopoisk || '') : (logos.okko || '');
}

/** Кнопки-«пилюли» Читай-город / Литрес: логотип PNG слева, текст «Читать». */
function storePillLinkHtml(href, kind) {
    const logoSrc = historyResolveMediaUrl(historyStorePillLogoSrc(kind) || '');
    const mod = kind === 'chitai' ? 'btn-store-pill--chitai' : 'btn-store-pill--litres';
    const iconHtml = logoSrc
        ? `<span class="btn-store-pill-ico" aria-hidden="true"><img class="btn-store-pill-icon-img" src="${escapeHtml(logoSrc)}" alt="" width="96" height="28" decoding="async" /></span>`
        : '';
    return `<a href="${escapeHtml(href)}" class="btn-store-pill ${mod}" target="_blank" rel="noopener noreferrer">${iconHtml}<span class="btn-store-pill-txt">Читать</span></a>`;
}

function buildKinopoiskWatchUrl(movie) {
    const u = movie.kinopoiskWatchUrl;
    if (u && /^https:\/\//i.test(String(u))) return String(u).trim();
    return `https://www.kinopoisk.ru/search/?query=${encodeURIComponent(movie.title || '')}`;
}

function buildOkkoWatchUrl(movie) {
    const u = movie.okkoWatchUrl;
    if (u && /^https:\/\//i.test(String(u))) return String(u).trim();
    return `https://okko.tv/search?q=${encodeURIComponent(movie.title || '')}`;
}

/** Пилюли «Кинопоиск» / «ОККО»: логотип PNG слева, текст «Смотреть». */
function streamPillLinkHtml(href, kind) {
    const kp = kind === 'kp';
    const logoSrc = historyResolveMediaUrl(historyStreamPillLogoSrc(kind) || '');
    const mod = kp ? 'btn-stream-pill--kp' : 'btn-stream-pill--okko';
    const aria = kp ? 'Кинопоиск: перейти к просмотру' : 'ОККО: перейти к просмотру';
    const imgClass = kp ? 'btn-stream-pill-icon-img btn-stream-pill-icon-img--kp' : 'btn-stream-pill-icon-img btn-stream-pill-icon-img--okko';
    const iconHtml = logoSrc
        ? `<span class="btn-stream-pill-ico" aria-hidden="true"><img class="${imgClass}" src="${escapeHtml(logoSrc)}" alt="" width="80" height="26" decoding="async" /></span>`
        : '';
    return `<a href="${escapeHtml(href)}" class="btn-stream-pill ${mod}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(aria)}">${iconHtml}<span class="btn-stream-pill-txt">Смотреть</span></a>`;
}

function closeAllFilterDropdowns() {
    document.querySelectorAll('.filter-dropdown.is-open').forEach(dd => {
        dd.classList.remove('is-open');
        const panel = dd.querySelector('.filter-dropdown-panel');
        const trig = dd.querySelector('.filter-dropdown-trigger');
        if (panel) panel.hidden = true;
        if (trig) trig.setAttribute('aria-expanded', 'false');
    });
}

function populateOthersDropdownPanels() {
    const ids = {
        wikipedia: 'panel-wikipedia-others',
        library: 'panel-library-others',
        cinema: 'panel-cinema-others',
        today: 'panel-today-others'
    };
    Object.keys(ids).forEach(key => {
        const panel = document.getElementById(ids[key]);
        const items = window.othersDropdownLandings?.[key] || [];
        if (!panel) return;
        panel.innerHTML = items.map(item =>
            `<a href="#" class="filter-dropdown-link" role="menuitem" data-section="${escapeHtml(key)}" data-slug="${escapeHtml(item.slug)}">${escapeHtml(item.title)}</a>`
        ).join('');
    });
}

function initFilterDropdowns() {
    document.querySelectorAll('.filter-dropdown').forEach(dd => {
        const trig = dd.querySelector('.filter-dropdown-trigger');
        const panel = dd.querySelector('.filter-dropdown-panel');
        if (!trig || !panel) return;
        trig.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            const opening = panel.hidden;
            closeAllFilterDropdowns();
            if (opening) {
                dd.classList.add('is-open');
                panel.hidden = false;
                trig.setAttribute('aria-expanded', 'true');
            }
        });
    });

    document.addEventListener('click', e => {
        const opt = e.target.closest('.filter-dropdown-option');
        if (opt) {
            e.preventDefault();
            const target = opt.dataset.filterTarget;
            const field = opt.dataset.filterField;
            let val = opt.dataset.filterValue;
            val = val === '' ? null : (val || null);

            if (target === 'wikipedia') {
                if (field === 'sport') wikiFilterState.sport = val;
                if (field === 'taxonomy') wikiFilterState.taxonomy = val;
                applyWikipediaFilters();
            } else if (target === 'library') {
                if (field === 'sport') libraryFilterState.sport = val;
                applyLibraryFilters();
            } else if (target === 'cinema') {
                if (field === 'sport') cinemaFilterState.sport = val;
                applyCinemaFilters();
            } else if (target === 'today') {
                if (field === 'sport') todayFilterState.sport = val;
                renderTodaySection();
            }
            closeAllFilterDropdowns();
            return;
        }

        const link = e.target.closest('.filter-dropdown-link');
        if (link) {
            e.preventDefault();
            showLandingPage(link.dataset.section, link.dataset.slug);
            return;
        }
        if (!e.target.closest('.filter-dropdown')) {
            closeAllFilterDropdowns();
        }
    });
}

function findLandingEntry(sectionKey, slug) {
    const list = window.othersDropdownLandings?.[sectionKey];
    return list?.find(x => x.slug === slug);
}

window.showLandingPage = function(sectionKey, slug) {
    const entry = findLandingEntry(sectionKey, slug);
    if (!entry) return;
    landingNavParentSection = sectionKey;
    closeAllFilterDropdowns();

    const backLabels = { wikipedia: 'Википедия', library: 'Библиотека', cinema: 'Кинотеатр', today: 'Сегодня' };
    const backLabel = backLabels[sectionKey] || 'Раздел';
    const paras = (entry.paragraphs || []).map(p => `<p>${escapeHtml(p)}</p>`).join('');
    const mount = document.getElementById('landing-mount');
    if (!mount) return;

    mount.innerHTML = `
<button type="button" class="btn btn-secondary mb-6 gap-2 book-back-btn" onclick="closeLandingAndReturn()">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4" aria-hidden="true">
        <path d="m12 19-7-7 7-7"></path>
        <path d="M19 12H5"></path>
    </svg>
    Назад в «${escapeHtml(backLabel)}»
</button>
<h1 class="mb-3">${escapeHtml(entry.title)}</h1>
<div class="section-page-lead landing-lead">${paras}</div>
<div class="landing-actions flex flex-wrap gap-3 mt-8">
    <button type="button" class="btn btn-primary" onclick="applyLandingFilterAndGo('${escapeHtml(sectionKey)}', '${escapeHtml(entry.slug)}')">Перейти к материалам</button>
</div>`;

    showSection('landing');
    window.scrollTo(0, 0);
};

window.closeLandingAndReturn = function() {
    const s = landingNavParentSection || 'home';
    landingNavParentSection = null;
    showSection(s);
};

function setActiveFilterPill(sectionKey, labelText) {
    const section = document.getElementById(`section-${sectionKey}`);
    if (!section) return;
    section.querySelectorAll('.filter-pills .btn.rounded-full').forEach(btn => {
        const active = btn.textContent.trim() === labelText;
        btn.className = active ? 'btn btn-primary rounded-full px-4 py-2' : 'btn btn-secondary rounded-full px-4 py-2';
    });
}

window.applyLandingFilterAndGo = function(sectionKey, slug) {
    const entry = findLandingEntry(sectionKey, slug);
    if (!entry) return;
    landingNavParentSection = null;
    showSection(sectionKey);

    if (sectionKey === 'library') {
        const shelfByCat = {
            Автобиография: 'Автобиографии',
            Биография: 'Биографии',
            Учебник: 'Учебники',
            История: 'История'
        };
        const shelf = entry.libraryCategory == null ? 'Все' : (shelfByCat[entry.libraryCategory] || 'Все');
        libraryFilterState = { shelf, sport: null };
        setActiveFilterPill('library', shelf);
        applyLibraryFilters();
    } else if (sectionKey === 'wikipedia') {
        if (entry.filterPillar == null) {
            wikiFilterState = { pillar: null, sport: null, taxonomy: null };
            setActiveFilterPill('wikipedia', 'Все');
        } else {
            wikiFilterState = { pillar: entry.filterPillar, sport: null, taxonomy: null };
            setActiveFilterPill('wikipedia', entry.filterPillar);
        }
        applyWikipediaFilters();
    } else if (sectionKey === 'cinema') {
        const rowByCat = {
            Документальный: 'Документальное',
            Драма: 'Фильмы',
            Биография: 'Фильмы'
        };
        const row = entry.cinemaCategory == null ? 'Все' : (rowByCat[entry.cinemaCategory] || 'Все');
        cinemaFilterState = { row, sport: null };
        setActiveFilterPill('cinema', row);
        applyCinemaFilters();
    } else if (sectionKey === 'today') {
        const kind = entry.todayKind == null ? 'Все' : entry.todayKind;
        const sport = entry.todaySport != null ? entry.todaySport : null;
        todayFilterState = { kind, sport };
        setActiveFilterPill('today', kind);
        renderTodaySection();
    }
};

function enrichBookForDetail(book) {
    const genre = book.genre || book.category || 'Спорт';
    const previewParagraphs = book.previewParagraphs || [
        book.description,
        `Материал библиотеки Спортс дополняет подборку «${book.category}»: книга раскрывает контекст карьеры и личного пути авторов в русле большого спорта.`
    ];
    const reviewText = book.reviewText ||
        `${book.description} Рекомендуем читать последовательно: так проще удержать нить биографии и спортивных поворотов сюжета.`;
    const reviewAuthor = book.reviewAuthor || 'Иван Иванов';
    const reviewAuthorRole = book.reviewAuthorRole || 'Автор Спортса';
    const ratingCount = book.ratingCount != null ? book.ratingCount : Math.max(4, Math.round((book.rating || 4) * 3));
    const breadcrumbTail = book.breadcrumbTail || `Книги: ${book.category}`;
    return {
        ...book,
        previewParagraphs,
        reviewText,
        reviewAuthor,
        reviewAuthorRole,
        ratingCount,
        breadcrumbTail,
        genreLabel: genre
    };
}

function renderStarsRow(rating) {
    const full = Math.min(5, Math.max(0, Math.round(Number(rating) || 0)));
    const empty = 5 - full;
    return `<span class="book-stars text-yellow-500" aria-hidden="true">${'★'.repeat(full)}${'☆'.repeat(empty)}</span>`;
}

function reviewerInitials(name) {
    const parts = String(name).trim().split(/\s+/).filter(Boolean);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return (parts[0] || '?').slice(0, 2).toUpperCase();
}

function reviewerAvatarUrl(name) {
    return 'https://dumpster.cdn.sports.ru/f/0d/457ce6558a8fc43eabb0cd900bac1.png';
}

function buildBookTags(book) {
    const set = new Set(['книги']);
    (book.tags || []).forEach(t => set.add(String(t).toLowerCase()));
    if (book.category) set.add(book.category.toLowerCase());
    if (book.genre && book.genre !== book.category) set.add(String(book.genre).toLowerCase());
    return Array.from(set);
}

function buildBookDetailHtml(book) {
    const b = enrichBookForDetail(book);
    const tagsHtml = buildBookTags(b).map(t =>
        `<span class="book-tag-pill"><span class="book-tag-dot" aria-hidden="true"></span>${escapeHtml(t)}</span>`
    ).join('');
    const previewHtml = b.previewParagraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('');
    const reviewerAvatar = reviewerAvatarUrl(b.reviewAuthor);
    const titleEnBlock = b.titleEn ? `<p class="book-detail-subtitle">${escapeHtml(b.titleEn)}</p>` : '';

    const starsInteractive = [1, 2, 3, 4, 5].map(n =>
        `<button type="button" class="book-rate-star" data-value="${n}" aria-label="${n} из 5">☆</button>`
    ).join('');

    return `
<nav class="book-breadcrumbs" aria-label="Хлебные крошки">
    <a href="#" onclick="showSection('home'); return false;">Главная</a>
    <span class="book-bc-sep">/</span>
    <a href="#" onclick="showSection('library'); return false;">Библиотека</a>
    <span class="book-bc-sep">/</span>
    <span>${escapeHtml(b.breadcrumbTail)}</span>
</nav>
<div class="book-tags-row flex flex-wrap gap-2">${tagsHtml}</div>
<div class="book-detail-grid">
    <div class="book-detail-cover-col">
        <div class="book-detail-cover-frame">
            <img src="${escapeHtml(b.image)}" alt="${escapeHtml(b.title)}" class="book-detail-cover-img" width="280" loading="lazy" />
        </div>
    </div>
    <div class="book-detail-main-col flex flex-col items-start">
        <h1 class="book-detail-title">${escapeHtml(b.title)}</h1>
        ${titleEnBlock}
        <div class="book-detail-rating-row flex items-center gap-3 mb-4">
            ${renderStarsRow(b.rating)}
            <span class="text-sm text-muted-foreground">${b.ratingCount} оценок</span>
        </div>
        <dl class="book-meta-list">
            <div><dt>Авторы</dt><dd>${escapeHtml(b.author)}</dd></div>
            <div><dt>Жанр</dt><dd>${escapeHtml(b.genreLabel)}</dd></div>
            <div><dt>Год</dt><dd>${escapeHtml(String(b.publishYear))}</dd></div>
        </dl>
        <div class="book-detail-actions book-detail-store-row flex flex-wrap gap-3 mb-6">
            ${storePillLinkHtml(buildChitaiGorodUrl(b), 'chitai')}
            ${storePillLinkHtml(buildLitresUrl(b), 'litres')}
        </div>
        <p class="book-lead">${escapeHtml(b.description)}</p>
    </div>
</div>
<section class="book-section" id="book-preview-block">
    <h2 class="book-section-title">Описание</h2>
    <div class="book-preview-text">${previewHtml}</div>
</section>
<section class="book-section">
    <h2 class="book-section-title">Рецензия</h2>
    <blockquote class="book-review-quote">
        <span class="book-quote-mark book-quote-open" aria-hidden="true">“</span>
        <p>${escapeHtml(b.reviewText)}</p>
        <span class="book-quote-mark book-quote-close" aria-hidden="true">”</span>
    </blockquote>
    <div class="book-reviewer flex items-center gap-3">
        <img class="book-reviewer-avatar" src="${escapeHtml(reviewerAvatar)}" alt="${escapeHtml(b.reviewAuthor)}" width="48" height="48" loading="lazy" decoding="async" />
        <div>
            <div class="book-reviewer-name">${escapeHtml(b.reviewAuthor)}</div>
            <div class="book-reviewer-role text-sm text-muted-foreground">${escapeHtml(b.reviewAuthorRole)}</div>
        </div>
    </div>
</section>
<section class="book-section">
    <h2 class="book-section-title">Оценки</h2>
    <form class="book-ratings-card" id="book-rating-form">
        <label class="visually-hidden" for="book-review-textarea">Ваш отзыв</label>
        <textarea id="book-review-textarea" class="book-ratings-input" name="review" rows="5" placeholder="Напишите, что думаете о книге…"></textarea>
        <div class="book-ratings-footer flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-2 flex-wrap">
                <span class="text-sm text-muted-foreground">Поставьте вашу оценку:</span>
                <div class="book-rate-stars" role="group" aria-label="Оценка">${starsInteractive}</div>
            </div>
            <button type="submit" class="btn btn-rating-send">Отправить</button>
        </div>
    </form>
</section>
${buildHistoryRecBlocksLibrary(book.id)}`;
}

function wireBookDetailPage(mount) {
    const form = mount.querySelector('#book-rating-form');
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Спасибо за отзыв!', 'info');
        form.reset();
        mount.querySelectorAll('.book-rate-star').forEach((s, i) => {
            s.textContent = '☆';
            s.classList.remove('is-active');
        });
    });

    mount.querySelectorAll('.book-rate-star').forEach(btn => {
        btn.addEventListener('click', () => {
            const v = Number(btn.dataset.value);
            mount.querySelectorAll('.book-rate-star').forEach((s, i) => {
                const on = i < v;
                s.textContent = on ? '★' : '☆';
                s.classList.toggle('is-active', on);
            });
        });
    });
}

// Book detail functionality
window.showBook = function(bookId) {
    landingNavParentSection = null;
    closeGlobalSearchPanel();
    const gin = document.getElementById('global-search-input');
    if (gin) gin.value = '';

    const book = window.libraryBooks?.find(x => x.id === bookId);
    if (!book) {
        showNotification('Книга не найдена', 'info');
        return;
    }
    const mount = document.getElementById('book-detail-mount');
    const section = document.getElementById('book-detail');
    if (!mount || !section) return;

    mount.innerHTML = buildBookDetailHtml(book);
    wireBookDetailPage(mount);
    wireHistoryRecommendationBlocks(mount);

    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    section.classList.add('active');
    updateNavigation('library');
    window.scrollTo(0, 0);
};

function enrichMovieForDetail(m) {
    const previewParagraphs = m.previewParagraphs || [
        m.description,
        `Материал «Кинотеатра» дополняет подборку «${m.category}»: ${m.formatLabel === 'Сериал' ? 'формат сериала позволяет раскрыть хронику событий и интервью подробнее, чем в одном фильме.' : 'кино собирает историю в связном повествовании с упором на драматургию спортивного конфликта.'}`
    ];
    const reviewText = m.reviewText ||
        `${m.description} Рекомендуем обратить внимание на работу режиссера и монтаж архивных материалов — они задают ритм повествования.`;
    const reviewAuthor = m.reviewAuthor || 'Иван Иванов';
    const reviewAuthorRole = m.reviewAuthorRole || 'Автор Спортса';
    const ratingCount = m.ratingCount != null ? m.ratingCount : Math.max(80, Math.round((Number(m.kinopoiskRating) || Number(m.rating) || 8) * 900));
    const breadcrumbTail = m.breadcrumbTail || `${m.formatLabel || 'Фильм'} · ${m.category}`;
    const kinopoiskRating = m.kinopoiskRating != null ? Number(m.kinopoiskRating) : Number(m.rating);
    const imdbRating = m.imdbRating != null ? Number(m.imdbRating) : null;
    return {
        ...m,
        previewParagraphs,
        reviewText,
        reviewAuthor,
        reviewAuthorRole,
        ratingCount,
        breadcrumbTail,
        kinopoiskRating,
        imdbRating,
        formatLabel: m.formatLabel || (String(m.duration || '').includes('эпизод') ? 'Сериал' : 'Фильм'),
        country: m.country || '—',
        ageRating: m.ageRating || '—',
        writers: m.writers || '—',
        cast: m.cast || '—'
    };
}

function buildMovieTags(m) {
    const set = new Set(['кино']);
    const fmt = (m.formatLabel || '').toLowerCase();
    if (fmt) set.add(fmt);
    if (m.genre) set.add(String(m.genre).toLowerCase());
    if (m.category) set.add(String(m.category).toLowerCase());
    (m.tags || []).forEach(t => set.add(String(t).toLowerCase()));
    return Array.from(set);
}

function renderStarsFromTen(rating10) {
    const r = Math.min(10, Math.max(0, Number(rating10) || 0));
    const full = Math.round((r / 10) * 5);
    const empty = 5 - full;
    return `<span class="book-stars text-yellow-500" aria-hidden="true">${'★'.repeat(full)}${'☆'.repeat(empty)}</span>`;
}

/** Допускает стандартный 11-символьный id YouTube, в том числе с ведущим дефисом. */
function sanitizeYoutubeTrailerId(id) {
    if (id == null || typeof id !== 'string') return null;
    const t = id.trim();
    if (!/^[-a-zA-Z0-9_]{11}$/.test(t)) return null;
    return t;
}

function sanitizeTrailerEmbedUrl(raw) {
    if (raw == null || typeof raw !== 'string') return null;
    let u;
    try {
        u = new URL(raw.trim());
    } catch {
        return null;
    }
    if (u.protocol !== 'https:') return null;
    const host = u.hostname.toLowerCase();
    const allowedHosts = new Set([
        'www.youtube.com',
        'youtube.com',
        'www.youtube-nocookie.com',
        'youtube-nocookie.com',
        'player.vimeo.com'
    ]);
    if (!allowedHosts.has(host)) return null;
    return u.href;
}

function buildMovieTrailerHtml(m) {
    const customEmbed = sanitizeTrailerEmbedUrl(m.trailerEmbedUrl);
    const ytId = customEmbed ? null : sanitizeYoutubeTrailerId(m.trailerYoutubeId);
    const src = customEmbed || (ytId ? `https://www.youtube-nocookie.com/embed/${ytId}` : null);

    let inner;
    if (src) {
        inner = `<iframe class="movie-trailer-iframe" src="${escapeHtml(src)}" title="Трейлер: ${escapeHtml(m.title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe>`;
    } else {
        inner = `<div class="movie-trailer-placeholder" role="status"><p class="movie-trailer-placeholder-text">Для этого фильма или сериала ролик пока не добавлен — блок зарезервирован под видео.</p></div>`;
    }

    return `
<section class="book-section movie-trailer-section" id="movie-trailer-block" aria-labelledby="movie-trailer-heading">
    <h2 class="book-section-title" id="movie-trailer-heading">Трейлер</h2>
    <div class="movie-trailer-aspect">
        <div class="movie-trailer-inner">${inner}</div>
    </div>
</section>`;
}

function buildMovieDetailHtml(movie) {
    const m = enrichMovieForDetail(movie);
    const tagsHtml = buildMovieTags(m).map(t =>
        `<span class="book-tag-pill"><span class="book-tag-dot" aria-hidden="true"></span>${escapeHtml(t)}</span>`
    ).join('');
    const previewHtml = m.previewParagraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('');
    const reviewerAvatar = reviewerAvatarUrl(m.reviewAuthor);
    const orig = m.originalTitle ? `<p class="book-detail-subtitle">${escapeHtml(m.originalTitle)}</p>` : '';

    const starsInteractive = [1, 2, 3, 4, 5].map(n =>
        `<button type="button" class="book-rate-star movie-rate-star" data-value="${n}" aria-label="${n} из 5">☆</button>`
    ).join('');

    const kpUrl = buildKinopoiskWatchUrl(m);
    const okkoUrl = buildOkkoWatchUrl(m);

    return `
<nav class="book-breadcrumbs" aria-label="Хлебные крошки">
    <a href="#" onclick="showSection('home'); return false;">Главная</a>
    <span class="book-bc-sep">/</span>
    <a href="#" onclick="showSection('cinema'); return false;">Кинотеатр</a>
    <span class="book-bc-sep">/</span>
    <span>${escapeHtml(m.breadcrumbTail)}</span>
</nav>
<div class="book-tags-row flex flex-wrap gap-2">${tagsHtml}</div>
<div class="book-detail-grid movie-detail-top">
    <div class="book-detail-cover-col movie-detail-cover-col">
        <div class="book-detail-cover-frame movie-poster-frame">
            <img src="${escapeHtml(m.image)}" alt="${escapeHtml(m.title)}" class="book-detail-cover-img movie-poster-img" loading="lazy" />
        </div>
    </div>
    <div class="book-detail-main-col movie-detail-main-col flex flex-col items-start">
        <h1 class="book-detail-title">${escapeHtml(m.title)}</h1>
        ${orig}
        <div class="book-detail-rating-row flex items-center gap-3 mb-4" role="group" aria-label="Оценки">
            ${renderStarsRow(m.rating)}
            <span class="text-sm text-muted-foreground">${m.ratingCount.toLocaleString('ru-RU')} оценок</span>
        </div>
        <dl class="book-meta-list">
            <div><dt>Режиссер</dt><dd>${escapeHtml(m.director)}</dd></div>
            <div><dt>Год</dt><dd>${escapeHtml(String(m.year))}</dd></div>
            <div><dt>Длительность</dt><dd>${escapeHtml(String(m.duration))}</dd></div>
            <div><dt>Рейтинг</dt><dd>${escapeHtml(m.ageRating)}</dd></div>
            <div><dt>В ролях</dt><dd>${escapeHtml(m.cast)}</dd></div>
        </dl>
        <div class="movie-detail-stream-actions mb-6" role="group" aria-label="Смотреть на сервисах">
            ${streamPillLinkHtml(kpUrl, 'kp')}
            ${streamPillLinkHtml(okkoUrl, 'okko')}
        </div>
        <p class="book-lead">${escapeHtml(m.description)}</p>
    </div>
</div>
<section class="book-section" id="movie-preview-block">
    <h2 class="book-section-title">Описание</h2>
    <div class="book-preview-text">${previewHtml}</div>
</section>
${buildMovieTrailerHtml(m)}
<section class="book-section">
    <h2 class="book-section-title">Рецензия</h2>
    <blockquote class="book-review-quote">
        <span class="book-quote-mark book-quote-open" aria-hidden="true">“</span>
        <p>${escapeHtml(m.reviewText)}</p>
        <span class="book-quote-mark book-quote-close" aria-hidden="true">”</span>
    </blockquote>
    <div class="book-reviewer flex items-center gap-3">
        <img class="book-reviewer-avatar" src="${escapeHtml(reviewerAvatar)}" alt="${escapeHtml(m.reviewAuthor)}" width="48" height="48" loading="lazy" decoding="async" />
        <div>
            <div class="book-reviewer-name">${escapeHtml(m.reviewAuthor)}</div>
            <div class="book-reviewer-role text-sm text-muted-foreground">${escapeHtml(m.reviewAuthorRole)}</div>
        </div>
    </div>
</section>
<section class="book-section">
    <h2 class="book-section-title">Оценки</h2>
    <form class="book-ratings-card" id="movie-rating-form">
        <label class="visually-hidden" for="movie-review-textarea">Ваш отзыв о фильме</label>
        <textarea id="movie-review-textarea" class="book-ratings-input" name="review" rows="5" placeholder="Поделитесь впечатлениями о фильме или сериале…"></textarea>
        <div class="book-ratings-footer flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center gap-2 flex-wrap">
                <span class="text-sm text-muted-foreground">Поставьте вашу оценку:</span>
                <div class="book-rate-stars movie-rate-stars" role="group" aria-label="Оценка">${starsInteractive}</div>
            </div>
            <button type="submit" class="btn btn-rating-send">Отправить</button>
        </div>
    </form>
</section>
${buildHistoryRecBlocksCinema(movie.id)}`;
}

function wireMovieDetailPage(mount) {
    const form = mount.querySelector('#movie-rating-form');
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        showNotification('Спасибо за отзыв!', 'info');
        form.reset();
        mount.querySelectorAll('.movie-rate-star').forEach(s => {
            s.textContent = '☆';
            s.classList.remove('is-active');
        });
    });

    mount.querySelectorAll('.movie-rate-star').forEach(btn => {
        btn.addEventListener('click', () => {
            const v = Number(btn.dataset.value);
            mount.querySelectorAll('.movie-rate-star').forEach((s, i) => {
                const on = i < v;
                s.textContent = on ? '★' : '☆';
                s.classList.toggle('is-active', on);
            });
        });
    });
}

window.showMovie = function(movieId) {
    landingNavParentSection = null;
    closeGlobalSearchPanel();
    const gin = document.getElementById('global-search-input');
    if (gin) gin.value = '';

    const movie = window.cinemaMovies?.find(x => x.id === movieId);
    if (!movie) {
        showNotification('Фильм не найден', 'info');
        return;
    }
    const mount = document.getElementById('movie-detail-mount');
    const section = document.getElementById('movie-detail');
    if (!mount || !section) return;

    mount.innerHTML = buildMovieDetailHtml(movie);
    wireMovieDetailPage(mount);
    wireHistoryRecommendationBlocks(mount);

    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    section.classList.add('active');
    updateNavigation('cinema');
    window.scrollTo(0, 0);
};

function collectGlobalSearchHits(query) {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];

    const hits = [];

    function match(hay) {
        return hay.toLowerCase().includes(q);
    }

    (window.wikipediaArticles || []).forEach(a => {
        const hay = `${a.title} ${a.description || ''} ${a.category || ''}`;
        if (match(hay)) {
            hits.push({
                type: 'Статья',
                title: a.title,
                subtitle: a.category,
                fn() {
                    showArticle(a.id);
                }
            });
        }
    });

    (window.libraryBooks || []).forEach(b => {
        const hay = `${b.title} ${b.titleEn || ''} ${b.author || ''} ${b.description || ''} ${b.category || ''} ${(b.tags || []).join(' ')}`;
        if (match(hay)) {
            hits.push({
                type: 'Книга',
                title: b.title,
                subtitle: b.author,
                fn() {
                    showBook(b.id);
                }
            });
        }
    });

    (window.cinemaMovies || []).forEach(m => {
        const hay = `${m.title} ${m.originalTitle || ''} ${m.director || ''} ${m.description || ''} ${m.genre || ''} ${m.category || ''} ${(m.tags || []).join(' ')}`;
        if (match(hay)) {
            hits.push({
                type: m.formatLabel === 'Сериал' ? 'Сериал' : 'Фильм',
                title: m.title,
                subtitle: `${m.year || ''} · ${m.director || ''}`.trim(),
                fn() {
                    showMovie(m.id);
                }
            });
        }
    });

    return hits.slice(0, 14);
}

function renderGlobalSearchResults(query) {
    const panel = document.getElementById('global-search-panel');
    const input = document.getElementById('global-search-input');
    if (!panel || !input) return;

    const hits = collectGlobalSearchHits(query);
    if (!hits.length) {
        panel.innerHTML = '<div class="fox-search-empty">Ничего не найдено — попробуйте другой запрос.</div>';
        panel.hidden = false;
        return;
    }

    panel.innerHTML = hits.map((h, i) => `
<button type="button" class="fox-search-hit" data-search-idx="${i}">
<span class="fox-search-hit-type">${escapeHtml(h.type)}</span>
<span>${escapeHtml(h.title)}</span>
${h.subtitle ? `<span class="fox-search-hit-sub">${escapeHtml(h.subtitle)}</span>` : ''}
</button>`).join('');
    panel.hidden = false;

    panel.querySelectorAll('[data-search-idx]').forEach(btn => {
        btn.addEventListener('click', () => {
            const i = Number(btn.getAttribute('data-search-idx'));
            hits[i].fn();
            panel.hidden = true;
            panel.innerHTML = '';
            input.value = '';
            input.blur();
        });
    });
}

function closeGlobalSearchPanel() {
    const panel = document.getElementById('global-search-panel');
    if (panel) {
        panel.hidden = true;
        panel.innerHTML = '';
    }
}

let globalSearchDebounce;

function initializeSearch() {
    const input = document.getElementById('global-search-input');
    const panel = document.getElementById('global-search-panel');
    if (!input || !panel) return;

    input.addEventListener('input', () => {
        clearTimeout(globalSearchDebounce);
        globalSearchDebounce = setTimeout(() => {
            const q = input.value.trim();
            if (q.length < 2) {
                closeGlobalSearchPanel();
                return;
            }
            renderGlobalSearchResults(q);
        }, 180);
    });

    input.addEventListener('focus', () => {
        const q = input.value.trim();
        if (q.length >= 2) renderGlobalSearchResults(q);
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeGlobalSearchPanel();
            input.value = '';
            input.blur();
        }
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.fox-header-search')) closeGlobalSearchPanel();
    });
}

function performSearch(query) {
    renderGlobalSearchResults(query.trim());
}

function filterContent(query) {
    // Get current active section
    const activeSection = document.querySelector('.section.active');
    if (!activeSection) return;
    
    // Find all cards in the active section
    const cards = activeSection.querySelectorAll('.card, .group');
    
    cards.forEach(card => {
        const title = card.querySelector('h3')?.textContent?.toLowerCase() || '';
        const description = card.querySelector('p')?.textContent?.toLowerCase() || '';
        
        if (title.includes(query.toLowerCase()) || description.includes(query.toLowerCase())) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

// Navigation helper functions
function navigateToSection(section) {
    showSection(section);
}

// Фильтры: чипы разделов + выпадающие списки (опции — см. initFilterDropdowns)
document.addEventListener('click', function(e) {
    const wikiPill = e.target.closest('#section-wikipedia .filter-pills .btn.rounded-full');
    if (wikiPill) {
        const label = wikiPill.textContent.trim();
        wikiFilterState.sport = label === 'Все' ? null : label;
        applyWikipediaFilters();
        return;
    }
    const libraryPill = e.target.closest('#section-library .filter-pills .btn.rounded-full');
    if (libraryPill) {
        const label = libraryPill.textContent.trim();
        libraryFilterState.sport = label === 'Все' ? null : label;
        applyLibraryFilters();
        return;
    }
    const cinemaPill = e.target.closest('#section-cinema .filter-pills .btn.rounded-full');
    if (cinemaPill) {
        const label = cinemaPill.textContent.trim();
        cinemaFilterState.sport = label === 'Все' ? null : label;
        applyCinemaFilters();
        return;
    }
    const todayPill = e.target.closest('#section-today .filter-pills .btn.rounded-full');
    if (todayPill) {
        const label = todayPill.textContent.trim();
        todayFilterState.sport = label === 'Все' ? null : label;
        renderTodaySection();
    }
});

// Animation initialization
function initializeAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Observe all animatable elements
    document.querySelectorAll('.card, .group').forEach(el => {
        observer.observe(el);
    });
}

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #157a52;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;
        font-weight: 500;
        font-size: 0.875rem;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === '/' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        const searchInput = document.getElementById('global-search-input');
        if (searchInput) searchInput.focus();
    }

    if (e.key === 'Escape') {
        closeGlobalSearchPanel();
        if (e.target.matches('#global-search-input')) {
            e.target.value = '';
            e.target.blur();
        }
        if (e.target.matches('input') && !e.target.matches('#global-search-input')) {
            e.target.value = '';
            e.target.blur();
            const activeSection = document.querySelector('.section.active');
            if (activeSection) {
                activeSection.querySelectorAll('.card, .group').forEach(card => {
                    card.style.display = '';
                });
                const categoryButtons = activeSection.querySelectorAll('.filter-pills .btn.rounded-full');
                categoryButtons.forEach((btn, i) => {
                    btn.className = i === 0 ? 'btn btn-primary rounded-full px-4 py-2' : 'btn btn-secondary rounded-full px-4 py-2';
                });
                wikiFilterState = { pillar: null, sport: null, taxonomy: null };
                libraryFilterState = { shelf: 'Все', sport: null };
                cinemaFilterState = { row: 'Все', sport: null };
                todayFilterState = { kind: 'Все', sport: null };

                if (activeSection.id === 'section-library') {
                    applyLibraryFilters();
                } else if (activeSection.id === 'section-wikipedia') {
                    applyWikipediaFilters();
                } else if (activeSection.id === 'section-cinema') {
                    applyCinemaFilters();
                } else if (activeSection.id === 'section-today') {
                    renderTodaySection();
                }
            }
        }
    }
    
    // Number keys for quick navigation
    const sectionMap = {
        '1': 'home',
        '2': 'wikipedia', 
        '3': 'library',
        '4': 'cinema',
        '5': 'today'
    };
    
    if (sectionMap[e.key] && !e.target.matches('input, textarea')) {
        e.preventDefault();
        showSection(sectionMap[e.key]);
    }
});

// Dynamic content loading
function loadDynamicContent() {
    loadWikipediaArticles();
    loadLibraryBooks();
    loadCinemaMovies();
}

function loadWikipediaArticles() {
    applyWikipediaFilters();
}

function loadLibraryBooks() {
    applyLibraryFilters();
}

function loadCinemaMovies() {
    applyCinemaFilters();
}

function createArticleCard(article) {
    const card = document.createElement('div');
    card.className = 'group cursor-pointer wiki-grid-card';
    card.dataset.wikiCategory = article.category || '';
    card.dataset.wikiPillar = article.wikiPillar || '';
    card.dataset.wikiSport = article.wikiSport || '';
    card.dataset.wikiTaxonomy = article.wikiTaxonomy || '';
    card.onclick = () => showArticle(article.id);
    
    card.innerHTML = `
        <div class="card wiki-card-inner h-full transition-all duration-300 hover:shadow-hover border border-border flex flex-col">
            <div class="aspect-video overflow-hidden bg-muted shrink-0">
                <img src="${escapeHtml(historyResolveMediaUrl(article.image))}" alt="${escapeHtml(article.title)}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy">
            </div>
            <div class="wiki-card-body">
                <h3 class="wiki-card-title group-hover:text-primary transition-colors line-clamp-4">${escapeHtml(article.title)}</h3>
                <div class="wiki-card-likes-row">
                    <svg class="wiki-card-heart" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                    <span class="wiki-card-likes-num">${escapeHtml(article.likes)}</span>
                </div>
            </div>
        </div>
    `;
    
    return card;
}

function createBookCard(book) {
    const card = document.createElement('div');
    card.className = 'group cursor-pointer library-grid-card';
    card.addEventListener('click', e => {
        if (e.target.closest('a')) return;
        showBook(book.id);
    });

    const chUrl = buildChitaiGorodUrl(book);
    const litUrl = buildLitresUrl(book);
    
    card.innerHTML = `
        <div class="card library-card-inner h-full transition-all duration-300 hover:shadow-hover border border-border flex flex-col">
            <div class="book-cover-wrapper overflow-hidden shrink-0" style="aspect-ratio: 2/3;">
                <img src="${escapeHtml(historyResolveMediaUrl(book.image))}" alt="${escapeHtml(book.title)}" class="w-full h-full transition-transform duration-300 group-hover:scale-105" loading="lazy">
            </div>
            <div class="library-card-body">
                <div class="library-card-stack">
                    <h3 class="library-card-title group-hover:text-primary transition-colors line-clamp-3">${escapeHtml(book.title)}</h3>
                    <div class="library-card-meta" aria-label="Год и объем">
                        <span>
                            <svg class="library-card-meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            ${escapeHtml(String(book.publishYear))}
                        </span>
                        <span class="library-card-meta-dot" aria-hidden="true"></span>
                        <span>
                            <svg class="library-card-meta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                            ${escapeHtml(String(book.pages))} стр.
                        </span>
                    </div>
                </div>
                <div class="book-card-store-actions library-card-store-actions">
                    ${storePillLinkHtml(chUrl, 'chitai')}
                    ${storePillLinkHtml(litUrl, 'litres')}
                </div>
            </div>
        </div>
    `;
    
    return card;
}

function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'group cursor-pointer cinema-grid-card';
    card.addEventListener('click', e => {
        if (e.target.closest('a')) return;
        showMovie(movie.id);
    });

    const kpUrl = buildKinopoiskWatchUrl(movie);
    const okkoUrl = buildOkkoWatchUrl(movie);

    card.innerHTML = `
        <div class="card cinema-card-inner h-full transition-all duration-300 hover:shadow-hover border border-border flex flex-col">
            <div class="book-cover-wrapper overflow-hidden shrink-0" style="aspect-ratio: 2/3;">
                <img src="${escapeHtml(historyResolveMediaUrl(movie.image))}" alt="${escapeHtml(movie.title)}" class="w-full h-full transition-transform duration-300 group-hover:scale-105" loading="lazy">
            </div>
            <div class="cinema-card-body">
                <div class="cinema-card-stack">
                    <h3 class="cinema-card-title group-hover:text-primary transition-colors line-clamp-3">${escapeHtml(movie.title)}</h3>
                    <div class="cinema-card-rating-row" role="img" aria-label="Оценка ${escapeHtml(String(movie.rating))} из 10">
                        <span class="cinema-card-star" aria-hidden="true">★</span>
                        <span class="cinema-card-rating-num">${escapeHtml(String(movie.rating))}</span>
                    </div>
                    <p class="cinema-card-director">${escapeHtml(movie.director)}</p>
                </div>
                <div class="cinema-card-stream-actions">
                    ${streamPillLinkHtml(kpUrl, 'kp')}
                    ${streamPillLinkHtml(okkoUrl, 'okko')}
                </div>
            </div>
        </div>
    `;
    
    return card;
}

function updateNavigation(activeSection) {
    const navButtons = document.querySelectorAll('.fox-primary-nav button[id^="nav-"]');
    navButtons.forEach(btn => {
        btn.className = btn.className.replace('btn-primary', 'btn-ghost');
    });

    const activeButton = document.getElementById(`nav-${activeSection}`);
    if (activeButton) {
        activeButton.className = activeButton.className.replace('btn-ghost', 'btn-primary');
    }
}

function filterCinemaByCategory(label) {
    const legacyToRow = {
        'Все фильмы': 'Все',
        'Все': 'Все',
        Документальные: 'Документальное',
        Драмы: 'Фильмы',
        Биографии: 'Фильмы'
    };
    cinemaFilterState.row = legacyToRow[label] != null ? legacyToRow[label] : 'Все';
    cinemaFilterState.sport = null;
    applyCinemaFilters();
}

function filterLibraryByCategory(category) {
    const legacyToShelf = {
        'Все книги': 'Все',
        Все: 'Все',
        Автобиография: 'Автобиографии',
        Биография: 'Биографии',
        Учебник: 'Учебники',
        История: 'История'
    };
    libraryFilterState.shelf = legacyToShelf[category] != null ? legacyToShelf[category] : category;
    libraryFilterState.sport = null;
    applyLibraryFilters();
}

window.navigateToSection = navigateToSection;
window.showNotification = showNotification;
window.loadDynamicContent = loadDynamicContent;
window.filterLibraryByCategory = filterLibraryByCategory;
window.filterCinemaByCategory = filterCinemaByCategory;

function initTodaySectionDate() {
    const key = window.todayDemoAnchorMonthDay || '5-3';
    const parts = key.split('-').map(Number);
    const y = new Date().getFullYear();
    todaySelectedDate = new Date(y, parts[0] - 1, parts[1]);
}

function formatRuDayMonth(d) {
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    return `${d.getDate()} ${months[d.getMonth()]}`;
}

function monthDayKeyFromDate(d) {
    return `${d.getMonth() + 1}-${d.getDate()}`;
}

function addCalendarDays(base, delta) {
    const x = new Date(base.getFullYear(), base.getMonth(), base.getDate());
    x.setDate(x.getDate() + delta);
    return x;
}

function onTodayDateStripClick(e) {
    const tab = e.target.closest('.today-date-tab[data-today-shift]');
    if (!tab) return;
    const sh = parseInt(tab.dataset.todayShift, 10);
    if (sh === -1 || sh === 1) {
        todaySelectedDate = addCalendarDays(todaySelectedDate, sh);
        renderTodaySection();
    }
}

function initTodaySection() {
    initTodaySectionDate();
    const strip = document.getElementById('today-date-strip');
    if (strip && !strip.dataset.bound) {
        strip.dataset.bound = '1';
        strip.addEventListener('click', onTodayDateStripClick);
    }
}

function renderTodayDateStrip() {
    const el = document.getElementById('today-date-strip');
    if (!el) return;

    const prev = addCalendarDays(todaySelectedDate, -1);
    const cur = todaySelectedDate;
    const next = addCalendarDays(todaySelectedDate, 1);
    const lp = formatRuDayMonth(prev);
    const lc = formatRuDayMonth(cur);
    const ln = formatRuDayMonth(next);

    el.innerHTML = `
<div class="today-date-strip-track">
    <button type="button" class="today-date-tab" data-today-shift="-1" aria-label="Предыдущий день: ${escapeHtml(lp)}">
        <span class="today-date-chevron" aria-hidden="true">‹</span>
        <span>${escapeHtml(lp)}</span>
    </button>
    <button type="button" class="today-date-tab is-active" data-today-shift="0" aria-current="date" aria-label="Выбрано: ${escapeHtml(lc)}">
        ${escapeHtml(lc)}
    </button>
    <button type="button" class="today-date-tab" data-today-shift="1" aria-label="Следующий день: ${escapeHtml(ln)}">
        <span>${escapeHtml(ln)}</span>
        <span class="today-date-chevron" aria-hidden="true">›</span>
    </button>
</div>`;
}

function renderTodayEventsList() {
    const mount = document.getElementById('today-events-list');
    if (!mount) return;

    const key = monthDayKeyFromDate(todaySelectedDate);
    let items = (window.todayEventsByMonthDay && window.todayEventsByMonthDay[key]) ? window.todayEventsByMonthDay[key].slice() : [];

    const sportF = todayFilterState.sport;
    if (sportF) {
        items = items.filter(ev => sportMatchesFilter(ev.todaySport || 'Другие', sportF));
    }

    if (!items.length) {
        mount.innerHTML = '<p class="today-events-empty">На выбранную дату в демо-наборе пока нет событий — попробуйте соседние дни или фильтр «Все».</p>';
        return;
    }

    mount.innerHTML = items.map(ev => `
<article class="today-event-card">
    <div class="today-event-shell">
        <div class="today-event-thumb-col">
            <img src="${escapeHtml(ev.image)}" alt="${escapeHtml(`${ev.leagueLabel}, ${ev.year}`)}" class="today-event-img" width="320" loading="lazy" />
        </div>
        <div class="today-event-body-col">
            <h3 class="today-event-title">${escapeHtml(ev.title || '')}</h3>
            <div class="today-event-desc">${ev.descriptionHtml}</div>
        </div>
        <span class="today-event-year">${escapeHtml(String(ev.year))}</span>
    </div>
</article>`).join('');
}

function syncTodayFilterPills() {
    const section = document.getElementById('section-today');
    const sport = todayFilterState.sport || 'Все';
    if (section) {
        section.querySelectorAll('.filter-pills .btn.rounded-full').forEach(btn => {
            const active = btn.textContent.trim() === sport;
            btn.className = active ? 'btn btn-primary rounded-full px-4 py-2' : 'btn btn-secondary rounded-full px-4 py-2';
        });
    }
}

function renderTodaySection() {
    syncTodayFilterPills();
    renderTodayDateStrip();
    renderTodayEventsList();
    renderTodayRecommendationsMount();
}

function filterTodayEvents(label) {
    const legacy = {
        'Все события': 'Все',
        NBA: 'Матчи',
        Скачки: 'Матчи'
    };
    const kind = legacy[label] != null ? legacy[label] : label;
    todayFilterState.kind = kind;
    if (label === 'NBA') todayFilterState.sport = 'Баскетбол';
    else if (label === 'Скачки') todayFilterState.sport = 'Другие';
    else if (label === 'Все события') todayFilterState.sport = null;

    renderTodaySection();
}

window.filterTodayEvents = filterTodayEvents;