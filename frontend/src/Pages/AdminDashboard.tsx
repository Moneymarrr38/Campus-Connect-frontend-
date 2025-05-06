import React, { useEffect, useState } from 'react';
import { ClipboardList } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useUser();
  const [attendance, setAttendance] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setAttendance([
      {
        student: 'john.doe@uncp.edu',
        event: 'Finals Study Night',
        status: 'Present'
      },
    ]);
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">Welcome, {user?.email || 'Admin'}!</h1>

      <button
        onClick={() => navigate('/admin/create')}
        className="mb-6 px-4 py-2 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-500"
      >
        + Create New Event
      </button>

      <div className="border border-yellow-400 bg-black rounded-xl p-6">
        <h2 className="flex items-center text-2xl font-semibold mb-4">
          <ClipboardList className="w-6 h-6 mr-2 text-yellow-400" /> Attendance Records
        </h2>
        {attendance.map((record, i) => (
          <div key={i} className="bg-[#1e1e2d] p-4 mb-3 rounded border border-yellow-500">
            <p><span className="font-bold text-yellow-300">Student:</span> {record.student}</p>
            <p><span className="font-bold text-yellow-300">Event:</span> {record.event}</p>
            <p><span className="font-bold text-yellow-300">Status:</span> {record.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
