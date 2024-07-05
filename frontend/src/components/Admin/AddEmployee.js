import React, { useState } from 'react';

const AddEmployee = ({ addEmployee }) => {
    const initialEmployeeState = {
      firstName: '',
      lastName: '',
      department: '',
      email: '',
      mobile: '',
      joiningDate: '',
      state: '',
      city: '',
      address: '',
      username: '',
      password: ''
    };
  
    const [employee, setEmployee] = useState(initialEmployeeState);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      addEmployee(employee); // Call the addEmployee function passed from props
      console.log('Submitted Employee:', employee); // This should log the employee data
      setEmployee(initialEmployeeState); // Reset the form fields after submission
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setEmployee((prevEmployee) => ({
        ...prevEmployee,
        [name]: value
      }));
    };
  return (
    <div>
      <div className='border-2 w-full md:w-[70%] lg:w-[60%] mx-auto'>
        <h2 className='text-center text-xl p-2 font-bold'>Employee Registration Form</h2>
        <div className='mx-5 pt-5 flex flex-col gap-3 pb-5'>
          {/* Form inputs */}
          <form onSubmit={handleSubmit}>
            <div className='flex gap-5 '>
              <div className='w-full flex flex-col gap-2'>
                <label className='font-medium'>First Name</label>
                <input
                  type='text'
                  name='firstName'
                  value={employee.firstName}
                  onChange={handleChange}
                  placeholder='First Name'
                  className='w-full border-2 border-gray-400 p-1 rounded-md text-sm outline-none'
                />
              </div>
              <div className='w-full flex flex-col gap-2'>
                <label className='font-medium'>Last Name</label>
                <input
                  type='text'
                  name='lastName'
                  value={employee.lastName}
                  onChange={handleChange}
                  placeholder='Last Name'
                  className='w-full border-2 border-gray-400 p-1 rounded-md text-sm outline-none'
                />
              </div>
            </div>

            <div className='flex gap-5'>
              <div className='w-full flex flex-col gap-2'>
                <label className='font-medium'>Department</label>
                <select
                  name='department'
                  value={employee.department}
                  onChange={handleChange}
                  className='w-full border-2 border-gray-400 p-1 rounded-md text-sm outline-none'
                >
                  <option value=''>Select Department</option>
                  <option value='HR'>Human Resources</option>
                  <option value='IT'>Information Technology</option>
                  <option value='Finance'>Finance</option>
                  <option value='Operations'>Operations</option>
                </select>
              </div>
              <div className='w-full flex flex-col gap-2'>
                <label className='font-medium'>Email</label>
                <input
                  type='email'
                  name='email'
                  value={employee.email}
                  onChange={handleChange}
                  placeholder='Email'
                  className='w-full border-2 border-gray-400 p-1 rounded-md text-sm outline-none'
                />
              </div>
            </div>

            <div className='flex gap-5 '>
              <div className='w-full flex flex-col gap-2'>
                <label className='font-medium'>Mobile No</label>
                <input
                  type='tel'
                  name='mobile'
                  value={employee.mobile}
                  onChange={handleChange}
                  placeholder='Mobile No'
                  className='w-full border-2 border-gray-400 p-1 rounded-md text-sm outline-none'
                />
              </div>
              <div className='w-full flex flex-col gap-2'>
                <label className='font-medium'>Date of Joining</label>
                <input
                  type='date'
                  name='dateOfJoining'
                  value={employee.dateOfJoining}
                  onChange={handleChange}
                  className='w-full border-2 border-gray-400 p-1 rounded-md text-sm outline-none'
                />
              </div>
            </div>

            <div className='flex gap-5 '>
              <div className='w-full flex flex-col gap-2'>
                <label className='font-medium'>State</label>
                <input
                  type='text'
                  name='state'
                  value={employee.state}
                  onChange={handleChange}
                  placeholder='State'
                  className='w-full border-2 border-gray-400 p-1 rounded-md text-sm outline-none'
                />
              </div>
              <div className='w-full flex flex-col gap-2'>
                <label className='font-medium'>City</label>
                <input
                  type='text'
                  name='city'
                  value={employee.city}
                  onChange={handleChange}
                  placeholder='City'
                  className='w-full border-2 border-gray-400 p-1 rounded-md text-sm outline-none'
                />
              </div>
            </div>

            <div className='flex gap-5 '>
              <div className='w-full flex flex-col gap-2'>
                <label className='font-medium'>Address</label>
                <textarea
                  name='address'
                  value={employee.address}
                  onChange={handleChange}
                  placeholder='Address'
                  className='w-full border-2 border-gray-400 p-1 rounded-md text-sm outline-none'
                ></textarea>
              </div>
            </div>

            <div className='flex gap-5 '>
              <div className='w-full flex flex-col gap-2'>
                <label className='font-medium'>Username</label>
                <input
                  type='text'
                  name='username'
                  value={employee.username}
                  onChange={handleChange}
                  placeholder='Username'
                  className='w-full border-2 border-gray-400 p-1 rounded-md text-sm outline-none'
                />
              </div>
              <div className='w-full flex flex-col gap-2'>
                <label className='font-medium'>Password</label>
                <input
                  type='password'
                  name='password'
                  value={employee.password}
                  onChange={handleChange}
                  placeholder='Password'
                  className='w-full border-2 border-gray-400 p-1 rounded-md text-sm outline-none'
                />
              </div>
            </div>

            {/* Submit button */}
            <button type='submit' className='bg-blue-500 text-white p-2 font-bold mt-5'>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
