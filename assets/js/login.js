const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

// Handle form submission (sign-in)
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    fetch('http://54.175.104.9:3000/api/students/signin', {
        method: 'POST',
        body: JSON.stringify({
            email: formData.get('email'),
            password: formData.get('password')
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Store the student ID in local storage
            localStorage.setItem('studentId', data.studentId); 
            console.log('Stored studentId:', data.studentId); // Add this line
            window.location.href = 'studentpage.html'; // Redirect to student home page
        } else {
            document.getElementById('signin-email-error').innerText = data.error;
            document.getElementById('signin-email-error').style.display = 'block';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred.');
    });
});

// Handle form submission (register)
document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        date_of_birth: formData.get('date_of_birth'),
        address: formData.get('address'),
        phone_number: formData.get('phone_number'),
        profile_picture: formData.get('profile_picture') // Ensure this is Base64 or URL
    };

    fetch('http://54.175.104.9:3000/api/students/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Clear previous errors
        document.getElementById('register-email-error').style.display = 'none';

        if (data.message) {
            // Show success message (optional)
            alert('Registration successful!');
            // Clear the form
            document.getElementById('register-form').reset();
        } else {
            // Display error message
            if (data.error === 'Email already exists') {
                document.getElementById('register-email-error').textContent = 'Email already exists.';
                document.getElementById('register-email-error').style.display = 'block';
            } else {
                // Handle other errors (if any)
                console.error('Error:', data.error);
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Handle network or other errors
        document.getElementById('register-email-error').textContent = 'Email id already exists.';
        document.getElementById('register-email-error').style.display = 'block';
    });
});