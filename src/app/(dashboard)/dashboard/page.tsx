import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - CodePulse",
  description: "Your productivity dashboard",
};

export default async function DashboardPage() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-deep-space">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Welcome back, {user?.firstName || "Developer"}! 👋
          </h1>
          <p className="mt-2 text-lg text-cloud-gray">
            Your productivity dashboard is coming soon!
          </p>
        </div>

        {/* Placeholder Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-electric-indigo/20 bg-graphite p-6">
            <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-electric-indigo/10 p-3">
              <svg
                className="h-6 w-6 text-electric-indigo"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">Today's Time</h3>
            <p className="mt-2 text-3xl font-bold text-electric-indigo">0h 0m</p>
            <p className="mt-1 text-sm text-cloud-gray">No sessions yet</p>
          </div>

          <div className="rounded-lg border border-soft-cyan/20 bg-graphite p-6">
            <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-soft-cyan/10 p-3">
              <svg
                className="h-6 w-6 text-soft-cyan"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">Current Streak</h3>
            <p className="mt-2 text-3xl font-bold text-soft-cyan">0 days</p>
            <p className="mt-1 text-sm text-cloud-gray">Start your first session!</p>
          </div>

          <div className="rounded-lg border border-mint-green/20 bg-graphite p-6">
            <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-mint-green/10 p-3">
              <svg
                className="h-6 w-6 text-mint-green"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">Weekly Goal</h3>
            <p className="mt-2 text-3xl font-bold text-mint-green">0%</p>
            <p className="mt-1 text-sm text-cloud-gray">0 / 20 hours</p>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="mt-12 rounded-lg border border-electric-indigo/20 bg-graphite p-8 text-center">
          <h2 className="text-2xl font-bold text-white">Dashboard Coming Soon!</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-cloud-gray">
            We're building your productivity dashboard with session tracking, analytics, and
            beautiful visualizations. Check back soon!
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <span className="rounded-md bg-electric-indigo/10 px-3 py-1 text-sm text-electric-indigo">
              ✓ Authentication
            </span>
            <span className="rounded-md bg-cloud-gray/10 px-3 py-1 text-sm text-cloud-gray">
              ○ Session Tracking
            </span>
            <span className="rounded-md bg-cloud-gray/10 px-3 py-1 text-sm text-cloud-gray">
              ○ Analytics
            </span>
            <span className="rounded-md bg-cloud-gray/10 px-3 py-1 text-sm text-cloud-gray">
              ○ Reports
            </span>
          </div>
        </div>

        {/* User Info (for testing) */}
        <div className="mt-8 rounded-lg border border-electric-indigo/10 bg-graphite/50 p-4">
          <p className="text-sm text-cloud-gray">
            Logged in as: <span className="text-white">{user?.emailAddresses[0]?.emailAddress}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
