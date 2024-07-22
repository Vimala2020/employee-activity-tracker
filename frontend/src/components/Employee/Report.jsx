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
      console.log('Auth state changed. Current user:', currentUser);
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
      console.log('Fetching progress for userID:', userID);
      const response = await axios.get(`http://localhost:5000/api/workprogress/${userID}`);
      setProgresses(response.data);
      console.log('Progress data:', response.data);
    } catch (error) {
      console.error('Error fetching progress data:', error);
    }
  };

  const fetchAttendance = async (userID) => {
    try {
      console.log('Fetching attendance for userID:', userID);
      const response = await axios.get(`http://localhost:5000/api/attendance/${userID}`);
      setAttendances(response.data);
      console.log('Attendance data:', response.data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  const filterDataByDate = () => {
    if (selectedDate) {
      const filteredProgresses = progresses.filter(progress =>
        new Date(progress.date).toLocaleDateString() === new Date(selectedDate).toLocaleDateString()
      );
      const filteredAttendances = attendances.filter(attendance =>
        new Date(attendance.date).toLocaleDateString() === new Date(selectedDate).toLocaleDateString()
      );
      setFilteredProgresses(filteredProgresses);
      setFilteredAttendances(filteredAttendances);
    } else {
      setFilteredProgresses(progresses);
      setFilteredAttendances(attendances);
    }
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4"> Report</h1>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Please select a Date</h2>
          <input
            type="date"
            onChange={handleDateChange}
            value={selectedDate}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Work Progress List</h2>
          <ul className="list-disc pl-5">
            {filteredProgresses.length > 0 ? (
              filteredProgresses.map((progress, index) => (
                <li key={index} className="mb-2">
                  <span className="font-semibold">{new Date(progress.date).toLocaleDateString()}:</span> {progress.work}
                </li>
              ))
            ) : (
              <li>No work progress data available for the selected date.</li>
            )}
          </ul>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Attendance List</h2>
          <ul className="list-disc pl-5">
            {filteredAttendances.length > 0 ? (
              filteredAttendances.map((attendance, index) => (
                <li key={index} className="mb-2">
                  <span className="font-semibold">{new Date(attendance.date).toLocaleDateString()}:</span> {attendance.status}
                </li>
              ))
            ) : (
              <li>No attendance data available for the selected date.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Report;
