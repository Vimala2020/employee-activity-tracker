import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';

const WorkProgressForm = ({ onProgressSubmit }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [progress, setProgress] = useState({
    userId: user ? user.uid : '',
    username: user ? user.displayName : '',
    workSummary: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProgress({ ...progress, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      onProgressSubmit(progress);
    } catch (error) {
      console.error('Error submitting progress:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          name="username"
          value={progress.username}
          onChange={handleChange}
          placeholder="Username"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          readOnly
        />
      </div>
      <div>
        <label htmlFor="workSummary" className="block text-sm font-medium text-gray-700">Work Progress</label>
        <textarea
          name="workSummary"
          value={progress.workSummary}
          onChange={handleChange}
          placeholder="Work Progress"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        ></textarea>
      </div>
      <div>
        <button
          type="submit"
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit Progress
        </button>
      </div>
    </form>
  );
};

export default WorkProgressForm;
