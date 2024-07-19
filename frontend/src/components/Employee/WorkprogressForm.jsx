import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Auth/Firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WorkprogressForm = () => {
  const [work, setWork] = useState('');
  const [progresses, setProgresses] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('Auth state changed. Current user:', currentUser);
      if (currentUser) {
        setUser(currentUser);
        fetchProgresses(currentUser.uid);
      } else {
        setUser(null);
        setProgresses([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchProgresses = async (userId) => {
    try {
      console.log('Fetching progress for userID:', userId);
      const response = await axios.get(`http://localhost:5000/api/workprogress/${userId}`);
      setProgresses(response.data);
      console.log('Progress data:', response.data);
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };

  const handleChange = (e) => {
    setWork(e.target.value);
    console.log('Progress added:', e.target.value);
  };

  const handleProgressSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User not authenticated');
      }
      const progressData = {
        userId: user.uid,
        work,  // Make sure this field matches the schema and controller
      };
      console.log('Submitting work:', progressData);
      const response = await axios.post('http://localhost:5000/api/workprogress/submit', progressData);
      toast.success('Employee successfully added today Work');
      fetchProgresses(user.uid);
      setWork('');
    } catch (error) {
      console.error('Error submitting progress:', error);
      toast.error('Please try again..!');
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Submit Work Progress</h1>
        <form onSubmit={handleProgressSubmit} className="mb-6">
          <label htmlFor="workSummary" className="block text-sm font-medium text-gray-700">Work Progress</label>
          <textarea
            name="workSummary"
            value={work}
            onChange={handleChange}
            placeholder="Work Progress"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
          <div className="mt-4">
            <button
              type="submit"
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Progress
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkprogressForm;

