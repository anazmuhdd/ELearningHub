const mongoose = require('mongoose');

const courseContentSchema = new mongoose.Schema({
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  content_type: { type: String, required: true },
  content_title: { type: String, required: true },
  content_description: String,
  content_url: String,
});

const CourseContent = mongoose.model('CourseContent', courseContentSchema);

module.exports = CourseContent;
