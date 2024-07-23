const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

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
    to: managerEmail,
    subject: 'Daily Work and Attendance Report',
    text: report
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return;
    }
    console.log('Email sent successfully:', info.response);
  });
};

module.exports = sendDailyReport;
