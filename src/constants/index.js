import { LayoutDashboard, Users, CalendarCheck, FileText, Settings, UserCheck, UserX, Clock, Coffee, Shield, Bell, User, Lock, LogOut } from 'lucide-react';

// Branding & Config
export const APP_CONFIG = {
  companyName: 'Factory Management System',
  systemName: 'Attendance Pro',
  version: '2.0.0-gold'
};

// Navigation Items
export const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Users, label: 'Employees', path: '/employees' },
  { icon: CalendarCheck, label: 'Attendance', path: '/attendance' },
  { icon: FileText, label: 'Reports', path: '/reports' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

// Dashboard Metrics Config
export const DASHBOARD_STATS_CONFIG = [
  { label: 'Total', key: 'total', icon: Users, color: 'text-slate-600', bg: 'bg-slate-100' },
  { label: 'Present', key: 'present', icon: UserCheck, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  { label: 'Absent', key: 'absent', icon: UserX, color: 'text-rose-600', bg: 'bg-rose-100' },
  { label: 'Leave', key: 'leave', icon: Coffee, color: 'text-purple-600', bg: 'bg-purple-100' },
  { label: 'OT', key: 'ot', icon: Clock, color: 'text-teal-600', bg: 'bg-teal-100' },
];

// Settings Menu Config
export const SETTINGS_MENU_GROUPS = [
  {
    title: 'Security',
    items: [
      { icon: Lock, label: 'Change Password', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    ]
  }
];

// Mock User Meta
export const CURRENT_USER = {
  name: 'Admin User',
  role: 'Factory Manager',
  id: 'MGR-0892',
  avatar: 'AU'
};

// Data Generation Logic
export const generateMockEmployees = (count = 1000) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `EMP${String(i + 1).padStart(3, '0')}`,
    name: i === 0 ? 'Shubham Kumar' : i === 1 ? 'Anjali Sharma' : ['Vikram Aditya', 'Sneha Reddy', 'Rajesh Patel', 'Priya Singh', 'Amitabh Bachan', 'Salman Khan', 'Deepika Pad'][i % 7] + ' ' + (i + 1),
    status: ['present', 'absent', 'half', 'leave'][i % 4],
    isOT: i % 5 === 0,
    otUnits: i % 5 === 0 ? 1 : 0,
    isSundayWorking: false,
    isHolidayWorking: false,
  }));
};
