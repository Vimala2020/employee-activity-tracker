const Report = require('../models/Report'); // Adjust the path as needed

const getReport = async (req, res) => {
  const { userId, startDate, endDate } = req.query;

  try {
    const report = await Report.find({
      userId,
      date: { $gte: new Date(startDate), $lte: new Date(endDate) }
    }).sort({ date: 1 }); // Sort by date if needed
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch report' });
  }
};

module.exports = {
  getReport
};
