from aiogram import Router, F, Bot
from aiogram.filters import Command
from aiogram.types import Message, CallbackQuery, InlineKeyboardMarkup, InlineKeyboardButton
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
import config
from database import BonusRepository, PostHistoryRepository
from services import PostCreator

router = Router()

class PublishStates(StatesGroup):
    """Состояния для публикации"""
    waiting_for_single_id = State()
    waiting_for_bundle_ids = State()
    confirming_single = State()
    confirming_bundle = State()

@router.message(Command("publish_single"))
async def cmd_publish_single(message: Message, state: FSMContext):
    """Команда публикации одного бонуса"""
    if message.from_user.id not in config.ADMIN_IDS:
        return
    
    # Проверяем, есть ли ID в команде
    args = message.text.split(maxsplit=1)
    
    if len(args) > 1:
        bonus_id = args[1].strip()
        await process_single_bonus(message, state, bonus_id)
    else:
        await message.answer(
            "📝 Введите ID бонуса для публикации:\n\n"
            "Пример: bonus_123\n\n"
            "Отмена: /cancel"
        )
        await state.set_state(PublishStates.waiting_for_single_id)

@router.message(PublishStates.waiting_for_single_id)
async def process_single_id_input(message: Message, state: FSMContext):
    """Обработка ввода ID бонуса"""
    bonus_id = message.text.strip()
    await process_single_bonus(message, state, bonus_id)

async def process_single_bonus(message: Message, state: FSMContext, bonus_id: str):
    """Обработка одного бонуса"""
    # Получаем бонус из БД
    bonus = BonusRepository.get_by_id(bonus_id)
    
    if not bonus:
        await message.answer(f"❌ Бонус с ID '{bonus_id}' не найден в базе данных.")
        await state.clear()
        return
    
    # Создаем пост
    post_data = PostCreator.create_single_post(bonus)
    
    # Показываем превью
    preview = PostCreator.get_preview(post_data)
    
    # Кнопки подтверждения
    keyboard = InlineKeyboardMarkup(inline_keyboard=[
        [
            InlineKeyboardButton(text="✅ Опубликовать", callback_data=f"publish_single:{bonus_id}"),
            InlineKeyboardButton(text="❌ Отмена", callback_data="cancel_publish")
        ]
    ])
    
    await message.answer(preview, reply_markup=keyboard)
    await state.update_data(bonus_id=bonus_id, post_data=post_data)
    await state.set_state(PublishStates.confirming_single)

@router.callback_query(F.data.startswith("publish_single:"))
async def callback_publish_single(callback: CallbackQuery, state: FSMContext, bot: Bot):
    """Подтверждение публикации одного бонуса"""
    bonus_id = callback.data.split(":", 1)[1]
    
    try:
        # Получаем бонус
        bonus = BonusRepository.get_by_id(bonus_id)
        if not bonus:
            await callback.answer("❌ Бонус не найден", show_alert=True)
            return
        
        # Проверяем лимит
        today_count = PostHistoryRepository.get_today_count()
        if today_count >= config.MAX_POSTS_PER_DAY:
            await callback.answer(
                f"⚠️ Достигнут лимит постов на сегодня ({config.MAX_POSTS_PER_DAY})",
                show_alert=True
            )
            return
        
        # Создаем и публикуем пост
        post_data = PostCreator.create_single_post(bonus)
        message_id = await PostCreator.send_post(bot, config.CHANNEL_ID, post_data)
        
        # Сохраняем в историю
        PostHistoryRepository.create(
            [bonus.bonus_id],
            'single',
            message_id,
            posted_by=str(callback.from_user.id)
        )
        BonusRepository.mark_as_posted([bonus.bonus_id])
        
        await callback.message.edit_text(
            f"✅ Пост опубликован!\n\n"
            f"Бонус: {bonus.title}\n"
            f"Message ID: {message_id}"
        )
        await callback.answer("✅ Опубликовано!")
        
    except Exception as e:
        await callback.answer(f"❌ Ошибка: {str(e)}", show_alert=True)
    
    await state.clear()

