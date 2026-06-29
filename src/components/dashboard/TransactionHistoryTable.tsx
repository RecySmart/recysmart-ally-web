import React from "react";
import { toast } from "sonner";

export function TransactionHistoryTable() {
  const transactions = [
    {
      id: "TX-A1B2-8821",
      client: "Alex Rivera",
      avatar: "AR",
      reward: "1x Café Americano Mediano",
      points: "- 200 Pts",
      time: "14:32 PM",
    },
    {
      id: "TX-C3D4-5678",
      client: "Sofia Castro",
      avatar: "SC",
      reward: "1x Galleta de Avena Artesanal",
      points: "- 150 Pts",
      time: "12:15 PM",
    },
    {
      id: "TX-E5F6-9012",
      client: "Mateo Torres",
      avatar: "MT",
      reward: "2x Helado de Vainilla",
      points: "- 600 Pts",
      time: "10:45 AM",
    },
  ];

  return (
    <div className="bg-card border border-border p-6 rounded-3xl shadow-xs space-y-4 w-full">
      {/* Header section with Action Link */}
      <div className="flex justify-between items-center pb-2 border-b border-border">
        <h3 className="text-sm font-black text-text-primary">
          Historial de Transacciones (Hoy)
        </h3>
        <button
          onClick={() => toast.info("Historial completo", { description: "Próximamente: Historial extendido de auditoría de canjes." })}
          className="text-xs text-gray-400 dark:text-gray-500 font-bold hover:text-text-primary transition-colors cursor-pointer"
        >
          Ver todas
        </button>
      </div>

      {/* Horizontal Scroll wrapper for responsive tables */}
      <div className="w-full overflow-x-auto scrollbar-thin">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr>
              <th className="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-widest pb-3">
                ID Transacción
              </th>
              <th className="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-widest pb-3">
                Cliente
              </th>
              <th className="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-widest pb-3">
                Recompensa Entregada
              </th>
              <th className="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-widest pb-3">
                Puntos Restados
              </th>
              <th className="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-widest pb-3">
                Hora
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-t border-border hover:bg-canvas-base/30 transition-colors">
                {/* Transaction ID */}
                <td className="py-4 text-xs font-mono font-bold text-gray-400 dark:text-gray-500">
                  {tx.id}
                </td>

                {/* Client detail row (initials circle + name) */}
                <td className="py-4 text-xs font-bold text-text-primary">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 flex items-center justify-center font-black text-[9px] shrink-0">
                      {tx.avatar}
                    </div>
                    <span>{tx.client}</span>
                  </div>
                </td>

                {/* Reward Description */}
                <td className="py-4 text-xs font-bold text-text-primary">
                  {tx.reward}
                </td>

                {/* Points Subtracted (green bold) */}
                <td className="py-4 text-xs font-black text-brand-green">
                  {tx.points}
                </td>

                {/* Timestamp */}
                <td className="py-4 text-xs font-bold text-gray-400 dark:text-gray-500">
                  {tx.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
