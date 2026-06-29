"use client";

import { useSession } from "next-auth/react";
import { Ticket, Scan, ShieldCheck } from "lucide-react";

export default function DashboardPOS() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6">
      
      {/* Quick POS Info banner */}
      <div className="bg-card border border-border p-6 rounded-2xl shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-text-primary">Canjear Recompensa</h2>
          <p className="text-sm text-gray-400">Pídele al cliente que muestre el código QR en su celular.</p>
        </div>
        <div className="flex gap-2">
          <button className="h-10 px-4 bg-brand-green hover:bg-brand-green/90 text-white font-semibold text-xs rounded-xl flex items-center gap-2 cursor-pointer shadow-xs transition-all">
            <ShieldCheck className="w-4 h-4" />
            Validar Código
          </button>
          <button className="h-10 px-4 bg-canvas-base hover:bg-canvas-base/80 border border-border text-text-primary font-semibold text-xs rounded-xl flex items-center gap-2 cursor-pointer transition-all">
            <Scan className="w-4 h-4" />
            Usar Cámara
          </button>
        </div>
      </div>

      {/* Main Grid Mockup */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Placeholder form */}
        <div className="md:col-span-2 bg-card border border-border p-8 rounded-2xl shadow-xs min-h-[300px] flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center">
            <Ticket className="text-brand-green w-8 h-8" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Ingrese el código de cupón de 12 dígitos aquí</p>
            <div className="mt-4 border-2 border-dashed border-border rounded-xl p-6 bg-canvas-base text-xl font-bold tracking-widest text-gray-500">
              EJ: RECY-A1B2C3
            </div>
          </div>
        </div>

        {/* Side Panel Stats */}
        <div className="bg-card border border-border p-6 rounded-2xl shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-text-primary uppercase tracking-widest">Resumen de Hoy</h3>
          
          <div className="space-y-3">
            <div className="p-4 bg-canvas-base rounded-xl border border-border">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Canjes de Hoy</span>
              <span className="text-2xl font-extrabold text-text-primary mt-1 block">14</span>
            </div>
            
            <div className="p-4 bg-canvas-base rounded-xl border border-border">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Puntos Recaudados</span>
              <span className="text-2xl font-extrabold text-text-primary mt-1 block">2,800 Pts</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
