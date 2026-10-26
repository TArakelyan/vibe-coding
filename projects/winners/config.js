// Конфигурация проекта Champions
const CONFIG = {
    // Настройки отображения
    display: {
        defaultMode: 'odds', // odds или probability
        itemsPerPage: 50,
        animationDuration: 300
    },
    
    // Доступные виды спорта
    sports: {
        football: { 
            name: 'Футбол', 
            icon: '⚽',
            tournaments: ['bundesliga', 'conference_league', 'copa_america', 'epl', 'euro', 'europa_league', 'fa_cup', 'football_wc', 'laliga', 'ligue_1', 'mls', 'olympics', 'rpl', 'russian_cup', 'seria_a', 'ucl', 'uefa_cup']
        },
        tennis: { 
            name: 'Теннис', 
            icon: '🎾',
            tournaments: ['atp_finals', 'australian_open', 'olympics', 'roland_garros', 'us_open', 'wimbledon', 'wta_finals']
        },
        hockey: { 
            name: 'Хоккей', 
            icon: '🏒',
            tournaments: ['gagarin_cup', 'hockey_wc', 'olympics', 'stanley_cup']
        },
        basketball: { 
            name: 'Баскетбол', 
            icon: '🏀',
            tournaments: ['basketball_wc', 'eurobasket', 'euroleague', 'nba', 'nba_cup', 'olympics', 'vtb_league']
        },
        motorsport: { 
            name: 'Автоспорт', 
            icon: '🏎️',
            tournaments: ['formula1']
        },
        esports: { 
            name: 'Киберспорт', 
            icon: '🎮',
            tournaments: ['the_international']
        },
        chess: { 
            name: 'Шахматы', 
            icon: '♟️',
            tournaments: ['chess_wc']
        },
        darts: { 
            name: 'Дартс', 
            icon: '🎯',
            tournaments: ['darts_wc']
        },
        baseball: { 
            name: 'Бейсбол', 
            icon: '⚾',
            tournaments: ['mlb']
        },
        amfut: { 
            name: 'Амфут', 
            icon: '🏈',
            tournaments: ['nfl']
        }
    },
    
    // Турниры
    tournaments: {
        'football_wc': { name: 'ЧМ по футболу', sport: 'football' },
        'euro': { name: 'Евро', sport: 'football' },
        'ucl': { name: 'Лига чемпионов', sport: 'football' },
        'rpl': { name: 'РПЛ', sport: 'football' },
        'epl': { name: 'АПЛ', sport: 'football' },
        'laliga': { name: 'Ла Лига', sport: 'football' },
        'bundesliga': { name: 'Бундеслига', sport: 'football' },
        'seria_a': { name: 'Серия А', sport: 'football' },
        'ligue_1': { name: 'Лига 1', sport: 'football' },
        'formula1': { name: 'Формула-1', sport: 'motorsport' },
        'olympics': { name: 'Олимпиада', sport: 'multi' },
        'stanley_cup': { name: 'Кубок Стэнли', sport: 'hockey' },
        'gagarin_cup': { name: 'Кубок Гагарина', sport: 'hockey' },
        'nba': { name: 'НБА', sport: 'basketball' },
        'euroleague': { name: 'Евролига', sport: 'basketball' },
        'roland_garros': { name: 'Ролан Гаррос', sport: 'tennis' },
        'wimbledon': { name: 'Уимблдон', sport: 'tennis' },
        'australian_open': { name: 'Australian Open', sport: 'tennis' },
        'us_open': { name: 'US Open', sport: 'tennis' },
        'wta_finals': { name: 'Итоговый WTA', sport: 'tennis' },
        'atp_finals': { name: 'Итоговый ATP', sport: 'tennis' },
        'chess_wc': { name: 'ЧМ по шахматам', sport: 'chess' },
        'the_international': { name: 'The International', sport: 'esports' },
        'uefa_cup': { name: 'Кубок УЕФА', sport: 'football' },
        'europa_league': { name: 'Лига Европы', sport: 'football' },
        'conference_league': { name: 'Лига конференций', sport: 'football' },
        'basketball_wc': { name: 'ЧМ по баскетболу', sport: 'basketball' },
        'eurobasket': { name: 'Евробаскет', sport: 'basketball' },
        'vtb_league': { name: 'Единая Лига ВТБ', sport: 'basketball' },
        'copa_america': { name: 'Копа Америка', sport: 'football' },
        'mls': { name: 'МЛС', sport: 'football' },
        'nfl': { name: 'НФЛ', sport: 'amfut' },
        'mlb': { name: 'МЛБ', sport: 'baseball' },
        'nba_cup': { name: 'Кубок НБА', sport: 'basketball' },
        'darts_wc': { name: 'ЧМ по дартсу', sport: 'darts' },
        'fa_cup': { name: 'Кубок Англии', sport: 'football' },
        'russian_cup': { name: 'Кубок России', sport: 'football' },
        'hockey_wc': { name: 'ЧМ по хоккею', sport: 'hockey' },
    },
    
    // Диапазоны для фильтров
    filters: {
        odds: {
            min: 1.0,
            max: 50.0,
            step: 0.1
        },
        years: {
            min: 2000,
            max: 2026
        }
    }
};
