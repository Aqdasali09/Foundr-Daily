'use client';

import { useState } from 'react';
import { supabase } from '../../../lib/supabase';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        // Redirect to home page after successful login
        window.location.href = '/';
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Features Panel - Mobile First (Top on mobile, Right on desktop) */}
      <div className="lg:order-2 lg:flex-1 bg-gradient-to-br from-orange-500 to-blue-500 flex flex-col justify-between p-6 sm:p-8 lg:p-12 text-white relative overflow-hidden">
        {/* Decorative background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-white rounded-full"></div>
          <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-white rounded-full"></div>
        </div>
        
        {/* Brand Header */}
        <div className="flex items-center mb-8 lg:mb-16 relative z-10 animate-[fadeInUp_0.6s_ease-out]">
          <Image
            src="/fulllogo.png"
            alt="FoundrDaily Logo"
            width={245}
            height={163}
            className="object-contain"
          />
        </div>

        {/* Features Content */}
        <div className="flex-1 flex flex-col justify-center relative z-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 lg:mb-12 leading-tight animate-[fadeInUp_0.6s_ease-out]">
            Build your startup empire, one day at a time
          </h2>

          <div className="space-y-4 lg:space-y-6">
            {/* Feature 1 */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 flex items-center p-4 lg:p-6 rounded-2xl transition-all duration-300 hover:translate-y-[-4px] hover:bg-white/15 animate-[fadeInUp_0.8s_ease-out] hover:scale-[1.02]">
              <div className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center bg-white/10 rounded-lg border border-white/20 mr-4 lg:mr-6">
                <svg className="w-5 h-5 lg:w-6 lg:h-6 stroke-white" fill="none" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              </div>
              <div className="text-base lg:text-lg font-semibold">Track your daily streaks</div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 flex items-center p-4 lg:p-6 rounded-2xl transition-all duration-300 hover:translate-y-[-4px] hover:bg-white/15 animate-[fadeInUp_0.9s_ease-out] hover:scale-[1.02]">
              <div className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center bg-white/10 rounded-lg border border-white/20 mr-4 lg:mr-6">
                <svg className="w-5 h-5 lg:w-6 lg:h-6 stroke-white" fill="none" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div className="text-base lg:text-lg font-semibold">Log your startup progress</div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 flex items-center p-4 lg:p-6 rounded-2xl transition-all duration-300 hover:translate-y-[-4px] hover:bg-white/15 animate-[fadeInUp_1.0s_ease-out] hover:scale-[1.02]">
              <div className="w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center bg-white/10 rounded-lg border border-white/20 mr-4 lg:mr-6">
                <svg className="w-5 h-5 lg:w-6 lg:h-6 stroke-white" fill="none" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                  <line x1="9" y1="9" x2="9.01" y2="9"/>
                  <line x1="15" y1="9" x2="15.01" y2="9"/>
                </svg>
              </div>
              <div className="text-base lg:text-lg font-semibold">Compete on global leaderboard</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center opacity-80 text-sm lg:text-base relative z-10 mt-8 lg:mt-0 animate-[fadeInUp_1.1s_ease-out]">
          Join 10,000+ founders building the future
        </div>
      </div>

      {/* Login Panel - Left on desktop, Bottom on mobile */}
      <div className="lg:order-1 lg:flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-light-gray">
        <form onSubmit={handleLogin} className="bg-white/95 backdrop-blur-md border border-white/20 rounded-3xl p-6 sm:p-8 lg:p-12 w-full max-w-md shadow-2xl transition-all duration-300 hover:translate-y-[-4px] hover:shadow-3xl animate-[fadeInUp_0.6s_ease-out]">
          
          {/* Form Header */}
          <div className="text-center mb-8 lg:mb-10">
            <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent mb-2">
              Welcome back
            </h1>
            <p className="text-gray-600 text-sm lg:text-base">Sign in to continue your founder journey</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* Email Input */}
          <div className="mb-6 transition-transform duration-200">
            <label className="block text-sm font-medium text-dark-gray mb-2" htmlFor="email">
              Email address
            </label>
            <input 
              className="w-full px-4 py-3 lg:px-5 lg:py-4 border-2 border-gray-200 rounded-xl text-base bg-gray-50 text-dark-gray transition-all duration-200 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 placeholder-gray-500" 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email" 
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6 transition-transform duration-200">
            <label className="block text-sm font-medium text-dark-gray mb-2" htmlFor="password">
              Password
            </label>
            <input 
              className="w-full px-4 py-3 lg:px-5 lg:py-4 border-2 border-gray-200 rounded-xl text-base bg-gray-50 text-dark-gray transition-all duration-200 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 placeholder-gray-500" 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password" 
              required
            />
          </div>

          {/* Login Button */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 lg:py-4 rounded-xl font-semibold text-base transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-orange-500/30 active:translate-y-0 mb-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          {/* Forgot Password Link */}
          <Link 
            href="/auth/forgot-password" 
            className="block text-center text-blue-500 hover:text-blue-600 text-sm lg:text-base mb-8 transition-colors duration-200"
          >
            Forgot your password?
          </Link>

          {/* Sign Up Button */}
          <Link
            href="/auth/signup"
            className="w-full bg-transparent text-dark-gray border-2 border-gray-200 py-3 lg:py-4 rounded-xl font-medium text-base transition-all duration-200 hover:border-blue-500 hover:text-blue-500 hover:bg-blue-500/5 block text-center"
          >
            Sign up instead
          </Link>
        </form>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
} 