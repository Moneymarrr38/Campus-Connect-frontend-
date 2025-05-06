import React, { useEffect, useState } from 'react';
import PageLayout from '../components/PageLayout';
import { ClipboardList } from 'lucide-react';

interface AttendanceRecord {
  student: string;
  event: string;
  status: string;
}

const Attendance: React.FC = () => {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    // Replace this with real backend fetch later
    setRecords([
      {
        student: 'john.doe@uncp.edu',
        event: 'Finals Study Night',
        status: 'Present',
      },
      {
        student: 'jane.smith@uncp.edu',
        event: 'Career Fair',
        status: 'Absent',
      },
    ]);
  }, []);

  return (
    <PageLayout>
      <div className="p-6 text-white">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">Attendance</h1>

        <div className="border border-yellow-400 bg-black rounded-xl p-6">
          <h2 className="flex items-center text-2xl font-semibold mb-4">
            <ClipboardList className="w-6 h-6 mr-2 text-yellow-400" />
            Attendance Records
          </h2>

          {records.length > 0 ? (
            records.map((record, index) => (
              <div
                key={index}
                className="bg-[#1e1e2d] p-4 mb-3 rounded border border-yellow-500"
              >
                <p>
                  <span className="font-bold text-yellow-300">Student:</span>{' '}
                  {record.student}
                </p>
                <p>
                  <span className="font-bold text-yellow-300">Event:</span>{' '}
                  {record.event}
                </p>
                <p>
                  <span className="font-bold text-yellow-300">Status:</span>{' '}
                  {record.status}
                </p>
              </div>
            ))
          ) : (
            <p className="text-yellow-200">No attendance records found.</p>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Attendance;
