import React, { useState } from 'react';

const WorkProgressForm = () => {
  const [progress, setProgress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Work Progress:
        <textarea value={progress} onChange={(e) => setProgress(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default WorkProgressForm;
