const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// Create a new course
router.post('/create', async (req, res) => {
  try {
    const { course_name, description, instructor, duration, start_date, end_date, course_image } = req.body;
    const newCourse = new Course({ course_name, description, instructor, duration, start_date, end_date, course_image });
    await newCourse.save();
    res.status(201).json({ message: 'Course created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a single course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a course by ID
router.put('/:id', async (req, res) => {
  try {
    const { course_name, description, instructor, duration, start_date, end_date, course_image } = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { course_name, description, instructor, duration, start_date, end_date, course_image },
      { new: true }
    );
    if (!updatedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json({ message: 'Course updated successfully', course: updatedCourse });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a course by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
