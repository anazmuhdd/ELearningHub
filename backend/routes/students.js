const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Create a new student
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, date_of_birth, address, phone_number, profile_picture } = req.body;
        // Check if email already exists
        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ success: false, error: 'Email already exists' });
        }
        const newStudent = new Student({
            name,
            email,
            password,
            date_of_birth,
            address,
            phone_number,
            profile_picture
        });
        await newStudent.save();
        res.status(201).json({ success: true, message: 'Student created successfully' });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Sign in a student
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if the student exists
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ success: false, error: 'Invalid email or password' });
    }
    // Validate the password
    if (student.password !== password) {
      return res.status(400).json({ success: false, error: 'Invalid email or password' });
    }
    res.status(200).json({ success: true, message: 'Login successful', studentId: student._id });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Get student details
// Get student details
// GET /api/students/:id
router.get('/:id', async (req, res) => {
  try {
      const student = await Student.findById(req.params.id);
      if (!student) {
          return res.status(404).json({ message: 'Student not found' });
      }
      res.json(student);
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
});


// New route for fetching student profile
router.get('/profile', async (req, res) => {
  try {
    const studentId = req.headers.authorization.split(' ')[1]; // Assuming you're sending the studentId in the Authorization header
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }
    res.status(200).json({ success: true, student });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});
// Get all students
router.get('/', async (req, res) => {
  try {
      const students = await Student.find();
      res.status(200).json(students);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});
router.delete('/:id', async (req, res) => {
  try {
      const student = await Student.findByIdAndDelete(req.params.id);
      if (!student) {
          return res.status(404).json({ error: 'Student not found' });
      }
      res.json({ message: 'Student deleted successfully' });
  } catch (error) {
      res.status(500).json({ error: 'Server error' });
  }
});
router.put('/:id', async (req, res) => {
  try {
      const { name, email, password, date_of_birth, address, phone_number, profile_picture } = req.body;
      const student = await Student.findByIdAndUpdate(
          req.params.id,
          { name, email, password, date_of_birth, address, phone_number, profile_picture },
          { new: true, runValidators: true }
      );
      if (!student) {
          return res.status(404).json({ error: 'Student not found' });
      }
      res.json(student);
  } catch (error) {
      res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;