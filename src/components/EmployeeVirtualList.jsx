import React from 'react';
import VirtualizedAttendanceList from './VirtualizedAttendanceList';
import EmployeeRow from './EmployeeRow';

const EmployeeVirtualList = ({ employees, onDetailClick }) => {
  return (
    <VirtualizedAttendanceList
      data={employees}
      RowComponent={EmployeeRow}
      rowProps={{ onDetailClick }}
      estimateSize={112} // h-24 (96px) + gap
    />
  );
};

export default EmployeeVirtualList;
