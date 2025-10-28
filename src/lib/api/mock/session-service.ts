/**
 * Mock Session Service
 * Provides CRUD operations for sessions with in-memory storage
 * TODO: Replace with Supabase client in Phase 2
 */

import type { Session } from "@/types";

class SessionService {
  private sessions: Session[] = [];

  /**
   * Get all sessions for a user
   */
  async getSessions(userId: string): Promise<Session[]> {
    return this.sessions.filter((session) => session.userId === userId);
  }

  /**
   * Get a specific session by ID
   */
  async getSessionById(sessionId: string): Promise<Session | null> {
    return this.sessions.find((session) => session.id === sessionId) || null;
  }

  /**
   * Create a new session
   */
  async createSession(
    userId: string,
    data: {
      projectName: string;
      language: string;
      activityType: string;
      notes?: string;
    }
  ): Promise<Session> {
    const newSession: Session = {
      id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      projectName: data.projectName,
      language: data.language as any,
      activityType: data.activityType as any,
      startTime: new Date().toISOString(),
      isActive: true,
      notes: data.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.sessions.push(newSession);
    return newSession;
  }

  /**
   * Update an existing session
   */
  async updateSession(
    sessionId: string,
    data: Partial<{
      projectName: string;
      language: string;
      activityType: string;
      notes: string;
      endTime: string;
      durationMinutes: number;
      isActive: boolean;
    }>
  ): Promise<Session | null> {
    const sessionIndex = this.sessions.findIndex((s) => s.id === sessionId);
    if (sessionIndex === -1) return null;

    this.sessions[sessionIndex] = {
      ...this.sessions[sessionIndex],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    return this.sessions[sessionIndex];
  }

  /**
   * End a session
   */
  async endSession(sessionId: string): Promise<Session | null> {
    const session = this.sessions.find((s) => s.id === sessionId);
    if (!session) return null;

    const endTime = new Date();
    const startTime = new Date(session.startTime);
    const durationMinutes = Math.round((endTime.getTime() - startTime.getTime()) / 60000);

    return this.updateSession(sessionId, {
      endTime: endTime.toISOString(),
      durationMinutes,
      isActive: false,
    });
  }

  /**
   * Delete a session
   */
  async deleteSession(sessionId: string): Promise<boolean> {
    const sessionIndex = this.sessions.findIndex((s) => s.id === sessionId);
    if (sessionIndex === -1) return false;

    this.sessions.splice(sessionIndex, 1);
    return true;
  }

  /**
   * Get today's sessions for a user
   */
  async getTodaySessions(userId: string): Promise<Session[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return this.sessions.filter((session) => {
      if (session.userId !== userId) return false;
      const sessionDate = new Date(session.startTime);
      sessionDate.setHours(0, 0, 0, 0);
      return sessionDate.getTime() === today.getTime();
    });
  }

  /**
   * Get active session for a user
   */
  async getActiveSession(userId: string): Promise<Session | null> {
    return this.sessions.find((s) => s.userId === userId && s.isActive) || null;
  }
}

// Export singleton instance
export const sessionService = new SessionService();
