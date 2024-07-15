const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  department: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  joiningDate: { type: Date, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  id: { type: String, required: true },
  firebaseId: { type: String, required: true },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
