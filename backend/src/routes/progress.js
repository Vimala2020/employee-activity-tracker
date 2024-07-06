const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');

router.post('/submit', progressController.submitProgress);
router.get('/', progressController.getProgress);

module.exports = router;
