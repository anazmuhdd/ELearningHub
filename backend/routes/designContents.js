const express = require('express');
const router = express.Router();
const DesignContent = require('../models/DesignContent');

// Create new design content
router.post('/create', async (req, res) => {
  try {
    const { content_type, content_url, associated_course_id } = req.body;
    const newContent = new DesignContent({ content_type, content_url, associated_course_id });
    await newContent.save();
    res.status(201).json({ message: 'Design content created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
