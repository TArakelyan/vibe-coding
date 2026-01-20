"""
Модуль для работы с базой данных PostgreSQL
"""
import psycopg2
from psycopg2.extras import RealDictCursor, execute_values
from contextlib import contextmanager
from loguru import logger
from config import DATABASE_CONFIG
import hashlib


class Database:
    def __init__(self):
        self.config = DATABASE_CONFIG
        self._connection = None
    
    def get_connection(self):
        """Получить подключение к БД"""
        if self._connection is None or self._connection.closed:
            self._connection = psycopg2.connect(**self.config)
        return self._connection
    
    @contextmanager
    def get_cursor(self):
        """Контекстный менеджер для работы с курсором"""
        conn = self.get_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        try:
            yield cursor
            conn.commit()
        except Exception as e:
            conn.rollback()
            logger.error(f"Database error: {e}")
            raise
        finally:
            cursor.close()
    
    def add_source(self, url: str, domain: str, source_type: str = 'website', 
                   reliability_score: float = 5.0) -> int:
        """Добавить новый источник"""
        with self.get_cursor() as cursor:
            cursor.execute("""
                INSERT INTO sources (url, domain, source_type, reliability_score)
                VALUES (%s, %s, %s, %s)
                ON CONFLICT (url) DO UPDATE
                SET last_checked = CURRENT_TIMESTAMP
                RETURNING id
            """, (url, domain, source_type, reliability_score))
            result = cursor.fetchone()
            return result['id'] if result else None
    
    def get_active_sources(self):
        """Получить все активные источники"""
        with self.get_cursor() as cursor:
            cursor.execute("""
                SELECT * FROM sources 
                WHERE is_active = true 
                ORDER BY reliability_score DESC
            """)
            return cursor.fetchall()
    
    def add_news(self, title: str, url: str, content: str, snippet: str,
                 published_date, source_id: int, category: str, 
                 urgency_score: float, keywords: list) -> bool:
        """Добавить новость"""
        # Создаем хеш для дедупликации
        content_hash = hashlib.sha256(f"{title}{url}{snippet[:100]}".encode()).hexdigest()
        
        with self.get_cursor() as cursor:
            try:
                cursor.execute("""
                    INSERT INTO news (
                        title, url, content, snippet, published_date,
                        source_id, category, urgency_score, content_hash, keywords
                    )
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                    ON CONFLICT (content_hash) DO NOTHING
                    RETURNING id
                """, (title, url, content, snippet, published_date, 
                      source_id, category, urgency_score, content_hash, keywords))
                
                result = cursor.fetchone()
                return result is not None
            except Exception as e:
                logger.error(f"Error adding news: {e}")
                return False
    
    def get_unsent_news(self, limit: int = 10):
        """Получить неотправленные новости"""
        with self.get_cursor() as cursor:
            cursor.execute("""
                SELECT n.*, s.domain as source_domain
                FROM news n
                JOIN sources s ON n.source_id = s.id
                WHERE n.is_sent = false
                ORDER BY n.urgency_score DESC, n.published_date DESC
                LIMIT %s
            """, (limit,))
            return cursor.fetchall()
    
    def mark_news_as_sent(self, news_ids: list):
        """Отметить новости как отправленные"""
        with self.get_cursor() as cursor:
            cursor.execute("""
                UPDATE news 
                SET is_sent = true 
                WHERE id = ANY(%s)
            """, (news_ids,))
    
    def get_news_stats(self):
        """Получить статистику новостей"""
        with self.get_cursor() as cursor:
            cursor.execute("""
                SELECT 
                    category,
                    COUNT(*) as count,
                    AVG(urgency_score) as avg_urgency
                FROM news
                WHERE created_at > NOW() - INTERVAL '24 hours'
                GROUP BY category
                ORDER BY count DESC
            """)
            return cursor.fetchall()
    
    def get_top_sources(self, limit: int = 10):
        """Получить топ источников по количеству новостей"""
        with self.get_cursor() as cursor:
            cursor.execute("""
                SELECT 
                    s.domain,
                    s.reliability_score,
                    COUNT(n.id) as news_count
                FROM sources s
                LEFT JOIN news n ON s.id = n.source_id
                WHERE s.is_active = true
                GROUP BY s.id, s.domain, s.reliability_score
                ORDER BY news_count DESC
                LIMIT %s
            """, (limit,))
            return cursor.fetchall()
    
    def add_keywords_batch(self, keywords: list):
        """Добавить ключевые слова пакетом"""
        with self.get_cursor() as cursor:
            execute_values(cursor, """
                INSERT INTO keywords (word, category, weight)
                VALUES %s
                ON CONFLICT (word) DO NOTHING
            """, keywords)
    
    def get_all_keywords(self):
        """Получить все ключевые слова"""
        with self.get_cursor() as cursor:
            cursor.execute("SELECT * FROM keywords")
            return cursor.fetchall()
    
    def update_source_reliability(self, source_id: int, score: float):
        """Обновить рейтинг надежности источника"""
        with self.get_cursor() as cursor:
            cursor.execute("""
                UPDATE sources
                SET reliability_score = %s,
                    last_checked = CURRENT_TIMESTAMP
                WHERE id = %s
            """, (score, source_id))
    
    def cleanup_old_news(self, days: int = 30):
        """Очистить старые новости"""
        with self.get_cursor() as cursor:
            cursor.execute("""
                DELETE FROM news
                WHERE created_at < NOW() - INTERVAL '%s days'
            """, (days,))
            logger.info(f"Cleaned up news older than {days} days")
    
    def close(self):
        """Закрыть соединение"""
        if self._connection and not self._connection.closed:
            self._connection.close()


# Singleton instance
db = Database()



























