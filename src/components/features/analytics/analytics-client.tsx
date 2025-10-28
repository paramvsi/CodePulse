"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DateRangeSelector, type DateRange } from "./date-range-selector";
import { DailyTimeChart } from "./daily-time-chart";
import { LanguageUsageChart } from "./language-usage-chart";
import { ProductivityHeatmap } from "./productivity-heatmap";
import { ArrowLeft, TrendingUp, Activity, Target, Zap } from "lucide-react";
import type {
  DailyTimeData,
  LanguageData,
  HeatmapData,
  ProjectData,
  AnalyticsSummary,
} from "@/lib/api/mock/analytics-service";

export function AnalyticsClient() {
  const [dateRange, setDateRange] = useState<DateRange>("week");
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<{
    dailyTime: DailyTimeData[];
    languages: LanguageData[];
    heatmap: HeatmapData[];
    projects: ProjectData[];
    summary: AnalyticsSummary;
  } | null>(null);

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/analytics?range=${dateRange}`);
        const result = await response.json();

        if (result.success) {
          setAnalytics(result.data);
        }
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [dateRange]);

  if (loading || !analytics) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-deep-space">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-electric-indigo border-t-transparent" />
          <p className="text-lg text-cloud-gray">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-deep-space">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="mb-4">
              <Button variant="ghost" asChild className="text-cloud-gray hover:text-white">
                <Link href="/dashboard">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Link>
              </Button>
            </div>
            <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
            <p className="mt-2 text-lg text-cloud-gray">
              Track your productivity and coding patterns
            </p>
          </div>
        </div>

        {/* Date Range Selector */}
        <div className="mb-8">
          <DateRangeSelector value={dateRange} onChange={setDateRange} />
        </div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          <Card className="border-electric-indigo/20 bg-graphite p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-electric-indigo/10 p-3">
                <Activity className="h-6 w-6 text-electric-indigo" />
              </div>
              <div>
                <p className="text-sm text-cloud-gray">Total Hours</p>
                <p className="text-2xl font-bold text-white">
                  {analytics.summary.totalHours.toFixed(1)}h
                </p>
              </div>
            </div>
          </Card>

          <Card className="border-soft-cyan/20 bg-graphite p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-soft-cyan/10 p-3">
                <Target className="h-6 w-6 text-soft-cyan" />
              </div>
              <div>
                <p className="text-sm text-cloud-gray">Total Sessions</p>
                <p className="text-2xl font-bold text-white">{analytics.summary.totalSessions}</p>
              </div>
            </div>
          </Card>

          <Card className="border-mint-green/20 bg-graphite p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-mint-green/10 p-3">
                <TrendingUp className="h-6 w-6 text-mint-green" />
              </div>
              <div>
                <p className="text-sm text-cloud-gray">Avg Session</p>
                <p className="text-2xl font-bold text-white">
                  {analytics.summary.averageSessionLength.toFixed(1)}h
                </p>
              </div>
            </div>
          </Card>

          <Card className="border-amber-warn/20 bg-graphite p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-amber-warn/10 p-3">
                <Zap className="h-6 w-6 text-amber-warn" />
              </div>
              <div>
                <p className="text-sm text-cloud-gray">Current Streak</p>
                <p className="text-2xl font-bold text-white">
                  {analytics.summary.currentStreak} days
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Charts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="space-y-6"
        >
          {/* Daily Time Chart */}
          <DailyTimeChart data={analytics.dailyTime} />

          {/* Language Usage and Heatmap - Side by Side on Desktop */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <LanguageUsageChart data={analytics.languages} />
            <ProductivityHeatmap data={analytics.heatmap} />
          </div>

          {/* Top Projects */}
          <Card className="border-electric-indigo/20 bg-graphite p-6">
            <h3 className="mb-6 text-lg font-semibold text-white">Top Projects</h3>
            <div className="space-y-4">
              {analytics.projects.map((project, index) => (
                <div
                  key={project.projectName}
                  className="flex items-center justify-between rounded-lg bg-deep-space p-4 transition-all hover:bg-electric-indigo/5"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-electric-indigo/10 text-lg font-bold text-electric-indigo">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-white">{project.projectName}</p>
                      <p className="text-sm text-cloud-gray">
                        {project.sessions} sessions
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-white">
                      {project.hours.toFixed(1)}h
                    </p>
                    <p className="text-sm text-cloud-gray">{project.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
