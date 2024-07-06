import React, { useState } from 'react';

const Adddepartment = ({ adddepartment }) => {
  const [departmentName, setDepartmentName] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      adddepartment(departmentName);
      setMessage({ text: 'Department successfully added!', type: 'success' });
      setDepartmentName('');
    } catch (error) {
      setMessage({ text: 'Error adding department. Please try again.', type: 'error' });
    }
    setTimeout(()=>{
      setMessage({text:'',type:''})
    },3000)
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
          {message.text && (
            <p className={`mt-2 ${message.type === 'success' ? 'text-green-600  font-bold ' : 'text-red-500 font-bold'}`}>
              {message.text}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Adddepartment;
