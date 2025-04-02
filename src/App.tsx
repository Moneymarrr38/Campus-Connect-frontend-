import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from './image.png';

const App = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-black bg-opacity-70 p-10 rounded-2xl text-center text-white max-w-xl w-full">
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">Welcome to Campus Connect</h1>
        <p className="text-lg mb-2">A Unified Campus Event System</p>
        <p className="text-lg mb-6">Bringing Students Together</p>
        <button
          onClick={() => navigate('/login')}
          className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default App;
