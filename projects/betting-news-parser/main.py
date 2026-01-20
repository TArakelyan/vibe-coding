"""
Главный файл запуска парсера новостей
"""
import asyncio
from loguru import logger
import sys
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from datetime import datetime

from config import PARSE_INTERVAL_MINUTES, SOURCE_DISCOVERY_INTERVAL_MINUTES
from parser import parser
from source_discovery import source_discovery
from telegram_bot import telegram_notifier
from database import db

# Настройка логирования
logger.remove()
logger.add(
    sys.stdout,
    format="<green>{time:YYYY-MM-DD HH:mm:ss}</green> | <level>{level: <8}</level> | <cyan>{name}</cyan>:<cyan>{function}</cyan> - <level>{message}</level>",
    level="INFO"
)
logger.add(
    "logs/parser_{time:YYYY-MM-DD}.log",
    rotation="1 day",
    retention="30 days",
    format="{time:YYYY-MM-DD HH:mm:ss} | {level: <8} | {name}:{function} - {message}",
    level="DEBUG"
)


async def parse_news_job():
    """Задача парсинга новостей"""
    logger.info("=" * 60)
    logger.info(f"Starting news parsing job at {datetime.now()}")
    logger.info("=" * 60)
    
    try:
        count = await parser.parse_all_sources()
        logger.info(f"✓ Parsing completed: {count} new news items")
        
        # Отправляем уведомления в Telegram
        logger.info("Sending Telegram notifications...")
        await telegram_notifier.send_batch_news(limit=10)
        logger.info("✓ Notifications sent")
        
    except Exception as e:
        logger.error(f"✗ Error in parsing job: {e}")
        raise


async def discover_sources_job():
    """Задача поиска новых источников"""
    logger.info("=" * 60)
    logger.info(f"Starting source discovery job at {datetime.now()}")
    logger.info("=" * 60)
    
    try:
        count = await source_discovery.discover_sources()
        logger.info(f"✓ Source discovery completed: {count} new sources")
    except Exception as e:
        logger.error(f"✗ Error in source discovery job: {e}")
        raise


async def send_daily_summary_job():
    """Задача отправки ежедневной сводки"""
    logger.info("Sending daily summary...")
    try:
        await telegram_notifier.send_summary()
        logger.info("✓ Daily summary sent")
    except Exception as e:
        logger.error(f"✗ Error sending daily summary: {e}")


def cleanup_old_data_job():
    """Задача очистки старых данных"""
    logger.info("Cleaning up old data...")
    try:
        db.cleanup_old_news(days=30)
        logger.info("✓ Cleanup completed")
    except Exception as e:
        logger.error(f"✗ Error in cleanup job: {e}")


async def main():
    """Главная функция"""
    logger.info("🚀 Starting Betting News Parser")
    logger.info(f"Parse interval: {PARSE_INTERVAL_MINUTES} minutes")
    logger.info(f"Source discovery interval: {SOURCE_DISCOVERY_INTERVAL_MINUTES} minutes")
    
    # Проверка подключения к БД
    try:
        sources = db.get_active_sources()
        logger.info(f"✓ Database connected: {len(sources)} active sources")
    except Exception as e:
        logger.error(f"✗ Database connection error: {e}")
        return
    
    # Создаем планировщик
    scheduler = AsyncIOScheduler()
    
    # Добавляем задачи
    scheduler.add_job(
        parse_news_job,
        'interval',
        minutes=PARSE_INTERVAL_MINUTES,
        id='parse_news',
        max_instances=1
    )
    
    scheduler.add_job(
        discover_sources_job,
        'interval',
        minutes=SOURCE_DISCOVERY_INTERVAL_MINUTES,
        id='discover_sources',
        max_instances=1
    )
    
    scheduler.add_job(
        send_daily_summary_job,
        'cron',
        hour=9,
        minute=0,
        id='daily_summary'
    )
    
    scheduler.add_job(
        cleanup_old_data_job,
        'cron',
        hour=3,
        minute=0,
        id='cleanup'
    )
    
    # Запускаем планировщик
    scheduler.start()
    logger.info("✓ Scheduler started")
    
    # Запускаем первый парсинг сразу
    logger.info("Running initial parsing...")
    await parse_news_job()
    
    # Держим программу запущенной
    try:
        while True:
            await asyncio.sleep(60)
    except (KeyboardInterrupt, SystemExit):
        logger.info("Shutting down...")
        scheduler.shutdown()
        db.close()


if __name__ == '__main__':
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        logger.info("Parser stopped by user")
    except Exception as e:
        logger.error(f"Fatal error: {e}")
        sys.exit(1)



























