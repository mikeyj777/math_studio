// scripts/script.js

document.addEventListener('DOMContentLoaded', () => {
    const questionElement = document.getElementById('question');
    const answerInput = document.getElementById('answer');
    const submitButton = document.getElementById('submit-answer');
    const feedbackElement = document.getElementById('feedback');
    const scoreChartCanvas = document.getElementById('score-chart');

    let currentQuestion = {};
    let scoreData = [];
    let correctAnswers = 0;
    let totalQuestions = 0;

    const scoreChart = new Chart(scoreChartCanvas, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Score Percentage',
                data: scoreData,
                borderColor: 'blue',
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    function generateQuestion() {
        let num1 = Math.floor(Math.random() * 15);
        let num2 = Math.floor(Math.random() * 15);

        if (num1 < num2) {
            [num1, num2] = [num2, num1];
        }

        const operation = Math.random() > 0.5 ? '+' : '-';

        currentQuestion = {
            num1: num1,
            num2: num2,
            operation: operation,
            answer: operation === '+' ? num1 + num2 : num1 - num2
        };

        questionElement.textContent = `What is ${currentQuestion.num1} ${currentQuestion.operation} ${currentQuestion.num2}?`;
        answerInput.value = '';
        feedbackElement.textContent = '';
        answerInput.focus();
    }

    function updateScore(correct) {
        correctAnswers += correct ? 1 : 0;
        totalQuestions += 1;
        const scorePercentage = (correctAnswers / totalQuestions) * 100;
        scoreData.push(scorePercentage.toFixed(2));
        scoreChart.data.labels.push(totalQuestions);
        scoreChart.update();
    }

    function checkAnswer() {
        const userAnswer = parseInt(answerInput.value, 10);
        if (isNaN(userAnswer)) {
            feedbackElement.textContent = 'Bruh';
            return;
        }
        const correct = userAnswer === currentQuestion.answer;
        feedbackElement.textContent = correct ? 'Correct!' : `Oops! The correct answer is ${currentQuestion.answer}.`;
        feedbackElement.style.color = correct ? 'green' : 'red';
        updateScore(correct);

        // Automatically load the next question after 1 second
        setTimeout(generateQuestion, 1000);
    }

    submitButton.addEventListener('click', checkAnswer);

    // Initialize the first question
    generateQuestion();
});
