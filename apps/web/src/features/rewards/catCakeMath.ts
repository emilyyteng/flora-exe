/** Client-side friendship/pity display helpers (mirror API catCakeCatalog / GACHA_CONFIG). */

export const FRIENDSHIP_MAX = 5;
export const KEPT_COPIES = 1 + FRIENDSHIP_MAX;
/** Mirror of API `NIGHT_UNLOCK_AT_COPIES` (Rules / Collection copy). */
export const NIGHT_UNLOCK_AT_COPIES = 3;

export const GACHA_DISPLAY = {
  costPerPull: 180,
  collectorBaseRate: 0.015,
  softPityStart: 26,
  softPityStep: 0.04,
  hardPity: 40,
  refund: { classic: 18, collector: 90 } as const,
} as const;

export function friendshipLevel(count: number): number {
  return Math.min(FRIENDSHIP_MAX, Math.max(0, count - 1));
}

export function refundableCount(count: number): number {
  return Math.max(0, count - KEPT_COPIES);
}

export function collectorRateAt(pityAt: number): number {
  const cfg = GACHA_DISPLAY;
  if (pityAt >= cfg.hardPity) return 1;
  if (pityAt < cfg.softPityStart) return cfg.collectorBaseRate;
  return Math.min(
    1,
    cfg.collectorBaseRate + (pityAt - cfg.softPityStart + 1) * cfg.softPityStep,
  );
}

export function refundValue(edition: "classic" | "collector"): number {
  return GACHA_DISPLAY.refund[edition];
}
