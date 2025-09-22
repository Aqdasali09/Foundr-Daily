'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { UserIcon } from '../../lib/utils/icons';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const [search, setSearch] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Only use available icons (UserIcon as avatar, and text for others)

  return (
    <nav className="bg-white border-b border-border-gray shadow-linkedin sticky top-0 z-30">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section */}
          <div className="flex items-center space-x-8">
            {/* Mobile Menu Button - Moved to left */}
            <button onClick={() => setMobileMenuOpen(v => !v)} className="md:hidden p-2 text-gray-600 hover:text-dark-gray hover:bg-gray-50 rounded-lg">
              <span className="text-xl">☰</span>
            </button>
            
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="FoundrDaily Logo"
                className="w-[45px] h-[63px] object-contain"
              />
            </Link>


            {/* Navigation Links (Desktop) */}
            <div className="hidden md:flex items-center space-x-6">
              {user ? (
                <>
                  <Link href="#" className="flex items-center space-x-2 text-gray-600 hover:text-dark-gray font-medium transition-colors duration-200">
                  <span>Dashboard</span>
                  </Link>
                  <Link href="#" className="flex items-center space-x-2 text-gray-600 hover:text-dark-gray font-medium transition-colors duration-200">
                    <span>Calendar</span>
                  </Link>
                  <Link href="#" className="flex items-center space-x-2 text-gray-600 hover:text-dark-gray font-medium transition-colors duration-200">
                    <span>Projects</span>
                  </Link>
                  <Link href="#" className="flex items-center space-x-2 text-gray-600 hover:text-dark-gray font-medium transition-colors duration-200">
                    <span>Leaderboard</span>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="#" className="text-gray-600 hover:text-dark-gray font-medium transition-colors duration-200">Features</Link>
                  <Link href="#" className="text-gray-600 hover:text-dark-gray font-medium transition-colors duration-200">Community</Link>
                  <Link href="#" className="text-gray-600 hover:text-dark-gray font-medium transition-colors duration-200">Pricing</Link>
                  <Link href="#" className="text-gray-600 hover:text-dark-gray font-medium transition-colors duration-200">About</Link>
                </>
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="hidden md:block">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search..."
                className="px-3 py-2 border border-border-gray rounded-lg focus:ring-2 focus:ring-primary-blue focus:border-transparent text-sm bg-light-gray"
              />
            </div>
            {user ? (
              <>
                {/* Notifications */}
                <div className="relative">
                  <button className="p-2 text-gray-600 hover:text-dark-gray hover:bg-gray-50 rounded-lg transition-colors duration-200">
                    <span className="text-lg">🔔</span>
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-orange text-white text-xs font-bold rounded-full flex items-center justify-center">3</span>
                  </button>
                </div>
                {/* Log Today Button */}
                <button className="bg-gradient-to-br whitespace-nowrap from-orange-500 to-blue-400 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:opacity-90 hover:shadow-lg flex items-center space-x-2">
                  <span>Log Today</span>
                </button>
                {/* User Avatar Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(v => !v)}
                    className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-300 flex items-center justify-center text-white font-semibold text-sm">
                      {user.user_metadata?.full_name ? user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase() : <UserIcon size={16} className="text-white" />}
                    </div>
                    <span className="text-gray-600">▼</span>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-linkedin border border-border-gray py-2 z-50">
                      <Link href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Profile
                      </Link>
                      <Link href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Settings
                      </Link>
                      <hr className="border-gray-200 my-2" />
                      <button
                        onClick={signOut}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <button className="text-gray-600 hover:text-dark-gray font-medium transition-colors duration-200" onClick={() => window.location.href = '/auth/login'}>
                  Sign In
                </button>
                <button className="bg-gradient-to-br from-orange-500 to-blue-400 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200 hover:opacity-90 hover:shadow-lg" onClick={() => window.location.href = '/auth/signup'}>
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
        {/* Mobile Navigation Slide-in */}
        {/* Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div
              className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-linkedin border-r border-border-gray z-50 transform transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
              <div className="p-6 space-y-2 pt-16">
                {user ? (
                  <>
                    <Link href="#" className="flex items-center space-x-3 text-primary-orange font-semibold px-3 py-2 rounded-lg bg-orange-50">
                      <span>Dashboard</span>
                    </Link>
                    <Link href="#" className="flex items-center space-x-3 text-gray-600 hover:text-dark-gray font-medium px-3 py-2 rounded-lg hover:bg-gray-50">
                      <span>Calendar</span>
                    </Link>
                    <Link href="#" className="flex items-center space-x-3 text-gray-600 hover:text-dark-gray font-medium px-3 py-2 rounded-lg hover:bg-gray-50">
                      <span>Projects</span>
                    </Link>
                    <Link href="#" className="flex items-center space-x-3 text-gray-600 hover:text-dark-gray font-medium px-3 py-2 rounded-lg hover:bg-gray-50">
                      <span>Leaderboard</span>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="#" className="block text-gray-600 hover:text-dark-gray font-medium px-3 py-2 rounded-lg hover:bg-gray-50">Features</Link>
                    <Link href="#" className="block text-gray-600 hover:text-dark-gray font-medium px-3 py-2 rounded-lg hover:bg-gray-50">Community</Link>
                    <Link href="#" className="block text-gray-600 hover:text-dark-gray font-medium px-3 py-2 rounded-lg hover:bg-gray-50">Pricing</Link>
                    <Link href="#" className="block text-gray-600 hover:text-dark-gray font-medium px-3 py-2 rounded-lg hover:bg-gray-50">About</Link>
                    <hr className="border-gray-200 my-2" />
                    <button className="block text-gray-600 hover:text-dark-gray font-medium px-3 py-2 rounded-lg hover:bg-gray-50 w-full text-left" onClick={() => window.location.href = '/auth/login'}>Sign In</button>
                    <button className="block bg-gradient-to-br from-orange-500 to-blue-400 text-white font-semibold px-3 py-2 rounded-lg text-center w-full" onClick={() => window.location.href = '/auth/signup'}>Get Started</button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 