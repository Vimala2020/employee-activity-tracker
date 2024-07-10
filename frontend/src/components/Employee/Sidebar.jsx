import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TfiDashboard } from 'react-icons/tfi';
import { IoIosPrint } from 'react-icons/io';
import { MdOutlineClose } from 'react-icons/md';
import { PiNotepadThin } from 'react-icons/pi';
import admin from '../../assets/admin.png';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [open, setOpen] = useState(null);

  return (
    <div className={`fixed top-0 left-0 h-full w-64 bg-[#35495e] transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-1/4 lg:w-1/5`}>
      <div className="relative">
        <img src={admin} alt="" className="mx-auto mt-5 w-20 border-2 p-3 bg-white bg-opacity-80 rounded-full" />
        <MdOutlineClose size={24} className="absolute top-2 right-2 text-white cursor-pointer md:hidden" onClick={toggleSidebar} />
      </div>
      <div className="flex flex-col justify-evenly mx-10 h-[60%]">
        <div className="mt-5">
          <h2 className="text-gray-400 text-base font-semibold">Employee</h2>
          <div className="flex gap-3 items-center text-white mt-5">
            <TfiDashboard size={24} />
            <Link to="/employee/dashboard" onClick={() => toggleSidebar()}>
              <h3 className="text-base font-semibold cursor-pointer">Dashboard</h3>
            </Link>
          </div>

          <div className="flex gap-3 items-center text-white mt-5">
            <PiNotepadThin size={24} />
            <Link to="/employee/attendance" onClick={() => setOpen(open === 'attendance' ? null : 'attendance')}>
              <h3 className="text-base font-semibold cursor-pointer">Attendance</h3>
            </Link>
            {open === 'attendance' && (
              <div className="flex flex-col ml-10">
                <Link to="/employee/attendance/form" onClick={() => toggleSidebar()}>
                  <h3 className="text-base font-semibold cursor-pointer">Attendance Form</h3>
                </Link>
                <Link to="/employee/attendance/list" onClick={() => toggleSidebar()}>
                  <h3 className="text-base font-semibold cursor-pointer">Attendance List</h3>
                </Link>
              </div>
            )}
          </div>

          <div className="flex gap-3 items-center text-white mt-5">
            <IoIosPrint size={24} />
            <Link to="/employee/work-progress" onClick={() => toggleSidebar()}>
              <h3 className="text-base font-semibold cursor-pointer">Work Progress</h3>
            </Link>
          </div>

          <div className="flex gap-3 items-center text-white mt-5">
            <IoIosPrint size={24} />
            <Link to="/employee/profile" onClick={() => toggleSidebar()}>
              <h3 className="text-base font-semibold cursor-pointer">Profile</h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;