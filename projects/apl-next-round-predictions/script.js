// Конфигурация Supabase
const SUPABASE_URL = 'https://bmhsphumoyxoftuevwkr.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtaHNwaHVtb3l4b2Z0dWV2d2tyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1OTc3MzYsImV4cCI6MjA4MDE3MzczNn0.7l6sVIudayguzvY8y0QT-F_JH_n0g9gCRkWk_MaJUD4';

// Инициализация Supabase клиента
let supabaseClient;

class PredictionForm {
  constructor() {
    this.form = document.getElementById('predictionForm');
    this.matchesContainer = document.getElementById('matchesContainer');
    this.submitBtn = document.getElementById('submitBtn');
    this.successMessage = document.getElementById('successMessage');
    this.errorMessage = document.getElementById('errorMessage');
    
    this.init();
  }

  init() {
    this.renderMatches();
    this.renderDoublePointsPicker();
    this.setupEventListeners();
  }

  renderMatches() {
    this.matchesContainer.innerHTML = '';

    aplMatches.forEach((match, index) => {
      const matchCard = this.createMatchCard(match, index);
      this.matchesContainer.appendChild(matchCard);
    });
  }

  renderDoublePointsPicker() {
    const picker = document.getElementById('doublePointsPicker');
    if (!picker) return;

    picker.innerHTML = '';

    // Добавляем варианты матчей
    aplMatches.forEach((match, index) => {
      const option = document.createElement('div');
      option.className = 'double-points-option';
      option.dataset.matchId = match.id;
      option.innerHTML = `
        <div class="double-points-option-content">
          <div class="double-points-match-info">
            <span class="double-points-match-number">Матч ${index + 1}</span>
            <div class="double-points-teams">
              <span class="double-points-team">${match.homeTeam}</span>
              <span class="double-points-vs">—</span>
              <span class="double-points-team">${match.awayTeam}</span>
            </div>
          </div>
        </div>
      `;
      option.addEventListener('click', () => this.selectDoublePointsMatch(match.id));
      picker.appendChild(option);
    });
  }

  selectDoublePointsMatch(matchId) {
    const hiddenInput = document.getElementById('doublePointsMatch');
    if (hiddenInput) {
      hiddenInput.value = matchId;
    }

    // Обновляем визуальное состояние
    const options = document.querySelectorAll('.double-points-option');
    options.forEach(opt => {
      if (opt.dataset.matchId === matchId) {
        opt.classList.add('selected');
      } else {
        opt.classList.remove('selected');
      }
    });
  }

