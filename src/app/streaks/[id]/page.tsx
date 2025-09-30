'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import { projectService } from '../../../lib/services/projectService';
import { Streak, StreakLog, Project } from '../../../types/project';
import Link from 'next/link';
import { UserIcon } from '../../../lib/utils/icons';
import { streakService } from '@/lib/services/streakService';

export default function StreakDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [streak, setStreak] = useState<Streak | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [logs, setLogs] = useState<StreakLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLogModal, setShowLogModal] = useState(false);
  const [logForm, setLogForm] = useState({
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });

  useEffect(() => {
    if (id) {
      loadStreakData();
    }
  }, [id]);

  const loadStreakData = async () => {
    try {
      const streakData = await streakService.getStreak(id as string);
      if (!streakData) {
        router.push('/projects');
        return;
      }

      const [projectData, logsData] = await Promise.all([
        projectService.getProject(streakData.project_id),
        streakService.getStreakLogs(id as string),
      ]);

      setStreak(streakData);
      setProject(projectData);
      setLogs(logsData);
    } catch (error) {
      console.error('Error loading streak:', error);
      router.push('/projects');
    } finally {
      setLoading(false);
    }
  };

  const handleLogStreak = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await streakService.logStreak(id as string, logForm.date, logForm.notes || undefined);
      setLogForm({ date: new Date().toISOString().split('T')[0], notes: '' });
      setShowLogModal(false);
      loadStreakData();
    } catch (error) {
      if (error instanceof Error && error.message.includes('Already logged')) {
        alert('Already logged for this date!');
      } else {
        console.error('Error logging streak:', error);
        alert('Failed to log streak');
      }
    }
  };

  const handleUnlogStreak = async (date: string) => {
    if (confirm('Are you sure you want to remove this log?')) {
      try {
        await streakService.unlogStreak(id as string, date);
        loadStreakData();
      } catch (error) {
        console.error('Error removing log:', error);
        alert('Failed to remove log');
      }
    }
  };

  const getProgressPercentage = () => {
    if (!streak?.target_days) return 0;
    return Math.min((streak.current_streak / streak.target_days) * 100, 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-light-gray flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading streak...</p>
        </div>
      </div>
    );
  }

  if (!streak || !project) {
    return (
      <div className="min-h-screen bg-light-gray flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Streak not found</h2>
          <Link href="/projects" className="text-primary-blue hover:text-primary-orange">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-gray">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href={`/projects/${project.id}`} className="text-primary-blue hover:text-primary-orange mb-4 inline-block">
            ← Back to {project.name}
          </Link>
          
          <div className="bg-white rounded-2xl shadow-linkedin border border-border-gray p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-dark-gray mb-2">{streak.name}</h1>
                {streak.description && (
                  <p className="text-gray-600">{streak.description}</p>
                )}
              </div>
              <button
                onClick={() => setShowLogModal(true)}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Log Activity
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-1">{streak.current_streak}</div>
                <div className="text-sm text-gray-600">Current Streak</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500 mb-1">{streak.best_streak}</div>
                <div className="text-sm text-gray-600">Best Streak</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-700 mb-1">{streak.total_days}</div>
                <div className="text-sm text-gray-600">Total Days</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500 mb-1">{logs.length}</div>
                <div className="text-sm text-gray-600">Logged Days</div>
              </div>
            </div>

            {/* Progress Bar */}
            {streak.target_days && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress to Target</span>
                  <span className="text-sm text-gray-600">
                    {streak.current_streak} / {streak.target_days} days
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${getProgressPercentage()}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Activity Log */}
        <div className="bg-white rounded-2xl shadow-linkedin border border-border-gray p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-dark-gray">Activity Log</h2>
            <span className="text-sm text-gray-600">{logs.length} entries</span>
          </div>

          {logs.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserIcon size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No activity logged yet</h3>
              <p className="text-gray-600 mb-6">Start tracking your progress by logging your first activity</p>
              <button
                onClick={() => setShowLogModal(true)}
                className="bg-gradient-to-r from-orange-500 to-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg"
              >
                Log First Activity
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <div className="font-medium text-dark-gray">
                        {formatDate(log.logged_date)}
                      </div>
                      {log.notes && (
                        <div className="text-sm text-gray-600 mt-1">{log.notes}</div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleUnlogStreak(log.logged_date)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Log Activity Modal */}
      {showLogModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-dark-gray mb-6">Log Activity</h2>
            
            <form onSubmit={handleLogStreak} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-dark-gray mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={logForm.date}
                  onChange={(e) => setLogForm({ ...logForm, date: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base bg-gray-50 text-dark-gray transition-all duration-200 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-dark-gray mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  value={logForm.notes}
                  onChange={(e) => setLogForm({ ...logForm, notes: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base bg-gray-50 text-dark-gray transition-all duration-200 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                  placeholder="Add any notes about your activity..."
                  rows={3}
                />
              </div>
              
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl transition-all duration-200 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-orange-500 to-blue-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg"
                >
                  Log Activity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 