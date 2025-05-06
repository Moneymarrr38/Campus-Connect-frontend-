import React from 'react';
import NavBar from './NavBar';

const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white">
      <NavBar />
      <main className="px-4">{children}</main>
    </div>
  );
};

export default PageLayout;
