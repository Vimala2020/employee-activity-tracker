import React from 'react';

const Profile = ({ user }) => (
  <div className="profile">
    <h2>{user.name}</h2>
    <p>{user.email}</p>
    <button>Edit Profile</button>
  </div>
);

export default Profile;
