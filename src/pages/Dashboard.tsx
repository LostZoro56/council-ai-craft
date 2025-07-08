
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import AgentLibrary from '@/components/AgentLibrary';
import MyWork from '@/components/MyWork';
import AgentWorkspace from '@/components/AgentWorkspace';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [activeMenuItem, setActiveMenuItem] = useState('agent-library');
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const handleAgentClick = (agentId: string) => {
    setSelectedAgent(agentId);
  };

  const handleBackToLibrary = () => {
    setSelectedAgent(null);
    setActiveMenuItem('agent-library');
  };

  const handleTitleClick = () => {
    if (selectedAgent) {
      handleBackToLibrary();
    } else {
      setActiveMenuItem('agent-library');
    }
  };

  // If an agent is selected, show full workspace
  if (selectedAgent) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar 
          isLoggedIn={true} 
          onLogout={onLogout}
          onTitleClick={handleTitleClick}
        />
        <AgentWorkspace 
          agentId={selectedAgent}
          onBack={handleBackToLibrary}
        />
      </div>
    );
  }

  const renderContent = () => {
    switch (activeMenuItem) {
      case 'agent-library':
        return <AgentLibrary onAgentClick={handleAgentClick} />;
      case 'my-work':
        return <MyWork />;
      default:
        return <AgentLibrary onAgentClick={handleAgentClick} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        isLoggedIn={true} 
        onLogout={onLogout}
        onTitleClick={handleTitleClick}
      />
      
      <div className="flex">
        <Sidebar
          activeItem={activeMenuItem}
          onItemClick={setActiveMenuItem}
        />
        
        <main className="flex-1 min-h-screen">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
