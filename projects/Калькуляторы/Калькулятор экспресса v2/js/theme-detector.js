/**
 * Упрощенное автоматическое определение темной темы
 * Проверяет класс body родительской страницы: "dark" или "light"
 */

(function() {
    'use strict';

    // Функция определения темы родительской страницы
    function detectParentTheme() {
        try {
            // Проверяем родительское окно
            if (window.parent && window.parent !== window) {
                const parentDoc = window.parent.document;
                const parentBody = parentDoc.body;
                
                // Проверяем класс body
                if (parentBody.classList.contains('dark')) {
                    return true; // Темная тема
                }
                
                if (parentBody.classList.contains('light')) {
                    return false; // Светлая тема
                }
            }
        } catch (e) {
            // Игнорируем ошибки доступа к родительскому окну (CORS)
            console.log('Cannot access parent window, using light theme as default');
        }
        
        // По умолчанию - светлая тема
        return false;
    }
    
    // Применение темы
    function applyTheme(isDark) {
        const body = document.body;
        
        if (isDark) {
            body.classList.add('dark-theme');
        } else {
            body.classList.remove('dark-theme');
        }
        
        // Отправляем событие для других скриптов
        document.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { isDark }
        }));
    }
    
    // Наблюдатель за изменениями в родительском окне
    function observeParentTheme() {
        try {
            if (window.parent && window.parent !== window) {
                const parentDoc = window.parent.document;
                const parentBody = parentDoc.body;
                
                // MutationObserver для отслеживания изменений классов
                const observer = new MutationObserver(() => {
                    const isDark = detectParentTheme();
                    applyTheme(isDark);
                });
                
                // Наблюдаем только за изменениями атрибута class у body
                observer.observe(parentBody, {
                    attributes: true,
                    attributeFilter: ['class']
                });
            }
        } catch (e) {
            // CORS ограничения - используем только статическое определение
            console.log('CORS restrictions, theme detection disabled');
        }
    }
    
    // Инициализация
    function init() {
        // Первоначальное определение темы
        const isDark = detectParentTheme();
        applyTheme(isDark);
        
        // Запуск наблюдателя за изменениями
        observeParentTheme();
        
        // Дополнительная проверка через короткий интервал для надежности
        setTimeout(() => {
            const quickCheck = detectParentTheme();
            applyTheme(quickCheck);
        }, 100);
    }
    
    // Запуск после загрузки DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Экспорт функций для внешнего использования
    window.ThemeDetector = {
        detectParentTheme,
        applyTheme,
        getCurrentTheme: () => document.body.classList.contains('dark-theme') ? 'dark' : 'light'
    };
    
})(); 