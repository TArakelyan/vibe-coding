// Тест на игроманию
let currentQuestion = 0;
let answers = [];

const testModal = document.getElementById('testModal');
const startTestBtn = document.getElementById('startTestBtn');
const closeTestBtn = document.getElementById('closeTest');
const testQuestionContainer = document.getElementById('testQuestionContainer');
const testResultContainer = document.getElementById('testResultContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');

// Открытие модального окна теста
startTestBtn.addEventListener('click', () => {
    testModal.classList.add('active');
    resetTest();
    showQuestion();
});

// Закрытие модального окна
closeTestBtn.addEventListener('click', () => {
    testModal.classList.remove('active');
});

// Закрытие при клике вне модального окна
testModal.addEventListener('click', (e) => {
    if (e.target === testModal) {
        testModal.classList.remove('active');
    }
});

// Сброс теста
function resetTest() {
    currentQuestion = 0;
    answers = new Array(testQuestions.length).fill(null);
    testQuestionContainer.style.display = 'block';
    testResultContainer.style.display = 'none';
}

// Показать вопрос
function showQuestion() {
    const question = testQuestions[currentQuestion];
    
    testQuestionContainer.innerHTML = `
        <div class="test-question-number">Вопрос ${currentQuestion + 1} из ${testQuestions.length}</div>
        <div class="test-question-text">${question.question}</div>
        <div class="test-answers">
            ${question.answers.map((answer, index) => `
                <button class="test-answer-button ${answers[currentQuestion] === index ? 'selected' : ''}" 
                        onclick="selectAnswer(${index})">
                    ${answer}
                </button>
            `).join('')}
        </div>
    `;
    
    updateNavigation();
}

// Выбор ответа
function selectAnswer(index) {
    answers[currentQuestion] = index;
    showQuestion();
}

// Обновление кнопок навигации
function updateNavigation() {
    prevBtn.disabled = currentQuestion === 0;
    
    if (currentQuestion === testQuestions.length - 1) {
        nextBtn.textContent = 'Завершить тест';
        nextBtn.disabled = answers[currentQuestion] === null;
    } else {
        nextBtn.textContent = 'Следующий';
        nextBtn.disabled = answers[currentQuestion] === null;
    }
}

// Предыдущий вопрос
prevBtn.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
});

// Следующий вопрос или завершение
nextBtn.addEventListener('click', () => {
    if (currentQuestion < testQuestions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResults();
    }
});

// Показать результаты
function showResults() {
    const totalScore = answers.reduce((sum, answer) => sum + answer, 0);
    const maxScore = testQuestions.length * 3;
    const percentage = Math.round((totalScore / maxScore) * 100);
    
    let resultText = '';
    let resultColor = 'rgb(4, 120, 87)';
    
    if (percentage < 25) {
        resultText = 'Отличный результат! Вы контролируете свою игру и играете ответственно. Продолжайте в том же духе и помните о рекомендациях безопасной игры.';
        resultColor = 'rgb(4, 120, 87)';
    } else if (percentage < 50) {
        resultText = 'Внимание! Есть некоторые признаки того, что игра начинает занимать больше места в вашей жизни, чем следует. Рекомендуем установить лимиты и делать перерывы.';
        resultColor = 'rgb(234, 88, 12)';
    } else if (percentage < 75) {
        resultText = 'Серьезное предупреждение! У вас наблюдаются признаки проблемной игры. Настоятельно рекомендуем обратиться за профессиональной помощью и рассмотреть возможность самоограничения.';
        resultColor = 'rgb(255, 0, 60)';
    } else {
        resultText = 'Критический уровень! Результаты теста указывают на серьезную зависимость от азартных игр. Пожалуйста, немедленно обратитесь за профессиональной помощью по телефону 8-800-200-02-00.';
        resultColor = 'rgb(255, 0, 60)';
    }
    
    testQuestionContainer.style.display = 'none';
    testResultContainer.style.display = 'block';
    testResultContainer.innerHTML = `
        <div class="test-result">
            <div class="test-result-title">Результаты теста</div>
            <div class="test-result-score" style="color: ${resultColor}">${percentage}%</div>
            <div class="test-result-text">${resultText}</div>
            <button class="test-restart-button" id="restartTestBtn">Пройти тест заново</button>
        </div>
    `;
    
    document.getElementById('restartTestBtn').addEventListener('click', () => {
        resetTest();
        showQuestion();
    });
    
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'none';
}
