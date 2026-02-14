import React, { useRef } from 'react';
import { Search, Plus, Filter, FileSpreadsheet, Calendar, ChevronDown } from 'lucide-react';
import EmployeeVirtualList from '../components/EmployeeVirtualList';
import Button from '../components/atoms/Button';

const EmployeesPage = ({
  employees,
  onDetailClick,
  selectedMonth,
  onMonthChange
}) => {
  const monthInputRef = useRef(null);

  const formatMonthLabel = (monthStr) => {
    const [year, month] = monthStr.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  };

  const handleMonthButtonClick = () => {
    if (monthInputRef.current) {
      if ('showPicker' in HTMLInputElement.prototype) {
        monthInputRef.current.showPicker();
      } else {
        monthInputRef.current.click();
      }
    }
  };

  const handleExport = () => {
    alert(`Exporting Registry for ${formatMonthLabel(selectedMonth)}...`);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-50 relative overflow-hidden">
      <div className="flex-none bg-white p-6 pb-2 z-10 border-b border-slate-100">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Workforce</h1>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-[.2em] mt-1">Directory & Bio-data</p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <input
                ref={monthInputRef}
                type="month"
                value={selectedMonth}
                onChange={(e) => onMonthChange(e.target.value)}
                className="absolute inset-0 opacity-0 pointer-events-none"
              />
              <Button
                variant="secondary"
                size="sm"
                className="h-10 gap-2 border-slate-200"
                onClick={handleMonthButtonClick}
              >
                <Calendar size={14} className="text-brand-600" />
                <span className="font-bold text-slate-700">{formatMonthLabel(selectedMonth)}</span>
                <ChevronDown size={12} className="text-slate-400" />
              </Button>
            </div>

            <Button
              variant="outline"
              size="square"
              className="h-10 w-10 rounded-xl bg-slate-50 border-slate-100 text-slate-400 hover:text-brand-600 transition-colors"
              onClick={handleExport}
            >
              <FileSpreadsheet size={18} />
            </Button>

            <Button variant="primary" size="square" className="h-10 w-10 rounded-xl shadow-md shadow-brand-100" onClick={() => { }}>
              <Plus size={20} />
            </Button>
          </div>
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
      </div>
    </div>
  );
};

export default EmployeesPage;
