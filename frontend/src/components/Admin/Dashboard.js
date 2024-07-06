import React from 'react';
import { FcDepartment } from 'react-icons/fc';
import { FaUsers } from 'react-icons/fa';
import { MdContacts } from 'react-icons/md';

const Dashboard = ({departmentList,employees}) => {
  const datas = [
    {
      icon: <FcDepartment size={50} />,
      label: 'Department',
      total: departmentList.length,
    },
    {
      icon: <MdContacts size={36} />,
      label: 'Registered Employees',
      total: employees.length,
    },
    {
      icon: <FaUsers size={32} />,
      label: 'Users',
      total: employees.length,
    },
  ];

  return (
    <div className='mt-5 mx-5'>
      <h1 className='text-xl font-bold'>Dashboard</h1>
      <div className='mt-10 flex justify-between flex-wrap lg:flex-nowrap gap-5'>
        {datas.map((item, index) => (
          <div key={index} className='flex items-center shadow-md border-2 border-l-4 border-l-blue-500 w-full lg:w-[30%]'>
            <button className='mx-3'>{item.icon}</button>
            <div className='w-fit py-2 '>
              <h2 className='text-blue-600 font-semibold'>{item.label}</h2>
              <p className='font-bold'>{item.total}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
