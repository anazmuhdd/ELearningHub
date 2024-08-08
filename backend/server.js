require('dotenv').config(); // This should be at the very top of the file

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Enable CORS for your frontend's domain
app.use(cors({
    origin: 'http://54.175.104.9', // Adjust this if you want to restrict access to specific domains
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
});

const courseRoutes = require('./routes/courses');
const adminRoutes = require('./routes/admin');
const enrollmentRoutes = require('./routes/enrollments');
const designContentRoutes = require('./routes/designContents');
const courseContentRoutes = require('./routes/courseContents');
const studentRoutes = require('./routes/students');

// Use the routes
app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/designContents', designContentRoutes);
app.use('/api/courseContents', courseContentRoutes);

// Serve static files (frontend assets)
app.use(express.static(path.join(__dirname, '../')));

// Serve index.html at the root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

console.log('Mongo URI:', process.env.MONGO_URI);
