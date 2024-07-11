const Attendance = require('../models/Attendance');

exports.markAttendance = async (req, res) => {
  const { userId, status } = req.body;
  try {
    const attendance = new Attendance({ userId, status });
    await attendance.save();
    res.status(201).json({ message: 'Attendance marked successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAttendance = async (req, res) => {
  const { userId } = req.params;
  try {
    const attendance = await Attendance.find({ userId });
    res.status(200).json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
