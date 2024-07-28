// DashboardHome.js
import React from 'react';

const DashboardHome = ({ user }) => {
  return (
    <div className="flex flex-col justify-center items-center p-4 mt-16">
      <h1 className="text-3xl font-bold mb-10">Welcome to the Dashboard</h1>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md w-full">
          <p>Email: {user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
