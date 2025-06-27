# Racket Learning Hub - E-Learning Platform

## 📚 About the Project

Racket Learning Hub is a full-stack e-learning platform designed to manage online courses, student registration, and progress tracking. Built using Node.js, Express, MongoDB, and HTML/CSS/JS on the front-end, the system supports student sign-up/login, course browsing, admin control, and enrollment management.

## 🛠️ Features

* **User Authentication:** Secure registration and login for students
* **Admin Panel:** Admin login for managing students, courses, enrollments
* **Dashboard:** Students can view their profiles, enrollments, and course progress
* **Course Management:** Add, edit, and delete course content
* **MongoDB Integration:** Data is stored and managed using MongoDB
* **Responsive Design:** User-friendly interface compatible with all devices

## 💡 Technologies Used

* **Front-end:** HTML, CSS, JavaScript
* **Back-end:** Node.js, Express.js
* **Database:** MongoDB (with Mongoose ORM)
* **Hosting:** Deployed on AWS EC2
* **Other Tools:** MongoDB Compass, MongoDB Atlas, Postman (for API testing)

## 📁 Project Structure

```
.
├── index.html              # Landing page
├── login.html              # Login and registration page
├── admin.html              # Admin dashboard
├── crud.html               # CRUD operations for admin
├── studentpage.html        # Student dashboard
├── assets
│   ├── css/                # CSS files for styling
│   ├── js/                 # Front-end JavaScript files
│   └── img/                # Images and icons
└── backend
    ├── server.js           # Express server configuration
    ├── models/             # Mongoose data models
    ├── routes/             # Express API routes
    └── .env                # Environment variables
```

## 🚀 How to Run the Project

### Prerequisites

* Node.js and npm installed
* MongoDB Atlas or local MongoDB instance

### 1. Clone the Repository

```
git clone https://github.com/yourusername/racket-learning-hub.git
cd racket-learning-hub/backend
```

### 2. Install Dependencies

```
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside `backend/` with the following:

```
MONGO_URI=your_mongo_connection_string
PORT=3000
```

### 4. Run the Server

```
node server.js
```

### 5. Open in Browser

Visit `http://localhost:3000` to view the website.

## 🌐 Deployment

* Deploy the frontend and backend on AWS EC2
* Configure security groups to allow HTTP (port 80) and API access (port 3000)
* Replace `localhost` in all fetch requests with your public IP or domain

## 👤 Admin Login

```
Username: admin
Password: admin123
```

## 📸 Screenshots

*Include images of student dashboard, admin panel, course view, etc.*

## 📬 Contact

For any queries or feedback, contact anasmonar@gmail.com(mailto:your.email@example.com)

---

Made with ❤️ for modern learning.
