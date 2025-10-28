import { auth, currentUser } from "@clerk/nextjs/server";
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

  const user = await currentUser();
  const userName = user?.firstName || user?.username || "Developer";

  return <DashboardClient userName={userName} />;
}
