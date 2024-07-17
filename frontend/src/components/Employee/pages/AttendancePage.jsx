import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AttendanceList from '../Attendance/AttendanceList';
import AttendanceForm from '../Attendance/AttendanceForm';
import { getAuth } from 'firebase/auth';

const AttendancePage = () => {
  const [attendances, setAttendances] = useState([]);

  const fetchAttendance = async () => {
    try {
      const user = getAuth().currentUser;
      const response = await axios.get(`http://localhost:5000/api/attendance/${user.uid}`);
      setAttendances(response.data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Attendance Records</h1>
        <AttendanceForm onAttendanceMarked={fetchAttendance} />
        <AttendanceList attendances={attendances} />
      </div>
    </div>
  );
};

export default AttendancePage;
