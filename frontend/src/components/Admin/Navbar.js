import React from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import admin from '../../assets/admin2.png';

const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="w-full md:w-[80%] bg-white shadow-xl fixed top-0 z-10">
      <div className="flex justify-between mx-5 p-5">
        <button onClick={toggleSidebar} className="md:visible">
          <RxHamburgerMenu size={24} />
        </button>
        <div className="flex gap-4 items-center mr-0 md:mr-7">
          <h2 className="font-bold text-base">Admin</h2>
          <img src={admin} alt="admin" className="w-7 h-7 rounded-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
