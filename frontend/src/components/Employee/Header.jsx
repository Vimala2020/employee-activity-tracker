import React from 'react';
import { MdMenu } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi'; // Importing a logout icon
import Logout from '../Auth/Logout';

const Header = ({ user, toggleSidebar }) => {
  return (
    <header className="fixed top-0 w-full md:w-[75%] lg:w-[80%] right-0 bg-[#E6B9A6] p-3 shadow-lg ">
      <div className="container mx-auto flex justify-between items-center">
        <MdMenu size={24} className="cursor-pointer md:hidden" onClick={toggleSidebar} />
        <h1 className="text-2xl font-bold tracking-wide">Employee Dashboard</h1>
        <div className="flex items-center space-x-6">
          <span className="text-lg font-semibold">{user.name}</span>
          <div className="hidden md:block">
            <Logout />
          </div>
          <div className="block md:hidden">
            <FiLogOut size={24} className="cursor-pointer" onClick={Logout} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
