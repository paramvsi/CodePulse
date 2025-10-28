/**
 * Demo Mode Mock Data Service
 * Provides simulated data and events for demo dashboard
 */

import type { ProgrammingLanguage, ActivityType } from "@/types";

export interface DemoSession {
  id: string;
  startTime: Date;
  elapsedSeconds: number;
  projectName: string;
  language: ProgrammingLanguage;
  activityType: ActivityType;
  filesModified: number;
}

export interface DemoLanguageStats {
  language: ProgrammingLanguage;
  percentage: number;
  minutes: number;
  color: string;
}

export interface DemoFileSaveEvent {
  id: string;
  fileName: string;
  language: ProgrammingLanguage;
  timestamp: Date;
}

// Language color mapping
const LANGUAGE_COLORS: Record<ProgrammingLanguage, string> = {
  typescript: "#635BFF", // Electric Indigo
  javascript: "#FFD93D", // Amber
  python: "#35E2D1", // Soft Cyan
  java: "#FF6B6B", // Coral Red
  go: "#35E2D1", // Soft Cyan
  rust: "#FF6B6B", // Coral Red
  cpp: "#635BFF", // Electric Indigo
  csharp: "#4ECDC4", // Mint Green
  other: "#9BA1AB", // Cloud Gray
};

// Sample project names
const PROJECT_NAMES = [
  "CodePulse",
  "Next.js App",
  "API Server",
  "Dashboard UI",
  "Mobile App",
  "Analytics Engine",
];

// Sample file names by language
const FILE_NAMES: Record<ProgrammingLanguage, string[]> = {
  typescript: [
    "components/Dashboard.tsx",
    "lib/api/sessions.ts",
    "hooks/useTimer.ts",
    "types/analytics.ts",
    "app/dashboard/page.tsx",
  ],
  javascript: [
    "utils/helpers.js",
    "config/constants.js",
    "middleware/auth.js",
    "api/routes.js",
  ],
  python: [
    "models/session.py",
    "services/analytics.py",
    "utils/helpers.py",
    "api/endpoints.py",
  ],
  java: [
    "SessionController.java",
    "AnalyticsService.java",
    "UserRepository.java",
    "SecurityConfig.java",
  ],
  go: ["main.go", "handlers.go", "middleware.go", "utils.go"],
  rust: ["main.rs", "handlers.rs", "models.rs", "utils.rs"],
  cpp: ["main.cpp", "session.cpp", "analytics.h", "utils.cpp"],
  csharp: [
    "SessionController.cs",
    "AnalyticsService.cs",
    "UserRepository.cs",
    "Program.cs",
  ],
  other: ["README.md", "config.yml", "Dockerfile", "package.json"],
};

class DemoDataService {
  private currentSession: DemoSession | null = null;
  private languageStats: DemoLanguageStats[] = [];

  /**
   * Initialize demo session with random data
   */
  startDemoSession(): DemoSession {
    const languages: ProgrammingLanguage[] = ["typescript", "javascript", "python"];
    const randomLanguage = languages[Math.floor(Math.random() * languages.length)];
    const randomProject =
      PROJECT_NAMES[Math.floor(Math.random() * PROJECT_NAMES.length)];

    this.currentSession = {
      id: `demo-${Date.now()}`,
      startTime: new Date(),
      elapsedSeconds: 0,
      projectName: randomProject,
      language: randomLanguage,
      activityType: "coding",
      filesModified: 0,
    };

    // Initialize language stats
    this.languageStats = [
      {
        language: "typescript",
        percentage: 45,
        minutes: 135,
        color: LANGUAGE_COLORS.typescript,
      },
      {
        language: "javascript",
        percentage: 25,
        minutes: 75,
        color: LANGUAGE_COLORS.javascript,
      },
      {
        language: "python",
        percentage: 20,
        minutes: 60,
        color: LANGUAGE_COLORS.python,
      },
      {
        language: "other",
        percentage: 10,
        minutes: 30,
        color: LANGUAGE_COLORS.other,
      },
    ];

    return this.currentSession;
  }

  /**
   * Update session elapsed time
   */
  updateSessionTime(): DemoSession | null {
    if (!this.currentSession) return null;

    this.currentSession.elapsedSeconds += 1;
    return this.currentSession;
  }

  /**
   * Generate random file save event
   */
  generateFileSaveEvent(): DemoFileSaveEvent {
    const languages: ProgrammingLanguage[] = [
      "typescript",
      "javascript",
      "python",
      "java",
    ];
    const randomLanguage = languages[Math.floor(Math.random() * languages.length)];
    const fileNames = FILE_NAMES[randomLanguage];
    const randomFile = fileNames[Math.floor(Math.random() * fileNames.length)];

    if (this.currentSession) {
      this.currentSession.filesModified += 1;
    }

    return {
      id: `event-${Date.now()}`,
      fileName: randomFile,
      language: randomLanguage,
      timestamp: new Date(),
    };
  }

  /**
   * Get current session
   */
  getCurrentSession(): DemoSession | null {
    return this.currentSession;
  }

  /**
   * Get language statistics
   */
  getLanguageStats(): DemoLanguageStats[] {
    return this.languageStats;
  }

  /**
   * Get today's stats (simulated)
   */
  getTodayStats() {
    const totalMinutes = this.languageStats.reduce((sum, stat) => sum + stat.minutes, 0);
    const sessionCount = Math.floor(totalMinutes / 45); // ~45 min per session

    return {
      totalMinutes,
      sessionCount,
      currentStreak: 7,
      productivityScore: 87,
    };
  }

  /**
   * Reset demo session
   */
  reset(): void {
    this.currentSession = null;
  }
}

// Singleton instance
export const demoService = new DemoDataService();
