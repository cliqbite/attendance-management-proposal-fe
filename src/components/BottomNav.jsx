import React from 'react';
import { LayoutDashboard, Users, CalendarCheck, FileText, Settings } from 'lucide-react';

const BottomNav = () => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: false },
    { icon: Users, label: 'Employees', active: false },
    { icon: CalendarCheck, label: 'Attendance', active: true },
    { icon: FileText, label: 'Reports', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-lg flex justify-around items-center py-2 px-1 pb-safe z-50 border-t border-gray-100">
      {navItems.map((item, idx) => (
        <button
          key={idx}
          className={`flex flex-col items-center justify-center space-y-1 py-1 px-2 rounded-xl transition-colors ${item.active ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-gray-900'
            }`}
        >
          <item.icon size={22} />
          <span className="text-[10px] font-medium tracking-tight">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
