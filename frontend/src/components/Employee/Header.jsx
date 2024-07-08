import React from 'react';
import Logout from '../Auth/Logout';


const Header = ({ user, toggleSidebar }) => {
  return (
    <header className="bg-gradient-to-r from-teal-400 to-blue-500 text-white p-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">Employee Dashboard</h1>
        <div className="flex items-center space-x-6">
          <span className="text-lg font-semibold">{user.name}</span>
          <Logout />
        </div>
      </div>
    </header>
  );
};

export default Header;
