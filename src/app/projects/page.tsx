'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { projectService } from '../../lib/services/projectService';
import { Project } from '../../types/project';
import Link from 'next/link';
import { UserIcon } from '../../lib/utils/icons';

export default function ProjectsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState({
    name: '',
    description: '',
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const userProjects = await projectService.getUserProjects();
      setProjects(userProjects);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!createForm.name.trim()) {
      alert('Project name is required');
      return;
    }

    try {
      await projectService.createProject({
        name: createForm.name.trim(),
        description: createForm.description.trim(),
      });
      
      setCreateForm({ name: '', description: '' });
      setShowCreateModal(false);
      loadProjects();
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-light-gray flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-dark-gray mb-2">My Projects</h1>
            <p className="text-gray-600">Track your startup projects and daily progress</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-gradient-to-r from-orange-500 to-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg"
          >
            Create Project
          </button>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserIcon size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects yet</h3>
            <p className="text-gray-600 mb-6">Create your first project to start tracking your startup journey</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-orange-500 to-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg"
            >
              Create Your First Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="bg-white rounded-2xl shadow-linkedin border border-border-gray p-6 transition-all duration-200 hover:translate-y-[-4px] hover:shadow-lg hover:border-gray-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                    {project.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(project.created_at).toLocaleDateString()}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-dark-gray mb-2">{project.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {project.description || 'No description provided'}
                </p>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Current Streak</span>
                    <span className="text-lg font-bold text-orange-500">{project.current_streak} days</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Best Streak</span>
                    <span className="text-lg font-bold text-blue-500">{project.best_streak || 0} days</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Logs</span>
                    <span className="text-lg font-bold text-gray-700">{project.total_logs}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">View logs</span>
                    <span className="text-primary-blue font-medium">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-dark-gray mb-6">Create New Project</h2>
            
            <form onSubmit={handleCreateProject} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-dark-gray mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  value={createForm.name}
                  onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base bg-gray-50 text-dark-gray transition-all duration-200 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                  placeholder="Enter project name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-dark-gray mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={createForm.description}
                  onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-base bg-gray-50 text-dark-gray transition-all duration-200 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10"
                  placeholder="Describe your project"
                  rows={3}
                />
              </div>
              
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl transition-all duration-200 hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-orange-500 to-blue-500 text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 