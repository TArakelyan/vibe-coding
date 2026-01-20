"""
Модуль ML-классификации новостей с использованием NLP
"""
import spacy
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
import pickle
from loguru import logger
from config import NLP_MODEL, KEYWORDS, URGENCY_WEIGHTS
import os


class NewsClassifier:
    def __init__(self):
        self.nlp = None
        self.classifier = None
        self.model_path = 'models/classifier.pkl'
        
        # Загружаем spaCy модель для русского языка
        try:
            self.nlp = spacy.load(NLP_MODEL)
            logger.info(f"Loaded spaCy model: {NLP_MODEL}")
        except Exception as e:
            logger.warning(f"Could not load spaCy model: {e}")
            logger.info("Install with: python -m spacy download ru_core_news_sm")
    
    def extract_entities(self, text: str) -> dict:
        """Извлечь именованные сущности из текста"""
        if not self.nlp:
            return {}
        
        doc = self.nlp(text)
        entities = {
            'organizations': [],
            'persons': [],
            'locations': [],
            'money': [],
            'dates': []
        }
        
        for ent in doc.ents:
            if ent.label_ == 'ORG':
                entities['organizations'].append(ent.text)
            elif ent.label_ == 'PER':
                entities['persons'].append(ent.text)
            elif ent.label_ == 'LOC' or ent.label_ == 'GPE':
                entities['locations'].append(ent.text)
            elif ent.label_ == 'MONEY':
                entities['money'].append(ent.text)
            elif ent.label_ == 'DATE':
                entities['dates'].append(ent.text)
        
        return entities
    
    def analyze_sentiment(self, text: str) -> float:
        """Простой анализ тональности (позитивная/негативная)"""
        # Простая эвристика на основе ключевых слов
        positive_words = ['рост', 'увеличение', 'успех', 'прибыль', 'развитие', 'новый']
        negative_words = ['штраф', 'блокировка', 'арест', 'суд', 'проблема', 'кризис', 'снижение']
        
        text_lower = text.lower()
        
        positive_count = sum(1 for word in positive_words if word in text_lower)
        negative_count = sum(1 for word in negative_words if word in text_lower)
        
        if positive_count + negative_count == 0:
            return 0.0  # Нейтральная
        
        sentiment = (positive_count - negative_count) / (positive_count + negative_count)
        return sentiment
    
    def calculate_enhanced_urgency(self, text: str, category: str, base_urgency: float) -> float:
        """Рассчитать улучшенную срочность с учетом контекста"""
        urgency = base_urgency
        text_lower = text.lower()
        
        # Критические слова повышают срочность
        critical_words = {
            'срочно': 2.0,
            'кризис': 2.0,
            'арест': 1.5,
            'блокировка': 1.5,
            'запрет': 1.5,
            'суд': 1.0,
            'штраф': 1.0,
            'закон': 1.0,
            'налог': 0.5,
        }
        
        for word, boost in critical_words.items():
            if word in text_lower:
                urgency = min(10.0, urgency + boost)
        
        # Анализ тональности
        sentiment = self.analyze_sentiment(text)
        if sentiment < -0.5:  # Очень негативная новость
            urgency = min(10.0, urgency + 1.0)
        
        # Извлекаем сущности
        entities = self.extract_entities(text)
        
        # Если упоминаются крупные организации или много денег
        if len(entities['organizations']) > 2 or entities['money']:
            urgency = min(10.0, urgency + 0.5)
        
        return round(urgency, 1)
    
    def train_classifier(self, training_data: list):
        """Обучить классификатор на размеченных данных"""
        if not training_data:
            logger.warning("No training data provided")
            return
        
        texts = [item['text'] for item in training_data]
        labels = [item['category'] for item in training_data]
        
        # Создаем pipeline с TF-IDF и Naive Bayes
        self.classifier = Pipeline([
            ('tfidf', TfidfVectorizer(max_features=1000, ngram_range=(1, 2))),
            ('clf', MultinomialNB())
        ])
        
        self.classifier.fit(texts, labels)
        
        # Сохраняем модель
        os.makedirs('models', exist_ok=True)
        with open(self.model_path, 'wb') as f:
            pickle.dump(self.classifier, f)
        
        logger.info(f"Classifier trained on {len(training_data)} samples")
    
    def load_classifier(self):
        """Загрузить обученный классификатор"""
        if os.path.exists(self.model_path):
            with open(self.model_path, 'rb') as f:
                self.classifier = pickle.load(f)
            logger.info("Classifier loaded from file")
            return True
        return False
    
    def predict_category(self, text: str) -> str:
        """Предсказать категорию новости"""
        if self.classifier:
            try:
                prediction = self.classifier.predict([text])[0]
                return prediction
            except Exception as e:
                logger.error(f"Error predicting category: {e}")
        
        # Fallback на простую эвристику
        return self._simple_category_detection(text)
    
    def _simple_category_detection(self, text: str) -> str:
        """Простое определение категории по ключевым словам"""
        text_lower = text.lower()
        category_scores = {}
        
        for category, words in KEYWORDS.items():
            score = sum(1 for word in words if word.lower() in text_lower)
            if score > 0:
                category_scores[category] = score
        
        if category_scores:
            return max(category_scores, key=category_scores.get)
        
        return 'market'  # По умолчанию
    
    def analyze_news(self, title: str, snippet: str, content: str = '') -> dict:
        """Комплексный анализ новости"""
        full_text = f"{title} {snippet} {content}"
        
        # Предсказываем категорию
        category = self.predict_category(full_text)
        
        # Базовая срочность
        base_urgency = URGENCY_WEIGHTS.get(category, 5.0)
        
        # Улучшенная срочность
        urgency = self.calculate_enhanced_urgency(full_text, category, base_urgency)
        
        # Извлекаем сущности
        entities = self.extract_entities(full_text)
        
        # Анализ тональности
        sentiment = self.analyze_sentiment(full_text)
        
        return {
            'category': category,
            'urgency_score': urgency,
            'entities': entities,
            'sentiment': sentiment,
            'has_critical_info': urgency >= 8.0,
        }


# Singleton
ml_classifier = NewsClassifier()

# Попытка загрузить предобученную модель
ml_classifier.load_classifier()



























