import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AddDepartment = ({ addDepartment }) => {
  const [departmentName, setDepartmentName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDepartment(departmentName);
      setDepartmentName('');    
    } catch (error) {
      toast.error('Error adding department');
    }
  };

  return (
    <div>
      <div className='border-2 w-full lg:w-1/2 mt-5 shadow-lg'>
        <h2 className='text-center text-xl font-bold p-2'>Add Department</h2>
        <hr />
        <form className='flex flex-col gap-5 mx-5 pb-5' onSubmit={handleSubmit}>
          <h3 className='mt-5 font-medium'>Department Name</h3>
          <input
            type='text'
            placeholder='Add Department Name'
            className='border-2 outline-none p-1 rounded-md'
            value={departmentName}
            required
            onChange={(e) => setDepartmentName(e.target.value)}
          />
          <button type='submit' className='bg-blue-500 text-white p-2 rounded-md'>Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
