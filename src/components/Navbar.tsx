
import React from 'react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  isLoggedIn?: boolean;
  onSignIn?: () => void;
  onSignUp?: () => void;
  showSidebarToggle?: boolean;
  onSidebarToggle?: () => void;
  sidebarCollapsed?: boolean;
}

const Navbar = ({ 
  isLoggedIn = false, 
  onSignIn, 
  onSignUp, 
  showSidebarToggle = false,
  onSidebarToggle,
  sidebarCollapsed = false
}: NavbarProps) => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            {showSidebarToggle && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onSidebarToggle}
                className="p-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            )}
            <h1 className="text-xl font-bold text-[#012E6C] cursor-pointer hover:opacity-80 transition-opacity">
              AI Council Portal
            </h1>
          </div>
          
          {!isLoggedIn && (
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={onSignIn}
                className="text-[#012E6C] hover:bg-[#012E6C]/10"
              >
                Sign In
              </Button>
              <Button 
                onClick={onSignUp}
                className="bg-[#72B742] hover:bg-[#72B742]/90 text-white"
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
