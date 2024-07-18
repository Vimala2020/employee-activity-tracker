import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Auth/Firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const AttendanceForm = () => {
  const [status, setStatus] = useState('');
  const [attendances, setAttendances] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('Auth state changed. Current user:', currentUser); // Debug log
      if (currentUser) {
        setUser(currentUser);
        fetchAttendance(currentUser.uid);
      } else {
        setUser(null);
        setAttendances([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchAttendance = async (userID) => {
    try {
      console.log('Fetching attendance for userID:', userID); // Debug log
      const response = await axios.get(`http://localhost:5000/api/attendance/${userID}`);
      setAttendances(response.data);
      console.log('Attendance data:', response.data); // Debug log
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  const handleChange = (e) => {
    setStatus(e.target.value);
    console.log('Status changed:', e.target.value); // Debug log
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User not authenticated');
      }
      const date = new Date().toISOString();
      const attendanceData = {
        userId: user.uid,
        date,
        status,
      };
      console.log('Submitting attendance data:', attendanceData); // Debug log
      const response = await axios.post('http://localhost:5000/api/attendance/mark', attendanceData);
      toast.success('Employee successfully marked attendance');
      fetchAttendance(user.uid); // Update attendance list after marking
      setStatus(''); // Clear status after submission
    } catch (error) {
      toast.error('Please try again..!');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Mark Attendance</h1>
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
              Status
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="status"
              value={status}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </select>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Mark Attendance
          </button>
        </form>
      </div>
    </div>
  );
};

export default AttendanceForm;
