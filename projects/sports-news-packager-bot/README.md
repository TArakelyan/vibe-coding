# sports-news-packager-bot

## Описание

Telegram-бот для редакции Sports.ru: принимает сырую заметку (факты, коэффициенты), возвращает готовую беттинг-новость по фиксированным правилам оформления. Логика и стиль задаются системным промптом в `data/packaging_prompt.txt`; текст обрабатывается через **Google Gemini API** (есть бесплатный лимит в [Google AI Studio](https://aistudio.google.com/)).

## Возможности

- Команды `/start` и `/help` с краткой инструкцией.
- Любое текстовое сообщение (не команда) отправляется в модель как сырой ввод.
- Ответ разбивается на части, если длиннее лимита Telegram (4096 символов).
- Режим **long polling** и лёгкий HTTP на `PORT` для проверок Render Web Service.

## Переменные окружения

| Переменная | Обязательно | Описание |
|------------|-------------|----------|
| `BOT_TOKEN` | да | Токен бота от @BotFather |
| `GEMINI_API_KEY` | да | Ключ из [Google AI Studio](https://aistudio.google.com/app/apikey) |
| `GEMINI_MODEL` | нет | По умолчанию `gemini-1.5-flash`; можно указать `gemini-2.0-flash` |
| `GEMINI_MAX_OUTPUT_TOKENS` | нет | По умолчанию `8192` |

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
4. **Start Command**: `python3 bot.py` (как в `Procfile`: `web: python3 bot.py`).
5. В **Environment** добавьте секреты `BOT_TOKEN` и `GEMINI_API_KEY`.

Токен и ключ API **не храните в коде** — только в настройках Render.

## Файлы

- `bot.py` — точка входа, Telegram и разбиение длинных ответов.
- `packager.py` — загрузка промпта и вызов Gemini.
- `config.py` — чтение переменных окружения.
- `data/packaging_prompt.txt` — полный редакционный промпт.
