"use client";

import { Card } from "@/components/ui/card";
import { Code, Bug, FileSearch, BookOpen, Lightbulb } from "lucide-react";
import type { ActivityType } from "@/types/session";

interface ActivityTypeSelectorProps {
  value: ActivityType;
  onChange: (activityType: ActivityType) => void;
}

const activityTypes: {
  value: ActivityType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}[] = [
  {
    value: "coding",
    label: "Coding",
    icon: Code,
    description: "Writing new code",
  },
  {
    value: "debugging",
    label: "Debugging",
    icon: Bug,
    description: "Fixing bugs",
  },
  {
    value: "review",
    label: "Review",
    icon: FileSearch,
    description: "Code review",
  },
  {
    value: "learning",
    label: "Learning",
    icon: BookOpen,
    description: "Research & docs",
  },
  {
    value: "planning",
    label: "Planning",
    icon: Lightbulb,
    description: "Architecture",
  },
];

export function ActivityTypeSelector({ value, onChange }: ActivityTypeSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {activityTypes.map((activity) => {
        const Icon = activity.icon;
        const isSelected = value === activity.value;

        return (
          <Card
            key={activity.value}
            onClick={() => onChange(activity.value)}
            className={`group cursor-pointer transition-all duration-200 ${
              isSelected
                ? "border-electric-indigo bg-electric-indigo/10 shadow-lg shadow-electric-indigo/20"
                : "border-electric-indigo/20 bg-graphite hover:border-electric-indigo/50 hover:bg-electric-indigo/5"
            }`}
          >
            <div className="flex flex-col items-center gap-2 p-4">
              <div
                className={`rounded-lg p-2 transition-colors ${
                  isSelected
                    ? "bg-electric-indigo/20 text-electric-indigo"
                    : "bg-electric-indigo/10 text-cloud-gray group-hover:text-electric-indigo"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-center">
                <p
                  className={`text-sm font-semibold ${
                    isSelected ? "text-white" : "text-cloud-gray group-hover:text-white"
                  }`}
                >
                  {activity.label}
                </p>
                <p className="mt-0.5 text-xs text-cloud-gray/70">{activity.description}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
