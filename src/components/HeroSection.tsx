
import React from 'react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with animated gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#012E6C] via-[#012E6C]/90 to-[#72B742]">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
            backgroundSize: '60px 60px'
          }} />
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-[#72B742]/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-10 w-24 h-24 bg-[#72B742]/10 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }} />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
        <div className="space-y-8 animate-fade-in">
          <div className="space-y-6">
            <h1 className="text-6xl md:text-7xl font-black leading-tight">
              <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                Empowering AI
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#72B742] to-green-400 bg-clip-text text-transparent">
                Innovation
              </span>
              <br />
              <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                & Collaboration
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed font-light">
              Welcome to the AI Council Portal – the central hub for driving responsible and impactful AI initiatives across your organization.
            </p>
          </div>
          
          <div className="pt-8">
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="bg-white text-[#012E6C] hover:bg-gray-100 text-lg px-12 py-6 font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
            >
              Get Started →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
