"""
Handlers package for betting bot
"""

from . import basic, publish, admin

def register_all_handlers(dp):
    """Регистрация всех обработчиков"""
    basic.register_handlers(dp)
    publish.register_handlers(dp)
    admin.register_handlers(dp)

__all__ = ['register_all_handlers']
