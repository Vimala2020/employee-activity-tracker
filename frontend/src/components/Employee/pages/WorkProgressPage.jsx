import React, { useState, useEffect } from 'react';
import WorkProgressForm from '../Workprogress/WorkprogressForm';
import WorkProgressList from '../Workprogress/WorkprogressList';
import axios from 'axios';
import { getAuth } from 'firebase/auth';

const Workprogress = () => {
  const [progresses, setProgresses] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser({ uid: currentUser.uid, name: currentUser.displayName });
      fetchProgresses(currentUser.uid);
    }
  }, []);

  const fetchProgresses = async (userId) => {
    try {
      const response = await axios.get(`/api/workprogress/${userId}`);
      setProgresses(response.data);
    } catch (error) {
      console.error('Error fetching progress:', error);
    }
  };

  const handleProgressSubmit = async (progress) => {
    try {
      await axios.post('/api/workprogress/submit', progress);
      fetchProgresses(user.uid);
    } catch (error) {
      console.error('Error submitting progress:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Submit Daily Progress</h1>
      <div className="mb-10">
        <WorkProgressForm onProgressSubmit={handleProgressSubmit} />
      </div>
      <div>
        <WorkProgressList progresses={progresses} />
      </div>
    </div>
  );
};

export default Workprogress;
