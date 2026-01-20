"""
Модуль для динамического поиска новых источников новостей
"""
import asyncio
import aiohttp
from bs4 import BeautifulSoup
from urllib.parse import urlparse, urljoin
from loguru import logger
from fake_useragent import UserAgent
from config import SEARCH_QUERIES, USER_AGENTS
from database import db
import re

ua = UserAgent()


class SourceDiscovery:
    def __init__(self):
        self.session = None
        self.found_sources = set()
    
    async def create_session(self):
        """Создать aiohttp сессию"""
        if self.session is None:
            timeout = aiohttp.ClientTimeout(total=30)
            self.session = aiohttp.ClientSession(timeout=timeout)
    
    async def close_session(self):
        """Закрыть сессию"""
        if self.session:
            await self.session.close()
    
    async def search_google(self, query: str) -> list:
        """Поиск через Google (без API, парсинг результатов)"""
        search_url = f"https://www.google.com/search?q={query}&num=30&hl=ru"
        
        headers = {
            'User-Agent': ua.random,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'ru-RU,ru;q=0.9',
        }
        
        try:
            async with self.session.get(search_url, headers=headers) as response:
                if response.status == 200:
                    html = await response.text()
                    return self.extract_urls_from_google(html)
                else:
                    logger.warning(f"Google search failed: {response.status}")
                    return []
        except Exception as e:
            logger.error(f"Error searching Google: {e}")
            return []
    
    def extract_urls_from_google(self, html: str) -> list:
        """Извлечь URL из результатов Google"""
        soup = BeautifulSoup(html, 'lxml')
        urls = []
        
        # Ищем все ссылки в результатах
        for link in soup.find_all('a', href=True):
            href = link['href']
            
            # Фильтруем URL Google
            if '/url?q=' in href:
                # Извлекаем реальный URL
                match = re.search(r'/url\?q=(https?://[^&]+)', href)
                if match:
                    url = match.group(1)
                    urls.append(url)
            elif href.startswith('http') and 'google.com' not in href:
                urls.append(href)
        
        return urls
    
    async def search_yandex(self, query: str) -> list:
        """Поиск через Yandex"""
        search_url = f"https://yandex.ru/search/?text={query}&lr=213"
        
        headers = {
            'User-Agent': ua.random,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'ru-RU,ru;q=0.9',
        }
        
        try:
            async with self.session.get(search_url, headers=headers) as response:
                if response.status == 200:
                    html = await response.text()
                    return self.extract_urls_from_yandex(html)
                else:
                    logger.warning(f"Yandex search failed: {response.status}")
                    return []
        except Exception as e:
            logger.error(f"Error searching Yandex: {e}")
            return []
    
    def extract_urls_from_yandex(self, html: str) -> list:
        """Извлечь URL из результатов Yandex"""
        soup = BeautifulSoup(html, 'lxml')
        urls = []
        
        # Ищем результаты поиска
        for link in soup.find_all('a', href=True):
            href = link['href']
            
            if href.startswith('http') and 'yandex.' not in href:
                urls.append(href)
        
        return urls
    
    async def search_dzen(self, query: str) -> list:
        """Поиск через Яндекс.Дзен"""
        search_url = f"https://dzen.ru/search?query={query}"
        
        headers = {
            'User-Agent': ua.random,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        }
        
        try:
            async with self.session.get(search_url, headers=headers) as response:
                if response.status == 200:
                    html = await response.text()
                    soup = BeautifulSoup(html, 'lxml')
                    
                    urls = []
                    for link in soup.find_all('a', href=True):
                        href = link['href']
                        if href.startswith('http') and 'dzen.ru' in href:
                            urls.append(href)
                    
                    return urls
                else:
                    return []
        except Exception as e:
            logger.error(f"Error searching Dzen: {e}")
            return []
    
    def is_relevant_domain(self, url: str) -> bool:
        """Проверить, релевантен ли домен"""
        domain = urlparse(url).netloc.lower()
        
        # Список релевантных доменов
        relevant_keywords = [
            'sport', 'bet', 'букмекер', 'ставк', 'gambling', 
            'legal', 'news', 'новост', 'gaming', 'игр'
        ]
        
        # Исключаем нерелевантные
        exclude_keywords = [
            'youtube', 'facebook', 'twitter', 'instagram',
            'wikipedia', 'reddit', 'pinterest'
        ]
        
        for exclude in exclude_keywords:
            if exclude in domain:
                return False
        
        for keyword in relevant_keywords:
            if keyword in domain:
                return True
        
        return False
    
    def calculate_reliability_score(self, domain: str) -> float:
        """Рассчитать рейтинг надежности источника"""
        domain_lower = domain.lower()
        
        # Премиум источники
        premium = ['rbc.ru', 'kommersant.ru', 'sports.ru', 'legalbet.ru']
        if any(p in domain_lower for p in premium):
            return 9.0
        
        # Букмекерские сайты
        bookmakers = ['fonbet', '1xstavka', 'ligastavok', 'betcity', 'parimatch']
        if any(b in domain_lower for b in bookmakers):
            return 8.0
        
        # Специализированные новостные сайты
        specialized = ['betonmobile', 'vprognoze', 'bookmaker-ratings', 'gambling']
        if any(s in domain_lower for s in specialized):
            return 7.5
        
        # По умолчанию
        return 5.0
    
    async def discover_sources(self):
        """Основной метод поиска источников"""
        await self.create_session()
        
        try:
            logger.info("Starting source discovery...")
            all_urls = []
            
            # Поиск по всем запросам
            for query in SEARCH_QUERIES:
                logger.info(f"Searching for: {query}")
                
                # Параллельный поиск в Google и Yandex
                google_task = self.search_google(query)
                yandex_task = self.search_yandex(query)
                
                results = await asyncio.gather(
                    google_task, 
                    yandex_task, 
                    return_exceptions=True
                )
                
                for result in results:
                    if isinstance(result, list):
                        all_urls.extend(result)
                
                # Задержка между запросами
                await asyncio.sleep(2)
            
            # Фильтруем и обрабатываем URL
            unique_urls = list(set(all_urls))
            logger.info(f"Found {len(unique_urls)} unique URLs")
            
            added_count = 0
            for url in unique_urls:
                try:
                    if not self.is_relevant_domain(url):
                        continue
                    
                    domain = urlparse(url).netloc
                    reliability = self.calculate_reliability_score(domain)
                    
                    # Добавляем в БД
                    source_id = db.add_source(
                        url=url,
                        domain=domain,
                        source_type='discovered',
                        reliability_score=reliability
                    )
                    
                    if source_id:
                        added_count += 1
                        self.found_sources.add(domain)
                
                except Exception as e:
                    logger.debug(f"Error processing URL {url}: {e}")
                    continue
            
            logger.info(f"Added {added_count} new sources to database")
            logger.info(f"Total unique domains found: {len(self.found_sources)}")
            
            return added_count
            
        finally:
            await self.close_session()


# Singleton
source_discovery = SourceDiscovery()



























