/**
 * Session State Management with Zustand
 * Manages active coding sessions, timer state, and session data
 */

import { create } from "zustand";
import type { ProgrammingLanguage, ActivityType } from "@/types";

interface SessionState {
  // Session data
  isActive: boolean;
  isPaused: boolean;
  startTime: Date | null;
  elapsedSeconds: number;
  projectName: string;
  language: ProgrammingLanguage;
  activityType: ActivityType;
  notes: string;

  // Actions
  startSession: (
    projectName: string,
    language: ProgrammingLanguage,
    activityType: ActivityType,
    notes?: string
  ) => void;
  pauseSession: () => void;
  resumeSession: () => void;
  stopSession: () => void;
  updateElapsedTime: () => void;
  setProjectName: (name: string) => void;
  setLanguage: (language: ProgrammingLanguage) => void;
  setActivityType: (type: ActivityType) => void;
  setNotes: (notes: string) => void;
  resetSession: () => void;
}

export const useSessionStore = create<SessionState>((set, get) => ({
  // Initial state
  isActive: false,
  isPaused: false,
  startTime: null,
  elapsedSeconds: 0,
  projectName: "",
  language: "typescript",
  activityType: "coding",
  notes: "",

  // Start a new session
  startSession: (projectName, language, activityType, notes = "") => {
    set({
      isActive: true,
      isPaused: false,
      startTime: new Date(),
      elapsedSeconds: 0,
      projectName,
      language,
      activityType,
      notes,
    });
  },

  // Pause current session
  pauseSession: () => {
    set({ isPaused: true });
  },

  // Resume paused session
  resumeSession: () => {
    set({ isPaused: false });
  },

  // Stop and save session
  stopSession: async () => {
    const state = get();

    // Save session to API
    try {
      const response = await fetch("/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectName: state.projectName,
          language: state.language,
          activityType: state.activityType,
          notes: state.notes,
          durationMinutes: Math.round(state.elapsedSeconds / 60),
        }),
      });

      if (!response.ok) {
        console.error("Failed to save session");
      }
    } catch (error) {
      console.error("Error saving session:", error);
    }

    set({
      isActive: false,
      isPaused: false,
      startTime: null,
      elapsedSeconds: 0,
      projectName: "",
      notes: "",
    });
  },

  // Update elapsed time (called by timer interval)
  updateElapsedTime: () => {
    const state = get();
    if (state.isActive && !state.isPaused) {
      set({ elapsedSeconds: state.elapsedSeconds + 1 });
    }
  },

  // Update session properties
  setProjectName: (name) => set({ projectName: name }),
  setLanguage: (language) => set({ language }),
  setActivityType: (type) => set({ activityType: type }),
  setNotes: (notes) => set({ notes }),

  // Reset session state
  resetSession: () =>
    set({
      isActive: false,
      isPaused: false,
      startTime: null,
      elapsedSeconds: 0,
      projectName: "",
      language: "typescript",
      activityType: "coding",
      notes: "",
    }),
}));
