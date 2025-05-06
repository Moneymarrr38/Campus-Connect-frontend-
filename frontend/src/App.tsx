import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';
import Events from './Pages/Events';
import CheckIn from './Pages/CheckIn';
import Admin from './Pages/AdminDashboard';
import Feedback from './Pages/Feedback';
import CreateEvent from './Pages/CreateEvent';
import DeleteEvent from './Pages/DeleteEvent';
import Attendance from './Pages/Attendance';
import NotFound from './Pages/NotFound';
import RequireAuth from './components/RequireAuth';
import { UserProvider } from './context/UserContext';
import PageLayout from './components/PageLayout';
import AdminRSVPs from './Pages/AdminRSVPs'; // ✅ NEW

const App: React.FC = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<RequireAuth><PageLayout><Dashboard /></PageLayout></RequireAuth>} />
        <Route path="/events" element={<RequireAuth><PageLayout><Events /></PageLayout></RequireAuth>} />
        <Route path="/checkin" element={<RequireAuth><PageLayout><CheckIn /></PageLayout></RequireAuth>} />
        <Route path="/feedback" element={<RequireAuth><PageLayout><Feedback /></PageLayout></RequireAuth>} />
        <Route path="/attendance" element={<RequireAuth><PageLayout><Attendance /></PageLayout></RequireAuth>} />

        <Route path="/admin" element={<RequireAuth role="admin"><PageLayout><Admin /></PageLayout></RequireAuth>} />
        <Route path="/admin/create" element={<RequireAuth role="admin"><PageLayout><CreateEvent /></PageLayout></RequireAuth>} />
        <Route path="/admin/delete" element={<RequireAuth role="admin"><PageLayout><DeleteEvent /></PageLayout></RequireAuth>} />
        <Route path="/admin/rsvps" element={<RequireAuth role="admin"><PageLayout><AdminRSVPs /></PageLayout></RequireAuth>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserProvider>
  );
};

export default App;