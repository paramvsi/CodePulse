"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export function FeatureCard({ icon: Icon, title, description, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Card className="group relative overflow-hidden border-electric-indigo/20 bg-graphite p-6 transition-all hover:border-electric-indigo/50 hover:shadow-lg hover:shadow-electric-indigo/20">
        {/* Background gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-electric-indigo/5 to-soft-cyan/5 opacity-0 transition-opacity group-hover:opacity-100" />

        <div className="relative">
          {/* Icon with pulse effect */}
          <div className="mb-4 inline-flex items-center justify-center">
            <div className="relative">
              <motion.div
                className="absolute inset-0 rounded-lg bg-electric-indigo/20 blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="relative rounded-lg bg-electric-indigo/10 p-3">
                <Icon className="h-6 w-6 text-electric-indigo" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* Title */}
          <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>

          {/* Description */}
          <p className="text-sm leading-relaxed text-cloud-gray">{description}</p>

          {/* Accent line */}
          <motion.div
            className="mt-4 h-0.5 w-0 bg-gradient-to-r from-electric-indigo to-soft-cyan"
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </Card>
    </motion.div>
  );
}
