import random
from datetime import datetime
from typing import List, Dict
from aiogram import Bot
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, FSInputFile
from database import Bonus
import config

class PostCreator:
    """Создание постов для Telegram"""
    
    @staticmethod
    def create_single_post(bonus: Bonus) -> Dict:
        """
        Создать пост с одним бонусом
        
        Returns:
            Dict с полями: text, photo_path, reply_markup
        """
        # Вступительный текст (случайный)
        intro = random.choice(config.INTRO_TEXTS)
        
        # Форматирование даты окончания
        end_date_str = ""
        if bonus.end_date:
            end_date_str = f"⏰ До {bonus.end_date.strftime('%d.%m.%Y')}"
        
        # Случайные эмодзи
        emojis = " ".join(random.sample(config.EMOJI_PACK, 4))
        
        # Формирование текста
        text = f"{intro}\n\n"
        text += f"🎯 {bonus.title}\n"
        if end_date_str:
            text += f"{end_date_str}\n"
        text += f"\n{emojis}\n\n"
        text += f"🔥 Все бонусы Спортса: {config.ALL_BONUSES_LINK}"
        
        # Кнопка
        keyboard = InlineKeyboardMarkup(inline_keyboard=[
            [InlineKeyboardButton(text="Перейти к акции", url=bonus.post_url)]
        ])
        
        return {
            "text": text,
            "photo_url": bonus.image_url,
            "reply_markup": keyboard
        }
    
    @staticmethod
    def create_bundle_post(bonuses: List[Bonus]) -> Dict:
        """
        Создать подборку из нескольких бонусов (обычно 3)
        
        Returns:
            Dict с полями: text, photo_path, reply_markup
        """
        if len(bonuses) > 3:
            bonuses = bonuses[:3]
        
        # Вступительный текст
        intro = random.choice(config.INTRO_TEXTS)
        
        # Формирование текста
        text = f"{intro}\n\n"
        
        for i, bonus in enumerate(bonuses, 1):
            end_date_str = ""
            if bonus.end_date:
                end_date_str = f" | ⏰ {bonus.end_date.strftime('%d.%m.%Y')}"
            
            text += f"🎯 {bonus.title}{end_date_str}\n"
        
        # Случайные эмодзи
        emojis = " ".join(random.sample(config.EMOJI_PACK, 4))
        text += f"\n{emojis}\n\n"
        text += f"🔥 Все бонусы Спортса: {config.ALL_BONUSES_LINK}"
        
        # Кнопки для каждого бонуса
        buttons = []
        for i, bonus in enumerate(bonuses, 1):
            btn_text = f"Акция {i}"
            if bonus.bookmaker:
                btn_text = f"{bonus.bookmaker}"
            buttons.append([InlineKeyboardButton(text=btn_text, url=bonus.post_url)])
        
        keyboard = InlineKeyboardMarkup(inline_keyboard=buttons)
        
        # Для подборки используем общую картинку (можно настроить)
        photo_url = bonuses[0].image_url if bonuses else None
        
        return {
            "text": text,
            "photo_url": photo_url,
            "reply_markup": keyboard
        }
    
    @staticmethod
    async def send_post(bot: Bot, channel_id: str, post_data: Dict) -> str:
        """
        Отправить пост в канал
        
        Returns:
            message_id отправленного сообщения
        """
        try:
            if post_data.get("photo_url"):
                # Отправка с картинкой
                message = await bot.send_photo(
                    chat_id=channel_id,
                    photo=post_data["photo_url"],
                    caption=post_data["text"],
                    reply_markup=post_data.get("reply_markup"),
                    parse_mode="HTML"
                )
            else:
                # Отправка текста без картинки
                message = await bot.send_message(
                    chat_id=channel_id,
                    text=post_data["text"],
                    reply_markup=post_data.get("reply_markup"),
                    parse_mode="HTML"
                )
            
            print(f"✅ Пост опубликован, message_id: {message.message_id}")
            return str(message.message_id)
            
        except Exception as e:
            print(f"❌ Ошибка публикации поста: {e}")
            raise
    
    @staticmethod
    def get_preview(post_data: Dict) -> str:
        """Получить превью поста для админ-панели"""
        preview = "📱 ПРЕВЬЮ ПОСТА:\n"
        preview += "=" * 40 + "\n\n"
        preview += post_data["text"]
        preview += "\n\n" + "=" * 40
        
        if post_data.get("photo_url"):
            preview += f"\n\n🖼 Картинка: {post_data['photo_url'][:50]}..."
        
        # Информация о кнопках
        if post_data.get("reply_markup"):
            preview += f"\n\n🔘 Кнопок: {len(post_data['reply_markup'].inline_keyboard)}"
        
        return preview
