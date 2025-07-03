
import React, { useState } from 'react';
import Landing from './Landing';
import Dashboard from './Dashboard';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="font-['Inter',sans-serif]">
      {isLoggedIn ? (
        <Dashboard />
      ) : (
        <Landing onLogin={handleLogin} />
      )}
    </div>
  );
};

export default Index;
