import React, { useState } from 'react';
import EditProfileForm from './EditProfileForm';

const Profile = ({ user, updateUser }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedUser) => {
    updateUser(updatedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10">
      {isEditing ? (
        <EditProfileForm user={user} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
          <p className="text-gray-600 mt-2">{user.email}</p>
          <button 
            onClick={handleEditClick} 
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
