import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Auth/Firebase';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WorkprogressForm = () => {
  const [workDescription, setWorkDescription] = useState('');
  const [progresses, setProgresses] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
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

  const fetchProgresses = async (userID) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/workprogress/${userID}`);
      setProgresses(response.data);
    } catch (error) {
      console.error('Error fetching progress data:', error);
    }
  };

  const handleChange = (e) => {
    setWorkDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User not authenticated');
      }
      const date = new Date().toISOString();
      const workData = {
        userId: user.uid,
        date,
        workDescription,
      };
      const response = await axios.post('http://localhost:5000/api/workprogress/submit', workData);
      toast.success(response.data);
      fetchProgresses(user.uid);
      setWorkDescription('');
    } catch (error) {
      toast.error('Please try again..!');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-md animate-fadeIn">
        <h1 className="text-2xl font-bold mb-4">Submit Work Progress</h1>
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="workDescription">
              Work Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="workDescription"
              value={workDescription}
              onChange={handleChange}
              required
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit Work
          </button>
        </form>
        <ul>
          {progresses.map((progress, index) => (
            <li key={index} className="mt-2 text-gray-700">
              {progress.date} - {progress.workDescription}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WorkprogressForm;