@router.message(Command("publish_bundle"))
async def cmd_publish_bundle(message: Message, state: FSMContext):
    """Команда публикации подборки"""
    if message.from_user.id not in config.ADMIN_IDS:
        return
    
    # Проверяем, есть ли ID в команде
    args = message.text.split(maxsplit=1)
    
    if len(args) > 1:
        bonus_ids_str = args[1].strip()
        await process_bundle(message, state, bonus_ids_str)
    else:
        await message.answer(
            "📝 Введите ID бонусов через запятую (3 штуки):\n\n"
            "Пример: bonus_1,bonus_2,bonus_3\n\n"
            "Отмена: /cancel"
        )
        await state.set_state(PublishStates.waiting_for_bundle_ids)

@router.message(PublishStates.waiting_for_bundle_ids)
async def process_bundle_ids_input(message: Message, state: FSMContext):
    """Обработка ввода ID для подборки"""
    bonus_ids_str = message.text.strip()
    await process_bundle(message, state, bonus_ids_str)

async def process_bundle(message: Message, state: FSMContext, bonus_ids_str: str):
    """Обработка подборки бонусов"""
    # Парсим ID
    bonus_ids = [id.strip() for id in bonus_ids_str.split(",")]
    
    if len(bonus_ids) != 3:
        await message.answer("❌ Нужно указать ровно 3 ID бонусов через запятую.")
        return
    
    # Получаем бонусы из БД
    bonuses = BonusRepository.get_by_ids(bonus_ids)
    
    if len(bonuses) != 3:
        found_ids = [b.bonus_id for b in bonuses]
        missing = [id for id in bonus_ids if id not in found_ids]
        await message.answer(
            f"❌ Не найдены бонусы с ID: {', '.join(missing)}"
        )
        await state.clear()
        return
    
    # Создаем пост
    post_data = PostCreator.create_bundle_post(bonuses)
    
    # Показываем превью
    preview = PostCreator.get_preview(post_data)
    
    # Кнопки подтверждения
    keyboard = InlineKeyboardMarkup(inline_keyboard=[
        [
            InlineKeyboardButton(
                text="✅ Опубликовать",
                callback_data=f"publish_bundle:{','.join(bonus_ids)}"
            ),
            InlineKeyboardButton(text="❌ Отмена", callback_data="cancel_publish")
        ]
    ])
    
    await message.answer(preview, reply_markup=keyboard)
    await state.update_data(bonus_ids=bonus_ids, post_data=post_data)
    await state.set_state(PublishStates.confirming_bundle)

@router.callback_query(F.data.startswith("publish_bundle:"))
async def callback_publish_bundle(callback: CallbackQuery, state: FSMContext, bot: Bot):
    """Подтверждение публикации подборки"""
    bonus_ids_str = callback.data.split(":", 1)[1]
    bonus_ids = bonus_ids_str.split(",")
    
    try:
        # Получаем бонусы
        bonuses = BonusRepository.get_by_ids(bonus_ids)
        if len(bonuses) != 3:
            await callback.answer("❌ Не все бонусы найдены", show_alert=True)
            return
        
        # Проверяем лимит
        today_count = PostHistoryRepository.get_today_count()
        if today_count >= config.MAX_POSTS_PER_DAY:
            await callback.answer(
                f"⚠️ Достигнут лимит постов на сегодня ({config.MAX_POSTS_PER_DAY})",
                show_alert=True
            )
            return
        
        # Создаем и публикуем пост
        post_data = PostCreator.create_bundle_post(bonuses)
        message_id = await PostCreator.send_post(bot, config.CHANNEL_ID, post_data)
        
        # Сохраняем в историю
        PostHistoryRepository.create(
            bonus_ids,
            'bundle',
            message_id,
            posted_by=str(callback.from_user.id)
        )
        BonusRepository.mark_as_posted(bonus_ids)
        
        await callback.message.edit_text(
            f"✅ Подборка опубликована!\n\n"
            f"Бонусов: {len(bonuses)}\n"
            f"Message ID: {message_id}"
        )
        await callback.answer("✅ Опубликовано!")
        
    except Exception as e:
        await callback.answer(f"❌ Ошибка: {str(e)}", show_alert=True)
    
    await state.clear()

@router.callback_query(F.data == "cancel_publish")
async def callback_cancel(callback: CallbackQuery, state: FSMContext):
    """Отмена публикации"""
    await callback.message.edit_text("❌ Публикация отменена")
    await callback.answer()
    await state.clear()

@router.message(Command("cancel"))
async def cmd_cancel(message: Message, state: FSMContext):
    """Отмена текущего действия"""
    await state.clear()
    await message.answer("❌ Действие отменено")

def register_handlers(dp):
    """Регистрация обработчиков"""
    dp.include_router(router)
