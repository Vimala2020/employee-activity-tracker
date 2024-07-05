import React, { useState } from 'react';

const Adddepartment = ({ adddepartment }) => {
  const [departmentName, setDepartmentName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    adddepartment(departmentName);
    setDepartmentName('');
  };

  return (
    <div>
      <div className='border-2 w-full md:w-1/2 mt-5 shadow-lg'>
        <h2 className='text-center text-xl font-bold p-2'>Add Department</h2>
        <hr />
        <form className='flex flex-col gap-5 mx-5 pb-5' onSubmit={handleSubmit}>
          <h3 className='mt-5 font-medium'>Department Name</h3>
          <input
            type='text'
            placeholder='Add Department Name'
            className='border-2 outline-none p-1 rounded-md'
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
          />
          <button type='submit' className='bg-blue-500 p-2 rounded-md'>Add</button>
        </form>
      </div>
    </div>
  );
};

export default Adddepartment;
