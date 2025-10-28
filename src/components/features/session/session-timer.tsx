"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SessionTimerProps {
  elapsedSeconds: number;
  isActive?: boolean;
}

export function SessionTimer({ elapsedSeconds, isActive = true }: SessionTimerProps) {
  const [displayTime, setDisplayTime] = useState(elapsedSeconds);

  useEffect(() => {
    setDisplayTime(elapsedSeconds);
  }, [elapsedSeconds]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return {
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
        showHours: true,
      };
    }

    return {
      hours: "00",
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
      showHours: false,
    };
  };

  const time = formatTime(displayTime);

  return (
    <div className="relative">
      {/* Pulse animation background */}
      {isActive && (
        <motion.div
          className="absolute inset-0 -z-10 rounded-2xl bg-electric-indigo/20 blur-2xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Timer display */}
      <div className="flex items-center justify-center gap-2 font-mono text-6xl font-bold sm:text-7xl lg:text-8xl">
        {time.showHours && (
          <>
            <motion.span
              className="text-white"
              animate={isActive ? { opacity: [1, 0.7, 1] } : {}}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {time.hours}
            </motion.span>
            <span className="text-electric-indigo">:</span>
          </>
        )}

        <motion.span
          className="text-white"
          animate={isActive ? { opacity: [1, 0.7, 1] } : {}}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2,
          }}
        >
          {time.minutes}
        </motion.span>

        <span className="text-electric-indigo">:</span>

        <motion.span
          className="text-soft-cyan"
          animate={isActive ? { opacity: [1, 0.7, 1] } : {}}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
        >
          {time.seconds}
        </motion.span>
      </div>

      {/* Status indicator */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <motion.div
          className="h-2 w-2 rounded-full bg-mint-green"
          animate={
            isActive
              ? {
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 1, 0.5],
                }
              : {}
          }
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <span className="text-sm font-medium text-cloud-gray">
          {isActive ? "Session Active" : "Session Paused"}
        </span>
      </div>
    </div>
  );
}
