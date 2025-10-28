import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { sessionService } from "@/lib/api/mock/session-service";

/**
 * GET /api/sessions
 * Get all sessions for the authenticated user
 */
export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sessions = await sessionService.getSessions(userId);

    return NextResponse.json({
      success: true,
      data: sessions,
    });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return NextResponse.json(
      { error: "Failed to fetch sessions" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/sessions
 * Create a new session
 */
export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { projectName, language, activityType, notes } = body;

    // Validate required fields
    if (!projectName || !language || !activityType) {
      return NextResponse.json(
        { error: "Missing required fields: projectName, language, activityType" },
        { status: 400 }
      );
    }

    const session = await sessionService.createSession(userId, {
      projectName,
      language,
      activityType,
      notes,
    });

    return NextResponse.json({
      success: true,
      data: session,
    });
  } catch (error) {
    console.error("Error creating session:", error);
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 }
    );
  }
}
