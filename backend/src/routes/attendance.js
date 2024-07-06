const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController.js');

router.post('/mark', attendanceController.markAttendance);
router.get('/', attendanceController.getAttendance);

module.exports = router;
