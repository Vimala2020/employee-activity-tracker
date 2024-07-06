const express = require("express");
const getEmployee = require('../controllers/employee');
const router = express.Router();

router.get('/', getEmployee);

module.exports = router;

