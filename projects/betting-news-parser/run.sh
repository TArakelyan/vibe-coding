#!/bin/bash

# Скрипт быстрого запуска парсера

echo "🚀 Starting Betting News Parser..."

# Проверка .env файла
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from example..."
    cp .env.example .env
    echo "Please configure .env file with your settings!"
    exit 1
fi

# Проверка Docker
if ! command -v docker-compose &> /dev/null; then
    echo "❌ docker-compose not found. Please install Docker."
    exit 1
fi

# Останавливаем старые контейнеры
echo "🛑 Stopping old containers..."
docker-compose down

# Собираем образы
echo "🔨 Building Docker images..."
docker-compose build

# Запускаем контейнеры
echo "▶️  Starting containers..."
docker-compose up -d

# Ждем запуска БД
echo "⏳ Waiting for database..."
sleep 10

# Проверяем статус
echo ""
echo "✅ Containers status:"
docker-compose ps

echo ""
echo "🎉 Parser started successfully!"
echo ""
echo "📊 Dashboard: http://localhost"
echo "📝 Logs: docker-compose logs -f parser"
echo "🛑 Stop: docker-compose down"
echo ""



























