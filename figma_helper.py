#!/usr/bin/env python3
"""
Figma API Helper
Использование: python figma_helper.py [file_id] [node_id]
"""

import sys
import json
import urllib.request
import urllib.parse

FIGMA_TOKEN = 'figd_KuMWwJhQFHbvwuqjVMaG_F0Eo1shno_fAPpOWf-N'

def make_figma_request(url):
    """Выполняет запрос к Figma API"""
    try:
        req = urllib.request.Request(url)
        req.add_header('X-Figma-Token', FIGMA_TOKEN)
        
        with urllib.request.urlopen(req) as response:
            data = response.read().decode('utf-8')
            return json.loads(data)
    except Exception as e:
        print(f"❌ Ошибка запроса: {e}")
        return None

def get_figma_file(file_id, node_id=None):
    """Получает данные файла или узла из Figma"""
    if node_id:
        url = f"https://api.figma.com/v1/files/{file_id}/nodes?ids={node_id}"
    else:
        url = f"https://api.figma.com/v1/files/{file_id}"
    
    return make_figma_request(url)

def export_figma_image(file_id, node_id, format='png', scale=2):
    """Экспортирует изображение из Figma"""
    url = f"https://api.figma.com/v1/images/{file_id}?ids={node_id}&format={format}&scale={scale}"
    return make_figma_request(url)

def analyze_figma_structure(data, level=0):
    """Анализирует структуру Figma файла"""
    indent = "  " * level
    
    if isinstance(data, dict):
        if 'name' in data and 'type' in data:
            node_info = f"{indent}📄 {data['type']}: {data['name']}"
            if 'id' in data:
                node_info += f" (ID: {data['id']})"
            print(node_info)
            
            if 'children' in data:
                for child in data['children']:
                    analyze_figma_structure(child, level + 1)

def main():
    """Основная функция"""
    args = sys.argv[1:]
    file_id = args[0] if args else 'xMgRBJN5wvmvB7s0miwHmM'
    node_id = args[1] if len(args) > 1 else None
    
    print(f"🔍 Анализируем Figma файл: {file_id}")
    
    if node_id:
        print(f"🎯 Узел: {node_id}")
        
        # Получаем данные узла
        node_data = get_figma_file(file_id, node_id)
        if node_data:
            print("📄 Данные узла:")
            print(json.dumps(node_data, indent=2, ensure_ascii=False))
            
            # Экспортируем изображение
            print("\n🖼️  Экспортируем изображение...")
            image_data = export_figma_image(file_id, node_id)
            if image_data and 'images' in image_data:
                image_url = image_data['images'].get(node_id)
                if image_url:
                    print(f"🔗 Ссылка на изображение: {image_url}")
                else:
                    print("❌ Не удалось получить ссылку на изображение")
    else:
        # Получаем весь файл
        file_data = get_figma_file(file_id)
        if file_data:
            print(f"📁 Файл: {file_data.get('name', 'Без названия')}")
            print(f"📅 Версия: {file_data.get('version', 'Неизвестно')}")
            print(f"📊 Последнее изменение: {file_data.get('lastModified', 'Неизвестно')}")
            
            if 'document' in file_data:
                print("\n📋 Структура:")
                analyze_figma_structure(file_data['document'])

if __name__ == '__main__':
    main()














































































