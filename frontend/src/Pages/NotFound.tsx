import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6 text-center">
      <h1 className="text-6xl font-extrabold text-yellow-400 mb-4">404</h1>
      <p className="text-xl mb-4">Oops! The page you're looking for doesn't exist.</p>
      <button onClick={() => navigate('/dashboard')} className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded transition">
        Go to Dashboard
      </button>
    </div>
  );
};

export default NotFound;
