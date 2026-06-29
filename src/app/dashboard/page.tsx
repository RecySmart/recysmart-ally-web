"use client";

import { Ticket, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { StatCard } from "@/components/ui";
import { RedeemCouponCard } from "./_components/RedeemCouponCard";

export default function DashboardPOS() {
  // Mock rewards
  const rewards = [
    {
      id: "1",
      title: "Café Americano",
      cost: "200 Pts",
      stockText: "38 / 50",
      progress: 76,
      color: "bg-brand-green",
      badge: null,
    },
    {
      id: "2",
      title: "Galleta de Avena",
      cost: "150 Pts",
      stockText: "4 / 10",
      progress: 40,
      color: "bg-action-orange",
      badge: "Poco Stock",
    },
    {
      id: "3",
      title: "20% Dscto. Factura",
      cost: "800 Pts",
      stockText: "Ilimitado",
      progress: 100,
      color: "bg-blue-500",
      badge: null,
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left: Canjear Recompensa Decoupled Card */}
        <div className="lg:col-span-2">
          <RedeemCouponCard />
        </div>

        {/* Right Panel: Stats & Recompensas Activas */}
        <div className="space-y-6 col-span-1">
          
          {/* Top Panel Stats row */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard
              title="Canjes de Hoy"
              value="14"
              icon={Ticket}
            />
            <StatCard
              title="Puntos Recaudados"
              value="2,800"
              icon={ShieldCheck}
            />
          </div>

          {/* Recompensas Activas Card */}
          <div className="bg-card border border-border p-6 rounded-2xl shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-text-primary">Recompensas Activas</h3>
                <p className="text-[10px] text-gray-400 font-medium">Inventario disponible en la App</p>
              </div>
            </div>

            {/* List */}
            <div className="space-y-4 pt-1">
              {rewards.map((reward) => (
                <div key={reward.id} className="p-4 bg-canvas-base rounded-2xl border border-border space-y-3 relative">
                  
                  {/* Title block */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-bold text-text-primary">{reward.title}</h4>
                      <span className="text-xs text-brand-green font-semibold">{reward.cost}</span>
                    </div>
                    {reward.badge && (
                      <span className="text-[9px] font-bold px-2 py-0.5 bg-action-orange/10 text-action-orange rounded-full border border-action-orange/20">
                        {reward.badge}
                      </span>
                    )}
                  </div>

                  {/* Stock bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold">
                      <span>STOCK DISPONIBLE</span>
                      <span className="text-text-primary">{reward.stockText}</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${reward.color}`}
                        style={{ width: `${reward.progress}%` }}
                      ></div>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Footer button */}
            <button
              onClick={() => toast.info("Lista de recompensas", { description: "Redirigiendo a catálogo de recompensas..." })}
              className="w-full py-3 hover:bg-canvas-base border border-border text-text-primary font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              Ver Todas las Recompensas
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
