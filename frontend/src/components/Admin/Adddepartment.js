import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDepartment = ({ addDepartment }) => {
  const [departmentName, setDepartmentName] = useState('');
  const [addedSuccessfully, setAddedSuccessfully] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/department/add', { name: departmentName });
      setDepartmentName('');
      setAddedSuccessfully(true);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error adding department');
      setDepartmentName(''); // Clear input on error
    }
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
