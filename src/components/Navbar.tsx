
import React from 'react';
import { Button } from '@/components/ui/button';
import UserMenu from '@/components/UserMenu';
import ThemeToggle from '@/components/ThemeToggle';
import { User } from 'lucide-react';

interface NavbarProps {
  isLoggedIn?: boolean;
  onSignIn?: () => void;
  onSignUp?: () => void;
  onLogout?: () => void;
  showSidebarToggle?: boolean;
  onSidebarToggle?: () => void;
  sidebarCollapsed?: boolean;
  onTitleClick?: () => void;
  onAuthClick?: () => void;
}

const Navbar = ({ 
  isLoggedIn = false, 
  onSignIn, 
  onSignUp, 
  onLogout,
  showSidebarToggle = false,
  onSidebarToggle,
  sidebarCollapsed = false,
  onTitleClick,
  onAuthClick
}: NavbarProps) => {
  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            {showSidebarToggle && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onSidebarToggle}
                className="p-2 hover:bg-[#012E6C]/5 dark:hover:bg-white/5 rounded-xl transition-all duration-200"
              >
                <svg className="w-4 h-4 text-[#012E6C] dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarCollapsed ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </Button>
            )}
            <h1 
              className="text-xl font-black text-[#012E6C] dark:text-white cursor-pointer hover:text-[#72B742] dark:hover:text-[#72B742] transition-colors duration-300"
              onClick={onTitleClick}
            >
              AI Council Portal
            </h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            
            {isLoggedIn ? (
              <UserMenu onLogout={onLogout || (() => {})} />
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={onAuthClick}
                className="p-2 hover:bg-[#012E6C]/5 dark:hover:bg-white/5 rounded-full transition-all duration-200"
              >
                <User className="w-5 h-5 text-[#012E6C] dark:text-white" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
