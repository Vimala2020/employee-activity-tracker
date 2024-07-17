import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import Header from './Header';
import Sidebar from './Sidebar';
import AttendancePage from '../../components/Employee/pages/AttendancePage';
import WorkProgressPage from '../../components/Employee/pages/WorkProgressPage';
import Profile from './Profile';
import Logout from '../Auth/Logout';

const EmployeeDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState({});
  const [recentActivities, setRecentActivities] = useState([]);


  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUser({ name: user.displayName, email: user.email, uid: user.uid });
      // Fetch recent activities
     
    }
  }, []);

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  

  return (
    <div className="flex h-screen overflow-hidden">
      <Header user={user} toggleSidebar={toggleSidebar} onLogout={Logout} />
      <div className="flex flex-1 mt-20">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-4">
          <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}</h1>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full lg:w-1/2">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Personal Info</h2>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>UID:</strong> {user.uid}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md w-full lg:w-1/2">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Details</h2>
              <p><strong>Department:</strong> {user.department}</p>
              <p><strong>Joining Date:</strong> {user.joiningDate}</p>
            </div>
          </div>
         
          <Routes>
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