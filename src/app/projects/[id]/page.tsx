'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import { projectService } from '../../../lib/services/projectService';
import { Project, Log } from '../../../types/project';
import Link from 'next/link';
import { UserIcon } from '../../../lib/utils/icons';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateLogModal, setShowCreateLogModal] = useState(false);
  const [logForm, setLogForm] = useState({
    content: '',
  });

  useEffect(() => {
    if (id) {
      loadProjectAndLogs();
    }
  }, [id]);

  const loadProjectAndLogs = async () => {
    try {
      const [projectData, logsData] = await Promise.all([
        projectService.getProject(id as string),
        projectService.getProjectLogs(id as string),
      ]);
      
      setProject(projectData);
      setLogs(logsData);
    } catch (error) {
      console.error('Error loading project:', error);
      router.push('/projects');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLog = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!logForm.content.trim()) {
      alert('Log content is required');
      return;
    }

    try {
      await projectService.createLog({
        project_id: id as string,
        content: logForm.content.trim(),
      });
      
      setLogForm({ content: '' });
      setShowCreateLogModal(false);
      await loadProjectAndLogs();
      
      // Trigger a page refresh to update sidebar stats
      window.location.reload();
    } catch (error) {
      if (error instanceof Error && error.message.includes('Already logged')) {
        alert('Already logged for today!');
      } else {
        console.error('Error creating log:', error);
        alert('Failed to create log');
      }
    }
  };

  const handleDeleteLog = async (logId: string) => {
    if (confirm('Are you sure you want to delete this log?')) {
      try {
        await projectService.deleteLog(logId);
        await loadProjectAndLogs();
        
        // Trigger a page refresh to update sidebar stats
        window.location.reload();
      } catch (error) {
        console.error('Error deleting log:', error);
        alert('Failed to delete log');
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-light-gray flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-light-gray flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Project not found</h2>
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
          <Link href="/projects" className="text-primary-blue hover:text-primary-orange mb-4 inline-block">
            ← Back to Projects
          </Link>
          
          <div className="bg-white rounded-2xl shadow-linkedin border border-border-gray p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-orange-500 to-blue-500 flex items-center justify-center text-white font-bold text-2xl">
                  {project.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-dark-gray mb-2">{project.name}</h1>
                  <p className="text-gray-600">{project.description || 'No description provided'}</p>
                </div>
              </div>
              <button
                onClick={() => setShowCreateLogModal(true)}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Log Today
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-1">{project.current_streak}</div>
                <div className="text-sm text-gray-600">Current Streak</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500 mb-1">{project.best_streak || 0}</div>
                <div className="text-sm text-gray-600">Best Streak</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-700 mb-1">{project.total_logs}</div>
                <div className="text-sm text-gray-600">Total Logs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500 mb-1">{logs.length}</div>
                <div className="text-sm text-gray-600">Recent Logs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Logs Section */}
        <div className="bg-white rounded-2xl shadow-linkedin border border-border-gray p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-dark-gray">Daily Logs</h2>
            <span className="text-sm text-gray-600">{logs.length} entries</span>
          </div>

          {logs.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserIcon size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No logs yet</h3>
              <p className="text-gray-600 mb-6">Start tracking your progress by logging your first entry</p>
              <button
                onClick={() => setShowCreateLogModal(true)}
                className="bg-gradient-to-r from-orange-500 to-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg"
              >
                Log First Entry
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="bg-gray-50 rounded-xl p-6 border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <div className="font-medium text-dark-gray">
                          {formatDate(log.created_at)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatTime(log.created_at)}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteLog(log.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                  
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                      {log.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Log Modal */}
      {showCreateLogModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-2xl">
            <h2 className="text-2xl font-bold text-dark-gray mb-6">Log Today's Progress</h2>
            
            <form onSubmit={handleCreateLog} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-dark-gray mb-2">
                  What did you work on today?
                </label>
                <textarea
                  value={logForm.content}
                  onChange={(e) => setLogForm({ content: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base bg-gray-50 text-dark-gray transition-all duration-200 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                  placeholder="Describe what you accomplished, challenges you faced, or insights you gained..."
                  rows={8}
                  required
                />
                <p className="text-sm text-gray-500 mt-2">
                  Share your daily progress, challenges, or insights. This helps maintain your streak!
                </p>
              </div>
              
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateLogModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl transition-all duration-200 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-orange-500 to-blue-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg"
                >
                  Save Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 