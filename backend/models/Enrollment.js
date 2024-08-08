const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EnrollmentSchema = new Schema({
    student_id: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    course_id: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    // other fields if necessary
});

module.exports = mongoose.model('Enrollment', EnrollmentSchema);
