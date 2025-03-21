import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <ul>
        <li className="mb-3">
          <Link to="/" className="block p-2 hover:bg-gray-700 rounded transition duration-300">User Profile</Link>
        </li>
        <li className="mb-3">
          <Link to="/activities" className="block p-2 hover:bg-gray-700 rounded transition duration-300">Activities</Link>
        </li>
        <li className="mb-3">
          <Link to="/rewards" className="block p-2 hover:bg-gray-700 rounded transition duration-300">Rewards</Link>
        </li>
        <li className="mb-3">
          <Link to="/leaderboard" className="block p-2 hover:bg-gray-700 rounded transition duration-300">Leaderboard</Link>
        </li>
        <li className="mb-3">
          <Link to="/admin" className="block p-2 hover:bg-gray-700 rounded transition duration-300">Admin Dashboard</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;