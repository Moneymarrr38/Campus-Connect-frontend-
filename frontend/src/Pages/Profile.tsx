import React, { useState, useEffect } from 'react';
import PageLayout from '../components/PageLayout';

const Profile = () => {
  const storedEmail = localStorage.getItem('userEmail') || 'student@uncp.edu';
  const storedName = localStorage.getItem('userName') || 'John Doe';

  const [name, setName] = useState(storedName);
  const [email, setEmail] = useState(storedEmail);

  useEffect(() => {
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', name);
  }, [name, email]);

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <PageLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">My Profile</h1>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-yellow-400 text-black font-bold rounded-full flex items-center justify-center text-xl">
            {initials}
          </div>
          <p className="text-white text-lg">Welcome, {name}</p>
        </div>
        <form className="bg-black border border-yellow-400 p-6 rounded-lg space-y-4">
          <div>
            <label className="block text-yellow-400 font-semibold mb-1">Name:</label>
            <input
              className="w-full p-2 rounded bg-gray-900 text-white border border-gray-600"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-yellow-400 font-semibold mb-1">Email:</label>
            <input
              className="w-full p-2 rounded bg-gray-900 text-white border border-gray-600"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <p className="text-green-400">Changes are saved automatically.</p>
        </form>
      </div>
    </PageLayout>
  );
};

export default Profile;
