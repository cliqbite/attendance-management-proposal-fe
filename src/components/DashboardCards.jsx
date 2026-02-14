import React from 'react';
import { Users, UserCheck, UserX, Clock, Coffee } from 'lucide-react';

const DashboardCards = () => {
  const stats = [
    { label: 'Total', value: 48, icon: Users, color: 'text-gray-600', bg: 'bg-gray-100' },
    { label: 'Present', value: 42, icon: UserCheck, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { label: 'Absent', value: 3, icon: UserX, color: 'text-rose-600', bg: 'bg-rose-100' },
    { label: 'Leave', value: 2, icon: Coffee, color: 'text-amber-600', bg: 'bg-amber-100' },
    { label: 'OT', value: 12, icon: Clock, color: 'text-teal-600', bg: 'bg-teal-100' },
  ];

  return (
    <div className="flex gap-3 overflow-x-auto px-4 py-4 no-scrollbar">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="flex-shrink-0 bg-white p-3 rounded-2xl border border-gray-100 w-28 flex flex-col items-center gap-1 shadow-sm"
        >
          <div className={`p-2 rounded-xl ${stat.bg} ${stat.color} mb-1`}>
            <stat.icon size={18} />
          </div>
          <span className="text-lg font-black text-gray-900">{stat.value}</span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{stat.label}</span>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
