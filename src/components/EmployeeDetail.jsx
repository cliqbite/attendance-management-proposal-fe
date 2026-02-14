import React from 'react';
import { X, Clock, Calendar, Fingerprint } from 'lucide-react';

const EmployeeDetail = ({ isOpen, onClose, employee }) => {
  if (!isOpen || !employee) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white rounded-t-[32px] shadow-2xl p-6 pb-12 transition-transform">
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6" />

        <div className="flex justify-between items-start mb-8">
          <div className="flex gap-4 items-center">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xl border-2 border-white shadow-md">
              {employee.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-900 leading-tight">{employee.name}</h2>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                <Fingerprint size={12} /> {employee.id}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-gray-900 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-gray-400">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Today's Status</p>
              <p className="text-sm font-bold text-gray-900 capitalize">{employee.status}</p>
            </div>
          </div>

          <div className="bg-teal-50/50 p-5 rounded-3xl border border-teal-100">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-teal-100 text-teal-600 rounded-lg">
                  <Clock size={18} />
                </div>
                <h4 className="font-bold text-teal-700">Overtime Details</h4>
              </div>
              <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${employee.isOT ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {employee.isOT ? 'Enabled' : 'Disabled'}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1">
                <p className="text-[10px] font-bold text-teal-600 uppercase mb-2">OT Hours</p>
                <input
                  type="range"
                  min="0"
                  max="8"
                  step="0.5"
                  defaultValue={employee.otHours}
                  disabled={!employee.isOT}
                  className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer accent-teal-500 border border-teal-100"
                />
              </div>
              <div className="w-16 h-12 bg-white rounded-2xl border-2 border-teal-100 flex items-center justify-center">
                <span className="text-lg font-black text-teal-700">{employee.otHours}</span>
                <span className="text-[10px] ml-0.5 font-bold text-teal-500">h</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl active:scale-[0.98] transition-all"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EmployeeDetail;
