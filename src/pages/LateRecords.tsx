import React from 'react';
import { Clock, AlertCircle } from 'lucide-react';
import { attendanceRecords, students } from '../data/dummy';

const LateRecords = () => {
  const lateRecords = attendanceRecords.filter(record => record.status === 'late');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Late Records</h1>
        <div className="flex items-center gap-2 text-yellow-600">
          <Clock className="w-5 h-5" />
          <span>Total Late Records: {lateRecords.length}</span>
        </div>
      </div>

      <div className="grid gap-4">
        {lateRecords.map((record) => {
          const student = students.find(s => s.id === record.userId);
          return (
            <div key={record.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{student?.name}</h3>
                  <p className="text-gray-600">Student ID: {student?.studentId}</p>
                  <p className="text-gray-600">Course: {student?.course}</p>
                </div>
                <div className="flex items-center gap-2 text-yellow-600">
                  <AlertCircle className="w-5 h-5" />
                  <span>Late Arrival</span>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{record.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Check-in Time</p>
                  <p className="font-medium">{record.checkIn}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LateRecords;