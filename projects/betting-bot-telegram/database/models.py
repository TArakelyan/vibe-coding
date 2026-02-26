from sqlalchemy import create_engine, Column, Integer, String, DateTime, Boolean, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
import config

Base = declarative_base()

class Bonus(Base):
    """Модель бонуса букмекерской конторы"""
    __tablename__ = 'bonuses'
    
    id = Column(Integer, primary_key=True)
    bonus_id = Column(String(50), unique=True, nullable=False, index=True)
    title = Column(String(500), nullable=False)
    end_date = Column(DateTime, nullable=True)
    post_url = Column(Text, nullable=False)
    image_url = Column(Text, nullable=True)
    category = Column(String(50), nullable=False)  # eurocups, promo, new, bundle
    bookmaker = Column(String(100), nullable=True)
    amount = Column(String(100), nullable=True)
    last_posted = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    is_active = Column(Boolean, default=True)

class PostHistory(Base):
    """История публикаций"""
    __tablename__ = 'post_history'
    
    id = Column(Integer, primary_key=True)
    bonus_ids = Column(Text, nullable=False)  # JSON array of bonus IDs
    post_type = Column(String(50), nullable=False)  # single, bundle
    message_id = Column(String(100), nullable=True)
    posted_at = Column(DateTime, default=datetime.utcnow)
    posted_by = Column(String(50), nullable=True)  # auto or admin_id

class ScheduledPost(Base):
    """Запланированные публикации"""
    __tablename__ = 'scheduled_posts'
    
    id = Column(Integer, primary_key=True)
    bonus_ids = Column(Text, nullable=False)  # JSON array
    post_type = Column(String(50), nullable=False)
    scheduled_date = Column(DateTime, nullable=False)
    priority = Column(Integer, default=5)
    is_published = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

# Database engine and session
engine = None
SessionLocal = None

def init_db():
    """Инициализация базы данных"""
    global engine, SessionLocal
    
    engine = create_engine(config.DATABASE_URL, echo=True)
    Base.metadata.create_all(engine)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    print("✅ База данных инициализирована")

def get_db():
    """Получение сессии БД"""
    db = SessionLocal()
    try:
        return db
    finally:
        db.close()

if __name__ == "__main__":
    init_db()
