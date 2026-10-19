import { describe, expect, it } from "vitest";
import { collectorRateAt, GACHA_CONFIG } from "./catCakeGacha.js";

describe("collectorRateAt", () => {
  it("matches R7.7 soft and hard pity (proportional hard 40)", () => {
    expect(collectorRateAt(1)).toBe(GACHA_CONFIG.collectorBaseRate);
    expect(collectorRateAt(GACHA_CONFIG.softPityStart - 1)).toBe(
      GACHA_CONFIG.collectorBaseRate,
    );
    expect(collectorRateAt(GACHA_CONFIG.softPityStart)).toBeCloseTo(
      0.015 + 0.04,
      6,
    );
    expect(collectorRateAt(GACHA_CONFIG.hardPity - 1)).toBeCloseTo(0.575, 6);
    expect(collectorRateAt(GACHA_CONFIG.hardPity)).toBe(1);
  });
});
