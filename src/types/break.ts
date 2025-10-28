/**
 * Break Types
 * Type definitions for break management and tracking
 */

export type BreakType = 'short' | 'medium' | 'long';

export interface Break {
  id: string;
  userId: string;
  breakTime: string; // ISO 8601 format
  durationMinutes: number;
  breakType: BreakType;
  completed: boolean;
  skipped: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BreakCreate {
  durationMinutes: number;
  breakType: BreakType;
}

export interface BreakUpdate {
  completed?: boolean;
  skipped?: boolean;
}

export interface BreakStats {
  totalBreaks: number;
  completedBreaks: number;
  skippedBreaks: number;
  complianceRate: number; // 0-100
  averageBreakMinutes: number;
}

export interface PomodoroPreset {
  name: string;
  workMinutes: number;
  breakMinutes: number;
  longBreakMinutes: number;
  sessionsBeforeLongBreak: number;
}

export const POMODORO_PRESETS: PomodoroPreset[] = [
  {
    name: 'Classic Pomodoro',
    workMinutes: 25,
    breakMinutes: 5,
    longBreakMinutes: 15,
    sessionsBeforeLongBreak: 4,
  },
  {
    name: 'Extended Focus',
    workMinutes: 50,
    breakMinutes: 10,
    longBreakMinutes: 20,
    sessionsBeforeLongBreak: 3,
  },
  {
    name: 'Deep Work',
    workMinutes: 90,
    breakMinutes: 15,
    longBreakMinutes: 30,
    sessionsBeforeLongBreak: 2,
  },
];
