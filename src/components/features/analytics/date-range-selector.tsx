"use client";

import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export type DateRange = "today" | "week" | "month" | "year";

interface DateRangeSelectorProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

const ranges: { value: DateRange; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
  { value: "year", label: "This Year" },
];

export function DateRangeSelector({ value, onChange }: DateRangeSelectorProps) {
  return (
    <Card className="border-electric-indigo/20 bg-graphite p-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-cloud-gray">
          <Calendar className="h-5 w-5" />
          <span className="text-sm font-medium">Period:</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {ranges.map((range) => {
            const isSelected = value === range.value;

            return (
              <button
                key={range.value}
                onClick={() => onChange(range.value)}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
                  isSelected
                    ? "bg-electric-indigo text-white shadow-lg shadow-electric-indigo/30"
                    : "bg-deep-space text-cloud-gray hover:bg-electric-indigo/10 hover:text-white"
                }`}
              >
                {range.label}
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
