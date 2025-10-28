import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AnalyticsClient } from "@/components/features/analytics/analytics-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics - CodePulse",
  description: "Your coding analytics and productivity insights",
};

export default async function AnalyticsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return <AnalyticsClient />;
}
