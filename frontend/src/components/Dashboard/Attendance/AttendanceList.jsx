import React from 'react';

const AttendanceList = ({ attendances }) => (
  <ul>
    {attendances.map((attendance, index) => (
      <li key={index}>{attendance.date} - {attendance.status}</li>
    ))}
  </ul>
);

export default AttendanceList;
