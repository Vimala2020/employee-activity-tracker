import React, { useState } from 'react';
import WorkProgressForm from '../Workprogress/WorkprogressForm';
import WorkProgressList from '../Workprogress/WorkprogressList';

const DailyProgress = () => {
  const [progresses, setProgresses] = useState([]);

  const handleProgressSubmit = (progress) => {
    setProgresses([...progresses, progress]);
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

export default DailyProgress;
