const express = require('express');
const router = express.Router();
const SalarySlip = require('../models/SalarySlip');
const Employee = require('../models/Employee');
const { calculateSalary } = require('../utils/calc');
const { generateSalaryPDF } = require('../services/pdfService');
const { uploadFileToDrive } = require('../services/driveService');
const fs = require('fs');
// Create slip
router.post('/', async (req, res) => {
  try {
    const { employeeId, month, year, basic, hra, allowances, deductions, taxes } = req.body;
    const employee = await Employee.findById(employeeId);
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    const calc = calculateSalary({ basic, hra, allowances, deductions, taxes });
    const slipData = { month, year, basic, hra, allowances, deductions, taxes, gross: calc.gross, net: calc.net };
    // generate PDF
    const { filePath, fileName } = await generateSalaryPDF(employee, slipData);
    // upload to google drive
    let driveRes = null;
    try { driveRes = await uploadFileToDrive(filePath, fileName); } catch(e){ console.error('Drive upload failed', e); }
    // save record
    const slip = new SalarySlip({
      employee: employee._id,
      month, year, basic, hra, allowances, deductions, taxes, net: calc.net,
      pdfFileName: fileName,
      driveFileId: driveRes ? driveRes.id : undefined
    });
    await slip.save();
    // cleanup local tmp file
    try { fs.unlinkSync(filePath); } catch(e){}
    res.json({ slip, driveRes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
// list slips with optional filters
router.get('/', async (req, res) => {
  const { empId, month, year } = req.query;
  const q = {};
  if (empId) q.employee = empId;
  if (month) q.month = Number(month);
  if (year) q.year = Number(year);
  const slips = await SalarySlip.find(q).populate('employee').sort({ createdAt: -1 }).limit(200);
  res.json(slips);
});
module.exports = router;
