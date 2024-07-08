import React from 'react';

const WorkProgressList = ({ progresses }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {progresses.length === 0 ? (
        <p className="text-gray-500">No work progress records available.</p>
      ) : (
        <ul className="space-y-4">
          {progresses.map((progress, index) => (
            <li key={index} className="p-4 bg-gray-100 rounded-md">
              <p className="text-gray-800 font-semibold">{progress.date}</p>
              <p className="text-gray-600">{progress.progress}</p>
              <p className="text-gray-500 text-sm">Employee ID: {progress.employeeId}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WorkProgressList;

