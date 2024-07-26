import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Auth/Firebase';

const Report = () => {
  const [progresses, setProgresses] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setProgresses([]);
        setAttendances([]);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user && selectedDate) {
      fetchProgresses(user.uid);
      fetchAttendance(user.uid);
    }
  }, [user, selectedDate]);

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

  const filteredProgresses = useMemo(() => {
    if (selectedDate) {
      return progresses.filter(progress => progress.date.startsWith(selectedDate));
    }
    return progresses;
  }, [selectedDate, progresses]);

  const filteredAttendances = useMemo(() => {
    if (selectedDate) {
      return attendances.filter(attendance => attendance.date.startsWith(selectedDate));
    }
    return attendances;
  }, [selectedDate, attendances]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className="container mx-auto p-4 overflow-auto" >
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
          <div>
          <h2 className="text-xl font-bold mb-2 mt-6">Attendance</h2>
          {filteredAttendances.length > 0 ? (
            <ul>
              {filteredAttendances.map((attendance, index) => (
                <li key={index} className="mt-2 text-gray-700">
                 {attendance.status}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700">No attendance records found for the selected date.</p>
          )}
        </div>

        </div>
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Work Progress</h2>
          {filteredProgresses.length > 0 ? (
            <ul>
              {filteredProgresses.map((progress, index) => (
                <li key={index} className="mt-2 text-gray-700">
                   {progress.work}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700">No work progress found for the selected date.</p>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default Report;
