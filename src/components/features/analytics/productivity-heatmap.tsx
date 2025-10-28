"use client";

import { Card } from "@/components/ui/card";
import { Flame } from "lucide-react";

interface HeatmapData {
  date: string;
  hours: number;
}

interface ProductivityHeatmapProps {
  data: HeatmapData[];
}

export function ProductivityHeatmap({ data }: ProductivityHeatmapProps) {
  // Group data by weeks (7 days each)
  const weeks: HeatmapData[][] = [];
  for (let i = 0; i < data.length; i += 7) {
    weeks.push(data.slice(i, i + 7));
  }

  // Get intensity color based on hours
  const getIntensityColor = (hours: number) => {
    if (hours === 0) return "bg-deep-space";
    if (hours < 2) return "bg-electric-indigo/20";
    if (hours < 4) return "bg-electric-indigo/40";
    if (hours < 6) return "bg-electric-indigo/60";
    if (hours < 8) return "bg-electric-indigo/80";
    return "bg-electric-indigo";
  };

  const maxHours = Math.max(...data.map((d) => d.hours));

  return (
    <Card className="border-electric-indigo/20 bg-graphite p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-amber-warn" />
          <h3 className="text-lg font-semibold text-white">Productivity Heatmap</h3>
        </div>
        <div className="text-right">
          <p className="text-sm text-cloud-gray">Peak Day</p>
          <p className="text-2xl font-bold text-amber-warn">
            {maxHours.toFixed(1)}h
          </p>
        </div>
      </div>

      {/* Day labels */}
      <div className="mb-2 flex gap-2">
        <div className="w-12" /> {/* Spacer for week labels */}
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} className="flex-1 text-center text-xs text-cloud-gray">
            {day}
          </div>
        ))}
      </div>

      {/* Heatmap grid */}
      <div className="space-y-2">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex items-center gap-2">
            <div className="w-12 text-xs text-cloud-gray">
              Week {weekIndex + 1}
            </div>
            <div className="flex flex-1 gap-2">
              {week.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className="group relative flex-1"
                  style={{ aspectRatio: "1" }}
                >
                  <div
                    className={`h-full w-full rounded-md transition-all ${getIntensityColor(
                      day.hours
                    )} hover:ring-2 hover:ring-soft-cyan`}
                  />
                  {/* Tooltip */}
                  <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 group-hover:block">
                    <div className="rounded-lg border border-electric-indigo/20 bg-graphite px-3 py-2 shadow-lg">
                      <p className="whitespace-nowrap text-xs font-medium text-white">
                        {day.date}
                      </p>
                      <p className="text-sm font-bold text-electric-indigo">
                        {day.hours.toFixed(1)}h
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <span className="text-xs text-cloud-gray">Less</span>
        {[0, 2, 4, 6, 8].map((hours) => (
          <div
            key={hours}
            className={`h-4 w-4 rounded ${getIntensityColor(hours)}`}
          />
        ))}
        <span className="text-xs text-cloud-gray">More</span>
      </div>
    </Card>
  );
}
