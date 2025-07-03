
import React from 'react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isCollapsed: boolean;
  activeItem: string;
  onItemClick: (item: string) => void;
  onToggle: () => void;
}

const Sidebar = ({ isCollapsed, activeItem, onItemClick, onToggle }: SidebarProps) => {
  const menuItems = [
    { id: 'ai-agents', label: 'AI Agents', icon: '🤖' },
    { id: 'knowledge-base', label: 'Knowledge Base', icon: '📚' },
    { id: 'ai-maturity', label: 'AI Maturity Framework', icon: '📊' },
    { id: 'genai-radar', label: 'GenAI Impact Radar', icon: '📡' },
  ];

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 border-b border-gray-200">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="w-full justify-start p-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          {!isCollapsed && <span className="ml-2">Menu</span>}
        </Button>
      </div>
      
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeItem === item.id ? "default" : "ghost"}
            onClick={() => onItemClick(item.id)}
            className={`w-full justify-start p-3 ${
              activeItem === item.id 
                ? 'bg-[#72B742] hover:bg-[#72B742]/90 text-white' 
                : 'text-[#012E6C] hover:bg-[#012E6C]/10'
            }`}
          >
            <span className="text-lg mr-3">{item.icon}</span>
            {!isCollapsed && <span>{item.label}</span>}
          </Button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
