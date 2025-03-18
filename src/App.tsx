import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AttendanceSheet from './pages/AttendanceSheet';
import LateRecords from './pages/LateRecords';
import LeaveRequests from './pages/LeaveRequests';
import StudentDetails from './pages/StudentDetails';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const TeacherRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAuthStore((state) => state.user);
  if (!user) return <Navigate to="/login" />;
  return user.role === 'teacher' ? <>{children}</> : <Navigate to="/dashboard" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="attendance" element={<AttendanceSheet />} />
          <Route path="late-records" element={<LateRecords />} />
          <Route path="leave-requests" element={<LeaveRequests />} />
          <Route 
            path="students" 
            element={
              <TeacherRoute>
                <StudentDetails />
              </TeacherRoute>
            } 
          />
          <Route 
            path="statistics" 
            element={
              <TeacherRoute>
                <div className="p-8">Statistics</div>
              </TeacherRoute>
            } 
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;