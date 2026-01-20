# 🏗️ Архитектура парсера новостей

## Общая схема

```
┌─────────────────────────────────────────────────────────────┐
│                     BETTING NEWS PARSER                      │
└─────────────────────────────────────────────────────────────┘
                             │
                             ▼
        ┌────────────────────────────────────┐
        │         Scheduler (APScheduler)     │
        │  - Parse every 5 min               │
        │  - Discover sources every 30 min    │
        │  - Send notifications every 10 min  │
        └────────────────────────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        ▼                    ▼                    ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   PARSER     │    │   SOURCE     │    │  TELEGRAM    │
│   MODULE     │    │  DISCOVERY   │    │     BOT      │
│              │    │              │    │              │
│ • AsyncIO    │    │ • Google     │    │ • Send news  │
│ • BeautifulSo│    │ • Yandex     │    │ • Summaries  │
│ • RSS Feeds  │    │ • Auto add   │    │ • Alerts     │
└──────┬───────┘    └──────┬───────┘    └──────┬───────┘
       │                   │                    │
       └───────────────────┼────────────────────┘
                          ▼
               ┌────────────────────┐
               │   ML CLASSIFIER    │
               │                    │
               │ • NLP Analysis     │
               │ • Entity Extract   │
               │ • Categorization   │
               │ • Urgency Score    │
               └─────────┬──────────┘
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  POSTGRESQL  │  │    REDIS     │  │   DASHBOARD  │
│              │  │              │  │              │
│ • News DB    │  │ • Dedup      │  │ • Flask API  │
│ • Sources    │  │ • Cache      │  │ • Plotly     │
│ • Keywords   │  │ • Queue      │  │ • Real-time  │
└──────────────┘  └──────────────┘  └──────────────┘
```

## Компоненты системы

### 1. Parser Module (`parser.py`)

**Назначение:** Основной парсер новостей из различных источников

**Технологии:**
- `asyncio` - асинхронная обработка
- `aiohttp` - HTTP клиент
- `BeautifulSoup4` - парсинг HTML
- `feedparser` - парсинг RSS

**Функции:**
- `parse_all_sources()` - парсинг всех активных источников
- `parse_rss_feed()` - парсинг RSS фидов
- `parse_website()` - парсинг веб-сайтов
- `check_relevance()` - проверка релевантности
- `is_duplicate()` - проверка дубликатов через Redis

**Алгоритм:**
1. Получить список активных источников из БД
2. Запустить параллельный парсинг (до 100 одновременно)
3. Извлечь заголовки, ссылки, описания
4. Проверить релевантность по ключевым словам
5. Проверить дубликаты через Redis
6. Определить категорию и срочность
7. Сохранить в PostgreSQL

### 2. Source Discovery (`source_discovery.py`)

**Назначение:** Динамический поиск новых источников новостей

**Технологии:**
- `aiohttp` - HTTP запросы
- `BeautifulSoup4` - парсинг результатов поиска
- `fake_useragent` - ротация User-Agent

**Функции:**
- `discover_sources()` - главная функция поиска
- `search_google()` - поиск через Google
- `search_yandex()` - поиск через Yandex
- `is_relevant_domain()` - фильтрация доменов
- `calculate_reliability_score()` - оценка надежности

**Алгоритм:**
1. Выполнить 20+ поисковых запросов
2. Собрать ТОП-30 результатов для каждого
3. Извлечь URL из результатов
4. Фильтровать по релевантности домена
5. Рассчитать рейтинг надежности
6. Добавить в БД источников

### 3. ML Classifier (`ml_classifier.py`)

**Назначение:** Машинное обучение для классификации и анализа новостей

**Технологии:**
- `spaCy` - NLP для русского языка
- `scikit-learn` - ML алгоритмы
- `TF-IDF` - векторизация текста
- `Naive Bayes` - классификация

