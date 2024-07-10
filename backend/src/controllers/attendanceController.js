const Attendance = require('../models/Attendance');
const User = require('../models/User');

exports.markAttendance = async (req, res) => {
  const { userId, status } = req.body;

  try {
    const attendance = new Attendance({ userId, status });
    await attendance.save();
    res.status(200).send('Attendance marked successfully');
  } catch (error) {
    res.status(500).send('Error marking attendances');
  }
};

exports.getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.find().populate('userId', 'name email');
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).send('Error fetching attendance datas');
  }
};
