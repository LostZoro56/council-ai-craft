
import React from 'react';
import { Button } from '@/components/ui/button';
import { Library, Briefcase } from 'lucide-react';

interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

const Sidebar = ({ activeItem, onItemClick }: SidebarProps) => {
  const menuItems = [
    { id: 'agent-library', label: 'Agent Library', icon: Library },
    { id: 'my-work', label: 'My Work', icon: Briefcase },
  ];

  return (
    <div className="w-64 border-r border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">      
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeItem === item.id ? "default" : "ghost"}
              onClick={() => onItemClick(item.id)}
              className={`w-full justify-start text-sm font-medium ${
                activeItem === item.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              }`}
            >
              <IconComponent className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
