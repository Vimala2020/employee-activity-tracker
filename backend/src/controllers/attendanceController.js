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
  const { startDate, endDate } = req.query;

  try {
    let query = { userId };

    // Add date filter if both startDate and endDate are provided
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
      console.log('Query with date filter:', query); // Debugging statement
    } else {
      console.log('Query without date filter:', query); // Debugging statement
    }

    const attendance = await Attendance.find(query); // Use the query with the date filter if applicable
    if (!attendance || attendance.length === 0) {
      return res.status(404).json({ message: 'No attendance records found.' });
    }
    res.status(200).json(attendance);
  } catch (error) {
    console.error('Error fetching attendance data:', error);
    res.status(500).send('Failed to fetch attendance data.');
  }
};

const getAllAttendance = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    let query = {};

    
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
      console.log('Query with date filter:', query); 
    } else {
      console.log('Query without date filter:', query);
    }

    console.log('Fetching all attendance records');
    const attendance = await Attendance.find(query); 
    if (!attendance || attendance.length === 0) {
      console.log('No attendance records found');
      return res.status(404).json({ message: 'No attendance records found.' });
    }
    console.log('Fetched attendance records:', attendance);
    res.status(200).json(attendance);
  } catch (error) {
    console.error('Error fetching all attendance data:', error);
    res.status(500).send('Failed to fetch attendance data.');
  }
};




module.exports = {
  markAttendance,
  getAttendance,
  getAllAttendance,
};
