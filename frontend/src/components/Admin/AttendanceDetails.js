import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttendanceDetails = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch all users' attendance and progress data
    const fetchData = async () => {
      try {
        // Fetch attendance data
        const attendanceResponse = await axios.get('http://localhost:5000/api/attendance/all');
        setAttendanceData(attendanceResponse.data);

        // Fetch work progress data
        const progressResponse = await axios.get('/progress/all');
        setProgressData(progressResponse.data);
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Attendance Details</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">User ID</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Work</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((attendance) => {
            const progress = progressData.find(
              (p) =>
                p.userId === attendance.userId &&
                new Date(p.date).toDateString() ===
                  new Date(attendance.date).toDateString()
            );

            return (
              <tr key={attendance._id} className="bg-white border-b">
                <td className="px-4 py-2">{attendance.userId}</td>
                <td className="px-4 py-2">{attendance.date}</td>
                <td className="px-4 py-2">{attendance.status}</td>
                <td className="px-4 py-2">{attendance.username}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceDetails;
