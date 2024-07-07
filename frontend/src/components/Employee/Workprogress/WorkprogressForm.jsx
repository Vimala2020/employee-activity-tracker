import React, { useState } from 'react';


const WorkProgressForm = ({ onProgressSubmit }) => {
  const [progress, setProgress] = useState({ employeeId: '', date: '', progress: '' });
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProgress({ ...progress, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post('/api/progress', progress);
      // console.log(response.data.message);
    } catch (error) {
      console.error('Error submitting progress:', error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="employeeId" value={progress.employeeId} onChange={handleChange} placeholder="Employee ID" />
      <input type="date" name="date" value={progress.date} onChange={handleChange} />
      <textarea name="progress" value={progress.progress} onChange={handleChange} placeholder="Work Progress"></textarea>
      <button type="submit">Submit Progress</button>
    </form>
  );
};

export default WorkProgressForm;
