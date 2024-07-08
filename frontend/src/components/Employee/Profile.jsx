import React from 'react';

const Profile = ({ user }) => (
  <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10">
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
      <p className="text-gray-600 mt-2">{user.email}</p>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out">
        Edit Profile
      </button>
    </div>
  </div>
);

export default Profile;
