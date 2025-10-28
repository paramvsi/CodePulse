"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useBreakStore } from "@/lib/stores/break-store";
import { Coffee, X, Eye, Waves, Volume2 } from "lucide-react";

interface BreakOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const BREAK_ACTIVITIES = [
  {
    icon: Eye,
    title: "Eye Rest",
    description: "Look at something 20 feet away for 20 seconds",
    color: "soft-cyan",
  },
  {
    icon: Waves,
    title: "Stretch",
    description: "Stand up and stretch your body",
    color: "mint-green",
  },
  {
    icon: Coffee,
    title: "Hydrate",
    description: "Drink water or grab a healthy snack",
    color: "electric-indigo",
  },
  {
    icon: Volume2,
    title: "Breathe",
    description: "Take 5 deep breaths to relax",
    color: "soft-cyan",
  },
];

export function BreakOverlay({ isOpen, onClose }: BreakOverlayProps) {
  const {
    isBreakActive,
    breakElapsedSeconds,
    startBreak,
    stopBreak,
    updateBreakTime,
    pomodoroInterval,
  } = useBreakStore();

  // Timer for break duration
  useEffect(() => {
    if (!isBreakActive) return;

    const interval = setInterval(() => {
      updateBreakTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [isBreakActive, updateBreakTime]);

  const handleStartBreak = () => {
    startBreak();
  };

  const handleEndBreak = () => {
    stopBreak();
    onClose();
  };

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-deep-space/95 p-6 backdrop-blur-sm"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-6 top-6 rounded-full p-2 text-cloud-gray hover:bg-graphite hover:text-white"
            aria-label="Close break reminder"
          >
            <X className="h-6 w-6" />
          </button>

          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-2xl"
          >
            <Card className="border-soft-cyan/30 bg-graphite p-12 text-center shadow-2xl shadow-soft-cyan/20">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mb-6 inline-flex items-center justify-center rounded-full bg-soft-cyan/10 p-6"
              >
                <Coffee className="h-16 w-16 text-soft-cyan" />
              </motion.div>

              {/* Title */}
              <h2 className="mb-4 text-4xl font-bold text-white">
                Time for a Break!
              </h2>

              <p className="mb-8 text-lg text-cloud-gray">
                You've been coding for {pomodoroInterval} minutes. Take a short break to refresh your mind.
              </p>

              {/* Break Timer Display */}
              {isBreakActive && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 rounded-lg bg-deep-space p-6"
                >
                  <p className="mb-2 text-sm text-cloud-gray">Break Duration</p>
                  <p className="font-mono text-5xl font-bold text-soft-cyan">
                    {formatTime(breakElapsedSeconds)}
                  </p>
                </motion.div>
              )}

              {/* Break Activities */}
              <div className="mb-8 grid grid-cols-2 gap-4">
                {BREAK_ACTIVITIES.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <motion.div
                      key={activity.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Card className="border-electric-indigo/20 bg-deep-space p-4 transition-all hover:border-soft-cyan/50">
                        <Icon className="mb-2 h-6 w-6 text-soft-cyan" />
                        <p className="mb-1 font-semibold text-white">{activity.title}</p>
                        <p className="text-xs text-cloud-gray">{activity.description}</p>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4">
                {!isBreakActive ? (
                  <>
                    <Button
                      onClick={handleStartBreak}
                      size="lg"
                      className="bg-soft-cyan px-8 text-deep-space hover:bg-soft-cyan/90"
                    >
                      Start Break
                    </Button>
                    <Button
                      onClick={onClose}
                      size="lg"
                      variant="outline"
                      className="border-cloud-gray/30 px-8 text-cloud-gray hover:bg-cloud-gray/10 hover:text-cloud-gray"
                    >
                      Skip Break
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={handleEndBreak}
                    size="lg"
                    className="bg-mint-green px-8 text-deep-space hover:bg-mint-green/90"
                  >
                    End Break & Continue
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
