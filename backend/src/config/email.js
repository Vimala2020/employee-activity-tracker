const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const generateDailyReport = require('./report');

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendDailyReport = (managerEmail, report) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_MANAGER,
    subject: 'Daily Work and Attendance Report',
    text: report
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
  });
};


module.exports = sendDailyReport;
