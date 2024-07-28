const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  work: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Progresses', progressSchema);
