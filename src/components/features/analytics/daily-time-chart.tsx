"use client";

import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Clock } from "lucide-react";

interface DailyTimeData {
  date: string;
  hours: number;
}

interface DailyTimeChartProps {
  data: DailyTimeData[];
}

export function DailyTimeChart({ data }: DailyTimeChartProps) {
  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border border-electric-indigo/20 bg-graphite p-3 shadow-lg">
          <p className="text-sm font-medium text-white">{payload[0].payload.date}</p>
          <p className="text-lg font-bold text-electric-indigo">
            {payload[0].value.toFixed(1)}h
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border-electric-indigo/20 bg-graphite p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-electric-indigo" />
          <h3 className="text-lg font-semibold text-white">Daily Coding Time</h3>
        </div>
        <div className="text-right">
          <p className="text-sm text-cloud-gray">Total</p>
          <p className="text-2xl font-bold text-electric-indigo">
            {data.reduce((acc, d) => acc + d.hours, 0).toFixed(1)}h
          </p>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#635BFF" stopOpacity={1} />
                <stop offset="100%" stopColor="#35E2D1" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1A1D24" />
            <XAxis
              dataKey="date"
              stroke="#9BA1AB"
              style={{ fontSize: "12px" }}
              tickLine={false}
            />
            <YAxis
              stroke="#9BA1AB"
              style={{ fontSize: "12px" }}
              tickLine={false}
              tickFormatter={(value) => `${value}h`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(99, 91, 255, 0.1)" }} />
            <Bar dataKey="hours" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
