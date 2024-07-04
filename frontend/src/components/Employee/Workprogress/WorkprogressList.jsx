import React from 'react';

const WorkProgressList = ({ progressList }) => (
  <ul>
    {progressList.map((progress, index) => (
      <li key={index}>{progress.date} - {progress.description}</li>
    ))}
  </ul>
);

export default WorkProgressList;
  