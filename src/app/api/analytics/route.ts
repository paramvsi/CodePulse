import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { analyticsService } from "@/lib/api/mock/analytics-service";
import type { DateRange } from "@/components/features/analytics/date-range-selector";

/**
 * GET /api/analytics?range=week
 * Get analytics data for the authenticated user
 */
export async function GET(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get date range from query params
    const { searchParams } = new URL(request.url);
    const range = (searchParams.get("range") as DateRange) || "week";

    // Validate range
    const validRanges: DateRange[] = ["today", "week", "month", "year"];
    if (!validRanges.includes(range)) {
      return NextResponse.json(
        { error: "Invalid range. Must be one of: today, week, month, year" },
        { status: 400 }
      );
    }

    const analytics = await analyticsService.getAnalytics(userId, range);

    return NextResponse.json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
