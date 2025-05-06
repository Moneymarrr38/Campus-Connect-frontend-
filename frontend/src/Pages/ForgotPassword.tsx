import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Password reset instructions sent to your email.');
      } else {
        setError(data.message || 'Unable to send reset instructions');
      }
    } catch {
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-black border border-yellow-400 p-8 rounded-lg shadow-lg w-full max-w-md text-white">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">Forgot Password</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded">
            Send Reset Link
          </button>
        </form>

        {message && <p className="mt-4 text-green-400 text-center">{message}</p>}
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

        <button
          onClick={() => navigate('/login')}
          className="mt-6 text-sm text-yellow-300 hover:underline w-full text-center"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
