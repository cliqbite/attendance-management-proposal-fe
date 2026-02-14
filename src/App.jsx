import React, { useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import EmployeeDetail from './components/EmployeeDetail';
import { apiService } from './services/api';

// Pages
import DashboardPage from './pages/DashboardPage';
import AttendancePage from './pages/AttendancePage';
import EmployeesPage from './pages/EmployeesPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const queryClient = useQueryClient();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

  // Fetch Employees
  const { data: employees = [], isLoading } = useQuery({
    queryKey: ['employees'],
    queryFn: apiService.getEmployees,
  });

  // Mutations
  const statusMutation = useMutation({
    mutationFn: ({ id, status }) => apiService.updateEmployeeStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['employees'] }),
  });

  const otToggleMutation = useMutation({
    mutationFn: ({ id, isOT, otUnits }) => apiService.updateEmployeeOT(id, isOT, otUnits),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['employees'] }),
  });

  const otChangeMutation = useMutation({
    mutationFn: ({ id, units }) => apiService.updateEmployeeOT(id, true, units),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['employees'] }),
  });

  const holidayMutation = useMutation({
    mutationFn: ({ id, isWorking }) => apiService.updateHolidayWorking(id, isWorking),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['employees'] }),
  });

  const sundayMutation = useMutation({
    mutationFn: ({ id, isWorking }) => apiService.updateSundayWorking(id, isWorking),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['employees'] }),
  });

  const publicHolidayBulkMutation = useMutation({
    mutationFn: (isHoliday) => apiService.setPublicHoliday(isHoliday),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['employees'] }),
  });

  const handleStatusChange = (id, status) => {
    if (isLocked) return;
    statusMutation.mutate({ id, status });
  };

  const handleOTToggle = (id, isOT) => {
    if (isLocked) return;
    otToggleMutation.mutate({ id, isOT, otUnits: isOT ? 1 : 0 });
  };

  const handleOTChange = (id, units) => {
    if (isLocked) return;
    otChangeMutation.mutate({ id, units });
  };

  const handleHolidayToggle = (id, isWorking) => {
    if (isLocked) return;
    holidayMutation.mutate({ id, isWorking });
  };

  const handleSundayToggle = (id, isWorking) => {
    if (isLocked) return;
    sundayMutation.mutate({ id, isWorking });
  };

  const handlePublicHolidayToggle = (isHoliday) => {
    if (isLocked) return;
    publicHolidayBulkMutation.mutate(isHoliday);
  };

  const openDetails = (emp) => {
    setSelectedEmployee(emp);
    setIsDetailOpen(true);
  };

  const stats = useMemo(() => {
    const counts = { total: employees.length, present: 0, absent: 0, leave: 0, ot: 0 };
    employees.forEach(emp => {
      if (emp.status === 'present') counts.present++;
      if (emp.status === 'absent') counts.absent++;
      if (emp.status === 'leave') counts.leave++;
      if (emp.isOT) counts.ot++;
    });
    return counts;
  }, [employees]);

  if (isLoading) {
    return (
      <div className="h-screen bg-white flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 border-4 border-blue-50 border-t-brand-600 rounded-full animate-spin mb-4 shadow-lg shadow-brand-50"></div>
        <p className="text-sm font-black text-slate-400 uppercase tracking-widest animate-pulse">Initializing System...</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      {/* Root Container: Force height to 100dvh and hide overflow to prevent window scrolling */}
      <div className="h-dvh bg-slate-50 font-sans overflow-hidden flex flex-col relative">
        <Header />

        {/* Main Content Area: Flex-1 to fill space, also hide overflow to let children manage it */}
        <main className="flex-1 overflow-hidden flex flex-col relative">
          <Routes>
            <Route path="/" element={<Navigate to="/attendance" replace />} />
            <Route path="/dashboard" element={<DashboardPage stats={stats} />} />
            <Route
              path="/attendance"
              element={
                <AttendancePage
                  employees={employees}
                  selectedDate={currentDate}
                  onDateChange={setCurrentDate}
                  onStatusChange={handleStatusChange}
                  onOTToggle={handleOTToggle}
                  onOTChange={handleOTChange}
                  onHolidayToggle={handleHolidayToggle}
                  onSundayToggle={handleSundayToggle}
                  onPublicHolidayToggle={handlePublicHolidayToggle}
                  onDetailClick={openDetails}
                  isLocked={isLocked}
                  setIsLocked={setIsLocked}
                />
              }
            />
            <Route
              path="/employees"
              element={
                <EmployeesPage
                  employees={employees}
                  onDetailClick={openDetails}
                  selectedMonth={selectedMonth}
                  onMonthChange={setSelectedMonth}
                />
              }
            />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>

        <EmployeeDetail
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          employee={selectedEmployee}
        />

        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;
