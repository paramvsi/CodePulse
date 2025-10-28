import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ActiveSessionClient } from "@/components/features/session/active-session-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Active Session - CodePulse",
  description: "Your coding session in progress",
};

export default async function ActiveSessionPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return <ActiveSessionClient />;
}
