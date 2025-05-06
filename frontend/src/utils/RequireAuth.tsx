import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

interface RequireAuthProps {
  children: React.ReactNode;
  role?: string;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children, role }) => {
  const { token, user } = useUser();

  // If there's no token or user info, redirect to login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // If role is required (like "admin") but user doesn't match, redirect to dashboard
  if (role && user.role !== role) {
    return <Navigate to="/dashboard" replace />;
  }

  // Otherwise allow the protected route
  return <>{children}</>;
};

export default RequireAuth;
