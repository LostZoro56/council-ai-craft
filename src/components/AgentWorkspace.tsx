import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Send, ArrowLeft, Plus, History } from 'lucide-react';

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
  name: string;
}

interface AgentWorkspaceProps {
  agentId: string;
  sessionId?: string;
  onBack: () => void;
  onSessionsClick?: () => void;
}

const AgentWorkspace = ({ agentId, sessionId, onBack, onSessionsClick }: AgentWorkspaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [qaOutputs, setQaOutputs] = useState<QAOutput[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentQAOutput, setCurrentQAOutput] = useState<QAOutput | null>(null);
  const [selectedOutputId, setSelectedOutputId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  // Load session data if sessionId is provided
  useEffect(() => {
    if (sessionId) {
      // Simulate loading session data
      if (isQAAgent) {
        const mockOutputs: QAOutput[] = [
          {
            id: '1',
            query: 'Test the checkout process',
            response: 'Test Cases for Checkout Process:\n\n1. Verify cart functionality\n2. Test payment gateway integration\n3. Validate order confirmation\n4. Check email notifications\n5. Test error handling for failed payments',
            timestamp: new Date(Date.now() - 3600000),
            name: 'Checkout Process Testing'
          },
          {
            id: '2',
            query: 'API endpoint validation',
            response: 'API Testing Framework:\n\n1. Test all CRUD operations\n2. Validate response formats\n3. Check authentication mechanisms\n4. Test rate limiting\n5. Verify error responses',
            timestamp: new Date(Date.now() - 7200000),
            name: 'API Validation Suite'
          }
        ];
        setQaOutputs(mockOutputs);
        setSelectedOutputId(mockOutputs[0].id);
      }
    }
  }, [sessionId, isQAAgent]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateOutputName = (query: string): string => {
    const words = query.split(' ').slice(0, 3).join(' ');
    return `${words.charAt(0).toUpperCase() + words.slice(1)} Testing`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    if (isQAAgent) {
      const outputName = generateOutputName(input);
      const newOutput: QAOutput = {
        id: Date.now().toString(),
        query: input,
        response: '',
        timestamp: new Date(),
        name: outputName
      };

      setCurrentQAOutput(newOutput);
      setSelectedOutputId(null);
      setInput('');
      setIsLoading(true);

      // Simulate AI response
      setTimeout(() => {
        const response = `Test Cases for: "${newOutput.query}"\n\n1. Verify basic functionality\n2. Test edge cases\n3. Validate error handling\n4. Check performance requirements\n5. Ensure accessibility compliance\n\nDetailed test scenarios:\n• Happy path testing\n• Boundary value analysis\n• Error condition testing\n• Integration testing\n• User acceptance criteria validation`;
        
        const completedOutput = { ...newOutput, response };
        setCurrentQAOutput(completedOutput);
        setQaOutputs(prev => [completedOutput, ...prev]);
        setSelectedOutputId(completedOutput.id);
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

  const handleNewSession = () => {
    setMessages([]);
    setQaOutputs([]);
    setCurrentQAOutput(null);
    setSelectedOutputId(null);
    setInput('');
  };

  const handleOutputClick = (outputId: string) => {
    setSelectedOutputId(outputId);
    setCurrentQAOutput(null);
  };

  const getDisplayedOutput = () => {
    if (currentQAOutput && !currentQAOutput.response && isLoading) {
      return currentQAOutput;
    }
    if (selectedOutputId) {
      return qaOutputs.find(output => output.id === selectedOutputId) || null;
    }
    if (currentQAOutput) {
      return currentQAOutput;
    }
    return null;
  };

  const handleSessionsClick = () => {
    onSessionsClick?.();
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Panel - Input */}
      <div className="w-96 border-r border-border bg-background flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border flex-shrink-0">
          <div className="flex items-center justify-between mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="-ml-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSessionsClick}
                className="flex items-center gap-2"
              >
                <History className="h-4 w-4" />
                Sessions
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNewSession}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                New Session
              </Button>
            </div>
          </div>
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

        {/* QA Agent - Outputs List */}
        {isQAAgent && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="p-4 border-t border-border flex-shrink-0">
              <h3 className="text-sm font-medium text-foreground">Outputs</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto px-4 pb-4">
              <div className="space-y-2">
                {qaOutputs.map((output) => (
                  <Card 
                    key={output.id} 
                    className={`border cursor-pointer transition-all duration-200 hover:shadow-sm ${
                      selectedOutputId === output.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => handleOutputClick(output.id)}
                  >
                    <CardContent className="p-3">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-foreground">{output.name}</h4>
                        <p className="text-xs text-muted-foreground truncate">{output.query}</p>
                        <p className="text-xs text-muted-foreground">
                          {output.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Panel - Responses */}
      <div className="flex-1 flex flex-col bg-muted/30 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-border bg-background flex-shrink-0">
          {isQAAgent ? (
            <div>
              <h3 className="text-sm font-medium text-foreground">Response</h3>
              {getDisplayedOutput() && (
                <p className="text-xs text-muted-foreground mt-1">
                  {selectedOutputId ? 'Viewing: ' : 'Current Output: '}{getDisplayedOutput()?.name}
                </p>
              )}
            </div>
          ) : (
            <h3 className="text-sm font-medium text-foreground">Response</h3>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {isQAAgent ? (
            // QA Agent - Show selected or current output
            getDisplayedOutput() ? (
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="text-xs font-medium text-muted-foreground mb-2">Query:</div>
                  <p className="text-sm text-foreground">{getDisplayedOutput()?.query}</p>
                </div>
                
                <div className="bg-background p-6 rounded-lg border">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs font-medium text-foreground">{currentAgent.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {getDisplayedOutput()?.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                    {getDisplayedOutput()?.response || (isLoading ? 'Generating response...' : 'No response yet')}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground text-sm">Send a message to get started</p>
              </div>
            )
          ) : (
            // Other agents - existing message system
            messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground text-sm">Send a message to get started</p>
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className="space-y-4">
                  {message.isUser && (
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="text-xs font-medium text-muted-foreground mb-2">You asked:</div>
                      <p className="text-sm text-foreground">{message.content}</p>
                    </div>
                  )}
                  {!message.isUser && (
                    <div className="bg-background p-6 rounded-lg border">
                      <div className="flex items-start justify-between mb-3">
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
            )
          )}
          
          {isLoading && !isQAAgent && (
            <div className="bg-background p-6 rounded-lg border">
              <div className="flex items-center space-x-2">
                <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full"></div>
                <span className="text-sm text-muted-foreground">Generating response...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default AgentWorkspace;
