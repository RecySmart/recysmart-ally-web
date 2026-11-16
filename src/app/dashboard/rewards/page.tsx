"use client";

import { useState } from "react";
import { toast } from "sonner";
import { HelpCircle, Plus } from "lucide-react";
import {
  useAddRewardStock,
  useCompanyRewards,
  useSetRewardStatus,
} from "@/hooks/useRewards";
import { RewardCatalogCard } from "@/components/ui";
import { Reward } from "@/schemas";
import { ApiError } from "@/utils";
import { getRewardAvailability } from "@/utils/reward-availability";
import { CreateRewardDialog } from "./_components/CreateRewardDialog";

const FILTERS = [
  { key: "all", label: "Todas" },
  { key: "isActive", label: "Activas" },
  { key: "isLowStock", label: "Poco stock" },
  { key: "expiresSoon", label: "Pronto a vencer" },
  { key: "isExpired", label: "Vencidas" },
  { key: "isPaused", label: "Pausadas" },
] as const;

type FilterTab = (typeof FILTERS)[number]["key"];

export default function RewardsCatalogPage() {
  const pageSize = 20;
  const [page, setPage] = useState(1);
  const { data: rewards, isLoading } = useCompanyRewards("all");
  const setRewardStatus = useSetRewardStatus();
  const addRewardStock = useAddRewardStock();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingReward, setEditingReward] = useState<Reward | null>(null);

  const catalog = (rewards ?? []).map((reward) => ({
    reward,
    availability: getRewardAvailability(reward),
  }));
  const query = searchQuery.trim().toLowerCase();
  const filteredRewards = catalog.filter(({ reward, availability }) => {
    const matchesTab = activeTab === "all" || availability[activeTab];
    const matchesSearch =
      reward.title.toLowerCase().includes(query) ||
      reward.description.toLowerCase().includes(query);

    return matchesTab && matchesSearch;
  });
  const pageCount = Math.max(1, Math.ceil(filteredRewards.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const displayedRewards = filteredRewards.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  // Action handlers
  const handleEdit = (reward: Reward) => {
    setEditingReward(reward);
    setIsCreateOpen(true);
  };

  const handleToggleStatus = (reward: Reward) => {
    const isPaused =
      reward.status === "PAUSED" || reward.status === "DISCONTINUED";
    setRewardStatus.mutate(
      {
        rewardId: reward.id,
        status: isPaused ? "ACTIVE" : "DISCONTINUED",
      },
      {
        onSuccess: (updated) =>
          toast.success(
            updated.status === "ACTIVE"
              ? "Recompensa reactivada"
              : "Recompensa pausada",
          ),
        onError: (error) => {
          if (error instanceof ApiError && error.code === "REWARD_OUT_OF_STOCK") {
            toast.error("Añade stock para reactivar la recompensa.");
            return;
          }
          toast.error(error.message);
        },
      },
    );
  };

  const handleAddStock = (reward: Reward) => {
    const rawAmount = window.prompt(
      `¿Cuántas unidades deseas añadir a "${reward.title}"?`,
    );
    if (rawAmount === null) return;
    const amount = Number(rawAmount);
    if (!Number.isInteger(amount) || amount <= 0) {
      toast.error("Ingresa una cantidad entera mayor que cero.");
      return;
    }
    addRewardStock.mutate(
      { rewardId: reward.id, amount },
      {
        onSuccess: () => toast.success(`Se añadieron ${amount} unidades.`),
        onError: (error) => toast.error(error.message),
      },
    );
  };

  const openCreateDialog = () => {
    setEditingReward(null);
    setIsCreateOpen(true);
  };

  const closeRewardDialog = () => {
    setIsCreateOpen(false);
    setEditingReward(null);
  };

  return (
    <div className="space-y-6 md:space-y-8 select-none">
      {/* 1. Header with mobile-first layout (stacks on mobile, side-by-side on desktop) */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        {/* Title / Description */}
        <div className="space-y-1">
          <h1 className="text-xl md:text-2xl font-black text-text-primary tracking-tight">
            Catálogo de Recompensas
          </h1>
          <p className="text-xs md:text-sm text-gray-400 dark:text-gray-500 font-medium">
            Administra tus ofertas, ajusta los precios en puntos y controla el
            stock.
          </p>
        </div>

        {/* Action Row: Search + Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          {/* Search Field */}
          <div className="relative flex-1 sm:w-64">
            <input
              type="text"
              placeholder="Buscar recompensa..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="w-full h-11 px-4 border border-border rounded-xl bg-card text-sm text-text-primary placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green transition-all"
            />
          </div>

          {/* Create Button */}
          <button
            onClick={openCreateDialog}
            className="h-11 px-6 bg-brand-green hover:bg-brand-green/90 active:scale-95 text-white font-bold text-sm rounded-xl cursor-pointer shadow-xs transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4.5 h-4.5" />
            Crear Recompensa
          </button>
        </div>
      </div>

      {/* 2. Filter tabs (horizontal scroll on mobile, flex row on desktop) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none shrink-0 -mx-6 px-6 lg:mx-0 lg:px-0">
        {FILTERS.map(({ key, label }) => {
          const count = catalog.filter(
            ({ availability }) => key === "all" || availability[key],
          ).length;
          return (
            <button
              key={key}
              type="button"
              aria-pressed={activeTab === key}
              onClick={() => {
                setActiveTab(key);
                setPage(1);
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border shrink-0 cursor-pointer ${
                activeTab === key
                  ? "bg-text-primary text-card border-text-primary"
                  : "bg-card text-gray-400 dark:text-gray-500 border-border hover:text-text-primary"
              }`}
            >
              {label} ({count})
            </button>
          );
        })}
      </div>

      {/* 3. Grid of Catalog Cards (mobile-first grid spans) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          /* Loading skeletons mapped */
          [1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="w-full bg-card border border-border rounded-3xl overflow-hidden flex flex-col shadow-xs animate-pulse"
            >
              <div className="h-24 md:h-28 bg-canvas-base"></div>
              <div className="p-6 flex-1 space-y-4">
                <div className="space-y-1">
                  <div className="h-5 w-2/3 bg-canvas-base rounded-md"></div>
                  <div className="h-8 w-5/6 bg-canvas-base rounded-md"></div>
                </div>
                <div className="grid grid-cols-2 items-end pt-2">
                  <div className="space-y-1">
                    <div className="h-2.5 w-12 bg-canvas-base rounded-md"></div>
                    <div className="h-7 w-16 bg-canvas-base rounded-md"></div>
                  </div>
                  <div className="space-y-1 flex flex-col items-end">
                    <div className="h-2.5 w-8 bg-canvas-base rounded-md"></div>
                    <div className="h-4 w-10 bg-canvas-base rounded-md"></div>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-canvas-base rounded-full"></div>
              </div>
              <div className="border-t border-border px-6 py-4 bg-canvas-base/30 flex items-center justify-between min-h-15">
                <div className="h-7 w-20 bg-canvas-base rounded-lg"></div>
                <div className="h-7 w-20 bg-canvas-base rounded-lg"></div>
              </div>
            </div>
          ))
        ) : filteredRewards.length === 0 ? (
          /* Empty Catalog view */
          <div className="col-span-full bg-card border border-border rounded-3xl p-12 text-center flex flex-col items-center justify-center space-y-3 min-h-75">
            <HelpCircle className="w-10 h-10 text-gray-400" />
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-text-primary">
                No se encontraron recompensas
              </h3>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                No hay recompensas en el catálogo que coincidan con la búsqueda
                o el filtro actual.
              </p>
            </div>
          </div>
        ) : (
          /* Render actual dynamic catalog list cards */
          displayedRewards.map(({ reward, availability }) => (
            <RewardCatalogCard
              key={reward.id}
              reward={reward}
              availability={availability}
              onEdit={handleEdit}
              onToggleStatus={handleToggleStatus}
              onAddStock={handleAddStock}
            />
          ))
        )}
      </div>

      {pageCount > 1 && (
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            disabled={currentPage === 1 || isLoading}
            onClick={() => setPage(currentPage - 1)}
            className="px-4 py-2 rounded-xl border border-border text-xs font-bold disabled:opacity-40"
          >
            Anterior
          </button>
          <span className="text-xs font-bold text-gray-400">
            Página {currentPage} de {pageCount}
          </span>
          <button
            type="button"
            disabled={currentPage >= pageCount || isLoading}
            onClick={() => setPage(currentPage + 1)}
            className="px-4 py-2 rounded-xl border border-border text-xs font-bold disabled:opacity-40"
          >
            Siguiente
          </button>
        </div>
      )}

      {/* Create Reward modal overlay drawer */}
      <CreateRewardDialog
        open={isCreateOpen}
        onClose={closeRewardDialog}
        reward={editingReward}
      />
    </div>
  );
}
