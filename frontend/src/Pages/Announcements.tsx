import React, { useState, useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import { Megaphone, Trash2 } from 'lucide-react';
import { useUser } from '../context/UserContext';

type Announcement = {
  id: number;
  title: string;
  description: string;
};

const Announcements = () => {
  const { user } = useUser();
  const role = user?.role;

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch('http://localhost:5000/api/announcements', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => setAnnouncements(data))
      .catch(() => showToast('⚠️ Failed to load announcements'));
  }, [token]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const addAnnouncement = async () => {
    if (!title || !description) {
      showToast('⚠️ Title and description required');
      return;
    }

    const res = await fetch('http://localhost:5000/api/announcements', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ title, description })
    });

    const data = await res.json();
    if (res.ok) {
      setAnnouncements([data, ...announcements]);
      setTitle('');
      setDescription('');
      showToast('✅ Announcement added!');
    } else {
      showToast('❌ ' + data.message);
    }
  };

  const deleteAnnouncement = async (id: number) => {
    const res = await fetch(`http://localhost:5000/api/announcements/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.ok) {
      setAnnouncements((prev) => prev.filter((a) => a.id !== id));
      showToast('🗑️ Announcement deleted');
    } else {
      showToast('❌ Failed to delete announcement');
    }
  };

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto px-6 py-8 text-white">
        <h1 className="text-4xl font-bold text-yellow-400 mb-8 flex items-center">
          <Megaphone className="w-8 h-8 mr-3" /> Announcements
        </h1>

        {role === 'admin' && (
          <div className="bg-black border border-yellow-400 p-6 rounded-xl mb-10 shadow-lg">
            <h2 className="text-2xl font-semibold text-yellow-300 mb-4">Post New Announcement</h2>
            <input
              className="w-full p-3 mb-3 rounded bg-gray-900 border border-gray-600 placeholder:text-gray-400"
              placeholder="Announcement Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="w-full p-3 mb-4 rounded bg-gray-900 border border-gray-600 placeholder:text-gray-400"
              rows={4}
              placeholder="Write your announcement..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              onClick={addAnnouncement}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-5 rounded transition"
            >
              Submit
            </button>
          </div>
        )}

        <div className="grid gap-6">
          {announcements.map((a) => (
            <div
              key={a.id}
              className="bg-[#1e1e2d] border border-yellow-600 p-6 rounded-lg shadow-md transition hover:shadow-yellow-400/20"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-yellow-300">{a.title}</h3>
                {role === 'admin' && (
                  <button onClick={() => deleteAnnouncement(a.id)} className="text-red-400 hover:text-red-600">
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
              <p className="text-gray-300">{a.description}</p>
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

export default Announcements;
