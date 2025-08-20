import React, { useEffect, useState } from 'react'
import EmployeeForm from './components/EmployeeForm'
import API from './api'
export default function App(){
  const [employees, setEmployees] = useState([])
  useEffect(() => { fetchEmployees(); }, [])
  async function fetchEmployees(){ try{ const res = await API.get('/employees'); setEmployees(res.data); } catch(e){ console.error(e); } }
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Salary Slip Generator</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <EmployeeForm employees={employees} onSaved={fetchEmployees} />
      </div>
    </div>
  )
}