  createMatchCard(match, index) {
    const card = document.createElement('div');
    card.className = 'match-card';
    card.dataset.matchId = match.id;

    // Используем фиксированные дату и время из данных матча, на двух строках
    const formattedDate = `${match.date}<br>${match.time} (МСК)`;

    // Разные позиции паттерна для разных карточек
    const patternPositions = [
      '0% 0%',
      '33% 33%',
      '66% 0%',
      '0% 66%',
      '50% 50%'
    ];
    const patternPosition = patternPositions[index % patternPositions.length];

    card.innerHTML = `
      <div class="match-header" style="--pattern-position: ${patternPosition};">
        <span class="match-number">Матч ${index + 1}</span>
        <a href="${match.matchUrl}" target="_blank" rel="noopener noreferrer" class="match-link-btn">
          Матч-центр <span class="link-icon">→</span>
        </a>
      </div>
      
      <div class="match-teams">
        <div class="team">
          <img src="${match.homeLogo}" alt="${match.homeTeam}" class="team-logo-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
          <div class="team-logo" style="display: none;">${match.homeTeam.charAt(0)}</div>
          <div class="team-name">${match.homeTeam}</div>
          ${match.homeForm && match.homeFormDetails ? this.createFormIndicator(match.homeForm, match.id, 'home', index) : ''}
        </div>
        
        <div class="match-date-time">${formattedDate}</div>
        
        <div class="team">
          <img src="${match.awayLogo}" alt="${match.awayTeam}" class="team-logo-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
          <div class="team-logo" style="display: none;">${match.awayTeam.charAt(0)}</div>
          <div class="team-name">${match.awayTeam}</div>
          ${match.awayForm && match.awayFormDetails ? this.createFormIndicator(match.awayForm, match.id, 'away', index) : ''}
        </div>
      </div>
      
      <div class="score-selection">
        <div class="score-input-wrapper">
          <div class="score-team-input">
            <input 
              type="number" 
              id="score-${match.id}-home" 
              name="match-${match.id}-home" 
              class="score-input-team ${index === 0 ? 'score-input-animated' : ''}" 
              placeholder="0"
              min="0"
              max="20"
              inputmode="numeric"
              pattern="[0-9]*"
              required
            >
          </div>
          <div class="score-separator">:</div>
          <div class="score-team-input">
            <input 
              type="number" 
              id="score-${match.id}-away" 
              name="match-${match.id}-away" 
              class="score-input-team" 
              placeholder="0"
              min="0"
              max="20"
              inputmode="numeric"
              pattern="[0-9]*"
              required
            >
          </div>
        </div>
      </div>

      <div class="odds-section">
        ${match.oddsUrl ? `
          <img src="https://dumpster.cdn.sports.ru/0/58/ab306bb34287959545bacca48dd76.png" alt="BETCITY" class="betcity-odds-logo">
        ` : ''}
        <div class="odds-wrapper">
          ${match.oddsUrl ? `
            <a href="${match.oddsUrl}" target="_blank" rel="noopener noreferrer" class="odd-item odd-link">
              <span class="odd-label">${index === 0 ? 'П1' : '1'}</span>
              <span class="odd-value">${match.odds.home.toFixed(2)}</span>
            </a>
            <a href="${match.oddsUrl}" target="_blank" rel="noopener noreferrer" class="odd-item odd-link">
              <span class="odd-label">X</span>
              <span class="odd-value">${match.odds.draw.toFixed(2)}</span>
            </a>
            <a href="${match.oddsUrl}" target="_blank" rel="noopener noreferrer" class="odd-item odd-link">
              <span class="odd-label">${index === 0 ? 'П2' : '2'}</span>
              <span class="odd-value">${match.odds.away.toFixed(2)}</span>
            </a>
          ` : `
            <div class="odd-item">
              <span class="odd-label">1</span>
              <span class="odd-value">${match.odds.home.toFixed(2)}</span>
            </div>
            <div class="odd-item">
              <span class="odd-label">X</span>
              <span class="odd-value">${match.odds.draw.toFixed(2)}</span>
            </div>
            <div class="odd-item">
              <span class="odd-label">2</span>
              <span class="odd-value">${match.odds.away.toFixed(2)}</span>
            </div>
          `}
        </div>
      </div>
      
      ${match.homeForm && match.awayForm && match.homeFormDetails && match.awayFormDetails ? this.createFormDetails(match, index) : ''}
    `;

    return card;
  }

  createFormIndicator(form, matchId, teamType, matchIndex) {
    const formColors = {
      'win': '#00A876',
      'draw': '#ffc300',
      'loss': '#ff003c'
    };
    
    // Для второго матча показываем в обратном порядке (от старых к новым, без reverse)
    // Для остальных - в обратном порядке массива (от новых к старым, с reverse)
    const displayForm = matchIndex === 1 ? [...form] : [...form].reverse();
    
    const indicators = displayForm.map((result, idx) => {
      const color = formColors[result] || '#9b9b9b';
      return `<span class="form-indicator" style="background-color: ${color};" data-result="${result}" data-index="${idx}"></span>`;
    }).join('');
    
    return `
      <div class="form-indicators" data-match="${matchId}" data-team="${teamType}">
        ${indicators}
      </div>
    `;
  }

