import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Auth/Firebase';

const Report = () => {
  const [progresses, setProgresses] = useState([]);
  const [filteredProgresses, setFilteredProgresses] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const [filteredAttendances, setFilteredAttendances] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchProgresses(currentUser.uid);
        fetchAttendance(currentUser.uid);
      } else {
        setUser(null);
        setProgresses([]);
        setFilteredProgresses([]);
        setAttendances([]);
        setFilteredAttendances([]);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    filterDataByDate();
  }, [selectedDate, progresses, attendances]);

  const fetchProgresses = async (userID) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/workprogress/${userID}`);
      setProgresses(response.data);
    } catch (error) {
      console.error('Error fetching progress data:', error);
    }
  };

  const fetchAttendance = async (userID) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/attendance/${userID}`);
      setAttendances(response.data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  const filterDataByDate = () => {
    if (selectedDate) {
      const filteredProgresses = progresses.filter((progress) =>
        progress.date.startsWith(selectedDate)
      );
      const filteredAttendances = attendances.filter((attendance) =>
        attendance.date.startsWith(selectedDate)
      );
      setFilteredProgresses(filteredProgresses);
      setFilteredAttendances(filteredAttendances);
    } else {
      setFilteredProgresses(progresses);
      setFilteredAttendances(attendances);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-md animate-fadeIn">
        <h1 className="text-2xl font-bold mb-4">Work Progress Report</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
            Filter by Date
          </label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Work Progress</h2>
          <ul>
            {filteredProgresses.map((progress, index) => (
              <li key={index} className="mt-2 text-gray-700">
                {progress.date} - {progress.workDescription}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Attendance</h2>
          <ul>
            {filteredAttendances.map((attendance, index) => (
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
