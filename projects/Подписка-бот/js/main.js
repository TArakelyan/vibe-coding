document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('subscriptionForm');
    const emailInput = document.getElementById('email');
    const telegramInput = document.getElementById('telegram');

    const validateEmail = (email) => {
        return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    };

    const validateTelegram = (username) => {
        return username.match(/^@?[a-zA-Z0-9_]{5,32}$/);
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const telegram = telegramInput.value.trim();
        
        if (!validateEmail(email)) {
            emailInput.focus();
            return;
        }

        const formattedTelegram = telegram.startsWith('@') ? telegram : '@' + telegram;
        
        if (!validateTelegram(formattedTelegram)) {
            telegramInput.focus();
            return;
        }

        const button = form.querySelector('button');
        const originalText = button.innerHTML;
        button.innerHTML = 'Подписка оформляется...';
        button.disabled = true;

        try {
            // Здесь будет отправка данных на сервер
            await new Promise(resolve => setTimeout(resolve, 1000)); // Имитация запроса
            
            button.innerHTML = 'Готово!';
            button.style.background = '#28a745';
            
            setTimeout(() => {
                form.reset();
                button.innerHTML = originalText;
                button.style.background = '';
                button.disabled = false;
            }, 2000);
        } catch (error) {
            button.innerHTML = 'Попробуйте позже';
            button.style.background = '#dc3545';
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
                button.disabled = false;
            }, 2000);
        }
    });
}); 