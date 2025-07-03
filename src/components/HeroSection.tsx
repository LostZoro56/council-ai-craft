
import React from 'react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="bg-gradient-to-br from-[#012E6C] to-[#72B742] text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h2 className="text-5xl font-bold mb-6 leading-tight">
            Empowering AI Innovation & Collaboration
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed opacity-90">
            Welcome to the AI Council Portal – the central hub for driving responsible and impactful AI initiatives.
          </p>
          <Button 
            onClick={onGetStarted}
            size="lg"
            className="bg-white text-[#012E6C] hover:bg-gray-100 text-lg px-8 py-3 font-semibold transition-all hover:scale-105"
          >
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
