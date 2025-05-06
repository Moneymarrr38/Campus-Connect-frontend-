import React, { useState } from 'react';
import PageLayout from '../components/PageLayout';

const Feedback = () => {
  const [eventId, setEventId] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ eventId, rating, comment })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Failed to submit');

      setSuccess(true);
      setEventId('');
      setRating(5);
      setComment('');
    } catch (err: any) {
      setError(err.message || 'Server error');
    }
  };

  return (
    <PageLayout>
      <div className="max-w-xl mx-auto p-6 text-white">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">Leave Feedback</h1>
        {success && <p className="text-green-400 mb-4">✅ Thank you for your feedback!</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Event ID"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            className="w-full p-3 rounded bg-gray-800 border border-gray-600"
            required
          />
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full p-3 rounded bg-gray-800 border border-gray-600"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>{r} Stars</option>
            ))}
          </select>
          <textarea
            rows={4}
            placeholder="Comments..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-3 rounded bg-gray-800 border border-gray-600"
          />
          <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded">
            Submit Feedback
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </PageLayout>
  );
};

export default Feedback;
