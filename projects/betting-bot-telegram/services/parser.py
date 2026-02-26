import gspread
from google.oauth2.service_account import Credentials
from datetime import datetime
import config
from database import BonusRepository

class GoogleSheetsParser:
    """Парсер данных из Google Sheets"""
    
    def __init__(self):
        self.credentials = None
        self.client = None
        self.sheet = None
        self._init_client()
    
    def _init_client(self):
        """Инициализация клиента Google Sheets"""
        try:
            scopes = [
                'https://www.googleapis.com/auth/spreadsheets.readonly',
                'https://www.googleapis.com/auth/drive.readonly'
            ]
            
            self.credentials = Credentials.from_service_account_file(
                config.GOOGLE_CREDENTIALS_FILE,
                scopes=scopes
            )
            
            self.client = gspread.authorize(self.credentials)
            self.sheet = self.client.open_by_key(config.GOOGLE_SHEETS_ID)
            print("✅ Google Sheets клиент инициализирован")
        except Exception as e:
            print(f"❌ Ошибка инициализации Google Sheets: {e}")
    
    def parse_bonuses(self, worksheet_name: str = "Бонусы") -> list:
        """
        Парсинг бонусов из таблицы
        
        Ожидаемые колонки:
        - bonus_id
        - title
        - end_date
        - post_url
        - image_url
        - category
        - bookmaker
        - amount
        """
        try:
            worksheet = self.sheet.worksheet(worksheet_name)
            data = worksheet.get_all_records()
            
            bonuses = []
            for row in data:
                if not row.get('bonus_id'):
                    continue
                
                bonus_data = {
                    'bonus_id': str(row.get('bonus_id', '')),
                    'title': row.get('title', ''),
                    'end_date': self._parse_date(row.get('end_date')),
                    'post_url': row.get('post_url', ''),
                    'image_url': row.get('image_url', ''),
                    'category': row.get('category', 'promo'),
                    'bookmaker': row.get('bookmaker', ''),
                    'amount': row.get('amount', ''),
                    'is_active': row.get('is_active', 'TRUE').upper() == 'TRUE'
                }
                
                bonuses.append(bonus_data)
            
            print(f"✅ Загружено {len(bonuses)} бонусов из Google Sheets")
            return bonuses
            
        except Exception as e:
            print(f"❌ Ошибка парсинга Google Sheets: {e}")
            return []
    
    def sync_to_database(self):
        """Синхронизация данных из Google Sheets в базу данных"""
        bonuses = self.parse_bonuses()
        
        synced_count = 0
        for bonus_data in bonuses:
            try:
                BonusRepository.create_or_update(bonus_data)
                synced_count += 1
            except Exception as e:
                print(f"❌ Ошибка синхронизации бонуса {bonus_data['bonus_id']}: {e}")
        
        print(f"✅ Синхронизировано {synced_count} бонусов в базу данных")
        return synced_count
    
    def get_new_offers(self) -> list:
        """Получить новые офферы (добавленные недавно)"""
        bonuses = self.parse_bonuses()
        new_bonuses = []
        
        for bonus_data in bonuses:
            existing = BonusRepository.get_by_id(bonus_data['bonus_id'])
            if not existing:
                new_bonuses.append(bonus_data)
                # Сохраняем в БД
                BonusRepository.create_or_update(bonus_data)
        
        print(f"✅ Найдено {len(new_bonuses)} новых офферов")
        return new_bonuses
    
    @staticmethod
    def _parse_date(date_str: str) -> datetime:
        """Парсинг даты из строки"""
        if not date_str:
            return None
        
        try:
            # Пробуем разные форматы
            formats = [
                "%Y-%m-%d",
                "%d.%m.%Y",
                "%d/%m/%Y",
                "%Y-%m-%d %H:%M:%S"
            ]
            
            for fmt in formats:
                try:
                    return datetime.strptime(date_str, fmt)
                except ValueError:
                    continue
            
            return None
        except Exception:
            return None
