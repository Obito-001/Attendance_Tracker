export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher';
  position?: string;
  studentId?: string;
  course?: string;
  department?: string;
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'leave';
  checkIn?: string;
  checkOut?: string;
}

export interface LeaveRequest {
  id: string;
  userId: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  type: 'personal' | 'medical' | 'other';
  approvedBy?: string;
  approvedAt?: string;
  rejectedBy?: string;
  rejectedAt?: string;
  rejectionReason?: string;
}

export interface DepartmentAttendance {
  [department: string]: number;
}

export interface Statistics {
  totalStudents: number;
  totalTeachers: number;
  averageAttendance: number;
  lateArrivals: {
    thisWeek: number;
    lastWeek: number;
    thisMonth: number;
  };
  leaveRequests: {
    pending: number;
    approved: number;
    rejected: number;
  };
  attendanceByDepartment: DepartmentAttendance;
}