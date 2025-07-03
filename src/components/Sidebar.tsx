
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
    <div className={`bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-r border-gray-200/50 dark:border-gray-700/50 shadow-lg transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="p-3 border-b border-gray-200/50 dark:border-gray-700/50">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="w-full justify-start p-2 hover:bg-[#012E6C]/5 dark:hover:bg-white/5 rounded-xl transition-all duration-200"
        >
          <svg className="w-4 h-4 text-[#012E6C] dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          {!isCollapsed && <span className="ml-2 font-medium text-[#012E6C] dark:text-white text-sm">Menu</span>}
        </Button>
      </div>
      
      <nav className="p-3 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeItem === item.id ? "default" : "ghost"}
            onClick={() => onItemClick(item.id)}
            className={`w-full justify-start p-3 rounded-xl transition-all duration-200 text-sm ${
              activeItem === item.id 
                ? 'bg-gradient-to-r from-[#72B742] to-[#72B742]/90 hover:from-[#72B742]/90 hover:to-[#72B742] text-white shadow-lg' 
                : 'text-[#012E6C] dark:text-white hover:bg-[#012E6C]/5 dark:hover:bg-white/5 hover:text-[#72B742]'
            } ${isCollapsed ? 'px-2' : ''}`}
          >
            <span className="text-base flex-shrink-0">{item.icon}</span>
            {!isCollapsed && (
              <span className="ml-2 font-medium text-left">{item.label}</span>
            )}
          </Button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
