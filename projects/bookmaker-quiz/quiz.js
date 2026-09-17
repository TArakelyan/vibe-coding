// Вопросы опросника
const QUESTIONS = [
  {
    id: 1,
    text: 'Важна ли вам популярность букмекерской компании?',
    criteria: 'popularity',
    options: [
      { text: 'Да, хочу известного букмекера', weight: 10 },
      { text: 'Скорее да', weight: 7 },
      { text: 'Не очень важно', weight: 3 },
      { text: 'Совсем не важно', weight: 0 }
    ]
  },
  {
    id: 2,
    text: 'Что для вас важнее?',
    criteria: ['reliability', 'coefficients'],
    options: [
      { text: 'Надежность БК', weights: [10, 0] },
      { text: 'Скорее надежность', weights: [8, 3] },
      { text: 'Одинаково важно', weights: [5, 5] },
      { text: 'Скорее коэффициенты', weights: [3, 8] },
      { text: 'Высокие коэффициенты', weights: [0, 10] }
    ]
  },
  {
    id: 3,
    text: 'Что для вас важнее?',
    criteria: ['withdrawSpeed', 'appConvenience'],
    options: [
      { text: 'Быстрый вывод средств', weights: [10, 0] },
      { text: 'Скорее быстрый вывод', weights: [8, 3] },
      { text: 'Одинаково важно', weights: [5, 5] },
      { text: 'Скорее удобство приложения', weights: [3, 8] },
      { text: 'Удобство приложения', weights: [0, 10] }
    ]
  },
  {
    id: 4,
    text: 'Чем больше сумма стартового бонуса, тем лучше?',
    criteria: 'bonusSize',
    options: [
      { text: 'Да, чем больше, тем лучше', weight: 10 },
      { text: 'Скорее да', weight: 7 },
      { text: 'Не принципиально', weight: 3 },
      { text: 'Бонусы не интересуют', weight: 0 }
    ]
  },
  {
    id: 5,
    text: 'Интересны ли вам долгосрочные ставки?',
    criteria: 'longTermBets',
    options: [
      { text: 'Да, очень интересны', weight: 10 },
      { text: 'Скорее да', weight: 7 },
      { text: 'Иногда делаю', weight: 4 },
      { text: 'Нет, не интересны', weight: 0 }
    ]
  },
  {
    id: 6,
    text: 'Планируете делать ставки экспрессом?',
    criteria: 'expressBets',
    options: [
      { text: 'Да, в основном экспрессы', weight: 10 },
      { text: 'Часто делаю экспрессы', weight: 7 },
      { text: 'Иногда', weight: 4 },
      { text: 'Нет, только ординары', weight: 0 }
    ]
  },
  {
    id: 7,
    text: 'Что для вас важнее при выборе?',
    criteria: ['editorialRating', 'userRating'],
    options: [
      { text: 'Оценка редакции "Спортса"', weights: [10, 0] },
      { text: 'Скорее оценка редакции', weights: [8, 3] },
      { text: 'Одинаково важно', weights: [5, 5] },
      { text: 'Скорее мнение пользователей', weights: [3, 8] },
      { text: 'Мнение других пользователей', weights: [0, 10] }
    ]
  }
];

// Состояние опроса
let currentQuestion = 0;
let userAnswers = {};
let criteriaWeights = {};

// DOM элементы
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const questionCard = document.getElementById('question-card');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progress = document.getElementById('progress');
const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');

// Инициализация
function init() {
  totalQuestionsSpan.textContent = QUESTIONS.length;
  renderQuestion();
}

// Отображение вопроса
function renderQuestion() {
  const question = QUESTIONS[currentQuestion];
  currentQuestionSpan.textContent = currentQuestion + 1;
  
  let html = `
    <h2 class="question-text">${question.text}</h2>
    <div class="options">
  `;
  
  question.options.forEach((option, index) => {
    const isSelected = userAnswers[question.id] === index;
    html += `
      <button class="option-btn ${isSelected ? 'selected' : ''}" 
              onclick="selectOption(${index})">
        ${option.text}
      </button>
    `;
  });
  
  html += '</div>';
  questionCard.innerHTML = html;
  
  updateProgress();
  updateNavigation();
}

