
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

interface QAOutput {
  id: string;
  query: string;
  response: string;
  timestamp: Date;
}

interface AgentWorkspaceProps {
  agentId: string;
  onBack: () => void;
}

const AgentWorkspace = ({ agentId, onBack }: AgentWorkspaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [qaOutputs, setQaOutputs] = useState<QAOutput[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const qaOutputsEndRef = useRef<HTMLDivElement>(null);

  const agentInfo = {
    'scrum-po-ba': {
      title: 'Scrum PO and BA Agent',
      subtitle: 'Enhanced feature specifications and user story generation',
      placeholder: 'Describe your feature requirements or user story needs...'
    },
    'chat-assistant': {
      title: 'Chat Assistant',
      subtitle: 'AI-powered conversational assistance',
      placeholder: 'Ask me anything or describe what you need help with...'
    },
    'qa-tester': {
      title: 'QA Tester Agent',
      subtitle: 'Automated testing and quality assurance',
      placeholder: 'Describe the feature or functionality you want to test...'
    },
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
  };

  const currentAgent = agentInfo[agentId as keyof typeof agentInfo] || agentInfo['general-web-research'];
  const isQAAgent = agentId === 'qa-tester';

  const scrollToBottom = () => {
    if (isQAAgent) {
      qaOutputsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, qaOutputs]);

  const handleSend = async () => {
    if (!input.trim()) return;

    if (isQAAgent) {
      // For QA Agent, add to outputs instead of messages
      const newOutput: QAOutput = {
        id: Date.now().toString(),
        query: input,
        response: '', // Will be filled when response comes
        timestamp: new Date()
      };

      setQaOutputs(prev => [...prev, newOutput]);
      setInput('');
      setIsLoading(true);

      // Simulate AI response
      setTimeout(() => {
        const response = `Test Cases for: "${input}"\n\n1. Verify basic functionality\n2. Test edge cases\n3. Validate error handling\n4. Check performance requirements\n5. Ensure accessibility compliance\n\nThis is a simulated QA response that would include detailed test scenarios, expected results, and testing procedures.`;
        
        setQaOutputs(prev => prev.map(output => 
          output.id === newOutput.id 
            ? { ...output, response }
            : output
        ));
        setIsLoading(false);
      }, 1500);
    } else {
      // For other agents, use the message system
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
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Panel - Input */}
      <div className="w-96 border-r border-border bg-background flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border flex-shrink-0">
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
        <div className="p-4 flex-shrink-0">
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

        {/* QA Agent - Outputs Section */}
        {isQAAgent && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="p-4 border-t border-border flex-shrink-0">
              <h3 className="text-sm font-medium text-foreground">Outputs</h3>
            </div>
            
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              {qaOutputs.map((output) => (
                <Card key={output.id} className="border border-border">
                  <CardContent className="p-3 max-h-48 overflow-y-auto">
                    <div className="mb-2">
                      <div className="text-xs font-medium text-muted-foreground mb-1">Query:</div>
                      <div className="text-sm text-foreground mb-3 p-2 bg-muted rounded">{output.query}</div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-muted-foreground mb-1">Response:</div>
                      <div className="text-sm text-foreground whitespace-pre-wrap">
                        {output.response || (isLoading ? 'Generating response...' : 'No response yet')}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <div ref={qaOutputsEndRef} />
            </div>
          </div>
        )}
      </div>

      {/* Right Panel - Responses (for non-QA agents) */}
      {!isQAAgent && (
        <div className="flex-1 flex flex-col bg-muted/30 overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-border bg-background flex-shrink-0">
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
                <div key={message.id} className="space-y-2">
                  {message.isUser && (
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <div className="text-xs font-medium text-muted-foreground mb-1">You asked:</div>
                      <p className="text-sm text-foreground">{message.content}</p>
                    </div>
                  )}
                  {!message.isUser && (
                    <div className="bg-background p-4 rounded-lg border">
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-xs font-medium text-foreground">{currentAgent.title}</span>
                        <span className="text-xs text-muted-foreground">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    </div>
                  )}
                </div>
              ))
            )}
            
            {isLoading && !isQAAgent && (
              <div className="bg-background p-4 rounded-lg border">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Generating response...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentWorkspace;
