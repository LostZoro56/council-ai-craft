
import React from 'react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with animated gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: '60px 60px'
          }} />
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-20 w-24 h-24 bg-primary-foreground/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-10 w-16 h-16 bg-accent/10 rounded-full blur-lg animate-pulse" style={{ animationDelay: '2s' }} />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-primary-foreground">
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="hero-title text-4xl md:text-6xl font-black leading-tight">
              <span className="bg-gradient-to-r from-primary-foreground to-primary-foreground/80 bg-clip-text text-transparent">
                Empowering AI
              </span>
              <br />
              <span className="bg-gradient-to-r from-accent-foreground to-accent bg-clip-text text-transparent">
                Innovation
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary-foreground to-primary-foreground/80 bg-clip-text text-transparent">
                & Collaboration
              </span>
            </h1>
            <p className="hero-subtitle text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed font-light">
              Welcome to the AI Council Portal – the central hub for driving responsible and impactful AI initiatives across your organization.
            </p>
          </div>
          
          <div className="pt-6">
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="hero-button bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-base px-8 py-4 font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
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
