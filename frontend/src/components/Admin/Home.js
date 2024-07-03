import React, { useState } from 'react';
import admin from '../../assets/admin.png';
import { TfiDashboard } from "react-icons/tfi";
import { FaRegBuilding, FaUsers } from "react-icons/fa";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import { IoIosPrint } from "react-icons/io";
import Navbar from './Navbar';
import Dashboard from './Dashboard';

const sections = [
  {
    key: 'Department',
    icon: <FaRegBuilding size={24} />,
    label: 'Department',
    subItems: ['Add Department', 'Manage Department']
  },
  {
    key: 'Employee',
    icon: <FaUsers size={24} />,
    label: 'Employee',
    subItems: ['Add Employee', 'Manage Employees']
  }
];

const Home = () => {
  const [open, setOpen] = useState(null);
  const [sidebarOpen,setSidebarOpen] = useState(false)

  const toggleSection = (section) => {
    setOpen(open === section ? null : section);
  };

  const toggleSidebar = ()=>{
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className='flex '>
      <div className={`w-[60%] md:w-[25%] ${sidebarOpen? 'block absolute top-0 right-0':'hidden md:block'}  h-screen bg-gray-800`}>
        <div>
          <img src={admin} alt="" className='mx-auto mt-5 w-20 border-2 p-3 bg-white bg-opacity-80 rounded-full' />
        </div>
        <div className='flex flex-col justify-evenly mx-10 h-[60%]'>
        <div className=' mt-5'>
          <h2 className='text-gray-400 text-base font-semibold'>Admin</h2>
          <div className='flex gap-3 items-center text-white mt-5'>
            <TfiDashboard size={24} />
            <h3 className='text-base font-semibold cursor-pointer'>Dashboard</h3>
          </div>
        </div>

        <div className=' mt-5'>
          <h2 className='text-gray-400 text-base font-semibold'>Master</h2>
          {sections.map((item) => (
            <div key={item.key}>
              <div className='flex gap-3 items-center text-white mt-5 cursor-pointer ' onClick={() => toggleSection(item.key)}>              
            
                {item.icon}
                <h3 className='text-base font-semibold '>{item.label}</h3>
                {open === item.key ? <MdKeyboardArrowDown size={24} /> : <MdKeyboardArrowRight size={24} />}
              </div>
              <div className={`ml-10 mt-3 overflow-hidden transition-all duration-300 ease-in-out ${open === item.key ? 'max-h-40' : 'max-h-0'}`}>
                  {item.subItems.map((subItem, index) => (
                    <div key={index} className='text-gray-300 text-sm cursor-pointer mt-3'>
                      {subItem}
                    </div>
                  ))}
                </div>
              
            </div>
          ))}
        </div>

        <div className='mt-5'>
          <h2 className='text-gray-400 text-base font-semibold'>Report</h2>
          <div className='flex gap-3 items-center text-white mt-5'>
          <IoIosPrint size={24} />
            <h3 className='text-base font-semibold cursor-pointer'>Print Report</h3>
          </div>
        </div>
      </div>
      </div>

      <div className='w-full bg-gray-100'>
        <Navbar toggleSidebar={toggleSidebar} />
        <Dashboard />
      </div>
    </div>
  
  );
};

export default Home;