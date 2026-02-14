import React from 'react';
import { UserCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { APP_CONFIG } from '../constants';
import Button from './atoms/Button';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getTitle = () => {
    const path = location.pathname;
    const titles = {
      '/dashboard': 'Dashboard',
      '/employees': 'Employees',
      '/attendance': 'Attendance',
      '/reports': 'Reports',
      '/settings': 'Settings'
    };
    return titles[path] || 'Attendance';
  };

  return (
    <header className="flex-none z-50 px-4 py-4 border-b border-slate-100 bg-white shadow-xs">
      <div className="flex justify-between items-center max-w-lg mx-auto w-full">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none mb-1.5">{getTitle()}</h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] leading-none">
            {APP_CONFIG.companyName}
          </p>
        </div>
        <Button
          variant="ghost"
          size="square"
          className="rounded-2xl bg-slate-50 border-slate-100/50"
          onClick={() => navigate('/settings')}
        >
          <UserCircle size={26} strokeWidth={1.5} />
        </Button>
      </div>
    </header>
  );
};

export default Header;
