import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold text-yellow-400">Campus Connect</h1>
      <div className="space-x-4">
        <Link to="/dashboard" className="hover:text-yellow-400">Dashboard</Link>
        <Link to="/login" className="hover:text-yellow-400">Login</Link>
      </div>
    </nav>
  );
};

export default NavBar;
