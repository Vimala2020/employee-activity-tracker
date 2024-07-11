const express = require('express');
const router = express.Router();
const Department = require('../models/Department');

// Add a new department
router.post('/add', async (req, res) => {
    const { name } = req.body;
    try {
      // Check if department with the same name already exists
      const existingDepartment = await Department.findOne({ name });
      if (existingDepartment) {
        return res.status(409).json({ message: 'Department already exists' });
      }
  
      // Create new department
      const newDepartment = new Department({ name });
      await newDepartment.save();
      res.status(201).json({ message: 'Department successfully added', department: newDepartment });
    } catch (error) {
      console.error('Error adding department:', error);
      res.status(500).json({ message: 'Error adding department. Please try again later' });
    }
  });

// Get all departments
router.get('/', async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching details. Please try again' });
  }
});

// Edit a department
router.put('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedDepartment = await Department.findByIdAndUpdate(id, { name }, { new: true });
    res.status(200).json({ message: 'Department successfully updated', department: updatedDepartment });
  } catch (error) {
    res.status(500).json({ message: 'Error updating department. Please try again later' });
  }
});

// Delete a department
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Department.findByIdAndDelete(id);
    res.status(200).json({ message: 'Department Successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting department. Please try again later' });
  }
});

module.exports = router;
