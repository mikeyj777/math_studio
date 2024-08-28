// scripts/login.js

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-button');
    const nameInput = document.getElementById('name-input');
    const feedbackElement = document.getElementById('login-feedback');

    // Hard-coded users array
    const users = [
        { name: 'ellie', grade: '1' },
        { name: 'emma', grade: 'k' }
    ];

    loginButton.addEventListener('click', () => {
        const name = nameInput.value.toLowerCase();
        const user = users.find(user => user.name === name);

        if (user) {
            if (user.grade === '1') {
                window.location.href = 'first_grade.html';
            } else if (user.grade === 'k') {
                window.location.href = 'kindergarten.html';
            }
        } else {
            feedbackElement.textContent = 'User not found. Please try again.';
            feedbackElement.style.color = 'red';
        }
    });
});
