import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import Header from './Header';
import Sidebar from './Sidebar';
import Logout from '../Auth/Logout';
import AttendanceForm from '../Employee/AttendanceForm';
import WorkprogressForm from './WorkprogressForm';
import Report from './Report';

const EmployeeDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState({ email: '' });

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      const userInfo = {
        email: currentUser.email,
        uid: currentUser.uid,
      };

      localStorage.setItem('user', JSON.stringify(userInfo));
      setUser(userInfo);
    } else {
      localStorage.removeItem('user');
    }
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 flex-col">
        <Header user={user} toggleSidebar={toggleSidebar} onLogout={Logout} />
        <main className="flex-1 overflow-y-auto p-4 mt-16">
          <h1 className="text-3xl font-bold mb-4">Welcome, {user.email}</h1>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full lg:w-1/2">
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          </div>
          <Routes>
            <Route path="attendance/*" element={<AttendanceForm />} />
            <Route path="work-progress/*" element={<WorkprogressForm />} />
            <Route path="report/*" element={<Report />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;

