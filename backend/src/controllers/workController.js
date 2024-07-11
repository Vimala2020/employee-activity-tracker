const WorkProgress = require('../models/WorkProgress');

exports.submitWorkProgress = async (req, res) => {
  const { userId, workSummary } = req.body;
  try {
    const workProgress = new WorkProgress({ userId, workSummary });
    await workProgress.save();
    res.status(201).json({ message: 'Work progress submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getWorkProgress = async (req, res) => {
  const { userId } = req.params;
  try {
    const workProgress = await WorkProgress.find({ userId });
    res.status(200).json(workProgress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
