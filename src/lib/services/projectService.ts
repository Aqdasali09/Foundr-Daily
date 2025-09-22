import { supabase } from '../supabase';
import { Project, Log, CreateProjectData, CreateLogData } from '../../types/project';

export const projectService = {
  // Project operations
  async createProject(data: CreateProjectData): Promise<Project | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data: project, error } = await supabase
      .from('projects')
      .insert({
        ...data,
        user_id: user.id,
        current_streak: 0,
        total_logs: 0,
      })
      .select()
      .single();

    if (error) throw error;
    return project;
  },

  async getUserProjects(): Promise<Project[]> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data: projects, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return projects || [];
  },

  async getProject(id: string): Promise<Project | null> {
    const { data: project, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return project;
  },

  async updateProject(id: string, updates: Partial<Project>): Promise<Project | null> {
    const { data: project, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return project;
  },

  async deleteProject(id: string): Promise<void> {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // User statistics for sidebar
  async getUserStats() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('current_streak, best_streak, total_logs')
      .eq('user_id', user.id);

    if (projectsError) throw projectsError;

    const { data: logs, error: logsError } = await supabase
      .from('logs')
      .select('id')
      .eq('user_id', user.id);

    if (logsError) throw logsError;

    const totalLogs = logs?.length || 0;
    const activeProjects = projects?.length || 0;
    
    // Find the highest current streak among all projects
    const currentStreak = projects?.reduce((max, project) => 
      Math.max(max, project.current_streak || 0), 0) || 0;
    
    // Find the highest best streak among all projects
    const bestStreak = projects?.reduce((max, project) => 
      Math.max(max, project.best_streak || 0), 0) || 0;

    return {
      currentStreak,
      bestStreak,
      totalLogs,
      activeProjects,
    };
  },

  // Log operations
  async createLog(data: CreateLogData): Promise<Log | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Check if already logged for today
    const today = new Date().toISOString().split('T')[0];
    const { data: existingLog } = await supabase
      .from('logs')
      .select('id')
      .eq('project_id', data.project_id)
      .eq('user_id', user.id)
      .gte('created_at', today)
      .lt('created_at', new Date(new Date(today).getTime() + 24 * 60 * 60 * 1000).toISOString())
      .single();

    if (existingLog) {
      throw new Error('Already logged for today');
    }

    const { data: log, error } = await supabase
      .from('logs')
      .insert({
        ...data,
        user_id: user.id,
      })
      .select()
      .single();

    if (error) throw error;

    // Update project streak and log count
    await this.updateProjectStatistics(data.project_id);

    return log;
  },

  async getProjectLogs(projectId: string): Promise<Log[]> {
    const { data: logs, error } = await supabase
      .from('logs')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return logs || [];
  },

  async getLog(id: string): Promise<Log | null> {
    const { data: log, error } = await supabase
      .from('logs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return log;
  },

  async updateLog(id: string, updates: Partial<Log>): Promise<Log | null> {
    const { data: log, error } = await supabase
      .from('logs')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return log;
  },

  async deleteLog(id: string): Promise<void> {
    const { data: log } = await supabase
      .from('logs')
      .select('project_id')
      .eq('id', id)
      .single();

    if (!log) throw new Error('Log not found');

    const { error } = await supabase
      .from('logs')
      .delete()
      .eq('id', id);

    if (error) throw error;

    // Update project statistics
    await this.updateProjectStatistics(log.project_id);
  },

  async updateProjectStatistics(projectId: string): Promise<void> {
    // Get all logs for this project
    const logs = await this.getProjectLogs(projectId);
    
    if (logs.length === 0) {
      await this.updateProject(projectId, {
        current_streak: 0,
        total_logs: 0,
        best_streak: 0,
      });
      return;
    }

    // Get unique dates from logs (in case of multiple logs per day)
    const uniqueDates = [...new Set(logs.map(log => log.created_at.split('T')[0]))]
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    // Calculate current streak (consecutive days from today)
    const today = new Date().toISOString().split('T')[0];
    let currentStreak = 0;
    let checkDate = new Date(today);
    
    for (const logDate of uniqueDates) {
      const logDateTime = new Date(logDate);
      const diffTime = checkDate.getTime() - logDateTime.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 1) {
        currentStreak++;
        checkDate = logDateTime;
      } else {
        break;
      }
    }

    // Calculate best streak
    let bestStreak = 0;
    let tempStreak = 0;
    let prevDate: Date | null = null;

    for (const logDate of uniqueDates) {
      const currentDate = new Date(logDate);
      
      if (prevDate) {
        const diffTime = prevDate.getTime() - currentDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          tempStreak++;
        } else {
          bestStreak = Math.max(bestStreak, tempStreak);
          tempStreak = 1;
        }
      } else {
        tempStreak = 1;
      }
      
      prevDate = currentDate;
    }
    
    bestStreak = Math.max(bestStreak, tempStreak);

    // Update project
    await this.updateProject(projectId, {
      current_streak: currentStreak,
      best_streak: bestStreak,
      total_logs: logs.length,
    });
  },
}; 