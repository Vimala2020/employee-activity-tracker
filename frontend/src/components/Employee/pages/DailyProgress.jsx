import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WorkProgressForm from '../Workprogress/WorkprogressForm';
import WorkProgressList from '../Workprogress/WorkprogressList';

const DailyProgress = () => {
  const [progressList, setProgressList] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await axios.get('/api/progress');
        setProgressList(response.data);
      } catch (error) {
        console.error('Error fetching progress:', error);
      }
    };

    fetchProgress();
  }, []);

  const handleProgressSubmit = (newProgress) => {
    setProgressList([...progressList, newProgress]);
  };

  return (
    <div>
      <h1>Submit Daily Progress</h1>
      <WorkProgressForm onProgressSubmit={handleProgressSubmit} />
      <WorkProgressList progressList={progressList} />
    </div>
  );
};

export default DailyProgress;
