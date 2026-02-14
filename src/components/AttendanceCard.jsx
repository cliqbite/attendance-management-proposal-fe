import React from 'react';
import { Clock, Info, ShieldCheck, CalendarRange, UserCheck, Minus, Plus } from 'lucide-react';
import { cn } from '../utils/cn';
import Button from './atoms/Button';
import Toggle from './atoms/Toggle';

const AttendanceCard = ({
  id,
  name,
  status,
  isOT,
  otUnits = 0,
  isHolidayWorking = false,
  isSundayWorking = false,
  isPublicHoliday = false,
  isSunday = false,
  onStatusChange,
  onOTToggle,
  onOTChange,
  onHolidayToggle,
  onSundayToggle,
  onDetailClick
}) => {
  const getAvatarColor = () => {
    const colors = ['bg-indigo-50 text-indigo-600', 'bg-emerald-50 text-emerald-600', 'bg-amber-50 text-amber-600', 'bg-rose-50 text-rose-600'];
    const index = (id.slice(-1).charCodeAt(0)) % colors.length;
    return colors[index];
  };

  const handleOTUpdate = (change) => {
    const newVal = Math.max(0, otUnits + change);
    if (onOTChange) onOTChange(newVal);
  };

  return (
    <div className="bg-white p-5 rounded-[2.5rem] border border-slate-100 transition-all duration-300 shadow-sm hover:shadow-md animate-fade-in mx-0.5">
      <div className="flex justify-between items-center mb-5">
        <div className="flex gap-4 items-center">
          <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shadow-inner transition-all", getAvatarColor())}>
            {name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 className="font-black text-slate-900 leading-tight text-base tracking-tight uppercase">{name}</h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.15em]">{id}</span>
              {status === 'present' && <UserCheck size={12} className="text-emerald-500" />}
            </div>
          </div>
        </div>
        <Button variant="ghost" size="square" onClick={onDetailClick} className="rounded-2xl border-slate-50">
          <Info size={20} className="text-slate-300" strokeWidth={2} />
        </Button>
      </div>

      {!isPublicHoliday && !isSunday && (
        <div className="grid grid-cols-4 gap-2.5 mb-5">
          <Button
            variant={status === 'present' ? 'emerald' : 'secondary'}
            size="sm"
            onClick={() => onStatusChange('present')}
            className="h-11 rounded-2xl"
          >P</Button>
          <Button
            variant={status === 'absent' ? 'danger' : 'secondary'}
            size="sm"
            onClick={() => onStatusChange('absent')}
            className="h-11 rounded-2xl"
          >A</Button>
          <Button
            variant={status === 'leave' ? 'purple' : 'secondary'}
            size="sm"
            onClick={() => onStatusChange('leave')}
            className="h-11 rounded-2xl"
          >CL</Button>
          <Button
            variant={status === 'half' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => onStatusChange('half')}
            className="h-11 rounded-2xl"
          >HD</Button>
        </div>
      )}

      <div className="space-y-3.5 p-4 bg-slate-50/50 rounded-3xl border border-slate-100/30">
        <div className="flex items-center justify-between min-h-[44px]">
          <div className="flex items-center gap-3">
            <Toggle
              variant="teal"
              checked={isOT}
              onChange={onOTToggle}
            />
            <div className="flex flex-col">
              <span className={cn("text-[10px] font-black uppercase tracking-widest transition-colors", isOT ? "text-teal-700" : "text-slate-500")}>
                OT Units
              </span>
              <span className="text-[8px] font-bold text-slate-400 leading-none">1 Unit = 4 Hrs</span>
            </div>
          </div>

          {isOT && (
            <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-xl border border-teal-100 shadow-sm animate-fade-in">
              <Button size="xs" variant="ghost" onClick={() => handleOTUpdate(-1)} disabled={otUnits <= 0} className="w-8 h-8 border-0 active:bg-teal-50">
                <Minus size={14} strokeWidth={3} className="text-teal-600" />
              </Button>
              <span className="text-sm font-black text-teal-700 min-w-[1.2rem] text-center">{otUnits}</span>
              <Button size="xs" variant="ghost" onClick={() => handleOTUpdate(1)} className="w-8 h-8 border-0 active:bg-teal-50">
                <Plus size={14} strokeWidth={3} className="text-teal-600" />
              </Button>
            </div>
          )}
        </div>

        {isPublicHoliday && (
          <div className="flex items-center gap-3 min-h-[44px]">
            <Toggle
              variant="purple"
              checked={isHolidayWorking}
              onChange={onHolidayToggle}
            />
            <span className={cn("text-[10px] font-black uppercase tracking-widest transition-colors", isHolidayWorking ? "text-purple-700" : "text-slate-500")}>
              Holiday Work
            </span>
          </div>
        )}

        {isSunday && (
          <div className="flex items-center gap-3 min-h-[44px]">
            <Toggle
              variant="indigo"
              checked={isSundayWorking}
              onChange={onSundayToggle}
            />
            <span className={cn("text-[10px] font-black uppercase tracking-widest transition-colors", isSundayWorking ? "text-indigo-700" : "text-slate-500")}>
              Sunday Work
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendanceCard;
