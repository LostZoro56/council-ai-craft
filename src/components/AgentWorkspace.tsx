
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Send, ArrowLeft } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface AgentWorkspaceProps {
  agentId: string;
  onBack: () => void;
}

const AgentWorkspace = ({ agentId, onBack }: AgentWorkspaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const agentInfo = {
    'general-web-research': {
      title: 'General web research',
      subtitle: 'Conduct tailored web research using agents',
      placeholder: 'What would you like me to research?'
    },
    'chart-analysis': {
      title: 'Chart analysis',
      subtitle: 'Analyze and interpret various chart types and data',
      placeholder: 'Upload a chart or describe what you want to analyze...'
    },
    // Add more agent configurations as needed
  };

  const currentAgent = agentInfo[agentId as keyof typeof agentInfo] || agentInfo['general-web-research'];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I'll help you with "${input}". This is a simulated response for the ${currentAgent.title} agent. In a real implementation, this would connect to the actual AI service.`,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      {/* Left Panel - Input */}
      <div className="w-96 border-r border-border bg-background flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="mb-2 -ml-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h2 className="text-lg font-semibold text-foreground">{currentAgent.title}</h2>
          <p className="text-sm text-muted-foreground">{currentAgent.subtitle}</p>
        </div>

        {/* Input Area */}
        <div className="flex-1 p-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Your request</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={currentAgent.placeholder}
                className="w-full mt-2 p-3 border border-border rounded-md resize-none h-32 text-sm bg-background"
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="w-full"
            >
              <Send className="h-4 w-4 mr-2" />
              {isLoading ? 'Processing...' : 'Send'}
            </Button>
          </div>
        </div>
      </div>

      {/* Right Panel - Responses */}
      <div className="flex-1 flex flex-col bg-muted/30">
        {/* Header */}
        <div className="p-4 border-b border-border bg-background">
          <h3 className="text-sm font-medium text-foreground">Response</h3>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground text-sm">Send a message to get started</p>
            </div>
          ) : (
            messages.map((message) => (
              <Card key={message.id} className={`${message.isUser ? 'ml-12' : 'mr-12'}`}>
                <CardContent className="p-3">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-medium text-foreground">
                      {message.isUser ? 'You' : currentAgent.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{message.content}</p>
                </CardContent>
              </Card>
            ))
          )}
          
          {isLoading && (
            <Card className="mr-12">
              <CardContent className="p-3">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Generating response...</span>
                </div>
              </CardContent>
            </Card>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default AgentWorkspace;
