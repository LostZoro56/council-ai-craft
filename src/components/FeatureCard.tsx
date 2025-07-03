
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  return (
    <Card className="group relative overflow-hidden bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-r from-[#72B742]/5 to-[#012E6C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardContent className="p-6 relative z-10">
        <div className="flex items-center space-x-4">
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 bg-gradient-to-br from-[#72B742] to-[#012E6C] rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              {icon}
            </div>
            <div className="absolute -inset-1 bg-gradient-to-br from-[#72B742] to-[#012E6C] rounded-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 -z-10" />
          </div>
          <div className="flex-1 space-y-2">
            <h3 className="text-lg font-bold text-[#012E6C] dark:text-white group-hover:text-[#72B742] transition-colors duration-300">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
              {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
