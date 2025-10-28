import { Hero } from "@/components/features/landing/hero";
import { FeaturesSection } from "@/components/features/landing/features-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CodePulse - The Rhythm of Your Productivity",
  description: "Visualize the pulse of your coding life. Track sessions, analyze productivity, and maintain focus with beautiful real-time analytics.",
};

export default function LandingPage() {
  return (
    <>
      <Hero />
      <FeaturesSection />

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
