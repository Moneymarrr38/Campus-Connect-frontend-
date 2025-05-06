import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

interface RequireAuthProps {
  children: React.ReactNode;
  role?: string;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children, role }) => {
  const { token, user } = useUser();

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
