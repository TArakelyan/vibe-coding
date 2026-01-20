"""
Celery задачи для фонового выполнения
"""
from celery import Celery
from celery.schedules import crontab
import asyncio
from loguru import logger
from config import REDIS_CONFIG, PARSE_INTERVAL_MINUTES, SOURCE_DISCOVERY_INTERVAL_MINUTES
from parser import parser
from source_discovery import source_discovery
from telegram_bot import telegram_notifier
from database import db

# Настройка Celery
app = Celery('betting_news_parser')
app.config_from_object({
    'broker_url': f"redis://{REDIS_CONFIG['host']}:{REDIS_CONFIG['port']}/{REDIS_CONFIG['db']}",
    'result_backend': f"redis://{REDIS_CONFIG['host']}:{REDIS_CONFIG['port']}/{REDIS_CONFIG['db']}",
    'task_serializer': 'json',
    'result_serializer': 'json',
    'accept_content': ['json'],
    'timezone': 'Europe/Moscow',
    'enable_utc': True,
})


@app.task(name='parse_news')
def parse_news_task():
    """Задача парсинга новостей"""
    logger.info("Starting news parsing task")
    try:
        loop = asyncio.get_event_loop()
        result = loop.run_until_complete(parser.parse_all_sources())
        logger.info(f"Parsing completed: {result} new articles")
        return result
    except Exception as e:
        logger.error(f"Error in parsing task: {e}")
        raise


@app.task(name='discover_sources')
def discover_sources_task():
    """Задача поиска новых источников"""
    logger.info("Starting source discovery task")
    try:
        loop = asyncio.get_event_loop()
        result = loop.run_until_complete(source_discovery.discover_sources())
        logger.info(f"Source discovery completed: {result} new sources")
        return result
    except Exception as e:
        logger.error(f"Error in source discovery task: {e}")
        raise


@app.task(name='send_telegram_notifications')
def send_telegram_notifications_task():
    """Задача отправки уведомлений в Telegram"""
    logger.info("Starting Telegram notification task")
    try:
        loop = asyncio.get_event_loop()
        loop.run_until_complete(telegram_notifier.send_batch_news(limit=10))
        logger.info("Telegram notifications sent")
    except Exception as e:
        logger.error(f"Error in Telegram notification task: {e}")
        raise


@app.task(name='send_daily_summary')
def send_daily_summary_task():
    """Задача отправки ежедневной сводки"""
    logger.info("Sending daily summary")
    try:
        loop = asyncio.get_event_loop()
        loop.run_until_complete(telegram_notifier.send_summary())
        logger.info("Daily summary sent")
    except Exception as e:
        logger.error(f"Error sending daily summary: {e}")
        raise


@app.task(name='cleanup_old_data')
def cleanup_old_data_task():
    """Задача очистки старых данных"""
    logger.info("Cleaning up old data")
    try:
        db.cleanup_old_news(days=30)
        logger.info("Cleanup completed")
    except Exception as e:
        logger.error(f"Error in cleanup task: {e}")
        raise


# Настройка расписания
app.conf.beat_schedule = {
    'parse-news-every-5-minutes': {
        'task': 'parse_news',
        'schedule': PARSE_INTERVAL_MINUTES * 60.0,  # в секундах
    },
    'discover-sources-every-30-minutes': {
        'task': 'discover_sources',
        'schedule': SOURCE_DISCOVERY_INTERVAL_MINUTES * 60.0,
    },
    'send-notifications-every-10-minutes': {
        'task': 'send_telegram_notifications',
        'schedule': 600.0,  # 10 минут
    },
    'send-daily-summary': {
        'task': 'send_daily_summary',
        'schedule': crontab(hour=9, minute=0),  # Каждый день в 9:00
    },
    'cleanup-old-data': {
        'task': 'cleanup_old_data',
        'schedule': crontab(hour=3, minute=0),  # Каждый день в 3:00
    },
}



























