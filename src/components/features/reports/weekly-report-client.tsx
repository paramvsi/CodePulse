"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ProductivityGauge } from "./productivity-gauge";
import { LanguageComparison } from "./language-comparison";
import { BreakCompliance } from "./break-compliance";
import { ArrowLeft, Download, Share2, Calendar } from "lucide-react";

interface WeeklyReportData {
  productivityScore: number;
  weekComparison: number;
  languages: Array<{
    language: string;
    thisWeek: number;
    lastWeek: number;
    change: number;
    color: string;
  }>;
  breakCompliance: {
    percentage: number;
    totalBreaks: number;
    missedBreaks: number;
  };
  summary: {
    totalHours: number;
    longestSession: number;
    averageDaily: number;
    topDay: string;
  };
}

export function WeeklyReportClient() {
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<WeeklyReportData | null>(null);

  // Fetch weekly report data
  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/reports/weekly");
        const result = await response.json();

        if (result.success) {
          setReport(result.data);
        }
      } catch (error) {
        console.error("Error fetching weekly report:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  if (loading || !report) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-deep-space">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-electric-indigo border-t-transparent" />
          <p className="text-lg text-cloud-gray">Generating your report...</p>
        </div>
      </div>
    );
  }

  const weekRange = (() => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    return `${startOfWeek.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${endOfWeek.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
  })();

  return (
    <div className="min-h-screen bg-deep-space">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4 text-cloud-gray hover:text-white">
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Weekly Report</h1>
              <div className="mt-2 flex items-center gap-2 text-cloud-gray">
                <Calendar className="h-4 w-4" />
                <p className="text-lg">{weekRange}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-electric-indigo/50 text-electric-indigo hover:bg-electric-indigo/10 hover:text-electric-indigo"
              >
                <Download className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
              <Button
                variant="outline"
                className="border-soft-cyan/50 text-soft-cyan hover:bg-soft-cyan/10 hover:text-soft-cyan"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Summary Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="mb-8 border-electric-indigo/20 bg-gradient-to-r from-electric-indigo/20 to-soft-cyan/20 p-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <p className="text-sm text-cloud-gray">Total Hours</p>
                <p className="mt-1 text-3xl font-bold text-white">
                  {report.summary.totalHours.toFixed(1)}h
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-cloud-gray">Longest Session</p>
                <p className="mt-1 text-3xl font-bold text-white">
                  {report.summary.longestSession.toFixed(1)}h
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-cloud-gray">Daily Average</p>
                <p className="mt-1 text-3xl font-bold text-white">
                  {report.summary.averageDaily.toFixed(1)}h
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-cloud-gray">Top Day</p>
                <p className="mt-1 text-3xl font-bold text-white">{report.summary.topDay}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="space-y-6"
        >
          {/* Productivity Score */}
          <ProductivityGauge
            score={report.productivityScore}
            weekComparison={report.weekComparison}
          />

          {/* Language Comparison */}
          <LanguageComparison data={report.languages} />

          {/* Break Compliance */}
          <BreakCompliance
            percentage={report.breakCompliance.percentage}
            totalBreaks={report.breakCompliance.totalBreaks}
            missedBreaks={report.breakCompliance.missedBreaks}
          />

          {/* Week Comparison */}
          <Card className="border-electric-indigo/20 bg-graphite p-8 text-center">
            <h3 className="mb-4 text-xl font-semibold text-white">Keep up the great work!</h3>
            <p className="mx-auto max-w-2xl text-lg text-cloud-gray">
              You coded for {report.summary.totalHours.toFixed(1)} hours this week. Your
              productivity score is {report.productivityScore}/100. {report.weekComparison >= 0
                ? `That's ${report.weekComparison}% more than last week!`
                : `Try to beat last week's performance!`}
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
