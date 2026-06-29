import React from "react";

export function PerformanceChart() {
  const chartData = [
    { day: "Lun", past: "h-[30%]", current: "h-[50%]" },
    { day: "Mar", past: "h-[45%]", current: "h-[40%]" },
    { day: "Mié", past: "h-[55%]", current: "h-[70%]" },
    { day: "Jue", past: "h-[65%]", current: "h-[85%]" },
    { day: "Vie", past: "h-[75%]", current: "h-[60%]" },
    { day: "Sáb", past: "h-[80%]", current: "h-[90%]" },
    { day: "Dom", past: "h-[65%]", current: "h-[45%]" },
  ];

  return (
    <div className="bg-card border border-border p-6 rounded-3xl shadow-xs space-y-6 w-full">
      
      {/* Chart Header details */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-sm font-black text-text-primary">Tráfico de Canjes</h3>
          <p className="text-[10px] text-gray-400 font-medium">Volumen de cupones validados por día</p>
        </div>

        {/* Legend pills */}
        <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 dark:text-gray-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-green"></span>
            <span>Esta semana</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-gray-200 dark:bg-zinc-800"></span>
            <span>Semana pasada</span>
          </div>
        </div>
      </div>

      {/* Grid Canvas area */}
      <div className="relative h-60 w-full flex items-end pt-4 pl-8 pr-2">
        
        {/* Y Axis Grid Label Lines */}
        <div className="absolute inset-y-0 left-0 flex flex-col justify-between text-[9px] text-gray-400 dark:text-gray-500 font-bold pr-2 pb-6 pt-4 h-full">
          <span>200</span>
          <span>150</span>
          <span>100</span>
          <span>50</span>
          <span>0</span>
        </div>

        {/* Horizontal Background Grids */}
        <div className="absolute inset-x-8 top-4 bottom-6 flex flex-col justify-between pointer-events-none">
          <div className="w-full border-t border-dashed border-border"></div>
          <div className="w-full border-t border-dashed border-border"></div>
          <div className="w-full border-t border-dashed border-border"></div>
          <div className="w-full border-t border-dashed border-border"></div>
          <div className="w-full border-b border-border"></div>
        </div>

        {/* Dynamic Bars Container */}
        <div className="flex-1 h-full inset-x-8 flex justify-around items-end pb-6 relative z-10">
          {chartData.map((data, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end w-12">
              
              {/* Dual side-by-side bars */}
              <div className="flex items-end gap-1.5 h-full w-full justify-center">
                {/* Past Week Bar (Gray) */}
                <div
                  className={`w-3.5 bg-gray-200 dark:bg-zinc-800 rounded-t-sm transition-all duration-500 ${data.past}`}
                  title={`Semana pasada: ${data.day}`}
                ></div>
                {/* Current Week Bar (Green) */}
                <div
                  className={`w-3.5 bg-brand-green rounded-t-sm transition-all duration-500 ${data.current}`}
                  title={`Esta semana: ${data.day}`}
                ></div>
              </div>

              {/* Day label */}
              <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold">
                {data.day}
              </span>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
