import React, { useState } from 'react'
import API from '../api'
export default function EmployeeForm({ employees, onSaved }){
  const [empData, setEmpData] = useState({ empId: '', name: '', designation: '', department: '' })
  const [slip, setSlip] = useState({ employeeId: '', month: new Date().getMonth()+1, year: new Date().getFullYear(), basic: 0, hra:0, allowances:0, deductions:0, taxes:0 })
  const [loading, setLoading] = useState(false)
  async function saveEmployee(e){
    e.preventDefault();
    try{ await API.post('/employees', empData); setEmpData({ empId: '', name: '', designation: '', department: '' }); onSaved && onSaved(); alert('Employee saved'); }catch(e){ console.error(e); alert('Error saving'); }
  }
  async function generateSlip(e){
    e.preventDefault();
    setLoading(true);
    try{ const payload = { ...slip }; const res = await API.post('/slips', payload); alert('Slip generated and uploaded to Drive'); console.log(res.data); }catch(err){ console.error(err); alert('Error generating slip'); }
    setLoading(false);
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <form onSubmit={saveEmployee} className="space-y-3">
        <h2 className="font-semibold">Add Employee</h2>
        <input value={empData.empId} onChange={e=>setEmpData({...empData, empId:e.target.value})} placeholder="Emp ID" className="input" required />
        <input value={empData.name} onChange={e=>setEmpData({...empData, name:e.target.value})} placeholder="Name" className="input" required />
        <input value={empData.designation} onChange={e=>setEmpData({...empData, designation:e.target.value})} placeholder="Designation" className="input" />
        <input value={empData.department} onChange={e=>setEmpData({...empData, department:e.target.value})} placeholder="Department" className="input" />
        <button className="btn" type="submit">Save Employee</button>
      </form>
      <form onSubmit={generateSlip} className="space-y-3">
        <h2 className="font-semibold">Generate Slip</h2>
        <select value={slip.employeeId} onChange={e=>setSlip({...slip, employeeId:e.target.value})} className="input" required>
          <option value="">Select Employee</option>
          {employees.map(emp=> <option key={emp._id} value={emp._id}>{emp.name} ({emp.empId})</option>)}
        </select>
        <div className="flex gap-2">
          <input type="number" value={slip.month} onChange={e=>setSlip({...slip, month:Number(e.target.value)})} className="input" min={1} max={12} />
          <input type="number" value={slip.year} onChange={e=>setSlip({...slip, year:Number(e.target.value)})} className="input" />
        </div>
        <input type="number" value={slip.basic} onChange={e=>setSlip({...slip, basic:Number(e.target.value)})} placeholder="Basic" className="input" />
        <input type="number" value={slip.hra} onChange={e=>setSlip({...slip, hra:Number(e.target.value)})} placeholder="HRA" className="input" />
        <input type="number" value={slip.allowances} onChange={e=>setSlip({...slip, allowances:Number(e.target.value)})} placeholder="Allowances" className="input" />
        <input type="number" value={slip.deductions} onChange={e=>setSlip({...slip, deductions:Number(e.target.value)})} placeholder="Deductions" className="input" />
        <input type="number" value={slip.taxes} onChange={e=>setSlip({...slip, taxes:Number(e.target.value)})} placeholder="Taxes" className="input" />
        <button className="btn" type="submit" disabled={loading}>{loading ? 'Generating...' : 'Generate & Save Slip'}</button>
      </form>
    </div>
  )
}
