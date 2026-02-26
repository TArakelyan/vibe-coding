from aiogram import Router
from aiogram.filters import Command
from aiogram.types import Message
from datetime import datetime, timedelta
import config
from database import PostHistoryRepository, ScheduledPostRepository, BonusRepository
from services import GoogleSheetsParser

router = Router()

@router.message(Command("plan_week"))
async def cmd_plan_week(message: Message):
    """Показать план публикаций на неделю"""
    if message.from_user.id not in config.ADMIN_IDS:
        return
    
    # Генерируем план
    plan_text = "📅 <b>План публикаций на неделю</b>\n\n"
    
    today = datetime.now()
    
    for day_offset in range(7):
        date = today + timedelta(days=day_offset)
        day_name = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"][date.weekday()]
        date_str = date.strftime("%d.%m")
        
        plan_text += f"<b>{day_name} {date_str}</b>\n"
        
        posts_planned = []
        
        # Проверяем "Бонус дня"
        if date.weekday() in config.POST_SCHEDULE["daily_bonus"]["days"]:
            for time in config.POST_SCHEDULE["daily_bonus"]["times"]:
                posts_planned.append(f"  ⚽️ {time} - Бонус дня")
        
        # Проверяем подборки
        if date.weekday() in config.POST_SCHEDULE["bundle"]["days"]:
            for time in config.POST_SCHEDULE["bundle"]["times"]:
                posts_planned.append(f"  📦 {time} - Подборка офферов")
        
        if posts_planned:
            plan_text += "\n".join(posts_planned) + "\n"
        else:
            plan_text += "  Нет запланированных постов\n"
        
        plan_text += "\n"
    
    plan_text += f"<i>Лимит постов в день: {config.MAX_POSTS_PER_DAY}</i>"
    
    await message.answer(plan_text, parse_mode="HTML")

@router.message(Command("new_offers"))
async def cmd_new_offers(message: Message):
    """Проверить новые офферы"""
    if message.from_user.id not in config.ADMIN_IDS:
        return
    
    await message.answer("🔍 Проверяю новые офферы...")
    
    try:
        parser = GoogleSheetsParser()
        new_bonuses = parser.get_new_offers()
        
        if not new_bonuses:
            await message.answer("✅ Новых офферов не найдено")
            return
        
        response = f"🆕 <b>Найдено новых офферов: {len(new_bonuses)}</b>\n\n"
        
        for bonus_data in new_bonuses[:10]:  # Показываем максимум 10
            response += f"• {bonus_data['title']}\n"
            response += f"  ID: <code>{bonus_data['bonus_id']}</code>\n\n"
        
        if len(new_bonuses) > 10:
            response += f"<i>...и еще {len(new_bonuses) - 10}</i>\n\n"
        
        response += "✅ Новые офферы добавлены в базу данных"
        
        await message.answer(response, parse_mode="HTML")
        
    except Exception as e:
        await message.answer(f"❌ Ошибка: {str(e)}")

@router.message(Command("schedule"))
async def cmd_schedule(message: Message):
    """Показать текущее расписание"""
    if message.from_user.id not in config.ADMIN_IDS:
        return
    
    schedule_text = "⏰ <b>Текущее расписание автопостинга</b>\n\n"
    
    schedule_text += "<b>🔄 Автоматические задачи:</b>\n"
    schedule_text += "• Проверка новых офферов: каждые 30 минут\n"
    schedule_text += "• Синхронизация Google Sheets: каждый час\n"
    schedule_text += "• Обработка запланированных: каждые 10 минут\n\n"
    
    schedule_text += "<b>⚽️ Бонус дня (Сб/Вс):</b>\n"
    for time in config.POST_SCHEDULE["daily_bonus"]["times"]:
        schedule_text += f"• {time}\n"
    schedule_text += "\n"
    
    schedule_text += "<b>📦 Подборка офферов (Ср):</b>\n"
    for time in config.POST_SCHEDULE["bundle"]["times"]:
        schedule_text += f"• {time}\n"
    schedule_text += "\n"
    
    schedule_text += f"<b>Настройки:</b>\n"
    schedule_text += f"• Лимит постов/день: {config.MAX_POSTS_PER_DAY}\n"
    schedule_text += f"• Период ротации: {config.ROTATION_DAYS} дней\n"
    schedule_text += f"• Часовой пояс: {config.TIMEZONE}"
    
    await message.answer(schedule_text, parse_mode="HTML")

@router.message(Command("stats"))
async def cmd_stats(message: Message):
    """Статистика публикаций"""
    if message.from_user.id not in config.ADMIN_IDS:
        return
    
    try:
        # Статистика за сегодня
        today_count = PostHistoryRepository.get_today_count()
        
        # Общее количество бонусов в базе
        total_bonuses = len(BonusRepository.get_not_posted_recently(days=0))
        active_bonuses = len(BonusRepository.get_not_posted_recently(days=config.ROTATION_DAYS))
        
        stats_text = "📊 <b>Статистика</b>\n\n"
        stats_text += f"<b>Публикации сегодня:</b> {today_count}/{config.MAX_POSTS_PER_DAY}\n\n"
        stats_text += f"<b>База данных:</b>\n"
        stats_text += f"• Всего бонусов: {total_bonuses}\n"
        stats_text += f"• Доступны для публикации: {active_bonuses}\n"
        
        await message.answer(stats_text, parse_mode="HTML")
        
    except Exception as e:
        await message.answer(f"❌ Ошибка: {str(e)}")

@router.message(Command("sync_sheets"))
async def cmd_sync_sheets(message: Message):
    """Синхронизация с Google Sheets"""
    if message.from_user.id not in config.ADMIN_IDS:
        return
    
    await message.answer("🔄 Начинаю синхронизацию с Google Sheets...")
    
    try:
        parser = GoogleSheetsParser()
        synced_count = parser.sync_to_database()
        
        await message.answer(
            f"✅ Синхронизация завершена!\n\n"
            f"Обновлено бонусов: {synced_count}"
        )
        
    except Exception as e:
        await message.answer(f"❌ Ошибка синхронизации: {str(e)}")

def register_handlers(dp):
    """Регистрация обработчиков"""
    dp.include_router(router)
