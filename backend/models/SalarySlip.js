const mongoose = require('mongoose');
const SalarySlipSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  month: Number,
  year: Number,
  basic: Number,
  hra: Number,
  allowances: Number,
  deductions: Number,
  taxes: Number,
  net: Number,
  pdfFileName: String,
  driveFileId: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('SalarySlip', SalarySlipSchema);
