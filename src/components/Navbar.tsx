
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
    <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-4">
            {showSidebarToggle && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onSidebarToggle}
                className="p-3 hover:bg-[#012E6C]/5 rounded-xl transition-all duration-200"
              >
                <svg className="w-5 h-5 text-[#012E6C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarCollapsed ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </Button>
            )}
            <h1 className="text-2xl font-black text-[#012E6C] cursor-pointer hover:text-[#72B742] transition-colors duration-300">
              AI Council Portal
            </h1>
          </div>
          
          {!isLoggedIn && (
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={onSignIn}
                className="text-[#012E6C] hover:bg-[#012E6C]/5 font-semibold px-6 py-3 rounded-xl transition-all duration-200"
              >
                Sign In
              </Button>
              <Button 
                onClick={onSignUp}
                className="bg-gradient-to-r from-[#72B742] to-[#72B742]/90 hover:from-[#72B742]/90 hover:to-[#72B742] text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
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
