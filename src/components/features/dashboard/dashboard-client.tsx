"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SessionControlPanel } from "../session/session-control-panel";
import { SessionTimer } from "../session/session-timer";
import { PomodoroSettings } from "../breaks/pomodoro-settings";
import { BreakOverlay } from "../breaks/break-overlay";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, TrendingUp, Target, Maximize2, BarChart3, FileText } from "lucide-react";
import { useSessionStore } from "@/lib/stores/session-store";
import { useBreakStore } from "@/lib/stores/break-store";

interface DashboardClientProps {
  userName: string;
}

export function DashboardClient({ userName }: DashboardClientProps) {
  const { isActive, elapsedSeconds, projectName, language, updateElapsedTime } =
    useSessionStore();
  const { checkBreakReminder } = useBreakStore();
  const [showBreakOverlay, setShowBreakOverlay] = useState(false);

  // Update timer every second
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      updateElapsedTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, updateElapsedTime]);

  // Check for break reminders
  useEffect(() => {
    if (isActive && checkBreakReminder(elapsedSeconds)) {
      setShowBreakOverlay(true);
    }
  }, [isActive, elapsedSeconds, checkBreakReminder]);

  return (
    <div className="min-h-screen bg-deep-space">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Welcome back, {userName}! 👋
          </h1>
          <p className="mt-2 text-lg text-cloud-gray">
            {isActive
              ? "Your session is running. Keep up the great work!"
              : "Ready to start your coding session?"}
          </p>
        </div>

        {/* Session Timer and Controls - Side by Side on Desktop */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Active Session Display */}
          {isActive ? (
            <Card className="border-electric-indigo/20 bg-graphite p-8">
              <div className="text-center">
                <div className="mb-4 flex items-center justify-center gap-2">
                  <span className="text-lg font-semibold text-white">{projectName}</span>
                  <span className="rounded-full bg-soft-cyan/10 px-2 py-0.5 text-xs text-soft-cyan">
                    {language}
                  </span>
                </div>
                <SessionTimer elapsedSeconds={elapsedSeconds} isActive={!useSessionStore.getState().isPaused} />

                {/* View Full Session Button */}
                <div className="mt-6">
                  <Button
                    asChild
                    variant="outline"
                    className="border-soft-cyan/50 text-soft-cyan hover:bg-soft-cyan/10 hover:text-soft-cyan"
                  >
                    <Link href="/session">
                      <Maximize2 className="mr-2 h-4 w-4" />
                      View Full Session
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="border-electric-indigo/20 bg-graphite p-8">
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <p className="text-lg font-semibold text-cloud-gray">No Active Session</p>
                  <p className="mt-2 text-sm text-cloud-gray/70">Start a session to begin tracking</p>
                </div>
              </div>
            </Card>
          )}

          {/* Session Controls */}
          <Card className="border-electric-indigo/20 bg-graphite p-8">
            <SessionControlPanel />
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="border-electric-indigo/20 bg-graphite p-6">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div>
                <h3 className="text-lg font-semibold text-white">Track Your Progress</h3>
                <p className="text-sm text-cloud-gray">
                  View detailed analytics and charts
                </p>
              </div>
              <Button
                asChild
                className="bg-soft-cyan text-deep-space hover:bg-soft-cyan/90"
              >
                <Link href="/analytics">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Analytics
                </Link>
              </Button>
            </div>
          </Card>

          <Card className="border-electric-indigo/20 bg-graphite p-6">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div>
                <h3 className="text-lg font-semibold text-white">Weekly Summary</h3>
                <p className="text-sm text-cloud-gray">
                  Get your productivity report
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                className="border-electric-indigo/50 text-electric-indigo hover:bg-electric-indigo/10 hover:text-electric-indigo"
              >
                <Link href="/reports">
                  <FileText className="mr-2 h-4 w-4" />
                  View Report
                </Link>
              </Button>
            </div>
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="border-electric-indigo/20 bg-graphite p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-electric-indigo/10 p-3">
                <Activity className="h-6 w-6 text-electric-indigo" />
              </div>
              <div>
                <p className="text-sm text-cloud-gray">Today's Time</p>
                <p className="text-2xl font-bold text-white">0h 0m</p>
              </div>
            </div>
          </Card>

          <Card className="border-soft-cyan/20 bg-graphite p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-soft-cyan/10 p-3">
                <TrendingUp className="h-6 w-6 text-soft-cyan" />
              </div>
              <div>
                <p className="text-sm text-cloud-gray">Current Streak</p>
                <p className="text-2xl font-bold text-white">0 days</p>
              </div>
            </div>
          </Card>

          <Card className="border-mint-green/20 bg-graphite p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-mint-green/10 p-3">
                <Target className="h-6 w-6 text-mint-green" />
              </div>
              <div>
                <p className="text-sm text-cloud-gray">Weekly Goal</p>
                <p className="text-2xl font-bold text-white">0%</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Pomodoro Settings */}
        <div className="mb-8">
          <PomodoroSettings />
        </div>

        {/* Coming Soon Section */}
        <Card className="border-electric-indigo/20 bg-graphite p-8 text-center">
          <h2 className="text-2xl font-bold text-white">More Features Coming Soon!</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-cloud-gray">
            We're building analytics, reports, and advanced session management. For now, enjoy
            the session tracker!
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <span className="rounded-md bg-electric-indigo/10 px-3 py-1 text-sm text-electric-indigo">
              ✓ Authentication
            </span>
            <span className="rounded-md bg-electric-indigo/10 px-3 py-1 text-sm text-electric-indigo">
              ✓ Session Tracking
            </span>
            <span className="rounded-md bg-electric-indigo/10 px-3 py-1 text-sm text-electric-indigo">
              ✓ Break Reminders
            </span>
            <span className="rounded-md bg-cloud-gray/10 px-3 py-1 text-sm text-cloud-gray">
              ○ Analytics
            </span>
            <span className="rounded-md bg-cloud-gray/10 px-3 py-1 text-sm text-cloud-gray">
              ○ Reports
            </span>
          </div>
        </Card>
      </div>

      {/* Break Reminder Overlay */}
      <BreakOverlay isOpen={showBreakOverlay} onClose={() => setShowBreakOverlay(false)} />
    </div>
  );
}
