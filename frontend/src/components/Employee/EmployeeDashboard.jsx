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
  const [user, setUser] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    return storedUser || { email: '' };
  });

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        const userInfo = {
          email: currentUser.email,
          uid: currentUser.uid,
        };

        localStorage.setItem('user', JSON.stringify(userInfo));
        setUser(userInfo);
      } else {
        localStorage.removeItem('user');
        setUser({ email: '' });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex h-screen overflow-auto">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 flex-col main-container">
        <Header user={user} toggleSidebar={toggleSidebar} onLogout={Logout} />
        <main className="flex flex-1 flex-col justify-center items-center p-4 mt-16">
          <h1 className="text-3xl font-bold mb-10 ">Welcome</h1>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full ">
              <p>{user.email}</p>
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