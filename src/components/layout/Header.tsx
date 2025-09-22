'use client';

import { useAuth } from '../../contexts/AuthContext';
import Link from 'next/link';
import { UserIcon } from '../../lib/utils/icons';

export default function Header() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="bg-white border-b border-border-gray px-6 py-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-dark-gray hover:text-primary-blue transition-colors">
            FoundrDaily
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-8 h-8 rounded-full bg-primary-blue flex items-center justify-center">
                  <UserIcon size={16} className="text-white" />
                </div>
                <span className="hidden sm:inline">
                  {user.user_metadata?.full_name || user.email}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="text-sm text-gray-600 hover:text-primary-orange transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/auth/login"
                className="text-sm text-gray-600 hover:text-primary-blue transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="bg-primary-blue hover:bg-primary-orange text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
} 