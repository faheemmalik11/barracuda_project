import { Badge, Star, Shield, Zap, Smartphone, CheckCircle, Users, TrendingUp, Lock } from "lucide-react";
import { Z_INDEX_CLASSES } from "@shared/lib/z-index";

export function MarketingPanel() {
    return (
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 p-8 lg:p-12 flex-col justify-between relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-300 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-purple-200 rounded-full blur-2xl"></div>
        </div>
  
        <div className={`relative ${Z_INDEX_CLASSES.TABLE_STICKY} text-white`}>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <div className="w-5 h-5 bg-purple-600 rounded"></div>
            </div>
            <span className="font-bold text-2xl">SecureAuth</span>
          </div>
  
          {/* Main Marketing Content */}
          <div className="mb-16">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
              <Star className="w-3 h-3 mr-1" />
              Enterprise-grade security
            </Badge>
            
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              The most secure way to authenticate your users
            </h1>
            
            <p className="text-xl text-purple-100 mb-8 leading-relaxed">
              Built for modern applications with passkeys, multi-factor authentication, 
              and seamless user experiences that your customers will love.
            </p>
  
            {/* Feature highlights */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-white">Bank-level security</h3>
                  <p className="text-purple-100">
                    Multi-factor authentication with passkeys and TOTP for maximum protection
                  </p>
                </div>
              </div>
  
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-white">Lightning fast</h3>
                  <p className="text-purple-100">
                    One-tap authentication with passkeys - no passwords to remember
                  </p>
                </div>
              </div>
  
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-white">Works everywhere</h3>
                  <p className="text-purple-100">
                    Cross-platform support with seamless mobile and desktop experience
                  </p>
                </div>
              </div>
            </div>
  
            {/* Trust indicators */}
            <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span className="font-semibold text-white">Trusted by developers worldwide</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm text-purple-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                  SOC 2 Type II certified
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                  GDPR compliant
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                  ISO 27001 certified
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                  PCI DSS Level 1
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Bottom Stats */}
        <div className={`relative ${Z_INDEX_CLASSES.TABLE_STICKY} grid grid-cols-3 gap-8 pt-8 border-t border-white/20`}>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <Users className="w-5 h-5 text-purple-200" />
              <span className="text-2xl font-bold text-white">10M+</span>
            </div>
            <p className="text-sm text-purple-200">Users protected</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <Lock className="w-5 h-5 text-purple-200" />
              <span className="text-2xl font-bold text-white">99.9%</span>
            </div>
            <p className="text-sm text-purple-200">Uptime SLA</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-200" />
              <span className="text-2xl font-bold text-white">0.1s</span>
            </div>
            <p className="text-sm text-purple-200">Avg response</p>
          </div>
        </div>
      </div>
    );
  }
