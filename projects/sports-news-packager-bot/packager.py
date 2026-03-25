"""
Вызов Anthropic API для упаковки сырой заметки в новость по правилам Sports.ru.
"""
from __future__ import annotations

import logging
from pathlib import Path

import anthropic

import config

logger = logging.getLogger(__name__)

_ROOT = Path(__file__).resolve().parent
_PROMPT_PATH = _ROOT / "data" / "packaging_prompt.txt"

_client: anthropic.Anthropic | None = None
_system_prompt_cache: str | None = None


def _get_client() -> anthropic.Anthropic:
    global _client
    if _client is None:
        _client = anthropic.Anthropic(api_key=config.ANTHROPIC_API_KEY)
    return _client


def load_system_prompt() -> str:
    global _system_prompt_cache
    if _system_prompt_cache is None:
        _system_prompt_cache = _PROMPT_PATH.read_text(encoding="utf-8")
    return _system_prompt_cache


def pack_news(raw_input: str) -> str:
    """Возвращает текст ответа модели (Заголовок / Текст)."""
    raw = (raw_input or "").strip()
    if not raw:
        raise ValueError("Пустой ввод")

    system = load_system_prompt()
    user_message = (
        "Ниже сырые данные для упаковки. Ответь только в требуемом формате "
        "(строки «Заголовок:» и «Текст:», без HTML).\n\n"
        f"{raw}"
    )

    client = _get_client()
    message = client.messages.create(
        model=config.ANTHROPIC_MODEL,
        max_tokens=config.ANTHROPIC_MAX_TOKENS,
        system=system,
        messages=[{"role": "user", "content": user_message}],
    )

    parts: list[str] = []
    for block in message.content:
        if block.type == "text":
            parts.append(block.text)
    result = "\n".join(parts).strip()
    if not result:
        logger.warning("Пустой ответ модели")
        raise RuntimeError("Модель вернула пустой ответ")
    return result
