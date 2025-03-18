import React from 'react';
import { BarChart3, Users, UserCheck, Clock, Calendar } from 'lucide-react';
import { statistics } from '../data/dummy';

const StatCard = ({ title, value, icon: Icon, color }: { title: string; value: string | number; icon: any; color: string }) => (
  <div className="bg-white rounded-lg p-6 shadow-md">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <span className="text-2xl font-bold">{value}</span>
    </div>
    <h3 className="text-gray-600 text-sm">{title}</h3>
  </div>
);

const Dashboard = () => {
  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p className="text-gray-600">{new Date().toLocaleDateString()}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={statistics.totalStudents}
          icon={Users}
          color="bg-blue-500"
        />
        <StatCard
          title="Average Attendance"
          value={`${statistics.averageAttendance}%`}
          icon={UserCheck}
          color="bg-green-500"
        />
        <StatCard
          title="Late Arrivals (This Week)"
          value={statistics.lateArrivals.thisWeek}
          icon={Clock}
          color="bg-yellow-500"
        />
        <StatCard
          title="Pending Leave Requests"
          value={statistics.leaveRequests.pending}
          icon={Calendar}
          color="bg-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Attendance by Department</h2>
          <div className="space-y-4">
            {Object.entries(statistics.attendanceByDepartment).map(([dept, rate]) => (
              <div key={dept}>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">{dept}</span>
                  <span className="font-medium">{rate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 rounded-full h-2"
                    style={{ width: `${rate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Leave Request Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Pending</p>
                <p className="text-2xl font-bold">{statistics.leaveRequests.pending}</p>
              </div>
              <BarChart3 className="w-6 h-6 text-yellow-500" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Approved</p>
                <p className="text-2xl font-bold">{statistics.leaveRequests.approved}</p>
              </div>
              <BarChart3 className="w-6 h-6 text-green-500" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Rejected</p>
                <p className="text-2xl font-bold">{statistics.leaveRequests.rejected}</p>
              </div>
              <BarChart3 className="w-6 h-6 text-red-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;