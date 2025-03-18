import React, { useState } from 'react';
import { students } from '../data/dummy';
import { Check, X } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

interface AttendanceDay {
  date: string;
  morning: boolean;
  afternoon: boolean;
}

interface StudentAttendance {
  studentId: string;
  attendance: AttendanceDay[];
}

const AttendanceSheet = () => {
  const user = useAuthStore((state) => state.user);
  const currentDate = new Date();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  const generateDates = () => {
    const dates = [];
    for (let i = 1; i <= daysInMonth; i++) {
      dates.push(new Date(selectedYear, selectedMonth, i));
    }
    return dates;
  };

  const dates = generateDates();

  const [attendanceData, setAttendanceData] = useState<StudentAttendance[]>(
    students.map(student => ({
      studentId: student.id,
      attendance: dates.map(date => ({
        date: date.toISOString().split('T')[0],
        morning: false,
        afternoon: false
      }))
    }))
  );

  const handleCheckboxChange = (studentId: string, dateIndex: number, session: 'morning' | 'afternoon') => {
    if (user?.role !== 'teacher') return;
    
    setAttendanceData(prevData => {
      return prevData.map(student => {
        if (student.studentId === studentId) {
          const newAttendance = [...student.attendance];
          newAttendance[dateIndex] = {
            ...newAttendance[dateIndex],
            [session]: !newAttendance[dateIndex][session]
          };
          return { ...student, attendance: newAttendance };
        }
        return student;
      });
    });
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Filter students if the user is a student
  const displayStudents = user?.role === 'student' 
    ? students.filter(student => student.id === user.id)
    : students;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Attendance Sheet</h1>
        <div className="flex gap-4">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="px-4 py-2 border rounded-lg"
          >
            {months.map((month, index) => (
              <option key={month} value={index}>{month}</option>
            ))}
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="px-4 py-2 border rounded-lg"
          >
            {[2023, 2024, 2025].map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          {user?.role === 'teacher' && (
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Submit
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
                Student Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-48 bg-gray-50 z-10">
                ID
              </th>
              {dates.map(date => (
                <th key={date.toISOString()} className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" colSpan={2}>
                  {date.getDate()}
                </th>
              ))}
            </tr>
            <tr>
              <th className="px-6 py-3 sticky left-0 bg-gray-50"></th>
              <th className="px-6 py-3 sticky left-48 bg-gray-50"></th>
              {dates.map(date => (
                <React.Fragment key={date.toISOString()}>
                  <th className="px-1 py-2 text-center text-xs font-medium text-gray-500 uppercase">AM</th>
                  <th className="px-1 py-2 text-center text-xs font-medium text-gray-500 uppercase">PM</th>
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {displayStudents.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap sticky left-0 bg-white">
                  {student.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap sticky left-48 bg-white">
                  {student.studentId}
                </td>
                {dates.map((date, dateIndex) => {
                  const studentData = attendanceData.find(data => data.studentId === student.id);
                  const dayAttendance = studentData?.attendance[dateIndex];
                  return (
                    <React.Fragment key={date.toISOString()}>
                      <td className="px-1 py-4 text-center">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600 rounded"
                            checked={dayAttendance?.morning || false}
                            onChange={() => handleCheckboxChange(student.id, dateIndex, 'morning')}
                            disabled={user?.role !== 'teacher'}
                          />
                        </label>
                      </td>
                      <td className="px-1 py-4 text-center">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-600 rounded"
                            checked={dayAttendance?.afternoon || false}
                            onChange={() => handleCheckboxChange(student.id, dateIndex, 'afternoon')}
                            disabled={user?.role !== 'teacher'}
                          />
                        </label>
                      </td>
                    </React.Fragment>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {user?.role === 'teacher' && (
        <div className="flex justify-end space-x-4">
          <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
            <Check className="w-4 h-4" />
            Mark All Present
          </button>
          <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2">
            <X className="w-4 h-4" />
            Mark All Absent
          </button>
        </div>
      )}
    </div>
  );
};

export default AttendanceSheet;