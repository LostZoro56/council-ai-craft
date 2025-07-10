
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  return (
    <Card className="group cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 bg-card border border-border">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 w-8 h-8 bg-muted rounded-lg flex items-center justify-center text-lg text-primary">
            {icon}
          </div>
          <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
