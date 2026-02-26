# 🚀 Руководство по установке и запуску

## Предварительные требования

- Python 3.11 или выше
- PostgreSQL 14 или выше
- Google Cloud Project с доступом к Google Sheets API
- Telegram Bot Token
- Yandex Disk токен (опционально)

## Шаг 1: Установка зависимостей

```bash
# Создайте виртуальное окружение
python -m venv venv

# Активируйте его
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Установите зависимости
pip install -r requirements.txt
```

## Шаг 2: Настройка PostgreSQL

```sql
-- Создайте базу данных
CREATE DATABASE betting_bot;

-- Создайте пользователя (опционально)
CREATE USER betting_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE betting_bot TO betting_user;
```

## Шаг 3: Настройка Google Sheets API

1. Перейдите в [Google Cloud Console](https://console.cloud.google.com/)
2. Создайте новый проект или выберите существующий
3. Включите Google Sheets API и Google Drive API
4. Создайте Service Account:
   - Перейдите в "IAM & Admin" → "Service Accounts"
   - Нажмите "Create Service Account"
   - Скачайте JSON ключ
5. Переименуйте файл в `credentials.json` и поместите в корень проекта
6. Откройте вашу Google таблицу и предоставьте доступ email из Service Account

## Шаг 4: Создание Telegram бота

1. Найдите [@BotFather](https://t.me/BotFather) в Telegram
2. Отправьте команду `/newbot`
3. Следуйте инструкциям и получите токен
4. Сохраните токен для следующего шага

## Шаг 5: Настройка конфигурации

Скопируйте `.env.example` в `.env` и заполните параметры:

```bash
cp .env.example .env
```

Отредактируйте `.env`:

```env
# Telegram Configuration
BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
CHANNEL_ID=@your_channel
ADMIN_IDS=123456789,987654321

# Database Configuration
DATABASE_URL=postgresql://betting_user:your_password@localhost:5432/betting_bot

# Google Sheets Configuration
GOOGLE_SHEETS_ID=your_sheet_id
GOOGLE_CREDENTIALS_FILE=credentials.json

# Yandex Disk Configuration (опционально)
YANDEX_DISK_TOKEN=your_token

# Posting Schedule Configuration
MAX_POSTS_PER_DAY=4
ROTATION_DAYS=14
TIMEZONE=Europe/Moscow
```

### Как получить CHANNEL_ID:

1. Создайте публичный канал в Telegram
2. Добавьте бота как администратора канала
3. Используйте `@channel_username` в качестве CHANNEL_ID

### Как получить ADMIN_IDS:

1. Найдите [@userinfobot](https://t.me/userinfobot) в Telegram
2. Отправьте любое сообщение
3. Скопируйте ваш ID

## Шаг 6: Инициализация базы данных

```bash
python init_db.py
```

Вы должны увидеть:
```
✅ База данных инициализирована
```

## Шаг 7: Тестирование подключения к Google Sheets

```bash
python test_parser.py
```

Проверьте, что данные успешно загружаются из таблицы.

## Шаг 8: Запуск бота

```bash
python bot.py
```

При успешном запуске вы увидите:
```
✅ База данных инициализирована
✅ Google Sheets клиент инициализирован
✅ Планировщик запущен
🤖 Бот начинает polling...
```

И получите уведомление в Telegram.

## Структура Google таблицы

Ваша таблица должна содержать следующие колонки:

| bonus_id | title | end_date | post_url | image_url | category | bookmaker | amount | is_active |
|----------|-------|----------|----------|-----------|----------|-----------|--------|-----------|
| bonus_1 | Фрибет 1000₽ | 2026-03-15 | https://... | https://... | eurocups | Fonbet | 1000₽ | TRUE |

**Обязательные колонки:**
- `bonus_id` - уникальный идентификатор
- `title` - название бонуса
- `post_url` - ссылка на оффер

**Опциональные колонки:**
- `end_date` - дата окончания (формат: YYYY-MM-DD)
- `image_url` - ссылка на картинку
- `category` - категория (eurocups, promo, new, bundle)
- `bookmaker` - название букмекера
- `amount` - сумма бонуса
- `is_active` - активность (TRUE/FALSE)

## Решение проблем

### Ошибка подключения к PostgreSQL

```bash
# Проверьте, что PostgreSQL запущен
# Windows:
pg_ctl status

# Проверьте строку подключения в .env
```

### Ошибка Google Sheets API

```bash
# Убедитесь, что:
# 1. credentials.json находится в корне проекта
# 2. Service Account имеет доступ к таблице
# 3. Google Sheets API включен в проекте
```

### Бот не отвечает

```bash
# Проверьте токен бота
# Убедитесь, что бот не запущен в другом месте
# Проверьте, что ваш ID в ADMIN_IDS
```

## Остановка бота

Нажмите `Ctrl+C` в терминале. Бот корректно завершит работу и отправит уведомление администраторам.

## Запуск в фоновом режиме (Linux)

```bash
# Используя screen
screen -S betting_bot
python bot.py
# Ctrl+A, затем D для отключения

# Или используя systemd
sudo nano /etc/systemd/system/betting-bot.service
```

Пример systemd сервиса:

```ini
[Unit]
Description=Betting Bot Telegram
After=network.target postgresql.service

[Service]
Type=simple
User=your_user
WorkingDirectory=/path/to/betting-bot-telegram
ExecStart=/path/to/venv/bin/python bot.py
Restart=always

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl enable betting-bot
sudo systemctl start betting-bot
sudo systemctl status betting-bot
```
