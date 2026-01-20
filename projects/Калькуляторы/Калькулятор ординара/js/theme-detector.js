/**
 * Автоматическое определение темной темы
 * Адаптирует виджет к темной/светлой теме родительской страницы
 */

(function() {
    'use strict';

    // Функция определения темы родительской страницы
    function detectParentTheme() {
        try {
            if (window.parent && window.parent !== window) {
                const parentDoc = window.parent.document;
                const parentBody = parentDoc.body;
                const parentHtml = parentDoc.documentElement;
                
                // Проверяем классы темной темы
                const darkThemeClasses = [
                    'dark', 'dark-theme', 'theme-dark', 
                    'dark-mode', 'night', 'night-mode'
                ];
                
                const isDarkClass = darkThemeClasses.some(className => 
                    parentBody.classList.contains(className) || 
                    parentHtml.classList.contains(className)
                );
                
                // Проверяем CSS переменные или стили
                const bodyStyles = window.parent.getComputedStyle(parentBody);
                const bgColor = bodyStyles.backgroundColor;
                
                // Определяем темность по цвету фона
                const isDarkBg = isDarkBackground(bgColor);
                
                // Проверяем data-атрибуты
                const isDarkData = parentBody.dataset.theme === 'dark' || 
                                  parentHtml.dataset.theme === 'dark' ||
                                  parentBody.dataset.colorScheme === 'dark' ||
                                  parentHtml.dataset.colorScheme === 'dark';
                
                return isDarkClass || isDarkBg || isDarkData;
            }
        } catch (e) {
            // Игнорируем ошибки доступа к родительскому окну (CORS)
            console.log('Cannot access parent window, using system preference');
        }
        
        // Fallback: используем системные настройки
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    // Функция определения темности цвета фона
    function isDarkBackground(color) {
        if (!color || color === 'transparent' || color === 'rgba(0, 0, 0, 0)') {
            return false;
        }
        
        // Парсим RGB цвет
        const rgb = color.match(/\d+/g);
        if (!rgb || rgb.length < 3) return false;
        
        const [r, g, b] = rgb.map(Number);
        
        // Вычисляем яркость (luminance)
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b);
        
        // Если яркость меньше 128, считаем фон темным
        return luminance < 128;
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
        if (window.parent && window.parent !== window) {
            try {
                const parentDoc = window.parent.document;
                
                // MutationObserver для отслеживания изменений классов
                const observer = new MutationObserver(() => {
                    const isDark = detectParentTheme();
                    applyTheme(isDark);
                });
                
                observer.observe(parentDoc.body, {
                    attributes: true,
                    attributeFilter: ['class', 'data-theme', 'data-color-scheme']
                });
                
                observer.observe(parentDoc.documentElement, {
                    attributes: true,
                    attributeFilter: ['class', 'data-theme', 'data-color-scheme']
                });
                
            } catch (e) {
                // CORS ограничения - используем только системные настройки
                console.log('CORS restrictions, using system theme only');
            }
        }
    }
    
    // Инициализация
    function init() {
        // Первоначальное определение темы
        const isDark = detectParentTheme();
        applyTheme(isDark);
        
        // Запуск наблюдателя
        observeParentTheme();
        
        // Слушаем изменения системных настроек
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', (e) => {
            // Переопределяем тему только если не можем получить тему родителя
            try {
                if (!window.parent || window.parent === window) {
                    applyTheme(e.matches);
                }
            } catch (err) {
                applyTheme(e.matches);
            }
        });
        
        // Дополнительная проверка через интервал (для случаев медленной загрузки)
        let checkCount = 0;
        const intervalCheck = setInterval(() => {
            checkCount++;
            const currentIsDark = detectParentTheme();
            applyTheme(currentIsDark);
            
            // Останавливаем после 10 проверок (5 секунд)
            if (checkCount >= 10) {
                clearInterval(intervalCheck);
            }
        }, 500);
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