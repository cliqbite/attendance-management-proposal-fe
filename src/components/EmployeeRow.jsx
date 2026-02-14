import React from 'react';

const EmployeeRow = ({ data, index, onDetailClick }) => {
  const employee = data[index];
  if (!employee) return null;

  return (
    <div
      onClick={() => onDetailClick(employee)}
      className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm active:scale-[0.98] transition-all cursor-pointer flex justify-between items-center group hover:border-brand-100 hover:shadow-md h-24"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center font-black text-xs group-hover:bg-brand-50 group-hover:text-brand-600 transition-colors">
          {employee.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <h4 className="font-black text-slate-800 text-sm uppercase tracking-tight">{employee.name}</h4>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{employee.id}</p>
        </div>
      </div>
      <div className="text-[9px] font-black uppercase tracking-widest text-brand-600 bg-brand-50 px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all">
        Profile Detail
      </div>
    </div>
  );
};

export default EmployeeRow;
