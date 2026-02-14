import React from 'react';
import { DASHBOARD_STATS_CONFIG } from '../constants';
import { TrendingUp, Users, Calendar, ArrowUpRight } from 'lucide-react';
import { cn } from '../utils/cn';
import Button from '../components/atoms/Button';

const DashboardPage = ({ stats }) => {
  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-6 no-scrollbar">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-[.2em] mt-1">Operational Overview</p>
        </div>

        {/* Real-time Summary Card */}
        <div className="bg-linear-to-br from-brand-600 to-brand-700 p-6 rounded-[2.5rem] text-white shadow-2xl shadow-brand-200 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-md border border-white/20">
                <TrendingUp size={24} />
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-400/20 px-3 py-1.5 rounded-full border border-emerald-400/20 backdrop-blur-md">
                <ArrowUpRight size={14} className="text-emerald-300" />
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-100">+12% vs LW</span>
              </div>
            </div>
            <p className="text-[11px] font-black uppercase tracking-[0.3em] opacity-80 mb-1">Current Attendance</p>
            <div className="flex items-baseline gap-2">
              <h2 className="text-5xl font-black tracking-tighter">{((stats.present / stats.total) * 100).toFixed(1)}%</h2>
              <span className="text-sm font-bold opacity-60 uppercase tracking-widest px-2">Utilization</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {DASHBOARD_STATS_CONFIG.map((stat) => (
            <div key={stat.key} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm group hover:border-brand-100 hover:shadow-brand-50/50 transition-all duration-500">
              <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", stat.bg, stat.color)}>
                <stat.icon size={20} strokeWidth={2.5} />
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-slate-900 tracking-tight">{stats[stat.key]}</span>
                <span className="text-[10px] font-bold text-slate-400 lowercase">units</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Smart Actions</h3>
          <Button variant="secondary" size="lg" className="w-full justify-between group" icon={Users} iconPosition="left">
            <span>Manage Workforce</span>
            <ArrowUpRight size={18} className="text-slate-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Button>
          <Button variant="secondary" size="lg" className="w-full justify-between group" icon={Calendar} iconPosition="left">
            <span>Production Schedule</span>
            <ArrowUpRight size={18} className="text-slate-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
