import React, { useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import { QRCodeCanvas } from 'qrcode.react';
import { useNavigate } from 'react-router-dom';

const CheckIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role !== 'student') navigate('/dashboard');
  }, [navigate]);

  return (
    <PageLayout>
      <div className="p-6 text-white flex flex-col items-center">
        <h1 className="text-3xl font-bold text-yellow-400 mb-6">QR Event Check-In</h1>
        <div className="bg-black p-6 border border-yellow-400 rounded-xl flex flex-col items-center">
          <QRCodeCanvas value="http://localhost:3000/checkin/123" size={180} fgColor="#facc15" />
          <p className="mt-4 text-yellow-200">Scan to check in</p>
        </div>
      </div>
    </PageLayout>
  );
};

export default CheckIn;
