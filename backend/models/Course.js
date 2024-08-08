const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  course_name: { type: String, required: true },
  description: String,
  instructor: String,
  duration: Number,
  start_date: Date,
  end_date: Date,
  course_image: String,
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
