import React from 'react';
import PropTypes from 'prop-types';

const WorkProgressList = ({ progressList }) => (
  <ul>
    {progressList.map((progress, index) => (
      <li key={index}>{progress.date} - {progress.description}</li>
    ))}
  </ul>
);

WorkProgressList.propTypes = {
  progressList: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default WorkProgressList;
