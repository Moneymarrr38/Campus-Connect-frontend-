import React, { useEffect, useState } from 'react';
import PageLayout from '../components/PageLayout';

const ViewRSVP = () => {
  const [rsvps, setRsvps] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:5000/api/events/rsvps', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setRsvps(data))
      .catch(() => alert('Failed to fetch RSVP data.'));
  }, []);

  return (
    <PageLayout>
      <div className="p-6 text-white">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">RSVP Submissions</h1>
        {rsvps.map((rsvp, index) => (
          <div key={index} className="bg-black border border-yellow-400 p-4 rounded mb-4">
            <p><span className="text-yellow-300 font-bold">Student:</span> {rsvp.email}</p>
            <p><span className="text-yellow-300 font-bold">Event:</span> {rsvp.eventTitle}</p>
            <p><span className="text-yellow-300 font-bold">Date:</span> {rsvp.date}</p>
          </div>
        ))}
      </div>
    </PageLayout>
  );
};

export default ViewRSVP;
