document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === 'admin' && password === 'admin123') {
            // Successful login
            errorMessage.textContent = '';
            alert('Login successful!');
            window.location.href = 'crud.html'; // Redirect to CRUD page
        } else {
            // Failed login
            errorMessage.textContent = 'Invalid username or password';
        }
    });
});