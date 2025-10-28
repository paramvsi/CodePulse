import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/**
 * GET /api/reports/weekly
 * Get weekly report data for the authenticated user
 */
export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Mock weekly report data
    // TODO: Replace with real data from Supabase in Phase 2
    const mockReport = {
      productivityScore: 78,
      weekComparison: 12,
      languages: [
        { language: "TypeScript", thisWeek: 18.5, lastWeek: 15.2, change: 21.7, color: "#3178C6" },
        { language: "JavaScript", thisWeek: 12.3, lastWeek: 14.1, change: -12.8, color: "#F7DF1E" },
        { language: "Python", thisWeek: 8.7, lastWeek: 6.5, change: 33.8, color: "#3776AB" },
        { language: "Go", thisWeek: 5.2, lastWeek: 4.8, change: 8.3, color: "#00ADD8" },
        { language: "Rust", thisWeek: 3.1, lastWeek: 2.9, change: 6.9, color: "#CE422B" },
      ],
      breakCompliance: {
        percentage: 72,
        totalBreaks: 18,
        missedBreaks: 7,
      },
      summary: {
        totalHours: 47.8,
        longestSession: 4.2,
        averageDaily: 6.8,
        topDay: "Thursday",
      },
    };

    return NextResponse.json({
      success: true,
      data: mockReport,
    });
  } catch (error) {
    console.error("Error fetching weekly report:", error);
    return NextResponse.json(
      { error: "Failed to fetch weekly report" },
      { status: 500 }
    );
  }
}
