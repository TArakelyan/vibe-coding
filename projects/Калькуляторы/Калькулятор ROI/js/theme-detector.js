// Определение темной темы
(function() {
    function detectTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }

    // Начальное определение темы
    detectTheme();

    // Слушаем изменения темы
    window.matchMedia('(prefers-color-scheme: dark)').addListener(detectTheme);
})(); 