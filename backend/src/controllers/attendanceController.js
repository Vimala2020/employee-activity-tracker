const Attendance = require('../models/Attendance'); // Adjust the path to your Attendance model
const sendDailyReport = require('../config/email'); // Adjust the path to your email module

const markAttendance = async (req, res) => {
  const attendanceData = req.body;
  try {
    // Save attendance data to the database
    await Attendance.create(attendanceData);
    console.log('Attendance marked successfully');

    // Generate daily report
    const report = `User ${attendanceData.userId} marked as ${attendanceData.status} on ${attendanceData.date}`;

    // Send email
    sendDailyReport(process.env.EMAIL_MANAGER, report);
    res.status(200).send('Attendance marked and email sent successfully.');
  } catch (error) {
    console.error('Error marking attendance and sending email:', error);
    res.status(500).send('Failed to mark attendance and send email.');
  }
};

const getAttendance = async (req, res) => {
  const { userId } = req.params;
  try {
    const attendance = await Attendance.find({ userId });
    if (!attendance) {
      return res.status(404).json({ message: 'No attendance records found.' });
    }
    res.status(200).json(attendance);
  } catch (error) {
    console.error('Error fetching attendance data:', error);
    res.status(500).send('Failed to fetch attendance data.');
  }
};

module.exports = {
  markAttendance,
  getAttendance
};
