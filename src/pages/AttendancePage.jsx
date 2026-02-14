import React, { useState } from 'react';
import VirtualizedAttendanceList from '../components/VirtualizedAttendanceList';
import AttendanceRow from '../components/AttendanceRow';
import Button from '../components/atoms/Button';
import { Save, RefreshCw, Lock, Search, Calendar, Filter, ChevronDown, Check } from 'lucide-react';
import { cn } from '../utils/cn';

const AttendancePage = ({
  employees,
  onStatusChange,
  onOTToggle,
  onOTChange,
  onHolidayToggle,
  onSundayToggle,
  onPublicHolidayToggle,
  onDetailClick,
  isLocked,
  setIsLocked
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isPublicHoliday, setIsPublicHoliday] = useState(false);

  const isSunday = false;

  const handlePublicHolidayChange = (val) => {
    setIsPublicHoliday(val);
    if (onPublicHolidayToggle) onPublicHolidayToggle(val);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 overflow-hidden">
      {/* HEADER SECTION - NO OVERFLOW OR STICKY, JUST FLEX-NONE */}
      <div className="flex-none bg-white border-b border-slate-100 z-30 shadow-sm relative">
        <div className="px-4 pt-4 pb-3 flex gap-2 overflow-x-auto no-scrollbar items-center">
          <Button variant="secondary" size="sm" className="gap-2 shrink-0">
            <Calendar size={14} className="text-brand-600" />
            <span className="truncate">Feb 14, 2026</span>
            <ChevronDown size={12} className="text-slate-400" />
          </Button>

          <label className={cn(
            "flex items-center gap-3 px-4 py-2 rounded-2xl cursor-pointer whitespace-nowrap border transition-all active:scale-95 shadow-sm shrink-0",
            isPublicHoliday
              ? "bg-purple-50 border-purple-200 text-purple-700 font-bold"
              : "bg-slate-50 border-slate-200 text-slate-500 font-bold"
          )}>
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                checked={isPublicHoliday}
                onChange={(e) => handlePublicHolidayChange(e.target.checked)}
                className="peer sr-only"
              />
              <div className="w-5 h-5 rounded-lg border-2 border-slate-300 peer-checked:bg-purple-600 peer-checked:border-transparent transition-all flex items-center justify-center">
                {isPublicHoliday && <Check size={12} className="text-white" strokeWidth={5} />}
              </div>
            </div>
            <span className="text-sm leading-none">Public Holiday</span>
          </label>

          <Button variant="secondary" size="square" className="ml-auto shrink-0">
            <Filter size={18} />
          </Button>
        </div>

        <div className="px-4 pb-4 space-y-4">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none">Attendance Sheet</h2>
            <div className="flex gap-2">
              <Button variant="ghost" size="xs" className="p-1 border-0">
                <RefreshCw size={16} />
              </Button>
              <Button
                variant={isLocked ? 'secondary' : 'outline'}
                size="sm"
                className={cn(isLocked && "bg-amber-50 border-amber-200 text-amber-600")}
                onClick={() => setIsLocked(!isLocked)}
              >
                <Lock size={12} className="mr-1.5" />
                {isLocked ? 'Locked' : 'Lock List'}
              </Button>
            </div>
          </div>

          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-500 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search employee or factory ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50/50 border border-slate-200/50 py-3.5 pl-12 pr-4 rounded-[1.25rem] shadow-inner-soft focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition-all font-medium text-slate-600 placeholder:text-slate-300 placeholder:font-bold text-sm"
            />
          </div>
        </div>
      </div>

      {/* BODY SECTION - FLEX-1 AND OVERFLOW-HIDDEN TO ALLOW INTERNAL SCROLL ONLY */}
      <div className="flex-1 overflow-hidden relative">
        <VirtualizedAttendanceList
          data={employees}
          globalFilter={searchQuery}
          RowComponent={AttendanceRow}
          estimateSize={280} // Explicit estimate including padding
          rowProps={{
            onStatusChange,
            onOTToggle,
            onOTChange,
            onHolidayToggle,
            onSundayToggle,
            onDetailClick,
            isLocked,
            isPublicHoliday,
            isSunday
          }}
        />

        <div className="absolute bottom-6 left-0 right-0 z-40 px-6 pointer-events-none">
          <Button variant="primary" size="lg" className="w-full h-15 pointer-events-auto shadow-2xl shadow-brand-200 flex items-center justify-center gap-3">
            <Save size={20} />
            Finalize Records
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;
