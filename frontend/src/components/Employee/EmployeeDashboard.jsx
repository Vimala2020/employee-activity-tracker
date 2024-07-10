import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import DashboardOverview from './DashboardOverview';
import AttendancePage from './pages/AttendancePage';
import WorkProgressPage from './pages/WorkProgressPage';
import Profile from './Profile';
import Logout from '../Auth/Logout';

const EmployeeDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Developer',
  });

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const recentActivities = [
    'Logged in',
    'Marked attendance',
    'Submitted progress reports',
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <Header user={user} toggleSidebar={toggleSidebar} onLogout={Logout} />
      <div className="flex flex-1 mt-20">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-4">
          <Routes>
            <Route path="dashboard" element={<DashboardOverview recentActivities={recentActivities} />} />
            <Route path="attendance/*" element={<AttendancePage />} />
            <Route path="work-progress/*" element={<WorkProgressPage />} />
            <Route path="profile" element={<Profile user={user} updateUser={updateUser} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;

