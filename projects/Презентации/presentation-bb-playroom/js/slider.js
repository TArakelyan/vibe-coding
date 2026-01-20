document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    
    let currentSlide = 0;
    const slidesCount = slides.length;

    const updateSlider = () => {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slidesCount;
        updateSlider();
    };

    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + slidesCount) % slidesCount;
        updateSlider();
    };

    // Автоматическое переключение отключено

    // Обработчики кнопок
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Свайп на мобильных устройствах
        let touchStartX = 0;
        let touchEndX = 0;
        
    slider.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
    });
        
    slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    const handleSwipe = () => {
        const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                nextSlide();
                } else {
                prevSlide();
            }
        }
    };

    // Клавиатурная навигация
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // Автоматическое переключение слайдов отключено
});