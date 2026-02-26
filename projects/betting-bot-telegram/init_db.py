#!/usr/bin/env python3
"""
Скрипт инициализации базы данных
"""

from database import init_db

if __name__ == "__main__":
    print("🔧 Инициализация базы данных...")
    init_db()
    print("✅ База данных успешно инициализирована!")
    print("\nТаблицы созданы:")
    print("  • bonuses - хранение бонусов")
    print("  • post_history - история публикаций")
    print("  • scheduled_posts - запланированные посты")
