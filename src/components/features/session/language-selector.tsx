"use client";

import { Card } from "@/components/ui/card";
import type { ProgrammingLanguage } from "@/types";
import {
  Zap,
  Code2,
  FileJson,
  Coffee,
  Box,
  Cog,
  Hash,
  FileCode,
  Cpu,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface LanguageSelectorProps {
  value: ProgrammingLanguage;
  onChange: (language: ProgrammingLanguage) => void;
}

const languages: {
  value: ProgrammingLanguage;
  label: string;
  icon: LucideIcon;
  color: string;
}[] = [
  { value: "typescript", label: "TypeScript", icon: Zap, color: "text-blue-400" },
  { value: "javascript", label: "JavaScript", icon: Code2, color: "text-yellow-400" },
  { value: "python", label: "Python", icon: FileJson, color: "text-green-400" },
  { value: "java", label: "Java", icon: Coffee, color: "text-orange-400" },
  { value: "go", label: "Go", icon: Box, color: "text-cyan-400" },
  { value: "rust", label: "Rust", icon: Cog, color: "text-orange-500" },
  { value: "cpp", label: "C++", icon: Cpu, color: "text-purple-400" },
  { value: "csharp", label: "C#", icon: Hash, color: "text-purple-500" },
  { value: "other", label: "Other", icon: FileCode, color: "text-gray-400" },
];

export function LanguageSelector({ value, onChange }: LanguageSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
      {languages.map((lang) => {
        const Icon = lang.icon;
        const isSelected = value === lang.value;

        return (
          <Card
            key={lang.value}
            onClick={() => onChange(lang.value)}
            className={`group cursor-pointer border p-3 text-center transition-all ${
              isSelected
                ? "border-electric-indigo bg-electric-indigo/10 shadow-lg shadow-electric-indigo/20"
                : "border-electric-indigo/20 bg-graphite hover:border-electric-indigo/50 hover:bg-electric-indigo/5"
            }`}
          >
            <Icon
              className={`mx-auto h-8 w-8 ${
                isSelected ? "text-electric-indigo" : `${lang.color} group-hover:text-electric-indigo`
              }`}
            />
            <div
              className={`mt-2 text-xs font-medium ${
                isSelected ? "text-electric-indigo" : "text-cloud-gray group-hover:text-white"
              }`}
            >
              {lang.label}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
