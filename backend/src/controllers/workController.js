const Progress = require('../models/Progresses');
const sendDailyReport = require('../config/email');

exports.submitProgresses = async (req, res) => {
  try {
    const { userId, work } = req.body;
    const newProgress = new Progress({ userId, work });
    await newProgress.save();
    
    // Generate and send a daily report
    const report = `User ${userId} submitted progress: ${work}`;
    sendDailyReport(process.env.EMAIL_MANAGER, report);
    
    res.status(201).json({ message: 'Work progress submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
exports.getProgresses = async (req, res) => {
  const { userId } = req.params;
  const { startDate, endDate } = req.query;

  console.log('Received query params:', startDate, endDate); // Debugging statement

  try {
    let query = { userId };

    // Add date filter if both startDate and endDate are provided
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    console.log('MongoDB query:', query); // Debugging statement

    const progresses = await Progress.find(query);
    console.log('Filtered progresses:', progresses); // Debugging statement
    res.json(progresses);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllProgresses = async (req, res) => {
  const { startDate, endDate } = req.query;

  console.log('Received query params:', startDate, endDate); // Debugging statement

  try {
    let query = {};

    // Add date filter if both startDate and endDate are provided
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    console.log('MongoDB query:', query); // Debugging statement

    const progresses = await Progress.find(query);
    console.log('Filtered progresses:', progresses); // Debugging statement
    res.json(progresses);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
