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

        // 5. Проверяем body элемент
        const bodyBg = getComputedStyle(document.body).backgroundColor;
        if (bodyBg && bodyBg !== 'rgba(0, 0, 0, 0)' && this.isDarkColor(bodyBg)) {
            this.theme = 'dark';
            return;
        }

        // 6. Проверяем цвет текста (если темный текст, то светлая тема)
        const bodyColor = getComputedStyle(document.body).color;
        if (bodyColor && this.isDarkColor(bodyColor)) {
            this.theme = 'light';  // Темный текст = светлая тема
            return;
        } else if (bodyColor && !this.isDarkColor(bodyColor)) {
            this.theme = 'dark';   // Светлый текст = темная тема
            return;
        }

        // 7. Проверяем системные настройки
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.theme = 'dark';
            return;
        }

        // 8. Проверяем по времени (опционально - темная тема вечером/ночью)
        const hour = new Date().getHours();
        if (hour >= 22 || hour <= 6) {
            this.theme = 'dark';
            return;
        }

        // По умолчанию светлая тема
        this.theme = 'light';
    }

    // Анализ темы родительского сайта
    analyzeParentTheme() {
        const analysis = {
            theme: 'light',
            confidence: 0,
            colors: {}
        };

        try {
            // Проверяем различные элементы родительского сайта
            const elements = [
                document.body,
                document.body.parentElement,
                document.documentElement,
                document.querySelector('header'),
                document.querySelector('main'),
                document.querySelector('.container'),
                document.querySelector('.content')
            ].filter(el => el);

            let darkIndicators = 0;
            let lightIndicators = 0;
            let totalElements = 0;

            elements.forEach(element => {
                if (!element) return;
                
                const styles = getComputedStyle(element);
                const bg = styles.backgroundColor;
                const color = styles.color;
                
                totalElements++;
                
                // Анализируем фон
                if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
                    if (this.isDarkColor(bg)) {
                        darkIndicators++;
                        analysis.colors.background = bg;
                    } else {
                        lightIndicators++;
                    }
                }
                
                // Анализируем цвет текста
                if (color && color !== 'rgba(0, 0, 0, 0)') {
                    if (this.isDarkColor(color)) {
                        lightIndicators++; // Темный текст = светлая тема
                    } else {
                        darkIndicators++; // Светлый текст = темная тема
                        analysis.colors.text = color;
                    }
                }
            });

            // Определяем тему на основе анализа
            if (totalElements > 0) {
                const darkRatio = darkIndicators / (darkIndicators + lightIndicators);
                
                if (darkRatio > 0.6) {
                    analysis.theme = 'dark';
                    analysis.confidence = Math.min(darkRatio, 0.9);
                } else if (darkRatio < 0.4) {
                    analysis.theme = 'light';
                    analysis.confidence = Math.min(1 - darkRatio, 0.9);
                } else {
                    analysis.confidence = 0.3; // Низкая уверенность при неопределенности
                }
            }

        } catch (error) {
            console.warn('Theme analysis error:', error);
        }

        return analysis;
    }

    // Проверка, является ли цвет темным
    isDarkColor(color) {
        if (!color || color === 'transparent') return false;

        // Конвертируем цвет в RGB
        const rgb = this.getRGBValues(color);
        if (!rgb) return false;

        // Вычисляем яркость (luminance) по формуле WCAG
        const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
        
        // Если яркость меньше 0.5, считаем цвет темным
        return luminance < 0.5;
    }

    // Извлечение RGB значений из строки цвета
    getRGBValues(color) {
        // Создаем временный элемент для получения вычисленного цвета
        const tempElement = document.createElement('div');
        tempElement.style.color = color;
        document.body.appendChild(tempElement);
        
        const computedColor = getComputedStyle(tempElement).color;
        document.body.removeChild(tempElement);

        // Парсим rgb(r, g, b) или rgba(r, g, b, a)
        const match = computedColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (match) {
            return {
                r: parseInt(match[1], 10),
                g: parseInt(match[2], 10),
                b: parseInt(match[3], 10)
            };
        }

        return null;
    }

    // Получение фонового цвета родительского элемента
    getParentBackgroundColor() {
        let element = document.body.parentElement || document.documentElement;
        
        while (element) {
            const style = getComputedStyle(element);
            const bg = style.backgroundColor;
            
            if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
                return bg;
            }
            
            element = element.parentElement;
        }
        
        return null;
    }

    // Адаптация к родительскому сайту
    adaptToParent() {
        if (this.parentColors) {
            const root = document.documentElement;
            
            // Применяем цвета родительского сайта
            if (this.parentColors.background) {
                root.style.setProperty('--parent-bg', this.parentColors.background);
            }
            
            if (this.parentColors.text) {
                root.style.setProperty('--parent-text', this.parentColors.text);
            }
        }

        // Добавляем класс для адаптации
        document.body.classList.add('adapt-to-parent');
    }

    // Применение темы
    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        document.body.classList.toggle('dark-theme', this.theme === 'dark');
        
        // Сохраняем выбор, только если он был сделан вручную
        if (!localStorage.getItem('auto-detect')) {
            localStorage.setItem('theme', this.theme);
        }

        // Добавляем информацию о теме в консоль для отладки
        console.log(`🎨 Theme detected: ${this.theme}`, {
            parentColors: this.parentColors,
            confidence: this.lastAnalysis?.confidence
        });
    }

    // Отслеживание изменений темы
    watchThemeChanges() {
        // Отслеживаем изменения системной темы
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', () => {
                if (localStorage.getItem('auto-detect') !== 'false') {
                    this.detectTheme();
                    this.applyTheme();
                }
            });
        }

        // Отслеживаем изменения в DOM (если сайт динамически меняет тему)
        const observer = new MutationObserver(() => {
            if (localStorage.getItem('auto-detect') !== 'false') {
                setTimeout(() => {
                    const currentTheme = this.theme;
                    this.detectTheme();
                    
                    if (currentTheme !== this.theme) {
                        this.applyTheme();
                    }
                }, 100); // Небольшая задержка для стабильности
            }
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['class', 'data-theme', 'style'],
            subtree: false
        });

        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['class', 'data-theme', 'style'],
            subtree: false
        });

        // Периодическая проверка изменений темы родительского сайта
        setInterval(() => {
            if (localStorage.getItem('auto-detect') !== 'false') {
                const currentTheme = this.theme;
                this.detectTheme();
                
                if (currentTheme !== this.theme) {
                    this.applyTheme();
                }
            }
        }, 5000); // Проверяем каждые 5 секунд
    }

    // Ручное переключение темы
    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        this.applyTheme();
        localStorage.setItem('auto-detect', 'false'); // Отключаем автоопределение
        localStorage.setItem('theme-manual', 'true');
    }

    // Установка конкретной темы
    setTheme(theme) {
        if (theme === 'dark' || theme === 'light') {
            this.theme = theme;
            this.applyTheme();
            localStorage.setItem('auto-detect', 'false');
            localStorage.setItem('theme-manual', 'true');
        }
    }

    // Получение текущей темы
    getCurrentTheme() {
        return this.theme;
    }

    // Сброс к автоматическому определению
    resetToAuto() {
        localStorage.removeItem('theme');
        localStorage.removeItem('theme-manual');
        localStorage.setItem('auto-detect', 'true');
        this.detectTheme();
        this.applyTheme();
    }

    // Включить автоматическое определение
    enableAutoDetect() {
        localStorage.setItem('auto-detect', 'true');
        localStorage.removeItem('theme-manual');
        this.detectTheme();
        this.applyTheme();
    }

    // Отключить автоматическое определение
    disableAutoDetect() {
        localStorage.setItem('auto-detect', 'false');
    }
}

// Инициализация детектора темы
const themeDetector = new ThemeDetector();

// Экспорт для использования в других скриптах
window.themeDetector = themeDetector;