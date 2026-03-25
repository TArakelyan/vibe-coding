"""
Вызов Google Gemini API для упаковки сырой заметки в новость по правилам Sports.ru.
"""
from __future__ import annotations

import logging
from pathlib import Path

import google.generativeai as genai

import config

logger = logging.getLogger(__name__)

_ROOT = Path(__file__).resolve().parent
_PROMPT_PATH = _ROOT / "data" / "packaging_prompt.txt"

_model: genai.GenerativeModel | None = None
_system_prompt_cache: str | None = None


def load_system_prompt() -> str:
    global _system_prompt_cache
    if _system_prompt_cache is None:
        _system_prompt_cache = _PROMPT_PATH.read_text(encoding="utf-8")
    return _system_prompt_cache


def _get_model() -> genai.GenerativeModel:
    global _model
    if _model is None:
        genai.configure(api_key=config.GEMINI_API_KEY)
        _model = genai.GenerativeModel(
            model_name=config.GEMINI_MODEL,
            system_instruction=load_system_prompt(),
        )
    return _model


def _response_text(response) -> str:
    try:
        t = (response.text or "").strip()
        if t:
            return t
    except ValueError:
        pass
    parts: list[str] = []
    if response.candidates:
        for cand in response.candidates:
            if not cand.content or not cand.content.parts:
                continue
            for part in cand.content.parts:
                if hasattr(part, "text") and part.text:
                    parts.append(part.text)
    return "\n".join(parts).strip()


def pack_news(raw_input: str) -> str:
    """Возвращает текст ответа модели (Заголовок / Текст)."""
    raw = (raw_input or "").strip()
    if not raw:
        raise ValueError("Пустой ввод")

    user_message = (
        "Ниже сырые данные для упаковки. Ответь только в требуемом формате "
        "(строки «Заголовок:» и «Текст:», без HTML).\n\n"
        f"{raw}"
    )

    model = _get_model()
    response = model.generate_content(
        user_message,
        generation_config={
            "max_output_tokens": config.GEMINI_MAX_OUTPUT_TOKENS,
            "temperature": 0.35,
        },
    )

    result = _response_text(response)
    if not result:
        logger.warning("Пустой или заблокированный ответ Gemini")
        raise RuntimeError(
            "Модель вернула пустой ответ (возможен фильтр безопасности). "
            "Попробуйте сократить или переформулировать вход."
        )
    return result
