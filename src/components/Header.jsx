import React from 'react';
import { Calendar, Filter, ChevronDown, UserCircle } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm px-4 py-3">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Attendance</h1>
          <p className="text-xs text-gray-500 font-medium font-sans">Harohalli Education Society</p>
        </div>
        <button className="p-1 text-gray-400 hover:text-gray-600">
          <UserCircle size={28} strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex gap-2 pb-1 overflow-x-auto no-scrollbar">
        <button className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-2 rounded-xl shadow-sm hover:bg-white transition-all">
          <Calendar size={16} className="text-blue-600" />
          <span className="text-sm font-semibold truncate">Feb 14, 2026</span>
          <ChevronDown size={14} className="text-gray-400" />
        </button>

        <label className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-2 rounded-xl shadow-sm cursor-pointer whitespace-nowrap">
          <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
          <span className="text-sm font-semibold text-purple-700">Public Holiday</span>
        </label>

        <button className="flex items-center justify-center p-2 bg-gray-50 border border-gray-200 rounded-xl shadow-sm">
          <Filter size={18} className="text-gray-600" />
        </button>
      </div>
    </header>
  );
};

export default Header;
