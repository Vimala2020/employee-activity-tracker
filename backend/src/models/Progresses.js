const mongoose = require('mongoose');

const ProgressesSchema = new mongoose.Schema({
  userId: { type: String, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  work: { type: String, required: true }
});

module.exports = mongoose.model('Progresses', ProgressesSchema);
