import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const mockEvents = [
  {
    id: 1,
    title: 'Finals Study Night',
    date: '2025-05-06',
    location: 'Library Room 204',
    status: 'Upcoming',
  },
  {
    id: 2,
    title: 'Career Fair',
    date: '2025-04-20',
    location: 'Student Center',
    status: 'Past',
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('All');

  const filteredEvents = activeTab === 'All'
    ? mockEvents
    : mockEvents.filter((e) => e.status === activeTab);

  const handleRSVP = async (eventId: number) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch('http://localhost:5000/api/events/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ eventId }),
      });

      const data = await res.json();
      if (res.ok) {
        alert('🎉 RSVP successful!');
      } else {
        alert(data.message || 'RSVP failed.');
      }
    } catch (err) {
      alert('Server error.');
    }
  };

  return (
    <div className="p-6 text-white">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-yellow-400">
          🎓 Campus Connect Dashboard
        </h1>
        <p className="text-xl mt-2 text-yellow-200">
          Welcome, <span className="font-semibold">{user?.email || 'student'}</span>!
        </p>
        <p className="text-md text-yellow-100 mt-1">
          View and interact with your campus events below.
        </p>
        <div className="border-t border-yellow-500 mt-6 w-full max-w-3xl mx-auto" />
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        {['All', 'Upcoming', 'Past'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium border-2 ${
              activeTab === tab
                ? 'bg-yellow-400 text-black border-yellow-400'
                : 'text-yellow-400 border-yellow-400 hover:bg-yellow-400 hover:text-black'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="bg-black border border-yellow-400 rounded-xl p-4"
          >
            <h2 className="text-xl font-semibold text-yellow-300 mb-2">
              {event.title}
            </h2>
            <p><span className="font-medium text-yellow-200">Date:</span> {event.date}</p>
            <p><span className="font-medium text-yellow-200">Location:</span> {event.location}</p>
            <p className="mb-4"><span className="font-medium text-yellow-200">Status:</span> {event.status}</p>

            <button
              onClick={() => handleRSVP(event.id)}
              className="mb-2 w-full bg-transparent border border-yellow-400 text-yellow-400 font-bold py-2 rounded hover:bg-yellow-400 hover:text-black"
            >
              RSVP
            </button>

            <button
              onClick={() => navigate('/feedback')}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded"
            >
              Give Feedback
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
