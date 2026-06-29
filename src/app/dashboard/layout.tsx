"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground transition-colors duration-300">
      {/* Left Sidebar */}
      <Sidebar isOpenMobile={isOpenMobile} setIsOpenMobile={setIsOpenMobile} />

      {/* Right Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden w-full">
        {/* Top Navbar Header */}
        <Navbar onOpenMenu={() => setIsOpenMobile(true)} />

        {/* Scrollable Viewport Page Content */}
        <main className="flex-1 overflow-y-auto p-6 w-full max-w-full bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
