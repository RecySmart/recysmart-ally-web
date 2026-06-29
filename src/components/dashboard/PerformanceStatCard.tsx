import React from "react";
import { LucideIcon } from "lucide-react";

interface PerformanceStatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  badgeText?: string;
  badgeType?: "success" | "neutral" | "none";
  iconTheme?: "green" | "blue" | "purple" | "orange";
}

export function PerformanceStatCard({
  title,
  value,
  icon: Icon,
  badgeText,
  badgeType = "none",
  iconTheme = "green",
}: PerformanceStatCardProps) {
  // Theme color maps for icon container
  const themeClasses = {
    green: "bg-emerald-50 text-emerald-500 dark:bg-emerald-950/10 dark:text-emerald-400",
    blue: "bg-blue-50 text-blue-500 dark:bg-blue-950/10 dark:text-blue-400",
    purple: "bg-purple-50 text-purple-500 dark:bg-purple-950/10 dark:text-purple-400",
    orange: "bg-orange-50 text-orange-500 dark:bg-orange-950/10 dark:text-orange-400",
  };

  // Badge styling maps
  const badgeClasses = {
    success: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
    neutral: "bg-gray-100 text-gray-400 dark:bg-zinc-800 dark:text-gray-500 border border-border",
    none: "",
  };

  return (
    <div className="bg-card border border-border p-5 rounded-2xl shadow-xs flex flex-col justify-between space-y-4">
      {/* Top row carrying Icon + Indicator badge */}
      <div className="flex justify-between items-start w-full">
        {/* Rounded square icon wrapper */}
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${themeClasses[iconTheme]}`}>
          <Icon className="w-5 h-5" />
        </div>

        {/* Badge pills */}
        {badgeText && badgeType !== "none" && (
          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${badgeClasses[badgeType]}`}>
            {badgeText}
          </span>
        )}
      </div>

      {/* Bottom text block */}
      <div>
        <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block">
          {title}
        </span>
        <span className="text-2xl font-black text-text-primary block mt-1 tracking-tight">
          {value}
        </span>
      </div>
    </div>
  );
}
