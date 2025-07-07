
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

interface AuthPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AuthPanel = ({ isOpen, onClose, onSuccess }: AuthPanelProps) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate authentication
    setTimeout(() => {
      onSuccess();
      onClose();
    }, 1000);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Password reset link sent to your email!');
    setShowForgotPassword(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Background overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Sliding panel */}
      <div className={`fixed left-0 top-0 h-full w-96 bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-[#012E6C] dark:text-white">
              {showForgotPassword ? 'Reset Password' : mode === 'signin' ? 'Sign In' : 'Sign Up'}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {showForgotPassword ? (
              <form onSubmit={handleForgotPassword} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="reset-email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address
                  </Label>
                  <Input
                    id="reset-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="h-11"
                    required
                  />
                </div>
                
                <div className="space-y-4">
                  <Button 
                    type="submit" 
                    className="w-full h-11 bg-[#72B742] hover:bg-[#72B742]/90 text-white font-medium"
                  >
                    Send Reset Link
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowForgotPassword(false)}
                    className="w-full h-11"
                  >
                    Back to Sign In
                  </Button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="h-11"
                    required
                  />
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="h-11"
                    required
                  />
                </div>
                
                {mode === 'signup' && (
                  <div className="space-y-3">
                    <Label htmlFor="confirm-password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Confirm Password
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      className="h-11"
                      required
                    />
                  </div>
                )}
                
                <Button 
                  type="submit" 
                  className="w-full h-11 bg-[#72B742] hover:bg-[#72B742]/90 text-white font-medium"
                >
                  {mode === 'signin' ? 'Sign In' : 'Sign Up'}
                </Button>
                
                {mode === 'signin' && (
                  <Button 
                    type="button" 
                    variant="link" 
                    onClick={() => setShowForgotPassword(true)}
                    className="w-full text-[#012E6C] dark:text-[#72B742] hover:no-underline"
                  >
                    Forgot Password?
                  </Button>
                )}
              </form>
            )}
          </div>

          {/* Footer */}
          {!showForgotPassword && (
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center space-y-3">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {mode === 'signin' ? "Don't have an account?" : "Already have an account?"}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                  className="w-full h-11"
                >
                  {mode === 'signin' ? 'Create Account' : 'Sign In Instead'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthPanel;
