-- Таблица источников новостей
CREATE TABLE IF NOT EXISTS sources (
    id SERIAL PRIMARY KEY,
    url TEXT UNIQUE NOT NULL,
    domain VARCHAR(255),
    last_checked TIMESTAMP,
    reliability_score FLOAT DEFAULT 5.0,
    is_active BOOLEAN DEFAULT true,
    source_type VARCHAR(50) DEFAULT 'website',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица новостей
CREATE TABLE IF NOT EXISTS news (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    url TEXT UNIQUE NOT NULL,
    content TEXT,
    snippet TEXT,
    published_date TIMESTAMP,
    source_id INTEGER REFERENCES sources(id),
    category VARCHAR(100),
    urgency_score FLOAT DEFAULT 5.0,
    content_hash VARCHAR(64) UNIQUE,
    is_sent BOOLEAN DEFAULT false,
    keywords TEXT[],
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица ключевых слов
CREATE TABLE IF NOT EXISTS keywords (
    id SERIAL PRIMARY KEY,
    word VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(100),
    weight FLOAT DEFAULT 1.0
);

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_news_published ON news(published_date DESC);
CREATE INDEX IF NOT EXISTS idx_news_category ON news(category);
CREATE INDEX IF NOT EXISTS idx_news_urgency ON news(urgency_score DESC);
CREATE INDEX IF NOT EXISTS idx_sources_domain ON sources(domain);
CREATE INDEX IF NOT EXISTS idx_news_is_sent ON news(is_sent);

-- Вставка приоритетных источников
INSERT INTO sources (url, domain, source_type, reliability_score) VALUES
('https://www.sports.ru/betting/business/', 'sports.ru', 'website', 9.0),
('https://www.sports.ru/industry/', 'sports.ru', 'website', 9.0),
('https://betonmobile.ru/bookmaker-news', 'betonmobile.ru', 'website', 8.0),
('https://vprognoze.ru/news/bookmakers/', 'vprognoze.ru', 'website', 8.0),
('https://legalbet.ru/news', 'legalbet.ru', 'website', 9.0),
('https://bookmaker-ratings.ru', 'bookmaker-ratings.ru', 'website', 7.5),
('https://www.rbc.ru/sport', 'rbc.ru', 'website', 9.5),
('https://www.kommersant.ru', 'kommersant.ru', 'website', 9.5),
('https://www.cnews.ru', 'cnews.ru', 'website', 8.5),
('https://gambling.ru', 'gambling.ru', 'website', 8.0),
('https://fonbet.ru/news', 'fonbet.ru', 'bookmaker', 8.0),
('https://1xstavka.ru/news', '1xstavka.ru', 'bookmaker', 8.0),
('https://www.ligastavok.ru/news', 'ligastavok.ru', 'bookmaker', 8.0),
('https://parimatch.ru/news', 'parimatch.ru', 'bookmaker', 8.0)
ON CONFLICT (url) DO NOTHING;

-- Вставка ключевых слов
INSERT INTO keywords (word, category, weight) VALUES
('букмекер', 'company', 2.0),
('БК', 'company', 2.0),
('Фонбет', 'company', 1.5),
('1xСтавка', 'company', 1.5),
('Лига Ставок', 'company', 1.5),
('Пари', 'company', 1.5),
('Бетсити', 'company', 1.5),
('ФНС', 'regulation', 2.5),
('лицензия', 'regulation', 2.0),
('СРО', 'regulation', 2.0),
('ЦУПИС', 'regulation', 2.5),
('Единый ЦУПИС', 'regulation', 2.5),
('реестр', 'regulation', 1.5),
('GGR', 'tax', 2.5),
('налог', 'tax', 2.0),
('законопроект', 'law', 2.0),
('Госдума', 'law', 1.8),
('правительство', 'law', 1.5),
('суд', 'legal', 2.0),
('блокировка', 'legal', 2.0),
('штраф', 'legal', 2.0),
('Роскомнадзор', 'legal', 1.8),
('нелегальный', 'legal', 2.0),
('оборот', 'market', 1.5),
('выплаты', 'market', 1.5),
('игроки', 'market', 1.0),
('реклама ставок', 'market', 1.5)
ON CONFLICT (word) DO NOTHING;



























