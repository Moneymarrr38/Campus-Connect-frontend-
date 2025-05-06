import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const NavBar: React.FC = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-black text-yellow-400 px-6 py-4 flex justify-between items-center shadow-md">
      <span className="text-2xl font-bold">🎓 Campus Connect</span>
      <div className="space-x-6">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/events">Events</Link>
        <Link to="/feedback">Feedback</Link>
        {user?.role === 'admin' && (
          <>
            <Link to="/admin/create">Create</Link>
            <Link to="/admin/delete">Delete</Link>
            <Link to="/admin/rsvps">RSVPs</Link>
          </>
        )}
        <button
          onClick={handleLogout}
          className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;