// src/components/Employee/EmployeeDashboard.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Dashboard from './DashboardOverview'
import AttendancePage from './pages/AttendancePage';
import WorkProgressPage from './pages/DailyProgress';
import Profile from './Profile';


const EmployeeDashboard = () => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Developer',
  };

  const handleLogout = () => {
    console.log('Logout');
  };

  const recentActivities = [
    'Logged in',
    'Marked attendance',
    'Submitted progress report',
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header user={user} onLogout={handleLogout} />
        <div className="p-4">
          <Routes>
            <Route path="dashboard" element={<Dashboard recentActivities={recentActivities} />} />
            <Route path="attendance" element={<AttendancePage />} />
            <Route path="work-progress" element={<WorkProgressPage />} />
            <Route path="profile" element={<Profile user={user} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
