import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/PageLayout';

const CreateEvent = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const token = localStorage.getItem('token');

    try {
      const res = await fetch('http://localhost:5000/api/events/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, date, location, description }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to create event');
      }

      setSuccess(true);
      setTimeout(() => navigate('/admin'), 1500);
    } catch (err: any) {
      setError(err.message || 'Error submitting form');
    }
  };

  return (
    <PageLayout>
      <div className="p-6 max-w-xl mx-auto text-white">
        <h1 className="text-3xl font-bold text-yellow-400 mb-4">Create New Event</h1>
        {success ? (
          <p className="text-green-400">✅ Event created! Redirecting...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Event Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded"
            />
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded"
              rows={3}
            />
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded"
            >
              Create Event
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </form>
        )}
        <button
          onClick={() => navigate('/admin')}
          className="mt-4 text-sm text-yellow-300 hover:underline"
        >
          ⬅ Back to Admin Dashboard
        </button>
      </div>
    </PageLayout>
  );
};

export default CreateEvent;
