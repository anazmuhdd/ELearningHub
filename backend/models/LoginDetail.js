const mongoose = require('mongoose');

const loginDetailSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  user_type: { type: String, enum: ['admin', 'student'], required: true },
});

const LoginDetail = mongoose.model('LoginDetail', loginDetailSchema);

module.exports = LoginDetail;
