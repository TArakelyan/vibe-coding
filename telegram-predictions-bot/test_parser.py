"""
Тестовый скрипт для проверки парсера
"""
from parser import PredictionsParser
import json


def main():
    print("🧪 Тестирование парсера прогнозов Sports.ru\n")
    
    parser = PredictionsParser()
    
    # Тест 1: Получение списка прогнозов
    print("1️⃣ Получение списка прогнозов...")
    predictions_list = parser.get_predictions_list()
    
    if predictions_list:
        print(f"✅ Найдено прогнозов: {len(predictions_list)}\n")
        
        # Показываем первые 3
        for i, pred in enumerate(predictions_list[:3], 1):
            print(f"   {i}. {pred['url']}")
            print(f"      Спорт: {pred['sport']}, ID: {pred['id']}\n")
    else:
        print("❌ Не удалось получить список прогнозов\n")
        return
    
    # Тест 2: Парсинг конкретного прогноза
    print("\n2️⃣ Парсинг конкретного прогноза...")
    
    test_url = predictions_list[0]['url']
    print(f"URL: {test_url}\n")
    
    prediction = parser.parse_prediction(test_url)
    
    if prediction:
        print("✅ Прогноз успешно распарсен:\n")
        print(f"Заголовок: {prediction['title']}")
        print(f"Вид спорта: {prediction['sport']}")
        print(f"Турнир: {prediction['tournament']}")
        print(f"Дата матча: {prediction['match_date']}")
        print(f"Партнерская ссылка: {prediction['partner_url']}")
        print(f"\nОписание:\n{prediction['description'][:200]}...")
        
        # Сохраняем полный результат в JSON
        with open('test_prediction.json', 'w', encoding='utf-8') as f:
            json.dump(prediction, f, ensure_ascii=False, indent=2)
        
        print("\n✅ Полный результат сохранен в test_prediction.json")
    else:
        print("❌ Не удалось распарсить прогноз")
    
    # Тест 3: Проверка новых прогнозов
    print("\n3️⃣ Получение новых прогнозов (исключая уже отправленные)...")
    
    # Симулируем уже отправленные прогнозы
    sent_urls = set([predictions_list[0]['url']]) if len(predictions_list) > 0 else set()
    
    new_predictions = parser.get_new_predictions(sent_urls)
    
    if new_predictions:
        print(f"✅ Найдено новых прогнозов: {len(new_predictions)}\n")
        
        for i, pred in enumerate(new_predictions[:3], 1):
            print(f"   {i}. {pred['title'][:60]}...")
            print(f"      Спорт: {pred['sport']}, Турнир: {pred['tournament']}\n")
    else:
        print("ℹ️ Новых прогнозов нет")
    
    print("\n🎉 Тестирование завершено!")


if __name__ == '__main__':
    main()
