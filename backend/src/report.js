const Attendance = require('./models/Attendance');
const WorkProgress = require('./models/WorkProgress');

const getAttendanceForDate = async (date) => {
  try {
    const start = new Date(date.setHours(0, 0, 0, 0));
    const end = new Date(date.setHours(23, 59, 59, 999));

    const attendances = await Attendance.find({
      date: {
        $gte: start,
        $lt: end
      }
    }).populate('userId', 'name email');

    const workProgresses = await WorkProgress.find({
      date: {
        $gte: start,
        $lt: end
      }
    }).populate('userId', 'name email');

    return attendances.map(attendance => {
      const workProgress = workProgresses.find(progress => progress.userId.equals(attendance.userId));
      return {
        employeeId: attendance.userId._id,
        name: attendance.userId.name,
        email: attendance.userId.email,
        status: attendance.status,
        workProgress: workProgress ? workProgress.workSummary : 'No work progress submitted'
      };
    });
  } catch (error) {
    console.error('Error fetching attendance for date:', error);
    throw error;
  }
};

const generateDailyReport = async (date) => {
  const attendances = await getAttendanceForDate(date);
  let report = `Daily Work and Attendance Report for ${date.toDateString()}\n\n`;

  attendances.forEach((attendance) => {
    report += `Employee Name: ${attendance.name}\n`;
    report += `Email: ${attendance.email}\n`;
    report += `Status: ${attendance.status}\n`;
    report += `Work Progress: ${attendance.workProgress}\n\n`;
  });

  return report;
};

module.exports = generateDailyReport;
