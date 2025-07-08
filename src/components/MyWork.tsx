
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Clock, Star, MoreHorizontal } from 'lucide-react';

const MyWork = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const sessions = [
    {
      id: '1',
      agentName: 'General web research',
      sessionName: 'AI Platforms Research',
      lastModified: '2 hours ago',
      isFavorite: false,
      preview: 'AI platforms that integrate multiple agents...'
    },
    {
      id: '2',
      agentName: 'Chart analysis',
      sessionName: 'Sales Data Analysis',
      lastModified: '1 day ago',
      isFavorite: true,
      preview: 'Q4 sales performance shows...'
    },
    {
      id: '3',
      agentName: 'Meeting notes',
      sessionName: 'Weekly Standup Summary',
      lastModified: '3 days ago',
      isFavorite: false,
      preview: 'Action items from team meeting...'
    }
  ];

  const filteredSessions = sessions.filter(session =>
    session.sessionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.agentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold text-foreground">My Work</h1>
        
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search sessions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-6 border-b border-border">
          <button className="pb-2 text-sm font-medium text-foreground border-b-2 border-primary">
            Sessions
          </button>
          <button className="pb-2 text-sm font-medium text-muted-foreground hover:text-foreground">
            Docs
          </button>
          <button className="pb-2 text-sm font-medium text-muted-foreground hover:text-foreground">
            Agents
          </button>
        </div>
      </div>

      {/* Sessions List */}
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
                  <p className="text-xs text-muted-foreground">{session.agentName}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{session.preview}</p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{session.lastModified}</span>
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
    </div>
  );
};

export default MyWork;
