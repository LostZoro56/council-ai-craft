
import React, { useState } from 'react';
import { Send, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EnhancedMessage from './EnhancedMessage';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Mock AI response based on keywords
    setTimeout(() => {
      let aiResponse = '';
      const input = inputValue.toLowerCase();

      if (input.includes('diagram') || input.includes('flowchart') || input.includes('sequence')) {
        if (input.includes('flowchart')) {
          aiResponse = `Here's a flowchart diagram for your process:

\`\`\`mermaid
flowchart TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Fix it]
    D --> B
    C --> E[End]
\`\`\`

This flowchart shows a simple decision-making process with a feedback loop.`;
        } else if (input.includes('sequence')) {
          aiResponse = `Here's a sequence diagram showing the interaction:

\`\`\`mermaid
sequenceDiagram
    participant User
    participant App
    participant Database
    
    User->>App: Login Request
    App->>Database: Validate Credentials
    Database-->>App: Validation Result
    App-->>User: Login Response
\`\`\`

This sequence diagram illustrates the login process flow.`;
        } else {
          aiResponse = `Here's a simple diagram:

\`\`\`mermaid
graph LR
    A[Input] --> B[Process]
    B --> C[Output]
    C --> D[Feedback]
    D --> A
\`\`\`

This shows a basic input-process-output cycle with feedback.`;
        }
      } else if (input.includes('code') || input.includes('react') || input.includes('python') || input.includes('javascript')) {
        if (input.includes('react')) {
          aiResponse = `Here's a React component example:

\`\`\`jsx
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Count: {count}</h2>
      <button 
        onClick={() => setCount(count + 1)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Increment
      </button>
    </div>
  );
};

export default Counter;
\`\`\`

This is a simple counter component using React hooks.`;
        } else if (input.includes('python')) {
          aiResponse = `Here's a Python function example:

\`\`\`python
def fibonacci(n):
    """Generate fibonacci sequence up to n terms"""
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

# Usage
print(fibonacci(10))
\`\`\`

This function generates the Fibonacci sequence up to n terms.`;
        } else {
          aiResponse = `Here's a JavaScript example:

\`\`\`javascript
// Array manipulation functions
const numbers = [1, 2, 3, 4, 5];

// Filter even numbers
const evenNumbers = numbers.filter(num => num % 2 === 0);

// Double all numbers
const doubledNumbers = numbers.map(num => num * 2);

// Sum all numbers
const sum = numbers.reduce((acc, num) => acc + num, 0);

console.log('Even numbers:', evenNumbers);
console.log('Doubled:', doubledNumbers);
console.log('Sum:', sum);
\`\`\`

This demonstrates common array operations in JavaScript.`;
        }
      } else {
        aiResponse = `I understand your query: "${inputValue}". This is a mock response from the chat assistant. I can help you with various tasks including creating diagrams and providing code examples.

For diagrams, try asking for:
- "show me a flowchart diagram" 
- "create a sequence diagram"

For code examples:
- "show me React code"
- "write Python code"`;
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);

    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const downloadResponse = (content: string, messageId: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `response-${messageId}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id}>
            {message.type === 'user' ? (
              <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg border-l-4 border-blue-400">
                <div className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-1">Your Query</div>
                <div className="whitespace-pre-wrap">{message.content}</div>
              </div>
            ) : (
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Assistant Response</div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadResponse(message.content, message.id)}
                    className="flex items-center space-x-1"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </Button>
                </div>
                <EnhancedMessage content={message.content} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t p-4 bg-white dark:bg-gray-900">
        <div className="flex space-x-2">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about diagrams, code, or general questions..."
            className="flex-1 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
            rows={3}
          />
          <Button 
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="self-end"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
