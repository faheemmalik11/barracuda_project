import React, { useState } from 'react';
import { Button } from '@shared/components/ui/button';
import { Input } from '@shared/components/ui/input';
import { Label } from '@shared/components/ui/label';
import { Card, CardContent } from '@shared/components/ui/card';
import { CreditCard, Shield, Zap, Key } from 'lucide-react';
import { useAuthStore } from '@features/auth/hooks/useAuthStore';

interface PartnerLoginPageProps {
  partnerParam: string;
}

export function PartnerLoginPage({ partnerParam }: PartnerLoginPageProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { login, isLoading, error } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(formData.email, formData.password);
  };

  const handleGoogleSignIn = () => {
    console.log('Google sign-in clicked');
  };

  const handlePasskeySignIn = () => {
    console.log('Passkey sign-in clicked');
  };

  return (
    <div className="min-h-screen flex">
      <div
        className="w-1/2 relative overflow-hidden"
        style={{ backgroundColor: partnerParam === "revolut" ? "#007AFF" : "#7B2CBF" }}
      >
        <div className="relative z-10 flex flex-col justify-between p-12 text-white h-full">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl transform translate-x-32 -translate-y-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl transform -translate-x-16 translate-y-16" />

          <div className="relative z-10">
            {/* Partner logos */}
            <div className="flex items-center gap-4 mb-16">
              <img src="/images/vinr-light.svg" alt="Vinr" className="h-8" />
              <span className="text-2xl font-light opacity-60">×</span>
              <span className="text-2xl font-semibold capitalize">{partnerParam}</span>
            </div>

            {/* Content */}
            <div className="max-w-lg">
              <h1 className="text-4xl font-bold mb-4 leading-tight">
                Vinr × {partnerParam === "revolut" ? "Revolut Business" : "Partner"}
              </h1>
              <p className="text-xl mb-12 opacity-90 leading-relaxed">
                {partnerParam === "revolut"
                  ? "Streamlined billing for your business banking"
                  : "Advanced usage-based billing solutions"}
              </p>

              {/* Features */}
              <div className="space-y-6 mb-16">
                <div className="flex gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-lg">Unified Payments</h3>
                    <p className="text-sm opacity-80 leading-relaxed">
                      Seamlessly integrate billing with your account
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-lg">Bank-Level Security</h3>
                    <p className="text-sm opacity-80 leading-relaxed">
                      Your data is protected by enterprise security
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-lg">Instant Settlements</h3>
                    <p className="text-sm opacity-80 leading-relaxed">Get paid faster with modern payment rails</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust message */}
          <div className="relative z-10">
            <p className="text-sm opacity-80 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Trusted by thousands of businesses worldwide
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-8 bg-gray-50">
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-xl bg-white rounded-2xl">
            <CardContent className="p-8 rounded-2xl">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">Partner Sign In</h2>
              </div>

              {error && (
                <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                    disabled={isLoading}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">OR</span>
                </div>
              </div>

              {/* Social Sign In Buttons */}
              <div className="space-y-3">
                <Button
                  type="button"
                  onClick={handleGoogleSignIn}
                  variant="outline"
                  className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-3"
                  disabled={isLoading}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Sign in with Google
                </Button>

                <Button
                  type="button"
                  onClick={handlePasskeySignIn}
                  variant="outline"
                  className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-3"
                  disabled={isLoading}
                >
                  <Key className="w-5 h-5" />
                  Sign in with Passkey
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
