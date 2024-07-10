import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AttendanceList from '../Attendance/AttendanceList';
import AttendanceForm from '../Attendance/AttendanceForm';

const AttendancePage = () => {
  const [attendances, setAttendances] = useState([]);

  useEffect(() => {
    axios.get('/api/attendance')
      .then(response => setAttendances(response.data))
      .catch(error => console.error('Error fetching attendance data:', error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Attendance Records</h1>
        <AttendanceForm />
        <AttendanceList attendances={attendances} />
      </div>
    </div>
  );
};

export default AttendancePage;
