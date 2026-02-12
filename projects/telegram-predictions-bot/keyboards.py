"""
Клавиатуры и кнопки для бота
"""
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, ReplyKeyboardMarkup, KeyboardButton
from typing import List
import config


def get_main_menu_keyboard():
    """Главное меню"""
    keyboard = [
        [KeyboardButton("⚙️ Настройки подписок")],
        [KeyboardButton("ℹ️ Информация"), KeyboardButton("🛑 Отключить уведомления")],
    ]
    return ReplyKeyboardMarkup(keyboard, resize_keyboard=True)


def get_sports_keyboard(selected_sports: List[str] = None):
    """Клавиатура выбора видов спорта"""
    if selected_sports is None:
        selected_sports = []
    
    keyboard = []
    
    for sport_key, sport_name in config.SPORTS.items():
        # Добавляем галочку, если спорт выбран
        checkmark = "✅ " if sport_key in selected_sports else ""
        button_text = f"{checkmark}{sport_name}"
        keyboard.append([InlineKeyboardButton(button_text, callback_data=f"sport_{sport_key}")])
    
    # Кнопка "Готово"
    if selected_sports:
        keyboard.append([InlineKeyboardButton("✔️ Готово", callback_data="sports_done")])
    
    return InlineKeyboardMarkup(keyboard)


def get_tournaments_keyboard(sport: str, selected_tournaments: List[str] = None):
    """Клавиатура выбора турниров"""
    if selected_tournaments is None:
        selected_tournaments = []
    
    keyboard = []
    
    # Кнопка "Все турниры"
    all_selected = len(selected_tournaments) == 0
    all_text = "✅ Все турниры" if all_selected else "⚪️ Все турниры"
    keyboard.append([InlineKeyboardButton(all_text, callback_data=f"all_tournaments_{sport}")])
    
    keyboard.append([InlineKeyboardButton("➕ Добавить турнир вручную", callback_data=f"add_custom_tournament_{sport}")])
    
    # Популярные турниры
    if not all_selected:
        keyboard.append([InlineKeyboardButton("📋 Популярные турниры:", callback_data="ignore")])
        
        tournaments = config.POPULAR_TOURNAMENTS.get(sport, [])
        
        for tournament in tournaments:
            # Добавляем галочку, если турнир выбран
            checkmark = "✅ " if tournament in selected_tournaments else ""
            button_text = f"{checkmark}{tournament}"
            keyboard.append([InlineKeyboardButton(button_text, callback_data=f"tournament_{sport}_{tournament}")])
    
    # Показываем выбранные пользовательские турниры
    if selected_tournaments:
        custom_tournaments = [t for t in selected_tournaments if t not in config.POPULAR_TOURNAMENTS.get(sport, [])]
        if custom_tournaments:
            keyboard.append([InlineKeyboardButton("📝 Твои турниры:", callback_data="ignore")])
            for tournament in custom_tournaments:
                keyboard.append([InlineKeyboardButton(f"✅ {tournament}", callback_data=f"tournament_{sport}_{tournament}")])
    
    # Кнопки управления
    keyboard.append([
        InlineKeyboardButton("🔙 Назад", callback_data=f"back_to_sports"),
        InlineKeyboardButton("✔️ Готово", callback_data=f"tournaments_done_{sport}")
    ])
    
    return InlineKeyboardMarkup(keyboard)


def get_settings_keyboard():
    """Клавиатура настроек"""
    keyboard = [
        [InlineKeyboardButton("🔄 Изменить виды спорта", callback_data="change_sports")],
        [InlineKeyboardButton("🎯 Настроить турниры", callback_data="change_tournaments")],
        [InlineKeyboardButton("🗑 Очистить все подписки", callback_data="clear_all")],
    ]
    return InlineKeyboardMarkup(keyboard)


def get_sport_selection_for_tournaments_keyboard(user_sports: List[str]):
    """Клавиатура выбора спорта для настройки турниров"""
    keyboard = []
    
    for sport_key in user_sports:
        sport_name = config.SPORTS.get(sport_key, sport_key)
        keyboard.append([InlineKeyboardButton(sport_name, callback_data=f"configure_tournaments_{sport_key}")])
    
    keyboard.append([InlineKeyboardButton("🔙 Назад", callback_data="back_to_settings")])
    
    return InlineKeyboardMarkup(keyboard)


def get_partner_button(url: str):
    """Кнопка со ссылкой на партнера"""
    keyboard = [[InlineKeyboardButton("📊 Сделать ставку", url=url)]]
    return InlineKeyboardMarkup(keyboard)


def get_confirmation_keyboard(action: str):
    """Клавиатура подтверждения действия"""
    keyboard = [
        [
            InlineKeyboardButton("✅ Да", callback_data=f"confirm_{action}"),
            InlineKeyboardButton("❌ Нет", callback_data=f"cancel_{action}")
        ]
    ]
    return InlineKeyboardMarkup(keyboard)
