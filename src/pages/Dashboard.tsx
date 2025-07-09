
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
  const [selectedAgentFilter, setSelectedAgentFilter] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const handleAgentClick = (agentId: string) => {
    setSelectedAgent(agentId);
    setSessionId(null);
  };

  const handleSessionsClick = (agentId: string) => {
    setSelectedAgentFilter(agentId);
    setActiveMenuItem('my-work');
  };

  const handleContinueSession = (sessionId: string, agentId: string) => {
    setSessionId(sessionId);
    setSelectedAgent(agentId);
  };

  const handleBackToLibrary = () => {
    setSelectedAgent(null);
    setSessionId(null);
    setSelectedAgentFilter(null);
    setActiveMenuItem('agent-library');
  };

  const handleTitleClick = () => {
    if (selectedAgent) {
      handleBackToLibrary();
    } else {
      setActiveMenuItem('agent-library');
      setSelectedAgentFilter(null);
    }
  };

  const handleSidebarItemClick = (item: string) => {
    setActiveMenuItem(item);
    setSelectedAgentFilter(null);
    if (item !== 'my-work') {
      setSelectedAgent(null);
      setSessionId(null);
    }
  };

  // If an agent is selected, show full workspace without page scrolling
  if (selectedAgent) {
    return (
      <div className="h-screen flex flex-col overflow-hidden bg-background">
        <Navbar 
          isLoggedIn={true} 
          onLogout={onLogout}
          onTitleClick={handleTitleClick}
        />
        <AgentWorkspace 
          agentId={selectedAgent}
          sessionId={sessionId}
          onBack={handleBackToLibrary}
        />
      </div>
    );
  }

  const renderContent = () => {
    switch (activeMenuItem) {
      case 'agent-library':
        return (
          <AgentLibrary 
            onAgentClick={handleAgentClick}
            onSessionsClick={handleSessionsClick}
          />
        );
      case 'my-work':
        return (
          <MyWork 
            selectedAgent={selectedAgentFilter}
            onContinueSession={handleContinueSession}
          />
        );
      default:
        return (
          <AgentLibrary 
            onAgentClick={handleAgentClick}
            onSessionsClick={handleSessionsClick}
          />
        );
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
          onItemClick={handleSidebarItemClick}
        />
        
        <main className="flex-1 min-h-screen">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
