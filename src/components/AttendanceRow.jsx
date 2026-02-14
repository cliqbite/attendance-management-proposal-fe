import React from 'react';
import AttendanceCard from './AttendanceCard';

const AttendanceRow = ({
  data,
  index,
  onStatusChange,
  onOTToggle,
  onOTChange,
  onHolidayToggle,
  onSundayToggle,
  onDetailClick,
  isLocked,
  isPublicHoliday,
  isSunday
}) => {
  const employee = data[index];
  if (!employee) return null;

  return (
    <AttendanceCard
      {...employee}
      onStatusChange={(status) => onStatusChange(employee.id, status)}
      onOTToggle={(isOT) => onOTToggle(employee.id, isOT)}
      onOTChange={(units) => onOTChange(employee.id, units)}
      onHolidayToggle={(isWorking) => onHolidayToggle(employee.id, isWorking)}
      onSundayToggle={(isWorking) => onSundayToggle(employee.id, isWorking)}
      onDetailClick={() => onDetailClick(employee)}
      isLocked={isLocked}
      isPublicHoliday={isPublicHoliday}
      isSunday={isSunday}
    />
  );
};

export default AttendanceRow;
