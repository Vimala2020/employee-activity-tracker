const mongoose = require('mongoose');

const WorkProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: { type: String, required: true },
  date: { type: Date, default: Date.now },
  workSummary: { type: String, required: true }
});

module.exports = mongoose.model('WorkProgress', WorkProgressSchema);
