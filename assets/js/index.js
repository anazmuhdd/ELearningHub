document.addEventListener("DOMContentLoaded", () => {
    const courseCardsContainer = document.querySelector('.course-cards');

    fetch('http://54.175.104.9:3000/api/courses')
        .then(response => response.json())
        .then(courses => {
            courses.forEach(course => {
                const courseCard = document.createElement('div');
                courseCard.classList.add('course-card');
                courseCard.innerHTML = `
                    <h3>${course.course_name}</h3>
                    <p>${course.description}</p>
                    <p>Instructor: ${course.instructor}</p>
                    <p>Duration: ${course.duration} days</p>
                    <p>Start Date: ${new Date(course.start_date).toLocaleDateString()}</p>
                    <p>End Date: ${new Date(course.end_date).toLocaleDateString()}</p>
                `;
                courseCardsContainer.appendChild(courseCard);
            });
        })
        .catch(error => console.error('Error fetching courses:', error));
});

// Add event listener to the login link
document.querySelector('.auth-links a').addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = 'login.html';
});
document.getElementById('admin-link').addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = 'admin.html';
});
document.getElementById('about-link').addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = 'aboutus.html';
});
document.getElementById('contactus').addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = 'contactus.html';
});