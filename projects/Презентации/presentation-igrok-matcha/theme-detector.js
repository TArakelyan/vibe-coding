// Определение темы сайта и автоматическое переключение

class ThemeDetector {
    constructor() {
        this.theme = 'light';
        this.parentColors = null;
        this.init();
    }

    init() {
        this.detectTheme();
        this.applyTheme();
        this.watchThemeChanges();
        this.adaptToParent();
    }

    // Определение темы различными способами
    detectTheme() {
        // 1. Проверяем localStorage (если пользователь ранее выбрал тему)
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme && !localStorage.getItem('auto-detect')) {
            this.theme = savedTheme;
            return;
        }

        // 2. Анализируем цвета родительского сайта (улучшенный алгоритм)
        const parentAnalysis = this.analyzeParentTheme();
        if (parentAnalysis.confidence > 0.7) {
            this.theme = parentAnalysis.theme;
            this.parentColors = parentAnalysis.colors;
            return;
        }

        // 3. Проверяем тему родительского элемента/сайта
        const parentBg = this.getParentBackgroundColor();
        if (parentBg && this.isDarkColor(parentBg)) {
            this.theme = 'dark';
            return;
        }

        // 4. Проверяем CSS переменные родительского элемента
        const rootStyles = getComputedStyle(document.documentElement);
        const bgColor = rootStyles.getPropertyValue('--bg-color') || 
                       rootStyles.getPropertyValue('--background-color') ||
                       rootStyles.getPropertyValue('background-color');
        
        if (bgColor && bgColor !== 'transparent' && this.isDarkColor(bgColor)) {
            this.theme = 'dark';
            return;
        }

