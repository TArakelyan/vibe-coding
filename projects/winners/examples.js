// Примеры новых карточек для добавления в проект Champions

// Пример 1: Чемпион НБА
const exampleNBAChampion = {
    name: "Бостон Селтикс",
    year: 2024,
    date: '17.06.2024',
    time: '21:00',
    sport: 'basketball',
    tournament: 'nba-finals',
    description: "Селтикс завершили сезон триумфально, выиграв свой 18-й чемпионский титул НБА. В финальной серии против Даллас Маверикс команда показала доминирующую игру, выиграв серию со счетом 4-1. Джейсон Тейтум был признан MVP финала.",
    odds: 3.20,
    image: "https://example.com/celtics.png"
};

// Пример 2: Чемпион тенниса
const exampleTennisChampion = {
    name: "Новак Джокович",
    year: 2024,
    date: '14.07.2024',
    time: '16:00',
    sport: 'tennis',
    tournament: 'wimbledon',
    description: "Джокович в очередной раз доказал свое мастерство на травяных кортах Уимблдона, выиграв свой 8-й титул на этом турнире. В финале он обыграл Карлоса Алькараса в пятисетовом матче.",
    odds: 2.10,
    image: "https://example.com/djokovic.png"
};

// Пример 3: Чемпион хоккея
const exampleHockeyChampion = {
    name: "Флорида Пантерз",
    year: 2024,
    date: '24.06.2024',
    time: '02:00',
    sport: 'hockey',
    tournament: 'stanley-cup',
    description: "Пантерз впервые в истории франшизы завоевали Кубок Стэнли, обыграв в финале Эдмонтон Ойлерз. Команда из Флориды показала невероятную командную игру и стойкость в плей-офф.",
    odds: 8.50,
    image: "https://example.com/panthers.png"
};

// Функция для быстрого добавления примеров
function addExampleChampions() {
    console.log('Статистика до добавления:', getChampionsStats());
    
    addChampion(exampleNBAChampion);
    console.log('После добавления НБА:', getChampionsStats());
    
    addChampion(exampleTennisChampion);
    console.log('После добавления тенниса:', getChampionsStats());
    
    addChampion(exampleHockeyChampion);
    console.log('После добавления хоккея:', getChampionsStats());
    
    // Обновляем отображение
    if (typeof filteredChampions !== 'undefined') {
        filteredChampions = [...allChampionsData];
        if (typeof renderChampions === 'function') {
            renderChampions();
        }
    }
    
    console.log('Добавлены примеры чемпионов. Статистика обновлена автоматически!');
}

// Шаблон для новой карточки
const championTemplate = {
    // id: 'auto-generated', // Генерируется автоматически
    name: "Название команды/игрока",
    year: 2024,
    date: 'ДД.ММ.ГГГГ',
    time: 'ЧЧ:ММ', // необязательно
    sport: 'basketball', // basketball, tennis, hockey, football, amfut
    tournament: 'tournament-code', // см. CONFIG.tournaments
    description: "Подробное описание достижения, ключевые моменты, статистика...",
    odds: 0.00, // коэффициент на победу
    image: "https://example.com/image.png" // URL изображения
};

// Инструкция по добавлению новых карточек:
/*
1. Скопируйте championTemplate
2. Заполните все поля актуальными данными
3. Вызовите addChampion(yourChampionData)
4. Обновите статистику вызовом updateHeroStats()

Пример:
const newChampion = { ...championTemplate };
newChampion.name = "Реал Мадрид";
newChampion.year = 2024;
newChampion.date = "01.06.2024";
newChampion.sport = "football";
newChampion.tournament = "champions-league";
newChampion.description = "Реал выиграл 15-й титул Лиги чемпионов...";
newChampion.odds = 4.20;
newChampion.image = "https://example.com/real-madrid.png";

addChampion(newChampion);
updateHeroStats();
*/
