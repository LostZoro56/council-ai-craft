
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
      className={`group relative overflow-hidden transition-all duration-500 border-0 h-48 ${
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
      
      {/* Status indicator */}
      <div className="absolute top-4 right-4 z-20">
        {isAvailable ? (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-[#72B742] rounded-full animate-pulse shadow-lg"></div>
            <span className="text-xs font-medium text-[#72B742] bg-[#72B742]/10 px-2 py-1 rounded-full">
              Available
            </span>
          </div>
        ) : (
          <span className="text-xs font-medium text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
            Coming Soon
          </span>
        )}
      </div>

      <CardContent className="p-6 relative z-10 h-full flex flex-col justify-between">
        <div className="space-y-3">
          <h3 className={`text-base font-bold transition-colors duration-300 leading-tight ${
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
        
        <div className="flex justify-end mt-4">
          {isAvailable ? (
            <Button 
              className="bg-gradient-to-r from-[#72B742] to-[#72B742]/90 hover:from-[#72B742]/90 hover:to-[#72B742] text-white font-medium py-2 px-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-xs"
            >
              Launch →
            </Button>
          ) : (
            <Button 
              disabled
              className="bg-gray-200 dark:bg-gray-700 text-gray-400 py-2 px-3 rounded-xl cursor-not-allowed text-xs"
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
