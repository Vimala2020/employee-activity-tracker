const Progresses = require('../models/Progresses');

exports.submitProgresses = async function (req, res) {
  const { userId, work } = req.body;
  try {
    if (!userId || !work) {
      throw new Error("Missing required fields: userId, or work");
    }
    const progresses = new Progresses({ userId, work , date: new Date() });
    console.log('Saving work record:', progresses);
    await progresses.save();
    res.status(201).json({ message: 'Work progress submitted successfully' });
  } catch (err) {
    console.error('Error marking work:', err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.getProgresses = async function (req, res) {
  const { userId } = req.params;
  try {
    console.log('Fetching attendance for user:', userId);
    const progresses = await Progresses.find({ userId });
    res.status(200).json(progresses);
  } catch (err) {
    console.error('Error fetching attendance:', err.message);
    res.status(500).json({ error: err.message });
  }
};
