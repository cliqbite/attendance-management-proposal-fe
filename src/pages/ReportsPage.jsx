import React from 'react';
import { FileText, Download, Calendar } from 'lucide-react';

const ReportsPage = () => {
  return (
    <div className="flex-1 px-4 py-6">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-gray-900">Reports</h2>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Data & Analytics</p>
      </div>

      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                <FileText size={20} />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Attendance_Repo_Feb_{10 + i}.pdf</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase">Feb {10 + i}, 2026</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-blue-600">
              <Download size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsPage;
