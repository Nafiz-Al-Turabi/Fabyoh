import React, { useEffect, useState } from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const [time, setTime] = useState(new Date());
  const routeError = useRouteError();

  const errorDetails = (() => {
    if (!routeError) {
      return null;
    }

    if (isRouteErrorResponse(routeError)) {
      return {
        title: `${routeError.status}`,
        message: routeError.statusText || 'Route error',
      };
    }

    if (routeError instanceof Error) {
      return {
        title: 'App Error',
        message: routeError.message,
      };
    }

    return {
      title: 'App Error',
      message: 'An unexpected render error occurred.',
    };
  })();

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
      <h1 className="text-6xl font-bold text-red-600 mb-4">{errorDetails?.title || '404'}</h1>
      <p className="text-2xl text-gray-700 mb-8">
        {errorDetails?.message || "Oops! The page you're looking for doesn't exist."}
      </p>
      <p className="text-xl text-gray-600 mb-4">But here's the current time:</p>

      <div className="digital-watch">
        <div className="time">{time.toLocaleTimeString()}</div>
        <div className="date">{formatDate(time)}</div>
      </div>
    </div>
  );
};

export default NotFound;
