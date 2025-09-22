'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { projectService } from '../../lib/services/projectService';
import { FireIcon, UserIcon, ProjectIcon, HeartIcon, CommentIcon, ShareIcon } from '../../lib/utils/icons';
import Link from 'next/link';

interface UserStats {
  currentStreak: number;
  bestStreak: number;
  totalLogs: number;
  activeProjects: number;
}

export default function Sidebar() {
  const { user } = useAuth();
  const [userStats, setUserStats] = useState<UserStats>({
    currentStreak: 0,
    bestStreak: 0,
    totalLogs: 0,
    activeProjects: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadUserStats();
    }
  }, [user]);

  const loadUserStats = async () => {
    try {
      setLoading(true);
      const stats = await projectService.getUserStats();
      setUserStats(stats);
    } catch (error) {
      console.error('Error loading user stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="w-[300px] bg-white rounded-lg shadow-linkedin border border-border-gray overflow-hidden">
        <div className="p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <UserIcon size={32} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Welcome to FoundrDaily</h3>
          <p className="text-gray-600 text-sm mb-6">Sign in to track your projects and daily progress</p>
          <div className="space-y-3">
            <Link
              href="/auth/login"
              className="w-full bg-gradient-to-r from-orange-500 to-blue-500 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg block text-center"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="w-full bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-xl transition-all duration-200 hover:bg-gray-200 block text-center"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[300px] bg-white rounded-lg shadow-linkedin border border-border-gray overflow-hidden">
      {/* Profile Section */}
      <div className="relative pb-4 border-b border-border-gray">
        {/* Cover Image */}
        <div className="h-[54px] bg-cover-gradient relative"></div>
        
        {/* Profile Picture */}
        <div className="w-[72px] h-[72px] rounded-full bg-profile-gradient absolute top-[18px] left-1/2 transform -translate-x-1/2 flex items-center justify-center text-2xl text-white font-semibold border-4 border-white shadow-profile">
          {user.email?.charAt(0).toUpperCase() || 'U'}
        </div>
        
        {/* Profile Info */}
        <div className="text-center pt-10 px-4">
          <div className="text-xl font-semibold text-dark-gray mb-1 leading-tight">
            {user.email?.split('@')[0] || 'User'}
          </div>
          <div className="text-xs text-gray-600 mb-3 leading-relaxed">Founder • Building amazing products</div>
          <div className="inline-flex items-center bg-primary-blue bg-opacity-10 text-primary-blue px-3 py-1.5 rounded-2xl text-xs font-semibold border border-primary-blue border-opacity-20">
            <FireIcon size={14} className="text-primary-blue mr-1.5" />
            Active Member
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b border-border-gray">
        <div className="text-base font-semibold text-dark-gray mb-4 flex items-center">
          <ProjectIcon size={20} className="text-primary-blue mr-2" />
          Quick Actions
        </div>
        
        <Link
          href="/projects"
          className="flex items-center p-3 rounded-md mb-2 transition-all duration-200 cursor-pointer border border-transparent hover:bg-gray-50 hover:border-border-gray"
        >
          <div className="w-10 h-10 rounded-md bg-project-gradient flex items-center justify-center mr-3 flex-shrink-0">
            <ProjectIcon size={20} className="text-primary-orange" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-dark-gray mb-0.5">My Projects</div>
            <div className="text-xs text-gray-600">Track your startup projects</div>
          </div>
          <div className="text-primary-blue">→</div>
        </Link>

        <Link
          href="/projects"
          className="flex items-center p-3 rounded-md transition-all duration-200 cursor-pointer border border-transparent hover:bg-gray-50 hover:border-border-gray"
        >
          <div className="w-10 h-10 rounded-md bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center mr-3 flex-shrink-0">
            <FireIcon size={20} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-dark-gray mb-0.5">Log Progress</div>
            <div className="text-xs text-gray-600">Record daily updates</div>
          </div>
          <div className="text-primary-blue">→</div>
        </Link>
      </div>

      {/* Stats Section */}
      <div className="p-4 border-b border-border-gray">
        <div className="text-base font-semibold text-dark-gray mb-4 flex items-center">
          <FireIcon size={20} className="text-primary-orange mr-2" />
          Activity Stats
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <div className="flex items-center text-sm text-gray-600 font-medium">
            <FireIcon size={16} className="text-primary-orange mr-3" />
            Current Streak
          </div>
          <div className="flex items-center text-base font-semibold text-dark-gray">
            {loading ? (
              <div className="w-4 h-4 border-2 border-gray-300 border-t-primary-orange rounded-full animate-spin"></div>
            ) : (
              <>
                <span className="mr-1">{userStats.currentStreak}</span>
                <span>days</span>
              </>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <div className="flex items-center text-sm text-gray-600 font-medium">
            <ProjectIcon size={16} className="text-primary-orange mr-3" />
            Active Projects
          </div>
          <div className="flex items-center text-base font-semibold text-dark-gray">
            {loading ? (
              <div className="w-4 h-4 border-2 border-gray-300 border-t-primary-orange rounded-full animate-spin"></div>
            ) : (
              <span>{userStats.activeProjects}</span>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <div className="flex items-center text-sm text-gray-600 font-medium">
            <FireIcon size={16} className="text-primary-orange mr-3" />
            Best Streak
          </div>
          <div className="flex items-center text-base font-semibold text-dark-gray">
            {loading ? (
              <div className="w-4 h-4 border-2 border-gray-300 border-t-primary-orange rounded-full animate-spin"></div>
            ) : (
              <>
                <span className="mr-1">{userStats.bestStreak}</span>
                <span>days</span>
              </>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center text-sm text-gray-600 font-medium">
            <UserIcon size={16} className="text-primary-orange mr-3" />
            Total Logs
          </div>
          <div className="flex items-center text-base font-semibold text-dark-gray">
            {loading ? (
              <div className="w-4 h-4 border-2 border-gray-300 border-t-primary-orange rounded-full animate-spin"></div>
            ) : (
              <span>{userStats.totalLogs}</span>
            )}
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="p-4">
        <div className="text-base font-semibold text-dark-gray mb-4 flex items-center">
          <ProjectIcon size={20} className="text-primary-blue mr-2" />
          Recent Projects
        </div>
        
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <ProjectIcon size={24} className="text-gray-400" />
          </div>
          <p className="text-sm text-gray-600 mb-4">No projects yet</p>
          <Link
            href="/projects"
            className="inline-flex items-center bg-primary-blue text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-primary-orange"
          >
            <ProjectIcon size={16} className="mr-2" />
            Create Project
          </Link>
        </div>
      </div>

      {/* View Profile */}
      <div className="text-center p-4 border-t border-border-gray">
        <Link
          href="/projects"
          className="text-primary-blue text-sm font-semibold no-underline py-2 px-4 rounded-full border border-primary-blue transition-all duration-200 inline-block hover:bg-primary-blue hover:text-white"
        >
          View Projects
        </Link>
      </div>
    </div>
  );
} 