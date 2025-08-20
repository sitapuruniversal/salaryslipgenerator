const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
function generateSalaryPDF(employee, slipData) {
  return new Promise((resolve, reject) => {
    const fileName = `slip_${employee.empId}_${slipData.month}_${slipData.year}_${Date.now()}.pdf`;
    const tmpDir = path.join(__dirname, '..', 'tmp');
    const filePath = path.join(tmpDir, fileName);
    fs.mkdirSync(tmpDir, { recursive: true });
    const doc = new PDFDocument({ size: 'A4', margin: 40 });
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);
    // Header
    doc.fontSize(20).text('Salary Slip', { align: 'center' });
    doc.moveDown();
    // Employee details
    doc.fontSize(12).text(`Employee Name: ${employee.name}`);
    doc.text(`Employee ID: ${employee.empId}`);
    doc.text(`Designation: ${employee.designation || '-'}`);
    doc.text(`Department: ${employee.department || '-'}`);
    doc.moveDown();
    // Salary table
    doc.text(`Month/Year: ${slipData.month}/${slipData.year}`);
    doc.text(`Basic: ₹${slipData.basic}`);
    doc.text(`HRA: ₹${slipData.hra}`);
    doc.text(`Allowances: ₹${slipData.allowances}`);
    doc.text(`Gross: ₹${slipData.gross}`);
    doc.text(`Deductions: ₹${slipData.deductions}`);
    doc.text(`Taxes: ₹${slipData.taxes}`);
    doc.text(`Net Salary: ₹${slipData.net}`);
    doc.moveDown();
    doc.text('This is a computer generated salary slip.', { align: 'center' });
    doc.end();
    stream.on('finish', () => resolve({ filePath, fileName }));
    stream.on('error', reject);
  });
}
module.exports = { generateSalaryPDF };
