#!/usr/bin/env python3
"""
Утилита для тестирования парсера Google Sheets
"""

from services import GoogleSheetsParser

def main():
    print("🔍 Тестирование парсера Google Sheets...\n")
    
    try:
        parser = GoogleSheetsParser()
        
        print("1️⃣ Парсинг бонусов из таблицы...")
        bonuses = parser.parse_bonuses()
        
        print(f"✅ Загружено {len(bonuses)} бонусов\n")
        
        if bonuses:
            print("📋 Примеры бонусов:")
            for i, bonus in enumerate(bonuses[:3], 1):
                print(f"\n{i}. {bonus['title']}")
                print(f"   ID: {bonus['bonus_id']}")
                print(f"   Категория: {bonus['category']}")
                print(f"   Букмекер: {bonus.get('bookmaker', 'N/A')}")
        
        print("\n2️⃣ Синхронизация с базой данных...")
        synced = parser.sync_to_database()
        print(f"✅ Синхронизировано {synced} записей")
        
    except Exception as e:
        print(f"❌ Ошибка: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()
