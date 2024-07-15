const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  userId: { type: String, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['present', 'absent'], required: true },
  username: { type: String, required: true }
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
