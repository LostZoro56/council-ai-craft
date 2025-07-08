
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
  onTitleClick?: () => void;
  onAuthClick?: () => void;
}

const Navbar = ({ 
  isLoggedIn = false, 
  onSignIn, 
  onSignUp, 
  onLogout,
  onTitleClick,
  onAuthClick
}: NavbarProps) => {
  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b border-border">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <h1 
            className="text-lg font-semibold text-foreground cursor-pointer hover:text-primary transition-colors duration-200"
            onClick={onTitleClick}
          >
            AI Council Portal
          </h1>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeToggle />
          
          {isLoggedIn ? (
            <UserMenu onLogout={onLogout || (() => {})} />
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={onAuthClick}
              className="h-8 w-8 px-0"
            >
              <User className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
