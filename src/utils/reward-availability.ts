import type { Reward } from "../schemas";

const LOW_STOCK_LIMIT = 5;
const EXPIRING_SOON_MS = 7 * 24 * 60 * 60 * 1000;

export function getRewardAvailability(reward: Reward, now = Date.now()) {
  const status = reward.availabilityStatus ?? reward.status;
  const expiresAt = reward.expiresAt ? Date.parse(reward.expiresAt) : NaN;
  const isExpired = status === "EXPIRED" || expiresAt <= now;
  const isPaused = !isExpired && (status === "PAUSED" || status === "DISCONTINUED");
  const isOutOfStock = status === "OUT_OF_STOCK" || reward.remainingStock <= 0;
  const isActive = status === "ACTIVE" && !isExpired && !isOutOfStock;

  return {
    isExpired,
    isPaused,
    isOutOfStock,
    isActive,
    isLowStock: isActive && reward.remainingStock <= LOW_STOCK_LIMIT,
    expiresSoon: isActive && expiresAt > now && expiresAt - now <= EXPIRING_SOON_MS,
  };
}
