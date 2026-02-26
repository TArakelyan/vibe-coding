#!/usr/bin/env python3
"""
Скрипт для заполнения базы данных тестовыми данными
"""

from datetime import datetime, timedelta
from database import init_db, BonusRepository

def create_test_data():
    """Создать тестовые данные"""
    
    print("🔧 Инициализация базы данных...")
    init_db()
    
    print("📝 Создание тестовых бонусов...")
    
    test_bonuses = [
        {
            'bonus_id': 'fonbet_test_001',
            'title': 'Фрибет 1000₽ на первую ставку',
            'end_date': datetime.now() + timedelta(days=30),
            'post_url': 'https://www.sports.ru/betting/bonuses/?utm_source=telegram',
            'image_url': 'https://dumpster.cdn.sports.ru/e/01/b6a5c8d6223d46030fe91d0aa70cc.png',
            'category': 'promo',
            'bookmaker': 'Fonbet',
            'amount': '1000₽',
            'is_active': True
        },
        {
            'bonus_id': 'winline_test_002',
            'title': 'Повышенный коэффициент на Лигу Чемпионов',
            'end_date': datetime.now() + timedelta(days=7),
            'post_url': 'https://www.sports.ru/betting/bonuses/?utm_source=telegram',
            'image_url': 'https://dumpster.cdn.sports.ru/e/01/b6a5c8d6223d46030fe91d0aa70cc.png',
            'category': 'eurocups',
            'bookmaker': 'Winline',
            'amount': 'до 10000₽',
            'is_active': True
        },
        {
            'bonus_id': 'betcity_test_003',
            'title': 'Кешбэк 15% каждую неделю',
            'end_date': datetime.now() + timedelta(days=60),
            'post_url': 'https://www.sports.ru/betting/bonuses/?utm_source=telegram',
            'image_url': 'https://dumpster.cdn.sports.ru/e/01/b6a5c8d6223d46030fe91d0aa70cc.png',
            'category': 'promo',
            'bookmaker': 'Betcity',
            'amount': 'до 5000₽',
            'is_active': True
        },
        {
            'bonus_id': 'olimp_test_004',
            'title': 'Бонус на депозит 200%',
            'end_date': datetime.now() + timedelta(days=45),
            'post_url': 'https://www.sports.ru/betting/bonuses/?utm_source=telegram',
            'image_url': 'https://dumpster.cdn.sports.ru/e/01/b6a5c8d6223d46030fe91d0aa70cc.png',
            'category': 'new',
            'bookmaker': 'OlimpBet',
            'amount': '20000₽',
            'is_active': True
        },
        {
            'bonus_id': 'pari_test_005',
            'title': 'Страховка экспресса до 3000₽',
            'end_date': datetime.now() + timedelta(days=14),
            'post_url': 'https://www.sports.ru/betting/bonuses/?utm_source=telegram',
            'image_url': 'https://dumpster.cdn.sports.ru/e/01/b6a5c8d6223d46030fe91d0aa70cc.png',
            'category': 'eurocups',
            'bookmaker': 'PARI',
            'amount': '3000₽',
            'is_active': True
        }
    ]
    
    created_count = 0
    for bonus_data in test_bonuses:
        try:
            bonus = BonusRepository.create_or_update(bonus_data)
            print(f"✅ Создан: {bonus.title}")
            created_count += 1
        except Exception as e:
            print(f"❌ Ошибка создания {bonus_data['bonus_id']}: {e}")
    
    print(f"\n✅ Создано {created_count} тестовых бонусов")
    print("\n📋 Доступные ID для тестирования:")
    for bonus_data in test_bonuses:
        print(f"   • {bonus_data['bonus_id']}")
    
    print("\n💡 Примеры команд для тестирования:")
    print(f"   /publish_single {test_bonuses[0]['bonus_id']}")
    print(f"   /publish_bundle {test_bonuses[0]['bonus_id']},{test_bonuses[1]['bonus_id']},{test_bonuses[2]['bonus_id']}")

if __name__ == "__main__":
    create_test_data()
