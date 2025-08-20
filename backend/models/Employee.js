const mongoose = require('mongoose');
const EmployeeSchema = new mongoose.Schema({
  empId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  designation: String,
  department: String,
  email: String,
  phone: String,
  bankName: String,
  bankAccount: String,
  pan: String,
  aadhar: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Employee', EmployeeSchema);
