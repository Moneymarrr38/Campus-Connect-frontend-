import React from 'react';
import PageLayout from '../components/PageLayout';

const StudentDashboard = () => {
  return (
    <PageLayout>
      <div className="p-6 text-white">
        <h1 className="text-3xl font-bold text-yellow-400 mb-4">Student Dashboard</h1>
        <p>Welcome, student! Here are your upcoming events and announcements.</p>
      </div>
    </PageLayout>
  );
};

export default StudentDashboard; // ✅ this must be present
