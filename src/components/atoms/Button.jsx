import React from 'react';
import { cn } from '../../utils/cn';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  isLoading,
  icon: Icon,
  iconPosition = 'left',
  ...props
}) => {
  const variants = {
    primary: 'bg-linear-to-br from-brand-600 to-brand-700 text-white shadow-lg shadow-brand-100 border-white/10 hover:shadow-brand-200',
    secondary: 'bg-white border border-slate-200 text-slate-700 shadow-xs hover:bg-slate-50',
    outline: 'bg-transparent border-2 border-slate-200 text-slate-600 hover:border-brand-500 hover:text-brand-600',
    ghost: 'bg-transparent text-slate-400 hover:text-brand-600 hover:bg-brand-50',
    danger: 'bg-rose-500 text-white shadow-lg shadow-rose-100 hover:bg-rose-600',
    teal: 'bg-teal-500 text-white shadow-lg shadow-teal-100 hover:bg-teal-600',
    purple: 'bg-purple-500 text-white shadow-lg shadow-purple-100 hover:bg-purple-600',
    indigo: 'bg-indigo-500 text-white shadow-lg shadow-indigo-100 hover:bg-indigo-600',
  };

  const sizes = {
    xs: 'px-2 py-1 text-[10px] rounded-lg',
    sm: 'px-3 py-1.5 text-xs rounded-xl font-black uppercase tracking-wider',
    md: 'px-4 py-2.5 text-sm rounded-2xl font-bold',
    lg: 'px-6 py-3.5 text-base rounded-[1.25rem] font-black uppercase tracking-widest',
    square: 'p-2.5 rounded-2xl',
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        'relative flex items-center justify-center transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 border',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        <div className="flex items-center gap-2">
          {Icon && iconPosition === 'left' && <Icon size={size === 'xs' ? 12 : 18} />}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && <Icon size={size === 'xs' ? 12 : 18} />}
        </div>
      )}
    </button>
  );
};

export default Button;
