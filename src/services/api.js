import { generateMockEmployees } from '../constants';

// Simulated database
let cachedEmployees = null;
let currentUserPassword = 'password123';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const apiService = {
  getEmployees: async () => {
    await sleep(1000);
    if (!cachedEmployees) {
      cachedEmployees = generateMockEmployees(1000);
    }
    return [...cachedEmployees];
  },

  updateEmployeeStatus: async (employeeId, status) => {
    await sleep(300);
    if (cachedEmployees) {
      cachedEmployees = cachedEmployees.map(emp =>
        emp.id === employeeId ? { ...emp, status } : emp
      );
    }
    return { success: true };
  },

  updateEmployeeOT: async (employeeId, isOT, otUnits) => {
    await sleep(300);
    if (cachedEmployees) {
      cachedEmployees = cachedEmployees.map(emp =>
        emp.id === employeeId ? { ...emp, isOT, otUnits } : emp
      );
    }
    return { success: true };
  },

  updateHolidayWorking: async (employeeId, isWorking) => {
    await sleep(300);
    if (cachedEmployees) {
      cachedEmployees = cachedEmployees.map(emp =>
        emp.id === employeeId ? { ...emp, isHolidayWorking: isWorking, status: isWorking ? 'present' : 'holiday' } : emp
      );
    }
    return { success: true };
  },

  updateSundayWorking: async (employeeId, isWorking) => {
    await sleep(300);
    if (cachedEmployees) {
      cachedEmployees = cachedEmployees.map(emp =>
        emp.id === employeeId ? { ...emp, isSundayWorking: isWorking, status: isWorking ? 'present' : 'sunday' } : emp
      );
    }
    return { success: true };
  },

  setPublicHoliday: async (isHoliday) => {
    await sleep(800);
    if (cachedEmployees) {
      cachedEmployees = cachedEmployees.map(emp => ({
        ...emp,
        status: isHoliday ? 'holiday' : emp.status,
        isHolidayWorking: false
      }));
    }
    return { success: true };
  },

  updatePassword: async (currentPassword, newPassword) => {
    await sleep(1000);
    if (currentPassword !== currentUserPassword) {
      throw new Error('Current password incorrect');
    }
    currentUserPassword = newPassword;
    return { success: true };
  }
};