**Функции:**
- `analyze_news()` - комплексный анализ
- `extract_entities()` - извлечение сущностей (NER)
- `analyze_sentiment()` - анализ тональности
- `calculate_enhanced_urgency()` - расчет срочности
- `predict_category()` - предсказание категории

**Возможности:**
- Извлечение организаций, персон, локаций
- Определение денежных сумм и дат
- Анализ позитивной/негативной тональности
- Автоматическая категоризация
- Расчет срочности с учетом контекста

### 4. Database (`database.py`)

**Назначение:** Управление данными в PostgreSQL

**Схема БД:**

```sql
sources (
    id SERIAL PRIMARY KEY,
    url TEXT UNIQUE,
    domain VARCHAR(255),
    reliability_score FLOAT,
    is_active BOOLEAN,
    source_type VARCHAR(50),
    last_checked TIMESTAMP
)

news (
    id SERIAL PRIMARY KEY,
    title TEXT,
    url TEXT UNIQUE,
    content TEXT,
    snippet TEXT,
    published_date TIMESTAMP,
    source_id INTEGER,
    category VARCHAR(100),
    urgency_score FLOAT,
    content_hash VARCHAR(64) UNIQUE,
    keywords TEXT[],
    is_sent BOOLEAN
)

keywords (
    id SERIAL PRIMARY KEY,
    word VARCHAR(255) UNIQUE,
    category VARCHAR(100),
    weight FLOAT
)
```

**Индексы:**
- `idx_news_published` - по дате публикации
- `idx_news_category` - по категории
- `idx_news_urgency` - по срочности
- `idx_sources_domain` - по домену

### 5. Telegram Bot (`telegram_bot.py`)

**Назначение:** Уведомления о новых новостях

**Технологии:**
- `python-telegram-bot` - Telegram Bot API

**Функции:**
- `send_news()` - отправка одной новости
- `send_batch_news()` - пакетная отправка
- `send_summary()` - ежедневная сводка

**Формат сообщения:**
```
🔥 [Заголовок]
📌 Категория: regulation
⚡ Срочность: 8.5/10
🔗 [Ссылка]
[Краткое описание]
#букмекеры #новости #category
```

### 6. Dashboard (`dashboard.py`)

**Назначение:** Веб-интерфейс для мониторинга

**Технологии:**
- `Flask` - веб-фреймворк
- `Plotly` - интерактивные графики
- `Bootstrap` (через HTML) - UI

**API Endpoints:**
- `GET /` - главная страница
- `GET /api/stats` - статистика
- `GET /api/news` - список новостей
- `GET /api/chart/timeline` - график по времени
- `GET /api/chart/categories` - круговая диаграмма
- `GET /api/chart/sources` - bar chart источников
- `GET /api/keywords` - ключевые слова

### 7. Celery Tasks (`tasks.py`)

**Назначение:** Фоновые задачи и расписание

**Broker:** Redis  
**Backend:** Redis

**Задачи:**
- `parse_news_task` - каждые 5 минут
- `discover_sources_task` - каждые 30 минут
- `send_telegram_notifications_task` - каждые 10 минут
- `send_daily_summary_task` - каждый день в 9:00
- `cleanup_old_data_task` - каждый день в 3:00

## Поток данных

### Сбор новостей

```
Sources DB → Parser → Relevance Check → Dedup (Redis)
                           ↓
                    ML Classifier → Category + Urgency
                           ↓
                    PostgreSQL → Telegram → Users
```

### Поиск источников

```
Search Queries → Google/Yandex → Extract URLs
                                      ↓
                               Filter Domains
                                      ↓
                              Calculate Score
                                      ↓
                              Add to Sources DB
```

### Дашборд

```
PostgreSQL → Flask API → JSON
                 ↓
           Plotly Charts → HTML Dashboard
```

## Масштабируемость

### Горизонтальное масштабирование

1. **Parser:**
   - Увеличить `MAX_CONCURRENT_REQUESTS`
   - Запустить несколько инстансов с балансировкой
   - Разделить источники по группам

