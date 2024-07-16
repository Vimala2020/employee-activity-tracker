const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// Add a new employee
router.post('/add', async (req, res) => {
  const employee = new Employee(req.body);

  try {
    const newEmployee = await employee.save();
    res.status(201).json({ employee: newEmployee, message: 'Employee added successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an employee

router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ message: 'Error deleting employee. Please try again later' });
  }
});

// Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees. Please try again later' });
  }
});


module.exports = router;
