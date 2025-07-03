
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
      className={`group relative overflow-hidden transition-all duration-500 border-0 ${
        isAvailable 
          ? 'bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-2 cursor-pointer' 
          : 'bg-gray-50/50 backdrop-blur-sm shadow-md cursor-not-allowed'
      }`}
      onClick={isAvailable ? onClick : undefined}
    >
      {/* Background gradient overlay */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${
        isAvailable 
          ? 'bg-gradient-to-br from-[#72B742]/10 to-[#012E6C]/10 opacity-0 group-hover:opacity-100' 
          : 'bg-gray-200/30'
      }`} />
      
      {/* Status indicator */}
      <div className="absolute top-4 right-4 z-20">
        {isAvailable ? (
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#72B742] rounded-full animate-pulse shadow-lg"></div>
            <span className="text-xs font-medium text-[#72B742] bg-[#72B742]/10 px-2 py-1 rounded-full">
              Available
            </span>
          </div>
        ) : (
          <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded-full">
            Coming Soon
          </span>
        )}
      </div>

      <CardContent className="p-8 relative z-10">
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className={`text-xl font-bold transition-colors duration-300 ${
              isAvailable 
                ? 'text-[#012E6C] group-hover:text-[#72B742]' 
                : 'text-gray-400'
            }`}>
              {title}
            </h3>
            <p className={`leading-relaxed text-sm ${
              isAvailable ? 'text-gray-600' : 'text-gray-400'
            }`}>
              {description}
            </p>
          </div>
          
          <div className="pt-4 border-t border-gray-100">
            {isAvailable ? (
              <Button 
                className="w-full bg-gradient-to-r from-[#72B742] to-[#72B742]/90 hover:from-[#72B742]/90 hover:to-[#72B742] text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Launch Agent →
              </Button>
            ) : (
              <Button 
                disabled
                className="w-full bg-gray-200 text-gray-400 py-3 rounded-xl cursor-not-allowed"
              >
                Coming Soon
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentCard;
