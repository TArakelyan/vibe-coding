from database.models import Bonus, PostHistory, ScheduledPost, get_db
from datetime import datetime, timedelta
from sqlalchemy import and_, or_
import json

class BonusRepository:
    """Репозиторий для работы с бонусами"""
    
    @staticmethod
    def get_by_id(bonus_id: str):
        """Получить бонус по ID"""
        db = get_db()
        return db.query(Bonus).filter(Bonus.bonus_id == bonus_id).first()
    
    @staticmethod
    def get_by_ids(bonus_ids: list):
        """Получить несколько бонусов по ID"""
        db = get_db()
        return db.query(Bonus).filter(Bonus.bonus_id.in_(bonus_ids)).all()
    
    @staticmethod
    def create_or_update(bonus_data: dict):
        """Создать или обновить бонус"""
        db = get_db()
        bonus = db.query(Bonus).filter(Bonus.bonus_id == bonus_data['bonus_id']).first()
        
        if bonus:
            for key, value in bonus_data.items():
                setattr(bonus, key, value)
            bonus.updated_at = datetime.utcnow()
        else:
            bonus = Bonus(**bonus_data)
            db.add(bonus)
        
        db.commit()
        db.refresh(bonus)
        return bonus
    
    @staticmethod
    def get_not_posted_recently(days: int = 14, category: str = None):
        """Получить бонусы, которые не публиковались N дней"""
        db = get_db()
        date_threshold = datetime.utcnow() - timedelta(days=days)
        
        query = db.query(Bonus).filter(
            and_(
                Bonus.is_active == True,
                or_(
                    Bonus.last_posted == None,
                    Bonus.last_posted < date_threshold
                )
            )
        )
        
        if category:
            query = query.filter(Bonus.category == category)
        
        return query.all()
    
    @staticmethod
    def mark_as_posted(bonus_ids: list):
        """Отметить бонусы как опубликованные"""
        db = get_db()
        db.query(Bonus).filter(Bonus.bonus_id.in_(bonus_ids)).update(
            {Bonus.last_posted: datetime.utcnow()},
            synchronize_session=False
        )
        db.commit()

class PostHistoryRepository:
    """Репозиторий для истории публикаций"""
    
    @staticmethod
    def create(bonus_ids: list, post_type: str, message_id: str = None, posted_by: str = "auto"):
        """Создать запись в истории"""
        db = get_db()
        history = PostHistory(
            bonus_ids=json.dumps(bonus_ids),
            post_type=post_type,
            message_id=message_id,
            posted_by=posted_by
        )
        db.add(history)
        db.commit()
        return history
    
    @staticmethod
    def get_today_count():
        """Получить количество постов за сегодня"""
        db = get_db()
        today_start = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
        return db.query(PostHistory).filter(PostHistory.posted_at >= today_start).count()

class ScheduledPostRepository:
    """Репозиторий для запланированных постов"""
    
    @staticmethod
    def create(bonus_ids: list, post_type: str, scheduled_date: datetime, priority: int = 5):
        """Создать запланированный пост"""
        db = get_db()
        scheduled = ScheduledPost(
            bonus_ids=json.dumps(bonus_ids),
            post_type=post_type,
            scheduled_date=scheduled_date,
            priority=priority
        )
        db.add(scheduled)
        db.commit()
        return scheduled
    
    @staticmethod
    def get_pending():
        """Получить все незапубликованные запланированные посты"""
        db = get_db()
        now = datetime.utcnow()
        return db.query(ScheduledPost).filter(
            and_(
                ScheduledPost.is_published == False,
                ScheduledPost.scheduled_date <= now
            )
        ).order_by(ScheduledPost.priority.asc(), ScheduledPost.scheduled_date.asc()).all()
    
    @staticmethod
    def mark_as_published(scheduled_id: int):
        """Отметить пост как опубликованный"""
        db = get_db()
        db.query(ScheduledPost).filter(ScheduledPost.id == scheduled_id).update(
            {ScheduledPost.is_published: True},
            synchronize_session=False
        )
        db.commit()
