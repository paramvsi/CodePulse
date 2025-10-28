/**
 * Application Constants
 * Central configuration for app-wide constants and settings
 */

export const APP_NAME = "CodePulse";
export const APP_TAGLINE = "The Rhythm of Your Productivity";
export const APP_DESCRIPTION = "A developer productivity companion that visualizes the pulse of your coding life.";

export const ROUTES = {
  HOME: "/",
  DEMO: "/demo",
  DASHBOARD: "/dashboard",
  SESSION: "/session",
  ANALYTICS: "/analytics",
  SETTINGS: "/settings",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
} as const;

export const API_ROUTES = {
  SESSIONS: "/api/sessions",
  BREAKS: "/api/breaks",
  ANALYTICS: "/api/analytics",
} as const;

export const DEMO_CONFIG = {
  AUTO_SIMULATION_INTERVAL: 3000, // 3 seconds
  FILE_SAVE_INTERVAL: 5000, // 5 seconds
  BREAK_REMINDER_INTERVAL: 1500000, // 25 minutes
} as const;

export const LANGUAGE_ICONS: Record<string, string> = {
  typescript: "⚡",
  javascript: "📜",
  python: "🐍",
  java: "☕",
  go: "🔷",
  rust: "🦀",
  cpp: "⚙️",
  csharp: "#️⃣",
  other: "📝",
};

export const ACTIVITY_ICONS: Record<string, string> = {
  coding: "💻",
  debugging: "🐛",
  review: "👀",
  learning: "📚",
  planning: "🎯",
};
