import React from 'react';
import PropTypes from 'prop-types';

const AttendanceList = ({ attendances }) => {
  return (
    <div>
      {attendances.length === 0 ? (
        <p>No attendance records available.</p>
      ) : (
        <ul>
          {attendances.map((attendance, index) => {
            const date = new Date(attendance.date).toLocaleDateString();
            return (
              <li key={index}>
                {date} - {attendance.status} {attendance.user ? `- ${attendance.user.name}` : ''}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

AttendanceList.propTypes = {
  attendances: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string,
      }),
    })
  ).isRequired,
};

export default AttendanceList;
