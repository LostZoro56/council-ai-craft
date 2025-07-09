
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AgentCard from '@/components/AgentCard';
import { Search, Plus } from 'lucide-react';

interface AgentLibraryProps {
  onAgentClick: (agentId: string) => void;
  onSessionsClick?: (agentId: string) => void;
}

const AgentLibrary = ({ onAgentClick, onSessionsClick }: AgentLibraryProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const agents = [
    {
      id: 'scrum-po-ba',
      title: 'Scrum PO and BA Agent',
      icon: '📋',
      description: 'Generate improved specifications and user stories with Product Owner and Business Analyst agents.',
      isAvailable: true
    },
    {
      id: 'chat-assistant',
      title: 'Chat Assistant',
      icon: '💬',
      description: 'AI-powered conversational assistance with multi-agent orchestration capabilities.',
      isAvailable: true
    },
    {
      id: 'qa-tester',
      title: 'QA Tester Agent',
      icon: '🧪',
      description: 'Generate test cases, perform quality assurance, and provide testing documentation.',
      isAvailable: true
    },
    {
      id: 'general-web-research',
      title: 'General web research',
      icon: '📄',
      description: 'Conduct tailored web research using agents'
    },
    {
      id: 'recaps-builder',
      title: 'Recaps builder',
      icon: '🎙️',
      description: 'Create comprehensive meeting recaps and summaries'
    },
    {
      id: 'chart-analysis',
      title: 'Chart analysis',
      icon: '📊',
      description: 'Analyze and interpret various chart types and data'
    },
    {
      id: 'meeting-notes',
      title: 'Meeting notes summary & action items',
      icon: '📝',
      description: 'Extract key points and action items from meetings'
    },
    {
      id: 'image-analysis',
      title: 'Image analysis',
      icon: '📷',
      description: 'Analyze and describe images with AI insights'
    },
    {
      id: 'handwritten-documents',
      title: 'Handwritten documents to text',
      icon: '✍️',
      description: 'Convert handwritten notes to digital text'
    },
    {
      id: 'ask-writer',
      title: 'Ask WRITER',
      icon: '💭',
      description: 'Get help with writing tasks and content creation'
    },
    {
      id: 'blog-builder',
      title: 'Blog builder',
      icon: '📰',
      description: 'Create engaging blog posts and articles'
    },
    {
      id: 'call-transcript',
      title: 'Call transcript summary',
      icon: '📞',
      description: 'Summarize and analyze call transcripts'
    },
    {
      id: 'easy-summary',
      title: 'Easy summary',
      icon: '📋',
      description: 'Quickly summarize any content or document'
    }
  ];

  const filteredAgents = agents.filter(agent =>
    agent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Agents</h1>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Session
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search agents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-6 border-b border-border">
          <button className="pb-2 text-sm font-medium text-foreground border-b-2 border-primary">
            Recommended
          </button>
          <button className="pb-2 text-sm font-medium text-muted-foreground hover:text-foreground">
            Favorites
          </button>
          <button className="pb-2 text-sm font-medium text-muted-foreground hover:text-foreground">
            Shortcuts
          </button>
        </div>
      </div>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredAgents.map((agent) => (
          <AgentCard
            key={agent.id}
            id={agent.id}
            title={agent.title}
            icon={agent.icon}
            description={agent.description}
            isAvailable={agent.isAvailable}
            onClick={() => onAgentClick(agent.id)}
            onSessionsClick={onSessionsClick}
          />
        ))}
      </div>
    </div>
  );
};

export default AgentLibrary;
