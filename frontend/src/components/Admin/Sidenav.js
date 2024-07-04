import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import admin from '../../assets/admin.png';
import { TfiDashboard } from 'react-icons/tfi';
import { FaRegBuilding, FaUsers } from 'react-icons/fa';
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from 'react-icons/md';
import { IoIosPrint } from 'react-icons/io';
import { MdOutlineClose } from "react-icons/md";

const sections = [
  {
    key: 'Department',
    icon: <FaRegBuilding size={30} />,
    label: 'Department',
    subItems: ['Add Department', 'Manage Department'],
    routes: ['/admin/add-department', '/admin/manage-department'],
  },
  {
    key: 'Employee',
    icon: <FaUsers size={24} />,
    label: 'Employee',
    subItems: ['Add Employee', 'Manage Employees'],
    routes: ['/admin/add-employee', '/admin/manage-employees'],
  },
];

const Sidenav = ({toggleSidebar}) => {
  const [open, setOpen] = useState(null);

  const toggleSection = (section) => {
    setOpen(open === section ? null : section);
  };
  const handleSubItemClick = (route) => {
    // Perform any actions here if needed before navigating
    console.log('Navigating to:', route);
    // You can use programmatic navigation or Link component
  };

  return (
    <div className="w-full h-screen bg-gray-800">
      <div className='relative'>
        <img src={admin} alt="" className="mx-auto mt-5 w-20 border-2 p-3 bg-white bg-opacity-80 rounded-full " />
        <MdOutlineClose size={24} className='absolute top-0 right-2 text-white cursor-pointer md:hidden' onClick={toggleSidebar}/>
      </div>
      <div className="flex flex-col justify-evenly mx-10 h-[60%]">
        <div className="mt-5">
          <h2 className="text-gray-400 text-base font-semibold">Admin</h2>
          
          <div className="flex gap-3 items-center text-white mt-5">
            <TfiDashboard size={24} />
            <Link to="/admin/dashboard">
              <h3 className="text-base font-semibold cursor-pointer">Dashboard</h3>
            </Link>
          </div>
        </div>
        <div className="mt-5">
          <h2 className="text-gray-400 text-base font-semibold">Master</h2>
          {sections.map((item) => (
            <div key={item.key}>
              <div className="flex gap-3 items-center text-white mt-5 cursor-pointer" onClick={() => toggleSection(item.key)}>
                {item.icon}
                <h3 className="text-base font-semibold">{item.label}</h3>
                {open === item.key ? <MdKeyboardArrowDown size={24} /> : <MdKeyboardArrowRight size={24} />}
              </div>
              <div className={`ml-10 mt-3 overflow-hidden transition-all duration-300 ease-in-out ${open === item.key ? 'max-h-40' : 'max-h-0'}`}>
                {item.subItems.map((subItem, index) => (
                  <Link key={index} to={item.routes[index]} onClick={() => handleSubItemClick(item.routes[index])}>
                  <div className="text-gray-300 text-sm cursor-pointer mt-3">
                    {subItem}
                  </div>
                </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <h2 className="text-gray-400 text-base font-semibold">Report</h2>
          <div className="flex gap-3 items-center text-white mt-5">
            <IoIosPrint size={24} />
            <h3 className="text-base font-semibold cursor-pointer">Print Report</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
