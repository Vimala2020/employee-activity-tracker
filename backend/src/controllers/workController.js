const WorkProgress = require('../models/WorkProgress');

exports.submitWorkProgress = async (req, res) => {
  const { userId, work } = req.body;
  try {
    const workProgress = new WorkProgress({ userId, work});
    console.log('Saving work record:', work)
    await workProgress.save();
    res.status(201).json({ message: 'Work progress submitted successfully' });
  } catch (err) {
    console.error('Error marking work:', err.message)
    res.status(500).json({ error: err.message });
  }
};

exports.getWorkProgress = async (req, res) => {
  const { userId } = req.params;
  try {
    console.log('Fetching attendance for user:', userId); 
    const workProgress = await WorkProgress.find({ userId });
    res.status(200).json(workProgress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
