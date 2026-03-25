# sports-news-packager-bot

## Описание

Telegram-бот для редакции Sports.ru: принимает сырую заметку (факты, коэффициенты), возвращает готовую беттинг-новость по фиксированным правилам оформления. Логика и стиль задаются системным промптом в `data/packaging_prompt.txt`; текст обрабатывается через API Anthropic (Claude).

## Возможности

- Команды `/start` и `/help` с краткой инструкцией.
- Любое текстовое сообщение (не команда) отправляется в модель как сырой ввод.
- Ответ разбивается на части, если длиннее лимита Telegram (4096 символов).
- Режим **long polling** — удобен для деплоя на Render Free (как в соседнем проекте прогнозов).

## Переменные окружения

| Переменная | Обязательно | Описание |
|------------|-------------|----------|
| `BOT_TOKEN` | да | Токен бота от @BotFather |
| `ANTHROPIC_API_KEY` | да | Ключ API из [консоли Anthropic](https://console.anthropic.com/) |
| `ANTHROPIC_MODEL` | нет | Модель, по умолчанию `claude-sonnet-4-20250514` |
| `ANTHROPIC_MAX_TOKENS` | нет | Лимит токенов ответа, по умолчанию `8192` |

Скопируйте `.env.example` в `.env` и заполните значения (файл `.env` в git не попадает).

## Локальный запуск

```bash
cd projects/sports-news-packager-bot
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python bot.py
```

## Деплой на Render

1. Создайте **Web Service**, укажите репозиторий.
2. **Root Directory**: `projects/sports-news-packager-bot`.
3. **Build Command**: `pip install -r requirements.txt`.
4. **Start Command**: `python bot.py` (как в `Procfile`: `web: python bot.py`).
5. В **Environment** добавьте секреты `BOT_TOKEN` и `ANTHROPIC_API_KEY`.

Токен и ключ API **не храните в коде** — только в настройках Render.

## Файлы

- `bot.py` — точка входа, Telegram и разбиение длинных ответов.
- `packager.py` — загрузка промпта и вызов Anthropic.
- `config.py` — чтение переменных окружения.
- `data/packaging_prompt.txt` — полный редакционный промпт.
