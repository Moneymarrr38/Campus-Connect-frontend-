import React, { useEffect, useState } from 'react';
import PageLayout from '../components/PageLayout';
import { useUser } from '../context/UserContext';

type Event = {
  id: number;
  title: string;
};

type RSVP = {
  user_email: string;
};

const AdminRSVPs: React.FC = () => {
  const { user } = useUser();
  const token = localStorage.getItem('token');
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.role === 'admin') {
      fetch('http://localhost:5000/api/events', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then(setEvents)
        .catch(() => setError('❌ Failed to load events'));
    }
  }, [token, user]);

  const fetchRSVPs = async (eventId: number) => {
    setSelectedEventId(eventId);
    setError('');
    try {
      const res = await fetch(`http://localhost:5000/api/events/${eventId}/rsvps`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Could not fetch RSVPs');
      const data = await res.json();
      setRsvps(data);
    } catch (err) {
      setError('❌ Failed to fetch RSVPs');
    }
  };

  return (
    <PageLayout>
      <div className="p-6 max-w-3xl mx-auto text-white">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">RSVP Viewer</h1>

        {error && <p className="text-red-500">{error}</p>}

        <div className="mb-6">
          <label className="block mb-2 text-yellow-300 font-semibold">Select an Event:</label>
          <select
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            onChange={(e) => fetchRSVPs(Number(e.target.value))}
            defaultValue=""
          >
            <option value="" disabled>Select event</option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.title}
              </option>
            ))}
          </select>
        </div>

        {selectedEventId && (
          <>
            <h2 className="text-xl font-semibold text-yellow-300 mb-4">RSVPs</h2>
            {rsvps.length > 0 ? (
              <ul className="space-y-2">
                {rsvps.map((rsvp, index) => (
                  <li key={index} className="bg-gray-800 p-3 rounded border border-yellow-400">
                    {rsvp.user_email}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No RSVPs yet for this event.</p>
            )}
          </>
        )}
      </div>
    </PageLayout>
  );
};

export default AdminRSVPs;
