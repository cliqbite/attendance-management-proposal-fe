import React from 'react';
import { Search, Plus, Filter, FileSpreadsheet } from 'lucide-react';
import EmployeeVirtualList from '../components/EmployeeVirtualList';
import Button from '../components/atoms/Button';

const EmployeesPage = ({ employees, onDetailClick }) => {
  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 relative overflow-hidden">
      <div className="flex-none bg-white p-6 pb-2 z-10">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Workforce</h1>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-[.2em] mt-1">Directory & Bio-data</p>
          </div>
          <Button variant="primary" size="square" className="rounded-2xl" onClick={() => { }}>
            <Plus size={24} />
          </Button>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
          <Button variant="secondary" size="sm" className="whitespace-nowrap" icon={Filter}>All Dept</Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap">Production</Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap">Quality</Button>
          <Button variant="outline" size="sm" className="whitespace-nowrap">Logistics</Button>
        </div>

        <div className="relative group mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-brand-500 transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search identity..."
            className="w-full bg-slate-50/50 border border-slate-200/50 py-3.5 pl-12 pr-4 rounded-[1.25rem] shadow-inner-soft focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/10 transition-all font-medium text-slate-600 placeholder:text-slate-300 placeholder:font-bold text-sm"
          />
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative">
        <EmployeeVirtualList employees={employees} onDetailClick={onDetailClick} />

        <div className="absolute bottom-6 left-0 right-0 z-40 px-6 pointer-events-none">
          <Button variant="primary" size="lg" className="w-full h-15 pointer-events-auto bg-slate-900 text-white border-0 shadow-2xl flex items-center justify-center gap-3" icon={FileSpreadsheet}>
            Export Registry
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmployeesPage;
