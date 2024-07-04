import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Banner from './pages/Banner';
import AdminLayout from './components/Admin/AdminLayout';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Banner />} />
      <Route path="/admin/*" element={<AdminLayout />} />
    </Routes>
  );
};

export default App;