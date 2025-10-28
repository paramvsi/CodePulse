"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useBreakStore, type PomodoroPreset } from "@/lib/stores/break-store";
import { Coffee, Clock } from "lucide-react";

const PRESETS: { value: PomodoroPreset; label: string; description: string }[] = [
  { value: 25, label: "25 min", description: "Classic Pomodoro" },
  { value: 50, label: "50 min", description: "Deep Work" },
  { value: 90, label: "90 min", description: "Flow State" },
];

export function PomodoroSettings() {
  const { pomodoroPreset, setPomodoroPreset } = useBreakStore();

  return (
    <Card className="border-electric-indigo/20 bg-graphite p-6">
      <div className="mb-4 flex items-center gap-2">
        <Coffee className="h-5 w-5 text-soft-cyan" />
        <h3 className="text-lg font-semibold text-white">Break Reminder Settings</h3>
      </div>

      <div className="space-y-4">
        <div>
          <Label className="text-white">Pomodoro Interval</Label>
          <p className="mb-3 text-sm text-cloud-gray">
            Get reminded to take breaks after focused work sessions
          </p>

          <div className="grid grid-cols-3 gap-3">
            {PRESETS.map((preset) => {
              const isSelected = pomodoroPreset === preset.value;

              return (
                <Card
                  key={preset.value}
                  onClick={() => setPomodoroPreset(preset.value)}
                  className={`cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? "border-soft-cyan bg-soft-cyan/10 shadow-lg shadow-soft-cyan/20"
                      : "border-electric-indigo/20 bg-deep-space hover:border-soft-cyan/50 hover:bg-soft-cyan/5"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2 p-4">
                    <Clock
                      className={`h-6 w-6 ${
                        isSelected ? "text-soft-cyan" : "text-cloud-gray"
                      }`}
                    />
                    <div className="text-center">
                      <p
                        className={`text-lg font-bold ${
                          isSelected ? "text-white" : "text-cloud-gray"
                        }`}
                      >
                        {preset.label}
                      </p>
                      <p className="text-xs text-cloud-gray/70">{preset.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}
