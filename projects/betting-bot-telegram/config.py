import os
from dotenv import load_dotenv

load_dotenv()

# Telegram Configuration
BOT_TOKEN = os.getenv("BOT_TOKEN")
CHANNEL_ID = os.getenv("CHANNEL_ID")
ADMIN_IDS = [int(id.strip()) for id in os.getenv("ADMIN_IDS", "").split(",") if id.strip()]

# Database Configuration
DATABASE_URL = os.getenv("DATABASE_URL")

# Google Sheets Configuration
GOOGLE_SHEETS_ID = os.getenv("GOOGLE_SHEETS_ID")
GOOGLE_CREDENTIALS_FILE = os.getenv("GOOGLE_CREDENTIALS_FILE", "credentials.json")

# Yandex Disk Configuration
YANDEX_DISK_TOKEN = os.getenv("YANDEX_DISK_TOKEN")

# Sports.ru Configuration
SPORTS_RU_BASE_URL = os.getenv("SPORTS_RU_BASE_URL", "https://www.sports.ru/betting/bonuses/")

# Schedule Configuration
MAX_POSTS_PER_DAY = int(os.getenv("MAX_POSTS_PER_DAY", 4))
ROTATION_DAYS = int(os.getenv("ROTATION_DAYS", 14))
TIMEZONE = os.getenv("TIMEZONE", "Europe/Moscow")

# Post Types and Priorities
POST_TYPES = {
    "new_offer": {"priority": 1, "name": "Новый оффер"},
    "daily_bonus": {"priority": 2, "name": "Бонус дня"},
    "exclusive": {"priority": 3, "name": "Эксклюзив Спортса"},
    "bundle": {"priority": 4, "name": "Подборка офферов"}
}

# Post Schedule (day of week: 0=Monday, 6=Sunday)
POST_SCHEDULE = {
    "daily_bonus": {
        "days": [5, 6],  # Saturday, Sunday
        "times": ["14:00", "18:00", "21:00"]
    },
    "bundle": {
        "days": [2],  # Wednesday
        "times": ["12:00"]
    }
}

# Intro texts for posts (random selection)
INTRO_TEXTS = [
    "🔥 Горячее предложение от букмекера!",
    "💰 Отличный бонус для ставок!",
    "⚡️ Успей воспользоваться выгодным предложением!",
    "🎁 Специальное предложение для игроков!",
    "🚀 Новая акция от букмекера!",
    "💎 Эксклюзивный бонус от Спортс.ru!",
]

# Emoji pack for posts
EMOJI_PACK = [
    "⚽️", "🏀", "🏈", "⚾️", "🎾", "🏐", "🏉", "🎱",
    "🏒", "🏓", "🏸", "🥊", "🤼", "🥋", "🎿", "⛷"
]

# Links
ALL_BONUSES_LINK = "https://www.sports.ru/betting/bonuses/?utm_source=telegram"
