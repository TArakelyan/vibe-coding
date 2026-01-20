"""
Конфигурация парсера новостей букмекерской индустрии
"""
import os
from dotenv import load_dotenv

load_dotenv()

# Database settings
DATABASE_CONFIG = {
    'user': os.getenv('POSTGRES_USER', 'parser_user'),
    'password': os.getenv('POSTGRES_PASSWORD', 'secure_password_123'),
    'host': os.getenv('POSTGRES_HOST', 'localhost'),
    'port': os.getenv('POSTGRES_PORT', '5432'),
    'database': os.getenv('POSTGRES_DB', 'betting_news')
}

# Redis settings
REDIS_CONFIG = {
    'host': os.getenv('REDIS_HOST', 'localhost'),
    'port': int(os.getenv('REDIS_PORT', 6379)),
    'db': int(os.getenv('REDIS_DB', 0))
}

# Telegram settings
TELEGRAM_BOT_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN', '')
TELEGRAM_CHAT_ID = os.getenv('TELEGRAM_CHAT_ID', '')

# Parser settings
PARSE_INTERVAL_MINUTES = int(os.getenv('PARSE_INTERVAL_MINUTES', 5))
SOURCE_DISCOVERY_INTERVAL_MINUTES = int(os.getenv('SOURCE_DISCOVERY_INTERVAL_MINUTES', 30))
MAX_CONCURRENT_REQUESTS = int(os.getenv('MAX_CONCURRENT_REQUESTS', 100))
PROXY_ENABLED = os.getenv('PROXY_ENABLED', 'false').lower() == 'true'

# Поисковые запросы для динамического поиска источников
SEARCH_QUERIES = [
    "букмекеры Россия новости",
    "ФНС лицензии БК",
    "налог GGR букмекеры",
    "суды букмекеры Россия",
    "ЦУПИС новости",
    "СРО букмекеров",
    "блокировка БК",
    "оборот ставок Россия",
    "новые букмекерские конторы",
    "Фонбет 1xСтавка Лига Ставок новости",
    "нелегальные букмекеры",
    "регулирование игорного бизнеса",
    "букмекерский налог 2025",
    "букмекерские конторы лицензия",
    "игорный бизнес Россия",
    "ставки на спорт законодательство",
    "букмекеры реклама запрет",
    "легальные букмекеры России",
    "букмекерский рынок статистика",
    "ЕЦУПИС интеграция",
]

# RSS фиды
RSS_FEEDS = [
    'https://news.google.com/rss/search?q=букмекеры+россия&hl=ru&gl=RU&ceid=RU:ru',
    'https://news.yandex.ru/gaming.rss',
]

# Приоритетные источники (будут автоматически добавлены в БД)
PRIORITY_SOURCES = [
    'https://www.sports.ru/betting/business/',
    'https://www.sports.ru/industry/',
    'https://betonmobile.ru/bookmaker-news',
    'https://vprognoze.ru/news/bookmakers/',
    'https://legalbet.ru/news',
    'https://bookmaker-ratings.ru',
    'https://www.rbc.ru/sport',
    'https://www.kommersant.ru',
    'https://www.cnews.ru',
    'https://gambling.ru',
    'https://fonbet.ru/news',
    'https://1xstavka.ru/news',
    'https://www.ligastavok.ru/news',
    'https://parimatch.ru/news',
    'https://www.betcity.ru/news',
]

# Ключевые слова для фильтрации
KEYWORDS = {
    'company': ['букмекер', 'БК', 'Фонбет', '1xСтавка', 'Лига Ставок', 'Пари', 'Бетсити', 
                'букмекерская контора', 'БеtBoom', 'Winline', 'Мелбет'],
    'regulation': ['ФНС', 'лицензия', 'СРО', 'ЦУПИС', 'Единый ЦУПИС', 'реестр', 
                   'регулирование', 'регулятор', 'ФНС России'],
    'tax': ['GGR', 'налог', 'налогообложение', 'ставка налога', 'налоговая'],
    'law': ['законопроект', 'Госдума', 'правительство', 'закон', 'законодательство', 
            'депутат', 'министерство'],
    'legal': ['суд', 'блокировка', 'штраф', 'арест', 'Роскомнадзор', 'нелегальный', 
              'незаконный', 'судебное разбирательство', 'иск'],
    'product': ['приложение', 'линия ставок', 'cash out', 'промо', 'API', 'платформа', 
                'мобильное приложение'],
    'market': ['оборот', 'выплаты', 'игроки', 'активная база', 'реклама ставок', 
               'рынок ставок', 'выручка', 'доход'],
}

# Слова-исключения (должны быть отфильтрованы если нет слов из KEYWORDS)
EXCLUDE_KEYWORDS = [
    'прогноз на матч',
    'коэффициент',
    'ставка дня',
    'лучшая ставка',
    'экспресс',
]

# User agents для ротации
USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/120.0.0.0',
]

# Настройки для NLP
NLP_MODEL = 'ru_core_news_sm'

# Категории срочности новостей
URGENCY_WEIGHTS = {
    'law': 8.0,
    'legal': 7.0,
    'regulation': 8.5,
    'tax': 8.0,
    'company': 6.0,
    'market': 5.5,
    'product': 4.0,
}

# Telegram форматирование
TELEGRAM_MESSAGE_TEMPLATE = """
🔥 <b>{title}</b>

📌 Категория: {category}
⚡ Срочность: {urgency}/10
🔗 <a href="{url}">Читать полностью</a>

{snippet}

#букмекеры #новости #{category}
"""



























