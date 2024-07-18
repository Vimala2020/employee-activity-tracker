const Attendance = require('../models/Attendance');

exports.markAttendance = async function(req, res) {
  const { userId, status } = req.body;
  try {
    if (!userId || !status) {
      throw new Error("Missing required fields: userId, or status");
    }
    const attendance = new Attendance({ userId, status, date: new Date() });
    console.log('Saving attendance record:', attendance); // Debug log
    await attendance.save();
    res.status(201).json({ message: 'Attendance marked successfully' });
  } catch (err) {
    console.error('Error marking attendance:', err.message); // Enhanced logging
    res.status(500).json({ error: err.message });
  }
};

exports.getAttendance = async function(req, res) {
  const { userId } = req.params;
  try {
    console.log('Fetching attendance for user:', userId); // Debug log
    const attendance = await Attendance.find({ userId });
    res.status(200).json(attendance);
  } catch (err) {
    console.error('Error fetching attendance:', err.message); // Enhanced logging
    res.status(500).json({ error: err.message });
  }
};
