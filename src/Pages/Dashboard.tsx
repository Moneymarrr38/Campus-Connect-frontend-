import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => (
  <div className="fixed top-0 left-0 h-full w-60 bg-black text-white flex flex-col p-6 shadow-lg">
    <h2 className="text-2xl font-bold text-yellow-400 mb-8">Campus Connect</h2>
    <nav className="flex flex-col space-y-4">
      <a href="/dashboard" className="hover:text-yellow-300">Dashboard</a>
      <a href="/login" className="hover:text-yellow-300">Login</a>
    </nav>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (!loggedIn) {
      navigate('/login');
    }
  }, []);

  const announcements = [
    {
      title: 'Class Registration Opens',
      description:
        'Registration for Fall 2025 begins April 15. Meet with your advisor to plan courses.',
    },
    {
      title: 'Mental Health Awareness Week',
      description:
        'Free counseling workshops & activities all week. Check Student Services for the full schedule.',
    },
  ];

  const events = [
    {
      title: 'Spring Festival',
      description: 'Join us for food, music, and games on April 10th.',
    },
    {
      title: 'Study Jam',
      description: 'Late night study session in the library with free snacks.',
    },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-60 p-6 flex-1 bg-gray-100 min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Welcome back, Marcus 👋</h2>
          <p className="text-gray-600">Team Lead · System Analyst</p>
          <button
            onClick={() => {
              localStorage.removeItem('isLoggedIn');
              navigate('/login');
            }}
            className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-1 px-4 rounded transition"
          >
            Logout
          </button>
        </div>

        {/* Announcements */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-3 text-black">📢 Campus Announcements</h3>
          <div className="space-y-4">
            {announcements.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded shadow border-l-4 border-yellow-400">
                <h4 className="font-semibold text-yellow-500">{item.title}</h4>
                <p className="text-sm text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Event Cards */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-3 text-black">🎉 Upcoming Events</h3>
          <div className="space-y-4">
            {events.map((event, index) => (
              <div key={index} className="bg-white p-4 rounded shadow border-l-4 border-pink-400">
                <h4 className="font-semibold text-pink-600">{event.title}</h4>
                <p className="text-sm text-gray-700">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
