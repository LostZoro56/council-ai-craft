
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Clock, Star, MoreHorizontal, Play, ArrowLeft } from 'lucide-react';

interface MyWorkProps {
  selectedAgent?: string;
  onContinueSession?: (sessionId: string, agentId: string) => void;
}

const MyWork = ({ selectedAgent, onContinueSession }: MyWorkProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewingAgentSessions, setViewingAgentSessions] = useState<string | null>(selectedAgent || null);

  // Agent data with session counts
  const agents = [
    {
      id: 'scrum-po-ba',
      name: 'Scrum PO and BA Agent',
      icon: '📋',
      sessionCount: 3,
      lastUsed: '2 hours ago'
    },
    {
      id: 'chat-assistant', 
      name: 'Chat Assistant',
      icon: '💬',
      sessionCount: 5,
      lastUsed: '1 day ago'
    },
    {
      id: 'qa-tester',
      name: 'QA Tester Agent',
      icon: '🧪',
      sessionCount: 4,
      lastUsed: '3 hours ago'
    },
    {
      id: 'general-web-research',
      name: 'General web research',
      icon: '📄',
      sessionCount: 2,
      lastUsed: '1 week ago'
    },
    {
      id: 'chart-analysis',
      name: 'Chart analysis',
      icon: '📊',
      sessionCount: 1,
      lastUsed: '2 days ago'
    }
  ];

  const sessions = [
    {
      id: '1',
      agentId: 'general-web-research',
      agentName: 'General web research',
      sessionName: 'AI Platforms Research',
      lastModified: '2 hours ago',
      isFavorite: false,
      preview: 'AI platforms that integrate multiple agents...'
    },
    {
      id: '2',
      agentId: 'chart-analysis',
      agentName: 'Chart analysis',
      sessionName: 'Sales Data Analysis',
      lastModified: '1 day ago',
      isFavorite: true,
      preview: 'Q4 sales performance shows...'
    },
    {
      id: '3',
      agentId: 'qa-tester',
      agentName: 'QA Tester Agent',
      sessionName: 'E-commerce Testing Suite',
      lastModified: '2 days ago',
      isFavorite: false,
      preview: 'Test cases for checkout process...'
    },
    {
      id: '4',
      agentId: 'scrum-po-ba',
      agentName: 'Scrum PO and BA Agent',
      sessionName: 'User Story Enhancement',
      lastModified: '3 days ago',
      isFavorite: false,
      preview: 'Enhanced user stories for mobile app...'
    },
    {
      id: '5',
      agentId: 'qa-tester',
      agentName: 'QA Tester Agent',
      sessionName: 'API Testing Framework',
      lastModified: '1 week ago',
      isFavorite: true,
      preview: 'Comprehensive API test coverage...'
    },
    {
      id: '6',
      agentId: 'scrum-po-ba',
      agentName: 'Scrum PO and BA Agent',
      sessionName: 'Feature Requirements Analysis',
      lastModified: '4 days ago',
      isFavorite: false,
      preview: 'Detailed requirements for new dashboard...'
    },
    {
      id: '7',
      agentId: 'scrum-po-ba',
      agentName: 'Scrum PO and BA Agent',
      sessionName: 'Sprint Planning Session',
      lastModified: '5 days ago',
      isFavorite: false,
      preview: 'Sprint goals and user story breakdown...'
    },
    {
      id: '8',
      agentId: 'qa-tester',
      agentName: 'QA Tester Agent',
      sessionName: 'Mobile App Testing',
      lastModified: '6 days ago',
      isFavorite: false,
      preview: 'iOS and Android compatibility tests...'
    },
    {
      id: '9',
      agentId: 'qa-tester',
      agentName: 'QA Tester Agent',
      sessionName: 'Performance Testing Suite',
      lastModified: '1 week ago',
      isFavorite: true,
      preview: 'Load testing and performance metrics...'
    }
  ];

  const handleContinueSession = (sessionId: string, agentId: string) => {
    onContinueSession?.(sessionId, agentId);
  };

  const handleAgentClick = (agentId: string) => {
    setViewingAgentSessions(agentId);
  };

  const handleBackToAgents = () => {
    setViewingAgentSessions(null);
  };

  // Filter agents or sessions based on search term
  let filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  let filteredSessions = sessions.filter(session =>
    session.sessionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.agentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // If viewing specific agent sessions, filter sessions for that agent
  if (viewingAgentSessions) {
    filteredSessions = filteredSessions.filter(session => session.agentId === viewingAgentSessions);
  }

  const currentAgent = viewingAgentSessions ? agents.find(agent => agent.id === viewingAgentSessions) : null;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {viewingAgentSessions && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToAgents}
                className="-ml-2"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}
            <h1 className="text-2xl font-semibold text-foreground">
              {viewingAgentSessions ? `${currentAgent?.name} Sessions` : 'My Work'}
            </h1>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={viewingAgentSessions ? "Search sessions..." : "Search agents..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-6 border-b border-border">
          <button className="pb-2 text-sm font-medium text-foreground border-b-2 border-primary">
            {viewingAgentSessions ? 'Sessions' : 'Agents'}
          </button>
          <button className="pb-2 text-sm font-medium text-muted-foreground hover:text-foreground">
            Docs
          </button>
          <button className="pb-2 text-sm font-medium text-muted-foreground hover:text-foreground">
            Favorites
          </button>
        </div>
      </div>

      {/* Content */}
      {viewingAgentSessions ? (
        /* Sessions List */
        <div className="space-y-3">
          {filteredSessions.map((session) => (
            <Card key={session.id} className="cursor-pointer hover:shadow-md transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-medium text-foreground">{session.sessionName}</h3>
                      {session.isFavorite && <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{session.preview}</p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{session.lastModified}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleContinueSession(session.id, session.agentId)}
                      className="h-8 text-xs"
                    >
                      <Play className="h-3 w-3 mr-1" />
                      Continue Session
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Agents List */
        <div className="space-y-3">
          {filteredAgents.map((agent) => (
            <Card key={agent.id} className="cursor-pointer hover:shadow-md transition-all duration-200" onClick={() => handleAgentClick(agent.id)}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-lg">
                      {agent.icon}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium text-foreground">{agent.name}</h3>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>{agent.sessionCount} sessions</span>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{agent.lastUsed}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyWork;
