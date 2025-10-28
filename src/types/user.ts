/**
 * User Types
 * Type definitions for user management and preferences
 */

export interface User {
  id: string;
  email: string;
  name?: string;
  avatarUrl?: string;
  timezone: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  userId: string;
  theme: 'dark' | 'light';
  accentColor: 'indigo' | 'cyan' | 'mint';
  breakInterval: number; // minutes
  breakDuration: number; // minutes
  enableBreakReminders: boolean;
  enableSoundNotifications: boolean;
  workHoursStart?: string; // HH:mm format
  workHoursEnd?: string; // HH:mm format
}

export interface Goal {
  id: string;
  userId: string;
  dailyTargetMinutes: number;
  weeklyTargetMinutes: number;
  currentStreak: number;
  longestStreak: number;
  createdAt: string;
  updatedAt: string;
}
