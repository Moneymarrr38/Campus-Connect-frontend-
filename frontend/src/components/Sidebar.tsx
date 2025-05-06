import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  CalendarDays,
  Megaphone,
  ClipboardList,
  Users,
  LogOut,
} from 'lucide-react';
import { useUser } from '../context/UserContext';

const Sidebar: React.FC = () => {
  const { logout, user } = useUser();

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-4 py-2 rounded-md transition ${
      isActive ? 'bg-yellow-500 text-black font-semibold' : 'text-white hover:bg-gray-800'
    }`;

  return (
    <div className="flex flex-col h-full p-4 space-y-4">
      <div className="text-yellow-400 text-lg font-bold mb-4">Menu</div>

      <NavLink to="/dashboard" className={linkClasses}>
        <Home className="w-5 h-5 mr-2" /> Dashboard
      </NavLink>

      <NavLink to="/events" className={linkClasses}>
        <CalendarDays className="w-5 h-5 mr-2" /> Events
      </NavLink>

      <NavLink to="/announcements" className={linkClasses}>
        <Megaphone className="w-5 h-5 mr-2" /> Announcements
      </NavLink>

      {user?.role === 'admin' && (
        <NavLink to="/attendance" className={linkClasses}>
          <ClipboardList className="w-5 h-5 mr-2" /> Attendance
        </NavLink>
      )}

      {user?.role === 'student' && (
        <NavLink to="/checkin" className={linkClasses}>
          <Users className="w-5 h-5 mr-2" /> Check-In
        </NavLink>
      )}

      <button
        onClick={logout}
        className="flex items-center px-4 py-2 mt-auto text-white hover:bg-red-600 rounded-md transition"
      >
        <LogOut className="w-5 h-5 mr-2" /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
