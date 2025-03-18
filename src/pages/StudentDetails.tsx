import React from 'react';
import { students } from '../data/dummy';
import { GraduationCap, BookOpen, UserSquare2 } from 'lucide-react';

const StudentDetails = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Students List</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <div key={student.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <UserSquare2 className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{student.name}</h3>
                <p className="text-gray-600">{student.studentId}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-gray-500" />
                <span>{student.course}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-gray-500" />
                <span>{student.email}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDetails;