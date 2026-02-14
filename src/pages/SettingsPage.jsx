import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { CURRENT_USER, SETTINGS_MENU_GROUPS } from '../constants';
import { ChevronRight, LogOut, Lock, CheckCircle2, XCircle } from 'lucide-react';
import { apiService } from '../services/api';
import Button from '../components/atoms/Button';
import { cn } from '../utils/cn';

const SettingsPage = () => {
  const [isPasswordFormOpen, setIsPasswordFormOpen] = useState(false);
  const [passwords, setPasswords] = useState({ current: '', next: '' });
  const [msg, setMsg] = useState({ type: '', text: '' });

  const passwordMutation = useMutation({
    mutationFn: ({ current, next }) => apiService.updatePassword(current, next),
    onSuccess: () => {
      setMsg({ type: 'success', text: 'Password updated successfully!' });
      setPasswords({ current: '', next: '' });
      setTimeout(() => {
        setMsg({ type: '', text: '' });
        setIsPasswordFormOpen(false);
      }, 2000);
    },
    onError: (err) => {
      setMsg({ type: 'error', text: err.message || 'Failed to update password' });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwords.current || !passwords.next) {
      setMsg({ type: 'error', text: 'All fields are required' });
      return;
    }
    passwordMutation.mutate(passwords);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 p-6 no-scrollbar">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Settings</h1>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-[.2em] mt-1">Admin Control Panel</p>
        </div>

        {/* User Card */}
        <div className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm overflow-hidden flex items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-linear-to-br from-brand-600 to-brand-700 rounded-3xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-brand-100">
            {CURRENT_USER.avatar}
          </div>
          <div>
            <h3 className="font-black text-slate-900 text-lg leading-tight uppercase tracking-tight">{CURRENT_USER.name}</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{CURRENT_USER.role}</p>
            <p className="text-[10px] text-brand-600 font-black mt-0.5">{CURRENT_USER.id}</p>
          </div>
        </div>

        {/* Menu Groups */}
        {SETTINGS_MENU_GROUPS.map((group, idx) => (
          <div key={idx} className="mb-8 last:mb-0">
            <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[.3em] ml-2 mb-4">{group.title}</h2>
            <div className="space-y-3">
              {group.items.map((item, i) => (
                <div key={i}>
                  <button
                    onClick={() => item.label === 'Change Password' && setIsPasswordFormOpen(!isPasswordFormOpen)}
                    className="w-full bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group active:scale-[0.98] transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center transition-colors", item.bg, item.color)}>
                        <item.icon size={20} strokeWidth={2.5} />
                      </div>
                      <span className="font-black text-slate-700 text-sm uppercase tracking-tight">{item.label}</span>
                    </div>
                    <ChevronRight size={18} className={cn("text-slate-300 group-hover:text-brand-600 transition-all", isPasswordFormOpen && item.label === 'Change Password' && "rotate-90")} />
                  </button>

                  {/* Password Form Expansion */}
                  {isPasswordFormOpen && item.label === 'Change Password' && (
                    <form onSubmit={handleSubmit} className="mt-3 bg-white p-5 rounded-4xl border border-brand-100 shadow-lg shadow-brand-50/50 animate-fade-in space-y-4">
                      {msg.text && (
                        <div className={cn("flex items-center gap-2 p-3 rounded-xl text-[10px] font-black uppercase tracking-wider", msg.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600')}>
                          {msg.type === 'success' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                          {msg.text}
                        </div>
                      )}

                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Current Password</label>
                        <input
                          type="password"
                          value={passwords.current}
                          onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                          placeholder="••••••••"
                          className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/10 font-bold text-sm"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">New Password</label>
                        <input
                          type="password"
                          value={passwords.next}
                          onChange={(e) => setPasswords({ ...passwords, next: e.target.value })}
                          placeholder="••••••••"
                          className="w-full bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/10 font-bold text-sm"
                        />
                      </div>

                      <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        className="w-full"
                        isLoading={passwordMutation.isPending}
                      >
                        Secure New Password
                      </Button>
                    </form>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-12 mb-6">
          <Button variant="outline" size="lg" className="w-full text-rose-600 border-rose-100 hover:bg-rose-50 hover:border-rose-200" icon={LogOut}>
            Terminate Session
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
