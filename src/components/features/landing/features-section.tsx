"use client";

import { FeatureCard } from "./feature-card";
import { Activity, BarChart3, Coffee, Zap, Target, Clock } from "lucide-react";

const features = [
  {
    icon: Activity,
    title: "Real-Time Session Tracking",
    description: "Monitor your coding sessions as they happen with live timers and automatic activity detection.",
  },
  {
    icon: BarChart3,
    title: "Beautiful Analytics",
    description: "Visualize your productivity with stunning charts, heatmaps, and insights that matter.",
  },
  {
    icon: Coffee,
    title: "Smart Break Management",
    description: "Stay healthy with Pomodoro timers and gentle break reminders to maintain peak performance.",
  },
  {
    icon: Zap,
    title: "Language Detection",
    description: "Automatically track which programming languages you use and how much time you spend on each.",
  },
  {
    icon: Target,
    title: "Goal Setting & Streaks",
    description: "Set daily and weekly goals, build streaks, and celebrate your productivity milestones.",
  },
  {
    icon: Clock,
    title: "Project Time Breakdown",
    description: "See exactly where your time goes with detailed project-level analytics and reports.",
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-deep-space px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Everything you need to track your{" "}
            <span className="bg-gradient-to-r from-electric-indigo to-soft-cyan bg-clip-text text-transparent">
              coding pulse
            </span>
          </h2>
          <p className="mt-4 text-lg text-cloud-gray">
            Simple, powerful, and built for developers who care about their productivity.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
