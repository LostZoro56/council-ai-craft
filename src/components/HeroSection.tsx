
import React from 'react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/20 to-muted/40">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-10 w-24 h-24 bg-primary/8 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="space-y-8">
          <div className="space-y-6">
            <h1 className="hero-title text-5xl md:text-7xl font-black leading-tight text-foreground">
              <span className="block">
                Empowering AI
              </span>
              <span className="block text-primary mt-2">
                Innovation
              </span>
              <span className="block mt-2">
                & Collaboration
              </span>
            </h1>
            <p className="hero-subtitle text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium">
              Welcome to the AI Council Portal – the central hub for driving responsible and impactful AI initiatives across your organization.
            </p>
          </div>
          
          <div className="pt-8">
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="hero-button bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-10 py-6 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
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
