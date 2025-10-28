import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { WeeklyReportClient } from "@/components/features/reports/weekly-report-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weekly Report - CodePulse",
  description: "Your weekly productivity report and insights",
};

export default async function WeeklyReportPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return <WeeklyReportClient />;
}
