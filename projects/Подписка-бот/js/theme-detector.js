(() => {
    const detectTheme = () => {
        const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    };

    detectTheme();

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', detectTheme);
})(); 