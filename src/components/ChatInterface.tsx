
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

  // Mock data for different types of responses
  const mockResponses = {
    flowchart: `Here's a flowchart diagram showing a typical user authentication process:

\`\`\`mermaid
flowchart TD
    A[User Login Request] --> B{Valid Credentials?}
    B -->|Yes| C[Generate JWT Token]
    B -->|No| D[Show Error Message]
    C --> E[Set Session Cookie]
    E --> F[Redirect to Dashboard]
    D --> G[Return to Login Page]
    F --> H[Access Protected Resources]
    G --> A
\`\`\`

This flowchart illustrates the complete authentication flow from initial login attempt to accessing protected resources.`,

    sequence: `Here's a sequence diagram showing API communication flow:

\`\`\`mermaid
sequenceDiagram
    participant Client
    participant API Gateway
    participant Auth Service
    participant Database
    participant Cache
    
    Client->>API Gateway: POST /api/login
    API Gateway->>Auth Service: Validate credentials
    Auth Service->>Database: Query user data
    Database-->>Auth Service: User record
    Auth Service->>Cache: Store session
    Cache-->>Auth Service: Session stored
    Auth Service-->>API Gateway: JWT token
    API Gateway-->>Client: Login successful
    
    Note over Client,Cache: User now authenticated
    
    Client->>API Gateway: GET /api/profile
    API Gateway->>Auth Service: Verify token
    Auth Service->>Cache: Check session
    Cache-->>Auth Service: Session valid
    Auth Service-->>API Gateway: Token valid
    API Gateway-->>Client: Profile data
\`\`\`

This sequence diagram demonstrates the interaction between different services during user authentication and subsequent API calls.`,

    database: `Here's a database schema diagram for an e-commerce system:

\`\`\`mermaid
erDiagram
    CUSTOMER {
        int customer_id PK
        string email UK
        string first_name
        string last_name
        string phone
        datetime created_at
        boolean is_active
    }
    
    ORDER {
        int order_id PK
        int customer_id FK
        decimal total_amount
        string status
        datetime order_date
        string shipping_address
    }
    
    PRODUCT {
        int product_id PK
        string name
        text description
        decimal price
        int stock_quantity
        string category
        boolean is_active
    }
    
    ORDER_ITEM {
        int order_item_id PK
        int order_id FK
        int product_id FK
        int quantity
        decimal unit_price
    }
    
    CUSTOMER ||--o{ ORDER : places
    ORDER ||--o{ ORDER_ITEM : contains
    PRODUCT ||--o{ ORDER_ITEM : "included in"
\`\`\`

This entity relationship diagram shows the core structure of an e-commerce database with customers, orders, products, and order items.`,

    reactCode: `Here's a complete React component with hooks and state management:

\`\`\`jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const UserProfileManager = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/user/profile');
        const userData = await response.json();
        setUser(userData);
        setFormData({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          email: userData.email || '',
          phone: userData.phone || ''
        });
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Handle form input changes
  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  // Save profile changes
  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setEditing(false);
        // Show success toast
        console.log('Profile updated successfully');
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !user) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">First Name</label>
          <Input
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            disabled={!editing}
            placeholder="Enter first name"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Last Name</label>
          <Input
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            disabled={!editing}
            placeholder="Enter last name"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            disabled={!editing}
            placeholder="Enter email address"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Phone</label>
          <Input
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            disabled={!editing}
            placeholder="Enter phone number"
          />
        </div>

        <div className="flex space-x-2 pt-4">
          {editing ? (
            <>
              <Button 
                onClick={handleSave} 
                disabled={loading}
                className="flex-1"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setEditing(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button 
              onClick={() => setEditing(true)}
              className="w-full"
            >
              Edit Profile
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileManager;
\`\`\`

This React component demonstrates modern React patterns including hooks, state management, form handling, and API integration with proper error handling and loading states.`,

    pythonCode: `Here's a Python class for handling user authentication with JWT tokens:

\`\`\`python
import jwt
import bcrypt
import datetime
from typing import Optional, Dict, Any
from dataclasses import dataclass

@dataclass
class User:
    id: int
    email: str
    first_name: str
    last_name: str
    is_active: bool = True
    created_at: datetime.datetime = None

class AuthenticationService:
    def __init__(self, secret_key: str, algorithm: str = 'HS256'):
        self.secret_key = secret_key
        self.algorithm = algorithm
        self.token_expiry_hours = 24

    def hash_password(self, password: str) -> str:
        """Hash a password using bcrypt"""
        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
        return hashed.decode('utf-8')

    def verify_password(self, password: str, hashed_password: str) -> bool:
        """Verify a password against its hash"""
        return bcrypt.checkpw(
            password.encode('utf-8'), 
            hashed_password.encode('utf-8')
        )

    def generate_token(self, user: User) -> str:
        """Generate JWT token for authenticated user"""
        payload = {
            'user_id': user.id,
            'email': user.email,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(
                hours=self.token_expiry_hours
            ),
            'iat': datetime.datetime.utcnow()
        }
        
        token = jwt.encode(payload, self.secret_key, algorithm=self.algorithm)
        return token

    def verify_token(self, token: str) -> Optional[Dict[str, Any]]:
        """Verify and decode JWT token"""
        try:
            payload = jwt.decode(
                token, 
                self.secret_key, 
                algorithms=[self.algorithm]
            )
            return payload
        except jwt.ExpiredSignatureError:
            raise Exception("Token has expired")
        except jwt.InvalidTokenError:
            raise Exception("Invalid token")

    def authenticate_user(self, email: str, password: str, 
                         get_user_func) -> Optional[str]:
        """Authenticate user and return JWT token"""
        # Get user from database
        user = get_user_func(email)
        if not user:
            return None

        # Verify password
        if not self.verify_password(password, user.hashed_password):
            return None

        # Check if user is active
        if not user.is_active:
            raise Exception("User account is disabled")

        # Generate and return token
        return self.generate_token(user)

    def refresh_token(self, old_token: str) -> Optional[str]:
        """Refresh an existing token"""
        try:
            payload = self.verify_token(old_token)
            
            # Create new token with extended expiry
            new_payload = {
                'user_id': payload['user_id'],
                'email': payload['email'],
                'exp': datetime.datetime.utcnow() + datetime.timedelta(
                    hours=self.token_expiry_hours
                ),
                'iat': datetime.datetime.utcnow()
            }
            
            return jwt.encode(new_payload, self.secret_key, algorithm=self.algorithm)
        except Exception:
            return None

# Usage example
if __name__ == "__main__":
    auth_service = AuthenticationService("your-secret-key")
    
    # Hash a password
    hashed = auth_service.hash_password("secure_password123")
    print(f"Hashed password: {hashed}")
    
    # Verify password
    is_valid = auth_service.verify_password("secure_password123", hashed)
    print(f"Password verification: {is_valid}")
\`\`\`

This Python authentication service provides comprehensive user authentication functionality with JWT tokens, password hashing, and token management.`,

    nodeCode: `Here's a Node.js Express API with middleware and error handling:

\`\`\`javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Request logging middleware
app.use((req, res, next) => {
  console.log(\`\${new Date().toISOString()} - \${req.method} \${req.path}\`);
  next();
});

// Mock database
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' }
];

// Validation middleware
const validateUser = [
  body('name').trim().isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email').isEmail().normalizeEmail()
    .withMessage('Must be a valid email address'),
  body('role').isIn(['admin', 'user', 'moderator'])
    .withMessage('Role must be admin, user, or moderator')
];

// Error handling middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// Routes
app.get('/api/users', (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    
    let filteredUsers = users;
    if (search) {
      filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: paginatedUsers,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(filteredUsers.length / limit),
        totalUsers: filteredUsers.length,
        hasNext: endIndex < filteredUsers.length,
        hasPrev: startIndex > 0
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

app.get('/api/users/:id', (req, res) => {
  try {
    const { id } = req.params;
    const user = users.find(u => u.id === parseInt(id));
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

app.post('/api/users', validateUser, handleValidationErrors, (req, res) => {
  try {
    const { name, email, role } = req.body;
    
    // Check if email already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already exists'
      });
    }
    
    const newUser = {
      id: Math.max(...users.map(u => u.id)) + 1,
      name,
      email,
      role
    };
    
    users.push(newUser);
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
  console.log(\`Environment: \${process.env.NODE_ENV || 'development'}\`);
});

module.exports = app;
\`\`\`

This Express.js API includes comprehensive middleware setup, validation, error handling, pagination, and RESTful endpoints with proper HTTP status codes and response formatting.`
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Enhanced AI response logic with mock data
    setTimeout(() => {
      let aiResponse = '';
      const input = inputValue.toLowerCase();

      // Diagram triggers
      if (input.includes('flowchart') || input.includes('flow chart') || input.includes('process flow')) {
        aiResponse = mockResponses.flowchart;
      } else if (input.includes('sequence') || input.includes('api flow') || input.includes('communication')) {
        aiResponse = mockResponses.sequence;
      } else if (input.includes('database') || input.includes('schema') || input.includes('er diagram') || input.includes('entity')) {
        aiResponse = mockResponses.database;
      } 
      // Code triggers
      else if (input.includes('react') || input.includes('component') || input.includes('jsx')) {
        aiResponse = mockResponses.reactCode;
      } else if (input.includes('python') || input.includes('authentication') || input.includes('jwt')) {
        aiResponse = mockResponses.pythonCode;
      } else if (input.includes('node') || input.includes('express') || input.includes('api') || input.includes('backend')) {
        aiResponse = mockResponses.nodeCode;
      }
      // General triggers for mixed content
      else if (input.includes('diagram')) {
        aiResponse = `I can help you create various types of diagrams. Here's a simple system architecture diagram:

\`\`\`mermaid
graph TB
    A[Frontend App] --> B[API Gateway]
    B --> C[Authentication Service]
    B --> D[User Service]
    B --> E[Order Service]
    C --> F[(Auth Database)]
    D --> G[(User Database)]
    E --> H[(Order Database)]
    
    I[Load Balancer] --> A
    J[CDN] --> A
    
    style A fill:#e1f5fe
    style B fill:#f3e5f5
    style C fill:#e8f5e8
    style D fill:#e8f5e8
    style E fill:#e8f5e8
\`\`\`

This diagram shows a typical microservices architecture with separate services for different business domains.`;
      } else if (input.includes('code')) {
        aiResponse = `Here's a utility function for handling API responses with TypeScript:

\`\`\`typescript
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get('content-type');
    
    let data: any;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      throw new Error(data.message || \`HTTP error! status: \${response.status}\`);
    }

    return data;
  }

  async get<T>(endpoint: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    const response = await fetch(\`\${this.baseURL}\${endpoint}\`, {
      method: 'GET',
      headers: { ...this.defaultHeaders, ...headers },
    });

    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, body?: any, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    const response = await fetch(\`\${this.baseURL}\${endpoint}\`, {
      method: 'POST',
      headers: { ...this.defaultHeaders, ...headers },
      body: JSON.stringify(body),
    });

    return this.handleResponse<T>(response);
  }
}

// Usage
const api = new ApiClient('https://api.example.com');

const fetchUsers = async () => {
  try {
    const response = await api.get<User[]>('/users');
    if (response.success) {
      console.log('Users:', response.data);
    }
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};
\`\`\`

This TypeScript API client provides a clean interface for making HTTP requests with proper error handling and type safety.`;
      } else {
        aiResponse = `I understand your query: "${inputValue}". I can help you with various tasks including:

**For diagrams, try asking:**
- "show me a flowchart for user authentication"
- "create a sequence diagram for API communication" 
- "generate a database schema diagram"

**For code examples:**
- "show me React component code"
- "write Python authentication code"
- "create Node.js API endpoints"

I can generate interactive diagrams with zoom controls and syntax-highlighted code blocks with copy functionality. What would you like me to help you with?`;
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
            placeholder="Try asking: 'show me a flowchart diagram', 'create React component code', 'generate database schema', or 'write Python authentication code'..."
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
