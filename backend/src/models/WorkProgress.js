const mongoose = require('mongoose');

const WorkProgressSchema = new mongoose.Schema({
  userId: { type: String, ref: 'User', required: true },
  workSummary: { type: String, required: true }
});

module.exports = mongoose.model('WorkProgress', WorkProgressSchema);
