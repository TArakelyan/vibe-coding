"""
Telegram-бот: принимает сырую заметку, отдаёт упакованную новость через Google Gemini API.
"""
from __future__ import annotations

import asyncio
import logging
import os
import sys
import threading
from http.server import BaseHTTPRequestHandler, HTTPServer

from telegram import Update
from telegram.ext import Application, CommandHandler, ContextTypes, MessageHandler, filters

import config
import packager

logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO,
)
logger = logging.getLogger(__name__)

TELEGRAM_MAX_MESSAGE = 4096


class _HealthHandler(BaseHTTPRequestHandler):
    def do_GET(self) -> None:
        self.send_response(200)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.end_headers()
        self.wfile.write(b"ok")

    def log_message(self, format: str, *args) -> None:  # noqa: A003
        pass


def _start_health_server() -> None:
    """Render Web Service проверяет PORT; polling сам по себе порт не открывает."""
    port_str = os.environ.get("PORT")
    if not port_str:
        return
    try:
        port = int(port_str)
    except ValueError:
        return

    def serve() -> None:
        server = HTTPServer(("0.0.0.0", port), _HealthHandler)
        server.serve_forever()

    threading.Thread(target=serve, daemon=True).start()
    logger.info("Health-check HTTP слушает порт %s", port)


def split_telegram_chunks(text: str, limit: int = TELEGRAM_MAX_MESSAGE) -> list[str]:
    text = text.strip()
    if not text:
        return []
    chunks: list[str] = []
    rest = text
    while len(rest) > limit:
        cut = rest.rfind("\n\n", 0, limit)
        if cut == -1 or cut < limit // 4:
            cut = rest.rfind(" ", 0, limit)
        if cut <= 0:
            cut = limit
        piece = rest[:cut].strip()
        if piece:
            chunks.append(piece)
        rest = rest[cut:].strip()
    if rest:
        chunks.append(rest)
    return chunks


async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if update.message:
        await update.message.reply_text(
            "Пришлите текст с фактами и коэффициентами — отвечу готовой новостью "
            "в формате Sports.ru (заголовок и текст)."
        )


async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if update.message:
        await update.message.reply_text(
            "Отправьте одно текстовое сообщение с сырыми данными. "
            "Бот вернёт упакованную беттинг-новость по редакционным правилам.\n\n"
            "Команды: /start, /help"
        )


async def text_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if not update.message or not update.message.text:
        return
    raw = update.message.text.strip()
    if not raw:
        await update.message.reply_text("Пришлите непустой текст.")
        return

    await update.message.chat.send_action(action="typing")
    try:
        packed = await asyncio.to_thread(packager.pack_news, raw)
    except ValueError as e:
        await update.message.reply_text(str(e))
        return
    except Exception as e:
        logger.exception("Ошибка упаковки: %s", e)
        await update.message.reply_text(
            "Не удалось получить ответ модели. Проверьте GEMINI_API_KEY и лимиты. "
            "Попробуйте ещё раз позже."
        )
        return

    for chunk in split_telegram_chunks(packed):
        await update.message.reply_text(chunk)


def main() -> None:
    if not config.BOT_TOKEN:
        logger.error("Не задан BOT_TOKEN")
        sys.exit(1)
    if not config.GEMINI_API_KEY:
        logger.error("Не задан GEMINI_API_KEY")
        sys.exit(1)

    application = (
        Application.builder()
        .token(config.BOT_TOKEN)
        .build()
    )
    application.add_handler(CommandHandler("start", start_command))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(
        MessageHandler(filters.TEXT & ~filters.COMMAND, text_handler)
    )

    _start_health_server()
    logger.info("Запуск polling…")
    application.run_polling(allowed_updates=Update.ALL_TYPES, drop_pending_updates=True)


if __name__ == "__main__":
    main()
