"use client";

import { Card } from "@/components/ui/card";
import { Code, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface LanguageComparisonData {
  language: string;
  thisWeek: number;
  lastWeek: number;
  change: number; // Percentage change
  color: string;
}

interface LanguageComparisonProps {
  data: LanguageComparisonData[];
}

export function LanguageComparison({ data }: LanguageComparisonProps) {
  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-mint-green" />;
    if (change < 0) return <TrendingDown className="h-4 w-4 text-coral-red" />;
    return <Minus className="h-4 w-4 text-cloud-gray" />;
  };

  const getTrendColor = (change: number) => {
    if (change > 0) return "text-mint-green";
    if (change < 0) return "text-coral-red";
    return "text-cloud-gray";
  };

  return (
    <Card className="border-electric-indigo/20 bg-graphite p-6">
      <div className="mb-6 flex items-center gap-2">
        <Code className="h-5 w-5 text-electric-indigo" />
        <h3 className="text-lg font-semibold text-white">Language Comparison</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-electric-indigo/20">
              <th className="pb-3 text-left text-sm font-medium text-cloud-gray">Language</th>
              <th className="pb-3 text-right text-sm font-medium text-cloud-gray">This Week</th>
              <th className="pb-3 text-right text-sm font-medium text-cloud-gray">Last Week</th>
              <th className="pb-3 text-right text-sm font-medium text-cloud-gray">Change</th>
            </tr>
          </thead>
          <tbody>
            {data.map((lang, index) => (
              <tr
                key={lang.language}
                className={`border-b border-electric-indigo/10 transition-colors hover:bg-electric-indigo/5 ${
                  index % 2 === 0 ? "bg-deep-space/50" : ""
                }`}
              >
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: lang.color }}
                    />
                    <span className="font-medium text-white">{lang.language}</span>
                  </div>
                </td>
                <td className="py-4 text-right font-semibold text-white">
                  {lang.thisWeek.toFixed(1)}h
                </td>
                <td className="py-4 text-right text-cloud-gray">
                  {lang.lastWeek.toFixed(1)}h
                </td>
                <td className="py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    {getTrendIcon(lang.change)}
                    <span className={`font-semibold ${getTrendColor(lang.change)}`}>
                      {Math.abs(lang.change)}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
