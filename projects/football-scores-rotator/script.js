class FootballScoresRotator {
    constructor() {
        this.images = [
            'https://dumpster.cdn.sports.ru/8/36/f58dbbbb786e45f9fde0e23584841.png',
            'https://dumpster.cdn.sports.ru/3/10/82ee10992abdc6e548d06824e984b.png',
            'https://dumpster.cdn.sports.ru/5/51/c377987787976a7a3d2173e2103e9.png',
            'https://dumpster.cdn.sports.ru/2/5d/bc6b862f2c0198e3165ed9c61385b.png',
            'https://dumpster.cdn.sports.ru/9/4d/94ae49a33018c7f08dc089d64e99f.png'
        ];
        
        this.imageTexts = [
            {
                title: "«Бавария» одержит девятую победу подряд",
                description: ""
            },
            {
                title: "Харри Кейн забьет «Байеру» в третьем матче подряд",
                description: ""
            },
            {
                title: "Леверкузен прервет 14-матчевую беспроигрышную серию «Баварии»",
                description: ""
            },
            {
                title: "Ману Нойер впервые за эту осень пропустит больше одного мяча",
                description: ""
            },
            {
                title: "Вновь унылые 0:0, как и в февральском матче между командами",
                description: ""
            }
        ];
        
        this.currentImageIndex = 0;
        this.isSpinning = false;
        this.spinInterval = null;
        this.slowdownTimeout = null;
        
        this.initElements();
        this.bindEvents();
        this.preloadImages();
    }
    
    initElements() {
        this.imageElement = document.getElementById('current-image');
        this.spinButton = document.getElementById('spin-button');
        this.winlineButton = document.getElementById('winline-button');
        this.statusText = document.getElementById('status-text');
        this.textElement = document.getElementById('image-text');
        this.titleElement = document.querySelector('.match-title');
        this.descriptionElement = document.querySelector('.match-description');
        
        // Устанавливаем начальный текст
        this.updateText();
    }
    
    bindEvents() {
        this.spinButton.addEventListener('click', () => this.startSpin());
        this.winlineButton.addEventListener('click', () => this.goToWinline());
    }
    
    preloadImages() {
        // Предзагружаем все изображения для плавной смены
        this.images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    startSpin() {
        if (this.isSpinning) return;
        
        this.isSpinning = true;
        this.spinButton.disabled = true;
        this.spinButton.classList.remove('pulse');
        this.winlineButton.classList.add('hidden');
        this.winlineButton.classList.remove('fade-in');
        
        this.imageElement.classList.add('spinning');
        
        // Быстрая ротация каждые 160мс
        this.spinInterval = setInterval(() => {
            this.nextImage();
            // Добавляем плавное появление нового изображения
            this.imageElement.style.opacity = '0';
            setTimeout(() => {
                this.imageElement.style.opacity = '1';
            }, 10);
        }, 160);
        
        // Через случайное время (3-4 секунды) начинаем замедление
        const spinDuration = 3000 + Math.random() * 1000;
        
        this.slowdownTimeout = setTimeout(() => {
            this.startSlowdown();
        }, spinDuration);
    }
    
    startSlowdown() {
        clearInterval(this.spinInterval);
        this.imageElement.classList.remove('spinning');
        this.imageElement.classList.add('slowing');
        
        // Замедляющаяся ротация с большим количеством шагов
        let slowdownSteps = [100, 120, 150, 200, 250, 300, 400, 500, 700, 900];
        let stepIndex = 0;
        
        const slowdownStep = () => {
            if (stepIndex < slowdownSteps.length) {
                this.nextImage();
                // Добавляем плавное появление нового изображения
                this.imageElement.style.opacity = '0';
                setTimeout(() => {
                    this.imageElement.style.opacity = '1';
                }, 10);
                setTimeout(slowdownStep, slowdownSteps[stepIndex]);
                stepIndex++;
            } else {
                this.stopSpin();
            }
        };
        
        setTimeout(slowdownStep, 100);
    }
    
    stopSpin() {
        this.isSpinning = false;
        this.imageElement.classList.remove('slowing');
        
        // Выбираем случайное финальное изображение
        const randomIndex = Math.floor(Math.random() * this.images.length);
        this.currentImageIndex = randomIndex;
        this.imageElement.src = this.images[this.currentImageIndex];
        this.updateText();
        
        // Финальная анимация
        this.imageElement.style.transform = 'scale(1.05)';
        this.imageElement.style.filter = 'brightness(1.4) contrast(1.3) saturate(1.3)';
        
        setTimeout(() => {
            this.imageElement.style.transform = 'scale(1)';
            this.imageElement.style.filter = 'brightness(1.1) contrast(1.1)';
        }, 500);
        
        // Показываем кнопку Winline
        setTimeout(() => {
            this.winlineButton.classList.remove('hidden');
            this.winlineButton.classList.add('fade-in');
        }, 1000);
        
        // Возвращаем кнопку "Крутить" через 3 секунды
        setTimeout(() => {
            this.spinButton.disabled = false;
            this.spinButton.classList.add('pulse');
        }, 3000);
    }
    
    nextImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
        this.imageElement.src = this.images[this.currentImageIndex];
        this.updateText();
    }
    
    updateText() {
        const currentText = this.imageTexts[this.currentImageIndex];
        if (this.titleElement && this.descriptionElement && currentText) {
            this.titleElement.textContent = currentText.title;
            this.descriptionElement.textContent = currentText.description;
        }
    }
    
    goToWinline() {
        // Анимация клика
        this.winlineButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.winlineButton.style.transform = 'scale(1)';
        }, 150);
        
        // Переход на Winline
        window.open('https://sirena.world/2q7r8e', '_blank');
        
        // Обновляем статус
        this.statusText.textContent = 'Переход на Winline... Удачной игры!';
    }
    
    // Метод для сброса виджета
    reset() {
        clearInterval(this.spinInterval);
        clearTimeout(this.slowdownTimeout);
        
        this.isSpinning = false;
        this.spinButton.disabled = false;
        this.spinButton.classList.add('pulse');
        this.winlineButton.classList.add('hidden');
        this.winlineButton.classList.remove('fade-in');
        
        this.imageElement.classList.remove('spinning', 'slowing');
        this.imageElement.style.transform = 'scale(1)';
        this.imageElement.style.filter = 'brightness(1.1) contrast(1.1)';
        
        this.currentImageIndex = 0;
        this.imageElement.src = this.images[0];
        this.updateText();
    }
}

// Инициализация виджета
document.addEventListener('DOMContentLoaded', () => {
    const rotator = new FootballScoresRotator();
    
    // Добавляем пульсацию к кнопке при загрузке
    setTimeout(() => {
        rotator.spinButton.classList.add('pulse');
    }, 500);
    
    // Глобальный доступ для отладки
    window.rotator = rotator;
});

// Обработка ошибок загрузки изображений
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn('Ошибка загрузки изображения:', this.src);
            // Можно добавить fallback изображение
        });
    });
});
