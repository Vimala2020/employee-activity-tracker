import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import Header from './Header';
import Sidebar from './Sidebar';
import Logout from '../Auth/Logout';
import AttendanceForm from '../Employee/AttendanceForm';
import WorkprogressForm from './WorkprogressForm';
import Report from './Report';
import axios from 'axios';

const EmployeeDashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    uid: '',
    mobile: '',
    department: '',
    joiningDate: '',
  });

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser({
        ...user,
        name: currentUser.displayName,
        email: currentUser.email,
        uid: currentUser.uid,
      });
      // Fetch additional details
      fetchAdditionalDetails(currentUser.uid);
    }
  }, []);

  const fetchAdditionalDetails = async (uid) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/employee/${uid}`);
      setUser((prevUser) => ({
        ...prevUser,
        mobile: response.data.mobile,
        department: response.data.department,
        joiningDate: response.data.joiningDate,
      }));
    } catch (error) {
      console.error('Error fetching additional details:', error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Header user={user} toggleSidebar={toggleSidebar} onLogout={Logout} />
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-4 mt-20">
          <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}</h1>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full lg:w-1/2">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Personal Info</h2>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Mobile:</strong> {user.mobile}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md w-full lg:w-1/2">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Details</h2>
              <p><strong>Department:</strong> {user.department}</p>
              <p><strong>Joining Date:</strong> {user.joiningDate}</p>
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
