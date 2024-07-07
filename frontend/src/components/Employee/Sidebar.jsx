import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TfiDashboard } from 'react-icons/tfi';
import { IoIosPrint } from 'react-icons/io';
import { MdOutlineClose } from "react-icons/md";
import { PiNotepadThin } from "react-icons/pi";
import admin from '../../assets/admin.png';


const Sidebar = ({ toggleSidebar }) => {
  const [open, setOpen] = useState(null);

  return (
    <div className="w-full h-screen bg-[#35495e]">
      <div className="relative">
        <img src={admin} alt="" className="mx-auto mt-5 w-20 border-2 p-3 bg-white bg-opacity-80 rounded-full " />
        <MdOutlineClose size={24} className="absolute top-0 right-2 text-white cursor-pointer md:hidden" onClick={toggleSidebar} />
      </div>
      <div className="flex flex-col justify-evenly mx-10 h-[60%]">
        <div className="mt-5">
          <h2 className="text-gray-400 text-base font-semibold">Employee</h2>
          <div className="flex gap-3 items-center text-white mt-5">
            <TfiDashboard size={24} />
            <Link to="/employee/dashboard" onClick={()=>toggleSidebar}>
              <h3 className="text-base font-semibold cursor-pointer">Dashboard</h3>
            </Link>
          </div>

          <div className="flex gap-3 items-center text-white mt-5">
            <PiNotepadThin size={24} />
            <Link to="/employee/attendance" onClick={()=>toggleSidebar}>
              <h3 className="text-base font-semibold cursor-pointer">Attendance</h3>
            </Link>
          </div>

          <div className="flex gap-3 items-center text-white mt-5">
            <IoIosPrint size={24} />
            <Link to="/employee/work-progress" onClick={()=>toggleSidebar}>
              <h3 className="text-base font-semibold cursor-pointer">Work Progress</h3>
            </Link>
          </div>

          <div className="flex gap-3 items-center text-white mt-5">
            <IoIosPrint size={24} />
            <Link to="/employee/profile" onClick={()=>toggleSidebar}>
              <h3 className="text-base font-semibold cursor-pointer">Profile</h3>
            </Link>
          </div>

        </div>     
      
      </div>
    </div>
  );
};

export default Sidebar;
