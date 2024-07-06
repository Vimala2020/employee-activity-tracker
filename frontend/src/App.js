import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Banner from './pages/Banner';
import AdminLayout from './components/Admin/AdminLayout';
import Login from './components/Auth/Login';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Banner />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/*" element={<AdminLayout />} />        
    </Routes>
  );
};

export default App;

