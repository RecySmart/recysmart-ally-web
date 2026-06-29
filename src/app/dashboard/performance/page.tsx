"use client";

import React from "react";
import { toast } from "sonner";
import {
  TrendingUp,
  Award,
  Users,
  Percent,
  Download,
  Calendar,
} from "lucide-react";

import { PerformanceStatCard } from "@/components/dashboard/PerformanceStatCard";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { TopRewardsList } from "@/components/dashboard/TopRewardsList";
import { TransactionHistoryTable } from "@/components/dashboard/TransactionHistoryTable";

export default function PerformancePage() {
  const handleExportReport = () => {
    toast.success("¡Exportación Exitosa!", {
      description:
        "Se ha generado y descargado el reporte de auditoría en formato PDF.",
    });
  };

  const handlePeriodChange = () => {
    toast.info("Filtrar Período", {
      description: "Próximamente: Cambio de rango de fecha para estadísticas.",
    });
  };

  return (
    <div className="space-y-6 md:space-y-8 select-none">
      {/* 1. Page Header (stacks on mobile, side-by-side on desktop) */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        {/* Title / Description */}
        <div className="space-y-1">
          <h1 className="text-xl md:text-2xl font-black text-text-primary tracking-tight">
            Rendimiento y Estadísticas
          </h1>
          <p className="text-xs md:text-sm text-gray-400 dark:text-gray-500 font-medium">
            Analiza el impacto de tus recompensas y el tráfico de clientes
            generado.
          </p>
        </div>

        {/* Header Action triggers */}
        <div className="flex items-center gap-3 w-full sm:w-auto sm:justify-end">
          {/* Timeframe Filter Dropdown */}
          <button
            onClick={handlePeriodChange}
            className="w-1/2 sm:w-auto h-11 px-4 bg-card hover:bg-canvas-base border border-border text-text-primary font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>Últimos 30 días</span>
          </button>

          {/* Export Report Trigger */}
          <button
            onClick={handleExportReport}
            className="w-1/2 sm:w-auto h-11 px-5 bg-text-primary hover:bg-text-primary/95 text-card font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Exportar Reporte</span>
          </button>
        </div>
      </div>

      {/* 2. Metrics summary card grids (1 col on mobile, 2 cols on tablet, 4 cols on desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <PerformanceStatCard
          title="Cupones Canjeados"
          value="1,240"
          icon={Award}
          badgeText="+12%"
          badgeType="success"
          iconTheme="green"
        />
        <PerformanceStatCard
          title="Puntos Recaudados"
          value="45.2k"
          icon={TrendingUp}
          badgeText="+8%"
          badgeType="success"
          iconTheme="blue"
        />
        <PerformanceStatCard
          title="Clientes Únicos"
          value="842"
          icon={Users}
          badgeText="Manteniéndose"
          badgeType="neutral"
          iconTheme="purple"
        />
        <PerformanceStatCard
          title="Tasa de Conversión"
          value="68%"
          icon={Percent}
          badgeType="none"
          iconTheme="orange"
        />
      </div>

      {/* 3. Midsection details (Chart left, Leaderboard right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Performance Chart bar layout (spanning 2 columns on desktop) */}
        <div className="lg:col-span-2 flex">
          <PerformanceChart />
        </div>

        {/* Top Product leaderboard layout (spanning 1 column on desktop) */}
        <div className="lg:col-span-1 flex">
          <TopRewardsList />
        </div>
      </div>

      {/* 4. Bottom section: horizontaly scrollable transaction table */}
      <div>
        <TransactionHistoryTable />
      </div>
    </div>
  );
}
