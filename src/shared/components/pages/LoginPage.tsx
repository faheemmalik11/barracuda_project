import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LoginForm } from '@shared/components/auth/LoginForm';
import { RegistrationForm } from '@shared/components/auth/RegistrationForm';
import { PartnerLoginPage } from '@shared/components/auth/PartnerLoginPage';

export function LoginPage() {
  const [searchParams] = useSearchParams();
  const partnerParam = searchParams.get("partner");
  const isPartnerMode = !!partnerParam;
  const [showRegister, setShowRegister] = useState(false);

  // Partner login layout
  if (isPartnerMode) {
    return <PartnerLoginPage partnerParam={partnerParam!} />;
  }

  // Regular login layout
  return (
    <div className="min-h-screen relative overflow-hidden gradient-flow">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 gradient-overlay opacity-30"></div>
      
      {/* Floating accent elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 gradient-accent rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 gradient-accent rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        {/* Main frame container */}
        <div className="relative w-full max-w-md">
          {/* Logo positioned at top left of frame */}
          <div className="absolute -top-16 -left-4 z-20">
            <img src="/images/vinr-light.svg" alt="Vinr" className="h-8" />
          </div>

          {/* Login/Register Card with frame */}
          <div className="glass-card rounded-2xl shadow-xl p-8">
            {showRegister ? (
              <RegistrationForm onShowLogin={() => setShowRegister(false)} />
            ) : (
              <LoginForm onShowRegister={() => setShowRegister(true)} />
            )}
          </div>

          {/* Trade Market Info positioned at bottom right of frame */}
          <div className="absolute -bottom-16 -right-4 text-right">
            <div className="text-white/80 text-xs">
              <div className="mb-1">Trade on the go</div>
              <div className="text-white/60">Download our mobile app</div>
            </div>
          </div>

          {/* Privacy & Terms positioned at bottom left of frame */}
          <div className="absolute -bottom-16 -left-4">
            <div className="flex items-center space-x-4 text-xs text-white/80">
              <span>© Vinr</span>
              <a href="#" className="hover:text-white transition-colors">
                Privacy & terms
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
