// src/context/UserContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  email: string;
  role: string;
}

interface UserContextType {
  user: User | null;
  token: string | null;
  login: (token: string, role: string, email: string) => void;
  logout: () => void;
  role: string | null;
}

const UserContext = createContext<UserContextType>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  role: null,
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');
    const storedEmail = localStorage.getItem('userEmail');
    if (storedToken && storedRole && storedEmail) {
      setToken(storedToken);
      setRole(storedRole);
      setUser({ email: storedEmail, role: storedRole });
    }
  }, []);

  const login = (newToken: string, role: string, email: string) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('role', role);
    localStorage.setItem('userEmail', email);
    setToken(newToken);
    setRole(role);
    setUser({ email, role });
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, token, role, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
