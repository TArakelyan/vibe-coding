from aiogram import Router, F
from aiogram.filters import Command
from aiogram.types import Message
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
import config

router = Router()

class PublishStates(StatesGroup):
    """Состояния для публикации постов"""
    waiting_for_bonus_id = State()
    waiting_for_bundle_ids = State()
    confirming_post = State()

@router.message(Command("start"))
async def cmd_start(message: Message):
    """Команда /start - главное меню"""
    if message.from_user.id not in config.ADMIN_IDS:
        await message.answer("❌ У вас нет доступа к этому боту.")
        return
    
    menu_text = """
🤖 <b>Бот управления постингом бонусов</b>

📋 <b>Доступные команды:</b>

<b>Публикация постов:</b>
/publish_single - Опубликовать один бонус
/publish_bundle - Опубликовать подборку из 3 бонусов

<b>Управление:</b>
/plan_week - План публикаций на неделю
/new_offers - Проверить новые офферы
/schedule - Текущее расписание
/stats - Статистика публикаций

<b>Синхронизация:</b>
/sync_sheets - Синхронизировать с Google Sheets

<b>Помощь:</b>
/help - Помощь по командам
"""
    
    await message.answer(menu_text, parse_mode="HTML")

@router.message(Command("help"))
async def cmd_help(message: Message):
    """Команда /help - справка"""
    if message.from_user.id not in config.ADMIN_IDS:
        return
    
    help_text = """
📚 <b>Справка по командам</b>

<b>/publish_single [ID]</b>
Публикация одного бонуса по ID.
Пример: /publish_single bonus_123

<b>/publish_bundle [ID1,ID2,ID3]</b>
Публикация подборки из 3 бонусов.
Пример: /publish_bundle bonus_1,bonus_2,bonus_3

<b>/plan_week</b>
Показывает план автоматических публикаций на неделю вперед.

<b>/new_offers</b>
Проверяет наличие новых офферов в Google Sheets и синхронизирует их с базой данных.

<b>/schedule</b>
Показывает текущее расписание автоматических публикаций.

<b>/stats</b>
Статистика публикаций за сегодня, неделю и месяц.

<b>/sync_sheets</b>
Принудительная синхронизация данных из Google Sheets.
"""
    
    await message.answer(help_text, parse_mode="HTML")

def register_handlers(dp):
    """Регистрация обработчиков"""
    dp.include_router(router)
