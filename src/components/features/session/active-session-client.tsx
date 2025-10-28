"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SessionTimer } from "./session-timer";
import { LanguageSelector } from "./language-selector";
import { ActivityTypeSelector } from "./activity-type-selector";
import { useSessionStore } from "@/lib/stores/session-store";
import { ArrowLeft, Pause, Play, Square } from "lucide-react";
import { toast } from "sonner";

export function ActiveSessionClient() {
  const router = useRouter();
  const {
    isActive,
    isPaused,
    elapsedSeconds,
    projectName,
    language,
    activityType,
    notes,
    setProjectName,
    setLanguage,
    setActivityType,
    setNotes,
    pauseSession,
    resumeSession,
    stopSession,
    updateElapsedTime,
  } = useSessionStore();

  // Redirect if no active session
  useEffect(() => {
    if (!isActive) {
      router.push("/dashboard");
    }
  }, [isActive, router]);

  // Update timer every second
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      updateElapsedTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, updateElapsedTime]);

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
    router.push("/dashboard");
  };

  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

  if (!isActive) {
    return null;
  }

  return (
    <div className="min-h-screen bg-deep-space">
      <div className="mx-auto max-w-5xl px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleBackToDashboard}
            className="text-cloud-gray hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>

          <div className="flex items-center gap-2">
            <div
              className={`h-3 w-3 rounded-full ${
                isPaused ? "bg-amber-warn" : "animate-pulse bg-mint-green"
              }`}
            />
            <span className="text-sm font-medium text-cloud-gray">
              {isPaused ? "Paused" : "Recording"}
            </span>
          </div>
        </div>

        {/* Timer Display */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="mb-8 border-electric-indigo/20 bg-graphite p-12">
            <SessionTimer elapsedSeconds={elapsedSeconds} isActive={!isPaused} />

            {/* Control Buttons */}
            <div className="mt-8 flex justify-center gap-4">
              <Button
                onClick={handlePause}
                size="lg"
                variant={isPaused ? "default" : "outline"}
                className={
                  isPaused
                    ? "bg-soft-cyan px-8 hover:bg-soft-cyan/90"
                    : "border-amber-warn/50 px-8 text-amber-warn hover:bg-amber-warn/10 hover:text-amber-warn"
                }
              >
                {isPaused ? (
                  <>
                    <Play className="mr-2 h-5 w-5" />
                    Resume
                  </>
                ) : (
                  <>
                    <Pause className="mr-2 h-5 w-5" />
                    Pause
                  </>
                )}
              </Button>

              <Button
                onClick={handleStop}
                size="lg"
                variant="outline"
                className="border-coral-red/50 px-8 text-coral-red hover:bg-coral-red/10 hover:text-coral-red"
              >
                <Square className="mr-2 h-5 w-5" />
                Stop & Save
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Session Details Form */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <Card className="border-electric-indigo/20 bg-graphite p-8">
            <h2 className="mb-6 text-2xl font-bold text-white">Session Details</h2>

            <div className="space-y-6">
              {/* Project Name */}
              <div className="space-y-2">
                <Label htmlFor="projectName" className="text-white">
                  Project Name
                </Label>
                <Input
                  id="projectName"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g., CodePulse Dashboard"
                  className="border-electric-indigo/20 bg-deep-space text-white placeholder:text-cloud-gray/50 focus:border-soft-cyan focus:ring-soft-cyan"
                />
              </div>

              {/* Language */}
              <div className="space-y-2">
                <Label className="text-white">Programming Language</Label>
                <LanguageSelector value={language} onChange={setLanguage} />
              </div>

              {/* Activity Type */}
              <div className="space-y-2">
                <Label className="text-white">Activity Type</Label>
                <ActivityTypeSelector value={activityType} onChange={setActivityType} />
              </div>

              {/* Session Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-white">
                  Session Notes
                </Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="What are you working on? Any challenges or insights?"
                  rows={4}
                  className="resize-none border-electric-indigo/20 bg-deep-space text-white placeholder:text-cloud-gray/50 focus:border-soft-cyan focus:ring-soft-cyan"
                />
                <p className="text-xs text-cloud-gray">
                  {notes.length} / 500 characters
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
