const express = require('express');
const { body, validationResult } = require('express-validator');
const workController = require('../controllers/workController');
const router = express.Router();

const validateProgresses = [
  body('userId').notEmpty().withMessage('User ID is required'),
  body('work').notEmpty().withMessage('Work is required'),
];

router.post('/submit', validateProgresses, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}, workController.submitProgresses);

router.get('/:userId', workController.getProgresses);

module.exports = router;
