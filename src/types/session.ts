/**
 * Session Types
 * Type definitions for coding session management
 */

export type ActivityType = 'coding' | 'debugging' | 'review' | 'learning' | 'planning';

export type ProgrammingLanguage =
  | 'typescript'
  | 'javascript'
  | 'python'
  | 'java'
  | 'go'
  | 'rust'
  | 'cpp'
  | 'csharp'
  | 'other';

export interface Session {
  id: string;
  userId: string;
  projectName: string;
  language: ProgrammingLanguage;
  activityType: ActivityType;
  startTime: string; // ISO 8601 format
  endTime?: string; // ISO 8601 format
  durationMinutes?: number;
  notes?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SessionCreate {
  projectName: string;
  language: ProgrammingLanguage;
  activityType: ActivityType;
  notes?: string;
}

export interface SessionUpdate {
  projectName?: string;
  language?: ProgrammingLanguage;
  activityType?: ActivityType;
  notes?: string;
  endTime?: string;
  durationMinutes?: number;
  isActive?: boolean;
}

export interface SessionStats {
  totalSessions: number;
  totalMinutes: number;
  averageSessionMinutes: number;
  currentStreak: number;
  longestStreak: number;
}
