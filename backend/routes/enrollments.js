const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment');

// Enroll a student in a course
router.post('/enroll', async (req, res) => {
  try {
    const { student_id, course_id } = req.body;
    const newEnrollment = new Enrollment({ student_id, course_id });
    await newEnrollment.save();
    res.status(201).json({ message: 'Enrollment created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get('/:id', async (req, res) => {
  try {
      const enrollment = await Enrollment.findById(req.params.id)
          .populate('student_id', 'name')
          .populate('course_id', 'course_name');
      if (!enrollment) {
          return res.status(404).json({ message: 'Enrollment not found' });
      }
      res.json(enrollment);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// DELETE /api/enrollments/:id
router.delete('/:id', async (req, res) => {
  try {
      const enrollment = await Enrollment.findByIdAndDelete(req.params.id);
      if (!enrollment) {
          return res.status(404).json({ message: 'Enrollment not found' });
      }
      res.json({ message: 'Enrollment deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

// Get all enrollments
router.get('/', async (req, res) => {
  try {
      const enrollments = await Enrollment.find()
          .populate('student_id', 'name') // Populate student details, only name
          .populate('course_id', 'course_name'); // Populate course details, only course_name

      res.status(200).json(enrollments);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});

router.get('/student/:studentId', async (req, res) => {
    try {
        const studentId = req.params.studentId;
        const enrollments = await Enrollment.find({ student_id: studentId }).populate('course_id');
        res.status(200).json(enrollments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;