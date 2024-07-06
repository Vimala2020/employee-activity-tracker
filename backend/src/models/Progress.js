const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tasksCompleted: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Progress', ProgressSchema);
