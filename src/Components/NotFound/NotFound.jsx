import React, { useEffect, useState } from 'react';
import './NotFound.css';

const NotFound = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer); 
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-2xl text-gray-700 mb-8">Oops! The page you're looking for doesn't exist.</p>
      <p className="text-xl text-gray-600 mb-4">But here's the current time:</p>

      <div className="digital-watch">
        <div className="time">{time.toLocaleTimeString()}</div>
        <div className="date">{formatDate(time)}</div>
      </div>
    </div>
  );
};

export default NotFound;
