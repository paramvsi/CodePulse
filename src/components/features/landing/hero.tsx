"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-deep-space px-6 py-24 sm:py-32 lg:px-8">
      {/* Gradient background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 blur-3xl">
          <div
            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-electric-indigo to-soft-cyan opacity-20"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>

      <div className="mx-auto max-w-4xl text-center">
        {/* Logo/Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full bg-electric-indigo blur-xl"
            />
            <Activity className="relative h-16 w-16 text-electric-indigo" strokeWidth={1.5} />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-5xl font-bold tracking-tight text-white sm:text-7xl"
        >
          Code<span className="text-electric-indigo">Pulse</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-6 text-xl leading-8 sm:text-2xl"
        >
          <span className="bg-gradient-to-r from-soft-cyan to-mint-green bg-clip-text text-transparent">
            The Rhythm of Your Productivity
          </span>
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-cloud-gray"
        >
          Visualize the pulse of your coding life. Track sessions, analyze productivity,
          and maintain focus with beautiful real-time analytics.
        </motion.p>

        {/* Animated Pulse Waveform */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="my-12"
        >
          <svg
            className="mx-auto h-24 w-full max-w-2xl"
            viewBox="0 0 800 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M0,50 L100,50 L120,30 L140,70 L160,50 L200,50 L220,20 L240,80 L260,50 L300,50 L320,40 L340,60 L360,50 L400,50 L420,30 L440,70 L460,50 L500,50 L520,20 L540,80 L560,50 L600,50 L620,40 L640,60 L660,50 L700,50 L720,30 L740,70 L760,50 L800,50"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 2, ease: "easeInOut" },
                opacity: { duration: 0.5 },
              }}
            />
            <motion.path
              d="M0,50 L100,50 L120,30 L140,70 L160,50 L200,50 L220,20 L240,80 L260,50 L300,50 L320,40 L340,60 L360,50 L400,50 L420,30 L440,70 L460,50 L500,50 L520,20 L540,80 L560,50 L600,50 L620,40 L640,60 L660,50 L700,50 L720,30 L740,70 L760,50 L800,50"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.3"
              animate={{
                strokeDashoffset: [0, -1600],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              strokeDasharray="10 10"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#635BFF" />
                <stop offset="50%" stopColor="#35E2D1" />
                <stop offset="100%" stopColor="#4ECDC4" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="group relative overflow-hidden bg-electric-indigo px-8 text-base font-semibold text-white transition-all hover:bg-electric-indigo/90 hover:shadow-lg hover:shadow-electric-indigo/50"
          >
            <Link href="/demo">
              <span className="relative z-10">Try Demo</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-soft-cyan to-electric-indigo opacity-0 transition-opacity group-hover:opacity-20"
                whileHover={{ scale: 1.05 }}
              />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-soft-cyan/50 px-8 text-base font-semibold text-soft-cyan transition-all hover:bg-soft-cyan/10 hover:text-soft-cyan hover:shadow-lg hover:shadow-soft-cyan/30"
          >
            <Link href="/sign-up">Sign Up Free</Link>
          </Button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-cloud-gray"
        >
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-mint-green" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-mint-green" />
            <span>Free forever</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-mint-green" />
            <span>Open source</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
