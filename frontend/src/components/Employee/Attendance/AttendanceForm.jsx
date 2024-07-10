import React, { useState } from 'react';
// import axios from 'axios';

const AttendanceForm = () => {
  const [attendance, setAttendance] = useState({ employeeId: '', date: '', status: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAttendance({ ...attendance, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     // const response = await axios.post('/api/attendance', attendance);
      //console.log(response.data.message);
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="employeeId">
          Employee ID
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          id="employeeId" 
          type="text" 
          name="employeeId" 
          value={attendance.employeeId} 
          onChange={handleChange} 
          placeholder="Employee ID" 
          required 
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
          Date
        </label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          id="date" 
          type="date" 
          name="date" 
          value={attendance.date} 
          onChange={handleChange} 
          required 
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
          Status
        </label>
        <select 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          id="status" 
          name="status" 
          value={attendance.status} 
          onChange={handleChange} 
          required 
        >
          <option value="">Select Status</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
      </div>
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
        type="submit"
      >
        Mark Attendance
      </button>
    </form>
  );
};

export default AttendanceForm;
