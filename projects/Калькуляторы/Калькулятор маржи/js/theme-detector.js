/**
 * Автоматическое определение темной темы
 * Адаптирует виджет к темной/светлой теме родительской страницы
 */

(function() {
    'use strict';

    function detectParentTheme() {
        try {
            // Проверяем, находимся ли в iframe
            const isInIframe = window.self !== window.top;
            
            if (!isInIframe) {
                return false; // Не в iframe, используем стандартную тему
            }

            const parent = window.parent;
            const parentDoc = parent.document;
            const parentWindow = parent.window;
            
            // Получаем стили родительского документа
            const parentBody = parentDoc.body;
            const parentHtml = parentDoc.documentElement;
            
            // Проверяем различные способы определения темной темы
            
            // 1. Проверяем data-атрибуты
            if (parentHtml.dataset.theme === 'dark' || 
                parentHtml.dataset.colorScheme === 'dark' ||
                parentBody.dataset.theme === 'dark' ||
                parentBody.dataset.colorScheme === 'dark') {
                return true;
            }
            
            // 2. Проверяем CSS классы
            if (parentHtml.classList.contains('dark') ||
                parentHtml.classList.contains('dark-theme') ||
                parentHtml.classList.contains('theme-dark') ||
                parentBody.classList.contains('dark') ||
                parentBody.classList.contains('dark-theme') ||
                parentBody.classList.contains('theme-dark')) {
                return true;
            }
            
            // 3. Проверяем computed styles родительского body
            const parentBodyStyle = parentWindow.getComputedStyle(parentBody);
            const parentBgColor = parentBodyStyle.backgroundColor;
            
            if (parentBgColor && isDarkBackground(parentBgColor)) {
                return true;
            }
            
            // 4. Проверяем computed styles родительского html
            const parentHtmlStyle = parentWindow.getComputedStyle(parentHtml);
            const parentHtmlBgColor = parentHtmlStyle.backgroundColor;
            
            if (parentHtmlBgColor && isDarkBackground(parentHtmlBgColor)) {
                return true;
            }
            
            // 5. Проверяем цвет текста (если текст светлый, то фон темный)
            const parentTextColor = parentBodyStyle.color;
            if (parentTextColor && isLightTextColor(parentTextColor)) {
                return true;
            }
            
        } catch (e) {
            // Если не можем получить доступ к родительскому окну (CORS)
            console.log('Cannot access parent window, using default theme');
        }
        
        return false;
    }

    function isDarkBackground(color) {
        // Парсим RGB значения
        const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (!rgbMatch) return false;
        
        const r = parseInt(rgbMatch[1]);
        const g = parseInt(rgbMatch[2]);
        const b = parseInt(rgbMatch[3]);
        
        // Вычисляем относительную яркость
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        
        // Если яркость меньше 0.5, считаем фон темным
        return luminance < 0.5;
    }

    function isLightTextColor(color) {
        // Парсим RGB значения
        const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (!rgbMatch) return false;
        
        const r = parseInt(rgbMatch[1]);
        const g = parseInt(rgbMatch[2]);
        const b = parseInt(rgbMatch[3]);
        
        // Вычисляем относительную яркость
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        
        // Если яркость больше 0.7, считаем текст светлым
        return luminance > 0.7;
    }

    function applyTheme(isDark) {
        const body = document.body;
        const html = document.documentElement;
        
        if (isDark) {
            body.classList.add('dark-theme');
            html.classList.add('dark-theme');
        } else {
            body.classList.remove('dark-theme');
            html.classList.remove('dark-theme');
        }
    }

    function observeParentTheme() {
        try {
            if (window.self === window.top) {
                return; // Не в iframe
            }

            const parent = window.parent;
            const parentDoc = parent.document;
            
            // Создаем observer для отслеживания изменений в родительском документе
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes' && 
                        (mutation.attributeName === 'class' || 
                         mutation.attributeName === 'data-theme' ||
                         mutation.attributeName === 'data-color-scheme')) {
                        
                        const isDark = detectParentTheme();
                        applyTheme(isDark);
                    }
                });
            });
            
            // Наблюдаем за изменениями атрибутов у html и body
            observer.observe(parentDoc.documentElement, {
                attributes: true,
                attributeFilter: ['class', 'data-theme', 'data-color-scheme']
            });
            
            observer.observe(parentDoc.body, {
                attributes: true,
                attributeFilter: ['class', 'data-theme', 'data-color-scheme']
            });
            
        } catch (e) {
            console.log('Cannot observe parent theme changes');
        }
    }

    function init() {
        // Сначала применяем тему на основе текущего состояния
        const isDark = detectParentTheme();
        applyTheme(isDark);
        
        // Затем начинаем отслеживать изменения
        observeParentTheme();
        
        // Дополнительная проверка через некоторое время
        // (на случай если родительская страница еще загружается)
        setTimeout(() => {
            const isDark = detectParentTheme();
            applyTheme(isDark);
        }, 100);
        
        setTimeout(() => {
            const isDark = detectParentTheme();
            applyTheme(isDark);
        }, 500);
    }

    // Инициализируем при загрузке
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})(); 