"use client";

import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Code } from "lucide-react";

interface LanguageData {
  language: string;
  hours: number;
  percentage: number;
  color: string;
}

interface LanguageUsageChartProps {
  data: LanguageData[];
}

export function LanguageUsageChart({ data }: LanguageUsageChartProps) {
  const totalHours = data.reduce((acc, d) => acc + d.hours, 0);

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-lg border border-electric-indigo/20 bg-graphite p-3 shadow-lg">
          <p className="text-sm font-medium text-white">{data.language}</p>
          <p className="text-lg font-bold text-electric-indigo">
            {data.hours.toFixed(1)}h
          </p>
          <p className="text-xs text-cloud-gray">{data.percentage}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border-electric-indigo/20 bg-graphite p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code className="h-5 w-5 text-soft-cyan" />
          <h3 className="text-lg font-semibold text-white">Language Usage</h3>
        </div>
        <div className="text-right">
          <p className="text-sm text-cloud-gray">Total</p>
          <p className="text-2xl font-bold text-soft-cyan">
            {totalHours.toFixed(1)}h
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
        {/* Donut Chart */}
        <div className="h-[250px] flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={3}
                dataKey="hours"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    className="transition-opacity hover:opacity-80"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-3">
          {data.map((item) => (
            <div
              key={item.language}
              className="flex items-center justify-between rounded-lg bg-deep-space p-3 transition-all hover:bg-electric-indigo/5"
            >
              <div className="flex items-center gap-3">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm font-medium text-white">{item.language}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-white">{item.hours.toFixed(1)}h</p>
                <p className="text-xs text-cloud-gray">{item.percentage}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
