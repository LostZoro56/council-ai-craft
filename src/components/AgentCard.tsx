
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AgentCardProps {
  id: string;
  title: string;
  description: string;
  isAvailable: boolean;
  onClick?: () => void;
}

const AgentCard = ({ id, title, description, isAvailable, onClick }: AgentCardProps) => {
  return (
    <Card 
      className={`h-full transition-all duration-300 border-2 ${
        isAvailable 
          ? 'hover:shadow-lg hover:scale-105 border-gray-100 hover:border-[#72B742]/30 cursor-pointer' 
          : 'opacity-60 blur-[1px] border-gray-200 cursor-not-allowed'
      }`}
      onClick={isAvailable ? onClick : undefined}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#012E6C] mb-2">{title}</h3>
          {isAvailable && (
            <div className="w-3 h-3 bg-[#72B742] rounded-full animate-pulse"></div>
          )}
        </div>
        <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
        <div className="flex justify-end">
          {isAvailable ? (
            <Button 
              size="sm" 
              className="bg-[#72B742] hover:bg-[#72B742]/90 text-white"
            >
              Launch →
            </Button>
          ) : (
            <span className="text-sm text-gray-400 italic">Coming Soon</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentCard;