        // 5. Проверяем системные настройки
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.theme = 'dark';
            return;
        }

        // 6. Анализируем цвета элементов на странице
        const pageAnalysis = this.analyzePageColors();
        if (pageAnalysis.isDark) {
            this.theme = 'dark';
            return;
        }

        // По умолчанию светлая тема
        this.theme = 'light';
    }

    // Улучшенный анализ темы родительского сайта
    analyzeParentTheme() {
        const result = {
            theme: 'light',
            confidence: 0,
            colors: {
                background: null,
                text: null,
                primary: null
            }
        };

        try {
            // Пытаемся получить доступ к родительскому документу
            let parentDoc = document;
            if (window.parent && window.parent !== window) {
                try {
                    parentDoc = window.parent.document;
                } catch (e) {
                    // Ограничения CORS, используем другие методы
                }
            }

            // Анализируем body и html элементы
            const elements = [
                parentDoc.body,
                parentDoc.documentElement,
                parentDoc.querySelector('.main'),
                parentDoc.querySelector('#app'),
                parentDoc.querySelector('[class*="content"]')
            ].filter(Boolean);

            let darkScore = 0;
            let lightScore = 0;
            let totalAnalyzed = 0;

            elements.forEach(element => {
                const styles = getComputedStyle(element);
                const bg = styles.backgroundColor;
                const color = styles.color;

                if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
                    totalAnalyzed++;
                    if (this.isDarkColor(bg)) {
                        darkScore += 2;
                        result.colors.background = bg;
                    } else {
                        lightScore += 2;
                    }
                }

                if (color && color !== 'rgba(0, 0, 0, 0)') {
                    totalAnalyzed++;
                    if (this.isDarkColor(color)) {
                        lightScore += 1; // Темный текст = светлая тема
                    } else {
                        darkScore += 1; // Светлый текст = темная тема
                        result.colors.text = color;
                    }
                }
            });

            if (totalAnalyzed > 0) {
                result.confidence = Math.min(totalAnalyzed / 4, 1);
                result.theme = darkScore > lightScore ? 'dark' : 'light';
            }

        } catch (e) {
            console.log('Parent theme analysis failed:', e);
        }

        return result;
    }

    // Получение цвета фона родительского элемента
    getParentBackgroundColor() {
        let element = document.body.parentElement;
        
        while (element && element !== document.documentElement) {
            const styles = getComputedStyle(element);
            const bg = styles.backgroundColor;
            
            if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
                return bg;
            }
            element = element.parentElement;
        }

        // Проверяем body
        const bodyStyles = getComputedStyle(document.body);
        const bodyBg = bodyStyles.backgroundColor;
        
        if (bodyBg && bodyBg !== 'rgba(0, 0, 0, 0)' && bodyBg !== 'transparent') {
            return bodyBg;
        }

        return null;
    }

    // Анализ цветов элементов на странице
    analyzePageColors() {
        const elements = document.querySelectorAll('*');
        let darkElements = 0;
        let lightElements = 0;
        let totalAnalyzed = 0;

        [...elements].slice(0, 50).forEach(element => {
            const styles = getComputedStyle(element);
            const bg = styles.backgroundColor;
            
            if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
                totalAnalyzed++;
                if (this.isDarkColor(bg)) {
                    darkElements++;
                } else {
                    lightElements++;
                }
            }
        });

        return {
            isDark: darkElements > lightElements,
            confidence: totalAnalyzed > 10 ? 0.8 : 0.3
        };
    }

    // Определение темного цвета
    isDarkColor(color) {
        // Преобразуем цвет в RGB
        const rgb = this.colorToRgb(color);
        if (!rgb) return false;

        // Вычисляем относительную яркость
        const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
        return brightness < 128;
    }

    // Преобразование цвета в RGB
    colorToRgb(color) {
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = 1;
        const ctx = canvas.getContext('2d');
        
        try {
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, 1, 1);
            const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
            return { r, g, b };
        } catch (e) {
            // Парсим rgb/rgba вручную
            const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
            if (match) {
                return {
                    r: parseInt(match[1]),
                    g: parseInt(match[2]),
                    b: parseInt(match[3])
                };
            }
        }
        
        return null;
    }

    // Применение темы
    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        
        // Добавляем класс для CSS
        document.body.classList.remove('theme-light', 'theme-dark');
        document.body.classList.add(`theme-${this.theme}`);

        // Сохраняем выбор (если не автоопределение)
        if (!localStorage.getItem('auto-detect')) {
            localStorage.setItem('theme', this.theme);
        }

        // Событие для других скриптов
        window.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme: this.theme, colors: this.parentColors }
        }));
    }

    // Адаптация к родительскому сайту
    adaptToParent() {
        if (this.parentColors) {
            const root = document.documentElement;
            
            if (this.parentColors.background) {
                root.style.setProperty('--parent-bg', this.parentColors.background);
            }
            
            if (this.parentColors.text) {
                root.style.setProperty('--parent-text', this.parentColors.text);
            }
        }
    }

    // Отслеживание изменений темы
    watchThemeChanges() {
        // Отслеживаем изменения системной темы
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addListener(() => {
                if (localStorage.getItem('auto-detect') !== 'false') {
                    this.detectTheme();
                    this.applyTheme();
                }
            });
        }

        // Отслеживаем изменения в localStorage
        window.addEventListener('storage', (e) => {
            if (e.key === 'theme') {
                this.theme = e.newValue || 'light';
                this.applyTheme();
            }
        });

        // Отслеживаем изменения DOM
        const observer = new MutationObserver(() => {
            // Переопределяем тему при изменениях DOM
            setTimeout(() => {
                const newAnalysis = this.analyzeParentTheme();
                if (newAnalysis.confidence > 0.8 && newAnalysis.theme !== this.theme) {
                    this.theme = newAnalysis.theme;
                    this.parentColors = newAnalysis.colors;
                    this.applyTheme();
                    this.adaptToParent();
                }
            }, 100);
        });

        observer.observe(document.body, {
            attributes: true,
            childList: true,
            subtree: true,
            attributeFilter: ['style', 'class']
        });
    }

    // Ручное переключение темы
    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('auto-detect', 'false');
        this.applyTheme();
    }

    // Установка автоопределения
    setAutoDetect(enabled = true) {
        if (enabled) {
            localStorage.setItem('auto-detect', 'true');
            localStorage.removeItem('theme');
            this.detectTheme();
            this.applyTheme();
        } else {
            localStorage.setItem('auto-detect', 'false');
        }
    }

    // Получение текущей темы
    getCurrentTheme() {
        return this.theme;
    }

    // Получение цветов родительского сайта
    getParentColors() {
        return this.parentColors;
    }
}

// Автоматическая инициализация
document.addEventListener('DOMContentLoaded', () => {
    window.themeDetector = new ThemeDetector();
});

// Экспорт для использования в других скриптах
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeDetector;
}