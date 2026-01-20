"""
Основной модуль парсинга новостей
"""
import asyncio
import aiohttp
import hashlib
from bs4 import BeautifulSoup
from urllib.parse import urlparse, urljoin
from datetime import datetime
from loguru import logger
import feedparser
from fake_useragent import UserAgent
from config import (
    KEYWORDS, EXCLUDE_KEYWORDS, MAX_CONCURRENT_REQUESTS,
    USER_AGENTS, URGENCY_WEIGHTS, RSS_FEEDS
)
from database import db
import redis
import json
from config import REDIS_CONFIG

# Redis для дедупликации
redis_client = redis.Redis(**REDIS_CONFIG)
ua = UserAgent()


class NewsParser:
    def __init__(self):
        self.session = None
        self.semaphore = asyncio.Semaphore(MAX_CONCURRENT_REQUESTS)
        self.headers = {
            'User-Agent': USER_AGENTS[0],
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
        }
    
    async def create_session(self):
        """Создать aiohttp сессию"""
        if self.session is None:
            timeout = aiohttp.ClientTimeout(total=30)
            self.session = aiohttp.ClientSession(
                timeout=timeout,
                headers=self.headers
            )
    
    async def close_session(self):
        """Закрыть сессию"""
        if self.session:
            await self.session.close()
    
    async def fetch_page(self, url: str) -> str:
        """Получить содержимое страницы"""
        async with self.semaphore:
            try:
                # Меняем User-Agent
                headers = self.headers.copy()
                headers['User-Agent'] = ua.random
                
                async with self.session.get(url, headers=headers) as response:
                    if response.status == 200:
                        return await response.text()
                    else:
                        logger.warning(f"Failed to fetch {url}: {response.status}")
                        return None
            except Exception as e:
                logger.error(f"Error fetching {url}: {e}")
                return None
    
    def check_relevance(self, text: str) -> tuple:
        """Проверить релевантность текста и определить категорию"""
        text_lower = text.lower()
        
        # Проверка на исключения
        for exclude in EXCLUDE_KEYWORDS:
            if exclude.lower() in text_lower:
                return False, None, 0.0
        
        # Подсчет релевантных слов по категориям
        category_scores = {}
        found_keywords = []
        
        for category, words in KEYWORDS.items():
            score = 0
            for word in words:
                if word.lower() in text_lower:
                    score += 1
                    found_keywords.append(word)
            
            if score > 0:
                category_scores[category] = score
        
        if not category_scores:
            return False, None, 0.0
        
        # Определяем основную категорию
        main_category = max(category_scores, key=category_scores.get)
        urgency = URGENCY_WEIGHTS.get(main_category, 5.0)
        
        # Увеличиваем срочность если много ключевых слов
        if sum(category_scores.values()) > 3:
            urgency = min(10.0, urgency + 1.0)
        
        return True, main_category, urgency
    
    def is_duplicate(self, url: str, title: str) -> bool:
        """Проверить дубликат через Redis"""
        content_hash = hashlib.sha256(f"{title}{url}".encode()).hexdigest()
        
        # Проверяем в Redis (кеш на 7 дней)
        if redis_client.exists(content_hash):
            return True
        
        # Добавляем в Redis
        redis_client.setex(content_hash, 7 * 24 * 3600, '1')
        return False
    
    async def parse_rss_feed(self, feed_url: str):
        """Парсинг RSS фида"""
        try:
            feed = feedparser.parse(feed_url)
            news_items = []
            
            for entry in feed.entries[:30]:  # Берем последние 30
                title = entry.get('title', '')
                url = entry.get('link', '')
                snippet = entry.get('summary', '')[:500]
                published = entry.get('published_parsed', None)
                
                if published:
                    published_date = datetime(*published[:6])
                else:
                    published_date = datetime.now()
                
                # Проверка релевантности
                is_relevant, category, urgency = self.check_relevance(f"{title} {snippet}")
                
                if is_relevant and not self.is_duplicate(url, title):
                    news_items.append({
                        'title': title,
                        'url': url,
                        'snippet': snippet,
                        'published_date': published_date,
                        'category': category,
                        'urgency': urgency,
                        'source_url': feed_url
                    })
            
            logger.info(f"Parsed {len(news_items)} relevant news from RSS {feed_url}")
            return news_items
            
        except Exception as e:
            logger.error(f"Error parsing RSS {feed_url}: {e}")
            return []
    
    async def parse_website(self, source_url: str, source_id: int):
        """Парсинг веб-сайта"""
        html = await self.fetch_page(source_url)
        if not html:
            return []
        
        soup = BeautifulSoup(html, 'lxml')
        news_items = []
        
        # Ищем статьи (универсальные селекторы)
        articles = soup.find_all(['article', 'div'], 
                                class_=lambda x: x and any(cls in str(x).lower() 
                                for cls in ['news', 'article', 'post', 'item']))
        
        for article in articles[:50]:  # Ограничиваем 50 статьями
            try:
                # Ищем заголовок
                title_elem = article.find(['h1', 'h2', 'h3', 'h4', 'a'])
                if not title_elem:
                    continue
                
                title = title_elem.get_text(strip=True)
                
                # Ищем ссылку
                link_elem = article.find('a', href=True)
                if not link_elem:
                    continue
                
                url = urljoin(source_url, link_elem['href'])
                
                # Ищем описание
                snippet_elem = article.find(['p', 'div'], 
                                          class_=lambda x: x and 'desc' in str(x).lower())
                snippet = snippet_elem.get_text(strip=True)[:500] if snippet_elem else title
                
                # Проверка релевантности
                is_relevant, category, urgency = self.check_relevance(f"{title} {snippet}")
                
                if is_relevant and not self.is_duplicate(url, title):
                    news_items.append({
                        'title': title,
                        'url': url,
                        'snippet': snippet,
                        'published_date': datetime.now(),
                        'category': category,
                        'urgency': urgency,
                        'source_id': source_id
                    })
            
            except Exception as e:
                logger.debug(f"Error parsing article: {e}")
                continue
        
        logger.info(f"Parsed {len(news_items)} relevant news from {source_url}")
        return news_items
    
    async def parse_all_sources(self):
        """Парсинг всех активных источников"""
        await self.create_session()
        
        try:
            # Получаем все активные источники
            sources = db.get_active_sources()
            logger.info(f"Starting parsing {len(sources)} sources")
            
            # Парсим RSS фиды
            rss_tasks = [self.parse_rss_feed(feed) for feed in RSS_FEEDS]
            rss_results = await asyncio.gather(*rss_tasks, return_exceptions=True)
            
            # Парсим веб-сайты
            web_tasks = [self.parse_website(source['url'], source['id']) 
                        for source in sources]
            web_results = await asyncio.gather(*web_tasks, return_exceptions=True)
            
            # Собираем все новости
            all_news = []
            for result in rss_results + web_results:
                if isinstance(result, list):
                    all_news.extend(result)
            
            # Сохраняем в БД
            saved_count = 0
            for news in all_news:
                # Находим или создаем источник
                domain = urlparse(news.get('url', '')).netloc
                source_id = news.get('source_id') or db.add_source(
                    url=news.get('source_url', news.get('url')),
                    domain=domain
                )
                
                # Извлекаем ключевые слова
                keywords = []
                text = f"{news['title']} {news['snippet']}".lower()
                for category, words in KEYWORDS.items():
                    for word in words:
                        if word.lower() in text:
                            keywords.append(word)
                
                # Сохраняем новость
                if db.add_news(
                    title=news['title'],
                    url=news['url'],
                    content='',
                    snippet=news['snippet'],
                    published_date=news['published_date'],
                    source_id=source_id,
                    category=news['category'],
                    urgency_score=news['urgency'],
                    keywords=list(set(keywords))[:20]  # Уникальные, максимум 20
                ):
                    saved_count += 1
            
            logger.info(f"Saved {saved_count} new news items")
            return saved_count
            
        finally:
            await self.close_session()


# Singleton
parser = NewsParser()



























