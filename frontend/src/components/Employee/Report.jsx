import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Auth/Firebase';

const Report = () => {
  const [progresses, setProgresses] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const [user, setUser] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchProgresses(currentUser.uid);
        fetchAttendance(currentUser.uid);
      } else {
        setUser(null);
        setProgresses([]);
        setAttendances([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchProgresses = async (userID) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/workprogress/${userID}`, {
        params: { startDate, endDate }
      });
      console.log('Response data:', response.data); // Debugging statement
      setProgresses(response.data);
    } catch (error) {
      console.error('Error fetching progress data:', error);
    }
  };

  const fetchAttendance = async (userID) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/attendance/${userID}`, {
        params: { startDate, endDate }
      });
      console.log('Response data:', response.data); // Debugging statement
      setAttendances(response.data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  const handleFetchReport = () => {
    if (user) {
      fetchProgresses(user.uid);
      fetchAttendance(user.uid);
    }
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-md animate-fadeIn">
        <h1 className="text-2xl font-bold mb-4">Work Progress Report</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="start-date">
            Start Date
          </label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={handleStartDateChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="end-date">
            End Date
          </label>
          <input
            type="date"
            id="end-date"
            value={endDate}
            onChange={handleEndDateChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          onClick={handleFetchReport}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Get Report
        </button>
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Work Progress</h2>
          <ul>
            {progresses.map((progress, index) => (
              <li key={index} className="mt-2 text-gray-700">
                {progress.date} - {progress.work}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Attendance</h2>
          <ul>
            {attendances.map((attendance, index) => (
              <li key={index} className="mt-2 text-gray-700">
                {attendance.date} - {attendance.status}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Report;

