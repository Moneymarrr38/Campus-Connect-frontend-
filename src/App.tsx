import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Welcome from './Pages/Welcome';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
