"use client";

import { Card } from "@/components/ui/card";
import { Coffee } from "lucide-react";

interface BreakComplianceProps {
  percentage: number; // 0-100
  totalBreaks: number;
  missedBreaks: number;
}

export function BreakCompliance({ percentage, totalBreaks, missedBreaks }: BreakComplianceProps) {
  const getColor = () => {
    if (percentage >= 80) return { bg: "bg-mint-green", text: "text-mint-green" };
    if (percentage >= 50) return { bg: "bg-amber-warn", text: "text-amber-warn" };
    return { bg: "bg-coral-red", text: "text-coral-red" };
  };

  const color = getColor();

  return (
    <Card className="border-electric-indigo/20 bg-graphite p-6">
      <div className="mb-6 flex items-center gap-2">
        <Coffee className="h-5 w-5 text-soft-cyan" />
        <h3 className="text-lg font-semibold text-white">Break Compliance</h3>
      </div>

      <div className="space-y-6">
        {/* Progress Bar */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-cloud-gray">Compliance Rate</span>
            <span className={`text-2xl font-bold ${color.text}`}>{percentage}%</span>
          </div>
          <div className="h-4 overflow-hidden rounded-full bg-deep-space">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${color.bg}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-deep-space p-4 text-center">
            <p className="text-2xl font-bold text-mint-green">{totalBreaks}</p>
            <p className="text-sm text-cloud-gray">Breaks Taken</p>
          </div>
          <div className="rounded-lg bg-deep-space p-4 text-center">
            <p className="text-2xl font-bold text-coral-red">{missedBreaks}</p>
            <p className="text-sm text-cloud-gray">Breaks Missed</p>
          </div>
        </div>

        {/* Message */}
        <div className="rounded-lg bg-deep-space p-4">
          <p className="text-sm text-cloud-gray">
            {percentage >= 80
              ? "Great job! You're taking breaks regularly and maintaining healthy coding habits."
              : percentage >= 50
                ? "You're doing okay, but try to take more breaks to avoid burnout."
                : "You're missing too many breaks. Remember to rest your eyes and stretch!"}
          </p>
        </div>
      </div>
    </Card>
  );
}
