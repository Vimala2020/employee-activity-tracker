
import React, { useState } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';


// import axios from 'axios';


const AttendanceForm = () => {
  const [status, setStatus] = useState('');
  const auth = getAuth();

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      const attendance = {
        userId: user.uid,
        username: user.displayName,
        status,
      };
      const response = await axios.post('/api/attendance/mark', attendance);
      console.log(response.data.message);
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
          Status
        </label>
        <select 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          id="status" 
          name="status" 
          value={status} 
          onChange={handleChange} 
          required 
        >
          <option value="">Select Status</option>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
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
