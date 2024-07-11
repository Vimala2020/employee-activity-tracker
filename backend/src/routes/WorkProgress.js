const express = require('express');
const router = express.Router();
const workController = require('../controllers/workController');

router.post('/submit', workController.submitWorkProgress);
router.get('/:userId', workController.getWorkProgress);

module.exports = router;
