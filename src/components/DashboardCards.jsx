import React from 'react';
import { DASHBOARD_STATS_CONFIG } from '../constants';

const DashboardCards = ({ stats }) => {
  return (
    <div className="flex gap-3 overflow-x-auto px-1 py-4 no-scrollbar">
      {DASHBOARD_STATS_CONFIG.map((config, idx) => (
        <div
          key={idx}
          className="flex-shrink-0 bg-white p-3 rounded-2xl border border-gray-100 w-28 flex flex-col items-center gap-1 shadow-sm"
        >
          <div className={`p-2 rounded-xl ${config.bg} ${config.color} mb-1`}>
            <config.icon size={18} />
          </div>
          <span className="text-lg font-black text-gray-900">{stats[config.key] || 0}</span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{config.label}</span>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
