// Тест на игроманию
let currentQuestion = 0;
let answers = [];

const startTestBtn = document.getElementById('startTestBtn');
const testInline = document.getElementById('testInline');
const testQuestionContainer = document.getElementById('testQuestionContainer');
const testResultContainer = document.getElementById('testResultContainer');

// Запуск теста внутри страницы
startTestBtn.addEventListener('click', () => {
    startTestBtn.style.display = 'none';
    testInline.style.display = 'block';
    resetTest();
    showQuestion();
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
    
}

// Выбор ответа
function selectAnswer(index) {
    answers[currentQuestion] = index;
    if (currentQuestion < testQuestions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResults();
    }
}

// Показать результаты
function showResults() {
    // В ответах "Да" индекс 0, "Нет" индекс 1
    const yesCount = answers.filter(answer => answer === 0).length;
    const hasProblem = yesCount >= 4;
    const resultColor = hasProblem ? 'rgb(255, 0, 60)' : 'rgb(4, 120, 87)';
    const resultText = hasProblem
        ? 'У вас есть признаки проблемного игрового поведения. Рекомендуем ограничить участие в азартных играх и обратиться за консультацией к специалисту.'
        : 'Признаков выраженных проблем не выявлено. Продолжайте играть ответственно, соблюдайте лимиты и контролируйте бюджет.';
    
    testQuestionContainer.style.display = 'none';
    testResultContainer.style.display = 'block';
    testResultContainer.innerHTML = `
        <div class="test-result">
            <div class="test-result-title">Результаты теста</div>
            <div class="test-result-score" style="color: ${resultColor}">${yesCount}/10</div>
            <div class="test-result-text">${resultText}</div>
            <button class="test-restart-button" id="restartTestBtn">Пройти тест заново</button>
        </div>
    `;
    
    document.getElementById('restartTestBtn').addEventListener('click', () => {
        resetTest();
        showQuestion();
    });
}
