"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import type { DemoLanguageStats } from "@/lib/api/mock/demo-service";

interface LanguageChartProps {
  data: DemoLanguageStats[];
}

export function LanguageChart({ data }: LanguageChartProps) {
  const chartData = data.map((stat) => ({
    name: stat.language.charAt(0).toUpperCase() + stat.language.slice(1),
    value: stat.percentage,
    minutes: stat.minutes,
    color: stat.color,
  }));

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
            label={({ name, value }) => `${name} ${value}%`}
            labelLine={false}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#1A1D24",
              border: "1px solid rgba(99, 91, 255, 0.2)",
              borderRadius: "0.5rem",
              color: "#FFFFFF",
            }}
            formatter={(value: number, name: string, props: any) => [
              `${props.payload.minutes} minutes (${value}%)`,
              name,
            ]}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            formatter={(value) => (
              <span className="text-sm text-cloud-gray">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
