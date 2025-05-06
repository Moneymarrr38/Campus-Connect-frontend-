// backend/src/utils/saveToFile.ts
import fs from 'fs';
import path from 'path';

const attendanceFilePath = path.join(__dirname, '../../data/attendance.json');

export const loadAttendanceFromFile = () => {
  try {
    if (!fs.existsSync(attendanceFilePath)) {
      fs.writeFileSync(attendanceFilePath, JSON.stringify([]));
    }
    const data = fs.readFileSync(attendanceFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to load attendance:', error);
    return [];
  }
};

export const saveAttendanceToFile = (data: any) => {
  try {
    fs.writeFileSync(attendanceFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Failed to save attendance:', error);
  }
};
