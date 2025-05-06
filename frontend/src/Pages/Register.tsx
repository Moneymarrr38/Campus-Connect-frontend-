import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('🎉 Registered successfully!');
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Server error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
      <div className="bg-black border border-yellow-400 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center">Register New Account</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 rounded bg-gray-900 border border-gray-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 rounded bg-gray-900 border border-gray-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-900 border border-gray-600"
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={handleRegister}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded"
        >
          Register
        </button>

        {error && <p className="text-red-500 text-center mt-3">{error}</p>}

        <p
          className="text-yellow-400 text-center mt-4 underline cursor-pointer"
          onClick={() => navigate('/login')}
        >
          Back to Login
        </p>
      </div>
    </div>
  );
};

export default Register;
