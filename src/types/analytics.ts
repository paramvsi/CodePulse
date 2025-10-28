/**
 * Analytics Types
 * Type definitions for productivity analytics and reporting
 */

import { ProgrammingLanguage } from './session';

export interface DailyActivity {
  date: string; // YYYY-MM-DD format
  totalMinutes: number;
  sessionCount: number;
  languages: Record<ProgrammingLanguage, number>; // minutes per language
}

export interface LanguageBreakdown {
  language: ProgrammingLanguage;
  minutes: number;
  percentage: number;
  sessionCount: number;
}

export interface ProjectBreakdown {
  projectName: string;
  minutes: number;
  percentage: number;
  sessionCount: number;
  lastActive: string; // ISO 8601 format
}

export interface ProductivityScore {
  score: number; // 0-100
  trend: 'up' | 'down' | 'stable';
  changePercentage: number;
}

export interface WeeklyReport {
  weekStart: string; // YYYY-MM-DD format
  weekEnd: string; // YYYY-MM-DD format
  totalMinutes: number;
  totalSessions: number;
  dailyAverage: number;
  productivityScore: ProductivityScore;
  languageBreakdown: LanguageBreakdown[];
  projectBreakdown: ProjectBreakdown[];
  breakCompliance: number; // 0-100
  comparison: {
    previousWeek: {
      totalMinutes: number;
      change: number;
      changePercentage: number;
    };
  };
}

export interface HeatmapData {
  date: string; // YYYY-MM-DD format
  value: number; // minutes
  intensity: number; // 0-100
}

export interface GoalProgress {
  goalType: 'daily' | 'weekly';
  targetMinutes: number;
  currentMinutes: number;
  percentage: number;
  isAchieved: boolean;
}