2. **Database:**
   - PostgreSQL репликация (master-slave)
   - Партиционирование таблицы `news` по датам
   - Индексы для быстрых запросов

3. **Redis:**
   - Redis Cluster для большого объема
   - Отдельные инстансы для кеша и очереди

4. **Celery:**
   - Добавить больше worker'ов
   - Разделить задачи по приоритетам
   - Использовать разные очереди

### Вертикальное масштабирование

- CPU: больше ядер для параллельной обработки
- RAM: больше памяти для кеша и Redis
- Storage: SSD для быстрой работы БД

## Производительность

### Текущие показатели

- **Парсинг:** 200+ источников за ~3-5 минут
- **Concurrent requests:** до 100 одновременно
- **Дедупликация:** O(1) через Redis
- **ML классификация:** ~100ms на новость
- **API response time:** <200ms

### Оптимизации

1. **Кеширование:**
   - Redis для дубликатов (TTL 7 дней)
   - Кеш статистики дашборда (TTL 5 минут)

2. **Индексы БД:**
   - Индексы на часто запрашиваемые поля
   - Partial indexes для активных источников

3. **Async I/O:**
   - Параллельный парсинг через asyncio
   - Семафор для контроля нагрузки

4. **Connection pooling:**
   - Переиспользование HTTP сессий
   - PostgreSQL connection pool

## Безопасность

### Защита данных

- Пароли в `.env` файле
- `.env` в `.gitignore`
- PostgreSQL: SSL соединения
- Redis: пароль доступа

### Rate limiting

- Задержки между поисковыми запросами
- Ротация User-Agent
- Использование прокси (опционально)

### Валидация

- URL validation перед парсингом
- HTML sanitization
- SQL injection защита через параметризованные запросы

## Мониторинг и логирование

### Логи

- `loguru` для структурированного логирования
- Ротация логов каждый день
- Хранение 30 дней
- Уровни: DEBUG, INFO, WARNING, ERROR

### Метрики

- Количество обработанных новостей
- Количество найденных источников
- Время выполнения задач
- Ошибки парсинга

### Алерты

- Telegram уведомления о критических ошибках
- Email alerts (опционально)
- Dashboard для real-time мониторинга

## Развертывание

### Docker

```yaml
services:
  - postgres (база данных)
  - redis (кеш и очередь)
  - parser (главный парсер)
  - celery_worker (фоновые задачи)
  - celery_beat (планировщик)
  - dashboard (веб-интерфейс)
  - nginx (reverse proxy)
```

### Production рекомендации

1. **VPS требования:**
   - 4 CPU cores
   - 16GB RAM
   - 100GB SSD
   - Linux Ubuntu 22.04 LTS

2. **Backup:**
   - PostgreSQL dump каждый день
   - Хранение бекапов 30 дней
   - Автоматическое восстановление

3. **Обновления:**
   - Регулярные обновления зависимостей
   - Тестирование перед production
   - Blue-green deployment

## Возможные улучшения

### Краткосрочные (1-2 недели)

- [ ] Добавить Selenium для JS-сайтов
- [ ] Интеграция с Scrapy для масштаба
- [ ] Прокси-пул для избежания блокировок
- [ ] Email уведомления
- [ ] Discord webhook
- [ ] Экспорт данных (CSV, JSON)

### Среднесрочные (1-2 месяца)

- [ ] Fine-tune BERT для классификации
- [ ] Автоматическое обучение ML модели
- [ ] GraphQL API
- [ ] Real-time WebSocket обновления
- [ ] Мобильное приложение
- [ ] PWA дашборд

### Долгосрочные (3-6 месяцев)

- [ ] Distributed crawler на Scrapy Cloud
- [ ] Kubernetes deployment
- [ ] Multi-region setup
- [ ] AI-генерация саммари новостей
- [ ] Прогнозирование трендов
- [ ] Интеграция с CRM системами

## Лицензия и поддержка

Проект MIT License.  
Для вопросов создавайте Issue в репозитории.



























