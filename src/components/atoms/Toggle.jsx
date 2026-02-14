import React from 'react';
import { cn } from '../../utils/cn';

const Toggle = ({
  checked,
  onChange,
  variant = 'brand',
  disabled = false
}) => {
  const variants = {
    brand: 'peer-checked:bg-brand-500',
    teal: 'peer-checked:bg-teal-500',
    purple: 'peer-checked:bg-purple-500',
    indigo: 'peer-checked:bg-indigo-500',
    emerald: 'peer-checked:bg-emerald-500',
  };

  return (
    <div className="relative inline-flex items-center cursor-pointer group">
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <div className={cn(
        "w-10 h-5.5 bg-slate-200 rounded-full transition-all duration-300",
        "after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all after:shadow-sm",
        "peer-checked:after:translate-x-4.5 peer-active:after:w-5",
        variants[variant]
      )}></div>
    </div>
  );
};

export default Toggle;
