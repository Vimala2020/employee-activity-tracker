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
    'Submitted progress reports',
  ];

  return (
    <div className="flex">
      <div className={`fixed left-0 top-0 h-screen w-[80%] z-50 md:w-[28%] lg:w-[20%] bg-[#35495e]  md:block`}>
      <Sidebar />
      </div>
      <div className="ml-0 md:ml-[28%] lg:ml-[20%] w-full">
        <div className="fixed w-full md:w-[80%]">
        <Header user={user} onLogout={handleLogout} />
        </div>
        <div className="mt-16 p-4">
        <Routes>
       <Route path='dashboard' element={<Dashboard recentActivities={recentActivities} />} />
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
