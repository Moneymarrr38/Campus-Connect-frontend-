import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState('');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setConfirmed(true);
      } else {
        setError(data.message || 'Reset failed');
      }
    } catch {
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-black border border-yellow-400 p-8 rounded-lg shadow-lg w-full max-w-md text-center text-white">
        <h1 className="text-2xl font-bold text-yellow-400 mb-6">Set New Password</h1>
        {confirmed ? (
          <>
            <p className="text-green-400 mb-4">✅ Password reset successful.</p>
            <button onClick={() => navigate('/login')} className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-6 rounded">
              Back to Login
            </button>
          </>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600"
              required
            />
            <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded">
              Reset Password
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
