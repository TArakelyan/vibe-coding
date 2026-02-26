import asyncio
import logging
from aiogram import Bot, Dispatcher
from aiogram.fsm.storage.memory import MemoryStorage

import config
from database import init_db
from handlers import register_all_handlers
from services import PostScheduler

# Настройка логирования
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Инициализация бота и диспетчера
bot = Bot(token=config.BOT_TOKEN)
storage = MemoryStorage()
dp = Dispatcher(storage=storage)

# Глобальный планировщик
scheduler = None

async def on_startup():
    """Действия при запуске бота"""
    logger.info("🚀 Запуск бота...")
    
    # Инициализация базы данных
    try:
        init_db()
        logger.info("✅ База данных инициализирована")
    except Exception as e:
        logger.error(f"❌ Ошибка инициализации БД: {e}")
        raise
    
    # Запуск планировщика
    global scheduler
    scheduler = PostScheduler(bot)
    scheduler.start()
    logger.info("✅ Планировщик запущен")
    
    # Уведомление администраторов о запуске
    for admin_id in config.ADMIN_IDS:
        try:
            await bot.send_message(
                admin_id,
                "✅ <b>Бот успешно запущен!</b>\n\n"
                "Используйте /start для просмотра команд.",
                parse_mode="HTML"
            )
        except Exception as e:
            logger.warning(f"Не удалось отправить уведомление админу {admin_id}: {e}")

async def on_shutdown():
    """Действия при остановке бота"""
    logger.info("🛑 Остановка бота...")
    
    # Остановка планировщика
    if scheduler:
        scheduler.stop()
        logger.info("✅ Планировщик остановлен")
    
    # Уведомление администраторов
    for admin_id in config.ADMIN_IDS:
        try:
            await bot.send_message(
                admin_id,
                "🛑 Бот остановлен",
                parse_mode="HTML"
            )
        except Exception:
            pass
    
    await bot.session.close()

async def main():
    """Главная функция"""
    # Регистрация обработчиков
    register_all_handlers(dp)
    
    # Регистрация событий запуска/остановки
    dp.startup.register(on_startup)
    dp.shutdown.register(on_shutdown)
    
    # Запуск бота
    try:
        logger.info("🤖 Бот начинает polling...")
        await dp.start_polling(bot, allowed_updates=dp.resolve_used_update_types())
    except KeyboardInterrupt:
        logger.info("👋 Получен сигнал остановки")
    except Exception as e:
        logger.error(f"❌ Критическая ошибка: {e}")
    finally:
        await on_shutdown()

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        logger.info("👋 Бот остановлен пользователем")
    except Exception as e:
        logger.error(f"❌ Необработанная ошибка: {e}")
