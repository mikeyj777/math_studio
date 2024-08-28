// script.js

document.addEventListener('DOMContentLoaded', () => {
    const questionElement = document.getElementById('question');
    const answerInput = document.getElementById('answer');
    const submitButton = document.getElementById('submit-answer');
    const feedbackElement = document.getElementById('feedback');
    const nextButton = document.getElementById('new-question');
    const scoreChartCanvas = document.getElementById('score-chart');

    let currentQuestion = {};
    let scoreData = [];
    let score = 0;

    const scoreChart = new Chart(scoreChartCanvas, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Score Over Time',
                data: scoreData,
                borderColor: 'blue',
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10
                }
            }
        }
    });

    function generateQuestion() {
        const num1 = Math.floor(Math.random() * 15);
        let num2 = Math.floor(Math.random() * 15);

        // Ensure num1 is greater than or equal to num2 to avoid negative answers
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
    }

    function updateScore(correct) {
        score += correct ? 1 : -1;
        scoreData.push(score);
        scoreChart.data.labels.push(scoreData.length);
        scoreChart.update();
    }

    function checkAnswer() {
        const userAnswer = parseInt(answerInput.value, 10);
        const correct = userAnswer === currentQuestion.answer;
        feedbackElement.textContent = correct ? 'Correct!' : `Oops! The correct answer is ${currentQuestion.answer}.`;
        feedbackElement.style.color = correct ? 'green' : 'red';
        updateScore(correct);
    }

    submitButton.addEventListener('click', checkAnswer);
    nextButton.addEventListener('click', generateQuestion);

    // Initialize the first question
    generateQuestion();
});
