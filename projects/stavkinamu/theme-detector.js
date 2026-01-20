// Детектор темной темы
(function() {
    'use strict';
    
    // Функция для определения темной темы
    const isDarkTheme = () => {
        // Проверяем системные настройки
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return true;
        }
        
        // Проверяем время суток (с 20:00 до 8:00 - темная тема)
        const hour = new Date().getHours();
        if (hour >= 20 || hour < 8) {
            return true;
        }
        
        return false;
    };
    
    // Применяем темную тему если необходимо
    const applyTheme = () => {
        const root = document.documentElement;
        
        if (isDarkTheme()) {
            root.style.setProperty('--bg-white', '#1a1a1a');
            root.style.setProperty('--bg-light', '#0f0f0f');
            root.style.setProperty('--bg-grey', '#2a2a2a');
            root.style.setProperty('--text-primary', '#ffffff');
            root.style.setProperty('--text-secondary', '#b0b0b0');
            root.style.setProperty('--text-muted', '#808080');
            root.style.setProperty('--border-color', '#333333');
            
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    };
    
    // Применяем тему при загрузке
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyTheme);
    } else {
        applyTheme();
    }
    
    // Отслеживаем изменения системной темы
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);
    }
})();

