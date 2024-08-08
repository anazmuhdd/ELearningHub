document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('edit-modal');
    const closeModal = document.getElementsByClassName('close')[0];

    closeModal.onclick = () => {
        modal.style.display = 'none';
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    const handleResponse = async (response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return response.json();
        } else {
            const text = await response.text();
            throw new Error(`Expected JSON but got ${text}`);
        }
    };

    const loadCourses = async () => {
        try {
            const response = await fetch('http://54.175.104.9:3000/api/courses');
            const courses = await handleResponse(response);
            const courseList = document.getElementById('course-list');
            const courseSelect = document.querySelector('select[name="course_id"]');
            courseList.innerHTML = '';
            courseSelect.innerHTML = '<option value="">Select a course</option>';
            courses.forEach(course => {
                const courseItem = document.createElement('li');
                courseItem.innerHTML = `
                    ${course.course_name} - ${course.description}
                    <div>
                        <button class="edit" data-id="${course._id}" data-type="course">Edit</button>
                        <button class="delete" data-id="${course._id}" data-type="course">Delete</button>
                    </div>
                `;
                courseList.appendChild(courseItem);

                const courseOption = document.createElement('option');
                courseOption.value = course._id;
                courseOption.textContent = course.course_name;
                courseSelect.appendChild(courseOption);
            });
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const loadStudents = async () => {
        try {
            const response = await fetch('http://54.175.104.9:3000/api/students');
            const students = await handleResponse(response);
            const studentList = document.getElementById('student-list');
            const studentSelect = document.querySelector('select[name="student_id"]');
            studentList.innerHTML = '';
            studentSelect.innerHTML = '<option value="">Select a student</option>';
            students.forEach(student => {
                const studentItem = document.createElement('li');
                studentItem.innerHTML = `
                    ${student.name} - ${student.email}
                    <div>
                        <button class="edit" data-id="${student._id}" data-type="student">Edit</button>
                        <button class="delete" data-id="${student._id}" data-type="student">Delete</button>
                    </div>
                `;
                studentList.appendChild(studentItem);

                const studentOption = document.createElement('option');
                studentOption.value = student._id;
                studentOption.textContent = student.name;
                studentSelect.appendChild(studentOption);
            });
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const loadEnrollments = async () => {
        try {
            const response = await fetch('http://54.175.104.9:3000/api/enrollments');
            const enrollments = await handleResponse(response);
            const enrollmentList = document.getElementById('enrollment-list');
            enrollmentList.innerHTML = '';
            enrollments.forEach(enrollment => {
                // Handle cases where student_id or course_id might be null
                const studentName = enrollment.student_id ? enrollment.student_id.name : 'Unknown Student';
                const courseName = enrollment.course_id ? enrollment.course_id.course_name : 'Unknown Course';
    
                const enrollmentItem = document.createElement('li');
                enrollmentItem.innerHTML = `
                    ${studentName} enrolled in ${courseName}
                    <div>
                        <button class="edit" data-id="${enrollment._id}" data-type="enrollment">Edit</button>
                        <button class="delete" data-id="${enrollment._id}" data-type="enrollment">Delete</button>
                    </div>
                `;
                enrollmentList.appendChild(enrollmentItem);
            });
        } catch (error) {
            console.error('Error fetching enrollments:', error);
        }
    };
    
    

    document.getElementById('create-course-form').addEventListener('submit', async event => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const courseData = Object.fromEntries(formData.entries());
        try {
            const response = await fetch('http://54.175.104.9:3000/api/courses/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(courseData)
            });
            await handleResponse(response);
            loadCourses();
            event.target.reset();
        } catch (error) {
            console.error('Error creating course:', error);
        }
    });

    document.getElementById('create-student-form').addEventListener('submit', async event => {
        event.preventDefault();
    
        const formData = new FormData(event.target);
    
        // Create a data object with the form entries
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            date_of_birth: formData.get('date_of_birth'),
            address: formData.get('address'),
            phone_number: formData.get('phone_number'),
            profile_picture: formData.get('profile_picture') // Ensure this is Base64 or URL
        };
    
        try {
            const response = await fetch('http://54.175.104.9:3000/api/students/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            const result = await response.json();
    
            if (response.ok) {
                // Handle success
                alert('Student created successfully!');
                loadStudents(); // Refresh the student list
                event.target.reset(); // Clear the form
            } else {
                // Handle errors
                if (result.error === 'Email already exists') {
                    document.getElementById('register-email-error').textContent = 'Email already exists.';
                    document.getElementById('register-email-error').style.display = 'block';
                } else {
                    console.error('Error:', result.error);
                }
            }
        } catch (error) {
            console.error('Error creating student:', error);
            document.getElementById('register-email-error').textContent = 'An error occurred. Please try again.';
            document.getElementById('register-email-error').style.display = 'block';
        }
    });
    
    document.getElementById('enroll-student-form').addEventListener('submit', async event => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const enrollmentData = Object.fromEntries(formData.entries());
        try {
            const response = await fetch('http://54.175.104.9:3000/api/enrollments/enroll', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(enrollmentData)
            });
            await handleResponse(response);
            alert('Student enrolled successfully');
            loadEnrollments();
            event.target.reset();
        } catch (error) {
            console.error('Error enrolling student:', error);
        }
    });

    const handleEdit = async (id, type) => {
        try {
            const response = await fetch(`http://54.175.104.9:3000/api/${type}s/${id}`);
            if (response.ok) {
                const item = await response.json();
                const form = document.getElementById('edit-form');
                form.innerHTML = '';
                Object.keys(item).forEach(key => {
                    if (key !== '_id' && key !== '__v') {
                        const input = document.createElement('input');
                        input.type = key.includes('date') ? 'date' : 'text';
                        input.name = key;
                        input.value = item[key];
                        input.required = true;
                        form.appendChild(input);
                    }
                });
                const submitButton = document.createElement('button');
                submitButton.type = 'submit';
                submitButton.textContent = 'Update';
                form.appendChild(submitButton);
    
                form.onsubmit = async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const updatedData = Object.fromEntries(formData.entries());
                    try {
                        const response = await fetch(`http://54.175.104.9:3000/api/${type}s/${id}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(updatedData)
                        });
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        modal.style.display = 'none';
                        if (type === 'course') loadCourses();
                        if (type === 'student') loadStudents();
                        if (type === 'enrollment') loadEnrollments();
                    } catch (error) {
                        console.error(`Error updating ${type}:`, error);
                    }
                };
    
                document.getElementById('modal-title').textContent = `Edit ${type}`;
                modal.style.display = 'block';
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error(`Error fetching ${type} details:`, error);
        }
    };
    

    const handleDelete = async (id, type) => {
        if (confirm(`Are you sure you want to delete this ${type}?`)) {
            try {
                const response = await fetch(`http://54.175.104.9:3000/api/${type}s/${id}`, {
                    method: 'DELETE'
                });
                await handleResponse(response);
                if (type === 'course') loadCourses();
                if (type === 'student') loadStudents();
                if (type === 'enrollment') loadEnrollments();
            } catch (error) {
                console.error(`Error deleting ${type}:`, error);
            }
        }
    };

    document.addEventListener('click', event => {
        if (event.target.classList.contains('edit')) {
            const id = event.target.getAttribute('data-id');
            const type = event.target.getAttribute('data-type');
            handleEdit(id, type);
        }
        if (event.target.classList.contains('delete')) {
            const id = event.target.getAttribute('data-id');
            const type = event.target.getAttribute('data-type');
            handleDelete(id, type);
        }
    });

    // Initial load
    loadCourses();
    loadStudents();
    loadEnrollments();
});
