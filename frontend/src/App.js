import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Banner from './pages/Banner';
import AdminLayout from './components/Admin/AdminLayout';
import EmployeeLayout from './components/Employee/EmployeeDashboard';
import Login from './components/Auth/Login';
import EmployeeLogin from './components/Employee/EmployeeLogin';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Banner />} />
      
      <Route path="/employee/login" element={<EmployeeLogin />} />
      <Route path="/admin/*" element={<AdminLayout />} /> 
        <Route path="/employee/*" element={<EmployeeLayout />} />
    </Routes>
  );
};

export default App;

