import React from 'react';

const DashboardOverview = ({ recentActivities }) => (
  <div className="dashboard-overview">
    <h2>Recent Activities</h2>
    <ul>
      {recentActivities.map((activity, index) => (
        <li key={index}>{activity}</li>
      ))}
    </ul>
  </div>
);

export default DashboardOverview;
