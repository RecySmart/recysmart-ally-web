import React from "react";
import Link from "next/link";

export function TopRewardsList() {
  const topRewards = [
    {
      title: "Café Americano",
      cost: "200 Pts",
      count: "482",
      theme: "bg-amber-50 text-amber-600 dark:bg-amber-950/10 dark:text-amber-400",
    },
    {
      title: "Galleta de Avena",
      cost: "150 Pts",
      count: "315",
      theme: "bg-orange-50 text-orange-600 dark:bg-orange-950/10 dark:text-orange-400",
    },
    {
      title: "20% Dscto. Frutas",
      cost: "800 Pts",
      count: "128",
      theme: "bg-purple-50 text-purple-600 dark:bg-purple-950/10 dark:text-purple-400",
    },
  ];

  return (
    <div className="bg-card border border-border p-6 rounded-3xl shadow-xs flex flex-col justify-between space-y-6 h-full w-full">
      {/* Header section */}
      <div>
        <h3 className="text-sm font-black text-text-primary">Top Recompensas</h3>
        <p className="text-[10px] text-gray-400 font-medium">Productos más canjeados</p>
      </div>

      {/* Reward Rows */}
      <div className="space-y-4 flex-1">
        {topRewards.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between gap-3 border-b border-border pb-3 last:border-0 last:pb-0">
            {/* Left theme circle */}
            <div className="flex items-center gap-3 min-w-0">
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 font-black text-xs ${item.theme}`}>
                {item.title.substring(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-black text-text-primary truncate">
                  {item.title}
                </h4>
                <span className="text-[10px] text-brand-green font-bold">
                  {item.cost}
                </span>
              </div>
            </div>

            {/* Right count label */}
            <div className="shrink-0 text-right">
              <span className="text-xs font-black text-text-primary">
                {item.count}
              </span>
              <span className="text-[8px] text-gray-400 dark:text-gray-500 font-extrabold uppercase block tracking-wider">
                Canjes
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Link */}
      <div className="pt-2">
        <Link
          href="/dashboard/rewards"
          className="w-full py-2.5 hover:bg-canvas-base border border-border text-brand-green font-bold rounded-xl text-[10px] transition-all flex items-center justify-center gap-1 cursor-pointer"
        >
          Ver catálogo completo →
        </Link>
      </div>

    </div>
  );
}
