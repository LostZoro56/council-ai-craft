
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeatureCard from '@/components/FeatureCard';
import AgentCard from '@/components/AgentCard';
import AuthModal from '@/components/AuthModal';

interface LandingProps {
  onLogin: () => void;
}

const Landing = ({ onLogin }: LandingProps) => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const features = [
    {
      title: 'Track AI Use Cases & Impact Metrics',
      description: 'Monitor progress, outcomes, and ROI across AI initiatives.',
      icon: '📊'
    },
    {
      title: 'Collaborate on AI Projects with AI Strike Teams',
      description: 'Engage with a network of professionals across domains to build meaningful solutions.',
      icon: '🤝'
    },
    {
      title: 'Access AI Knowledge Base & Best Practices',
      description: 'Explore curated resources, implementation guides, and proven patterns.',
      icon: '📚'
    },
    {
      title: 'Leverage Ready-to-Use AI Agents',
      description: 'Accelerate delivery using pre-built, customizable AI agents for common tasks.',
      icon: '🤖'
    },
    {
      title: 'Submit & Review AI Use Cases',
      description: 'Share real-world implementations or explore others\' experiences to accelerate collective learning.',
      icon: '💡'
    },
    {
      title: 'Participate in AI Surveys',
      description: 'Provide valuable feedback through surveys to shape council priorities and track AI adoption trends.',
      icon: '📋'
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
    setAuthMode('signup');
    setAuthModalOpen(true);
  };

  const handleSignIn = () => {
    setAuthMode('signin');
    setAuthModalOpen(true);
  };

  const handleSignUp = () => {
    setAuthMode('signup');
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        onSignIn={handleSignIn}
        onSignUp={handleSignUp}
      />
      
      <HeroSection onGetStarted={handleGetStarted} />
      
      {/* What We Can Do Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#012E6C] mb-6">What We Can Do</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive AI solutions to accelerate your organization's digital transformation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <FeatureCard
                  title={feature.title}
                  description={feature.description}
                  icon={<span className="text-2xl">{feature.icon}</span>}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured AI Agents Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#012E6C] mb-6">Featured AI Agents</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our suite of AI-powered tools designed to enhance productivity and drive innovation across the organization
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {featuredAgents.map((agent, index) => (
              <div key={agent.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <AgentCard
                  id={agent.id}
                  title={agent.title}
                  description={agent.description}
                  isAvailable={agent.isAvailable}
                  onClick={() => {
                    setAuthMode('signin');
                    setAuthModalOpen(true);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-[#012E6C] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">About the AI Council</h3>
            <p className="text-lg leading-relaxed max-w-4xl text-gray-200">
              The AI Council leads strategic initiatives to harness the power of artificial intelligence, 
              machine learning, and advanced analytics to solve complex business challenges and create value 
              for our customers and stakeholders.
            </p>
            <p className="text-lg leading-relaxed max-w-4xl mt-4 text-gray-200">
              Our team of experts collaborates across departments to identify opportunities, develop solutions, 
              and establish best practices for AI adoption within the organization.
            </p>
          </div>
          
          <div className="border-t border-gray-600 pt-8">
            <p className="text-center text-gray-300">
              © 2025 AI Council Portal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
        onSuccess={onLogin}
      />
    </div>
  );
};

export default Landing;
