import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  className?: string;
}

export function StatCard({ title, value, icon: Icon, className = "" }: StatCardProps) {
  return (
    <div className={`bg-card border border-border p-5 rounded-2xl shadow-xs ${className}`}>
      <Icon className="w-8 h-8 text-gray-500 dark:text-gray-400" />
      <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mt-2">
        {title}
      </span>
      <span className="text-2xl font-black text-text-primary mt-1 block">
        {value}
      </span>
    </div>
  );
}
