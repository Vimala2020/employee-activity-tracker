const cron = require('node-cron');
const generateDailyReport = require('../report');

const scheduler = () => {
  // Schedule the job to run at the end of every day (e.g., at 23:59)
  cron.schedule('59 23 * * *', () => {
    const today = new Date();
    generateDailyReport(today);
  });
};

module.exports = scheduler;
