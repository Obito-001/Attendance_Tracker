import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarCheck2,
  Clock,
  UserSquare2,
  ClipboardList,
  FileSpreadsheet,
  LogOut,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Sidebar = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">AMS</h1>
        <p className="text-gray-400 text-sm">Attendance Management System</p>
      </div>

      <nav className="flex-1">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg mb-2 ${
              isActive ? 'bg-blue-600' : 'hover:bg-gray-800'
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5 mr-3" />
          Dashboard
        </NavLink>

        <NavLink
          to="/attendance"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg mb-2 ${
              isActive ? 'bg-blue-600' : 'hover:bg-gray-800'
            }`
          }
        >
          <CalendarCheck2 className="w-5 h-5 mr-3" />
          Attendance Sheet
        </NavLink>

        <NavLink
          to="/late-records"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg mb-2 ${
              isActive ? 'bg-blue-600' : 'hover:bg-gray-800'
            }`
          }
        >
          <Clock className="w-5 h-5 mr-3" />
          Late Records
        </NavLink>

        <NavLink
          to="/leave-requests"
          className={({ isActive }) =>
            `flex items-center p-3 rounded-lg mb-2 ${
              isActive ? 'bg-blue-600' : 'hover:bg-gray-800'
            }`
          }
        >
          <ClipboardList className="w-5 h-5 mr-3" />
          Leave Requests
        </NavLink>

        {user?.role === 'teacher' && (
          <>
            <NavLink
              to="/students"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg mb-2 ${
                  isActive ? 'bg-blue-600' : 'hover:bg-gray-800'
                }`
              }
            >
              <UserSquare2 className="w-5 h-5 mr-3" />
              Students
            </NavLink>

            <NavLink
              to="/statistics"
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg mb-2 ${
                  isActive ? 'bg-blue-600' : 'hover:bg-gray-800'
                }`
              }
            >
              <FileSpreadsheet className="w-5 h-5 mr-3" />
              Statistics
            </NavLink>
          </>
        )}
      </nav>

      <button
        onClick={logout}
        className="flex items-center p-3 rounded-lg hover:bg-red-600 transition-colors mt-auto"
      >
        <LogOut className="w-5 h-5 mr-3" />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;