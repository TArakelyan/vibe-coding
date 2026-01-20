"""
Модуль для отправки уведомлений в Telegram
"""
from telegram import Bot
from telegram.error import TelegramError
from loguru import logger
from config import TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, TELEGRAM_MESSAGE_TEMPLATE
from database import db
import asyncio


class TelegramNotifier:
    def __init__(self):
        if TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID:
            self.bot = Bot(token=TELEGRAM_BOT_TOKEN)
            self.chat_id = TELEGRAM_CHAT_ID
            self.enabled = True
        else:
            self.bot = None
            self.enabled = False
            logger.warning("Telegram bot not configured")
    
    async def send_message(self, text: str):
        """Отправить сообщение в Telegram"""
        if not self.enabled:
            return False
        
        try:
            await self.bot.send_message(
                chat_id=self.chat_id,
                text=text,
                parse_mode='HTML',
                disable_web_page_preview=False
            )
            return True
        except TelegramError as e:
            logger.error(f"Error sending Telegram message: {e}")
            return False
    
    async def send_news(self, news_item: dict):
        """Отправить одну новость"""
        message = TELEGRAM_MESSAGE_TEMPLATE.format(
            title=news_item['title'],
            category=news_item['category'],
            urgency=round(news_item['urgency_score'], 1),
            url=news_item['url'],
            snippet=news_item['snippet'][:300] + '...' if len(news_item['snippet']) > 300 else news_item['snippet']
        )
        
        return await self.send_message(message)
    
    async def send_batch_news(self, limit: int = 10):
        """Отправить пакет новостей"""
        if not self.enabled:
            logger.info("Telegram notifications disabled")
            return
        
        # Получаем неотправленные новости
        unsent_news = db.get_unsent_news(limit=limit)
        
        if not unsent_news:
            logger.info("No new news to send")
            return
        
        logger.info(f"Sending {len(unsent_news)} news items to Telegram")
        
        sent_ids = []
        for news in unsent_news:
            if await self.send_news(dict(news)):
                sent_ids.append(news['id'])
                await asyncio.sleep(1)  # Задержка между сообщениями
        
        # Отмечаем как отправленные
        if sent_ids:
            db.mark_news_as_sent(sent_ids)
            logger.info(f"Sent {len(sent_ids)} news items")
    
    async def send_summary(self):
        """Отправить суммарную статистику"""
        if not self.enabled:
            return
        
        stats = db.get_news_stats()
        top_sources = db.get_top_sources(5)
        
        message = "📊 <b>Статистика за последние 24 часа</b>\n\n"
        
        if stats:
            message += "<b>Новости по категориям:</b>\n"
            for stat in stats:
                message += f"• {stat['category']}: {stat['count']} (срочность: {stat['avg_urgency']:.1f}/10)\n"
        
        if top_sources:
            message += "\n<b>Топ источников:</b>\n"
            for source in top_sources:
                message += f"• {source['domain']}: {source['news_count']} новостей\n"
        
        await self.send_message(message)


# Singleton
telegram_notifier = TelegramNotifier()



























