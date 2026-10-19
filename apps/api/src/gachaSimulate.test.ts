import { describe, expect, it } from "vitest";
import { GACHA_CONFIG, collectorRateAt } from "./catCakeGacha.js";
import { simulateGacha } from "./gachaSimulate.js";

describe("gachaSimulate (M7-11)", () => {
  it("soft pity climbs from softPityStart and hard pity is guaranteed at hardPity", () => {
    const cfg = GACHA_CONFIG;
    expect(collectorRateAt(cfg.softPityStart - 1, cfg)).toBe(cfg.collectorBaseRate);
    expect(collectorRateAt(cfg.softPityStart, cfg)).toBeGreaterThan(cfg.collectorBaseRate);
    expect(collectorRateAt(cfg.hardPity, cfg)).toBe(1);
    expect(collectorRateAt(cfg.hardPity - 1, cfg)).toBeLessThan(1);
  });

  it("10k-run Monte Carlo stays near pity-inflated CE spacing (~25)", () => {
    const stats = simulateGacha(10_000, 42);
    expect(stats.runs).toBe(10_000);
    // With 1.5% base + soft from 26 (+4pp) + hard at 40, mean gap is ~25.
    expect(stats.avgPullsPerCollector).toBeGreaterThan(22);
    expect(stats.avgPullsPerCollector).toBeLessThan(28);
    expect(stats.p50PullsPerCollector).toBeGreaterThanOrEqual(20);
    expect(stats.p50PullsPerCollector).toBeLessThanOrEqual(35);
    expect(stats.hardPityOnlyAtHard).toBe(true);
    // Long soft climb: true hard-pity hits are rare (<2%).
    expect(stats.hardPityShare).toBeGreaterThanOrEqual(0);
    expect(stats.hardPityShare).toBeLessThan(0.05);
    expect(stats.avgPullsAllClassics).toBeGreaterThan(20);
    expect(stats.avgPullsFullSet).toBeGreaterThan(stats.avgPullsAllClassics);
    expect(stats.avgNetCostFullSet).toBeGreaterThan(0);
  });
});
