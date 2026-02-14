import React from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '../constants';

const BottomNav = () => {
  return (
    <nav className="flex-none bg-white/90 backdrop-blur-xl border-t border-slate-100 flex justify-around items-center py-3 px-2 pb-[calc(1.5rem+env(safe-area-inset-bottom))] z-50">
      {NAV_ITEMS.map((item, idx) => (
        <NavLink
          key={idx}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-1.5 px-4 py-1 rounded-2xl transition-all duration-300 ${isActive
              ? 'text-brand-600 bg-brand-50/50 scale-105'
              : 'text-slate-400 hover:text-slate-600'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <item.icon
                size={20}
                className={isActive ? 'stroke-[3]' : 'stroke-[2]'}
              />
              <span className="text-[10px] font-black tracking-widest uppercase leading-none">
                {item.label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
