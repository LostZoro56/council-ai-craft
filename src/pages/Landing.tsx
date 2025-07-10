
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeatureCard from '@/components/FeatureCard';
import AgentCard from '@/components/AgentCard';
import AuthPanel from '@/components/AuthPanel';

gsap.registerPlugin(ScrollTrigger);

interface LandingProps {
  onLogin: () => void;
}

const Landing = ({ onLogin }: LandingProps) => {
  const [authPanelOpen, setAuthPanelOpen] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);
  const agentsRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animations
    if (heroRef.current) {
      gsap.fromTo(heroRef.current.querySelector('.hero-title'), 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
      );
      
      gsap.fromTo(heroRef.current.querySelector('.hero-subtitle'), 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power2.out' }
      );
      
      gsap.fromTo(heroRef.current.querySelector('.hero-button'), 
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, delay: 0.6, ease: 'back.out(1.7)' }
      );
    }

    // Features section animation
    if (featuresRef.current) {
      const featureCards = featuresRef.current.querySelectorAll('.feature-card');
      gsap.fromTo(featureCards,
        { opacity: 0, y: 60, scale: 0.8 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // Agents section animation
    if (agentsRef.current) {
      const agentCards = agentsRef.current.querySelectorAll('.agent-card');
      gsap.fromTo(agentCards,
        { opacity: 0, x: -50, rotationY: -15 },
        { 
          opacity: 1, 
          x: 0, 
          rotationY: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: agentsRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const features = [
    {
      title: 'Track AI Use Cases & Impact Metrics',
      description: 'Monitor progress, outcomes, and ROI across AI initiatives with comprehensive analytics and reporting.',
      icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"/><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"/></svg>
    },
    {
      title: 'Collaborate on AI Projects with AI Strike Teams',
      description: 'Engage with a network of professionals across domains to build meaningful solutions together.',
      icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/></svg>
    },
    {
      title: 'Access AI Knowledge Base & Best Practices',
      description: 'Explore curated resources, implementation guides, and proven patterns from industry experts.',
      icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
    },
    {
      title: 'Leverage Ready-to-Use AI Agents',
      description: 'Accelerate delivery using pre-built, customizable AI agents for common business tasks.',
      icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/></svg>
    },
    {
      title: 'Submit & Review AI Use Cases',
      description: 'Share real-world implementations or explore others\' experiences to accelerate collective learning.',
      icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
    },
    {
      title: 'Participate in AI Surveys',
      description: 'Provide valuable feedback through surveys to shape council priorities and track AI adoption trends.',
      icon: <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/></svg>
    }
  ];

  const featuredAgents = [
    {
      id: 'scrum-po-ba',
      title: 'Scrum PO and BA Agent',
      description: 'Enhances raw feature specifications to generate improved specifications and user stories using CrewAI with Product Owner and Business Analyst agents.',
      isAvailable: true
    },
    {
      id: 'deepseek-chat',
      title: 'DeepSeek Chat Assistant',
      description: 'Powered by DeepSeek R3 model deployed on Azure AI Foundry. Multi-agent orchestration with CrewAI for enhanced conversational capabilities.',
      isAvailable: true
    }
  ];

  const handleGetStarted = () => {
    setAuthPanelOpen(true);
  };

  const handleAuthClick = () => {
    setAuthPanelOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar onAuthClick={handleAuthClick} />
      
      <div ref={heroRef}>
        <HeroSection onGetStarted={handleGetStarted} />
      </div>
      
      {/* What We Can Do Section */}
      <section className="py-24 relative" ref={featuresRef}>
        <div className="absolute inset-0 bg-gradient-to-b from-background to-muted/20" />
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-primary mb-6">What We Can Do</h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Comprehensive AI solutions to accelerate your organization's digital transformation journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <FeatureCard
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured AI Agents Section */}
      <section className="py-24 bg-muted/30" ref={agentsRef}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-primary mb-6">Featured AI Agents</h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Explore our suite of AI-powered tools designed to enhance productivity and drive innovation across the organization
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {featuredAgents.map((agent, index) => (
              <div key={agent.id} className="agent-card">
                <AgentCard
                  id={agent.id}
                  title={agent.title}
                  description={agent.description}
                  isAvailable={agent.isAvailable}
                  onClick={() => {
                    setAuthPanelOpen(true);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h3 className="text-3xl font-bold mb-6">About the AI Council</h3>
            <div className="space-y-4 text-lg leading-relaxed text-primary-foreground/80">
              <p>
                The AI Council leads strategic initiatives to harness the power of artificial intelligence, 
                machine learning, and advanced analytics to solve complex business challenges and create value 
                for our customers and stakeholders.
              </p>
              <p>
                Our team of experts collaborates across departments to identify opportunities, develop solutions, 
                and establish best practices for AI adoption within the organization.
              </p>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 pt-8">
            <p className="text-center text-primary-foreground/60 text-lg">
              © 2025 AI Council Portal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      
      <AuthPanel
        isOpen={authPanelOpen}
        onClose={() => setAuthPanelOpen(false)}
        onSuccess={onLogin}
      />
    </div>
  );
};

export default Landing;
