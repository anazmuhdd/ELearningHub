const express = require('express');
const router = express.Router();
const CourseContent = require('../models/CourseContent');

// Create new course content
router.post('/create', async (req, res) => {
  try {
    const { course_id, content_type, content_title, content_description, content_url } = req.body;
    const newCourseContent = new CourseContent({ course_id, content_type, content_title, content_description, content_url });
    await newCourseContent.save();
    res.status(201).json({ message: 'Course content created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
