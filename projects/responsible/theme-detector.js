// Определение темной темы
(function() {
    function detectTheme() {
        try {
            const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            if (isDark) {
                document.body.style.background = 'linear-gradient(to bottom, rgb(6, 78, 59), rgb(17, 24, 39))';
                document.body.style.color = '#f9fafb';
            }
        } catch (e) {
            console.log('Theme detection not available');
        }
    }
    
    detectTheme();
    
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', detectTheme);
    }
})();
