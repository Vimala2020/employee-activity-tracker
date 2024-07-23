const express = require('express');
const router = express.Router();
const sendDailyReport = require('../config/email'); // Adjust the path accordingly

// Test endpoint for sending email
router.get('/test-email', async (req, res) => {
  const testReport = 'This is a test report for checking email functionality.';
  const managerEmail = process.env.EMAIL_MANAGER;

  try {
    sendDailyReport(managerEmail, testReport);
    res.status(200).send('Test email sent successfully.');
  } catch (error) {
    console.error('Error in /test-email endpoint:', error);
    res.status(500).send('Failed to send test email.');
  }
});

module.exports = router;

