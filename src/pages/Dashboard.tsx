
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import AgentCard from '@/components/AgentCard';
import ChatInterface from '@/components/ChatInterface';

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('ai-agents');
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const agents = [
    {
      id: 'scrum-po-ba',
      title: 'Scrum PO and BA Agent',
      description: 'Enhances raw feature specifications to generate improved specifications and user stories using CrewAI with Product Owner and Business Analyst agents.',
      isAvailable: true
    },
    {
      id: 'deepseek-chat',
      title: 'DeepSeek Chat Assistant',
      description: 'Powered by DeepSeek R3 model deployed on Azure AI Foundry. Multi-agent orchestration with CrewAI for enhanced conversational capabilities.',
      isAvailable: true
    },
    {
      id: 'ai-use-case-analyzer',
      title: 'AI Use Case Analyzer',
      description: 'Analyzes potential AI use cases to estimate ROI, implementation complexity, and resource requirements for strategic decision making.',
      isAvailable: false
    },
    {
      id: 'ai-knowledge-assistant',
      title: 'AI Knowledge Assistant',
      description: 'Access and query the AI Council\'s knowledge base for best practices, implementation guides, and case studies. Leverages RAG architecture to provide contextually relevant information from internal documents.',
      isAvailable: false
    },
    {
      id: 'document-analyzer',
      title: 'Document Analyzer',
      description: 'Extract insights and key information from technical documentation and reports using advanced natural language processing and machine learning techniques.',
      isAvailable: false
    },
    {
      id: 'data-visualization-agent',
      title: 'Data Visualization Agent',
      description: 'Transform complex datasets into interactive visualizations with automated insights and recommendations for data-driven decision making.',
      isAvailable: false
    }
  ];

  const handleAgentClick = (agentId: string) => {
    if (agentId === 'deepseek-chat') {
      setSelectedAgent(agentId);
      setSidebarCollapsed(true); // Auto-collapse but don't hide
    } else if (agentId === 'scrum-po-ba') {
      alert('Scrum PO and BA Agent interface will be available soon!');
    }
  };

  const handleBackToAgents = () => {
    setSelectedAgent(null);
    setSidebarCollapsed(false); // Expand sidebar when going back
  };

  if (selectedAgent === 'deepseek-chat') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar 
          isLoggedIn={true} 
          showSidebarToggle={true}
          onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          sidebarCollapsed={sidebarCollapsed}
        />
        
        <div className="flex">
          <Sidebar
            isCollapsed={sidebarCollapsed}
            activeItem={activeMenuItem}
            onItemClick={setActiveMenuItem}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
          
          <main className="flex-1">
            <ChatInterface onBack={handleBackToAgents} />
          </main>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeMenuItem) {
      case 'ai-agents':
        return (
          <div className="p-8 space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-black text-[#012E6C]">AI Agents</h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Access our suite of AI-powered tools designed to enhance productivity and drive innovation across the organization.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {agents.map((agent) => (
                <div key={agent.id} className="animate-fade-in">
                  <AgentCard
                    id={agent.id}
                    title={agent.title}
                    description={agent.description}
                    isAvailable={agent.isAvailable}
                    onClick={() => handleAgentClick(agent.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'knowledge-base':
        return (
          <div className="p-8 text-center space-y-6">
            <h1 className="text-4xl font-black text-[#012E6C]">Knowledge Base</h1>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-12 shadow-lg max-w-2xl mx-auto">
              <p className="text-lg text-gray-600">Coming soon - Access to curated AI resources and best practices.</p>
            </div>
          </div>
        );
      
      case 'ai-maturity':
        return (
          <div className="p-8 text-center space-y-6">
            <h1 className="text-4xl font-black text-[#012E6C]">AI Maturity Framework</h1>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-12 shadow-lg max-w-2xl mx-auto">
              <p className="text-lg text-gray-600">Coming soon - Assess and track your organization's AI maturity.</p>
            </div>
          </div>
        );
      
      case 'genai-radar':
        return (
          <div className="p-8 text-center space-y-6">
            <h1 className="text-4xl font-black text-[#012E6C]">GenAI Impact Radar</h1>
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-12 shadow-lg max-w-2xl mx-auto">
              <p className="text-lg text-gray-600">Coming soon - Monitor and analyze GenAI impact across the organization.</p>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar 
        isLoggedIn={true} 
        showSidebarToggle={true}
        onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        sidebarCollapsed={sidebarCollapsed}
      />
      
      <div className="flex">
        <Sidebar
          isCollapsed={sidebarCollapsed}
          activeItem={activeMenuItem}
          onItemClick={setActiveMenuItem}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <main className="flex-1 min-h-screen">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
