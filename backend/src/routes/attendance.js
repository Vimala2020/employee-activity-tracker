const express = require('express');
const { body, validationResult } = require('express-validator');
const attendanceController = require('../controllers/attendanceController');

const router = express.Router();

// Validation middleware
const validateAttendance = [
  body('userId').notEmpty().withMessage('User ID is required'),
  body('status').isIn(['present', 'absent']).withMessage('Status must be either "present" or "absent"'),
];

router.post('/mark', validateAttendance, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, attendanceController.markAttendance);

router.get('/:userId', attendanceController.getAttendance);

module.exports = router;