  createFormDetails(match, index) {
    if (!match.homeFormDetails || !match.awayFormDetails) return '';
    
    const homeMatches = match.homeFormDetails.map(game => {
      const isHome = game.home === match.homeTeam;
      const opponent = isHome ? game.away : game.home;
      const teamScore = isHome ? game.homeScore : game.awayScore;
      const opponentScore = isHome ? game.awayScore : game.homeScore;
      const teamWon = teamScore > opponentScore;
      const opponentWon = opponentScore > teamScore;
      
      return `
        <div class="form-match-item">
          <div class="form-match-header">
            <span class="form-match-tournament">${game.tournament}</span>
            <span class="form-match-date">${game.date}</span>
          </div>
          <div class="form-match-score">
            <span class="form-match-team ${isHome && teamWon ? 'form-match-winner' : (!isHome && opponentWon ? 'form-match-winner' : '')}">${isHome ? match.homeTeam : opponent}</span>
            <span class="form-match-result">${game.homeScore} – ${game.awayScore}</span>
            <span class="form-match-team ${!isHome && teamWon ? 'form-match-winner' : (isHome && opponentWon ? 'form-match-winner' : '')}">${!isHome ? match.homeTeam : opponent}</span>
          </div>
        </div>
      `;
    }).join('');
    
    const awayMatches = match.awayFormDetails.map(game => {
      const isHome = game.home === match.awayTeam;
      const opponent = isHome ? game.away : game.home;
      const teamScore = isHome ? game.homeScore : game.awayScore;
      const opponentScore = isHome ? game.awayScore : game.homeScore;
      const teamWon = teamScore > opponentScore;
      const opponentWon = opponentScore > teamScore;
      
      return `
        <div class="form-match-item">
          <div class="form-match-header">
            <span class="form-match-tournament">${game.tournament}</span>
            <span class="form-match-date">${game.date}</span>
          </div>
          <div class="form-match-score">
            <span class="form-match-team ${isHome && teamWon ? 'form-match-winner' : (!isHome && opponentWon ? 'form-match-winner' : '')}">${isHome ? match.awayTeam : opponent}</span>
            <span class="form-match-result">${game.homeScore} – ${game.awayScore}</span>
            <span class="form-match-team ${!isHome && teamWon ? 'form-match-winner' : (isHome && opponentWon ? 'form-match-winner' : '')}">${!isHome ? match.awayTeam : opponent}</span>
          </div>
        </div>
      `;
    }).join('');
    
    return `
      <div class="form-details" id="form-details-${match.id}" style="display: none;">
        <div class="form-tabs">
          <button type="button" class="form-tab-btn active" data-tab="home-${match.id}">${match.homeTeam}</button>
          <button type="button" class="form-tab-btn" data-tab="away-${match.id}">${match.awayTeam}</button>
        </div>
        <div class="form-tab-content active" id="home-${match.id}">
          ${homeMatches}
        </div>
        <div class="form-tab-content" id="away-${match.id}">
          ${awayMatches}
        </div>
      </div>
      <button type="button" class="form-toggle-btn" data-match="${match.id}">
        <span class="toggle-text">Статистика последних игр</span> <span class="toggle-icon">▼</span>
      </button>
    `;
  }

  validateScoreInput(input) {
    const score = input.value.trim();
    const isValid = score !== '' && !isNaN(score) && parseInt(score) >= 0;
    
    if (score && !isValid) {
      input.setCustomValidity('Введите число от 0 до 20');
    } else {
      input.setCustomValidity('');
    }
  }

