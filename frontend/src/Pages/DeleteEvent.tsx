import React, { useEffect, useState } from 'react';
import PageLayout from '../components/PageLayout';

const DeleteEvent = () => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/events')
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch(() => alert('Failed to fetch events.'));
  }, []);

  const handleDelete = async (eventId: string) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5000/api/events/${eventId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      setEvents((prev) => prev.filter((e) => e.id !== eventId));
      alert('Event deleted.');
    } else {
      alert('Failed to delete event.');
    }
  };

  return (
    <PageLayout>
      <div className="p-6 text-white">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">Delete Events</h1>
        {events.map((event) => (
          <div key={event.id} className="bg-black border border-yellow-400 p-4 rounded mb-4">
            <h2 className="text-xl font-semibold text-yellow-300">{event.title}</h2>
            <p className="text-white">Date: {event.date}</p>
            <button
              onClick={() => handleDelete(event.id)}
              className="mt-3 bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default DeleteEvent;
