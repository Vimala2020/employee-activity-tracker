import React, { useState } from 'react';
import axios from 'axios';

const AttendanceForm = () => {
  const [attendance, setAttendance] = useState({ employeeId: '', date: '', status: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAttendance({ ...attendance, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/attendance', attendance);
      console.log(response.data.message);
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="employeeId" value={attendance.employeeId} onChange={handleChange} placeholder="Employee ID" />
      <input type="date" name="date" value={attendance.date} onChange={handleChange} />
      <select name="status" value={attendance.status} onChange={handleChange}>
        <option value="">Select Status</option>
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
      </select>
      <button type="submit">Mark Attendance</button>
    </form>
  );
};

export default AttendanceForm;
