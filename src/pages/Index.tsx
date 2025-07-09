
import React, { useState } from 'react';
import Landing from './Landing';
import Dashboard from './Dashboard';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 font-['Inter',sans-serif]">
      {isLoggedIn ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <Landing />
      )}
    </div>
  );
};

export default Index;
