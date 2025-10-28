"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { SessionTimer } from "@/components/features/session/session-timer";
import { LanguageChart } from "@/components/features/analytics/language-chart";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Coffee, TrendingUp, FileCode } from "lucide-react";
import Link from "next/link";
import { demoService, type DemoSession } from "@/lib/api/mock/demo-service";

export default function DemoPage() {
  const [session, setSession] = useState<DemoSession | null>(null);
  const [showBreakModal, setShowBreakModal] = useState(false);

  useEffect(() => {
    // Start demo session
    const initialSession = demoService.startDemoSession();
    setSession(initialSession);

    // Update timer every second
    const timerInterval = setInterval(() => {
      const updatedSession = demoService.updateSessionTime();
      if (updatedSession) {
        setSession({ ...updatedSession });
      }
    }, 1000);

    // Simulate file save events every 5 seconds
    const fileSaveInterval = setInterval(() => {
      const event = demoService.generateFileSaveEvent();
      toast.success(`Saved ${event.fileName}`, {
        description: `${event.language} • Just now`,
        duration: 3000,
      });
    }, 5000);

    // Show break reminder after 25 seconds (simulating 25 minutes)
    const breakTimeout = setTimeout(() => {
      setShowBreakModal(true);
    }, 25000);

    return () => {
      clearInterval(timerInterval);
      clearInterval(fileSaveInterval);
      clearTimeout(breakTimeout);
      demoService.reset();
    };
  }, []);

  const languageStats = demoService.getLanguageStats();
  const todayStats = demoService.getTodayStats();

  return (
    <div className="min-h-screen bg-deep-space">
      {/* Demo Banner */}
      <div className="border-b border-electric-indigo/20 bg-graphite">
        <div className="mx-auto max-w-7xl px-6 py-3">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-electric-indigo" />
              <span className="text-sm font-medium text-white">Demo Mode Active</span>
              <span className="rounded-full bg-electric-indigo/10 px-2 py-0.5 text-xs text-electric-indigo">
                Auto-Simulating
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/sign-up">
                <Button
                  size="sm"
                  className="bg-electric-indigo hover:bg-electric-indigo/90"
                >
                  Create Free Account
                </Button>
              </Link>
              <Link href="/">
                <Button size="sm" variant="outline" className="text-cloud-gray hover:text-cloud-gray">
                  Exit Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Code<span className="text-electric-indigo">Pulse</span> Dashboard
          </h1>
          <p className="mt-2 text-lg text-cloud-gray">
            Watch your productivity pulse in real-time
          </p>
        </div>

        {/* Timer Section */}
        <Card className="mb-8 border-electric-indigo/20 bg-graphite p-8">
          <div className="text-center">
            <div className="mb-4 flex items-center justify-center gap-2">
              <FileCode className="h-5 w-5 text-soft-cyan" />
              <span className="text-lg font-semibold text-white">
                {session?.projectName || "Loading..."}
              </span>
              <span className="rounded-full bg-soft-cyan/10 px-2 py-0.5 text-xs text-soft-cyan">
                {session?.language}
              </span>
            </div>
            <SessionTimer elapsedSeconds={session?.elapsedSeconds || 0} isActive={true} />
            <div className="mt-6 flex items-center justify-center gap-6 text-sm">
              <div>
                <span className="text-cloud-gray">Files Modified: </span>
                <span className="font-semibold text-white">
                  {session?.filesModified || 0}
                </span>
              </div>
              <div>
                <span className="text-cloud-gray">Activity: </span>
                <span className="font-semibold text-mint-green">Coding</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="border-electric-indigo/20 bg-graphite p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-electric-indigo/10 p-3">
                <Activity className="h-6 w-6 text-electric-indigo" />
              </div>
              <div>
                <p className="text-sm text-cloud-gray">Today's Time</p>
                <p className="text-2xl font-bold text-white">{todayStats.totalMinutes}m</p>
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
                <p className="text-2xl font-bold text-white">{todayStats.currentStreak} days</p>
              </div>
            </div>
          </Card>

          <Card className="border-mint-green/20 bg-graphite p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-mint-green/10 p-3">
                <Coffee className="h-6 w-6 text-mint-green" />
              </div>
              <div>
                <p className="text-sm text-cloud-gray">Sessions</p>
                <p className="text-2xl font-bold text-white">{todayStats.sessionCount}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Language Usage Chart */}
        <Card className="border-electric-indigo/20 bg-graphite p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">Language Usage</h2>
          <LanguageChart data={languageStats} />
        </Card>
      </div>

      {/* Break Reminder Modal */}
      {showBreakModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-deep-space/80 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mx-4 w-full max-w-md rounded-lg border border-amber-warn/20 bg-graphite p-8 shadow-2xl"
          >
            <div className="text-center">
              <div className="mb-4 inline-flex items-center justify-center rounded-full bg-amber-warn/10 p-4">
                <Coffee className="h-8 w-8 text-amber-warn" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white">Time for a Break!</h3>
              <p className="mb-6 text-cloud-gray">
                You've been coding for 25 minutes. Take a 5-minute break to stay fresh and
                productive.
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowBreakModal(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Skip
                </Button>
                <Button
                  onClick={() => {
                    toast.success("Break started! Come back in 5 minutes.");
                    setShowBreakModal(false);
                  }}
                  className="flex-1 bg-amber-warn text-deep-space hover:bg-amber-warn/90"
                >
                  Start Break
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
