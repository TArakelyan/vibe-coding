"""
Скрипт для локальной настройки без Docker
"""
import os
import sys
import subprocess
from loguru import logger


def check_python_version():
    """Проверка версии Python"""
    if sys.version_info < (3, 9):
        logger.error("Python 3.9+ required")
        return False
    logger.info(f"✓ Python {sys.version_info.major}.{sys.version_info.minor}")
    return True


def install_dependencies():
    """Установка зависимостей"""
    logger.info("Installing Python dependencies...")
    try:
        subprocess.run([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"], check=True)
        logger.info("✓ Dependencies installed")
        return True
    except subprocess.CalledProcessError:
        logger.error("✗ Failed to install dependencies")
        return False


def download_spacy_model():
    """Загрузка spaCy модели для русского языка"""
    logger.info("Downloading spaCy Russian model...")
    try:
        subprocess.run([sys.executable, "-m", "spacy", "download", "ru_core_news_sm"], check=True)
        logger.info("✓ spaCy model downloaded")
        return True
    except subprocess.CalledProcessError:
        logger.warning("⚠ Failed to download spaCy model (optional)")
        return False


def create_env_file():
    """Создание .env файла"""
    if os.path.exists('.env'):
        logger.info("✓ .env file already exists")
        return True
    
    logger.info("Creating .env file from example...")
    try:
        with open('.env.example', 'r') as src:
            with open('.env', 'w') as dst:
                dst.write(src.read())
        logger.info("✓ .env file created")
        logger.warning("⚠ Please configure .env file with your settings!")
        return True
    except Exception as e:
        logger.error(f"✗ Failed to create .env file: {e}")
        return False


def create_directories():
    """Создание необходимых директорий"""
    directories = ['logs', 'models']
    for directory in directories:
        os.makedirs(directory, exist_ok=True)
        logger.info(f"✓ Created directory: {directory}")


def check_postgresql():
    """Проверка PostgreSQL"""
    logger.info("Checking PostgreSQL...")
    try:
        result = subprocess.run(['psql', '--version'], capture_output=True, text=True)
        if result.returncode == 0:
            logger.info(f"✓ {result.stdout.strip()}")
            return True
    except FileNotFoundError:
        pass
    
    logger.warning("⚠ PostgreSQL not found. Please install it:")
    logger.warning("  Ubuntu/Debian: sudo apt-get install postgresql")
    logger.warning("  macOS: brew install postgresql")
    logger.warning("  Windows: https://www.postgresql.org/download/windows/")
    return False


def check_redis():
    """Проверка Redis"""
    logger.info("Checking Redis...")
    try:
        result = subprocess.run(['redis-cli', '--version'], capture_output=True, text=True)
        if result.returncode == 0:
            logger.info(f"✓ {result.stdout.strip()}")
            return True
    except FileNotFoundError:
        pass
    
    logger.warning("⚠ Redis not found. Please install it:")
    logger.warning("  Ubuntu/Debian: sudo apt-get install redis-server")
    logger.warning("  macOS: brew install redis")
    logger.warning("  Windows: https://redis.io/docs/getting-started/installation/install-redis-on-windows/")
    return False


def main():
    """Главная функция установки"""
    logger.info("=" * 60)
    logger.info("BETTING NEWS PARSER - Local Setup")
    logger.info("=" * 60)
    
    # Проверки
    if not check_python_version():
        sys.exit(1)
    
    # Установка
    create_directories()
    create_env_file()
    
    if not install_dependencies():
        sys.exit(1)
    
    download_spacy_model()
    
    # Проверка внешних зависимостей
    has_postgres = check_postgresql()
    has_redis = check_redis()
    
    logger.info("")
    logger.info("=" * 60)
    logger.info("Setup completed!")
    logger.info("=" * 60)
    
    if not has_postgres or not has_redis:
        logger.info("")
        logger.warning("Some optional dependencies are missing.")
        logger.warning("You can still use Docker: docker-compose up -d")
    else:
        logger.info("")
        logger.info("Next steps:")
        logger.info("1. Configure .env file with your settings")
        logger.info("2. Create PostgreSQL database: createdb betting_news")
        logger.info("3. Initialize database: psql betting_news < init_db.sql")
        logger.info("4. Start Redis: redis-server")
        logger.info("5. Run parser: python main.py")
        logger.info("6. Run dashboard: python dashboard.py")


if __name__ == '__main__':
    main()



























