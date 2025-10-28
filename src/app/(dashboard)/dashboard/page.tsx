import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { DashboardClient } from "@/components/features/dashboard/dashboard-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - CodePulse",
  description: "Your productivity dashboard",
};

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return <DashboardClient userName="Developer" />;
}