// Выбор опции
function selectOption(optionIndex) {
  userAnswers[QUESTIONS[currentQuestion].id] = optionIndex;
  
  const buttons = document.querySelectorAll('.option-btn');
  buttons.forEach((btn, index) => {
    btn.classList.toggle('selected', index === optionIndex);
  });
  
  nextBtn.disabled = false;
}

// Обновление прогресс-бара
function updateProgress() {
  const progressPercent = ((currentQuestion + 1) / QUESTIONS.length) * 100;
  progress.style.width = progressPercent + '%';
}

// Обновление навигации
function updateNavigation() {
  prevBtn.style.display = currentQuestion > 0 ? 'block' : 'none';
  nextBtn.disabled = userAnswers[QUESTIONS[currentQuestion].id] === undefined;
  
  if (currentQuestion === QUESTIONS.length - 1) {
    nextBtn.textContent = 'Показать результат';
  } else {
    nextBtn.textContent = 'Далее →';
  }
}

// Следующий вопрос
function nextQuestion() {
  if (currentQuestion < QUESTIONS.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    showResults();
  }
}

// Предыдущий вопрос
function previousQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
  }
}

// Расчет результатов
function calculateResults() {
  // Инициализация весов критериев
  const criteriaScores = {};
  
  // Подсчет весов на основе ответов
  QUESTIONS.forEach(question => {
    const answerIndex = userAnswers[question.id];
    const option = question.options[answerIndex];
    
    if (Array.isArray(question.criteria)) {
      // Для вопросов с несколькими критериями
      question.criteria.forEach((criterion, idx) => {
        if (!criteriaScores[criterion]) criteriaScores[criterion] = 0;
        criteriaScores[criterion] += option.weights[idx];
      });
    } else {
      // Для вопросов с одним критерием
      if (!criteriaScores[question.criteria]) criteriaScores[question.criteria] = 0;
      criteriaScores[question.criteria] += option.weight;
    }
  });
  
  // Расчет итоговых баллов для каждого букмекера
  const bookmakersScores = {};
  
  Object.keys(BOOKMAKERS_DATA).forEach(bookmakerKey => {
    const bookmaker = BOOKMAKERS_DATA[bookmakerKey];
    let totalScore = 0;
    
    Object.keys(criteriaScores).forEach(criterion => {
      const userWeight = criteriaScores[criterion];
      const bookmakerScore = bookmaker.scores[criterion];
      totalScore += userWeight * bookmakerScore;
    });
    
    bookmakersScores[bookmakerKey] = {
      ...bookmaker,
      totalScore: totalScore
    };
  });
  
  // Сортировка по баллам
  const sortedBookmakers = Object.entries(bookmakersScores)
    .sort((a, b) => b[1].totalScore - a[1].totalScore);
  
  return sortedBookmakers;
}

// Отображение результатов
function showResults() {
  const results = calculateResults();
  const topBookmaker = results[0][1];
  
  let html = `
    <div class="winner">
      <div class="winner-logo">
        <img src="${topBookmaker.logo}" alt="${topBookmaker.name}">
      </div>
      <h3 class="winner-name">${topBookmaker.name}</h3>
      <p class="winner-description">${topBookmaker.description}</p>
    </div>
    
    <div class="other-recommendations">
      <h3>Другие подходящие варианты:</h3>
      <div class="recommendations-list">
  `;
  
  for (let i = 1; i < Math.min(4, results.length); i++) {
    const bookmaker = results[i][1];
    html += `
      <div class="recommendation-item">
        <img src="${bookmaker.logo}" alt="${bookmaker.name}" class="rec-logo">
        <div class="rec-info">
          <h4>${bookmaker.name}</h4>
          <p>${bookmaker.description}</p>
        </div>
      </div>
    `;
  }
  
  html += `
      </div>
    </div>
  `;
  
  document.getElementById('result-content').innerHTML = html;
  
  quizContainer.style.display = 'none';
  resultContainer.style.display = 'block';
}

// Перезапуск опроса
function restartQuiz() {
  currentQuestion = 0;
  userAnswers = {};
  criteriaWeights = {};
  
  quizContainer.style.display = 'block';
  resultContainer.style.display = 'none';
  
  renderQuestion();
}

// Обработчики событий
nextBtn.addEventListener('click', nextQuestion);
prevBtn.addEventListener('click', previousQuestion);
document.getElementById('restart-btn').addEventListener('click', restartQuiz);

// Запуск приложения
init();
