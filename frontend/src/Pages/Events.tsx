import React, { useEffect, useState } from 'react';
import PageLayout from '../components/PageLayout';
import { useUser } from '../context/UserContext';

type EventType = {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
};

const Events: React.FC = () => {
  const { user } = useUser();
  const role = user?.role;
  const token = localStorage.getItem('token');
  const userEmail = localStorage.getItem('userEmail');

  const [events, setEvents] = useState<EventType[]>([]);
  const [toastMessage, setToastMessage] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/events', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch(() => showToast('⚠️ Failed to load events'));
  }, [token]);

  const addEvent = async () => {
    if (!title || !date || !location || !description) {
      showToast('⚠️ Fill in all fields');
      return;
    }

    const res = await fetch('http://localhost:5000/api/events/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ title, date, location, description })
    });

    if (res.ok) {
      const newEvent = await res.json();
      setEvents([newEvent, ...events]);
      setTitle('');
      setDate('');
      setLocation('');
      setDescription('');
      showToast('✅ Event added!');
    } else {
      showToast('❌ Failed to add event');
    }
  };

  const handleRSVP = async (eventId: number) => {
    if (!userEmail || !token) {
      showToast('⚠️ You must be logged in to RSVP');
      return;
    }

    const res = await fetch('http://localhost:5000/api/events/rsvp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        user_email: userEmail,
        event_id: eventId
      })
    });

    if (res.ok) {
      showToast('✅ RSVP successful!');
    } else {
      const data = await res.json();
      showToast(`❌ RSVP failed: ${data.message}`);
    }
  };

  return (
    <PageLayout>
      <div className="p-6 text-white max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">Campus Events</h1>

        {role === 'admin' && (
          <div className="bg-black border border-yellow-400 p-6 rounded-xl mb-10 shadow-lg">
            <h2 className="text-xl font-semibold text-yellow-300 mb-4">Create New Event</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input className="p-2 rounded bg-gray-900 text-white border border-gray-600" placeholder="Event Title" value={title} onChange={(e) => setTitle(e.target.value)} />
              <input type="date" className="p-2 rounded bg-gray-900 text-white border border-gray-600" value={date} onChange={(e) => setDate(e.target.value)} />
              <input className="p-2 rounded bg-gray-900 text-white border border-gray-600" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <textarea className="w-full p-2 rounded bg-gray-900 text-white border border-gray-600 mb-4" rows={3} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <button onClick={addEvent} className="bg-yellow-400 text-black font-semibold py-2 px-4 rounded hover:bg-yellow-500 transition">Add Event</button>
          </div>
        )}

        <div className="grid gap-4">
          {events.map((event) => (
            <div key={event.id} className="bg-[#1e1e2d] border border-yellow-600 p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-yellow-300">{event.title}</h2>
              <p><span className="text-yellow-200 font-medium">Date:</span> {event.date}</p>
              <p><span className="text-yellow-200 font-medium">Location:</span> {event.location}</p>
              <p className="text-gray-300 mt-2">{event.description}</p>
              {role === 'student' && (
                <button
                  onClick={() => handleRSVP(event.id)}
                  className="mt-3 bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500"
                >
                  RSVP
                </button>
              )}
            </div>
          ))}
        </div>

        {toastMessage && (
          <div className="fixed bottom-6 right-6 bg-yellow-400 text-black px-6 py-3 rounded shadow-lg font-semibold z-50">
            {toastMessage}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Events;
