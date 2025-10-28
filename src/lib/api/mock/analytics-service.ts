/**
 * Mock Analytics Service
 * Provides analytics data aggregation with mock data
 * TODO: Replace with Supabase client in Phase 2
 */

import type { DateRange } from "@/components/features/analytics/date-range-selector";

export interface DailyTimeData {
  date: string;
  hours: number;
}

export interface LanguageData {
  language: string;
  hours: number;
  percentage: number;
  color: string;
  [key: string]: string | number;
}

export interface HeatmapData {
  date: string;
  hours: number;
}

export interface ProjectData {
  projectName: string;
  hours: number;
  sessions: number;
  percentage: number;
}

export interface AnalyticsSummary {
  totalHours: number;
  totalSessions: number;
  averageSessionLength: number;
  mostProductiveDay: string;
  topLanguage: string;
  currentStreak: number;
}

class AnalyticsService {
  // Language colors mapping
  private languageColors: Record<string, string> = {
    TypeScript: "#3178C6",
    JavaScript: "#F7DF1E",
    Python: "#3776AB",
    Java: "#ED8B00",
    Go: "#00ADD8",
    Rust: "#CE422B",
    "C++": "#00599C",
    "C#": "#239120",
    Other: "#6B7280",
  };

  /**
   * Generate mock daily time data
   */
  private generateDailyTimeData(range: DateRange): DailyTimeData[] {
    const data: DailyTimeData[] = [];
    const today = new Date();
    let days = 0;

    switch (range) {
      case "today":
        days = 1;
        break;
      case "week":
        days = 7;
        break;
      case "month":
        days = 30;
        break;
      case "year":
        days = 365;
        break;
    }

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      const dateStr = range === "year"
        ? date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
        : date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

      // Generate realistic hours (0-10 hours per day)
      const hours = Math.random() * 8 + Math.random() * 2;

      data.push({
        date: dateStr,
        hours: parseFloat(hours.toFixed(1)),
      });
    }

    return data;
  }

  /**
   * Generate mock language usage data
   */
  private generateLanguageData(): LanguageData[] {
    const languages = [
      { language: "TypeScript", hours: 42.5 },
      { language: "JavaScript", hours: 28.3 },
      { language: "Python", hours: 18.7 },
      { language: "Go", hours: 12.1 },
      { language: "Rust", hours: 8.4 },
    ];

    const totalHours = languages.reduce((acc, lang) => acc + lang.hours, 0);

    return languages.map((lang) => ({
      ...lang,
      percentage: parseFloat(((lang.hours / totalHours) * 100).toFixed(1)),
      color: this.languageColors[lang.language] || "#6B7280",
    }));
  }

  /**
   * Generate mock heatmap data
   */
  private generateHeatmapData(): HeatmapData[] {
    const data: HeatmapData[] = [];
    const today = new Date();
    const days = 28; // 4 weeks

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      const hours = Math.random() * 10;

      data.push({
        date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        hours: parseFloat(hours.toFixed(1)),
      });
    }

    return data;
  }

  /**
   * Generate mock project data
   */
  private generateProjectData(): ProjectData[] {
    const projects = [
      { projectName: "CodePulse Dashboard", hours: 45.2, sessions: 38 },
      { projectName: "E-commerce Platform", hours: 32.8, sessions: 24 },
      { projectName: "Mobile App", hours: 21.5, sessions: 19 },
      { projectName: "API Services", hours: 15.3, sessions: 12 },
      { projectName: "Quick Sessions", hours: 8.2, sessions: 15 },
    ];

    const totalHours = projects.reduce((acc, proj) => acc + proj.hours, 0);

    return projects.map((proj) => ({
      ...proj,
      percentage: parseFloat(((proj.hours / totalHours) * 100).toFixed(1)),
    }));
  }

  /**
   * Generate analytics summary
   */
  private generateSummary(): AnalyticsSummary {
    return {
      totalHours: 123.0,
      totalSessions: 108,
      averageSessionLength: 1.14,
      mostProductiveDay: "Thursday",
      topLanguage: "TypeScript",
      currentStreak: 7,
    };
  }

  /**
   * Get analytics for a specific date range
   */
  async getAnalytics(userId: string, range: DateRange) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    return {
      dailyTime: this.generateDailyTimeData(range),
      languages: this.generateLanguageData(),
      heatmap: this.generateHeatmapData(),
      projects: this.generateProjectData(),
      summary: this.generateSummary(),
    };
  }
}

// Export singleton instance
export const analyticsService = new AnalyticsService();
