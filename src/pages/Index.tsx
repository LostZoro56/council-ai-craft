
import React, { useState } from 'react';
import Landing from './Landing';
import Dashboard from './Dashboard';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-['Inter',sans-serif]">
      {isLoggedIn ? (
        <Dashboard />
      ) : (
        <Landing onLogin={handleLogin} />
      )}
    </div>
  );
};

export default Index;
