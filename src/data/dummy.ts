import { AttendanceRecord, LeaveRequest, User } from '../types';

export const students = [
  { id: '1', name: 'Barani', email: 'barani@example.com', role: 'student', studentId: 'STU001', course: 'Computer Science' },
  { id: '2', name: 'Deepak', email: 'deepak@example.com', role: 'student', studentId: 'STU002', course: 'Data Science' },
  { id: '3', name: 'Arul Mani', email: 'arulmani@example.com', role: 'student', studentId: 'STU003', course: 'Computer Science' },
  { id: '4', name: 'Sai', email: 'sai@example.com', role: 'student', studentId: 'STU004', course: 'Software Engineering' },
] as const;

export const teachers = [
  { id: '101', name: 'Harikanth', email: 'harikanth@example.com', role: 'teacher', department: 'Computer Science', position: 'Professor' },
  { id: '102', name: 'Gokul', email: 'gokul@example.com', role: 'teacher', department: 'Data Science', position: 'Associate Professor' },
  { id: '103', name: 'Harish', email: 'harish@example.com', role: 'teacher', department: 'Software Engineering', position: 'Lecturer' },
] as const;


export const attendanceData = {
  '2024-02': students.map(student => ({
    studentId: student.id,
    attendance: Array.from({ length: 29 }, (_, i) => ({
      date: `2024-02-${String(i + 1).padStart(2, '0')}`,
      morning: Math.random() > 0.1,
      afternoon: Math.random() > 0.1
    }))
  }))
};

export const attendanceRecords: AttendanceRecord[] = [
  { id: '1', userId: '1', date: '2024-02-01', status: 'present', checkIn: '09:00', checkOut: '17:00' },
  { id: '2', userId: '1', date: '2024-02-02', status: 'late', checkIn: '09:30', checkOut: '17:00' },
  { id: '3', userId: '2', date: '2024-02-01', status: 'present', checkIn: '08:55', checkOut: '17:00' },
  { id: '4', userId: '2', date: '2024-02-02', status: 'absent' },
  { id: '5', userId: '3', date: '2024-02-01', status: 'present', checkIn: '09:05', checkOut: '17:00' },
  { id: '6', userId: '1', date: '2024-02-05', status: 'late', checkIn: '09:45', checkOut: '17:00' },
  { id: '7', userId: '4', date: '2024-02-05', status: 'late', checkIn: '09:20', checkOut: '17:00' },
  { id: '8', userId: '5', date: '2024-02-06', status: 'late', checkIn: '09:15', checkOut: '17:00' },
];

export const leaveRequests: LeaveRequest[] = [
  {
    id: '1',
    userId: '1',
    startDate: '2024-02-15',
    endDate: '2024-02-16',
    reason: 'Family event',
    status: 'pending',
    submittedAt: '2024-02-10T10:00:00Z',
    type: 'personal',
  },
  {
    id: '2',
    userId: '2',
    startDate: '2024-02-20',
    endDate: '2024-02-21',
    reason: 'Medical appointment',
    status: 'approved',
    submittedAt: '2024-02-12T14:30:00Z',
    type: 'medical',
    approvedBy: '101',
    approvedAt: '2024-02-13T09:00:00Z',
  },
  {
    id: '3',
    userId: '3',
    startDate: '2024-03-01',
    endDate: '2024-03-02',
    reason: 'Personal matter',
    status: 'rejected',
    submittedAt: '2024-02-14T09:15:00Z',
    type: 'personal',
    rejectedBy: '102',
    rejectedAt: '2024-02-15T11:30:00Z',
    rejectionReason: 'Insufficient notice period',
  },
  {
    id: '4',
    userId: '4',
    startDate: '2024-02-25',
    endDate: '2024-02-26',
    reason: 'Dental surgery',
    status: 'pending',
    submittedAt: '2024-02-18T16:45:00Z',
    type: 'medical',
  },
  {
    id: '5',
    userId: '5',
    startDate: '2024-03-05',
    endDate: '2024-03-07',
    reason: 'Family wedding',
    status: 'pending',
    submittedAt: '2024-02-20T13:20:00Z',
    type: 'personal',
  },
];

export const statistics = {
  totalStudents: 150,
  totalTeachers: 15,
  averageAttendance: 92.5,
  lateArrivals: {
    thisWeek: 12,
    lastWeek: 15,
    thisMonth: 45,
  },
  leaveRequests: {
    pending: 8,
    approved: 25,
    rejected: 5,
  },
  attendanceByDepartment: {
    'Computer Science': 94.2,
    'Data Science': 91.8,
    'Software Engineering': 93.5,
  },
};
