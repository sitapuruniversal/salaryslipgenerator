function calculateSalary({ basic=0, hra=0, allowances=0, deductions=0, taxes=0 }) {
  const gross = Number(basic) + Number(hra) + Number(allowances);
  const totalDeductions = Number(deductions) + Number(taxes);
  const net = gross - totalDeductions;
  return { gross, totalDeductions, net };
}
module.exports = { calculateSalary };
