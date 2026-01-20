"""
Тестовый скрипт для проверки работы парсера
"""
import asyncio
from loguru import logger
from parser import parser
from database import db
from ml_classifier import ml_classifier


async def test_parser():
    """Тестирование парсера"""
    logger.info("Testing parser...")
    
    # Тестируем проверку релевантности
    test_cases = [
        ("Фонбет получил новую лицензию от ФНС", True),
        ("Прогноз на матч Спартак - ЦСКА", False),
        ("ФНС утвердила налог на букмекеров", True),
        ("ЦУПИС интегрирован с новыми БК", True),
        ("Лучшие коэффициенты на футбол", False),
    ]
    
    logger.info("\n=== Testing relevance check ===")
    for text, expected in test_cases:
        is_relevant, category, urgency = parser.check_relevance(text)
        status = "✓" if is_relevant == expected else "✗"
        logger.info(f"{status} '{text[:50]}...' - Relevant: {is_relevant}, Category: {category}, Urgency: {urgency}")
    
    # Тестируем ML классификатор
    logger.info("\n=== Testing ML classifier ===")
    test_news = [
        ("ФНС России выдала новые лицензии букмекерам", "Федеральная налоговая служба одобрила заявки на лицензирование..."),
        ("Букмекер 1xСтавка оштрафован за нарушение рекламы", "Роскомнадзор наложил штраф в размере 5 млн рублей..."),
        ("Рынок ставок в России вырос на 25%", "По итогам квартала оборот легальных букмекеров составил..."),
    ]
    
    for title, snippet in test_news:
        analysis = ml_classifier.analyze_news(title, snippet)
        logger.info(f"Title: {title}")
        logger.info(f"  Category: {analysis['category']}")
        logger.info(f"  Urgency: {analysis['urgency_score']}/10")
        logger.info(f"  Sentiment: {analysis['sentiment']:.2f}")
        logger.info(f"  Critical: {analysis['has_critical_info']}")
        logger.info(f"  Entities: {analysis['entities']}\n")
    
    # Тестируем реальный парсинг
    logger.info("\n=== Testing real parsing ===")
    count = await parser.parse_all_sources()
    logger.info(f"Found {count} new articles")
    
    # Показываем последние новости из БД
    logger.info("\n=== Latest news from database ===")
    unsent = db.get_unsent_news(limit=5)
    for news in unsent:
        logger.info(f"• [{news['category']}] {news['title']} (urgency: {news['urgency_score']}/10)")


async def test_source_discovery():
    """Тестирование поиска источников"""
    from source_discovery import source_discovery
    
    logger.info("\n=== Testing source discovery ===")
    logger.warning("This will make real search requests - use with caution!")
    
    # Тестируем на одном запросе
    query = "букмекеры Россия новости"
    logger.info(f"Searching for: {query}")
    
    await source_discovery.create_session()
    try:
        # Google search
        google_results = await source_discovery.search_google(query)
        logger.info(f"Google found {len(google_results)} URLs")
        for url in google_results[:5]:
            logger.info(f"  • {url}")
        
        # Yandex search
        yandex_results = await source_discovery.search_yandex(query)
        logger.info(f"Yandex found {len(yandex_results)} URLs")
        for url in yandex_results[:5]:
            logger.info(f"  • {url}")
    finally:
        await source_discovery.close_session()


def test_database():
    """Тестирование базы данных"""
    logger.info("\n=== Testing database ===")
    
    # Проверяем подключение
    try:
        sources = db.get_active_sources()
        logger.info(f"✓ Database connected: {len(sources)} active sources")
        
        # Показываем топ источников
        top_sources = db.get_top_sources(5)
        logger.info("\nTop 5 sources:")
        for source in top_sources:
            logger.info(f"  • {source['domain']}: {source['news_count']} news (reliability: {source['reliability_score']}/10)")
        
        # Статистика по категориям
        stats = db.get_news_stats()
        logger.info("\nNews by category (last 24h):")
        for stat in stats:
            logger.info(f"  • {stat['category']}: {stat['count']} news (avg urgency: {stat['avg_urgency']:.1f}/10)")
        
    except Exception as e:
        logger.error(f"✗ Database error: {e}")


async def test_telegram():
    """Тестирование Telegram бота"""
    from telegram_bot import telegram_notifier
    
    logger.info("\n=== Testing Telegram bot ===")
    
    if not telegram_notifier.enabled:
        logger.warning("Telegram bot is not configured")
        return
    
    # Отправляем тестовое сообщение
    test_message = """
<b>🧪 Тестовое сообщение парсера</b>

Это тестовое сообщение для проверки интеграции Telegram Bot.

✓ Парсер работает
✓ База данных подключена
✓ Telegram Bot активен
"""
    
    success = await telegram_notifier.send_message(test_message)
    if success:
        logger.info("✓ Test message sent successfully")
    else:
        logger.error("✗ Failed to send test message")


async def main():
    """Главная функция тестирования"""
    logger.info("=" * 80)
    logger.info("BETTING NEWS PARSER - TEST SUITE")
    logger.info("=" * 80)
    
    # Тест БД
    test_database()
    
    # Тест парсера
    await test_parser()
    
    # Тест Telegram (если настроен)
    await test_telegram()
    
    # Тест поиска источников (опционально, закомментирован по умолчанию)
    # await test_source_discovery()
    
    logger.info("\n" + "=" * 80)
    logger.info("Tests completed!")
    logger.info("=" * 80)


if __name__ == '__main__':
    asyncio.run(main())



























