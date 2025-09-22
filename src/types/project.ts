export interface Project {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  created_at: string;
  current_streak: number; // Auto-calculated from logs
  total_logs: number; // Count of all logs
  best_streak?: number; // Longest streak ever achieved
}

export interface Log {
  id: string;
  user_id: string;
  project_id: string;
  content: string; // Markdown or plain text
  created_at: string;
}

export interface Streak {
  id: string;
  project_id: string;
  user_id: string;
  name: string;
  description?: string;
  current_streak: number;
  best_streak: number;
  total_days: number;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  target_days?: number;
  start_date: string;
}

export interface StreakLog {
  id: string;
  streak_id: string;
  user_id: string;
  logged_date: string;
  notes?: string;
  created_at: string;
}

export interface CreateProjectData {
  name: string;
  description?: string;
}

export interface CreateLogData {
  project_id: string;
  content: string;
} 