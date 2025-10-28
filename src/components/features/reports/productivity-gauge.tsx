"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

interface ProductivityGaugeProps {
  score: number; // 0-100
  weekComparison: number; // Percentage change from last week
}

export function ProductivityGauge({ score, weekComparison }: ProductivityGaugeProps) {
  // Get color based on score
  const getColor = () => {
    if (score >= 80) return { bg: "bg-mint-green", text: "text-mint-green", label: "Excellent" };
    if (score >= 60) return { bg: "bg-amber-warn", text: "text-amber-warn", label: "Good" };
    return { bg: "bg-coral-red", text: "text-coral-red", label: "Needs Improvement" };
  };

  const color = getColor();
  const circumference = 2 * Math.PI * 70; // radius = 70
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <Card className="border-electric-indigo/20 bg-graphite p-8">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Productivity Score</h3>
        <div className="flex items-center gap-1 text-sm">
          <TrendingUp
            className={`h-4 w-4 ${weekComparison >= 0 ? "text-mint-green" : "rotate-180 text-coral-red"}`}
          />
          <span className={weekComparison >= 0 ? "text-mint-green" : "text-coral-red"}>
            {Math.abs(weekComparison)}%
          </span>
          <span className="text-cloud-gray">vs last week</span>
        </div>
      </div>

      <div className="flex flex-col items-center">
        {/* SVG Gauge */}
        <div className="relative">
          <svg width="200" height="200" className="rotate-[-90deg]">
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r="70"
              stroke="#1A1D24"
              strokeWidth="12"
              fill="none"
            />
            {/* Progress circle */}
            <motion.circle
              cx="100"
              cy="100"
              r="70"
              stroke={`var(--${color.bg.replace("bg-", "")})`}
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className={color.text}
              style={{
                filter: "drop-shadow(0 0 8px currentColor)",
              }}
            />
          </svg>

          {/* Score display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="text-center"
            >
              <p className={`text-5xl font-bold ${color.text}`}>{score}</p>
              <p className="text-sm text-cloud-gray">out of 100</p>
            </motion.div>
          </div>
        </div>

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-center"
        >
          <p className={`text-xl font-semibold ${color.text}`}>{color.label}</p>
          <p className="mt-2 text-sm text-cloud-gray">
            Based on coding time, consistency, and break adherence
          </p>
        </motion.div>
      </div>
    </Card>
  );
}
