const express = require('express');
const { body, validationResult } = require('express-validator');

const workController = require('../controllers/workController');
const router = express.Router();
router.post('/submit', workController.submitWorkProgress);
router.get('/:userId', workController.getWorkProgress);

module.exports = router;
