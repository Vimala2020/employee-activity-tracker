import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Dashboard from './DashboardOverview';
import AttendancePage from './pages/AttendancePage';
import WorkProgressPage from './pages/DailyProgress';
import Profile from './Profile';
import Logout from '../Auth/Logout';

const EmployeeDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Developer',
  };

  const recentActivities = [
    'Logged in',
    'Marked attendance',
    'Submitted progress reports',
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-col flex-1">
        <Header user={user} toggleSidebar={toggleSidebar} onLogout={Logout} />
        <main className="flex-1 overflow-y-auto mt-16 p-4">
          <Routes>
            <Route path="dashboard" element={<Dashboard recentActivities={recentActivities} />} />
            <Route path="attendance/*" element={<AttendancePage />} />
            <Route path="work-progress" element={<WorkProgressPage />} />
            <Route path="profile" element={<Profile user={user} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
