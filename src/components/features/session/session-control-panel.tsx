"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, Pause, Square } from "lucide-react";
import { useSessionStore } from "@/lib/stores/session-store";
import { CustomSessionDialog } from "./custom-session-dialog";
import { toast } from "sonner";

export function SessionControlPanel() {
  const { isActive, isPaused, startSession, pauseSession, resumeSession, stopSession } =
    useSessionStore();

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCustomSession = () => {
    setDialogOpen(true);
  };

  const handleQuickStart = () => {
    startSession("Quick Session", "typescript", "coding");
    toast.success("Session started!", {
      description: "Timer is now running. Start coding!",
    });
  };

  const handlePause = () => {
    if (isPaused) {
      resumeSession();
      toast.info("Session resumed", {
        description: "Timer is now running again.",
      });
    } else {
      pauseSession();
      toast.info("Session paused", {
        description: "Timer is paused. Take a quick break!",
      });
    }
  };

  const handleStop = () => {
    stopSession();
    toast.success("Session completed!", {
      description: "Your session has been saved.",
    });
  };

  if (!isActive) {
    return (
      <>
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-white">Ready to Code?</h2>
          <p className="mb-6 text-cloud-gray">
            Start tracking your coding session and measure your productivity
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              onClick={handleQuickStart}
              size="lg"
              className="group relative overflow-hidden bg-electric-indigo px-8 text-base font-semibold text-white hover:bg-electric-indigo/90"
            >
              <Play className="mr-2 h-5 w-5" />
              Quick Start
              <motion.div
                className="absolute inset-0 bg-soft-cyan/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
            </Button>

            <Button
              onClick={handleCustomSession}
              size="lg"
              variant="outline"
              className="border-soft-cyan/50 px-8 text-base font-semibold text-soft-cyan hover:bg-soft-cyan/10 hover:text-soft-cyan"
            >
              Custom Session
            </Button>
          </div>
        </div>

        <CustomSessionDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      </>
    );
  }

  return (
    <div className="rounded-lg border border-electric-indigo/20 bg-graphite p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Session Controls</h3>
        <div className="flex items-center gap-2">
          <div
            className={`h-2 w-2 rounded-full ${
              isPaused ? "bg-amber-warn" : "bg-mint-green animate-pulse"
            }`}
          />
          <span className="text-sm text-cloud-gray">
            {isPaused ? "Paused" : "Active"}
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={handlePause}
          variant={isPaused ? "default" : "outline"}
          className={
            isPaused
              ? "flex-1 bg-soft-cyan hover:bg-soft-cyan/90"
              : "flex-1 border-amber-warn/50 text-amber-warn hover:bg-amber-warn/10 hover:text-amber-warn"
          }
        >
          {isPaused ? (
            <>
              <Play className="mr-2 h-4 w-4" />
              Resume
            </>
          ) : (
            <>
              <Pause className="mr-2 h-4 w-4" />
              Pause
            </>
          )}
        </Button>

        <Button
          onClick={handleStop}
          variant="outline"
          className="flex-1 border-coral-red/50 text-coral-red hover:bg-coral-red/10 hover:text-coral-red"
        >
          <Square className="mr-2 h-4 w-4" />
          Stop & Save
        </Button>
      </div>
    </div>
  );
}
