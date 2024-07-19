import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Banner from './components/Banner';
import AdminLayout from './components/Admin/AdminLayout';
import EmployeeDashboard from './components/Employee/EmployeeDashboard';
import Login from './components/Auth/Login';
import EmployeeLogin from './components/Auth/EmployeeLogin';
import ErrorBoundary from './ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Banner />} />
        <Route path="/employee/login" element={<EmployeeLogin />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/employee/*" element={<EmployeeDashboard />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
