const Progresses = require('../models/Progresses');
const sendDailyReport = require('../config/email');

exports.submitProgresses = async function (req, res) {
  const { userId, work } = req.body;
  try {
    if (!userId || !work) {
      throw new Error("Missing required fields: userId, or work");
    }
    const progresses = new Progresses({ userId, work, date: new Date() });
    console.log('Saving work record:', progresses);
    await progresses.save();
    res.status(201).json({ message: 'Work progress submitted successfully' });

    const report = `User ${progresses.userId} submitted Work Progress Report on ${progresses.date}`;
    sendDailyReport(process.env.EMAIL_MANAGER, report);
    console.log('Email sent successfully');
  } catch (err) {
    console.error('Error submitting work progress or sending email:', err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.getProgresses = async function (req, res) {
  const { userId } = req.params;
  try {
    console.log('Fetching work progress for user:', userId);
    const progresses = await Progresses.find({ userId });
    res.status(200).json(progresses);
  } catch (err) {
    console.error('Error fetching work progress:', err.message);
    res.status(500).json({ error: err.message });
  }
};
