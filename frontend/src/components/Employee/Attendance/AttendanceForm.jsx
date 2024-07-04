import React, { useState } from 'react';

const AttendanceForm = () => {
  const [status, setStatus] = useState('present');
  const [workDescription, setWorkDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Status:
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
        </select>
      </label>
      <label>
        Work Description:
        <textarea value={workDescription} onChange={(e) => setWorkDescription(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AttendanceForm;
