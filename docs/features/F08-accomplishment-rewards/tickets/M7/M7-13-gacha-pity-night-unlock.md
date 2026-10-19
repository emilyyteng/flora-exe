# M7-13: Raise CE pity to 40; Night unlock at 3 copies

**Status:** Done
**Blocked by:** (none)
**Implements:** R7.4, R7.7, R7.9 (from `../../spec.md`)
**Type:** build

## What to build

Slow CE pacing without raising pull cost (stays 180):

- Hard pity **40** with **proportional** soft pity: soft from pull **26**, +4 percentage points per pull (scaled from former soft@13 / hard@20).
- Night skin unlocks on the **third** owned CE copy (was second).
- Rewards → Rules stays live off `GACHA_CONFIG` / `NIGHT_UNLOCK_AT_COPIES` and describes the new ladder and Night rule.

## Acceptance criteria

- [x] `GACHA_CONFIG`: base 1.5%, softStart 26, softStep 0.04, hardPity 40; costPerPull 180 unchanged.
- [x] `NIGHT_UNLOCK_AT_COPIES === 3`; look API / collection derive unlock from that.
- [x] Web `GACHA_DISPLAY` mirrors API; Collection undiscovered CE copy cites hard pity from config.
- [x] Rules page shows live soft→hard ladder and ordinal Night unlock copy.
- [x] Spec R7.4 / R7.7 and CHANGELOG M7 bullets updated.
- [x] Tests and 10k Monte Carlo expectations updated (~25 mean CE gap).
- [x] `npm run check` passes.

## Tests

- [x] Unit: `collectorRateAt`, catalog Night threshold, rules payload ladder indices.
- [x] Integration: hard pity at 40, Night unlock on 3rd CE, look rejected at 2 copies.
- [x] Monte Carlo: mean gap ~22–28; hard-pity share &lt; 5%.

## Reuse notes

Existing `collectorRateAt`, Rules payload, Collection look clamp when locked.

## Definition of done

- [x] Acceptance criteria met and checked
- [x] `npm run check` passes
- [x] Follows `docs/design-system.md`
- [x] Reuse check done
- [x] No production imports of prototype code
- [x] Committed as `F08 M7-13: …`
- [x] End-of-task report given

## Verification notes

`npm run check` passed (390 tests) before commit. Ticket commit: `5f4b0d2`.
