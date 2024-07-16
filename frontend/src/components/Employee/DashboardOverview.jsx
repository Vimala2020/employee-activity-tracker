import React from 'react';

const DashboardOverview = ({ recentActivities }) => (
  <div className="bg-white p-6 rounded-lg shadow-md mt-4">
    <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activities</h2>
    <ul className="space-y-4">
      {recentActivities.map((activity, index) => (
        <li key={index} className="p-4 bg-gray-100 rounded-md text-gray-700">
          {activity}
        </li>
      ))}
    </ul>
  </div>
);

export default DashboardOverview;
