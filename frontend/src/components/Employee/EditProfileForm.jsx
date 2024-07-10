import React, { useState } from 'react';

const EditProfileForm = ({ user, onSave, onCancel }) => {
  const [updatedUser, setUpdatedUser] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(updatedUser);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Profile</h2>
      <label className="block text-gray-700">Name</label>
      <input 
        type="text" 
        name="name" 
        value={updatedUser.name} 
        onChange={handleChange} 
        className="mt-2 mb-4 p-2 border rounded w-full"
      />
      <label className="block text-gray-700">Email</label>
      <input 
        type="email" 
        name="email" 
        value={updatedUser.email} 
        onChange={handleChange} 
        className="mt-2 mb-4 p-2 border rounded w-full"
      />
      <button 
        type="submit" 
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
      >
        Save
      </button>
      <button 
        type="button" 
        onClick={onCancel} 
        className="mt-4 ml-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200"
      >
        Cancel
      </button>
    </form>
  );
};

export default EditProfileForm;
