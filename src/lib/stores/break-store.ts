/**
 * Break State Management with Zustand
 * Manages Pomodoro timer and break reminders
 */

import { create } from "zustand";

export type PomodoroPreset = 25 | 50 | 90;

interface BreakState {
  // Break timer data
  isBreakActive: boolean;
  breakStartTime: Date | null;
  breakElapsedSeconds: number;
  pomodoroInterval: number; // in minutes
  lastBreakTime: Date | null;

  // Pomodoro settings
  pomodoroPreset: PomodoroPreset;
  breakReminderEnabled: boolean;

  // Actions
  startBreak: () => void;
  stopBreak: () => void;
  updateBreakTime: () => void;
  setPomodoroInterval: (minutes: number) => void;
  setPomodoroPreset: (preset: PomodoroPreset) => void;
  setBreakReminderEnabled: (enabled: boolean) => void;
  checkBreakReminder: (sessionElapsedSeconds: number) => boolean;
  resetBreak: () => void;
}

export const useBreakStore = create<BreakState>((set, get) => ({
  // Initial state
  isBreakActive: false,
  breakStartTime: null,
  breakElapsedSeconds: 0,
  pomodoroInterval: 25, // default 25 minutes
  lastBreakTime: null,
  pomodoroPreset: 25,
  breakReminderEnabled: true,

  // Start a break
  startBreak: () => {
    set({
      isBreakActive: true,
      breakStartTime: new Date(),
      breakElapsedSeconds: 0,
    });
  },

  // Stop break and record time
  stopBreak: () => {
    set({
      isBreakActive: false,
      breakStartTime: null,
      breakElapsedSeconds: 0,
      lastBreakTime: new Date(),
    });
  },

  // Update break elapsed time
  updateBreakTime: () => {
    const state = get();
    if (state.isBreakActive) {
      set({ breakElapsedSeconds: state.breakElapsedSeconds + 1 });
    }
  },

  // Set custom pomodoro interval
  setPomodoroInterval: (minutes) => {
    set({ pomodoroInterval: minutes });
  },

  // Set pomodoro preset and interval
  setPomodoroPreset: (preset) => {
    set({
      pomodoroPreset: preset,
      pomodoroInterval: preset,
    });
  },

  // Toggle break reminders
  setBreakReminderEnabled: (enabled) => {
    set({ breakReminderEnabled: enabled });
  },

  // Check if user needs break reminder
  checkBreakReminder: (sessionElapsedSeconds) => {
    const state = get();
    if (!state.breakReminderEnabled) return false;

    const pomodoroSeconds = state.pomodoroInterval * 60;

    // Check if we've reached the interval
    if (sessionElapsedSeconds > 0 && sessionElapsedSeconds % pomodoroSeconds === 0) {
      return true;
    }

    return false;
  },

  // Reset break state
  resetBreak: () => {
    set({
      isBreakActive: false,
      breakStartTime: null,
      breakElapsedSeconds: 0,
    });
  },
}));
