import { Hero } from "@/components/features/landing/hero";
import { FeatureCard } from "@/components/features/landing/feature-card";
import { Activity, BarChart3, Coffee, Zap, Target, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CodePulse - The Rhythm of Your Productivity",
  description: "Visualize the pulse of your coding life. Track sessions, analyze productivity, and maintain focus with beautiful real-time analytics.",
};

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

export default function LandingPage() {
  return (
    <>
      <Hero />

      {/* Features Section */}
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

      {/* CTA Section */}
      <section className="bg-gradient-to-b from-deep-space to-graphite px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to find your rhythm?
          </h2>
          <p className="mt-6 text-lg leading-8 text-cloud-gray">
            Join developers who are taking control of their productivity. Start tracking
            your coding sessions today.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="/demo"
              className="inline-flex items-center justify-center rounded-md bg-electric-indigo px-8 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-electric-indigo/90 hover:shadow-electric-indigo/50"
            >
              Try Demo Now
            </a>
            <a
              href="/sign-up"
              className="inline-flex items-center justify-center rounded-md border border-soft-cyan/50 px-8 py-3 text-base font-semibold text-soft-cyan transition-all hover:bg-soft-cyan/10 hover:shadow-lg hover:shadow-soft-cyan/30"
            >
              Get Started Free
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
