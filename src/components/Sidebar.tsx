import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <div className="bg-black text-white w-60 min-h-screen p-6 flex flex-col justify-between fixed">
      <div>
        <h1 className="text-2xl font-bold text-yellow-400 mb-10">Campus Connect</h1>
        <ul className="space-y-4">
          <li><Link to="/dashboard" className="hover:text-yellow-400">Dashboard</Link></li>
          <li><Link to="/profile" className="hover:text-yellow-400">Profile</Link></li>
          <li><Link to="/events" className="hover:text-yellow-400">Events</Link></li>
        </ul>
      </div>
      <button
        onClick={handleLogout}
        className="mt-10 bg-yellow-400 text-black font-semibold py-2 px-4 rounded hover:bg-yellow-500 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
