const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['present', 'absent'],
    required: true,
  },
  workSummary: {
    type: String,
    default: '',
  },
});

const Report = mongoose.model('Report', ReportSchema);

module.exports = Report;
