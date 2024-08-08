const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  address: { type: String, required: true },
  phone_number: { type: String, required: true },
  profile_picture: { type: String, required: false }
});

module.exports = mongoose.model('Student', studentSchema);
