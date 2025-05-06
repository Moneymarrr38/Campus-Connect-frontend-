import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, XCircle } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token, data.role, data.email);
        navigate('/dashboard');
      } else {
        setError(data.message || 'Invalid email or password');
      }
    } catch {
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-black border border-yellow-400 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-yellow-400 text-center mb-6">Campus Connect Management</h1>
        <h2 className="text-xl font-semibold text-white mb-4">Login or Register</h2>

        {error && (
          <div className="flex items-center bg-red-100 text-red-700 text-sm px-3 py-2 rounded mb-4">
            <XCircle className="w-4 h-4 mr-2 text-red-600" />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="w-full p-3 rounded bg-gray-800 text-white border border-gray-600 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 rounded transition">
            Login
          </button>
        </form>

        <button
          onClick={() => navigate('/register')}
          className="mt-4 w-full bg-gray-800 text-white font-semibold py-2 rounded hover:bg-gray-700 transition"
        >
          Register New Account
        </button>

        <div className="text-center mt-3">
          <button
            onClick={() => navigate('/forgot-password')}
            className="text-sm text-yellow-400 hover:underline"
          >
            Forgot password?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
