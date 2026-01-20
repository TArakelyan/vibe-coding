// Маска ввода номера телефона
(function() {
  function initPhoneMask() {
    const phoneInput = document.getElementById('phone');
    if (!phoneInput) return;

    // Устанавливаем начальное значение +7
    if (!phoneInput.value) {
      phoneInput.value = '+7';
    }

    phoneInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      
      // Если начинается не с 7, добавляем 7
      if (value.length > 0 && value[0] !== '7') {
        value = '7' + value;
      }
      
      // Ограничиваем длину (7 + 10 цифр)
      if (value.length > 11) {
        value = value.substring(0, 11);
      }
      
      // Форматируем номер
      let formattedValue = '+7';
      if (value.length > 1) {
        formattedValue += ' (' + value.substring(1, 4);
        if (value.length > 4) {
          formattedValue += ') ' + value.substring(4, 7);
        }
        if (value.length > 7) {
          formattedValue += '-' + value.substring(7, 9);
        }
        if (value.length > 9) {
          formattedValue += '-' + value.substring(9, 11);
        }
      }
      
      e.target.value = formattedValue;
    });

    phoneInput.addEventListener('keydown', function(e) {
      // Запрещаем удаление +7
      if (e.key === 'Backspace' && e.target.value === '+7') {
        e.preventDefault();
      }
    });

    phoneInput.addEventListener('focus', function(e) {
      // При фокусе устанавливаем курсор после +7
      if (e.target.value === '+7') {
        setTimeout(() => {
          e.target.setSelectionRange(3, 3);
        }, 0);
      }
    });
  }

  // Инициализация при загрузке DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPhoneMask);
  } else {
    initPhoneMask();
  }
})();

