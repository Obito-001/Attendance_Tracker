import React from 'react';
import { useAuthStore } from '../store/authStore';
import { leaveRequests, students, teachers } from '../data/dummy';
import { Calendar, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

const LeaveRequests = () => {
  const user = useAuthStore((state) => state.user);
  
  // Filter requests based on user role
  const filteredRequests = user?.role === 'student'
    ? leaveRequests.filter(request => request.userId === user.id)
    : leaveRequests;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600';
      case 'rejected': return 'text-red-600';
      default: return 'text-yellow-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle2 className="w-5 h-5" />;
      case 'rejected': return <XCircle className="w-5 h-5" />;
      default: return <AlertCircle className="w-5 h-5" />;
    }
  };

  const handleAction = (requestId: string, action: 'approve' | 'reject') => {
    // In a real app, this would make an API call
    console.log(`${action} request ${requestId}`);
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Leave Requests</h1>
        {user?.role === 'student' && (
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            New Request
          </button>
        )}
      </div>

      <div className="grid gap-6">
        {filteredRequests.map((request) => {
          const student = students.find(s => s.id === request.userId);
          const approver = request.approvedBy 
            ? teachers.find(t => t.id === request.approvedBy)
            : null;
          const rejecter = request.rejectedBy
            ? teachers.find(t => t.id === request.rejectedBy)
            : null;

          return (
            <div key={request.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{student?.name}</h3>
                  <p className="text-gray-600">Student ID: {student?.studentId}</p>
                  <p className="text-gray-600">Course: {student?.course}</p>
                </div>
                <div className={`flex items-center gap-2 ${getStatusColor(request.status)}`}>
                  {getStatusIcon(request.status)}
                  <span className="capitalize">{request.status}</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Leave Period</p>
                    <p className="font-medium">
                      {request.startDate} to {request.endDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Submitted</p>
                    <p className="font-medium">
                      {new Date(request.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-500">Reason</p>
                <p className="mt-1">{request.reason}</p>
              </div>

              {request.status === 'approved' && approver && (
                <div className="mt-4 text-sm text-green-600">
                  Approved by {approver.name} on {new Date(request.approvedAt!).toLocaleDateString()}
                </div>
              )}

              {request.status === 'rejected' && rejecter && (
                <div className="mt-4">
                  <p className="text-sm text-red-600">
                    Rejected by {rejecter.name} on {new Date(request.rejectedAt!).toLocaleDateString()}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">{request.rejectionReason}</p>
                </div>
              )}

              {user?.role === 'teacher' && request.status === 'pending' && (
                <div className="mt-6 flex gap-4">
                  <button
                    onClick={() => handleAction(request.id, 'approve')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction(request.id, 'reject')}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeaveRequests;