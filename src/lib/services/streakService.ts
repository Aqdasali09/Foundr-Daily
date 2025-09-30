// lib/services/streakService.ts
import { supabase } from "../supabase";
import { Streak, StreakLog } from "@/types/project";

export const streakService = {
  async getStreak(id: string): Promise<Streak | null> {
    const { data, error } = await supabase.from("streaks").select("*").eq("id", id).single();
    if (error) throw new Error(error.message);
    return data;
  },

  async getStreakLogs(streakId: string): Promise<StreakLog[]> {
    const { data, error } = await supabase.from("streak_logs").select("*").eq("streak_id", streakId);
    if (error) throw new Error(error.message);
    return data;
  },

  async logStreak(streakId: string, date: string, notes?: string) {
    const { error } = await supabase.from("streak_logs").insert([{ streak_id: streakId, logged_date: date, notes }]);
    if (error) throw new Error(error.message);
  },

  async unlogStreak(streakId: string, date: string) {
    const { error } = await supabase.from("streak_logs").delete().eq("streak_id", streakId).eq("logged_date", date);
    if (error) throw new Error(error.message);
  },
};
