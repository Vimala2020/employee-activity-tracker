import React, { useState } from 'react';
// import axios from 'axios';
import AttendanceList from '../Attendance/AttendanceList';

const AttendancePage = () => {
  const [attendances, ] = useState([]);

  // useEffect(() => {
  //   axios.get('/api/attendance')
  //     .then(response => setAttendances(response.data))
  //     .catch(error => console.error('Error fetching attendance data:', error));
  // }, []);

  return (
    <div>
      <h1>Attendance Records</h1>
      <AttendanceList attendances={attendances} />
    </div>
  );
};

export default AttendancePage;
