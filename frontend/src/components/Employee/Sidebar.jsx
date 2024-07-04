import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <nav className="sidebar">
    <ul>
      <li><Link to="/dashboard">Dashboard</Link></li>
      <li><Link to="/attendance">Attendance</Link></li>
      <li><Link to="/attendance-list">Attendance List</Link></li>
      <li><Link to="/work-progress">Work Progress</Link></li>
      <li><Link to="/work-progress-list">Work Progress List</Link></li>
      <li><Link to="/profile">Profile</Link></li>
      <li><Link to="/logout">Logout</Link></li>
    </ul>
  </nav>
);

export default Sidebar;
