// src/components/Employee/Header.js

import React from 'react';

const Header = ({ user, onLogout }) => (
  <header className="bg-[#63b7af] text-white p-4 flex justify-between items-center w-full">
    <h1 className="text-xl font-bold">Employee Dashboard</h1>
    <div className="flex items-center space-x-4">
      <span>{user.name}</span>
      <button onClick={onLogout} className="bg-white text-red-500 font-bold  px-3 py-1 rounded">Logout</button>
    </div>
  </header>
);

export default Header;
  