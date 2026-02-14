import React, { useRef, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';

const VirtualizedAttendanceList = ({
  data,
  RowComponent,
  rowProps = {},
  globalFilter,
  estimateSize = 260 // Default to a larger size for attendance cards
}) => {
  const parentRef = useRef();

  const columns = useMemo(() => [{ accessorKey: 'id' }, { accessorKey: 'name' }], []);

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => estimateSize,
    overscan: 10,
    // Add dynamic measurement if needed, but for now, larger estimate + gap is safer
  });

  return (
    <div ref={parentRef} className="flex-1 overflow-auto no-scrollbar pb-32 h-full bg-slate-50">
      <div className="relative w-full" style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.key}
            className="absolute top-0 left-0 w-full px-4 pt-4" // Added pt-4 for consistent gap
            style={{
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <RowComponent
              data={rows.map(r => r.original)}
              index={virtualRow.index}
              {...rowProps}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualizedAttendanceList;
