import React from 'react';
import PropTypes from 'prop-types';

const AttendanceList = ({ attendances }) => {
  return (
    <div>
      {attendances.length === 0 ? (
        <p className="text-gray-600">No attendance records available.</p>
      ) : (
        <ul className="list-disc pl-5 space-y-2">
          {attendances.map((attendance, index) => {
            const date = new Date(attendance.date).toLocaleDateString();
            return (
              <li key={index} className="text-gray-700">
                {date} - {attendance.status} {attendance.username ? `- ${attendance.username}` : ''}
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
      username: PropTypes.string,
    })
  ).isRequired,
};

export default AttendanceList;
