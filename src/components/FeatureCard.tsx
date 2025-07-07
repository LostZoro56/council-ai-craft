
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  return (
    <Card className="group relative overflow-hidden bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 h-32">
      <div className="absolute inset-0 bg-gradient-to-r from-[#72B742]/5 to-[#012E6C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardContent className="p-4 relative z-10 h-full">
        <div className="flex items-start space-x-4 h-full">
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-[#72B742] to-[#012E6C] rounded-lg flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <div className="scale-75">
                {icon}
              </div>
            </div>
            <div className="absolute -inset-0.5 bg-gradient-to-br from-[#72B742] to-[#012E6C] rounded-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300 -z-10" />
          </div>
          <div className="flex-1 space-y-1.5 min-w-0">
            <h3 className="text-sm font-bold text-[#012E6C] dark:text-white group-hover:text-[#72B742] transition-colors duration-300 leading-tight">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-xs line-clamp-3">
              {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
