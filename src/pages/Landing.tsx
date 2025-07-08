import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AgentCard } from '@/components/AgentCard';
import { Layout } from '@/components/Layout';
import AuthModal from '@/components/AuthModal';
import { Sparkles } from 'lucide-react';

const Landing = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const handleSignIn = () => {
    setAuthMode('signin');
    setIsAuthOpen(true);
  };

  const handleSignUp = () => {
    setAuthMode('signup');
    setIsAuthOpen(true);
  };

  const handleCloseAuth = () => {
    setIsAuthOpen(false);
  };

  const handleAgentClick = (agentId: string) => {
    console.log('Agent clicked:', agentId);
  };

  const agents = [
    {
      id: 'general-web-research',
      title: 'General web research',
      icon: '🔍',
      description: 'Conduct tailored web research using agents',
      onClick: () => handleAgentClick('general-web-research')
    },
    {
      id: 'chart-analysis',
      title: 'Chart analysis',
      icon: '📊',
      description: 'Analyze and interpret various chart types and data',
      onClick: () => handleAgentClick('chart-analysis')
    },
    {
      id: 'data-processing',
      title: 'Data processing',
      icon: '⚙️',
      description: 'Process and transform data efficiently',
      onClick: () => handleAgentClick('data-processing')
    }
  ];

  return (
    <Layout>
      <AuthModal
        open={isAuthOpen}
        mode={authMode}
        onClose={handleCloseAuth}
      />
      <section className="pt-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Unleash the power of AI agents <Sparkles className="inline-block h-6 w-6 ml-2 align-middle" />
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Automate tasks, conduct research, and analyze data with ease.
                  Choose from a variety of specialized AI agents to streamline
                  your workflow.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                <Button size="lg" onClick={handleSignIn}>
                  Sign In
                </Button>
                <Button variant="outline" size="lg" onClick={handleSignUp}>
                  Sign Up
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="/hero.png"
                alt="Hero"
                className="w-full max-w-md rounded-md shadow-lg"
                height="300"
                width="500"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight mb-4">
            Explore Our Agents
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map((agent) => (
              <AgentCard
                key={agent.id}
                id={agent.id}
                title={agent.title}
                icon={agent.icon}
                description={agent.description}
                onClick={agent.onClick}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-12 mb-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Ready to get started?
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Sign up to access the full suite of AI agents and start
                  automating your tasks today.
                </p>
              </div>
              <Button size="lg" onClick={handleSignUp}>
                Sign Up
              </Button>
            </div>
            <div className="flex justify-center">
              <img
                src="/robots.png"
                alt="Robots"
                className="w-full max-w-md rounded-md shadow-lg"
                height="300"
                width="500"
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Landing;
