import React from 'react';
import { ChevronRight, Clock, Info } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const AttendanceCard = ({
  id,
  name,
  status,
  isOT,
  otHours,
  onStatusChange,
  onOTToggle,
  onDetailClick
}) => {
  const statusConfig = {
    present: { label: 'P', color: 'text-white', bg: 'bg-emerald-500' },
    absent: { label: 'A', color: 'text-white', bg: 'bg-rose-500' },
    leave: { label: 'CL', color: 'text-white', bg: 'bg-amber-500' },
    half: { label: 'HD', color: 'text-white', bg: 'bg-blue-500' },
    holiday: { label: 'PH', color: 'text-white', bg: 'bg-purple-500' },
    sunday: { label: 'S', color: 'text-white', bg: 'bg-gray-500' },
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-3 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-semibold border-2 border-white shadow-sm">
            {name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 leading-tight">{name}</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{id}</p>
          </div>
        </div>
        <button
          onClick={onDetailClick}
          className="p-1 text-gray-300 hover:text-blue-500 transition-colors"
        >
          <Info size={20} />
        </button>
      </div>

      <div className="flex items-center justify-between gap-2 mb-4">
        {['present', 'absent', 'leave', 'half'].map((key) => (
          <button
            key={key}
            onClick={() => onStatusChange(key)}
            className={cn(
              "flex-1 h-10 rounded-xl transition-all flex items-center justify-center font-bold text-xs",
              status === key
                ? `${statusConfig[key].bg} ${statusConfig[key].color} shadow-lg shadow-blue-100 scale-105`
                : "bg-gray-50 text-gray-500 border border-gray-100"
            )}
          >
            {statusConfig[key].label}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-50">
        <label className="flex items-center gap-2 cursor-pointer group">
          <div className="relative">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={isOT}
              onChange={(e) => onOTToggle(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
          </div>
          <span className="text-xs font-bold text-gray-600 group-hover:text-teal-600 transition-colors uppercase tracking-tight flex items-center gap-1">
            <Clock size={12} /> OT Mode
          </span>
        </label>

        {isOT && (
          <div className="flex items-center gap-1">
            <input
              type="number"
              value={otHours}
              readOnly
              className="w-12 h-8 bg-teal-50 border border-teal-100 rounded-lg text-teal-700 text-center font-bold text-sm focus:outline-none"
            />
            <span className="text-[10px] font-bold text-teal-600 uppercase">Hrs</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceCard;
