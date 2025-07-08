
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
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
        content: `I'll help you with "${userMessage.content}". This is a simulated response for the ${currentAgent.title} agent. In a real implementation, this would connect to the actual AI service.`,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Panel - Input (Fixed) */}
      <div className="w-80 border-r border-border bg-background flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="mb-3 -ml-2 text-xs"
          >
            <ArrowLeft className="h-3 w-3 mr-2" />
            Back
          </Button>
          <h2 className="text-lg font-semibold text-foreground">{currentAgent.title}</h2>
          <p className="text-xs text-muted-foreground mt-1">{currentAgent.subtitle}</p>
        </div>

        {/* Input Area (Fixed) */}
        <div className="p-4 flex-shrink-0">
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-foreground">Your request</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={currentAgent.placeholder}
                className="w-full mt-2 p-3 border border-border rounded-md resize-none h-24 text-xs bg-background focus:ring-1 focus:ring-primary focus:border-primary"
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="w-full text-xs"
              size="sm"
            >
              <Send className="h-3 w-3 mr-2" />
              {isLoading ? 'Processing...' : 'Send'}
            </Button>
          </div>
        </div>
      </div>

      {/* Right Panel - Responses (Scrollable) */}
      <div className="flex-1 flex flex-col bg-background">
        {/* Header (Fixed) */}
        <div className="p-4 border-b border-border bg-background flex-shrink-0">
          <h3 className="text-sm font-medium text-foreground">Response</h3>
        </div>

        {/* Messages Area (Scrollable) */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 max-w-4xl">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <p className="text-muted-foreground text-xs">Send a message to get started</p>
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className="space-y-2">
                  {/* Question */}
                  {message.isUser && (
                    <div className="bg-muted/30 rounded-lg p-3 ml-8">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-foreground">You</span>
                        <span className="text-xs text-muted-foreground">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-xs text-foreground leading-relaxed">{message.content}</p>
                    </div>
                  )}
                  
                  {/* Response */}
                  {!message.isUser && (
                    <div className="mr-8">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-foreground">{currentAgent.title}</span>
                        <span className="text-xs text-muted-foreground">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs text-foreground leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
            
            {isLoading && (
              <div className="mr-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-foreground">{currentAgent.title}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="animate-spin w-3 h-3 border border-primary border-t-transparent rounded-full"></div>
                  <span className="text-xs text-muted-foreground">Generating response...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default AgentWorkspace;
