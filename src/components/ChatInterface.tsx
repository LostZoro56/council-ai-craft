import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import EnhancedMessage from './EnhancedMessage';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
}

interface ChatInterfaceProps {
  onBack: () => void;
}

const ChatInterface = ({ onBack }: ChatInterfaceProps) => {
  const [sessions, setSessions] = useState<ChatSession[]>([
    { id: '1', title: 'New Chat', messages: [] }
  ]);
  const [currentSessionId, setCurrentSessionId] = useState('1');
  const [input, setInput] = useState('');
  const [selectedModel, setSelectedModel] = useState('deepseek-r1');
  const [chatPanelCollapsed, setChatPanelCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentSession = sessions.find(s => s.id === currentSessionId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentSession?.messages]);

  const getMockResponse = (userInput: string, model: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('diagram') && (input.includes('flowchart') || input.includes('flow'))) {
      return `Here's a flowchart diagram for your request:

\`\`\`mermaid
flowchart TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> E[Fix Issue]
    E --> B
    C --> F[End]
\`\`\`

This flowchart shows a basic debugging process. You can toggle between the visual diagram and the code, zoom in/out, and download it as SVG or PNG.`;
    }
    
    if (input.includes('diagram') && input.includes('sequence')) {
      return `Here's a sequence diagram showing user authentication:

\`\`\`mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Database
    
    User->>Frontend: Login Request
    Frontend->>Backend: Validate Credentials
    Backend->>Database: Check User
    Database-->>Backend: User Data
    Backend-->>Frontend: JWT Token
    Frontend-->>User: Login Success
\`\`\`

This sequence diagram illustrates the authentication flow in a typical web application.`;
    }
    
    if (input.includes('code') && (input.includes('react') || input.includes('component'))) {
      return `Here's a React component example:

\`\`\`javascript
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prev => prev + 1);
  };

  const decrement = () => {
    setCount(prev => prev - 1);
  };

  return (
    <div className="counter">
      <h2>Counter: {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
};

export default Counter;
\`\`\`

This is a simple React counter component with increment and decrement functionality.`;
    }
    
    if (input.includes('code') && input.includes('python')) {
      return `Here's a Python example:

\`\`\`python
def fibonacci(n):
    """Generate Fibonacci sequence up to n terms."""
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    elif n == 2:
        return [0, 1]
    
    sequence = [0, 1]
    for i in range(2, n):
        sequence.append(sequence[i-1] + sequence[i-2])
    
    return sequence

# Example usage
result = fibonacci(10)
print(f"First 10 Fibonacci numbers: {result}")
\`\`\`

This function generates the Fibonacci sequence up to n terms with proper error handling.`;
    }

    return `I'm DeepSeek Chat Assistant powered by ${model}. I've received your message: "${userInput}". 

Try asking me to create a diagram (like "show me a flowchart diagram" or "create a sequence diagram") or ask for code examples (like "show me React code" or "write Python code") to see the enhanced rendering capabilities!

This is a simulated response for demonstration purposes.`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
      timestamp: new Date()
    };

    setSessions(prev => prev.map(session => 
      session.id === currentSessionId 
        ? { ...session, messages: [...session.messages, userMessage] }
        : session
    ));

    const currentInput = input;
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getMockResponse(currentInput, selectedModel),
        isUser: false,
        timestamp: new Date()
      };

      setSessions(prev => prev.map(session => 
        session.id === currentSessionId 
          ? { ...session, messages: [...session.messages, aiMessage] }
          : session
      ));
      setIsLoading(false);
    }, 1500);
  };

  const createNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: `Chat ${sessions.length + 1}`,
      messages: []
    };
    setSessions(prev => [...prev, newSession]);
    setCurrentSessionId(newSession.id);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Chat Sidebar */}
      <div className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${chatPanelCollapsed ? 'w-16' : 'w-64'}`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setChatPanelCollapsed(!chatPanelCollapsed)}
              className="p-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </Button>
            {!chatPanelCollapsed && (
              <Button
                onClick={createNewChat}
                size="sm"
                className="bg-[#72B742] hover:bg-[#72B742]/90 text-white"
              >
                New Chat
              </Button>
            )}
          </div>
          
          {!chatPanelCollapsed && (
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grok-3">Grok-3</SelectItem>
                <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                <SelectItem value="deepseek-r1">DeepSeek-R1</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        {!chatPanelCollapsed && (
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">Chat History</h3>
            <div className="space-y-2">
              {sessions.map((session) => (
                <Button
                  key={session.id}
                  variant={currentSessionId === session.id ? "default" : "ghost"}
                  onClick={() => setCurrentSessionId(session.id)}
                  className={`w-full justify-start text-left p-2 ${
                    currentSessionId === session.id 
                      ? 'bg-[#72B742] hover:bg-[#72B742]/90 text-white' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="truncate">{session.title}</span>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold text-[#012E6C] dark:text-white">DeepSeek Chat Assistant</h2>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Model: {selectedModel}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
          {currentSession?.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-3xl p-4 rounded-lg ${
                  message.isUser
                    ? 'bg-[#72B742] text-white'
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100'
                }`}
              >
                {message.isUser ? (
                  <p className="leading-relaxed">{message.content}</p>
                ) : (
                  <EnhancedMessage content={message.content} />
                )}
                <div className={`text-xs mt-2 ${message.isUser ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'}`}>
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin w-4 h-4 border-2 border-[#72B742] border-t-transparent rounded-full"></div>
                  <span className="text-gray-500 dark:text-gray-400">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex space-x-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="bg-[#72B742] hover:bg-[#72B742]/90 text-white"
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
