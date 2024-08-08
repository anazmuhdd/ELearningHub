const mongoose = require('mongoose');

const designContentSchema = new mongoose.Schema({
  content_type: { type: String, enum: ['image', 'video', 'pdf'], required: true },
  content_url: { type: String, required: true },
  associated_course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
});

const DesignContent = mongoose.model('DesignContent', designContentSchema);

module.exports = DesignContent;
