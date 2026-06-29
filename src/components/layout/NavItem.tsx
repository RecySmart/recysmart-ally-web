"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavItemType {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavItemProps {
  item: NavItemType;
  collapsed: boolean;
  onClick?: () => void;
}

export function NavItem({ item, collapsed, onClick }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      title={collapsed ? item.name : undefined}
      onClick={onClick}
      className={`flex items-center rounded-xl font-medium transition-all duration-200 ${
        collapsed ? "justify-center p-3" : "px-4 py-3"
      } ${
        isActive
          ? "bg-brand-green/10 text-brand-green font-semibold shadow-xs"
          : "text-gray-500 hover:bg-canvas-base hover:text-text-primary dark:text-gray-400 dark:hover:bg-zinc-900/60 dark:hover:text-zinc-50"
      }`}
    >
      <Icon className={`w-5 h-5 shrink-0 transition-all ${collapsed ? "mr-0" : "mr-3"}`} />
      {!collapsed && <span className="truncate text-sm">{item.name}</span>}
    </Link>
  );
}
