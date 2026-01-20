// Определение темной темы
(function() {
    function detectTheme() {
        // Проверяем, находимся ли мы внутри iframe
        const isInIframe = window.self !== window.top;
        
        if (isInIframe) {
            try {
                // Пытаемся получить тему от родителя
                const parentTheme = window.parent.document.documentElement.getAttribute('data-theme');
                if (parentTheme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    return;
                }
            } catch (e) {
                // Если не можем получить доступ к родителю (CORS), используем медиа-запрос
                console.log('Не удалось получить тему родителя, используем медиа-запрос');
            }
        }
        
        // Проверяем системную тему
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }
    
    // Запускаем при загрузке
    detectTheme();
    
    // Слушаем изменения системной темы
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', detectTheme);
    }
})();







