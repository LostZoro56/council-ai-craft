
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
      className={`group relative overflow-hidden transition-all duration-500 border-0 h-44 ${
        isAvailable 
          ? 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 cursor-pointer' 
          : 'bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-sm shadow-md cursor-not-allowed'
      }`}
      onClick={isAvailable ? onClick : undefined}
    >
      {/* Background gradient overlay */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${
        isAvailable 
          ? 'bg-gradient-to-r from-[#72B742]/10 to-[#012E6C]/10 opacity-0 group-hover:opacity-100' 
          : 'bg-gray-200/30 dark:bg-gray-700/30'
      }`} />

      <CardContent className="p-5 relative z-10 h-full flex flex-col">
        <div className="flex-1 space-y-2">
          <h3 className={`text-sm font-bold transition-colors duration-300 leading-tight ${
            isAvailable 
              ? 'text-[#012E6C] dark:text-white group-hover:text-[#72B742]' 
              : 'text-gray-400'
          }`}>
            {title}
          </h3>
          <p className={`leading-relaxed text-xs line-clamp-4 ${
            isAvailable ? 'text-gray-600 dark:text-gray-300' : 'text-gray-400'
          }`}>
            {description}
          </p>
        </div>
        
        {/* Fixed button container */}
        <div className="mt-4 pt-3 flex justify-end">
          {isAvailable ? (
            <Button 
              className="bg-gradient-to-r from-[#72B742] to-[#72B742]/90 hover:from-[#72B742]/90 hover:to-[#72B742] text-white font-medium py-1.5 px-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-xs"
            >
              Launch →
            </Button>
          ) : (
            <Button 
              disabled
              className="bg-gray-200 dark:bg-gray-700 text-gray-400 py-1.5 px-3 rounded-lg cursor-not-allowed text-xs"
            >
              Coming Soon
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentCard;
