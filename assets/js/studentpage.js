document.addEventListener('DOMContentLoaded', async () => {
    const studentId = localStorage.getItem('studentId');
    console.log('Loaded studentId from localStorage:', studentId);
    if (!studentId) {
        console.log('No studentId found, redirecting to login.');
        window.location.href = 'login.html';
        return;
    }
    try {
        // Fetch student details
        const studentResponse = await fetch(`http://54.175.104.9:3000/api/students/${studentId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${studentId}`
            }
        });
        const student = await studentResponse.json();
        if (studentResponse.ok) {
            document.getElementById('student-name').textContent = student.name;
            document.getElementById('student-email').textContent = student.email;
            document.getElementById('student-enrollment-date').textContent = student.date_of_birth; // Assuming this is the enrollment date

            // Fetch enrolled courses
            const enrollmentsResponse = await fetch(`http://54.175.104.9:3000/api/enrollments/student/${studentId}`, {
                headers: {
                    'Authorization': `Bearer ${studentId}`
                }
            });
            const enrollments = await enrollmentsResponse.json();
            if (enrollmentsResponse.ok) {
                const courseCards = document.getElementById('course-cards');
                courseCards.innerHTML = ''; // Clear existing content

                if (enrollments.length === 0) {
                    courseCards.innerHTML = '<p>You are not enrolled in any courses yet.</p>';
                } else {
                    enrollments.forEach(enrollment => {
                        const course = enrollment.course_id; // Assuming the course details are populated
                        courseCards.innerHTML += `
                            <div class="card">
                                <h3>${course.course_name}</h3>
                                <p>${course.description}</p>
                            </div>
                        `;
                    });
                }
            } else {
                console.error('Failed to fetch enrollments:', enrollments.message || 'Unknown error');
            }

            // Progress section (static placeholder)
            const progressCards = document.getElementById('progress-cards');
            progressCards.innerHTML = `
                <div class="card">
                    <h3>Course Progress</h3>
                    <p>Progress information is not available at the moment.</p>
                </div>
            `;
        } else {
            throw new Error(student.message || 'Failed to fetch student data');
        }
    } catch (error) {
        console.error('Error:', error.message || 'An unknown error occurred');
        alert('Failed to load student data. Redirecting to login.');
        localStorage.removeItem('studentId');
        window.location.href = 'login.html';
    }
});
function toggleMenu() {
    const menu = document.getElementById('sideMenu');
    const overlay = document.getElementById('overlay');
    menu.classList.toggle('open');
    overlay.classList.toggle('active');
}

function showSection(section) {
    alert('Showing section: ' + section);
}

function logout() {
    localStorage.removeItem('studentId');
    window.location.href = 'login.html';
}
function logout() {
    // Clear the stored student ID or any other session data
    localStorage.removeItem('studentId');
    
    // Redirect to the login page
    window.location.href = 'index.html';
}

// Close menu if click outside
document.addEventListener('click', function(event) {
    const menu = document.getElementById('sideMenu');
    const overlay = document.getElementById('overlay');
    if (!menu.contains(event.target) && !document.querySelector('.menu-button').contains(event.target)) {
        if (menu.classList.contains('open')) {
            toggleMenu(); // Close menu
        }
    }
});