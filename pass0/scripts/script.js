// script.js

document.addEventListener('DOMContentLoaded', () => {
    const questionContainer = document.getElementById('question-container');
    const questionElement = document.getElementById('question');
    const answerInput = document.getElementById('answer');
    const submitButton = document.getElementById('submit-answer');
    const feedbackElement = document.getElementById('feedback');
    const nextButton = document.getElementById('new-question');

    let currentQuestion = {};

    function generateQuestion() {
        const num1 = Math.floor(Math.random() * 15);
        const num2 = Math.floor(Math.random() * 15);
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

    function checkAnswer() {
        const userAnswer = parseInt(answerInput.value, 10);
        if (userAnswer === currentQuestion.answer) {
            feedbackElement.textContent = 'Correct!';
            feedbackElement.style.color = 'green';
        } else {
            feedbackElement.textContent = `Oops! The correct answer is ${currentQuestion.answer}.`;
            feedbackElement.style.color = 'red';
        }
    }

    submitButton.addEventListener('click', checkAnswer);
    nextButton.addEventListener('click', generateQuestion);

    // Initialize the first question
    generateQuestion();
});
