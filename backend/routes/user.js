const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const { Pool } = require('pg'); // Assuming you are using PostgreSQL

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Create PostgreSQL pool
const pool = new Pool({
    user: 'your_db_user',
    host: 'localhost',
    database: 'your_database',
    password: 'your_db_password',
    port: 5432,
});

// Register route
router.post('/register', upload.single('profile_picture'), async (req, res) => {
    const { name, email, password, date_of_birth, address, phone_number } = req.body;
    const profile_picture = req.file ? req.file.filename : null;

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert data into database
        const result = await pool.query(
            'INSERT INTO students (name, email, password, date_of_birth, address, phone_number, profile_picture) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [name, email, hashedPassword, date_of_birth, address, phone_number, profile_picture]
        );

        res.json({ success: true, message: 'User registered successfully!' });
    } catch (error) {
        console.error('Error:', error);
        res.json({ success: false, message: 'Registration failed.' });
    }
});

module.exports = router;
