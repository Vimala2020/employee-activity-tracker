import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TfiDashboard } from 'react-icons/tfi';
import { IoIosPrint } from 'react-icons/io';
import { MdOutlineClose } from 'react-icons/md';
import { PiNotepadThin } from 'react-icons/pi';
import { FaRegFileAlt } from 'react-icons/fa'; 
import user from '../../assets/user.png';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [open, setOpen] = useState(null);

  const handleToggle = (section) => {
    setOpen(open === section ? null : section);
  };

  return (
    <div className={`fixed top-0 left-0 h-full w-64 bg-[#35495e] transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:w-1/4 lg:w-1/5 z-10`}>
      <div className="relative p-4">
        <img src={user} alt="admin" className="mx-auto w-20 border-2 p-3 bg-white bg-opacity-80 rounded-full" />
        <MdOutlineClose size={24} className="absolute top-2 right-2 text-white cursor-pointer md:hidden" onClick={toggleSidebar} />
      </div>
      <div className="flex flex-col justify-evenly mx-10 h-[60%]">
        <div className="mt-5 flex justify-between flex-col gap-4">
          <h2 className="text-gray-400 text-base font-semibold">Employee</h2>
          <div className="flex gap-3 items-center text-white mt-5">
            <TfiDashboard size={24} />
            <Link to="/employee/" onClick={() => toggleSidebar()}>
              <h3 className="text-base font-semibold cursor-pointer">Dashboard</h3>
            </Link>
          </div>

          <div className="flex flex-col gap-3 mt-5">
            <div className="flex gap-3 items-center text-white cursor-pointer" onClick={() => handleToggle('attendance')}>
              <PiNotepadThin size={24} />
              <Link to="/employee/attendance/attendance-form" onClick={() => toggleSidebar()}>
                <h3 className="text-base font-semibold">Attendance</h3>
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-5">
            <div className="flex gap-3 items-center text-white cursor-pointer" onClick={() => handleToggle('workProgress')}>
              <IoIosPrint size={24} />
              <Link to="/employee/work-progress/work-progress-form" onClick={() => toggleSidebar()}>
                <h3 className="text-base font-semibold">Work Progress</h3>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-5">
            <div className="flex gap-3 items-center text-white cursor-pointer" onClick={() => handleToggle('report')}>
              <FaRegFileAlt size={24} />
              <Link to="/employee/report/report-form" onClick={() => toggleSidebar()}>
                <h3 className="text-base font-semibold">Report</h3>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

