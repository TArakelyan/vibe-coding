from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
from datetime import datetime, timedelta
from typing import List
import random
import pytz

from database import BonusRepository, PostHistoryRepository, ScheduledPostRepository
from services.parser import GoogleSheetsParser
from services.poster import PostCreator
import config

class PostScheduler:
    """Планировщик публикаций"""
    
    def __init__(self, bot):
        self.bot = bot
        self.scheduler = AsyncIOScheduler(timezone=pytz.timezone(config.TIMEZONE))
        self.parser = GoogleSheetsParser()
    
    def start(self):
        """Запустить планировщик"""
        # Проверка новых офферов каждые 30 минут
        self.scheduler.add_job(
            self.check_new_offers,
            'interval',
            minutes=30,
            id='check_new_offers'
        )
        
        # Публикация "Бонус дня" по субботам и воскресеньям
        for day in config.POST_SCHEDULE["daily_bonus"]["days"]:
            for time in config.POST_SCHEDULE["daily_bonus"]["times"]:
                hour, minute = map(int, time.split(":"))
                self.scheduler.add_job(
                    self.publish_daily_bonus,
                    CronTrigger(day_of_week=day, hour=hour, minute=minute),
                    id=f'daily_bonus_{day}_{time}'
                )
        
        # Публикация подборки по средам
        for day in config.POST_SCHEDULE["bundle"]["days"]:
            for time in config.POST_SCHEDULE["bundle"]["times"]:
                hour, minute = map(int, time.split(":"))
                self.scheduler.add_job(
                    self.publish_bundle,
                    CronTrigger(day_of_week=day, hour=hour, minute=minute),
                    id=f'bundle_{day}_{time}'
                )
        
        # Публикация запланированных постов каждые 10 минут
        self.scheduler.add_job(
            self.process_scheduled_posts,
            'interval',
            minutes=10,
            id='process_scheduled'
        )
        
        # Синхронизация с Google Sheets раз в час
        self.scheduler.add_job(
            self.sync_google_sheets,
            'interval',
            hours=1,
            id='sync_sheets'
        )
        
        self.scheduler.start()
        print("✅ Планировщик запущен")
    
    def stop(self):
        """Остановить планировщик"""
        self.scheduler.shutdown()
        print("🛑 Планировщик остановлен")
    
    async def check_new_offers(self):
        """Проверка новых офферов и автопубликация"""
        try:
            print("🔍 Проверка новых офферов...")
            new_bonuses = self.parser.get_new_offers()
            
            if not new_bonuses:
                return
            
            # Проверяем лимит постов на сегодня
            today_count = PostHistoryRepository.get_today_count()
            
            if today_count >= config.MAX_POSTS_PER_DAY:
                print(f"⚠️ Достигнут лимит постов на сегодня ({config.MAX_POSTS_PER_DAY})")
                # Планируем на завтра
                for bonus_data in new_bonuses:
                    tomorrow = datetime.now() + timedelta(days=1)
                    tomorrow = tomorrow.replace(hour=12, minute=0, second=0)
                    ScheduledPostRepository.create(
                        bonus_ids=[bonus_data['bonus_id']],
                        post_type='single',
                        scheduled_date=tomorrow,
                        priority=1  # Высокий приоритет для новых офферов
                    )
                return
            
            # Публикуем новые офферы
            for bonus_data in new_bonuses[:config.MAX_POSTS_PER_DAY - today_count]:
                bonus = BonusRepository.get_by_id(bonus_data['bonus_id'])
                if bonus:
                    await self.publish_single_bonus(bonus, posted_by="auto_new_offer")
            
        except Exception as e:
            print(f"❌ Ошибка проверки новых офферов: {e}")
    
    async def publish_daily_bonus(self):
        """Публикация бонуса дня (для еврокубков)"""
        try:
            print("📅 Публикация бонуса дня...")
            
            # Проверяем лимит
            today_count = PostHistoryRepository.get_today_count()
            if today_count >= config.MAX_POSTS_PER_DAY:
                print(f"⚠️ Достигнут лимит постов на сегодня")
                return
            
            # Получаем подходящий бонус (не публиковался недавно)
            bonuses = BonusRepository.get_not_posted_recently(
                days=config.ROTATION_DAYS,
                category='eurocups'
            )
            
            if not bonuses:
                print("⚠️ Нет доступных бонусов для публикации")
                return
            
            # Выбираем случайный бонус
            bonus = random.choice(bonuses)
            await self.publish_single_bonus(bonus, posted_by="auto_daily")
            
        except Exception as e:
            print(f"❌ Ошибка публикации бонуса дня: {e}")
    
    async def publish_bundle(self):
        """Публикация подборки из 3 бонусов"""
        try:
            print("📦 Публикация подборки...")
            
            # Проверяем лимит
            today_count = PostHistoryRepository.get_today_count()
            if today_count >= config.MAX_POSTS_PER_DAY:
                print(f"⚠️ Достигнут лимит постов на сегодня")
                return
            
            # Получаем бонусы, которые не публиковались недавно
            bonuses = BonusRepository.get_not_posted_recently(days=config.ROTATION_DAYS)
            
            if len(bonuses) < 3:
                print("⚠️ Недостаточно бонусов для подборки")
                return
            
            # Выбираем 3 случайных бонуса
            selected_bonuses = random.sample(bonuses, 3)
            
            # Создаем и публикуем пост
            post_data = PostCreator.create_bundle_post(selected_bonuses)
            message_id = await PostCreator.send_post(self.bot, config.CHANNEL_ID, post_data)
            
            # Сохраняем в историю
            bonus_ids = [b.bonus_id for b in selected_bonuses]
            PostHistoryRepository.create(bonus_ids, 'bundle', message_id, 'auto_bundle')
            BonusRepository.mark_as_posted(bonus_ids)
            
            print(f"✅ Подборка опубликована: {bonus_ids}")
            
        except Exception as e:
            print(f"❌ Ошибка публикации подборки: {e}")
    
    async def publish_single_bonus(self, bonus, posted_by="auto"):
        """Публикация одного бонуса"""
        try:
            post_data = PostCreator.create_single_post(bonus)
            message_id = await PostCreator.send_post(self.bot, config.CHANNEL_ID, post_data)
            
            # Сохраняем в историю
            PostHistoryRepository.create([bonus.bonus_id], 'single', message_id, posted_by)
            BonusRepository.mark_as_posted([bonus.bonus_id])
            
            print(f"✅ Опубликован бонус: {bonus.bonus_id}")
            
        except Exception as e:
            print(f"❌ Ошибка публикации бонуса: {e}")
    
    async def process_scheduled_posts(self):
        """Обработка запланированных постов"""
        try:
            scheduled_posts = ScheduledPostRepository.get_pending()
            
            if not scheduled_posts:
                return
            
            # Проверяем лимит
            today_count = PostHistoryRepository.get_today_count()
            available_slots = config.MAX_POSTS_PER_DAY - today_count
            
            if available_slots <= 0:
                print(f"⚠️ Достигнут лимит постов на сегодня")
                return
            
            # Публикуем запланированные посты
            for scheduled in scheduled_posts[:available_slots]:
                import json
                bonus_ids = json.loads(scheduled.bonus_ids)
                bonuses = BonusRepository.get_by_ids(bonus_ids)
                
                if scheduled.post_type == 'single' and len(bonuses) > 0:
                    await self.publish_single_bonus(bonuses[0], posted_by="scheduled")
                elif scheduled.post_type == 'bundle' and len(bonuses) >= 3:
                    post_data = PostCreator.create_bundle_post(bonuses)
                    message_id = await PostCreator.send_post(self.bot, config.CHANNEL_ID, post_data)
                    PostHistoryRepository.create(bonus_ids, 'bundle', message_id, 'scheduled')
                    BonusRepository.mark_as_posted(bonus_ids)
                
                ScheduledPostRepository.mark_as_published(scheduled.id)
            
        except Exception as e:
            print(f"❌ Ошибка обработки запланированных постов: {e}")
    
    async def sync_google_sheets(self):
        """Синхронизация с Google Sheets"""
        try:
            print("🔄 Синхронизация с Google Sheets...")
            self.parser.sync_to_database()
        except Exception as e:
            print(f"❌ Ошибка синхронизации: {e}")
    
    def generate_week_plan(self) -> List[Dict]:
        """Генерация плана публикаций на неделю"""
        plan = []
        today = datetime.now()
        
        for day_offset in range(7):
            date = today + timedelta(days=day_offset)
            day_plan = {
                "date": date.strftime("%Y-%m-%d"),
                "day_name": date.strftime("%A"),
                "posts": []
            }
            
            # Проверяем расписание для "Бонус дня"
            if date.weekday() in config.POST_SCHEDULE["daily_bonus"]["days"]:
                for time in config.POST_SCHEDULE["daily_bonus"]["times"]:
                    day_plan["posts"].append({
                        "time": time,
                        "type": "daily_bonus",
                        "description": "Бонус дня (еврокубки)"
                    })
            
            # Проверяем расписание для подборок
            if date.weekday() in config.POST_SCHEDULE["bundle"]["days"]:
                for time in config.POST_SCHEDULE["bundle"]["times"]:
                    day_plan["posts"].append({
                        "time": time,
                        "type": "bundle",
                        "description": "Подборка из 3 офферов"
                    })
            
            plan.append(day_plan)
        
        return plan