  setupEventListeners() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });

    // Валидация формы в реальном времени
    const inputs = this.form.querySelectorAll('input');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        // Для полей счёта проверяем формат в реальном времени
        if (input.name.includes('-home') || input.name.includes('-away')) {
          this.validateScoreInput(input);
        }
        this.validateForm();
      });
      
      input.addEventListener('blur', () => {
        if (input.name.includes('-home') || input.name.includes('-away')) {
          this.validateScoreInput(input);
        }
        this.validateForm();
      });
    });

    // Обработчик для кнопки развёртывания формы
    setTimeout(() => {
      this.form.querySelectorAll('.form-toggle-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const matchId = e.target.closest('.form-toggle-btn').dataset.match;
          const details = document.getElementById(`form-details-${matchId}`);
          const icon = e.target.closest('.form-toggle-btn').querySelector('.toggle-icon');
          if (details) {
            const isHidden = details.style.display === 'none';
            details.style.display = isHidden ? 'block' : 'none';
            if (icon) {
              icon.textContent = isHidden ? '▲' : '▼';
            }
            e.target.closest('.form-toggle-btn').querySelector('.toggle-text').textContent = isHidden ? 'Свернуть статистику' : 'Статистика последних игр';
          }
        });
      });

      // Обработчики для табов
      this.form.querySelectorAll('.form-tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const tabId = e.target.dataset.tab;
          const matchId = tabId.split('-')[1] + '-' + tabId.split('-')[2];
          const allTabs = this.form.querySelectorAll(`[data-tab^="${tabId.split('-')[0]}-${matchId}"], [data-tab^="${tabId.split('-')[0] === 'home' ? 'away' : 'home'}-${matchId}"]`);
          const allContents = this.form.querySelectorAll(`#home-${matchId}, #away-${matchId}`);
          
          allTabs.forEach(t => t.classList.remove('active'));
          allContents.forEach(c => c.classList.remove('active'));
          
          e.target.classList.add('active');
          document.getElementById(tabId).classList.add('active');
        });
      });
    }, 100);
  }

  validateForm() {
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    
    // Проверяем, что все матчи имеют введённый счёт для обеих команд
    const allMatchesValid = aplMatches.every(match => {
      const homeInput = this.form.querySelector(`input[name="match-${match.id}-home"]`);
      const awayInput = this.form.querySelector(`input[name="match-${match.id}-away"]`);
      
      if (!homeInput || !awayInput) {
        return false;
      }
      
      const homeScore = homeInput.value.trim();
      const awayScore = awayInput.value.trim();
      
      // Проверяем, что оба поля заполнены и содержат числа
      return homeScore !== '' && awayScore !== '' && 
             !isNaN(homeScore) && !isNaN(awayScore) &&
             parseInt(homeScore) >= 0 && parseInt(awayScore) >= 0;
    });

    const isValid = username.length > 0 && 
                    email.length > 0 &&
                    phone.length > 10 &&
                    allMatchesValid;

    this.submitBtn.disabled = !isValid;
    
    return isValid;
  }

  async handleSubmit() {
    if (!this.validateForm()) {
      this.showError('Пожалуйста, заполните все поля корректно');
      return;
    }

    // Блокируем кнопку отправки
    this.submitBtn.disabled = true;
    this.submitBtn.innerHTML = '<span class="btn-text">Отправка...</span>';

    try {
      // Собираем данные формы
      const formData = this.collectFormData();

      // Отправляем данные в Supabase
      if (!supabaseClient) {
        throw new Error('Supabase не инициализирован');
      }
      
      const { data, error } = await supabaseClient
        .from('predictions')
        .insert([formData])
        .select();

      if (error) {
        console.error('Ошибка Supabase:', error);
        throw error;
      }

      // Показываем сообщение об успехе
      this.showSuccess();
      
      // Скрываем форму
      this.form.style.display = 'none';
      
      // Сбрасываем форму
      this.form.reset();

    } catch (error) {
      console.error('Ошибка при отправке прогноза:', error);
      
      let errorMessage = 'Произошла ошибка при отправке прогноза. Попробуйте позже.';
      
      if (error) {
        if (error.message) {
          if (error.message.includes('table') && error.message.includes('not found')) {
            errorMessage = 'Таблица predictions не найдена в базе данных.\n\n' +
              'Пожалуйста, создайте таблицу в Supabase согласно инструкции в README.md';
          } else if (error.message.includes('permission') || error.message.includes('policy')) {
            errorMessage = 'Ошибка доступа к базе данных.\n\n' +
              'Проверьте настройки Row Level Security (RLS) в Supabase.';
          } else {
            errorMessage = `Ошибка: ${error.message}`;
          }
        }
      }
      
      this.showError(errorMessage);
      
      // Разблокируем кнопку
      this.submitBtn.disabled = false;
      this.submitBtn.innerHTML = `
        <span class="btn-text">Отправить прогноз</span>
        <span class="btn-icon">🚀</span>
      `;
    }
  }

  collectFormData() {
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    // Собираем прогнозы по матчам
    const predictions = {};
    aplMatches.forEach((match, index) => {
      const homeInput = this.form.querySelector(`input[name="match-${match.id}-home"]`);
      const awayInput = this.form.querySelector(`input[name="match-${match.id}-away"]`);
      
      if (homeInput && awayInput && homeInput.value.trim() && awayInput.value.trim()) {
        const homeScore = homeInput.value.trim();
        const awayScore = awayInput.value.trim();
        predictions[`match_${index + 1}_score`] = `${homeScore}:${awayScore}`;
      }
    });

    const doublePointsMatch = document.getElementById('doublePointsMatch')?.value || null;
    
    return {
      username: username,
      email: email,
      phone: phone,
      match_1_score: predictions.match_1_score || null,
      match_2_score: predictions.match_2_score || null,
      match_3_score: predictions.match_3_score || null,
      match_4_score: predictions.match_4_score || null,
      match_5_score: predictions.match_5_score || null,
      double_points_match: doublePointsMatch,
      created_at: new Date().toISOString()
    };
  }

  showSuccess() {
    this.successMessage.style.display = 'block';
    this.errorMessage.style.display = 'none';
    
    // Прокручиваем к сообщению
    this.successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  showError(message) {
    this.errorMessage.style.display = 'block';
    this.successMessage.style.display = 'none';
    
    const errorText = document.getElementById('errorText');
    if (errorText) {
      errorText.textContent = message;
    }
    
    // Прокручиваем к сообщению
    this.errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  // Инициализируем Supabase после загрузки библиотеки
  if (typeof window.supabase !== 'undefined') {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  } else {
    console.error('Supabase библиотека не загружена');
  }
  
  const predictionForm = new PredictionForm();
  
  // Изначально блокируем кнопку отправки
  document.getElementById('submitBtn').disabled = true;
});

