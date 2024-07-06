const Progress = require('../models/Progress');
const User = require('../models/User');

exports.submitProgress = async (req, res) => {
  const { userId, tasksCompleted } = req.body;

  try {
    const progress = new Progress({ userId, tasksCompleted });
    await progress.save();
    res.status(200).send('Progress submitted successfully');
  } catch (error) {
    res.status(500).send('Error submitting progress');
  }
};

exports.getProgress = async (req, res) => {
  try {
    const progress = await Progress.find().populate('userId', 'name email');
    res.status(200).json(progress);
  } catch (error) {
    res.status(500).send('Error fetching progress data');
  }
};
