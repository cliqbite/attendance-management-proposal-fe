import React, { useState } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import DashboardCards from './components/DashboardCards';
import AttendanceCard from './components/AttendanceCard';
import EmployeeDetail from './components/EmployeeDetail';
import { Save, RefreshCw, Lock } from 'lucide-react';

const initialEmployees = [
  { id: 'EMP001', name: 'Shubham Kumar', status: 'present', isOT: false, otHours: 0 },
  { id: 'EMP002', name: 'Anjali Sharma', status: 'present', isOT: true, otHours: 2.5 },
  { id: 'EMP003', name: 'Rajesh Patel', status: 'absent', isOT: false, otHours: 0 },
  { id: 'EMP004', name: 'Priya Singh', status: 'half', isOT: false, otHours: 0 },
  { id: 'EMP005', name: 'Vikram Aditya', status: 'present', isOT: true, otHours: 4 },
  { id: 'EMP006', name: 'Sneha Reddy', status: 'leave', isOT: false, otHours: 0 },
];

function App() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const handleStatusChange = (id, status) => {
    if (isLocked) return;
    setEmployees(prev => prev.map(emp => emp.id === id ? { ...emp, status } : emp));
  };

  const handleOTToggle = (id, isOT) => {
    if (isLocked) return;
    setEmployees(prev => prev.map(emp => emp.id === id ? { ...emp, isOT, otHours: isOT ? 1 : 0 } : emp));
  };

  const openDetails = (emp) => {
    setSelectedEmployee(emp);
    setIsDetailOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans">
      <Header />

      <main className="px-4 pt-2">
        <DashboardCards />

        <div className="flex justify-between items-center mb-4 mt-2">
          <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest">Attendance Sheet</h2>
          <div className="flex gap-2">
            <button className="p-2 bg-white rounded-xl shadow-sm border border-gray-100 text-gray-400 active:rotate-180 transition-transform duration-500">
              <RefreshCw size={16} />
            </button>
            <button
              onClick={() => setIsLocked(!isLocked)}
              className={`p-2 rounded-xl shadow-sm border transition-colors flex items-center gap-1 ${isLocked ? 'bg-amber-50 border-amber-200 text-amber-600' : 'bg-white border-gray-100 text-gray-400'}`}
            >
              <Lock size={16} />
              {isLocked && <span className="text-[10px] font-black uppercase">Locked</span>}
            </button>
          </div>
        </div>

        <div className={isLocked ? 'opacity-70 pointer-events-none' : ''}>
          {employees.map(emp => (
            <AttendanceCard
              key={emp.id}
              {...emp}
              onStatusChange={(status) => handleStatusChange(emp.id, status)}
              onOTToggle={(isOT) => handleOTToggle(emp.id, isOT)}
              onDetailClick={() => openDetails(emp)}
            />
          ))}
        </div>

        <div className="mt-8 mb-4">
          <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-200 flex items-center justify-center gap-2 active:scale-[0.98] transition-all">
            <Save size={18} />
            Save Attendance
          </button>
        </div>
      </main>

      <EmployeeDetail
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        employee={selectedEmployee}
      />

      <BottomNav />
    </div>
  );
}

export default App;
