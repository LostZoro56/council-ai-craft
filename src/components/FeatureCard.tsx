
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-gray-100 hover:border-[#72B742]/30">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#72B742] to-[#012E6C] rounded-lg flex items-center justify-center text-white mr-4">
            {icon}
          </div>
          <h3 className="text-lg font-semibold text-[#012E6C]">{title}</h3>
        </div>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
